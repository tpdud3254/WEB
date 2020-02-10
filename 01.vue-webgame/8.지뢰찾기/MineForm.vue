<template>
  <div>
    <input type="number" placeholder="세로" :value="row" @change="onChangeRow" />
    <input type="number" placeholder="가로" :value="cell" @change="onChangeCell" />
    <input type="number" placeholder="지뢰" :value="mine" @change="onChangeMine" />
    <button v-on:click="onClickBtn">확인</button>
  </div>
</template>

<script>
import { START_GAME } from "./store";
//지역적인 데이터는 vuex의 state가 아니라 컴포넌트의 data로 만든다(store코드도 쓸데없이 길어지고, 다른 컴포넌트에서 사용하는게 아니라면 data로 쓴다)
//공통적인 데이터만 뷰엑스 이용해주기
export default {
  data() {
    return {
      row: 10,
      cell: 10,
      mine: 20
    };
  },
  methods: {
    onChangeRow(e) {
      this.row = e.target.value;
    },
    onChangeCell(e) {
      this.cell = e.target.value;
    },
    onChangeMine(e) {
      this.mine = e.target.value;
    },
    onClickBtn() {
      this.$store.commit(START_GAME, {
        row: this.row,
        cell: this.cell,
        mine: this.mine
      });
    }
  }
};
</script>
