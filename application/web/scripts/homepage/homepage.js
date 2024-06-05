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
    const entryListing = document.querySelector('.homepage-entry-list');
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
 * This function is currently identical to cancelEntry() but will have more functionality added in the future.
 */
function saveCurrentEntry() {
    // Hide the text editor
    hideTextEditor();

    // Get the title text area and extract the title
    const titleTextArea = document.querySelector('#title-input');
    const title = titleTextArea.value;
    titleTextArea.style.display = '';

    // Get the entry text area and extract the entry content
    const entryTextArea = document.querySelector('.entry-textarea');
    const entry = entryTextArea.value;
    entryTextArea.value = '';

    // Get the list of past entries and create a new button for the current entry
    const buttonList = document.querySelector('.homepage-entry-list');
    const newEntryButton = document.createElement('button');
    newEntryButton.innerText = title;

    // Create an article element to display the entry content
    const article = document.createElement('article');
    article.innerText = entry;
    article.style.display = 'none';

    // Append the new entry button and article to the list of past entries
    buttonList.append(newEntryButton);
    buttonList.append(article);

    // TODO: Replace with function to load entry from storage
    newEntryButton.addEventListener('click', (event) => {
        // article.style.display = 'block';
        // titleTextArea.value = newEntryButton.innerText;
        // const entryContent = document.querySelector('.CodeMirror-line');
        // entryTextArea.value = entryContent.innerText;

        openEntryforEdit();
        editJournal(event);
    });

    /**
     * 
     * @param {MouseEvent} event 
     */
    async function editJournal(event){

        try {

            const journals = await api.getJournals();  
            //gets the div of entry
            const title = event.target.closest('.homepage-entry-list');
            console.log(title);


            for(const journal of journals){
                //gets each entry of the journal
                const entries = await journal.getEntries();
                //searches of there is a valid entry
                const matchingEntry = entries.find(entry => entry.name === title);

                //if entry matches
                if(matchingEntry){
                    //get the entry's content
                    const content = await matchingEntry.getContent();
                    // console.log(title);

                    //populate the title text to the text area
                    const titleTextArea = document.querySelector('#title-input');
                    titleTextArea.value = title;

                    const entryTextArea = document.querySelector('.entry-textarea');
                    entryTextArea.value = content;
                    // console.log(entryTextArea);

    
                    break;
                }
            }
        }catch(error) {
            console.error(`An error occured: ${error}`);
        }
    }

    // Reset the title text area to default values and hide the text editor
    titleTextArea.value = 'Untitled';
    titleTextArea.className = 'placeholder';
    hideTextEditor();
}
function hideTextEditor() {
    const addNoteButton = document.querySelector('.add-note');
    addNoteButton.style.display = '';

    const addEntryList = document.querySelector('.homepage-entry-list');
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

    const prevEntries = document.querySelector('.homepage-entry-list');
    const prevCount = prevEntries.querySelectorAll('article').length;
    if(prevCount > 0){
        noEntryText.style.display = 'none';
    }
}
