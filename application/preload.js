const { contextBridge } = require('electron');
const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const { rejects } = require('assert');


let baseDir;
const APP_NAME = "Instone";
if (process.env.NODE_ENV === 'development') {
    baseDir = path.join(__dirname, 'mock');
}
else {
    switch (process.platform) {
        case 'win32':
            baseDir = path.join(os.homedir(), 'AppData', 'Roaming', APP_NAME);
            break;
        case 'darwin':
            baseDir = path.join(os.homedir(), 'Library', 'Application Support', APP_NAME);
            break;
        case 'linux':
            baseDir = path.join(os.homedir(), '.config', APP_NAME);
            break;
        default:
            throw new Error('Unsupported platform');
    }
}
contextBridge.exposeInMainWorld('fileAPI', {
    getJournals: async () => {
        try {
            const journals = await fs.readdir(baseDir);
            return journals.filter(name => fs.stat(path.join(baseDir, name)).then(stats => stats.isDirectory()));
        } catch (error) {
            throw new Error(`Error getting journals: ${error.message}`);
        }
    },
    createJournal: async () => {
        try {
            let journalName = 'My Journal';
            let dirPath = path.join(baseDir, journalName);
            let counter = 2;

            while (await fs.access(dirPath).then(() => true).catch(() => false)) {
                journalName = `My Journal ${counter++}`;
                dirPath = path.join(baseDir, journalName);
            }

            await fs.mkdir(dirPath);
            await fs.writeFile(path.join(dirPath, 'properties.json'), '{}', 'utf8');
            return journalName;
        } catch (error) {
            throw new Error(`Error creating journal: ${error.message}`);
        }
    },
    createJournal: async (name) => {
        try {
            let journalName = name;
            let dirPath = path.join(baseDir, journalName);
            while (await fs.access(dirPath).then(() => true).catch(() => false)) {
                throw new Error("Journal name already used!");
            }
            await fs.mkdir(dirPath);
            await fs.writeFile(path.join(dirPath, 'properties.json'), '{}', 'utf8');
            return journalName;
        } catch (error) {
            throw new Error(`Error creating journal: ${error.message}`);
        }
    },
    deleteJournal: async (journalName) => {
        try {
            const dirPath = path.join(baseDir, journalName);
            await fs.rm(dirPath, { recursive: true, force: true });
        } catch (error) {
            throw new Error(`Error deleting journal: ${error.message}`);
        }
    },
    getEntries: async (journalName) => {
        try {
            const dirPath = path.join(baseDir, journalName);
            const files = await fs.readdir(dirPath);
            return files.filter(name => name.endsWith('.md'));
        } catch (error) {
            throw new Error(`Error getting entries: ${error.message}`);
        }
    },
    createEntry: async (journalName, entryName) => {
        try {
            const filePath = path.join(baseDir, journalName, `${entryName}.md`);
            await fs.writeFile(filePath, '', 'utf8');
            return entryName;
        } catch (error) {
            throw new Error(`Error creating entry: ${error.message}`);
        }
    },
    deleteEntry: async (journalName, entryName) => {
        try {
            const filePath = path.join(baseDir, journalName, `${entryName}.md`);
            await fs.unlink(filePath);
        } catch (error) {
            throw new Error(`Error deleting entry: ${error.message}`);
        }
    },
    updateEntryContent: async (journalName, entryName, newContent) => {
        try {
            const filePath = path.join(baseDir, journalName, `${entryName}.md`);
            await fs.writeFile(filePath, newContent, 'utf8');
        } catch (error) {
            throw new Error(`Error updating entry content: ${error.message}`);
        }
    },
    updateEntryName: async (journalName, oldEntryName, newEntryName) => {
        try {
            const oldFilePath = path.join(baseDir, journalName, `${oldEntryName}.md`);
            const newFilePath = path.join(baseDir, journalName, `${newEntryName}.md`);
            await fs.rename(oldFilePath, newFilePath);
        } catch (error) {
            throw new Error(`Error updating entry name: ${error.message}`);
        }
    },
    updateJournalName: async (oldName, newName) => {
        try {
            const oldDirPath = path.join(baseDir, oldName);
            const newDirPath = path.join(baseDir, newName);
            await fs.rename(oldDirPath, newDirPath);
        } catch (error) {
            throw new Error(`Error updating journal name: ${error.message}`);
        }
    }
});
