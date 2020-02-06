<template>
  <div>
    <td-component
      v-for="(cellData, index) in rowData"
      :key="index"
      :cell-data="cellData"
      :cell-index="index"
      :row-index="rowIndex"
    ></td-component>
  </div>
</template>
<script>
import TdComponent from "./TdComponent";
export default {
  components: {
    TdComponent
  },
  data() {
    return {
      parent: "내가 니 애비다."
    };
  },
  computed: {
    rowData() {
      return this.$store.state.tableData[this.rowIndex];
    }
  },
  props: {
    // rowData: Array,
    rowIndex: Number
  }
};
</script>
