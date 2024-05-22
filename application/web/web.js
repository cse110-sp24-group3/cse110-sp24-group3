window.onload = () => {
    document.getElementById('collapse-button').addEventListener('click', toggleSidebar);

    function toggleSidebar() {
        const sidebar = document.querySelector('sidebar');
        sidebar.classList.toggle('sidebar-collapsed');
        
        const newJournalBtn = document.querySelector('.new-journal');
        newJournalBtn.classList.toggle('toggled-new-journal');
        
        const journalEntryBtn = document.querySelector('.journal-entry');
        journalEntryBtn.classList.toggle('toggled-journal-entry');
    }
};

function newJournal() {
    console.log('hi');
    var container = document.getElementById("sidebar-module");
    var journal = document.getElementById("journal-entries");
    var newJournal = journal.cloneNode(true);
    container.appendChild(newJournal);
}