<template>
  <div>
    <div id="screen" :class="state" @click="onClickScreen">{{ message }}</div>
    <!--  v-bind: 축약형 : -->
    <!-- <div id="screen" v-bind:class="state">{{ message }}</div> -->
    <div v-show="result.length">
      <!-- <div>
        평균 시간 :
        {{ result.reduce((a, c) => a + c, 0) / result.length || 0 }}ms
      </div> -> 이렇게 계산 자체는 여기서 안하는게 좋음 (computed활용)-->
      <div>
        평균 시간 :
        {{ average }}ms
      </div>
      <button @click="onReset">리셋</button>
    </div>
  </div>
</template>
<!--
FIXME: <style>, computed, v-show와 v-if의 차이
* <style> : npm i vue-style-loader -D, npm i css-loader -D 후 webpack.config.js 수정
* data와 computed의 차이점 : computed는 보통 일반 data를 가공해서 사용할 때 사용함
  - 왜굳이 computed를 쓰냐 : this.result.reduce((a, c) => a + c, 0) / this.result.length || 0; 이 값이 캐싱이 된다.
                            예를들어 message만 바뀌었는데 computed를 안하면 계산식도 같이 실행됨. 
                            나중에 계산이 점점 복잡해진다고 하면 문제가 되기 때무넹 이런걸 막기위해서 computed를 사용
                            결론은 성능의 최적화 때문ㅇ ㅔ 사용
* v-show와 v-if의 차이 : v-show붙이면 style="display:none;"이 붙음, v-if는 태그자체가 주석처리가됨
  - v-show : v-show="result.length" 따옴표 안이 트루여야 보임
  - 태그가 존재하지 않는거랑 존재하지만 안보이는거랑은 아주 많은 차이가 있다. 보통 v-if를 많이 씀
-->

<!--
  <template>
  <div> -> 최상단 template아래에 바로 template는 못씀, 그럼 무조건 div로 감싸야하나 -> 7강에서 알려줌, 근데 제초로님도 귀찮아서 div로 감쌈
    <div id="screen" :class="state" @click="onClickScreen">{{ message }}</div>
    <div v-show="result.length"> -> 아무역할 없는 그냥 감싸주는 용도 / template로 바꿔서 써줄수있음 / 둘의 차이점 : tempalte를 쓰면 scren이랑 평균시간이랑 리셋버튼이 형제가됨 template는 없는 셈 쳐줌
      <div>
        평균 시간 :
        {{ average }}ms
      </div>
      <button @click="onReset">리셋</button>
    </div>
  </div>
</template>
-->

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;

export default {
  data() {
    return {
      result: [],
      state: "waiting",
      message: "클릭해서 시작하세요."
    };
  },
  computed: {
    average() {
      return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0;
    }
  },
  methods: {
    onReset() {
      this.result = [];
    },
    onClickScreen() {
      if (this.state === "waiting") {
        this.state = "ready";
        this.message = "초록색이 되면 클릭하세요.";
        timeout = setTimeout(() => {
          this.state = "now";
          this.message = "지금 클릭";
          startTime = new Date();
        }, Math.floor(Math.random() * 1000) + 2000); //2-3초
      } else if (this.state === "ready") {
        clearTimeout(timeout);
        this.state = "waiting";
        this.message = "너무 성급하시군요! 초록색이 된 후에 클릭하세요.";
      } else if (this.state === "now") {
        endTime = new Date();
        this.state = "waiting";
        this.message = "클릭해서 시작하세요.";
        this.result.push(endTime - startTime);
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
