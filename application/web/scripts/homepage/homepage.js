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
    if (selectedJournal) {
        populateEntries();
    }
}

/**
 * Creates the homepage functionality by attaching event listeners to buttons and text areas.
 * Initializes the entry and title text areas by clearing their contents on page load.
 */
export function createHomepage() {
    // Attach event listener to the "Add Note" button
    const addNoteButton = document.querySelector('.add-note');
    addNoteButton.addEventListener('click', () => openEntryforEdit());

    // Attach event listener to the "Cancel" button
    const cancelNoteButton = document.getElementById('cancel-note');
    cancelNoteButton.addEventListener('click', () => cancelEntry());

    // Attach event listener to the "Save" button
    const saveNoteButton = document.getElementById('save-entry');
    saveNoteButton.addEventListener('click', () => saveCurrentEntry());

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
    // Get the title text area and extract the title
    const titleTextArea = document.querySelector('#title-input');
    const title = titleTextArea.value;
    
    // Get the entry text area and extract the entry content
    const entryTextArea = document.querySelector('.entry-textarea');
    const entry = entryTextArea.value;

    // Save the entry to the backend
    if (selectedJournal) {
        try {
            const newEntry = await selectedJournal.createEntry(title);
            await newEntry.updateContent(entry);
            displaySaveMessage();
            populateEntries();
        } catch (error) {
            console.error('Error saving entry:', error);
        }
    }
    else {
        console.error('Selected journal undefined.');
    }

    // Reset the title and entry text areas
    titleTextArea.value = 'Untitled';
    titleTextArea.className = 'placeholder';
    entryTextArea.value = '';

    // Hide the text editor and go back to the homepage
    hideTextEditor();
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

    const noEntryText = document.querySelector('.no-entry-text');
    noEntryText.style.display = '';

    const prevEntries = document.querySelector('.past-entries');
    const prevCount = prevEntries.querySelectorAll('article').length;
    if (prevCount > 0) {
        noEntryText.style.display = 'none';
    }
}

function displaySaveMessage() {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'save-message';
    messageContainer.innerText = 'Entry Successfully Saved';

    document.body.appendChild(messageContainer);

    setTimeout(() => {
        document.body.removeChild(messageContainer);
    }, 3000);
}

async function populateEntries() {
    if (!selectedJournal) return;

    const entries = await selectedJournal.getEntries();
    const entryContainer = document.querySelector('.home-list');
    entryContainer.innerHTML = ''; // Clear previous entries

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

        entryContainer.appendChild(entryElement);
    });
}
