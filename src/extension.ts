import * as path from 'path';
import { spawn } from 'child_process';
import * as vscode from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, RevealOutputChannelOn } from 'vscode-languageclient';
import * as url from 'url';

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
        synchronize: {
            // Synchronize the setting section 'php' to the server
            // configurationSection: 'typescript',
            // Notify the server about changes to PHP files in the workspace
            // fileEvents: vscode.workspace.createFileSystemWatcher('**/*.ts')
        }
    };

    // Create the language client and start the client.
    client = new LanguageClient('ExtendScript Language Server', serverOptions, clientOptions);
    const disposable = client.start();

    // Push the disposable to the context's subscriptions so that the
    // client can be deactivated on extension deactivation
    context.subscriptions.push(disposable);
}
