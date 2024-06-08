/// <reference path="../../JournalAPI.js" />

/**
 * Initializes the homepage by hiding the "Create New Entry" button until a journal is created
 * and populates entries if a journal is selected.
 */
export function initializeHomepage() {
    // Select the "Create New Entry" button element
    const entryButton = document.querySelector('.add-note');
    // Hide the button by setting the 'hidden' attribute
    entryButton.setAttribute("hidden", "hidden");

    // Check if a journal is selected and populate entries
    // if (selectedJournal) {
    //     populateEntries();
    // }
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


    titleTextArea.value = 'Untitled';
    titleTextArea.className = 'placeholder';
    entryTextArea.value = '';


    // Close the popup if open
    const myPopup = document.getElementById("myPopup");
    myPopup.classList.remove("show");

    populateEntries();
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
 * Displays a success message.
 */
async function saveCurrentEntry() {

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

    // Reset the title text area to default values and hide the text editor
    titleTextArea.value = 'Untitled';
    titleTextArea.className = 'placeholder';


    const journalName = document.querySelector('input[name="journals"]:checked').value;

    const newEntry = await writeJournalEntryToStorage(entryTitle, entryContent, journalName);
    populateEntries();
}

/**
     * Gets the currently selected journal.
     * @returns {Journal} The currently selected journal, or null if none exist
     */
async function getCurrentJournal() {
    const currentJournalName = document.querySelector('input[name="journals"]:checked').value;
    const journalList = await api.getJournals();
    return journalList.find(journal => journal.name === currentJournalName);
}

/**
 * Updates the current article display with the selected entry
 * @throws Will throw an error if read fails
 */
async function updateArticleTextFromStorage() {
    try {
        const entryTitle = this.innerText;
        const journal = await getCurrentJournal();

        if (journal) {
            const entries = await journal.getEntries();
            const matchingEntry = entries.find(entry => entry.name === entryTitle);

            // if the entry also exists, just update the content
            if (matchingEntry) {
                const content = await matchingEntry.getContent();
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
    try {
        const journalList = await api.getJournals();
        const journal = journalList.find(journal => journal.name === journalName);
        let newEntryCreated = true;
        let matchingEntry;

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
        displaySaveMessage();
        return newEntryCreated;
    } catch (error) {
        console.error(`An error occured: ${error}`);
    }
}

/**
 * Callback function for entry buttons. Opens the editor on click
 * @throws Will throw an error if read fails
 */
async function editJournal(event) {
    try {
        const journals = await api.getJournals();
        const title = event.target.innerText;

        for (const journal of journals) {
            const entries = await journal.getEntries();
            const matchingEntry = entries.find(entry => entry.name === title);

            if (matchingEntry) {
                const content = await matchingEntry.getContent();

                const entryTextArea = document.querySelector('.entry-textarea');
                entryTextArea.value = content;

                const titleInputArea = document.querySelector('#title-input');
                titleInputArea.value = matchingEntry.name;
                titleInputArea.classList.remove('placeholder');

                openEntryforEdit();
                break;
            }
        }
    } catch (error) {
        console.error(`An error occured: ${error}`);
    }
}

/**
 * Hides the text editor from view
 */
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

/**
 * Displays a save message popup for 3 seconds on a successful save
 */
function displaySaveMessage() {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'save-message';
    messageContainer.innerText = 'Entry Successfully Saved';

    document.body.appendChild(messageContainer);

    setTimeout(() => {
        document.body.removeChild(messageContainer);
    }, 3000);
}

/**
 * Populates the current entries tab
 * @throws Will throw an error if read fails
 */
export async function populateEntries() {
    const journal = await getCurrentJournal();
    if (!journal) {
        const noEntryText = document.querySelector('.no-entry-text');
        noEntryText.style.display = '';

        const entryButtonList = document.querySelectorAll('.home-single-entry');
        entryButtonList.forEach(element => element.remove());

        return;
    }
    const entries = await journal.getEntries();

    // change no entry text if entries exist
    if (entries.length > 0) {
        const noEntryText = document.querySelector('.no-entry-text');
        noEntryText.style.display = 'none';
    } else {
        const noEntryText = document.querySelector('.no-entry-text');
        noEntryText.style.display = '';
        return;
    }

    const entryContainer = document.querySelector('.home-list');

    const entryButtonList = document.querySelectorAll('.home-single-entry');
    entryButtonList.forEach(element => element.remove());

    // for each entry add HTML element and add event listener
    entries.forEach(async (entry) => {
        const entryContent = await entry.getContent();

        const entryElement = document.createElement('div');
        entryElement.classList.add('home-single-entry');

        entryElement.innerHTML = `
            <button class="home-single-entry-button">
                <span class="home-entry-name">${entry.name}</span>
            </button>
            <div class="entry-content">${entryContent}</div>
        `;
        // add event listener to open the editing interface
        const entryButton = entryElement.querySelector('button');
        entryButton.addEventListener('click', editJournal);
        entryContainer.appendChild(entryElement);
    });
}