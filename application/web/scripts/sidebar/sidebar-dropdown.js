import { populateJournals } from "./sidebar.js";


document.addEventListener('DOMContentLoaded', () => {
    // Function to handle the dropdown toggle and positioning
    function toggleDropdown(event) {
        const sidebarModule = document.querySelector('.sidebar-module');
        const buttons = sidebarModule.querySelectorAll('.journal-dropdown-button');
        const button = event.currentTarget;
        const dropdownMenu = document.querySelector('.sidebar-dropdown-menu');

        // Remove 'toggledDropdown' class from all buttons
        buttons.forEach(btn => {
            if (btn !== button) {
                btn.classList.remove('toggledDropdown');
            }
        });

        // Toggle 'toggledDropdown' class on the clicked button
        button.classList.toggle('toggledDropdown');

        // Get the position of the clicked button
        const rect = button.getBoundingClientRect();

        // Position the dropdown menu
        dropdownMenu.style.left = `${rect.right}px`;
        dropdownMenu.style.top = `${rect.top}px`;

        // Toggle the visibility of the dropdown menu
        if (button.classList.contains('toggledDropdown')) {
            dropdownMenu.style.display = 'block';
        } else {
            dropdownMenu.style.display = 'none';
        }
    }

    /**
     * Callback function for the dropdown menu to allow for deleting of journal
     */
    async function deleteJournalOnDropdownMenuClick() {
        // grab the toggled journal and then go to its sibling to extract the journal name
        const journal = document.querySelector('.toggledDropdown').parentElement;

        try {
            const journalName = journal.querySelector('input').value;
            console.log(journalName)
            await api.deleteJournal(journalName);
        } catch (err) {
            console.err(`Error on deleting journal: ${err.message}`);
        }
        const dropdownMenu = document.querySelector('.sidebar-dropdown-menu');
        dropdownMenu.style.display = 'none';

        populateJournals();
    }

    // Attach the event listener to all journal-dropdown-buttons
    const sidebarModule = document.querySelector('.sidebar-module');
    const buttons = sidebarModule.querySelectorAll('.journal-dropdown-button');
    buttons.forEach(button => {
        button.addEventListener('click', toggleDropdown);
    });

    window.toggleJournalDropdown = toggleDropdown;

    const deleteJournalButton = document.querySelector('#trash');
    console.log(deleteJournalButton.innerHTML);
    deleteJournalButton.addEventListener('click', deleteJournalOnDropdownMenuClick)
});

