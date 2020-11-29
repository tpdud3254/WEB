const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODO_LS = "toDoList"
let toDos = []

function saveToDos() {
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function handleDelete(event) {
    const targetTodo = event.target.parentNode

    toDoList.removeChild(targetTodo);
    console.dir(targetTodo)
    const removedList = toDos.filter(function (toDo) {
        return parseInt(targetTodo.id) !== toDo.id
    });
    console.log(removedList)
    toDos = removedList

    saveToDos()
}

function paintToDo(text) {

    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1

    delBtn.addEventListener("click", handleDelete);
    span.innerText = text
    delBtn.innerText = "X";
    li.appendChild(delBtn);
    li.appendChild(span);

    li.id = newId

    toDoList.appendChild(li)

    const curTodo = {
        text: text,
        id: newId
    };

    toDos.push(curTodo);

    saveToDos();
}

function handelSubmit(event) {
    event.preventDefault();
    paintToDo(toDoInput.value);
    toDoInput.value = "";
}

function init() {
    toDoForm.addEventListener("submit", handelSubmit);

    const parseToDoList = JSON.parse(localStorage.getItem(TODO_LS));

    if (parseToDoList !== null) {
        // paintTodo(toDo);
        parseToDoList.forEach(function (toDo) {
            paintToDo(toDo.text);
        })
    }
}

init();