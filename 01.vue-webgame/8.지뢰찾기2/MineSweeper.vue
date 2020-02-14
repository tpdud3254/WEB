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
import MineForm from "./MineForm";

import store, {
  CLICK_CELL,
  SET_WINNER,
  RESET_GAME,
  NO_WINNER,
  CHANGE_TURN,
  INCREAMENT_TIMER
} from "./store";

let interval;

export default {
  store,
  components: {
    TableComponent,
    MineForm
  },
  computed: {
    ...mapState(["timer", "result", "halted"])
  },
  methods: {},
  watch: {
    // watch를 지양하자고 했지만 이런 통제된 환경에서는 watch 사용해도 ㄱㅊ
    halted(value, oldValue) {
      if (value === false) {
        interval = setInterval(() => {
          this.$store.commit(INCREAMENT_TIMER);
        }, 1000); //js의 타이머가 정확하지 않아서 시간이 중요한 프로그램을 만들때는 new Data를 써서 정확하게 비교해야됨
      } else {
        //게임중단
        clearInterval(interval);
      }
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
