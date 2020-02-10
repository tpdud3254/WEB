<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
      <td
        v-for="(cellData, cellIndex) in rowData"
        :key="cellIndex"
        :style="cellDataStyle(rowIndex, cellIndex)"
      >{{cellDataText(rowIndex, cellIndex)}}</td>
      <!-- rowIndex와 cellIndex가 칸마다 달라지는데 그거를 알아차리기가 힘들어서 각 칸별로 따로 계산할수있도록 함수형태로 만들어줌  -->
    </tr>
  </table>
</template>
<script>
import { mapState } from "vuex";
import { CODE } from "./store";
export default {
  computed: {
    ...mapState(["tableData"]),
    //cellDataStyle, cellDataText가 왜 computed에 들어가는지 알아야함
    //cellData를 쿵짝쿵짝해서 스타일이나 화면에 표시할 글자를 나타내는거기때문에 computed에 넣는거
    // cellDataStyle: state => (row, cell) => {
    //고차함수 (기존함수를 확장하는행위), 화살표가있으면 this를 못씀
    cellDataStyle(state) {
      return (row, cell) => {
        switch (this.$store.state.tableData[row][cell]) {
          case CODE.NORMAL:
          case CODE.MINE:
            return {
              background: "#444"
            };
          case CODE.CLICKED_MINE:
          case CODE.OPENED:
            return {
              background: "white"
            };
          case CODE.FLAG:
          case CODE.FLAG_MINE:
            return {
              background: red
            };
          case CODE.QUESTION:
          case CODE.QUESTION_MINE:
            return {
              background: "yellow"
            };
          default:
            return {};
        }
      };
    },
    cellDataText() {
      return (row, cell) => {
        switch (this.$store.state.tableData[row][cell]) {
          case CODE.MINE:
            return "X";
          case CODE.NORMAL:
            return "";
          case CODE.FLAG_MINE:
          case CODE.FLAG:
            return "!";
          case CODE.QUESTION_MINE:
          case CODE.QUESTION:
            return "?";
          case CODE.CLICKED_MINE:
            return "펑";
          default:
            return this.$store.state.tableData[row][cell] || "";
        }
      };
    }
  }
};
</script>
