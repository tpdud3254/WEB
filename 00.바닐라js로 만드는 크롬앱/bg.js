const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(number) {
    const image = new Image();
    
    image.src = `./images/image0${number + 1}.jpg`;
    image.classList.add("bgImage");
    
    body.appendChild(image);
    /*
    만약 이미지가 커서 천천히 로드 되는경우에 이미지가 완전히 로드 된후에 나머지를 노출하고싶으면
    image.addEventListener("loadend", 함수이름);
    이렇게 이벤트 리스너 만들기
    api일경우 사용(?)
    */
}

function genRandom() {
    return Math.floor(Math.random() * IMG_NUMBER);
}
function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();