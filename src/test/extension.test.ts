import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';

// Relative to out/test/extension.test.js
const EXTENSION_ROOT = path.join(__dirname, '..', '..');
const TEST_DATA_DIR = path.join(EXTENSION_ROOT, 'src', 'test', 'data');
const TIMEOUT = 1000;

suite('Extension Test Suite', () => {
  suiteTeardown(() => {
    vscode.window.showInformationMessage('All tests done!');
  });

  test('Ensure extension activates', async () => {
    let docPath = path.join(TEST_DATA_DIR, 'example.tcl');
    await vscode.workspace.openTextDocument(docPath);

    const extension = vscode.extensions.getExtension('nmoroze.tclint');
    assert.ok(extension, 'Extension not found');
    if (!extension) {
        return;
    }

    let timeout = TIMEOUT;
    while (!extension.isActive && timeout > 0) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        timeout -= 100;
    }
    assert.ok(extension.isActive, `Extension not activated in ${TIMEOUT / 1000} seconds`);

  });
});
