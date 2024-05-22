window.onload = () => {
    showDiscardChangePage();
};

function showDiscardChangePage() {
    const button = document.getElementById("myButton");
    const myPopup = document.getElementById("myPopup");
    
    button.addEventListener("click", () => {
            myPopup.classList.add("show");
        }
    );
    closePopup.addEventListener("click", () => {
            myPopup.classList.remove("show");
        }
    );
    window.addEventListener("click", (event) => {
            if (event.target == myPopup) {
                myPopup.classList.remove("show");
            }
        }
    );
}