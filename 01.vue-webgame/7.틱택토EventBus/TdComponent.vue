<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>
<script>
import EventBus from "./EventBus";
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

      EventBus.$emit("clickTd", this.rowIndex, this.cellIndex); //emit은 on이랑 대응됨
    }
  }
};
</script>
