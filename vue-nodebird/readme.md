# Vue Nodebird

```command
npm init
npm i vue nuxt
```

## 1-3. nuxt router와 layout, head

- nuxt는 여러개의 layout을 가질 수 있다.
- layouts 폴더 안에 default.vue, admin.vue가 있다고 가정하자.

```vue
<script>
export default {
  layout: 'admin', // 기본적으로 default.vue를 따라가는데 여기선 admin.vue를 따라간다.
  data() {
    return {
      name: 'Nuxt.js',
    };
  },
  head() {
    return {
      title: '프로필',
    };
  },
};
</script>
```

- 만약 페이지 head가 없으면 layouts/default.vue의 head를 사용한다.
- 레이아웃간에 head가 중복되면 nuxt.config.js 파일에서 head를 사용해서 중복을 제거할 수 있다.

```js (nuxt.config.js)
module.exports = {
  head: {
    title: 'Nodebird',
  },
};
```

## 1-4 nuxt를 vuetify와 연결하기

```command
npm i vuetify @nuxtjs/vuetify
npm i axios @nuxtjs/axios
```

```js (nuxt.config.js)
module.exports = {
  // ...
  modules: ['@nuxtjs/axios'],
  devModules: ['@nuxtjs/vuetify'],
};
```

- 이렇게 axios와 vuetify를 연결한다.

## 1-5 vuetify 레이아웃과 아이콘

- 컴포넌트에 v-bind로 인라인 스타일 작성

```vue
<template>
  <v-text-field :style="{ display: 'flex', alignItems: 'center' }" />
</template>
```

## 1-7. 기본 페이지 화면 만들기

- 페이지에 컴포넌트 적용

```vue
<template>
  <follow-list />
</template>

<script>
import FollowList from '~/components/FollowList';

export default {
  components: {
    FollowList,
  },
};
</script>
```

## 1-9. eslint 도입하기

```command
npm i -D eslint eslint-plugin-vue
```

- .eslintrc 작성

```.eslintrc
{
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "env": {
    "browser": true,
    "node": true
  },
  "extends": ["plugin:vue/recommended"],
  "plugins": [],
  "rules": {
    "vue/singleline-html-element-content-newline": "off"
  }
}
```
- rules에서 예외 규칙들을 off 해주면 된다.


- 터미널에서 lint 확인
```
eslint **/*
```

## 참고 문서

- [Vue.js 공식문서](https://kr.vuejs.org)
- [Nuxt.js 공식문서](https://ko.nuxtjs.org)
- [Vuetify 공식문서](https://v2.vuetifyjs.com/ko)

## 듣던 강좌

2-1