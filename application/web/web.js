window.onload = () => {
    document.getElementById('collapse-button').addEventListener('click', function(event) {
        const sidebar = document.querySelector('sidebar');
        sidebar.classList.toggle('sidebar-collapsed');
    });
};