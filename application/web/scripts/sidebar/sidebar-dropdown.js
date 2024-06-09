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

    // Attach the event listener to all journal-dropdown-buttons
    const sidebarModule = document.querySelector('.sidebar-module');
    const buttons = sidebarModule.querySelectorAll('.journal-dropdown-button');
    buttons.forEach(button => {
        button.addEventListener('click', toggleDropdown);
    });

    window.toggleJournalDropdown = toggleDropdown;
});
