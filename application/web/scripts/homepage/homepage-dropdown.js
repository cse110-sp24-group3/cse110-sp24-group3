document.addEventListener('DOMContentLoaded', () => {
    // Function to handle the dropdown toggle and positioning
    function toggleEntryDropdown(event) {

        // console.log('toggleEntryDropdown')

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
        // console.log(rect);
        // Position the dropdown menu
        dropdownMenu.style.left = `${rect.left-200}px`;
        dropdownMenu.style.top = `${rect.bottom-120}px`;

        // Toggle the visibility of the dropdown menu
        if (button.classList.contains('toggledEntryDropdown')) {
            dropdownMenu.style.display = 'block';
            console.log(dropdownMenu.style.left)
            console.log(dropdownMenu.style.top)
            // console.log(dropdownMenu.style.display)
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

    buttons.forEach(button => {
        button.addEventListener('click', toggleEntryDropdown);
    });

    document.addEventListener('click', function(event) {
        const dropdownMenu = document.querySelector('.homepage-dropdown-menu');
        if (!dropdownMenu.contains(event.target)) {
            console.log(event.target);
            closeDropdown();
        }
    });

    console.log('homepage-dropdown.js')
    window.toggleEntryDropdown = toggleEntryDropdown;


});
