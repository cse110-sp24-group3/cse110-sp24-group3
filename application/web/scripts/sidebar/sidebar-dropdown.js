document.addEventListener('DOMContentLoaded', () => {
    // These variables are already declared in this scope:
    // const sidebarModule = document.querySelector('.sidebar-module');
    // const buttons = sidebarModule.querySelectorAll('.journal-dropdown-button');

    // Grabs the dropdown menu
    const dropdownMenu = document.querySelector('.sidebar-dropdown-menu');
    // Function to handle the dropdown toggle and positioning
    function toggleDropdown(event) {
        // Grabs the button that was just pressed
        const button = event.currentTarget;
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

    // Function to close the dropdown
    function closeDropdown() {
        buttons.forEach(btn => {
            btn.classList.remove('toggledDropdown');
        });
        dropdownMenu.style.display = 'none';
    }

    // Event listener to close the dropdown when clicking outside
    document.addEventListener('click', (event) => {
        // Check if the click is outside the button and dropdown menu
        if (!event.target.closest('.journal-dropdown-button') && !event.target.closest('.sidebar-dropdown-menu')) {
            closeDropdown();
        }
    });

    // Attach the event listener to all journal-dropdown-buttons
    const sidebarModule = document.querySelector('.sidebar-module');
    const buttons = sidebarModule.querySelectorAll('.journal-dropdown-button');
    buttons.forEach(button => {
        button.addEventListener('click', toggleDropdown);
    });

    window.toggleJournalDropdown = toggleDropdown;
});
