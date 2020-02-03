<!--
FIXME: 스타일가이드
* 스타일가이드 : https://kr.vuejs.org/v2/style-guide/
* 공통적인 부분이 있지만 조금씩 다른 것들 -> 컴포넌트로 만든다
* LottoGenerator 컴포넌트가 lotto-ball 컴포넌트를 사용한다. -> 부모(LottoGenerator) 자식(lottoBall) 관계 생성 -> 부모가 자식한테 데이터를 줄수있음 -> props
  -> 왜 굳이 number를 상속하냐? 로또 번호를 생성하는것은 LottoGenerator에서 하고 LottoBall은 단순히 공만 만들어주는것이기 때문
-->

<template>
  <div>
    <div>당첨 숫자</div>
    <div id="결과창">
      <lotto-ball
        v-for="ball in winBalls"
        :key="ball"
        :number="ball"
      ></lotto-ball>
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
    <button v-if="redo" @click="onClickRedo">한 번 더!</button>
  </div>
</template>
<script>
import LottoBall from "./LottoBall";

function getWinNumbers() {
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const timeouts = [];

export default {
  components: {
    // "lotto-ball": LottoBall
    LottoBall //이렇게 줄일수있음 파스칼케이스는 케밥케이스로 자동으로 vue가 바꿔줌
  },
  data() {
    return {
      winNumbers: getWinNumbers(), //미리 숫자 뽑고
      winBalls: [], //시각적인 효과를위해
      bonus: null,
      redo: false
    };
  },
  computed: {},
  methods: {
    showBalls() {
      for (let i = 0; i < this.winNumbers.length - 1; i++) {
        timeouts[i] = setTimeout(() => {
          this.winBalls.push(this.winNumbers[i]);
        }, (i + 1) * 1000);
      }
      timeouts[6] = setTimeout(() => {
        this.bonus = this.winNumbers[6];
        this.redo = true;
      }, 7000);
    },
    onClickRedo() {
      this.winNumbers = getWinNumbers();
      this.winBalls = [];
      this.bonus = null;
      this.redo = false;
    }
  },
  mounted() {
    this.showBalls();
  },
  beforeDestroy() {
    timeouts.forEach(t => {
      clearTimeout(t);
    });
  },
  watch: {
    //어떤 값이 바뀌었는지 안바뀌었는지 지켜보는 역할, 너무 남용하면 안됨.. 최대한 안쓰는게 나음. 최후의수단
    bonus(val, oldval) {
      if (val === null) {
        this.showBalls();
      }
    }
  }
};
</script>

<style scoped></style>
