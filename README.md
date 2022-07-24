# Single Key Shortcuts

A WebExtension that provides a few old-Opera style shortcuts.

1. z: history back
1. x: history forward
1. c: previous tab
1. v: next tab

## Development

Install [web-ext](https://github.com/mozilla/web-ext):

`$ npm install web-ext --save-dev`

Start a development instance of Firefox using:

`$ npx web-ext run`

## Release

Increase the version number in [manifest.json](manifest.json).

Package with:

`$ npx web-ext build`
