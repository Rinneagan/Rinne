const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
  let disposable = vscode.commands.registerCommand('rinne.rinneAction', function () {
    // Determine the workspace folder or default to user's home directory
    const workspaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : require('os').homedir();
    const folderPath = path.join(workspaceFolder, 'new_python_file.py');
    
    // Python code to be written to the file
    const content = `
import os

user_path = os.path.expanduser("~")  # Get user home directory
folder_path = os.path.join(user_path, "Videos", "PROGRAMMING")

def rename_files(folder_path, to_remove):
    """
    Renames all files in a folder by removing a specific portion of the filenames.

    Args:
        folder_path: The path to the folder containing the files to rename.
        to_remove: The string to remove from the filenames.
    """
    for filename in os.listdir(folder_path):
        old_name = os.path.join(folder_path, filename)
        new_name = os.path.join(folder_path, filename.split(to_remove)[0] + ''.join(filename.split(to_remove)[1:]))

        # Check if the filename actually contains the string to remove
        if to_remove in filename:
            os.rename(old_name, new_name)
            print(f"Renamed: {old_name} to {new_name}")
        else:
            print(f"Skipped: {filename} (does not contain '{to_remove}')")

# Example usage:
folder_path = "C:/Users/ebene/Videos/PROGRAMMING"
to_remove = "y2mate.com - "  # Replace with the string to remove

rename_files(folder_path, to_remove)
`;

    // Write Python content to file
    fs.writeFile(folderPath, content, (err) => {
      if (err) {
        vscode.window.showErrorMessage('Failed to create Python file!');
        console.error(err);
      } else {
        vscode.window.showInformationMessage('Python file created successfully!');
      }
    });
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
