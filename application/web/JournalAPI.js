const decoder = new TextDecoder();
/**
 * Represents a journal, which is a directory containing journal entries.
 */
class Journal {
    /**
     * Create a Journal.
     * @param {string} name - The name of the journal.
     */
    constructor(name) {
        this.name = name;
    }

    /**
     * Update the name of the journal.
     * @param {string} newName - The new name for the journal.
     * @returns {Promise<void>} A promise that resolves when the name has been updated.
     */
    async updateName(newName) {
        await window.fileAPI.updateJournalName(this.name, newName);
        this.name = newName;
    }

    /**
     * Get all entries in the journal.
     * @returns {Promise<Entry[]>} A promise that resolves to an array of Entry objects.
     */
    async getEntries() {
        const entries = await window.fileAPI.getEntries(this.name);
        return entries.map(entryName => new Entry(this.name, entryName));
    }

    /**
     * Delete an entry from the journal.
     * @param {string} entryName - The name of the entry to delete.
     * @returns {Promise<void>} A promise that resolves when the entry has been deleted.
     */
    async deleteEntry(entryName) {
        await window.fileAPI.deleteEntry(this.name, entryName);
    }

    /**
     * Create a new entry in the journal.
     * @param {string} entryName - The name of the new entry.
     * @returns {Promise<Entry>} A promise that resolves to the newly created Entry object.
     */
    async createEntry(entryName) {
        await window.fileAPI.createEntry(this.name, entryName);
        return new Entry(this.name, entryName);
    }
}

/**
 * Represents an entry in a journal, which is a markdown file.
 */
class Entry {
    /**
     * Create an Entry.
     * @param {string} journalName - The name of the journal this entry belongs to.
     * @param {string} name - The name of the entry.
     */
    constructor(journalName, name) {
        this.journalName = journalName;
        this.name = name;
    }

    /**
     * Update the content of the entry.
     * @param {string} newContent - The new content for the entry.
     * @returns {Promise<void>} A promise that resolves when the content has been updated.
     */
    async updateContent(newContent) {
        await window.fileAPI.updateEntryContent(this.journalName, this.name, newContent);
    }

    /**
     * Update the name of the entry.
     * @param {string} newName - The new name for the entry.
     * @returns {Promise<void>} A promise that resolves when the name has been updated.
     */
    async updateName(newName) {
        await window.fileAPI.updateEntryName(this.journalName, this.name, newName);
        this.name = newName;
    }
    /**
     * Get all the content from an entry
     * @returns {Buffer} object containing the entries content
     */
    async getContent() {
        const content = await window.fileAPI.getEntryContent(this.journalName, this.name);
        return decoder.decode(content);
    }
}

/**
 * JournalAPI is used to interface with journals.
 */
class JournalAPI {
    /**
     * Create a JournalAPI instance.
     */
    constructor() { }

    /**
     * Get all journals.
     * @returns {Promise<Journal[]>} A promise that resolves to an array of Journal objects.
     */
    async getJournals() {
        const journals = await window.fileAPI.getJournals();
        return journals.map(journalName => new Journal(journalName));
    }

    /**
     * Create a new journal.
     * @param name The string name of the journal.
     * @returns {Promise<Journal>} A promise that resolves to the newly created Journal object.
     */
    async createJournal(name) {
        let journalName
        if(name)
            journalName = await window.fileAPI.createNamedJournal(name);
        else
            journalName = await window.fileAPI.createJournal();
        return new Journal(journalName);
    }

    /**
     * Delete a journal.
     * @param {string} journalName - The name of the journal to delete.
     * @returns {Promise<void>} A promise that resolves when the journal has been deleted.
     */
    async deleteJournal(journalName) {
        await window.fileAPI.deleteJournal(journalName);
    }
} 
var api = new JournalAPI(); // eslint-disable-line
