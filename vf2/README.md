# vf2

## 프로젝트 설치
```command
npm i -g @vue/cli
vue --version
vue create vf2
```

- Manually select features
- Babel, Router, Vuex, Linter
- ESLint Standard

```command
cd vf2
npm run serve
```

## 8. vuetify 설치하기
```command
vue add vuetify
```

- ? Choose a preset: Configure (advanced)
- ? Use a pre-made template? (will replace App.vue and HelloWorld.vue) Yes
- ? Use custom theme? No
- ? Use custom properties (CSS variables)? No
- ? Select icon font Material Design Icons
- ? Use fonts as a dependency (for Electron or offline)? No
- ? Use a-la-carte components? Yes (자기가 사용한 것만 영리하게 잡아내서 설치한다.)
- ? Select locale English

- IE11 & Safari 9 support
- [브라우저 호환성](https://v2.vuetifyjs.com/ko/getting-started/browser-support/#ie-11-amp-safari-9-support)

## 9. appbar 만들기

- [Vuetify > UI 컴포넌트 > App bars](https://v2.vuetifyjs.com/ko/components/app-bars)

## 파이어베이스

- 데이터베이스에 접속하려면 신뢰할 수 있는 서버 백엔드가 필요했다. 하지만 프론트에서 데이터베이스에 직접 접근하는 것은 위험한 것이다. 그래서 룰이 존재한다. 테스트 모드로 개발하더라도 나중엔 잠금 모드로 바꿔줘야한다.

- 데이터베이스
  - Realtime Database: 양이 상당히 적다
  - Cloud Firestore: 게시판에 적합, 각각의 필드가 비슷하게 있고 필터링이나 페이징이 필요할 때 적합하다.

- 프로젝트 설정
  - 지원 이메일 설정 필요하다.
  - 기본 GCP 리소스 위치 설정
    - us-central: 상당히 느리다.
    - asia-northeast1: 도쿄
    - asia-northeast2: 오사카
    - asia-northeast3: 서울
  - 웹 앱에 Firebase 추가
    - 앱 닉네임: heroyooi-vf2
    - 파이어베이스 호스팅 체크
    - 앱 추가되면 내 앱의 SDK 설정 및 '구성'에서 구성 선택

```command
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

## 16. realtime 쓰고 읽기

```command
npm i firebase
```

- src/plugins/firebase.js 파일 생성
- src/main.js 파일에 위 파일 연결

- [Firebase 문서 > 웹 > 데이터 읽기 및 쓰기](https://firebase.google.com/docs/database/web/read-and-write)

```vue
<script>
export default {
  methods: {
    save () {
      this.$firebase.database().ref().child('abcd').set({
        title: 'abcd', text: 'ttttt'
      })
    },
    read () {
      this.$firebase.database().ref().child('abcd').on('value', (sn) => {
        console.log(sn)
        console.log(sn.val())
      })
    },
    async readOne () {
      const sn = await this.$firebase.database().ref().child('abcd').once('value')
      console.log(sn.val())
    }
  }
}
</script>
```
- Realtime 데이터베이스에 데이터 쓰기
- 계속 변화를 감지하는 on
- 한번만 읽는 once
- set: 통째로 바꾼다.
- update: 부분만 바꾼다.

## 17. 제목 수정해보기

- 데이터베이스 룰 바꿔보기

- database.rules.json 파일 수정
```json
{
  "rules": {
    ".read": true,
    ".write": false
  }
}
```

```command
firebase deploy --only database
```
- 파이어베이스 콘솔에서 직접 규칙을 바꿔줘도 된다.

## 19. 에러 처리하기

- src/plugins/vuetify.js 파일에 스낵바 옵션 정의(NPM 문서대로)
- [NPM | vuetify-toast-snackbar](https://www.npmjs.com/package/vuetify-toast-snackbar)

- src/error.js 파일 작성
```js
import Vue from 'vue'

Vue.config.errorHandler = e => {
  console.error(e.message)
  Vue.prototype.$toast.error(e.message)
}
```
- src/main.js 에서 error 파일 연결
```js
import './error'
```

```command
npm i vuetify-toast-snackbar
```

## 22. 메뉴항목 이동시키기

```js
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb'); // index 1인 'March' 부터 0 개를 지우고 'Feb'를 넣는다.
```

## 23. 로그인 만들기



## 참고 링크
- [Vuetify 공식문서](https://v2.vuetifyjs.com/ko)
- [파이어베이스 콘솔](https://console.firebase.google.com)
- [MDI icons](https://pictogrammers.github.io/@mdi/font/2.0.46)
- [저장소 vf2](https://github.com/fkkmemi/vf2)
- [강좌 | Vue와 Firebase로 나만의 사이트 만들기 23 로그인 만들기 | 10:10](https://www.youtube.com/watch?v=sDz0iYXOq3A&list=PLjpTKic1SLZsWckh_DZ6tYH17MM6hBAc7&index=24)