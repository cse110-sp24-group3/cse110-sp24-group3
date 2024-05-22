window.onload = () => {
    createSidebar();
    createJournalEntries();
    
    showDiscardChangePage();
    
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

    const journalEntries = document.querySelector('.sidebar-module');
    //grabs whole sidebar entry

    journalEntries.addEventListener('mouseover', (event) => {
        const targetEntry = event.target.closest('.journal-entry');
        //filter to just the new journals
        if(targetEntry){
            // let faIcon = targetEntry.querySelector('.fa.fa-ellipsis-v');
            let faIcon = targetEntry.querySelector('img[src="./assets/vdots.svg"]')
            faIcon.style.display = 'block';
            console.log('enter');
        }
    });

    journalEntries.addEventListener('mouseout', (event) => {
        const targetEntry = event.target.closest('.journal-entry');
        if(targetEntry){
            // let faIcon = targetEntry.querySelector('.fa.fa-ellipsis-v');
            let faIcon = targetEntry.querySelector('img[src="./assets/vdots.svg"]')
            faIcon.style.display = 'none';
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
