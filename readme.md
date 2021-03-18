# Learn Vue

## Vue Webgame

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

### 1. 숫자야구

- 기본적인 웹팩 설정 및 빌드

```command
npm run build
```

### 2. 반응속도체크

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

### 3. 가위바위보

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

### 4. 로또

- 컴포넌트와 props
- watch: watch는 되도록 안쓰는 것이 좋다. 최후의 수단으로 사용할 것
- data나 props가 바뀌었을 때 computed, watch가 실행된다.
  - computed는 새로운 값을 return 하고, watch는 특정 동작을 수행한다.

### 5. 틱택토

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

### 링크

[Vue 스타일 가이드](https://kr.vuejs.org/v2/style-guide/index.html)

### 강좌

- 7-4
