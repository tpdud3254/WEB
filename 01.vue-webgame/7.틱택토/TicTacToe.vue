<!--
FIXME: 
* 왜 이렇게 세분화를 해놓냐?  TableComponent만 만들어 놓으면 하나 클릭시 테이블을 전부다 다시 그려야하기 때문임. 우리는 해당 칸만 바뀌길 원함
* 배열 바꾸는법 두가지
  1. 맨위 import Vue from 'vue'; 하고 Vue.set(this.tableData[1], 0, "O")
  2. this.$set(this.tableData[1], 0, "O") -> Vue.set과 동일
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
    }
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
