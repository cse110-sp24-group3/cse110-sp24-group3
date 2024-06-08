/// <reference path="../../JournalAPI.js" />

/**
 * Initializes the homepage by hiding the "Create New Entry" button until a journal is created.
 */
export function initializeHomepage() {
    // Select the "Create New Entry" button element
    const entryButton = document.querySelector('.add-note');
    // Hide the button by setting the 'hidden' attribute
    entryButton.setAttribute("hidden", "hidden");
}

/**
 * Creates the homepage functionality by attaching event listeners to buttons and text areas.
 * Initializes the entry and title text areas by clearing their contents on page load.
 */
export function createHomepage() {
    // Attach event listener to the "Add Note" button
    const addNoteButton = document.querySelector('.add-note');
    addNoteButton.addEventListener('click', openEntryforEdit);

    // Attach event listener to the "Cancel" button
    const cancelNoteButton = document.getElementById('cancel-note');
    cancelNoteButton.addEventListener('click', cancelEntry);

    // Attach event listener to the "Save" button
    const saveNoteButton = document.getElementById('save-entry');
    saveNoteButton.addEventListener('click', saveCurrentEntry);

    // Clear entry text on page load
    const entryTextArea = document.querySelector('.entry-textarea');
    entryTextArea.value = '';

    // Clear title text on page load
    const titleTextArea = document.querySelector('.title-textarea');
    titleTextArea.value = '';

    // Uncomment the line below if there is a function to read entries from storage
    // readEntriesFromStorage();
}


/* Event listener to cancel entry. Identical to saveEntry for now, but more functionality can be added.
*/
/**
 * Event listener function to cancel entry editing.
 * Hides the text editor and restores previous entry content if available,
 * otherwise sets default values.
 */
function cancelEntry() {
    // Hide the text editor
    hideTextEditor();

    // Get references to the title and entry text areas
    const titleTextArea = document.querySelector('#title-input');
    const entryTextArea = document.querySelector('.entry-textarea');

    // Get the current date
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // Find the article element for the current date
    const article = document.querySelector(`[id='${year}-${month}-${day}']`);

    // Restore previous entry content if available
    if (article) {
        const oldEntryValue = article.innerText;
        const oldEntryTitle = document.querySelector(`[id='${year}-${month}-${day}-title']`);

        entryTextArea.value = oldEntryValue;
        titleTextArea.value = oldEntryTitle.innerText;
    } else {
        // Set default values if no previous entry exists
        titleTextArea.value = 'Untitled';
        titleTextArea.className = 'placeholder';
        entryTextArea.value = '';
    }

    // Close the popup if open
    const myPopup = document.getElementById("myPopup");
    myPopup.classList.remove("show");
}
/**
 * Opens the text editor for editing an entry.
 * Uses the CSS 'display' property to hide other elements.
 * This function is the inverse of the hideEntries() method.
 */
function openEntryforEdit() {
    // Hide the "Add Note" button and entry listing
    const addNoteButton = document.querySelector('.add-note');
    addNoteButton.style.display = 'none';
    const entryListing = document.querySelector('.home-list');
    entryListing.style.display = 'none';

    // Display the "Cancel" button, title textarea, and entry textarea
    const cancelNoteButton = document.getElementById('cancel-note');
    cancelNoteButton.style.display = 'inline';
    const titleTextArea = document.querySelector('.title-textarea');
    titleTextArea.style.display = 'inline';
    const entryTextArea = document.querySelector('.entry-textarea');
    entryTextArea.style.display = 'inline';
    const livePreview = document.querySelector('.live-preview');
    livePreview.style.display = 'inline';
    // Hide the "No entries" text
    const noEntryText = document.querySelector('.no-entry-text');
    noEntryText.style.display = 'none';
}

/**
 * Saves the current entry.
 * Hides the text editor and prepares the entry to be displayed.
 * This function is currently identical to cancelEntry() but will have more functionality added in the future.
 */
