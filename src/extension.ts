import * as vscode from 'vscode';
import * as beautify from 'js-beautify'

export async function activate(context: vscode.ExtensionContext): Promise<void> {

    const conf = vscode.workspace.getConfiguration('extendscript')

    // Create a documentformattingprovider for ExtendScript files, utilizing js-beautify.
    vscode.languages.registerDocumentFormattingEditProvider('extendscript', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            const fullRange = document.validateRange(new vscode.Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE));
            return [vscode.TextEdit.replace(fullRange, beautify(document.getText(), { indent_size: conf.get('indentSize'), indent_char: conf.get('indentChar'), indent_with_tabs: conf.get('indentWithTabs'), eol: conf.get('EOL'), end_with_newline: conf.get('endWithNewline'), indent_level: conf.get('indentLevel'), preserve_newlines: conf.get('preserveNewlines'), max_preserve_newlines: conf.get('maxPreserveNewlines'), space_in_paren: conf.get('spaceInParen'), space_in_empty_paren: conf.get('spaceInEmptyParen'), jslint_happy: conf.get('jslintHappy'), space_after_anon_function: conf.get('spaceAfterAnonFunction'), space_after_named_function: conf.get('spaceAfterNamedFunction'), brace_style: conf.get('braceStyle'), unindent_chained_methods: conf.get('unindentChainedMethods'), break_chained_methods: conf.get('breakChainedMethods'), keep_array_indentation: conf.get('keepArrayIndentation'), unescape_strings: conf.get('unescapeStrings'), wrap_line_length: conf.get('wrapLineLength'), e4x: conf.get('e4x'), comma_first: conf.get('commaFirst'), operator_position: conf.get('operatorPosition'), indent_empty_lines: conf.get('indentEmptyLines') }))];
        }
    });
}
