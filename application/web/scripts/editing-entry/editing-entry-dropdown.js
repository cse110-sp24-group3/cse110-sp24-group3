/// <reference path="../../JournalAPI.js" />
import { getCurrentJournal, updateHomepage } from "../homepage/homepage.js"; 

document.addEventListener('DOMContentLoaded', () => {
    /**
     * Initializes the dropdown menu setup.
     * Gets references to the dropdown button and menu, then attaches necessary event listeners.
     */
    function setupDropdown() {
        // Get references to the dropdown button and menu
        const three_dots_button = document.getElementById('editing-entry-vdots-button');
        const dropdownMenuEntry = document.getElementById('dropdown-menu-entry');
        
        // Attach event listeners
        attachToggleDropdownListener(three_dots_button, dropdownMenuEntry);
        attachOutsideClickListener(three_dots_button, dropdownMenuEntry);
        attachDropdownItemClickListener(dropdownMenuEntry);
    }

    /**
     * Attaches an event listener to the dropdown button to toggle the visibility of the dropdown menu.
     * @param {HTMLElement} button - The dropdown button element.
     * @param {HTMLElement} menu - The dropdown menu element.
     */
    function attachToggleDropdownListener(button, menu) {
        button.addEventListener('click', () => {
            // If the menu is currently displayed, hide it. Otherwise, show it.
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        });
    }

    /**
     * Attaches an event listener to the document to close the dropdown menu when clicking outside of it.
     * @param {HTMLElement} button - The dropdown button element.
     * @param {HTMLElement} menu - The dropdown menu element.
     */
    function attachOutsideClickListener(button, menu) {
        document.addEventListener('click', (event) => {
            // If the click is not on the dropdown button or the menu itself, hide the menu
            if (!button.contains(event.target) && !menu.contains(event.target)) {
                menu.style.display = 'none';
            }
        });
    }

    function getEntryName() {
        const inputElement = document.getElementById('title-input');
        return inputElement.value;
    }

    /**
     * Attaches an event listener to the dropdown menu to handle clicks on menu items.
     * @param {HTMLElement} menu - The dropdown menu element.
     */
    async function attachDropdownItemClickListener(menu) {
        menu.addEventListener('click', async (event) => {
            // Find the closest ancestor element with the class 'dropdown-item' and get its action attribute
            const action = event.target.closest('.dropdown-item').dataset.action;
            
            // Grabbing journal title from h2 element
            const journalTitle = document.getElementById('journal-title').textContent;
            // Fetching relevant current journal
            const journalList = await api.getJournals();
            let currJournal = journalList.find(journal => journal.name === journalTitle);
            console.log(currJournal.name);

            // Find current entry
            const currEntryTitle = getEntryName();
            
            // Delete entry if it exists...Close page regardless
            try {
                currJournal.deleteEntry(currEntryTitle);
            }
            catch(err) {
                alert( `No entry with the name: ${currEntryTitle} in journal: ${journalTitle}`);
            }
            finally {
                // Change the homepage after deleting
                await updateHomepage();
            }
            
            // Hide the dropdown menu after an item is clicked
            menu.style.display = 'none';
        });
    }

    setupDropdown(); // Call setupDropdown after the DOM is loaded
});
