<template>
  <div>
    <input
      type="number"
      placeholder="세로"
      :value="row"
      @change="onChangeRow"
    />
    <input
      type="number"
      placeholder="가로"
      :value="cell"
      @change="onChangeCell"
    />
    <input
      type="number"
      placeholder="지뢰"
      :value="mine"
      @change="onChangeMine"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
