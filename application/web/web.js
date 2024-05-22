window.onload = () => {
    
};

function newJournal() {
    console.log('hi');
    var container = document.getElementById("sidebar-module");
    var journal = document.getElementById("journal-entries");
    var newJournal = journal.cloneNode(true);
    container.appendChild(newJournal);
}