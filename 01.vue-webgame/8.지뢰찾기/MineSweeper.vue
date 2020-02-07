<template>
  <div>
    <mine-form></mine-form>
    <div>{{ timer }}</div>
    <table-component></table-component>
    <div>{{ result }}</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import TableComponent from "./TableComponent";
import store, {
  CLICK_CELL,
  SET_WINNER,
  RESET_GAME,
  NO_WINNER,
  CHANGE_TURN
} from "./store";

export default {
  store,
  components: {
    TableComponent
  },
  computed: {
    ...mapState(["timer", "result"])
  },
  methods: {}
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