function saveCurrentEntry() {
    // Hide the text editor
    hideTextEditor();

    // Get the title text area and extract the title
    const titleTextArea = document.querySelector('#title-input');
    const entryTitle = titleTextArea.value;
    titleTextArea.style.display = '';

    // Get the entry text area and extract the entry content
    // TODO: make selector cleaner
    // const entryTextSelectorString = `#entry-textarea > div > div.CodeMirror-scroll > div.CodeMirror-sizer > div > div > div > div.CodeMirror-code > div > pre > span`;
    const entryTextArea = document.querySelector('.CodeMirror').CodeMirror;
    const entryContent = entryTextArea.getValue('\n');
    entryTextArea.value = '';

    // Get the list of past entries and create a new button for the current entry
    const buttonList = document.querySelector('.past-entries');
    const newEntryButton = document.createElement('button');
    newEntryButton.innerText = entryTitle;

    newEntryButton.addEventListener('click', updateArticleTextFromStorage)


    // Reset the title text area to default values and hide the text editor
    titleTextArea.value = 'Untitled';
    titleTextArea.className = 'placeholder';

    const journalName = document.querySelector('input[name="journals"]:checked').value;

    console.log('')
    const newEntry = writeJournalEntryToStorage(entryTitle, entryContent, journalName);
    if (newEntry)
        // Append the new entry button and article to the list of past entries
        buttonList.append(newEntryButton);
}


/**
 * Writes a new journal entry to storage with the given parameters.
 * @throws Will throw an error if read fails
 */
async function updateArticleTextFromStorage() {
    try {
        const currentJournalName = document.querySelector('input[name="journals"]:checked').value;
        const entryTitle = this.innerText;

        const journalList = await api.getJournals();
        const journal = journalList.find(journal => journal.name === currentJournalName);
        if (journal) {
            const entries = await journal.getEntries();
            const matchingEntry = entries.find(entry => entry.name === entryTitle);

            // if the entry also exists, just update the content
            if (matchingEntry) {
                const content = await matchingEntry.getContent();
                console.log(`Read Content: ${content} and ${typeof content} and ${content.length}`)
                console.log(`Read Name: ${matchingEntry.name}`)
                const entryArticle = document.querySelector('.selected-entry-article')
                entryArticle.innerText = content;
            } else {
                throw new Error('Entry not found')
            }
            // if the journal doesn't exist, then create a new journal
        } else {
            throw new Error('Journal not found')
        }

    } catch (error) {
        console.error(`An error occured: ${error}`);
    }
}

/**
 * Writes a new journal entry to storage with the given parameters.
 * @param {string} entryTitle - The title of the entry.
 * @param {string} entryContent - The markdown content of the entry.
 * @param {string} journalName - The name of the journal this entry belongs to.
 * @returns {boolean} true if a new entry was created, false otherwise
 * @throws Will throw an error if write fails
 */
async function writeJournalEntryToStorage(entryTitle, entryContent, journalName) {
    console.log('penis')
    try {
        const journalList = await api.getJournals();
        const journal = journalList.find(journal => journal.name === journalName);
        let newEntryCreated = true;
        let matchingEntry;

        console.log(`Write Content: ${entryContent}`)
        console.log(`Write Name: ${entryTitle}`)
        // if the journal exists, then access that journal 
        if (journal) {
            const entries = await journal.getEntries();
            matchingEntry = entries.find(entry => entry.name === entryTitle);

            // if the entry also exists, just update the content
            if (matchingEntry) {
                console.log('matched')
                newEntryCreated = false;
            } else {
                // otherwise create a new entry in the journal
                matchingEntry = await journal.createEntry(entryTitle, entryContent);
            }
            // if the journal doesn't exist, then create a new journal
        } else {
            const newJournal = await api.createJournal(journalName);
            matchingEntry = await newJournal.createEntry(entryTitle, entryContent);
        }
        await matchingEntry.updateContent(entryContent)
        return true;
    } catch (error) {
        console.error(`An error occured: ${error}`);
    }
}

function hideTextEditor() {
    const addNoteButton = document.querySelector('.add-note');
    addNoteButton.style.display = '';

    const addEntryList = document.querySelector('.home-list');
    addEntryList.style.display = '';

    const cancelNoteButton = document.getElementById('cancel-note');
    cancelNoteButton.style.display = '';

    const saveNoteButton = document.getElementById('save-entry');
    saveNoteButton.style.display = '';

    const titleTextArea = document.querySelector('.title-textarea');
    titleTextArea.style.display = '';

    const entryTextArea = document.querySelector('.entry-textarea');
    entryTextArea.style.display = '';

    // LRC 
    // Need to hide the preview along with textArea
    const livePreview = document.querySelector('.live-preview');
    livePreview.style.display = '';

    const noEntryText = document.querySelector('.no-entry-text');
    noEntryText.style.display = '';

    const prevEntries = document.querySelector('.past-entries');
    const prevCount = prevEntries.querySelectorAll('article').length;
    if (prevCount > 0) {
        noEntryText.style.display = 'none';
    }
}
