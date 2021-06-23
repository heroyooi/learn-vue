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

```command
vue create modal-project
cd modal-project
npm run serve
```

## Click event modifiers

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

## 참고 링크

- [Vue JS 3 Tutorial for Beginners 강좌 | 26:54](https://www.youtube.com/watch?v=KM1U6DqZf8M&list=PL4cUxeGkcC9hYYGbV60Vq3IXYNfDk8At1&index=5)
- [저장소](https://github.com/iamshaunjp/Vue-3-Firebase)
