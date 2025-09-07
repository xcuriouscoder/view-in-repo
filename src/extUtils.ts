import * as fs from "fs";
import * as path from 'path';

export function findGitConfig(startPath: string): { gitConfigPath: string, repoRoot: string } | null {
    let currentPath = startPath;

    while (true) {
        const gitConfigPath = path.join(currentPath, '.git', 'config');
        if (fs.existsSync(gitConfigPath)) {
            return { gitConfigPath: gitConfigPath, repoRoot: currentPath };
        }

        const parentPath = path.dirname(currentPath);
        if (parentPath === currentPath) {
            break; // Reached the root directory
        }
        currentPath = parentPath;
    }

    return null;
}

export function readGitConfig(gitConfigPath: string): string {
    if (!fs.existsSync(gitConfigPath)) {
        return ''; 
    }

    return fs.readFileSync(gitConfigPath, 'utf-8');
}

export function readGitConfigValue(gitConfigContents: string, key: string): string {
    const regex = new RegExp(`^\\s*${key}\\s*=\\s*(.+)$`, 'm');
    const match = gitConfigContents.match(regex);
    return match ? match[1].trim() : '';
}

export function getUrlForOpenFile(currentlyOpenTabfilePath: string, 
    repoInfo: {gitConfigPath: string, repoRoot: string}): string | null {
    const gitConfigContents = repoInfo.gitConfigPath ? readGitConfig(repoInfo.gitConfigPath) : '';

    //https://github.com/xcuriouscoder/vscext.git
    const remoteUrl = repoInfo.gitConfigPath ? readGitConfigValue(gitConfigContents, 'url') : null;
    const trimmedRemoteUrl = remoteUrl ? remoteUrl.replace(/\.git$/, '') : null;
    const remoteBranch = repoInfo.gitConfigPath ? readGitConfigValue(gitConfigContents, 'merge') : null;
    const branchName = remoteBranch ? remoteBranch.split('/').pop() : 'main';

    let pathWithFile = currentlyOpenTabfilePath?.substring(repoInfo.repoRoot.length);
    pathWithFile = pathWithFile ? pathWithFile.replace(/\\/g, '/') : '';

    // https://github.com/xcuriouscoder/vscext/blob/main/README.md
    if(remoteUrl?.includes('github.com'))
    {
        const onlineRepoUrl = trimmedRemoteUrl + '/blob/' + branchName + pathWithFile;

        return onlineRepoUrl;
    }
    else
    {
        return null;
    }
}