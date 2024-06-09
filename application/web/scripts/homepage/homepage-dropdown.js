document.addEventListener('DOMContentLoaded', () => {
    // Function to handle the dropdown toggle and positioning
    function toggleEntryDropdown(event) {

        console.log('toggleEntryDropdown')

        const homeModule = document.querySelector('.home-list');
        const buttons = homeModule.querySelectorAll('.editing-entry-vdots');
        const button = event.currentTarget;
        const dropdownMenu = document.querySelector('.homepage-dropdown-menu');

        // Remove 'toggledDropdown' class from all buttons
        buttons.forEach(btn => {
            if (btn !== button) {
                btn.classList.remove('toggledDropdown');
            }
        });
        // Toggle 'toggledDropdown' class on the clicked button
        button.classList.toggle('toggledEntryDropdown');

        // Get the position of the clicked button
        const rect = button.getBoundingClientRect();
        
        // Position the dropdown menu
        dropdownMenu.style.right = `${rect.left}px`;
        dropdownMenu.style.top = `${rect.bottom}px`;

        // Toggle the visibility of the dropdown menu
        if (button.classList.contains('toggledEntryDropdown')) {
            dropdownMenu.style.display = 'block';
            console.log(dropdownMenu.style.right)
            console.log(dropdownMenu.style.top)
            console.log(dropdownMenu.style.display)
        } else {
            dropdownMenu.style.display = 'none';
        }
    }
    // Function to close the dropdown
    function closeDropdown() {
        buttons.forEach(btn => {
            btn.classList.remove('toggledEntryDropdown');
        });
        dropdownMenu.style.display = 'none';
    }

    // Attach the event listener to all journal-dropdown-buttons
    const homeModule = document.querySelector('.home-list');
    const buttons = homeModule.querySelectorAll('.editing-entry-vdots');
    console.log(buttons);
    buttons.forEach(button => {
        button.addEventListener('click', toggleEntryDropdown);
    });

    console.log('homepage-dropdown.js')
    window.toggleEntryDropdown = toggleEntryDropdown;
});
