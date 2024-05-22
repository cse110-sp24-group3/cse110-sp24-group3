document.addEventListener('DOMContentLoaded', (event) => {
    const titleInput = document.getElementById('title-input');

    titleInput.addEventListener('focus', () => {
        if (titleInput.value === 'Untitled') {
            titleInput.value = '';
            titleInput.classList.remove('placeholder');
            titleInput.classList.add('filled');
        }
    });

    titleInput.addEventListener('blur', () => {
        if (titleInput.value.trim() === '') {
            titleInput.value = 'Untitled';
            titleInput.classList.remove('filled');
            titleInput.classList.add('placeholder');
        }
    });
});
