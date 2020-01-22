const toDoForm = document.querySelector(".js-toDoForm"),
        toDoInput = toDoForm.querySelector("input"),
        toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
    console.dir(event.target); //���� ����
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
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // JSON.stringify : JS��ü�� ��Ʈ������ �ٲ���
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
            �����͸� ������ ��, �ڹٽ�ũ��Ʈ�� �װ� �ٷ� �� �ֵ��� object�� �ٲ��ִ� ����� ��
            �׷��� �ڹٽ�ũ��Ʈ�� object�� string���� ��ȯ���ֱ⵵�ϰ� string�� object�� ��ȯ���ֱ⵵ ��
    */
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();