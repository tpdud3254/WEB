const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(number) {
    const image = new Image();
    
    image.src = `./images/image0${number + 1}.jpg`;
    image.classList.add("bgImage");
    
    body.appendChild(image);
    /*
    ���� �̹����� Ŀ�� õõ�� �ε� �Ǵ°�쿡 �̹����� ������ �ε� ���Ŀ� �������� �����ϰ������
    image.addEventListener("loadend", �Լ��̸�);
    �̷��� �̺�Ʈ ������ �����
    api�ϰ�� ���(?)
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