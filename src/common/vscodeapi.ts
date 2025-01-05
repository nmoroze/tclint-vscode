// Copyright (c) Noah Moroze.
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    commands,
    ConfigurationScope,
    Disposable,
    extensions,
    LogOutputChannel,
    Uri,
    window,
    workspace,
    WorkspaceConfiguration,
    WorkspaceFolder,
} from 'vscode';

export function createOutputChannel(name: string): LogOutputChannel {
    return window.createOutputChannel(name, { log: true });
}

export function getConfiguration(config: string, scope?: ConfigurationScope): WorkspaceConfiguration {
    return workspace.getConfiguration(config, scope);
}

export function registerCommand(command: string, callback: (...args: any[]) => any, thisArg?: any): Disposable {
    return commands.registerCommand(command, callback, thisArg);
}

export const { onDidChangeConfiguration } = workspace;

export function getWorkspaceFolders(): readonly WorkspaceFolder[] {
    return workspace.workspaceFolders ?? [];
}

export function getWorkspaceFolder(uri: Uri): WorkspaceFolder | undefined {
    return workspace.getWorkspaceFolder(uri);
}

export function getSupportedLanguageIds(): string[] {
    let extension = extensions.getExtension('nmoroze.tclint');
    if (!extension) {
        return [];
    }
    let contributes = extension.packageJSON.contributes;
    if (!contributes || !contributes.languages) {
        return [];
    }
    return contributes.languages.map((lang: { id: string }) => lang.id);
}
