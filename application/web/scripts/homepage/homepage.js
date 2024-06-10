/// <reference path="../../JournalAPI.js" />
import { sleep } from '../sidebar/sidebar.js';

/**
 * Creates the homepage functionality by attaching event listeners to buttons and text areas.
 * Initializes the entry and title text areas by clearing their contents on page load.
 */
export async function createHomepage() {
    // Attach event listener to the "Add Note" button
    const addNoteButton = document.querySelector('.add-note');
    addNoteButton.addEventListener('click', openEntryforEdit);
    // Hide the button by setting the 'hidden' attribute
    if (!(await getCurrentJournal()))
        addNoteButton.style.display = 'none';

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
    updateHomepage();
}

/**
 * Event listener function to cancel entry editing.
 * Hides the text editor and restores previous entry content if available,
 * otherwise sets default values.
 */
function cancelEntry() {
    // Hide the text editor
    hideTextEditor();
    updateHomepage();

    // Get references to the title and entry text areas
    const titleTextArea = document.querySelector('#title-input');
    const entryTextArea = document.querySelector('.entry-textarea');


    titleTextArea.value = 'Untitled';
    titleTextArea.className = 'placeholder';
    entryTextArea.value = '';


    // Close the popup if open
    const myPopup = document.getElementById("myPopup");
    myPopup.classList.remove("show");

    sleep(100).then(() => {
        updateHomepage()
    });
}

/**
 * Opens the text editor for editing an entry.
 * Uses the CSS 'display' property to hide other elements.
 * This function is the inverse of the hideEntries() method.
 */
function openEntryforEdit() {
    // Hide the "Add Note" button and entry listing
    hideAddNoteButton();
    const entryListing = document.querySelector('.home-list');
    entryListing.style.display = 'none';

    // Display the "Cancel" button, title textarea, and entry textarea
    const cancelNoteButton = document.getElementById('cancel-note');
    cancelNoteButton.style.display = 'inline';
    const titleTextArea = document.querySelector('.title-textarea');
    titleTextArea.style.display = 'inline';
    const entryTextArea = document.querySelector('.entry-textarea');
    entryTextArea.style.display = 'inline';

    const codeMirror = document.querySelector('.CodeMirror').CodeMirror;
    codeMirror.setValue('');

    const livePreview = document.querySelector('.live-preview');
    livePreview.style.display = 'inline';
    // Hide the "No entries" text
    hideNoEntriesText();
}

/**
 * Saves the current entry.
 * Hides the text editor and prepares the entry to be displayed.
 * Displays a success message.
 */
async function saveCurrentEntry() {

    // Hide the text editor
    hideTextEditor();
    updateHomepage();

    // Get the title text area and extract the title
    const titleTextArea = document.querySelector('#title-input');
    const entryTitle = titleTextArea.value;
    titleTextArea.style.display = '';

    // Get the entry text area and extract the entry content
    const entryTextArea = document.querySelector('.CodeMirror').CodeMirror;
    const entryContent = entryTextArea.getValue('\n');
    entryTextArea.value = '';

    // Reset the title text area to default values and hide the text editor
    titleTextArea.value = 'Untitled';
    titleTextArea.className = 'placeholder';

    const journalName = document.querySelector('input[name="journals"]:checked').value;

    await writeJournalEntryToStorage(entryTitle, entryContent, journalName);
    await updateHomepage();
}

/**
     * Gets the currently selected journal.
     * @returns {Journal} The currently selected journal, or null if none exist
     */
