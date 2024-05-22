window.onload = () => {
    showDiscardChangePage();
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
    

function showDiscardChangePage() {
    const button = document.getElementById("myButton");
    const myPopup = document.getElementById("myPopup");
    
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