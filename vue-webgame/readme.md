# Vue Webgame

- 웹팩 사용하기

```command
npm init
npm i vue
npm i webpack webpack-cli -D
npm i vue-loader vue-template-compiler -D
```

- 웹팩 설정은 크게 4가지로 구성되어있다.
  - entry, module, plugins, output 이 4가지가 주된 설정이고 나머지는 부가적인 설정이다. (webpack.config.js)
    - 모듈의 rules 같은 경우 js 파일이 아닌 경우 로더를 설치해서 변환될 수 있도록 설정해준다.
    - 웹팩 관련된 로더들을 설치할 때 개발 모드로 설치한다. 예) npm i vue-loader -D
    - 모듈은 기본적으로 웹팩의 대부분 역할을 한다. 자바스크립트가 아닌 파일들을 자바스크립트로 만들어준다. (로더가 중심)
    - 플러그인은 부가적인 역할을 한다. output이 나오기 전에 추가적으로 몇가지 작업을 해준다.

## 1. 숫자야구

- 기본적인 웹팩 설정 및 빌드

```command
npm run build
```

## 2. 반응속도체크

- 웹팩 watch 적용
- css 컴파일을 위한 로더 추가 적용

```command
npm i vue-style-loader css-loader -D
```

- 웹팩 dev server 설치 및 웹팩 설정에서 output에 publicPath 추가

```command
npm i webpack-dev-server -D
npm run dev
```

- 소스를 고치면 새로고침 없이 적용된다.
- computed 속성 사용
  - 일반 data를 가공해서 사용할 때 computed를 쓴다.
  - 만약 template 안에 계산되는 부분을 그대로 두면 다른 데이터가 바뀌었을 때 계산되는 부분이 다시 실행된다. 그래서 성능의 저하를 가져다 준다.
  - computed를 쓰면 계산하는 값이 캐싱이 되기 때문에 성능 최적화에 도움이 된다.

## 3. 가위바위보

```Vue
<template>
  <div id="computer" :class="{ state: true, hello: false }" :style="{ backgroundImage: '', fontSize: '14px' }"></div>
</template>
```

- class와 style은 위와 같이 객체를 지원한다.

- 라이프사이클에 대한 설명

  - created: 보여지기는 하지만 화면에 나타나기 전, 데이터들이 다 준비되면 자바스크립트 상에서만 존재
  - mounted: 화면에 나타난 후

  - created, mounted, updated, destroyed 가 있으며, 각각 이전에
  - beforeCreate, beforeMount, beforeUpdate, beforeDestroy 가 존재한다.

## 4. 로또

- 컴포넌트와 props
- watch: watch는 되도록 안쓰는 것이 좋다. 최후의 수단으로 사용할 것
- data나 props가 바뀌었을 때 computed, watch가 실행된다.
  - computed는 새로운 값을 return 하고, watch는 특정 동작을 수행한다.

## 5. 틱택토

- Vue는 React와 다르게 하위 컴포넌트에서 부모 컴포넌트와, 최상위 컴포넌트의 데이터에 접근할 수 있다. 그리고 데이터 조작도 할 수 있다.

```Vue
<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
export default {
  props: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number,
    turn: String,
  },
  methods: {
    onClickTd() {
      console.log(this.$root.$data); // 최상위 컴포넌트의 데이터
      console.log(this.$parent.$data); // 부모 컴포넌트의 데이터
      this.$root.$data.turn = this.$root.$data.turn === 'O' ? 'X' : 'O'; // 최상위 컴포넌트의 데이터 조작
    },
  },
};
</script>
```

- 배열의 index를 사용해서 데이터를 바꾸는 경우 화면에 반영이 안된다.

```Vue
<script>
import Vue from 'vue';

export default {
  methods: {
    onChangeData() {
      this.turn = 'X';
      this.tableData[0][1] = 'O'; // X, 작동하지 않음
      Vue.set(this.tableData[1], 0, 'X');
      this.$set(this.tableData[1], 0, 'X'); // Vue.set과 동일
    },
  },
}
</script>
```

- Vue.set 혹은 this.$set을 사용해서 배열의 내부 값을 바꿔줘야 화면에 반영된다.

### ETC

- 자식에서 부모로 데이터 보내는 예제 추가
  - CustomInput: EventHandler 사용
  - CustomInputEmit: $emit 사용

## 5. 틱택토EventBus

- EventBus.js 파일 작성

```JS
import Vue from 'vue';

export default new Vue(); // 뷰 인스턴스
```

- 이렇게 비어있는 뷰 인스턴스를 만든다.

- TicTacToe.vue

```Vue
<script>
import EventBus from './EventBus';
export default {
  created() {
    EventBus.$on('clickTd', this.onClickTd); // EventBus 등록
  },
}
</script>
```

- 최상단 컴포넌트에서 EventBus의 이벤트를 등록해준다.

