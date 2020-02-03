<!-- 
    .vue : js 파일이라고 생각하면 됨 (좀 특수한 문법을 쓰는 자바스크립트)
    뷰컴포넌트 부분임
-->

<template>
  <div>
    <h1>{{ result }}</h1>
    <form @submit.prevent="onSubmitForm">
      <!-- <form v-on:submit="onSubmitForm"> -->
      <input ref="answer" maxlength="4" v-model="value" />
      <button>입력</button>
    </form>
    <div>시도: {{ tries.length }}</div>
    <ul>
      <li v-for="t in tries" :key="t.try">
        <!--for문이 돌아가면 리스트가 여러개가 생김 key는 그 리스트 각각에 대해 고유한 값임, 키가 있어야 화면 다시 렌더링하고 그럴때 효율적으로 할수있음.-->
        <div>{{ t.try }}</div>
        <div>{{ t.result }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

export default {
  // -> main.js > import NumberBaseball from "./NumberBaseball"; 이렇게 임폴트 할수있음
  //아래의 객체들을 main.js에서 import하는것
  //export default - import from 한세트
  data() {
    return {
      answer: getNumbers(), // ex) [1, 5, 3, 4] / methods안에 getNumbers가 들어간다면 this.getNumbers()가 됨,
      //하지만 이 함수는 화면이랑 동떨어진 화면이기때문에 굳이 methods에 넣지 않음.
      //랜덤하게 다른 숫자 4개를 뽀ㅃ아주는 함수니까 다른 컴포넌트에서도 사용가능하기 때문
      tries: [], //시도 수
      value: "", //입력
      result: "" //결과
    };
  },
  methods: {
    // getNumbers: () => {
    //   const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    //   const array = [];
    //   for (let i = 0; i < 4; i += 1) {
    //     const chosen = candidates.splice(
    //       Math.floor(Math.random() * (9 - i)),
    //       1
    //     )[0];
    //     array.push(chosen);
    //   }
    //   return array;
    // },
    onSubmitForm(e) {
      //   e.preventDefault(); -> @submit.prevent="onSubmitForm" 대체 가능

      if (this.value === this.answer.join("")) {
        // 정답을 맞췄을 경우, 문자와 배열을 비교 할땐 join사용
        //   this.tries.push(this.value);
        this.tries.push({
          //-> push안의 객체는 위 for문의 t
          try: this.value,
          result: "홈런"
        });
        this.result = "홈런";
        alert("게임을 다시 실행합니다.");
        this.answer = getNumbers();
        this.value = "";
        this.tries = [];
        this.$refs.answer.focus();
      } else {
        //화면에 보여지는 건 data 아닌것은 그냥 변수
        if (this.tries.length >= 9) {
          this.result = `10번 넘게 돌려서 실패! 답은 ${this.answer.join(
            ","
          )}였습니다!`;
          alert("게임을 다시 실행합니다.");
          this.value = "";
          this.answer = getNumbers();
          this.tries = [];
          this.$refs.answer.focus();
        }
        let strike = 0;
        let ball = 0;
        const answerArray = this.value.split("").map(v => parseInt(v)); //string을 숫자 배열로 반환
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === this.answer[i]) {
            //숫자 자릿수 모두 정답
            strike++;
          } else if (this.answer.includes(answerArray[i])) {
            //숫자만 정답
            ball++;
          }
        }
        this.tries.push({
          //-> push안의 객체는 위 for문의 t
          try: this.value,
          result: `${strike} 스트라이크, ${ball} 볼입니다.`
        });
        this.value = "";
        this.$refs.answer.focus();
      }
    }
  }
};
</script>

<style></style>
