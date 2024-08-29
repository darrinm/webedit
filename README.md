# Local Web Edit

This Visual Studio Code extension allows you to edit the contents of a web page text area that are communicated to/from the extension via a WebSocket. The web server is assumed to be running locally.

## Features

- Start a WebSocket server on port 3000
- Receive content from a web page and open it in a new editor
- Send updates back to the web page as you edit the content in VS Code

## Usage

1. Install the extension
2. Run the command "Start Local Web Edit" from the Command Palette (Ctrl+Shift+P)
3. Connect to the WebSocket server from your web page (ws://localhost:3000)
4. Send and receive content between your web page and VS Code

## Requirements

- Visual Studio Code 1.60.0 or higher
- A local web server running your web page

## Extension Settings

This extension doesn't contribute any settings.

## Known Issues

None at the moment.

## Release Notes

### 0.0.1

Initial release of Local Web Edit.