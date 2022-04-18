# ExtendScript Syntax Highlighting for Visual Studio Code
This extension provides support for Adobe ExtendScript in Visual Studio Code.
It supports both .jsx and .jsxinc files.

NOTE: This is not an official Adobe Extension! (But… Adobe devs may or may not be using it…)

## Release Notes

### 1.0.0

- Initial release of the extension.

### 1.1.0

- Added symbol support
- Added Intellisense support
- General Fixes

Do note that the symbol support added is based on Javascript/Typescript, which means most things work as expected but vscode may return weird errors in places where extendscripts es4 differs from the newer es6.

### 1.1.1

- Changed the extension icon by request of Adobe.

### 1.2.0

- Added breakpoint support for ExtendScript files, this should make the plugin 100% compatible with the new ExtendScript debugger extension from Adobe.

### 1.2.1

- Added formatting support for ExtendScript files, using js-beautify.

### 1.3.0

- Changed language server to the built in one to improve compatibility and fix random crashes. 
- Added config options for the formatter, allowing you to specify how extendscript files should be formatted. e.g set indent size.

## TODO
- [ ] Improve current Intellisense support, if possible.
- [ ] Add custom Extendscript Language Server, for more info see Notes section below.

## Notes
This extension is far from perfect, particularly in terms of Symbol and Intellisense support. This is due to the use of the Sourcegraph Javascript & Typescript language server, this works well for Javascript and Typescript, but does cause som issues with Extendscript. The fix for this would be to create our own Language Server for extendscript, which would not only be beneficial for this extension/vscode but also for other editors like Vim, Neovim, Emacs, Atom, Sublime, Jetbrains IDEs and more. For more information about the current effort in creating a proper language server for Extendscript, check out this repo: https://github.com/Hennamann/extendscript-language-server
