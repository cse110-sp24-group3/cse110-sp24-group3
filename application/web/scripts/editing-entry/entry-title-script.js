document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('title-input');

    /**
     * Formats the input value to a valid file name.
     * Replaces spaces with underscores.
     * 
     * @param {string} value - The input value to format.
     * @returns {string} - The formatted string.
     */
    function formatTitle(value) {
        return value.trim().replace(/\s+/g, '_');
    }

    /**
     * Event handler for the 'focus' event on the title input.
     * Clears the 'Untitled' placeholder and adjusts CSS classes.
     */
    titleInput.addEventListener('focus', () => {
        if (titleInput.value === 'Untitled') {
            titleInput.value = '';
            titleInput.classList.remove('placeholder');
            titleInput.classList.add('filled');
        }
    });

    /**
     * Event handler for the 'blur' event on the title input.
     * Restores the 'Untitled' placeholder if the input is empty.
     * Formats the title input value to a valid file name if not empty.
     */
    titleInput.addEventListener('blur', () => {
        if (titleInput.value.trim() === '') {
            titleInput.value = 'Untitled';
            titleInput.classList.remove('filled');
            titleInput.classList.add('placeholder');
        } else {
            titleInput.value = formatTitle(titleInput.value);
        }
    });

    /**
     * Event handler for the 'input' event on the title input.
     * Disables certain characters from being inputted.
     * 
     * @param {Event} event - The input event.
     */
    titleInput.addEventListener('input', () => {
        const invalidChars = /[^a-zA-Z0-9-_]/g; // Regex to match invalid characters
        if (invalidChars.test(titleInput.value)) {
            titleInput.value = titleInput.value.replace(invalidChars, '');
        }
        titleInput.value = titleInput.value.replace(/\s+/g, '_');
    });
});
