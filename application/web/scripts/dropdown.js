document.addEventListener('DOMContentLoaded', () => {
    function setupDropdown() {
        // Get references to the dropdown button, menu, and Dev Mode toggle
        const three_dots_button = document.getElementById('three-dots-entry');
        const dropdownMenuEntry = document.getElementById('dropdown-menu-entry');
        const devModeToggle = document.getElementById('devModeToggle');
        let devModeActive = false; // Initialize a flag to track Dev Mode status

        // Toggle the visibility of the dropdown menu when the button is clicked
        three_dots_button.addEventListener('click', () => {
            console.log("this shit was clicked");
            // If the menu is currently displayed, hide it. Otherwise, show it.
            dropdownMenuEntry.style.display = dropdownMenuEntry.style.display === 'block' ? 'none' : 'block';
        });

        // Close the dropdown menu when clicking outside of it
        document.addEventListener('click', (event) => {
            // If the click is not on the dropdown button or the menu itself, hide the menu
            if (!three_dots_button.contains(event.target) && !dropdownMenuEntry.contains(event.target)) {
                dropdownMenuEntry.style.display = 'none';
            }
        });

        // Handle clicks on dropdown menu items
        dropdownMenuEntry.addEventListener('click', (event) => {
            // Find the closest ancestor element with the class 'dropdown-item' and get its action attribute
            const action = event.target.closest('.dropdown-item').dataset.action;

            // Check if the action is 'devmode'
            if (action === 'devmode') {
                // Toggle the Dev Mode status
                devModeActive = !devModeActive;
                // Show or hide the checkmark based on the new status
                devModeToggle.querySelector('.checkmark').style.visibility = devModeActive ? 'visible' : 'hidden';
            }

            // Hide the dropdown menu after an item is clicked
            dropdownMenuEntry.style.display = 'none';
        });
    }

    setupDropdown(); // Call setupDropdown after the DOM is loaded
});
