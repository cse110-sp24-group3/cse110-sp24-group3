window.onload = () => {
    createSidebar();
    createJournalEntries();
    
    document.getElementById('collapse-button').addEventListener('click', toggleSidebar);

    function toggleSidebar() {
        const sidebar = document.querySelector('sidebar');
        sidebar.classList.toggle('sidebar-collapsed');
        
        const newJournalBtn = document.querySelector('.new-journal');
        newJournalBtn.classList.toggle('toggled-new-journal');
        
        const journalEntryBtn = document.querySelector('.journal-entry');
        journalEntryBtn.classList.toggle('toggled-journal-entry');
    };
};

function createJournalEntries(){
    const journal = document.querySelector('.new-journal');
    journal.addEventListener('click', () => {
        const journalEntries = document.querySelector('.sidebar-module');
        const entryElement = document.createElement('div');
        entryElement.classList.add('journal-entry');
        entryElement.innerHTML = `
            <span>My Journal</span>
            <button class="edit-journal">
                <i class='fa fa-ellipsis-v'></i>
            </button>`;
        journalEntries.appendChild(entryElement);
    });
};

function createSidebar() {

    const journalEntries = document.querySelector('.sidebar-module');
    //grabs whole sidebar entry

    journalEntries.addEventListener('mouseover', () => {
        const targetEntry = event.target.closest('.journal-entry');
        //filter to just the new journals
        if(targetEntry){
            let faIcon = targetEntry.querySelector('.fa.fa-ellipsis-v');
            faIcon.style.display = 'block';
        }
    });

    journalEntries.addEventListener('mouseout', () => {
        const targetEntry = event.target.closest('.journal-entry');
        if(targetEntry){
            let faIcon = targetEntry.querySelector('.fa.fa-ellipsis-v');
            faIcon.style.display = 'none';
        }
    });

};