- TdComponent.vue

```Vue
<script>
import EventBus from './EventBus';
export default {
  methods: {
    onClickTd() {
      EventBus.$emit('clickTd'); // EventBus 등록되어있는 특정 이벤트 사용
    },
  },
}
</script>
```

- 이벤트를 사용하는 컴포넌트에서 해당 이벤트를 호출한다.

- 장단점
  - 중앙 컴포넌트에서 이벤트를 다 관리할 수 있다.
  - 중앙 컴포넌트 내용이 무수히 길어진다.

# 5. 틱택토Vuex

- vuex를 설치한다.

```command
npm i vuex
```

- store.js 파일 작성

```JS
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const SET_WINNER = 'SET_WINNER';

export default new Vuex.Store({
  state: {
    winner: '',
  }, // vue의 data와 비슷
  getters: {}, // vue의 computed와 비슷
  mutations: {
    [SET_WINNER](state, winner) {
      state.winner = winner;
    },
  }, // state를 수정할 때 사용. 동기적으로
  actions: {}, // 비동기를 사용할 때, 또는 여러 뮤테이션을 연달아 실행할 때
});

```

- 스토어를 만들어준다. 뷰엑스는 스토어를 여러개 만들어도 된다. (리덕스는 스토어를 하나만 만들어야한다.)

- TicTacToe.vue

```Vue
<script>
import { mapState } from 'vuex';
import store from './store';

export default {
  store,
  data() {
    return {
      data: 1,
    }
  },
  computed: {
    // 스토어의 state를 부르는 방식
    // 1
    ...mapState(['winner', 'turn']),

    // 2
    ...mapState({
      winner(state) {
        return state.winner + this.data;
      },
      winner: state => state.winner,
      turnState: 'turn',
    }),

    // 3
    winner() {
      return this.$store.state.winner;
    },
    turn() {
      return this.$store.state.turn;
    },
  }
}
</script>
```

- 최상단 컴포넌트에서 스토어를 연결하고, state를 불러온다.

```Vue
<script>
export default {
  methods: {
    onClickTd() {
      this.$store.commit(SET_WINNER, this.turn);
    }
  }
}
</script>
```

- 다음과 같이 뮤테이션을 실행시킨다.
- actions 같은 경우 this.$store.dispatch로 실행

- slot을 사용하면 자식 컴포넌트에 있는 요소에 부모 컴포넌트에서 이벤트를 걸어줄 수 있다.

# 6. 지뢰찾기

- 고차 함수로 기존 함수를 확장
  - 화살표 함수 내부에선 this를 사용할 수 없으므로 일반 함수로 작업

```Vue
<script>
export default {
  computed: {
    ...mapState(['tableData']),
    cellDataStyle(state) {
      return function(row, cell) {
        switch (this.$store.state.tableData[row][cell]) {
          case CODE.NORMAL:
          case CODE.MINE:
            return {
              background: '#444',
            };
          case CODE.CLICKED_MINE:
          case CODE.OPENED:
            return {
              background: '#fff',
            };
          default:
            return {};
        }
      };
    },
  }
}
</script>
```

- watch 사용 예제

```Vue
<script>
export default {
  store,
  computed: {
    ...mapState(['timer', 'result', 'halted']),
  },
  watch: {
    halted(value, oldValue) {
      if (value === false) {
        // false일 때 게임 시작
        interval = setInterval(() => {
          this.$store.commit(INCREMENT_TIMER);
        }, 1000);
      } else {
        // 게임 중단
        clearInterval(interval);
      }
    },
  },
};
</script>
```

# Vue Router

```command
npm i vue-router
```

- 라우터는 눈속임이다.
- 실제로는 페이지가 하나인데, 주소로 화면을 바꾸어주면서 눈속임을 하는 것이다.

- 뷰 라우터는 기본적으로 해쉬 라우터를 사용한다.
- 주소가 해쉬태그로 되어있다. 해쉬 라우터로 되어있으면 새로고침 했을 경우 화면이 유지된다.
- 실무에서는 해쉬 라우터를 잘 안씀 => 해쉬 라우터를 쓰면 검색엔진에 잘 안걸린다.

- 히스토리 라우터도 SSR 처리가 필요하긴 하다.
- 히스토리 라우터는 새로고침하면 페이지가 뜨지 않는다.
  - 실제 주소가 아니라 눈속임으로 만들어낸 가짜 주소이기 때문에
  - 새로고침은 서버에 요청을 보내는 행위이다.
  - 서버도 알게하려면 서버에도 라우터들을 등록을 해줘야한다.(서버가 필요)

## 링크

- [Vue 웹게임 강좌](https://youtu.be/TIHluPn05VY)
- [Vue 스타일 가이드](https://kr.vuejs.org/v2/style-guide/index.html)
- [Vue Router 가이드](https://router.vuejs.org/kr/guide)
