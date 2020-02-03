<!--
FIXME: props
* props로 받은애를 바꾸는 것은 금지된 행동 (read-only)
* props : 부모 컴포넌트가 자식 컴포넌트한테 값을 물려주는것

-->

<template>
  <div class="ball" :style="styleObject">{{ number }}</div>
</template>

<script>
export default {
  name: "LottoBall",
  props: {
    number: Number
  },
  computed: {
    //this.number를 사용해 연산하는것이라서 computed임
    styleObject() {
      let background;
      if (this.number <= 10) {
        background = "red";
      } else if (this.number <= 20) {
        background = "orange";
      } else if (this.number <= 30) {
        background = "yellow";
      } else if (this.number <= 40) {
        background = "blue";
      } else {
        background = "green";
      }
      return {
        background
      };
    }
  }
};
</script>

<style scoped>
.ball {
  display: inline-block;
  border: 1px solid black;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  margin-right: 20px;
}
</style>
