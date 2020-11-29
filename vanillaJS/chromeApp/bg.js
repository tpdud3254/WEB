const body = document.querySelector("body");
// const img = document.createElement("img")

const IMG_NUMBER = 5;

function handleImgLoad() {
    console.log("finished loading !")
}

function genNumber() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNum = genNumber();
    const img = new Image();
    img.src = `./image/${randomNum + 1}.jpg`;
    img.classList.add("bg");
    body.appendChild(img)
    img.addEventListener("loadend", handleImgLoad); //-> api를 통해서 가져올 경우에 쓸수 있음
}

init();