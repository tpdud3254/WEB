const title = document.querySelector("#title");

const CLICKED_CLASS = "clicked"

function init() {
    title.addEventListener("click", handleClick);
}

function handleClick() {
    // if (title.classList.contains(CLICKED_CLASS)) {
    //     title.classList.remove(CLICKED_CLASS);
    // } else {
    //     title.classList.add(CLICKED_CLASS);
    // }

    title.classList.toggle(CLICKED_CLASS);
}

init();