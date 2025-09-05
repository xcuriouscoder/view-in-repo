import * as fs from "fs";

export function findGitConfig(startPath: string): string | null {
    let currentPath = startPath;

    while (true) {
        const gitConfigPath = `${currentPath}\\.git\\config`;
        if (fs.existsSync(gitConfigPath)) {
            return gitConfigPath;
        }

        const parentPath = currentPath.substring(0, currentPath.lastIndexOf('\\'));
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