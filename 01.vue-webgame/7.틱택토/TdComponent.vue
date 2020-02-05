<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>
<script>
export default {
  props: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number
  },
  data() {
    return {};
  },

  methods: {
    onClickTd() {
      if (this.cellData) return;
      // console.log(this.$root.$data);
      // console.log(this.$parent.$data);
      let rootData = this.$root.$data;
      this.$set(
        rootData.tableData[this.rowIndex],
        this.cellIndex,
        rootData.turn
      );

      let win = false;
      if (
        rootData.tableData[this.rowIndex][0] === rootData.turn &&
        rootData.tableData[this.rowIndex][1] === rootData.turn &&
        rootData.tableData[this.rowIndex][2] === rootData.turn
      ) {
        //가로줄
        win = true;
      } else if (
        rootData.tableData[0][this.cellIndex] === rootData.turn &&
        rootData.tableData[1][this.cellIndex] === rootData.turn &&
        rootData.tableData[2][this.cellIndex] === rootData.turn
      ) {
        //세로줄
        win = true;
      } else if (
        rootData.tableData[0][0] === rootData.turn &&
        rootData.tableData[1][1] === rootData.turn &&
        rootData.tableData[2][2] === rootData.turn
      ) {
        //대각선
        win = true;
      } else if (
        rootData.tableData[0][2] === rootData.turn &&
        rootData.tableData[1][1] === rootData.turn &&
        rootData.tableData[2][0] === rootData.turn
      ) {
        //대각선
        win = true;
      }

      if (win) {
        //이긴 경우
        rootData.winner = rootData.turn;
        rootData.turn = "O";
        rootData.tableData = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""]
        ];
      } else {
        //무승부 (승자가 없는데 배열이 꽉 찬 경우)
        let all = true;
        rootData.tableData.forEach(row => {
          row.forEach(cell => {
            if (!cell) {
              all = false;
            }
          });
        });

        if (all) {
          rootData.winner = "";
          rootData.turn = "O";
          rootData.tableData = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
          ];
        } else {
          //게임 진행 중
          rootData.turn = rootData.turn === "O" ? "X" : "O";
        }
      }
    }
  }
};
</script>
