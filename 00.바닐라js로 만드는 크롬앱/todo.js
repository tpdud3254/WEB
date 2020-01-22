const toDoForm = document.querySelector(".js-toDoForm"),
        toDoInput = toDoForm.querySelector("input"),
        toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
    console.dir(event.target); //자주 찍어보기
    console.log(event.target.parentNode);

    const btn = event.target;
    const li = btn.parentNode;

    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function(toDo){
        return parseInt(li.id) !== toDo.id;
    });

    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // JSON.stringify : JS객체를 스트링으로 바꿔줌
}

function paintTodo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newID = toDos.length + 1

    delBtn.addEventListener("click", deleteToDo);

    span.innerText = text;
    delBtn.innerText = "X";

    li.id = newID;
    li.appendChild(span);
    li.appendChild(delBtn);

    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id : newID
    };

    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value = ""; 
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintTodo(toDo.text);
        });
    }
    /*
    JSON : JavaScript Object Notation
            데이터를 전달할 때, 자바스크립트가 그걸 다룰 수 있도록 object로 바꿔주는 기능인 셈
            그래서 자바스크립트의 object를 string으로 변환해주기도하고 string을 object로 변환해주기도 함
    */
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();