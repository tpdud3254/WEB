const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementById("jsColors");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const CANVAS_SIZE = 500;
const INIT_COLOR = "#000000"

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.lineWidth = 2.5;
ctx.strokeStyle = INIT_COLOR;
ctx.fillStyle = INIT_COLOR;

let painting = false;
let filling = false;

function onMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;

    if (!filling) {
        if (!painting) {
            ctx.beginPath();
            ctx.moveTo(x, y)
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
}

function onMouseClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function handleColorClick(e) {
    const color = e.target.style.backgroundColor;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeClick(e) {
    const size = e.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling) {
        filling = false;
        modeBtn.innerText = "fill"
    } else {
        filling = true;
        modeBtn.innerText = "paint"
    }
}

function handleSaveClick() {
    const url = canvas.toDataURL("image/png")
    const a = document.createElement("a");
    a.href = url;
    a.download = "paintJS2[result]";
    a.click();
}

function handleCM(e) {
    e.preventDefault();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", onMouseClick);
    document.addEventListener("contextmenu", handleCM);
}


Array.from(colors.children).forEach(color => color.addEventListener("click", handleColorClick))

if (range) {
    range.addEventListener("input", handleRangeClick)
}

if (modeBtn) {
    modeBtn.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}