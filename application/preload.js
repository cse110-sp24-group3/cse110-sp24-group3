const { contextBridge } = require('electron');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');

let baseDir;
const APP_NAME = "Instone";
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    baseDir = path.join(__dirname, 'mock');
} else {
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
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });
    }
}

const fileAPI = {
    /**
     * Get all journal names in the base directory.
     * @returns {Promise<string[]>} An array of journal names.
     */
    getJournals: async () => {
        try {
            const journals = await fs.readdir(baseDir, { withFileTypes: true });
            return journals.filter(item => item.isDirectory() && !item.name.startsWith('.')).map(dirent => dirent.name);
        } catch (error) {
            throw new Error(`Error getting journals: ${error.message}`);
        }
    },

    /**
     * Create a new journal with a default name.
     * @returns {Promise<string>} The name of the created journal.
     */
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

    /**
     * Create a new journal with a specified name.
     * @param {string} name - The name of the new journal.
     * @returns {Promise<string>} The name of the created journal.
     */
    createNamedJournal: async (name) => {
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

    /**
     * Delete a journal by name.
     * @param {string} journalName - The name of the journal to delete.
     * @returns {Promise<void>}
     */
    deleteJournal: async (journalName) => {
        try {
            const dirPath = path.join(baseDir, journalName);
            await fs.rm(dirPath, { recursive: true, force: true });
        } catch (error) {
            throw new Error(`Error deleting journal: ${error.message}`);
        }
    },

    /**
     * Get all entries in a journal.
     * @param {string} journalName - The name of the journal.
     * @returns {Promise<string[]>} An array of entry names.
     */
    getEntries: async (journalName) => {
        try {
            const dirPath = path.join(baseDir, journalName);
            const files = await fs.readdir(dirPath);
            return files.filter(name => name.endsWith('.md')).map(entryName => entryName.replace(".md", "").trim());
        } catch (error) {
            throw new Error(`Error getting entries: ${error.message}`);
        }
    },

    /**
     * Create a new entry in a journal.
     * @param {string} journalName - The name of the journal.
     * @param {string} entryName - The name of the new entry.
     * @returns {Promise<string>} The name of the created entry.
     */
    createEntry: async (journalName, entryName) => {
        try {
            const filePath = path.join(baseDir, journalName, `${entryName}.md`);
            await fs.writeFile(filePath, '', 'utf8');
            return entryName;
        } catch (error) {
            throw new Error(`Error creating entry: ${error.message}`);
        }
    },

    /**
     * Delete an entry from a journal.
     * @param {string} journalName - The name of the journal.
     * @param {string} entryName - The name of the entry to delete.
     * @returns {Promise<void>}
     */
    deleteEntry: async (journalName, entryName) => {
        try {
            const filePath = path.join(baseDir, journalName, `${entryName}.md`);
            await fs.unlink(filePath);
        } catch (error) {
            throw new Error(`Error deleting entry: ${error.message}`);
        }
    },

    /**
     * Update the content of an entry.
     * @param {string} journalName - The name of the journal.
     * @param {string} entryName - The name of the entry.
     * @param {string} newContent - The new content for the entry.
     * @returns {Promise<void>}
     */
    updateEntryContent: async (journalName, entryName, newContent) => {
        try {
            const filePath = path.join(baseDir, journalName, `${entryName}.md`);
            await fs.writeFile(filePath, newContent, 'utf8');
        } catch (error) {
            throw new Error(`Error updating entry content: ${error.message}`);
        }
    },

    /**
     * Update the name of an entry.
     * @param {string} journalName - The name of the journal.
     * @param {string} oldEntryName - The current name of the entry.
     * @param {string} newEntryName - The new name for the entry.
     * @returns {Promise<void>}
     */
    updateEntryName: async (journalName, oldEntryName, newEntryName) => {
        try {
            const oldFilePath = path.join(baseDir, journalName, `${oldEntryName}.md`);
            const newFilePath = path.join(baseDir, journalName, `${newEntryName}.md`);
            await fs.rename(oldFilePath, newFilePath);
        } catch (error) {
            throw new Error(`Error updating entry name: ${error.message}`);
        }
    },

    /**
     * Get the content of an entry.
     * @param {string} journalName - The name of the journal.
     * @param {string} entryName - The name of the entry.
     * @returns {Promise<Buffer>} The content of the entry.
     */
    getEntryContent: async (journalName, entryName) => {
        try {
            const filePath = path.join(baseDir, journalName, `${entryName}.md`);
            const dataBuffer = await fs.readFile(filePath);
            return dataBuffer;
        } catch (error) {
            throw new Error(`Error fetching journal content: ${error.message}`);
        }
    },

    /**
     * Update the name of a journal.
     * @param {string} oldName - The current name of the journal.
     * @param {string} newName - The new name for the journal.
     * @returns {Promise<void>}
     */
    updateJournalName: async (oldName, newName) => {
        try {
            const oldDirPath = path.join(baseDir, oldName);
            const newDirPath = path.join(baseDir, newName);
            await fs.rename(oldDirPath, newDirPath);
        } catch (error) {
            throw new Error(`Error updating journal name: ${error.message}`);
        }
    }
};

contextBridge.exposeInMainWorld('fileAPI', fileAPI);

// Expose fileAPI to global scope for testing
if (process.env.NODE_ENV === 'test') {
    global.fileAPI = fileAPI;
}