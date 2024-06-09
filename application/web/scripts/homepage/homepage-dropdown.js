document.addEventListener('DOMContentLoaded', () => {
    // Function to handle the dropdown toggle and positioning
    const dropdownMenu = document.querySelector('.homepage-dropdown-menu');

    function toggleHomepageDropdown(event) {

        // console.log('toggleHomepageDropdown')

        const homeModule = document.querySelector('.home-list');
        const buttons = homeModule.querySelectorAll('.editing-entry-vdots');
        const button = event.currentTarget;
        
        // Remove 'toggledDropdown' class from all buttons
        buttons.forEach(btn => {
            if (btn !== button) {
                btn.classList.remove('toggledDropdown');
            }
        });
        // Toggle 'toggledDropdown' class on the clicked button
        button.classList.toggle('toggleHomepageDropdown');

        // Get the position of the clicked button
        const rect = button.getBoundingClientRect();
        // console.log(rect);
        // Position the dropdown menu
        dropdownMenu.style.left = `${rect.left-200}px`;
        dropdownMenu.style.top = `${rect.bottom-120}px`;

        // Toggle the visibility of the dropdown menu
        if (button.classList.contains('toggleHomepageDropdown')) {
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
            btn.classList.remove('toggleHomepageDropdown');
        });
        dropdownMenu.style.display = 'none';
    }

    // Event listener to close the dropdown when clicking outside
    document.addEventListener('click', (event) => {
        // Check if the click is outside the button and dropdown menu
        if (!event.target.closest('.editing-entry-vdots') && !event.target.closest('.homepage-dropdown-menu')) {
            closeDropdown();
        }
    });

    // Attach the event listener to all journal-dropdown-buttons
    const homeModule = document.querySelector('.home-list');
    const buttons = homeModule.querySelectorAll('.editing-entry-vdots');

    buttons.forEach(button => {
        button.addEventListener('click', toggleHomepageDropdown);
    });

    // console.log('homepage-dropdown.js')
    window.toggleHomepageDropdown = toggleHomepageDropdown;


});
