document.addEventListener('DOMContentLoaded', () => {
    // Function to handle the dropdown toggle and positioning
    function toggleDropdown(event) {
        const homeModule = document.querySelector('.home-list');
        const buttons = homeModule.querySelectorAll('.editing-entry-vdots');
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
    const homeModule = document.querySelector('.home-list');
    const buttons = homeModule.querySelectorAll('.editing-entry-vdots');
    buttons.forEach(button => {
        button.addEventListener('click', toggleDropdown);
    });

    window.toggleJournalDropdown = toggleDropdown;
});
