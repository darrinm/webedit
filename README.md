# Local Web Edit

This Visual Studio Code extension allows you to edit the Javascript of Hatch components. The Hatch web server is assumed to be running locally.

## Features

- Start a WebSocket server on port 3000
- Receive per-object Javascript and open it in a new editor
- Send changes to Hatch as you edit the content in VS Code
- Receive changes from Hatch as you edit the Javascript there

## Usage

1. Install the extension `webedit-<version>.vsix`
2. Run the command "Start Local Web Edit" from the Visual Studio Code Command Palette (Ctrl+Shift+P)
3. In Hatch (this , running on localhost, click on objects with Javascript to edit

## Requirements

- Visual Studio Code 1.60.0 or higher
- Hatch

## Extension Settings

This extension doesn't contribute any settings.

## Known Issues

- VSCode intellisense is a mixed blessing. It complains a lot and wants to autocomplete inappropiately.
- No @mention support.
- Files are presented as "unsaved" even though they are autosaved as they are changed.
- No way to initiate adding Javascript to an object from VSCode.

## Release Notes

### 0.0.2

It works!