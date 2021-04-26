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

- nuxt.config.js

```js
module.exports = {
  head: {
    title: 'Nodebird',
  },
};
```

## 참고 문서

- [Vue.js 공식문서](https://kr.vuejs.org)
- [Nuxt.js 공식문서](https://ko.nuxtjs.org)

## 듣던 강좌

1-4
