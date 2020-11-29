const IMG_NUM = 5
const body = document.querySelector("body");

function getRandomNumber() {
    return Math.floor(Math.random() * 5) + 1;
}

function init() {
    const randomNum = getRandomNumber();
    const img = new Image();

    img.src = `./image/${randomNum}.jpg`
    img.classList.add('bg')
    body.appendChild(img)


}

init();