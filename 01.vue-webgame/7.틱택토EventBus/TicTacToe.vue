<!--
FIXME: EvnetBus
* Evnet Bus ? 이벤트의 중앙 매개체
  - 단점 : 이벤트들 다 연결해줘야함, 루트컴포넌트의 코드가 너무 길어질수있음
-->

<template>
  <div>
    <div>{{ turn }}님의 턴입니다.</div>
    <table-component :table-data="tableData" />
    <div v-if="winner">{{ winner }}님의 승리</div>
  </div>
</template>
<script>
import TableComponent from "./TableComponent";
import EventBus from "./EventBus";
export default {
  components: {
    TableComponent
  },
  data() {
    return {
      tableData: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      turn: "O",
      winner: ""
    };
  },

  methods: {
    onChangeData() {
      // this.tableData[0][1] = "O"; // 화면에 반영이안됨, js의 한계때문에 vue의 한계가 나타남.. (참고로배열함수를 통해서 바꾸는것은 반영됨)
    },
    onClickTd(rowIndex, cellIndex) {
      this.$set(this.tableData[rowIndex], cellIndex, this.turn);

      let win = false;
      if (
        this.tableData[rowIndex][0] === this.turn &&
        this.tableData[rowIndex][1] === this.turn &&
        this.tableData[rowIndex][2] === this.turn
      ) {
        //가로줄
        win = true;
      } else if (
        this.tableData[0][cellIndex] === this.turn &&
        this.tableData[1][cellIndex] === this.turn &&
        this.tableData[2][cellIndex] === this.turn
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
        //이긴 경우
        this.winner = this.turn;
        this.turn = "O";
        this.tableData = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""]
        ];
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
          this.winner = "";
          this.turn = "O";
          this.tableData = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
          ];
        } else {
          //게임 진행 중
          this.turn = this.turn === "O" ? "X" : "O";
        }
      }
    }
  },

  created() {
    EventBus.$on("clickTd", this.onClickTd);
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
