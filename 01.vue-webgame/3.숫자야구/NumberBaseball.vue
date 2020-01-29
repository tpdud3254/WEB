<!-- 
    .vue : js 파일이라고 생각하면 됨 (좀 특수한 문법을 쓰는 자바스크립트)
    뷰컴포넌트 부분임
-->

<template>
  <div>
    <h1>{{ result }}</h1>
    <form v-on:submit="onSubmitForm">
      <input ref="answer" maxlength="4" v-model="value" />
      <button>입력</button>
    </form>
    <div>시도: {{}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      result: ""
    };
  },
  methods: {
    onSubmitForm(e) {
      e.preventDefault();
    }
  }
};
</script>

<style></style>
