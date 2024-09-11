# Local Web Edit

This Visual Studio Code extension allows you to edit the Javascript of Hatch components. The Hatch web server is assumed to be running locally.

## Features

- Start a WebSocket server on port 3000
- Receive per-object Javascript and open it in a new editor
- Send changes to Hatch as you edit the content in VS Code
- Receive changes from Hatch as you edit the Javascript there

## Usage

1. Install the extension `webedit-<version>.vsix` in Visual Studio Code by following these steps:
   - Open the Extensions view by clicking on the square icon in the Sidebar on the left side of the window.
   - Click on the three dots in the top right corner of the Extensions view and select "Install from VSIX..."
   - Select the `.vsix` file you generated in the "Packaging" step below.
Or
   - run the command `Extension: Install from VSIX...` from the Command Palette (Ctrl+Shift+P) and select the `.vsix` file you generated in the "Packaging" step below.

2. Run the command "Start Local Web Edit" from the Visual Studio Code Command Palette (Ctrl+Shift+P)
3. In Hatch (this , running on localhost, click on objects with Javascript to edit

## Requirements

- Visual Studio Code 1.60.0 or higher
- Hatch

## Extension Settings

This extension doesn't contribute any settings.

## Building

```
yarn install
yarn run compile
```

## Packaging

To package the extension as a `.vsix` file:

1. Ensure you have the `vsce` (Visual Studio Code Extensions) tool installed globally:
   ```
   npm install -g vsce
   ```

2. Navigate to the project directory in the terminal.

3. Run the following command to create the `.vsix` file:
   ```
   vsce package
   ```

4. This will generate a file named `webedit-<version>.vsix` in the project directory, where `<version>` is the version number specified in your `package.json` file.

5. You can then install this `.vsix` file in Visual Studio Code by following the "Usage" instructions above.

## Known Issues

- VSCode intellisense is a mixed blessing. It complains a lot and wants to autocomplete inappropriately.
- No @mention support.
- Files are presented as "unsaved" even though they are autosaved as they are changed.
- No way to initiate adding Javascript to an object from VSCode.

## Release Notes

### 0.0.3

It works!