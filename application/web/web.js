window.onload = () => {
    createSidebar();
};


function createSidebar() {

    const journalEntries = document.querySelector('.sidebar-module');
    //grabs whole sidebar entry

    journalEntries.addEventListener('mouseover', (event) => {
        const targetEntry = event.target.closest('.journal-entry');
        //filter to just the new journals
        if(targetEntry){
            let faIcon = targetEntry.querySelector('.fa.fa-ellipsis-v');
            faIcon.style.display = 'block';
        }
    });

    journalEntries.addEventListener('mouseout', (event) => {
        const targetEntry = event.target.closest('.journal-entry');
        if(targetEntry){
            let faIcon = targetEntry.querySelector('.fa.fa-ellipsis-v');
            faIcon.style.display = 'none';
        }
    });

};
document.getElementById('collapse-button').addEventListener('click', toggleSidebar);

function toggleSidebar() {
    const sidebar = document.querySelector('sidebar');
    sidebar.classList.toggle('sidebar-collapsed');
    
    const newJournalBtn = document.querySelector('.new-journal');
    newJournalBtn.classList.toggle('toggled-new-journal');
    
    const journalEntryBtn = document.querySelector('.journal-entry');
    journalEntryBtn.classList.toggle('toggled-journal-entry');
};