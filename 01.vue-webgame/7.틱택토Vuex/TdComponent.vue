<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>
<script>
import { mapState } from "vuex";
import {
  CLICK_CELL,
  SET_WINNER,
  RESET_GANE,
  NO_WINNER,
  CHANGE_TURN
} from "./store";
export default {
  props: {
    // cellData: String,
    rowIndex: Number,
    cellIndex: Number
  },
  computed: {
    ...mapState({
      tableData: state => state.tableData,
      turn: state => state.turn,
      cellData(state) {
        this.$store.state.tableData[this.rowIndex][this.cellIndex];
        // 이 부분 때문에 devtools에서 확인해보면 td하나를 눌러도 9개 칸이 다 렌더링 되는걸 볼수있다
        // vuex를 쓰면서 어쩔수없는건데.. 이럴바에는 컴포넌트를 나눠놓은 의미가 없으니 그냥 TicTacToe 컴포넌트에 다 합치는게 낫다
      }
    })
    // vuex의 state를 쓰기 위해서는 vue의 computed에 반드시 연결해줘야함
    // cellData() {
    //   return this.$store.state.tableData[this.rowIndex][this.cellIndex];
    // },
    // tableData() {
    //   return this.$store.state.tableData;
    // },
    // turn() {
    //   return this.$store.state.turn;
    // }
  },
  methods: {
    onClickTd() {
      if (this.cellData) return;

      this.$store.commit(CLICK_CELL, {
        row: this.rowIndex,
        cell: this.cellIndex
      }); //뮤테이션 부를때는 commit사용

      let win = false;
      if (
        this.tableData[this.rowIndex][0] === this.turn &&
        this.tableData[this.rowIndex][1] === this.turn &&
        this.tableData[this.rowIndex][2] === this.turn
      ) {
        //가로줄
        win = true;
      } else if (
        this.tableData[0][this.cellIndex] === this.turn &&
        this.tableData[1][this.cellIndex] === this.turn &&
        this.tableData[2][this.cellIndex] === this.turn
      ) {
        //세로줄
        win = true;
      } else if (
        this.tableData[0][0] === this.turn &&
        this.tableData[1][1] === this.turn &&
        this.tableData[2][2] === this.turn
      ) {
        //대각선
        win = true;
      } else if (
        this.tableData[0][2] === this.turn &&
        this.tableData[1][1] === this.turn &&
        this.tableData[2][0] === this.turn
      ) {
        //대각선
        win = true;
      }

      if (win) {
        //이긴 경우;
        this.$store.commit(SET_WINNER, this.turn);
        this.$store.commit(RESET_GANE);
      } else {
        //무승부 (승자가 없는데 배열이 꽉 찬 경우)
        let all = true;
        this.tableData.forEach(row => {
          row.forEach(cell => {
            if (!cell) {
              all = false;
            }
          });
        });

        if (all) {
          this.$store.commit(NO_WINNER);
          this.$store.commit(RESET_GANE);
        } else {
          //게임 진행 중
          this.$store.commit(CHANGE_TURN);
        }
      }
    }
  }
};
</script>
