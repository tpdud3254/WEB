<template>
  <div>
    <div>
      <router-link to="/game/index">게임매쳐</router-link>
      <router-link to="/game/number-baseball">숫자야구</router-link>
      <router-link to="/game/response-check">반응속도체크</router-link>
      <router-link to="/game/rock-scissors-paper">가위바위보</router-link>
      <router-link to="/game/lotto-generator">로또생성기</router-link>
      <!-- <router-link to="/game/lotto-generator?page=3&title=something">로또생성기</router-link> -->
      <!-- 
        위에서 ?뒤에 것들을 쿼리스트링이라함 보통 게시파네서 많이 쓰임
        this.$route.query 이런식으로 접근 (params는 주요한 데이터 query는 짜잘한거 )
        쿼리스트링 : 서버에 전달
        해쉬스트링 : 서버에는 전달하지 않고 브라우저에서만 쓰고싶을때 (잘안씀)
      -->
      <!-- a태그 같은 기능을 하지만 다른점은 다른 페이지로 이동은 하지 않음-->
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
/*
라우터는 눈속임이다!
http://localhost:8080/router.html#/response-check
-> 이렇게 샾(#, 해쉬)이 붙음. 해쉬라우터 라고하고 새로고침해도 그대로 유지
실무에서는 해쉬라우터는 잘안씀. 슬래쉬(제대로된라우터) 많이 씀 왜냐면 해쉬라우터 쓰면 검색엔진에 안뜸 
뷰는 기본적으로 해쉬라우터
제대로된 라우터 : 히스토리라우터 (새로고침하면 안뜸, 뷰라우터가 가짜주소를 만들어낸 것이기때문. 새로고침을 하게도면 서버는 이 주소가 가짜인지모르니까.. 그래서 서버도 알게 해줘야함)

코드스플리팅 (웹페이지 띄울때 미리 만들어둔 컴포넌트들이 많을경우 한번ㅇ ㅔ불러오며 ㄴ느리니까..)
*/
import router from "./routes.js";
export default {
  router
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
