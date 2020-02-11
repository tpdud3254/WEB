<template>
  <!-- 동적라우팅을 위해.... -->
  <div v-if="currentGame === 'number-baseball'">
    <number-baseball></number-baseball>
  </div>
  <div v-else-if="currentGame === 'response-check'">
    <response-check></response-check>
  </div>
  <div v-else-if="currentGame === 'lotto-generator'">
    <lotto-generator></lotto-generator>
  </div>
  <div v-else>일치하는 게임이 없습니다.</div>
</template>

<script>
import NumberBaseball from "../3.숫자야구/NumberBaseball";
import ResponseCheck from "../4.반응속도체크/ResponseCheck";
import LottoGenerator from "../6.로또/LottoGenerator";

export default {
  mounted() {
    console.log(this.$router); //router: 뷰 라우터 전체에 대한 설정
    console.log(this.$route); //route : 현재주소에 대한 설정
  },
  computed: {
    currentGame() {
      return this.$route.params.name;
    }
  }
};
</script>
