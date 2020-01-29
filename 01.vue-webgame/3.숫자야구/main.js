//main.js가 제일 중요한 파일이기 때문에 다른 파일들을 import로 불러와야함

import Vue from "vue"; //package.json에서 뷰 설치 했던것을 가져옴
import NumberBaseball from "./NumberBaseball";
// import NumberBaseball from "./NumberBaseball.vue";

new Vue(NumberBaseball).$mount("#root"); // el의 역할을 함
// 뷰 인스턴스임