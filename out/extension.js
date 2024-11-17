"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    let disposable = vscode.commands.registerCommand('close-all-images.closeImages', async () => {
        // Get all tabs in all tab groups
        const allTabs = vscode.window.tabGroups.all.map(group => group.tabs).flat();
        // Array to hold the tabs that are images
        let imageTabs = [];
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
        }
        else {
            vscode.window.showInformationMessage('No image tabs are open.');
        }
    });
    context.subscriptions.push(disposable);
}
function isImageTab(tab) {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.svg'];
    let uri;
    // Check the type of tab input to extract the URI
    if (tab.input instanceof vscode.TabInputText) {
        uri = tab.input.uri;
    }
    else if (tab.input instanceof vscode.TabInputCustom) {
        uri = tab.input.uri;
    }
    else {
        // Other types of inputs are not images
        return false;
    }
    if (uri) {
        const fileName = uri.fsPath.toLowerCase();
        return imageExtensions.some(ext => fileName.endsWith(ext));
    }
    return false;
}
function deactivate() { }
//# sourceMappingURL=extension.js.map