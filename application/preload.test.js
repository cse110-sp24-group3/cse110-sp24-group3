const fs = require('fs-extra');
const path = require('path');
const os = require('os');
jest.mock('fs-extra');
jest.mock('electron', () => ({
    contextBridge: {
        exposeInMainWorld: jest.fn(),
    },
}));

// Require the preload script to initialize the context bridge and global.fileAPI
process.env.NODE_ENV = 'test';
require('./preload.js');

describe('fileAPI', () => {
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
    }
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should get all journals', async () => {
        fs.readdir.mockResolvedValue([{ name: 'Journal1', isDirectory: () => true }, { name: '.hidden', isDirectory: () => true }]);

        const result = await global.fileAPI.getJournals();
        expect(result).toEqual(['Journal1']);
    });

    it('should create a journal', async () => {
        fs.access.mockRejectedValue(new Error('Not Found'));
        fs.mkdir.mockResolvedValue();
        fs.writeFile.mockResolvedValue();

        const result = await global.fileAPI.createJournal();
        expect(result).toEqual('My Journal');
    });

    it('should create a named journal', async () => {
        fs.access.mockRejectedValue(new Error('Not Found'));
        fs.mkdir.mockResolvedValue();
        fs.writeFile.mockResolvedValue();

        const result = await global.fileAPI.createNamedJournal('New Journal');
        expect(result).toEqual('New Journal');
    });

    it('should delete a journal', async () => {
        fs.rm.mockResolvedValue();

        await global.fileAPI.deleteJournal('Journal1');
        expect(fs.rm).toHaveBeenCalledWith(path.join(baseDir, 'Journal1'), { recursive: true, force: true });
    });

    it('should get all entries in a journal', async () => {
        fs.readdir.mockResolvedValue(['entry1.md', 'entry2.md', '.hiddenfile']);

        const result = await global.fileAPI.getEntries('Journal1');
        expect(result).toEqual(['entry1', 'entry2']);
    });

    it('should create an entry in a journal', async () => {
        fs.writeFile.mockResolvedValue();

        const result = await global.fileAPI.createEntry('Journal1', 'entry1');
        expect(result).toEqual('entry1');
        expect(fs.writeFile).toHaveBeenCalledWith(path.join(baseDir, 'Journal1', 'entry1.md'), '', 'utf8');
    });

    it('should delete an entry in a journal', async () => {
        fs.unlink.mockResolvedValue();

        await global.fileAPI.deleteEntry('Journal1', 'entry1');
        expect(fs.unlink).toHaveBeenCalledWith(path.join(baseDir, 'Journal1', 'entry1.md'));
    });

    it('should update the content of an entry', async () => {
        fs.writeFile.mockResolvedValue();

        await global.fileAPI.updateEntryContent('Journal1', 'entry1', 'New Content');
        expect(fs.writeFile).toHaveBeenCalledWith(path.join(baseDir, 'Journal1', 'entry1.md'), 'New Content', 'utf8');
    });

    it('should update the name of an entry', async () => {
        fs.rename.mockResolvedValue();

        await global.fileAPI.updateEntryName('Journal1', 'entry1', 'newEntry');
        expect(fs.rename).toHaveBeenCalledWith(path.join(baseDir, 'Journal1', 'entry1.md'), path.join(baseDir, 'Journal1', 'newEntry.md'));
    });

    it('should get the content of an entry', async () => {
        fs.readFile.mockResolvedValue(Buffer.from('Entry Content'));

        const result = await global.fileAPI.getEntryContent('Journal1', 'entry1');
        expect(result.toString()).toEqual('Entry Content');
    });

    it('should update the name of a journal', async () => {
        fs.rename.mockResolvedValue();

        await global.fileAPI.updateJournalName('Journal1', 'NewJournal');
        expect(fs.rename).toHaveBeenCalledWith(path.join(baseDir, 'Journal1'), path.join(baseDir, 'NewJournal'));
    });
});
