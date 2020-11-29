const USER_LS = "currentUser";
const SHOWING = "showing";

const form = document.querySelector(".js-form"),
    name = form.querySelector("input"),
    gretting = document.querySelector(".js-gretting");

function setName(text) {
    showGretting(text);

    localStorage.setItem(USER_LS, text)
}

function handleSubmit(event) {
    event.preventDefault();
    setName(name.value);
}

function showForm() {
    form.classList.add(SHOWING);
    form.addEventListener("submit", handleSubmit);
}

function showGretting(text) {
    form.classList.remove(SHOWING);
    gretting.classList.add(SHOWING);
    gretting.innerText = `Hello ${text}`
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);

    if (currentUser === null) {
        showForm();
    } else {
        showGretting(currentUser)
    }
}

function init() {
    loadName();
}

init();