window.onload = () => {
    createSidebar();
};

function createSidebar() {

     const journalEntries = document.querySelectorAll('.journal-entry');

     journalEntries.forEach(entry => {

        const faIcon = entry.querySelector('.fa.fa-ellipsis-v');

        entry.addEventListener('mouseover', () => {
            faIcon.style.display = 'block';
        });

        entry.addEventListener('mouseout', () => {
            faIcon.style.display = 'none';
        });
        
     });
};