// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fsUtils from './fsUtils';

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
		var currentlyOpenTabfilename = vscode.window.activeTextEditor?.document.fileName.split('\\').pop();

		const gitConfigPath = fsUtils.findGitConfig(currentlyOpenTabfilePath || '');
		const gitConfigContents = gitConfigPath ? fsUtils.readGitConfig(gitConfigPath) : '';

		if(gitConfigContents !== '') {
			//https://github.com/xcuriouscoder/vscext.git
			const remoteUrl = gitConfigPath ? fsUtils.readGitConfigValue(gitConfigContents, 'url') : null;
			const trimmedRemoteUrl = remoteUrl ? remoteUrl.replace(/\.git$/, '') : null;
			const remoteBranch = gitConfigPath ? fsUtils.readGitConfigValue(gitConfigContents, 'merge') : null;
			const branchName = remoteBranch ? remoteBranch.split('/').pop() : 'main';

			// https://github.com/xcuriouscoder/vscext/blob/main/README.md
			const onlineRepoUrl = trimmedRemoteUrl + '/blob/' + branchName + '/' + currentlyOpenTabfilename;
			vscode.window.showInformationMessage('GitConfigUrl: ' + onlineRepoUrl);
			vscode.env.openExternal(vscode.Uri.parse(onlineRepoUrl));
		}
		else {
			vscode.window.showInformationMessage('No .git/config found in the current file path or its parent directories.');
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
