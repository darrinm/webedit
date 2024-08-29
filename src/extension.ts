import * as vscode from 'vscode';
import * as WebSocket from 'ws';

let wss: WebSocket.Server;
let ignoreChanges = false;

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.startLocalWebEdit', () => {
    // Start WebSocket server.
    wss = new WebSocket.Server({ port: 3000 });

    wss.on('connection', (ws: WebSocket) => {
      let change: string | undefined;

      ws.on('message', async (message: string) => {
        const data = JSON.parse(message.toString());
        //console.log('Received message:', data);

        if (data.type === 'content') {
          const {
            content,
            component: { name, id },
          } = data;
          console.log(`${name}-${id}: content received`);

          // Use the title received from the browser as the filename for the document.
          const title = `${name}-${id}.js`;

          ignoreChanges = true;
          const document = await vscode.workspace.openTextDocument(
            vscode.Uri.parse(`untitled:${title}`),
          );
          const editor = await vscode.window.showTextDocument(document);
          ignoreChanges = false;

          // Replace the content of the document with the content received from the browser.
          const edit = new vscode.WorkspaceEdit();
          const range = new vscode.Range(
            document.positionAt(0),
            document.positionAt(document.getText().length),
          );
          console.log(`${name}-${id}: replacing content`);
          change = data.content;
          edit.replace(document.uri, range, data.content);
          await vscode.workspace.applyEdit(edit);
        }
      });

      // Listen for the document to be closed.
      vscode.workspace.onDidCloseTextDocument((document) => {
        console.log('onDidCloseTextDocument', document);
      });

      // Listen for changes in the editor and send the updated content to the browser.
      vscode.workspace.onDidChangeTextDocument((event) => {
        console.log('onDidChangeTextDocument', event);
        if (ignoreChanges) {
          console.log('  ignoring changes');
          return;
        }

        const { name, id } = fromFileName(event.document.fileName);
        const content = event.document.getText();

        // This change may be the one made in response to an update from Hatch. If so, don't sent it back!
        if (content !== change) {
          console.log(`${name}-${id}: sending update to browser`);
          ws.send(JSON.stringify({ type: 'update', component: { name, id }, content }));
        }
      });
    });

    vscode.window.showInformationMessage('Local Web Edit started on port 3000');
  });

  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand('extension.stopLocalWebEdit', () => {
    deactivate();

    vscode.window.showInformationMessage('Local Web Edit stopped on port 3000');
  });

  context.subscriptions.push(disposable);
}

// TODO: make this more robust. Store the id in some kind of user data.
function fromFileName(fileName: string): { name: string; id: string } {
  let [name, id] = fileName.split('-');
  id = id.split('.')[0];
  return { name, id };
}

export function deactivate() {
  if (wss) {
    wss.close();
  }
}
