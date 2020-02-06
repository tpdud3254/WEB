import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex); //뷰와 뷰엑스가 연결됨

// 오브젝트 다이나믹 프로퍼티 (동적 속성)
// 이유 : this.$store.commit("CLICK-CELL") 이렇게 쓰면 오타가 나도 모르기때문에 따로 변수로 빼둠
export const SET_WINNER = "SET_WINNER"; //앞에 export를 붙여서 다른 파일에서 쓸수있게 만듦
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_GANE = "RESET_GANE";
export const NO_WINNER = "NO_WINNER";

/*
export default와 export const의 차이
- export default하면 import로 바로 가져올수 있음 (다른파일에서 이름도 맘대로 바꿀수있음)
    import store from './store'
- export const는 중괄호안에 묶어야하고 이름이 반드시똑같아야함
    import { SET_WINNER } from './store'
- 보통 export default 는 한번만 파일에서 가장 중요한것 자잘한건 export
*/
export default new Vuex.Store({
  state: {
    // vue의 data와 비슷
    tableData: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ],
    turn: "O",
    winner: ""
  },
  getters: {
    // vue의 computed와 비슷, 캐싱도 되고 기존의 state를 활용해 뭔가를 더 작업할때쓰임
    turnMessage(state) {
      return state.turn + "님이 승리하셨습니다.";
    }
  },
  mutations: {
    // state를 수정할때 사용. 동기적으로
    // 직접 바꾸지 않고 mutation을 쓰는이유 :
    //함수이름 대문자로
    [SET_WINNER](state, winner) {
      state.winner = winner;
    },
    [CLICK_CELL](state, { row, cell }) {
      Vue.set(state.tableData[row], cell, state.turn); // 뷰엑스는 this.$set이없어서 Vue.set으로 써줘야함
    },
    [CHANGE_TURN](state) {
      state.turn = state.turn === "O" ? "X" : "O";
    },
    [RESET_GANE](state) {
      (state.turn = "O"),
        (state.tableData = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""]
        ]);
    },
    [NO_WINNER](state) {
      state.winner = "";
    }
  },
  actions: {
    // 비동기를 사용할 때 또는 여러 뮤테이션을 연달아 실행할 때
  }
});
