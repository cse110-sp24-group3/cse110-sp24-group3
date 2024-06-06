/// <reference path="./JournalAPI.js" />
import { toggleSidebar, createJournalEntries } from "./scripts/sidebar/sidebar.js";
import { initializeHomepage, createHomepage } from "./scripts/homepage/homepage.js";
window.onload = () => {
    initializeHomepage();
    createHomepage();
    createJournalEntries();
    showDiscardChangePage();
    //Initalization ... maybe refactor this in the future
    document.getElementById('collapse-button').addEventListener('click', toggleSidebar);

    
};

//TODO: Implement this via modules
function showDiscardChangePage() {
    const button = document.getElementById("myButton");
    const myPopup = document.getElementById("myPopup");
    const closePopup = document.getElementById("closePopup");

    button.addEventListener("click", () => {
        myPopup.classList.add("show");
    });
    closePopup.addEventListener("click", () => {
        myPopup.classList.remove("show");
    });
    window.addEventListener("click", (event) => {
        if (event.target == myPopup) {
            myPopup.classList.remove("show");
        }
    });
}