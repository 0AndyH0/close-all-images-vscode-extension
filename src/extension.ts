import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('close-all-images.closeImages', async () => {
    // Get all tabs in all tab groups
    const allTabs = vscode.window.tabGroups.all.map(group => group.tabs).flat();

    // Array to hold the tabs that are images
    let imageTabs: vscode.Tab[] = [];

    // Iterate over all tabs
    allTabs.forEach(tab => {
      if (isImageTab(tab)) {
        imageTabs.push(tab);
      }
    });

    // Close all image tabs
    if (imageTabs.length > 0) {
      await vscode.window.tabGroups.close(imageTabs);
      vscode.window.showInformationMessage('All image tabs have been closed.');
    } else {
      vscode.window.showInformationMessage('No image tabs are open.');
    }
  });

  context.subscriptions.push(disposable);
}

function isImageTab(tab: vscode.Tab): boolean {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.svg'];

  let uri: vscode.Uri | undefined;

  // Check the type of tab input to extract the URI
  if (tab.input instanceof vscode.TabInputText) {
    uri = tab.input.uri;
  } else if (tab.input instanceof vscode.TabInputCustom) {
    uri = tab.input.uri;
  } else {
    // Other types of inputs are not images
    return false;
  }

  if (uri) {
    const fileName = uri.fsPath.toLowerCase();
    return imageExtensions.some(ext => fileName.endsWith(ext));
  }

  return false;
}

export function deactivate() {}