/// <reference path="../../JournalAPI.js" />
import { populateEntries } from "../homepage/homepage.js";
/**
 * Toggles the sidebar, new journal button, and journal entry buttons
 * between collapsed and expanded states.
 */
export function toggleSidebar() {
    // Select the sidebar element
    const sidebar = document.querySelector('sidebar');
    // Toggle the 'sidebar-collapsed' class to collapse or expand the sidebar
    sidebar.classList.toggle('sidebar-collapsed');

    // Select the new journal button
    const newJournalBtn = document.querySelector('.new-journal');
    // Toggle the 'toggled-new-journal' class to show or hide the new journal button
    newJournalBtn.classList.toggle('toggled-new-journal');

    // Select all journal entry buttons
    const journalEntryBtn = document.querySelectorAll('.journal');
    // Toggle the 'toggled-journal' class for each journal entry button
    journalEntryBtn.forEach(entry => {
        entry.classList.toggle('toggled-journal');
    });
};

export function createJournalEntries() {
    const newJournalButton = document.querySelector('.new-journal');

    const sidebar = document.querySelector('.journal-list');

    sidebar.addEventListener('change', updateTitleText);
    sidebar.addEventListener('change', populateEntries);
    // Clicking new journal button should create a new journal
    newJournalButton.addEventListener('click', () => {
        // Grabs sidebar-module handle
        const sidebar = document.querySelector('.journal-list');
        // Creates div to insert journal and adds 'journal' class property
        const journalDiv = document.createElement('div');
        journalDiv.classList.add('journal');

        const numJournals = document.querySelectorAll('.journal').length;

        // HTML to inject into journal div above
        journalDiv.innerHTML = `
            <label>
                <input type="radio" id="journal-${numJournals}" name="journals" value="Journal #${numJournals}" checked />Journal #${numJournals}
            </label>
            <button class="journal-dropdown-button">
                <img class = "journal-vdots" src="./assets/vdots-journal-white.svg">
            </button>`;


        // Injects HTML above into journal entry
        sidebar.appendChild(journalDiv);

        // Adds toggle dropdown listener to new button.
        let dropdownButton = journalDiv.querySelector('.journal-dropdown-button');
        dropdownButton.addEventListener('click', window.toggleJournalDropdown);

        // Once a journal is created, the "No Journals" text will disappear
        document.querySelector("#no-journal-text").style.display = "none";
        if (!document.getElementById('entry-name')) {
            showHomepageHeaderInfo();
            showNoEntriesText();
        }
        updateTitleText();
        populateEntries();
    });
};

function updateTitleText() {
    const titleText = document.querySelector('input[name="journals"]:checked').value;
    const titleHeader = document.querySelector('#journal-title');
    titleHeader.innerText = titleText;
}

/**
 * Inserts "No Journal Entries" text into the designated area.
 */
function showNoEntriesText() {
    const noJournalText = document.querySelector('.no-entry-text');
    noJournalText.insertAdjacentHTML("beforeend", `
        <b>You have no Journal Entries</b>
        <p>Click "Create New Entry" on top to start your first entry.</p>`
    );
}

/**
 * Displays the header information on the homepage including the "Create New Entry" button,
 * "Entry Name", and "Date Logged" headers.
 */
function showHomepageHeaderInfo() {
    // Show the "Create New Entry" button when a journal is selected
    const entryButton = document.querySelector('.add-note');
    entryButton.removeAttribute("hidden");

    // Adds the "Entry Name" and "Date Logged" header when a journal is populated
    const test = document.querySelector('.home-entry-descriptor');
    test.insertAdjacentHTML("afterbegin", `
        <span id="entry-name" style="font-family: 'Inter'">Entry Name</span>
        <span id="date-logged" style="font-family: 'Inter'">Date Logged</span>`
    );

    // Adds the black line after the "Entry Name" and "Date Logged" header
    test.insertAdjacentHTML("afterend", `
        <div class="home-single-entry"></div>`
    );
}
