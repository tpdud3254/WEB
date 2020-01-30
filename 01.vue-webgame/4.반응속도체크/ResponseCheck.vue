<template>
  <div>
    <div id="screen" :class="state" @click="onClickScreen">{{ message }}</div>
    <!--  v-bind: 축약형 : -->
    <!-- <div id="screen" v-bind:class="state">{{ message }}</div> -->
    <div>
      <div>평균 시간 : {{}}</div>
      <button @click="onReset">리셋</button>
    </div>
  </div>
</template>
<!--
FIXME: npm i vue-style-loader -D, npm i css-loader -D 후 webpack.config.js 수정
-->
<script>
let startTime = 0;
let endTime = 0;
let avg = null;

export default {
  data() {
    return {
      result: [],
      state: "waiting",
      message: "클릭해서 시작하세요."
    };
  },
  methods: {
    onReset() {},
    onClickScreen() {
      if (this.state === "waiting") {
        this.state = "ready";
        this.message = "초록색이 되면 클릭하세요.";
        setTimeout(() => {
          (this.state = "now"), (this.message = "지금 클릭");
        }, Math.floor(Math.random() * 1000) + 2000); //2-3초
      } else if (this.state === "ready") {
        this.state = "waiting";
        this.message = "너무 성급하시군요! 초록색이 된 후에 클릭하세요.";
      } else if (this.state === "now") {
        this.state = "waiting";
        this.message = "클릭해서 시작하세요.";
      }
    }
  }
};
</script>

<!--
scoped : 이 컴포넌트 안에서만 쓰고싶을때, 해당 css들은 해당 컴포넌트에서만 쓸수있음
 -->
<style scoped>
#screen {
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
}

#screen.waiting {
  background-color: aqua;
}

#screen.ready {
  background-color: red;
  color: white;
}

#screen.now {
  background-color: greenyellow;
}
</style>
