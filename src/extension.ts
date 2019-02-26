import * as path from 'path';
import { spawn } from 'child_process';
import * as vscode from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, RevealOutputChannelOn } from 'vscode-languageclient';
import * as url from 'url';
import * as beautify from 'js-beautify'

export async function activate(context: vscode.ExtensionContext): Promise<void> {

    let client: LanguageClient;

    const serverOptions: ServerOptions = async () => {
        const childProcess = spawn(process.execPath, [path.resolve(__dirname, '..', 'node_modules', 'javascript-typescript-langserver', 'lib', 'language-server-stdio.js')]);
        childProcess.stderr.on('data', (chunk: Buffer) => {
            client.error(chunk + '');
        });
        return childProcess;
    };

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
        revealOutputChannelOn: RevealOutputChannelOn.Never,
        // Register the server for extendscript documents
        documentSelector: ['extendscript', 'jsx'],
        uriConverters: {
            // VS Code by default %-encodes even the colon after the drive letter
            // NodeJS handles it much better
            code2Protocol: uri => url.format(url.parse(uri.toString(true))),
            protocol2Code: str => vscode.Uri.parse(str)
        },
    };

    // Create the language client and start the client.
    client = new LanguageClient('ExtendScript Language Server', serverOptions, clientOptions);
    const disposable = client.start();

    // Create a documentformattingprovider for ExtendScript files, utilizing js-beautify.
    vscode.languages.registerDocumentFormattingEditProvider('jsx', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            const fullRange = document.validateRange(new vscode.Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE));
            return [vscode.TextEdit.replace(fullRange, beautify(document.getText()))];
        }
    });

    // Push the disposable to the context's subscriptions so that the
    // client can be deactivated on extension deactivation
    context.subscriptions.push(disposable);
}
