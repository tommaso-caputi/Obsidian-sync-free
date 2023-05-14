import { Notice, Plugin } from 'obsidian';
/* import * as fs from 'fs'; */
import * as fs from 'fs-extra';
import { execSync } from 'child_process';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}


export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('github', 'Free Sync', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			sync('D:/Obsidian Files/', 'D:/Projects/Github/Obsidian-storage/')

			commitAndPushFolderChanges('D:/Projects/Github/Obsidian-storage/')

			new Notice('File synced!');
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');
	}
}

function sync(sourcePath: string, destinationPath: string): void {
	fs.removeSync(destinationPath);
	fs.copySync(sourcePath, destinationPath);
}

function commitAndPushFolderChanges(folderPath: string): void {
	try {
		process.chdir(folderPath);
		execSync('git add .');
		execSync('git commit -m "Committing folder changes"');
		execSync('git push origin');
		console.log('Changes committed and pushed successfully.');
		new Notice('aasdaa');
	} catch (error) {
		console.error('An error occurred while committing and pushing changes:', error);
	}
}
