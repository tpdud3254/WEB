const TO_DO_LIST = "toDoList"

const toDoForm = document.querySelector(".js-todo"),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList');

let toDos = []

function saveToDos() {
    localStorage.setItem(TO_DO_LIST, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');

    delBtn.addEventListener("click", handleDelete)

    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li)

    const toDo = text
    const toDoId = toDos.length + 1

    li.id = toDoId
    delBtn.innerText = 'X'
    span.innerText = toDo;

    const toDoObj = {
        text: toDo,
        id: toDoId
    }

    toDos.push(toDoObj);

    saveToDos();
}

function handleDelete(event) {
    const targetToDo = event.target.parentNode;

    toDoList.removeChild(targetToDo)

    const resultToDos = toDos.filter(function (el) {
        return parseInt(targetToDo.id) !== el.id
    });

    toDos = resultToDos
    saveToDos()
}

function handleSubmit(event) {
    event.preventDefault();

    paintToDo(toDoInput.value);
    toDoInput.value = ""

}

function init() {

    toDoForm.addEventListener("submit", handleSubmit)

    const toDoList = localStorage.getItem(TO_DO_LIST)

    if (toDoList !== null) {
        const parseData = JSON.parse(toDoList);

        parseData.forEach(el => {
            paintToDo(el.text)
        });

    }


}

init();