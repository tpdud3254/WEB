<!--
FIXME: 라이프사이클,

* :class, :style 은 객체 스타일을 지원한다.......
* 라이프 사이클 (랜더링 되자마자 실행) : created, mounted, updated, destroyed
  - created : 컴포넌트가 보여지기는 하지만 화면에 나타나기 전/데이터가 준비되었을때
  - mounted : 화면에 나타난 후
  - updated : 화면에 데이터가 바껴서 화면이 다시 그려질 때
  - destroyed : 화면에 있다가 없어져 버렸을 때
-->

<template>
  <div>
    <div id="computer" :style="computedStyleObject"></div>
    <!-- css에서는 background-image이렇게 표현하지만 js에서는 -를 마이너스로 치기때문에 css속성을 js로 표현할때는 대문자로 바꿔줌(카멜케이스)-->
    <div>
      <button @click="onClickButton('바위')">바위</button>
      <!-- 그냥 @click="onClickButton"만쓰면 무슨 버튼인지 모르니까 인자를 붙여줄수있음 -->
      <button @click="onClickButton('가위')">가위</button>
      <button @click="onClickButton('보')">보</button>
    </div>
    <div>{{ result }}</div>
    <div>현재 {{ score }}점</div>
  </div>
</template>
<script>
const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px"
};

let interval = null;

const scores = {
  가위: 1,
  바위: 0,
  보: -1
};

const computerChoice = imageCoord => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imageCoord;
  })[0];
}; //컴퓨터의 선택

export default {
  data() {
    return {
      imageCoord: rspCoords.바위, //바로 0, -142px 등의 값을 넣어도되지만 무슨 값인지 유추가 어려움. 이럼 의미가 불분명한 값들은 이름을 붙여주는게 좋음 (팁)
      result: "",
      score: 0
    };
  },
  computed: {
    computedStyleObject() {
      return {
        background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imageCoord} 0`
      };
    }
  }, //단순히 데이터만 쓰는것이아닌 추가 적인 문자열들이 붙어있을경우 컴퓨티드쓰면됨. 왜냐? 캐싱을 자동으로 해주기 때문
  methods: {
    changeHand() {
      //메쏘드를 이렇게 중복제거하려고 쓸수도 있음
      interval = setInterval(() => {
        // 이렇게 변수에 저장해야 나중이 clearInterval로 멈춰줄수있어서 변수에 저장하는거임
        if (this.imageCoord === rspCoords.바위) {
          this.imageCoord = rspCoords.가위;
        } else if (this.imageCoord === rspCoords.가위) {
          this.imageCoord = rspCoords.보;
        } else {
          this.imageCoord = rspCoords.바위;
        }
      }, 100);
    },
    onClickButton(choice) {
      clearInterval(interval);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(this.imageCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        this.result = "비겼습니다.";
      } else if ([-1, 2].includes(diff)) {
        this.result = "이겼습니다.";
        this.score += 1;
      } else {
        this.result = "졌습니다.";
        this.score -= 1;
      }
      setTimeout(() => {
        this.changeHand();
      }, 1000);
    }
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
    this.changeHand();
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeDestroy() {
    //mouted에서 interval 설정해준게 계속 실행이됨 (컴포넌트가 사라져도 실행됨), 그때 여기에서 정리해주면됨 (destroyed에서 해도딤), 메모리 누수 방지
    console.log("beforeDestroy");
    clearInterval(interval);
  },
  destroyed() {
    console.log("destroyed");
  }
};
</script>

<style scoped>
#computer {
  width: 142px;
  height: 200px;
  background-position: 0 0;
}
</style>
