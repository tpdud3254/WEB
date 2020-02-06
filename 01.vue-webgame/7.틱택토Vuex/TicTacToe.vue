<!--
FIXME: store, mapState, vuex연결
* store는 여러개 만들어도됨
* vuex 깔기 > npm i vuex
* mapState : store에서 state가 엄청 많을때 귀찮읜까 이런 기능 제공함

** 지금은 store에서 한번 component에서 한번 연결해 주는데 Vue.use(Vuex);를 main.js에서 한번에 연결해줄수 있는가? (시청자 질문)
> main.js
  import Vue from "vue";
  import TicTacToe from "./TicTacToe";
  Vue.use(Vuex);
  new Vue(TicTacToe).$mount("#root");
  >> 이렇게 넣어준다면 한번에 깔끔하게 되겠지만 순서가 어긋나 버림
      두번째 코드가 실행이되면 TicTacToe를 타고 
      > TicTacToe.vue
        import store from "./store";
        >>이 두번째 코드가 실행될것이고
        >> store.js에서 Vue.use(Vuex);가 사라졌으니 뷰와 연결하지 않은채 아래 코드들을 읽어버린다음에
            다시 main.js로 돌아왔을때 Vue.use(Vuex)가 실행되어서 순서가 맞지 않게 된다
-->

<template>
  <div>
    <div>{{ turn }}님의 턴입니다.</div>
    <table-component :table-data="tableData" />
    <div v-if="winner">{{ winner }}님의 승리</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import store from "./store";
import TableComponent from "./TableComponent";
export default {
  store,
  components: {
    TableComponent
  },
  computed: {
    ...mapState(["winner", "turn", "tableData"])
    /*
    mapState 활용 (vuex 공식문서 참조 추천)
    1. 화살표 함수 가능
      ...mapState({
        winner: state => state.winner,
        turn: 'turn'
      })
    2. state 다른 이름으로 바꾸기 가능
     ...mapState(({turnState: 'turn'}))
    3. state의 값을 현재 컴포넌트의 데이터or props 등과 쿵짝쿵짱도 가능
      ...mapState({
        winner(state) {
          return state.winner + this.data;
        }
      })
      !!!!주의!!!! 화살표함수는 this 못씀
    */

    // winner() {
    //   return this.$store.state.winner;
    // },
    // turn() {
    //   return this.$store.state.turn;
    // }
  }
};
</script>

<style>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
}
</style>
