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
     document.querySelector('.journal-entry').addEventListener('click', function(event) {
        const targetElement = event.target.closest('.child-element');
        if (targetElement) {
            console.log('Child element clicked:', targetElement);
        }
     });
     
};