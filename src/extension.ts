// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as extUtils from './extUtils';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "view-in-repo" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('view-in-repo.viewInRepo', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		var currentlyOpenTabfilePath = vscode.window.activeTextEditor?.document.uri.fsPath;
		const repoInfo = extUtils.findGitConfig(currentlyOpenTabfilePath || '');

		if(repoInfo !== null) {

			const onlineRepoUrl = extUtils.getUrlForOpenFile(currentlyOpenTabfilePath || '', repoInfo);

			if(onlineRepoUrl === null)
			{
				vscode.window.showInformationMessage('Only GitHub repos are supported currently.');
				return;
			}
			else
			{
				vscode.env.openExternal(vscode.Uri.parse(onlineRepoUrl));
			}
		}
		else {
			vscode.window.showInformationMessage('No .git/config found in the current file path or its parent directories.');
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
