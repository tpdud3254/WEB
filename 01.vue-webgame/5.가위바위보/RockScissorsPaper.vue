<!--
FIXME: 라이프사이클,

* :class, :style 은 객체 스타일을 지원한다.......
-->

<template>
  <div>
    <div
      id="computer"
      :style="{
        background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) 0 0`
      }"
    ></div>
    <!-- css에서는 background-image이렇게 표현하지만 js에서는 -를 마이너스로 치기때문에 css속성을 js로 표현할때는 대문자로 바꿔줌(카멜케이스)-->
    <div>
      <button @click="onClickButton('바위')">바위</button>
      <!-- 그냥 @click="onClickButton"만쓰면 무슨 버튼인지 모르니까 인자를 붙여줄수있음 -->
      <button @click="onClickButton('가위')">가위</button>
      <button @click="onClickButton('보')">보</button>
    </div>
    <div>{{ result }}</div>
    <div>현재 {{ score }}점</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      result: "",
      score: 0
    };
  },
  computed: {},
  methods: {
    onClickButton(choice) {}
  }
};
</script>

<style scoped>
#computer {
  width: 142px;
  height: 200px;
  background-position: 0 0;
}
</style>
