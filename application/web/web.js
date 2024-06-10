/// <reference path="./JournalAPI.js" />
import { toggleSidebar, createJournals } from "./scripts/sidebar/sidebar.js";
import { createHomepage } from "./scripts/homepage/homepage.js";
window.onload = () => {
    createJournals();

    // journal entries are created asynchronously, need to wait for resolution before creating homepage
    // TODO: maybe refactor code to be asynchronous? This would eliminate the need for this kind of thing, we could just use 'await'
    sleep(100).then(() => {
        createHomepage();
    });
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

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}