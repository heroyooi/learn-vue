# Vue Nodebird

```command
npm init
npm i vue nuxt
```

## 1-3. nuxt router와 layout, head

- nuxt는 여러개의 layout을 가질 수 있다.
- layouts 폴더 안에 default.vue, admin.vue가 있다고 가정하자.

```vue
<scrip>
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
</scrip>
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

<scrip>
import FollowList from '~/components/FollowList';

export default {
  components: {
    FollowList,
  },
};
</scrip>
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

- IDE eslint 관련 자동 저장 설정

```json (settings.json)
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

## 2-3. 로그인 회원가입 더미 데이터

- Vuex를 활용한 로그인, 로그아웃 예제

```js (store/users.js)
export const state = () => ({
  me: null,
});

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
};

export const actions = {
  signUp({ commit, dispatch, state, rootState, getters, rootGetters }, payload) {
    // 서버에 회원가입 요청을 보내는 부분
    commit('setMe', payload);
  },
  logIn({ commit }, payload) {
    commit('setMe', payload);
  },
  logOut({ commit }, payload) {
    commit('setMe', null);
  },
};
```

- actions의 rootState, rootGetters는 index 모듈의 state, getters이다.

```vue (components/LoginForm.vue)
<template>
  <v-container v-if="!me">
    <v-card>
      <v-form @submit.prevent="onSubmitForm">
        <v-btn type="submit">로그인</v-btn>
      </v-form>
    </v-card>
  </v-container>
  <v-container v-else>
    <v-card>
      {{ me.nickname }}님 로그인 되었습니다.
      <v-btn @click="onLogOut">로그아웃</v-btn>
    </v-card>
  </v-container>
</template>

<scrip>
export default {
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  }
  methods: {
    onSubmitForm() {
      this.$store.dispatch('users/logIn', {
        nickname: this.nickname,
        email: this.email
      })
        .then(() => {
          this.$router.push({
            path: '/',
          });
        })
        .catch(() => {
          alert('로그인 실패');
        });
    },
    onLogOut() {
      this.$store.dispatch('users/logOut');
    }
  },
}
</scrip>
```

## 2-4. 게시글 작성 폼 만들기

- 일반적으로 모듈 내에서 mutations를 실행 시킬 때

```js (store/posts.js)
export const actions = {
  add({ commit }, payload) {
    commit('addMainPost', payload);
  },
};
```

- 만약 스토어 모듈에서 mutations를 실행시킬 때, index의 mutations를 실행시키고 싶으면

```js (store/posts.js)
export const actions = {
  add({ commit }, payload) {
    commit('addMainPost', payload, { root: true });
  },
};
```

- 컴포넌트나 페이지에서 vuex의 값을 가져올 때

```vue
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    // 1
    ...mapState('users', ['me']),

    // 2
    ...mapState(['users/me']),

    // 3
    me() {
      return this.$store.state.users.me;
    },
  },
};
</script>
```

### 3-1. 팔로워 팔로잉 더미 데이터

- 3강 부턴 프론트엔드 개발에 필요한 다양한 것들 학습

- 팔로워, 팔로잉 구현

- 스토어에 필요한 state, mutations, actions 정의

```js (store/user.js)
export const state = () => ({
  followerList: [{id: 1, nickname: '히어로'}],
});
export const mutations = {
  addFollower(state, payload) {
    state.followerList.push(payload);
  },
  removeFollower(state, payload) {
    const index = state.followerList.findIndex((v) => v.id === payload.id);
    state.followerList.splice(index, 1);
  },
};
export const actions = {
  addFollower({ commit }, payload) {
    commit('addFollower', payload);
  },
  removeFollower({ commit }, payload) {
    // 비동기 요청
    commit('removeFollower', payload);
  },
}
```

- 페이지 컴포넌트에서 해당 스토어 state 및 액션 dispatch

```vue (pages/profile.vue)
<template>
  <div>
    <follow-list
      :users="followerList"
      :remove="removeFollower"
    />
  </div>
</template>

<script>
import FollowList from '~/components/FollowList';
export default {
  components: {
    FollowList,
  },
  computed: {
    followerList() {
      return this.$store.state.users.followerList;
    },
  },
  methods: {
    removeFollower(id) {
      this.$store.dispatch('users/removeFollower', { id });
    }
  },
}
</script>
```

```vue (components/FollowList/vue)
<template>
  <ul>
    <li v-for="user in users" :key="user.id">
      <span>{{ user.nickname }}</span>
      <v-icon @click="remove(user.id)">mdi-minus-circle-outline</v-icon>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
    remove: {
      type: Function,
      required: true,
    }
  },
};
</script>
```

### 3-2. 라우팅 미들웨어

- 로그아웃 되어있는데 프로필 페이지에 접근하는 경우
- 미들웨어를 만들어줘야하는데 middleware라는 폴더를 생성해준다.

- 로그인 안된 사용자면 메인으로 보내는 미들웨어
```js (middleware/authenticated.js)
export default function({ store, redirect }) {
  if (!store.state.users.me) {
    redirect('/');
  }
}
```
- 함수의 매개변수에는 context가 들어간다. context를 구조분해해서 store, redirect를 받을 수 있다.

```vue (profile.vue)
<script>
export default {
  middleware: 'authenticated',
}
</script>
```
- 사용할 페이지에서 middleware 연결

#### watch 사용 예

- 회원가입 페이지에서 로그인하는 경우 자동으로 메인페이지로 가도록

```vue (pages/signup.vue)
<script>
export default {
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  },
  watch: {
    me(value, oldValue) {
      if (value) {
        this.$router.push({
          path: '/',
        });
      }
    }
  },
}
</script>
```

## 참고 문서

- [Vue.js 공식문서](https://kr.vuejs.org)
- [Nuxt.js 공식문서](https://ko.nuxtjs.org)
- [Vuetify 공식문서](https://v2.vuetifyjs.com/ko)

## 듣던 강좌

3-2
