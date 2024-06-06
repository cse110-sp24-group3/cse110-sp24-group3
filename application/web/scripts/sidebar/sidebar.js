/// <reference path="../../JournalAPI.js" />

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
    // Grabs new journal button
    const newJournalButton = document.querySelector('.new-journal');

    // Clicking new journal button should create a new journal
    newJournalButton.addEventListener('click', () => {
        // Grabs sidebar-module handle
        const sidebar = document.querySelector('.sidebar-module');
        // Creates div to insert journal and adds 'journal' class property
        const journalDiv = document.createElement('div');
        journalDiv.classList.add('journal');

        // HTML to inject into journal div above
        journalDiv.innerHTML = `
            <span>My Journal</span>
            <button class="journal-dropdown-button">
                <img class = "journal-vdots" src="./assets/vdots-journal-white.svg">
            </button>`;

        // Injects HTML above into journal entry
        sidebar.appendChild(journalDiv);

        // Adds toggle dropdown listener to new button.
        let dropdownButton = journalDiv.querySelector('.journal-dropdown-button');
        dropdownButton.addEventListener('click', window.toggleJournalDropdown);

        journalDiv.addEventListener('click', function () {
            // Sets the displayed journal title to be the clicked journal title
            const displayedJournalTitle = document.querySelector('#journal-title');
            displayedJournalTitle.innerText = `${this.querySelector('span').innerText} Entries`;

            // Clear highlighted visuals on all journals
            sidebar.querySelectorAll(".journal").forEach(journal => {
                // insert code here
                journal.setAttribute('isSelected', false);
                // Select the three dots icon within the journal entry
                let icon = journal.querySelector('.journal-vdots');
                // Hide the three dots ellipsis icon
                icon.style.display = 'none';
                // Remove the background color highlighting
                journal.style.background = 'none';
            });


            // Highlights clicked journal
            this.setAttribute('isSelected', true);
            // Select the three dot button within the journal entry
            let icon = this.querySelector('.journal-vdots');
            // Display the three dots icon
            icon.style.display = 'block';
            // Highlight the journal entry by changing its background color
            this.style.backgroundColor = '#cbcfce';
        });

        // Once a journal is created, the "No Journals" text will disappear
        document.getElementById("no-entry-text").style.display = "none";
        if (!document.getElementById('entry-name')) {
            showHomepageHeaderInfo();
            showNoEntriesText();
        }
    });
};

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
