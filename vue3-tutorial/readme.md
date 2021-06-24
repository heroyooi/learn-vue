# Vue JS 3 Tutorial

- npm 전역 설치

```command
npm uninstall -g vue-cli
npm install -g @vue/cli
```

- yarn 전역 설치

```command
yarn global add @vue/cli
```

- 프로젝트 만들기 및 실행

```command
vue create [PROJECT_NAME]
cd [PROJECT_NAME]
npm run serve
```

## Modal Project

- 챕터
  - Props
  - Emitting custom events
  - Click event modifiers
  - Slots
  - Challenge: creating another modal
  - Using Teleport

### Click event modifiers

- 우클릭

```vue
<template>
  <button @click.right="toggleModal">open modal</button>
</template>
```

<hr />

- Shift키, Alt키와 함께 클릭

```vue
<template>
  <button @click.shift="toggleModal">open modal</button>
  <button @click.alt="toggleModal">open modal</button>
</template>
```

<hr />

- 해당 영역에서만 작동

```vue
<template>
  <div class="backdrop" @click.self="closeModal">
    <div>이 영역은 제외됩니다.</div>
  </div>
</template>
```

## Reaction Timer

- 챕터
  - Lifecycle hooks
  - Creating a timer
  - Custom events with data
  - Challenge - showing a results component

## 참고 링크

- [Vue JS 3 Tutorial for Beginners 강좌 | 33:00](https://www.youtube.com/watch?v=bc6czIBLKTg&list=PL4cUxeGkcC9hYYGbV60Vq3IXYNfDk8At1&index=6)
- [저장소](https://github.com/iamshaunjp/Vue-3-Firebase)
