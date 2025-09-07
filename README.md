# view-in-repo README

This is a simple extension that may or may not be covered in things like GitLens.  The one function it has is to open the currently shown file in the online repository.  It is a task I would frequently do via other extensions (git blame, for example) but through several clicks.  Sometimes I just wanted a quick way to get to the file online to see if certain code was in a certain branch.  Also, it is an excuse to play around with VS Code Extensions.

To install:
1. Download the VSIX.
1. Click on the Extensions options in VS Code.
1. Click the triple dots at the top and select 'Install from VSIX...'.
1. Select the downloaded file.

## Features

Adds the command 'View in Repo' which will open the current file in the online repo.  It looks for the URL and branch info in your .git/config file and combines it with the path information in your open tab.  No credentials are looked up, it just sends the URL to the default handler for URLs and lets the browser handle permissions.

## Requirements

It just uses built in fs/path imports.  Trying to keep it simple.

## Extension Settings

Keeping it simple, nothing to configure.

## Known Issues

Only supports GitHub.  Azure Repo won't take much to add.

## Release Notes

Unix/Windows GitHub Proof-of-Concept.

### 0.0.1

Unix/Windows GitHub Proof-of-Concept.
