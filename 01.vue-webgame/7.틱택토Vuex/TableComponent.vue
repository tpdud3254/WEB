<template>
  <div>
    <table>
      <tr-component
        v-for="(rowData, index) in tableData"
        :key="index"
        :row-data="rowData"
        :row-index="index"
      ></tr-component>
    </table>
  </div>
</template>
<script>
import TrComponent from "./TrComponent";
export default {
  // props: {
  //   tableData: Array
  // },
  components: {
    TrComponent
  },
  computed: {
    tableData() {
      return this.$store.state.tableData;
    },
    turnMessage() {
      return this.$store.getters.turnMessage;
    } //mapGetters도 존재(공식문서 참조)
  },
  data() {
    return {};
  },

  methods: {}
};
</script>