export async function getCurrentJournal() {
    const currentJournal = document.querySelector('input[name="journals"]:checked');
    if (currentJournal) {
        const journalList = await api.getJournals();
        return journalList.find(journal => journal.name === currentJournal.value);
    }
    return null;
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
        console.trace();
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

                const titleInputArea = document.querySelector('#title-input');
                titleInputArea.value = matchingEntry.name;
                titleInputArea.classList.remove('placeholder');

                openEntryforEdit();

                document.querySelector('.CodeMirror').CodeMirror.setValue(content);
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
export function hideTextEditor() {
    hideAddNoteButton();

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
}

/**
 * Displays a save message popup for 3 seconds on a successful save
 */
function displaySaveMessage() {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'save-message';
    messageContainer.innerText = 'Entry Successfully Saved';

    document.querySelector('homepage').appendChild(messageContainer);

    setTimeout(() => {
        document.querySelector('homepage').removeChild(messageContainer);
    }, 3000);
}

/**
 * Populates the current entries tab
 * @throws Will throw an error if read fails
 */
export async function populateEntries() {
    await clearEntries();
    const journal = await getCurrentJournal();
    // change to no journal text if no journal is selected
    if (!journal) {
        showNoJournalsText()
        return;
    }

    const entries = await journal.getEntries();

    // change to no entry text if entries exist
    if (entries.length > 0) {
        hideNoEntriesText()
    } else {
        showNoEntriesText();
        return;
    }

    const entryContainer = document.querySelector('.home-list');

    // for each entry add HTML element and add event listener
    entries.forEach(async (entry) => {
        const entryContent = await entry.getContent();
        const entryDate = entry.getEntryDate();

        document.querySelector('.CodeMirror').CodeMirror.setValue(entryContent);

        const entryElement = document.createElement('div');
        entryElement.classList.add('home-single-entry');


        // TODO: access last edited date

        entryElement.innerHTML = `
            <button class="home-single-entry-button">
                <span class="home-entry-name">${entry.name}</span>
            </button>
            <div class="entry-content">${entryDate.month}/${entryDate.date}/${entryDate.year}</div>
        `;

        // add event listener to open the editing interface
        const entryButton = entryElement.querySelector('button');
        entryButton.addEventListener('click', editJournal);
        entryContainer.appendChild(entryElement);
    });
}

/**
 * Updates the homepage based on the current state of the app
 */
export async function updateHomepage() {
    const journal = await getCurrentJournal();
    hideTextEditor();
    // if no journals, update homepage
    // if there is a selected journal but no entries in that journal, show the no entries text
    // otherwise fill in the homepage with the past entries
    if (!journal) {
        showNoJournalsText();
        hideNoEntriesText();
        hideAddNoteButton();
    } else {
        const entries = await journal.getEntries();
        if (entries.length > 0) {
            console.log(`has entries`)
            hideNoEntriesText();
        } else {
            console.log(`has no entries`)
            showNoEntriesText();
        }
        // console.log(`Journal: ${journal.name} has ${entries.length} entries`)
        hideNoJournalsText();
        showAddNoteButton();
    }
    sleep(100).then(() => {
        populateEntries();
    });
}

/**
 * Clears all the prior entries on the homepage
 */

function clearEntries() {
    const entryButtonList = document.querySelectorAll('.home-single-entry');
    entryButtonList.forEach(element => element.remove());
}

/**
 * Shows the no entries text on the homepage
 */
function showNoEntriesText() {
    const noEntryText = document.querySelector('.no-entry-text');
    noEntryText.style.display = '';
}

/**
 * Hides the no entries text on the homepage
 */
function hideNoEntriesText() {
    const noEntryText = document.querySelector('.no-entry-text');
    noEntryText.style.display = 'none';
}

/**
 * Shows the no journals text on the homepage
 */
function showNoJournalsText() {
    const noJournalText = document.querySelector('#no-journal-text');
    noJournalText.style.display = '';
}

/**
 * Hides the no journals text on the homepage
 */
function hideNoJournalsText() {
    const noJournalText = document.querySelector('#no-journal-text');
    noJournalText.style.display = 'none';
}

/**
 * Shows the create entry button on the homepage
 */
function showAddNoteButton() {
    const addNoteButton = document.querySelector('.add-note');
    addNoteButton.style.display = '';
}

/**
 * Hides the create entry button on the homepage
 */
function hideAddNoteButton() {
    const addNoteButton = document.querySelector('.add-note');
    addNoteButton.style.display = 'none';
}