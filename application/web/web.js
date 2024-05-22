window.onload = () => {
    createSidebar();
};

function createSidebar() {

     const journalEntries = document.querySelectorAll('.journal-entry');

     journalEntries.forEach(entry => {

        const faIcon = entry.querySelector('.vdots');

        entry.addEventListener('mouseover', () => {
            faIcon.style.display = 'block';
        });

        entry.addEventListener('mouseout', () => {
            faIcon.style.display = 'none';
        });
        
     });
    //  document.querySelector('.journal-entry').addEventListener('click', function(event) {
    //     const targetElement = event.target.closest('.child-element');
    //     if (targetElement) {
    //         console.log('Child element clicked:', targetElement);
    //     }
    //  });

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