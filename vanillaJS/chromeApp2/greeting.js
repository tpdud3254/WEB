const USER_NAME = "userName";
const form = document.querySelector('.js-inputName'),
    inputName = form.querySelector('input'),
    greeting = document.querySelector('.js-greeting');

function paintGreeting(text) {
    form.classList.remove('showing');
    greeting.classList.add('showing');
    greeting.innerText = `hello ${text}`
}

function saveName(text) {
    localStorage.setItem(USER_NAME, text)
}

function handleSubmit(event) {
    event.preventDefault();

    saveName(inputName.value);
    paintGreeting(inputName.value)
}

function showInputName() {
    form.classList.add('showing');
    form.addEventListener("submit", handleSubmit);
}

function init() {
    const name = localStorage.getItem(USER_NAME);

    if (name === null) {
        showInputName();
    } else {
        paintGreeting(name)
    }
}

init();