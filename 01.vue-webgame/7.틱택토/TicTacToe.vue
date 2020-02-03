<!--
FIXME: 
* 왜 이렇게 세분화를 해놓냐?  TableComponent만 만들어 놓으면 하나 클릭시 테이블을 전부다 다시 그려야하기 때문임. 우리는 해당 칸만 바뀌길 원함
-->

<template>
  <table-component :table-data="tableData" />
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
      ]
    };
  },
  methods: {}
};
</script>

<style scoped></style>
