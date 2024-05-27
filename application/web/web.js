window.onload = () => {
    createHomepage();
    createSidebar();
    createJournalEntries();
    
    showDiscardChangePage();
    
    document.getElementById('collapse-button').addEventListener('click', toggleSidebar);

    function toggleSidebar() {
        const sidebar = document.querySelector('sidebar');
        sidebar.classList.toggle('sidebar-collapsed');
        
        const newJournalBtn = document.querySelector('.new-journal');
        newJournalBtn.classList.toggle('toggled-new-journal');
        
        const journalEntryBtn = document.querySelectorAll('.journal-entry');
        journalEntryBtn.forEach(entry => {
            entry.classList.toggle('toggled-journal-entry');
        });
    };
};

function createJournalEntries(){
    //new journal entries created after
    const journal = document.querySelector('.new-journal');
    journal.addEventListener('click', () => {
        //replicates the div module as it was in html
        const journalEntries = document.querySelector('.sidebar-module');
        const entryElement = document.createElement('div');
        entryElement.classList.add('journal-entry');

        // entryElement.innerHTML = `
        //     <span>My Journal</span>
        //     <button class="edit-journal">
        //         <i class='fa fa-ellipsis-v'></i>
        //     </button>`; 

        //NOT USING fa fa-ellipsis in this iteration
        //using vdots
        entryElement.innerHTML = `
            <span>My Journal</span>
            <button class="edit-journal">
                <img src="./assets/vdots.svg">
            </button>`;
        journalEntries.appendChild(entryElement);
    });
};

function createSidebar() {
    //grabs whole sidebar entry
    const journalEntries = document.querySelector('.sidebar-module');

    journalEntries.addEventListener('mouseover', (event) => {
        const targetEntry = event.target.closest('.journal-entry');
        //filter to just the new journals
        if(targetEntry){
            // let faIcon = targetEntry.querySelector('.fa.fa-ellipsis-v');
            let faIcon = targetEntry.querySelector('img[src="./assets/vdots.svg"]')
            faIcon.style.display = 'block';
            targetEntry.style.backgroundColor = '#cbcfce';
        }
    });

    journalEntries.addEventListener('mouseout', (event) => {
        const targetEntry = event.target.closest('.journal-entry');
        if(targetEntry){
            // let faIcon = targetEntry.querySelector('.fa.fa-ellipsis-v');
            let faIcon = targetEntry.querySelector('img[src="./assets/vdots.svg"]')
            faIcon.style.display = 'none';
            // targetEntry.style.backgroundColor = '#ffffff00'; //can use color or background
            targetEntry.style.background='none';

        }
    });

};
    
function showDiscardChangePage() {
    const button = document.getElementById("myButton");
    const myPopup = document.getElementById("myPopup");
    const closePopup = document.getElementById("closePopup");
    
    button.addEventListener("click", () => {
            myPopup.classList.add("show");
        }
    );
    closePopup.addEventListener("click", () => {
            myPopup.classList.remove("show");
        }
    );
    window.addEventListener("click", (event) => {
            if (event.target == myPopup) {
                myPopup.classList.remove("show");
            }
        }
    );
}

function createHomepage() {

    // Attach event functions to buttons and text areas
    const addNoteButton = document.querySelector('.add-note');
    addNoteButton.addEventListener('click', () => openEntryforEdit());

    const cancelNoteButton = document.getElementById('cancel-note');
    cancelNoteButton.addEventListener('click', () => cancelEntry());

    const saveNoteButton = document.getElementById('save-entry');
    saveNoteButton.addEventListener('click', () => saveCurrentEntry());

    // Clear entry text on page load
    const entryTextArea = document.querySelector('.entry-textarea');
    entryTextArea.value = '';

    // Clear title text on page load
    const titleTextArea = document.querySelector('.title-textarea');
    titleTextArea.value = '';

    // readEntriesFromStorage();
}

function hideTextEditor() {
    const addNoteButton = document.querySelector('.add-note');
    addNoteButton.style.display = '';

    const cancelNoteButton = document.getElementById('cancel-note');
    cancelNoteButton.style.display = '';

    const saveNoteButton = document.getElementById('save-entry');
    saveNoteButton.style.display = '';

    const titleTextArea = document.querySelector('.title-textarea');
    titleTextArea.style.display = '';

    const entryTextArea = document.querySelector('.entry-textarea');
    entryTextArea.style.display = '';
}

/* Event listener to cancel entry. Identical to saveEntry for now, but more functionality can be added.
*/
function cancelEntry() {
    hideTextEditor();

    const titleTextArea = document.querySelector('.title-textarea');
    titleTextArea.style.display = '';
    const entryTextArea = document.querySelector('.entry-textarea');
    entryTextArea.value = '';

    const myPopup = document.getElementById("myPopup");
    myPopup.classList.remove("show");
}

/* Opens the text editor for use. Uses the CSS 'display' property to hide other elements. 'Inverse' of hideEntries() method
 */
function openEntryforEdit() {
    const addNoteButton = document.querySelector('.add-note');
    addNoteButton.style.display = 'none';
    const entryListing = document.querySelector('.home-list');
    entryListing.style.display = 'none';

    const cancelNoteButton = document.getElementById('cancel-note');
    cancelNoteButton.style.display = 'inline';
    const titleTextArea = document.querySelector('.title-textarea');
    titleTextArea.style.display = 'inline';
    const entryTextArea = document.querySelector('.entry-textarea');
    entryTextArea.style.display = 'inline';
}

/* Identical to cancelEntries() for now, more functionality to come. */
function saveCurrentEntry() {
    hideTextEditor();

    const titleTextArea = document.querySelector('.title-textarea');
    const title = titleTextArea.value;
    titleTextArea.style.display = '';
    const entryTextArea = document.querySelector('.entry-textarea');
    const entry = entryTextArea.value;
    entryTextArea.value = '';

    const button_list = document.querySelector('.past-entries');
    const newEntry = document.createElement('button');
    newEntry.innerText = title;
    const article = document.createElement('article');
    article.setAttribute('id', new Date());
    article.innerText = entry;
    article.style.display = 'none';
    newEntry.addEventListener('click', () => {
        const article = document.querySelector(`#${new Date}`);
        article.style.display = 'block';
    });

    button_list.append(newEntry);
    button_list.append(article);
}
