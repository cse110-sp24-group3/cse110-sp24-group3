/// <reference path="../../JournalAPI.js" />
/**
 * Creates the sidebar functionality, including mouseover and mouseout event listeners
 * for journal entries.
 */
export function createSidebar() {
    // Grabs the sidebar module element
    const journalEntries = document.querySelector('.sidebar-module');

    // Event listener for mouseover events on journal entries
    journalEntries.addEventListener('mouseover', (event) => {
        // Find the closest ancestor with the class 'journal-entry' that triggered the event
        const targetEntry = event.target.closest('.journal-entry');
        // Filter to just the new journals
        if (targetEntry) {
            // Select the three dot button within the journal entry
            let icon = targetEntry.querySelector('#sidebar-dots');
            // Display the three dots icon
            icon.style.display = 'block';
            // Highlight the journal entry by changing its background color
            targetEntry.style.backgroundColor = '#cbcfce';
        }
    });

    // Event listener for mouseout events on journal entries
    journalEntries.addEventListener('mouseout', (event) => {
        // Find the closest ancestor with the class 'journal-entry' that triggered the event
        const targetEntry = event.target.closest('.journal-entry');
        // Check to make sure that hovered entry was not also selected
        if (targetEntry && targetEntry.getAttribute('isSelected') != 'true') {
            // Select the three dots icon within the journal entry
            let icon = targetEntry.querySelector('#sidebar-dots');
            // Hide the three dots ellipsis icon
            icon.style.display = 'none';
            // Remove the background color highlighting
            targetEntry.style.background = 'none';
        }
    });
    
    //Event listener for new journal button
    const newJournalButton = document.getElementById("new-journal-button");
    newJournalButton.addEventListener('click', createJournal);
};

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
    const journalEntryBtn = document.querySelectorAll('.journal-entry');
    // Toggle the 'toggled-journal-entry' class for each journal entry button
    journalEntryBtn.forEach(entry => {
        entry.classList.toggle('toggled-journal-entry');
    });
};
/**
 * 
 */
async function createJournal() {
    try {
        const newJournal = await api.createJournal();
        selectedJournal = newJournal;
    }
    catch(error) {
        console.error(`Error creating Journal with new Journal button :: ${error}`);
    }
}

// 
export function createJournalEntries() {
    // new journal entries created after
    const journal = document.querySelector('.new-journal');
    journal.addEventListener('click', () => {
        //replicates the div module as it was in html
        const journalEntries = document.querySelector('.sidebar-module');
        const entryElement = document.createElement('div');
        entryElement.classList.add('journal');

        entryElement.innerHTML = `
            <span contentEditable="true">Untitled</span>
            <button>
                <img class = "journal-vdots" src="./assets/vdots-journal-white.svg">
            </button>`;

        journalEntries.appendChild(entryElement);
        // event handler to deal with selecting a given journal
        // updates page title and sidebar visuals
        entryElement.addEventListener('click', function () {
            const journalEntries = document.querySelectorAll('.journal-entry');
            const journalTitle = document.querySelector('#journal-title');
            journalTitle.innerText = `${this.querySelector('span').innerText} Entries`;

            // clear selection visuals on all elements
            journalEntries.forEach((entry) => {
                let faIcon = entry.querySelector('#sidebar-dots')
                faIcon.style.display = 'none';
                entry.style.background = 'none';
                entry.setAttribute('isSelected', '');
                faIcon.srchow 
            });

            // add styling for selected elements
            let faIcon = this.querySelector('#sidebar-dots')
            faIcon.style.display = 'block';
            this.style.backgroundColor = '#cbcfce';

            this.setAttribute('isSelected', true);
       
        });
        entryElement.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                entryElement.remove();
                journalEntries.appendChild(entryElement);
                const newJournal = createJournal(entryElement.innerText);
                selectedJournal = newJournal;
            }
        });

        journalEntries.appendChild(entryElement);
        // Once a journal is created, the "No Journals" text will disappear
        document.getElementById("no-entry-text").style.display = "none";
        if(!document.getElementById('entry-name')) {
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