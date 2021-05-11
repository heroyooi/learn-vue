<template>
  <div>
    <div>{{ turn }}님의 턴입니다.</div>
    <table-component :table-data="tableData" />
    <div v-if="winner">{{ winner }}님의 승리!</div>

    <!-- eventHandler -->
    <custom-input placeholder="커스텀 인풋" :customOnInput="customOnInput" />

    <!-- $emit -->
    <custom-input-emit placeholder="커스텀 인풋 emit" @cinput="customOnInputEmit" />

    <ul>
      <li>
        <dl>
          <dt @click="onToggle(0)">토글 테스트 제목1</dt>
          <dd v-if="toggle[0]">토글 테스트 내용1</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt @click="onToggle(1)">토글 테스트 제목2</dt>
          <dd v-if="toggle[1]">토글 테스트 내용2</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt @click="onToggle(3)">토글 테스트 제목3</dt>
          <dd v-if="toggle[3]">토글 테스트 내용3</dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
import TableComponent from './TableComponent';
import CustomInput from './CustomInput';
import CustomInputEmit from './CustomInputEmit';

export default {
  components: {
    TableComponent,
    CustomInput,
    CustomInputEmit,
  },
  data() {
    return {
      tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      turn: 'O',
      winner: '',
      toggle: [true, true, false],
    };
  },
  methods: {
    onChangeData() {
      // this.tableData[1][0] = 'X'; 작동하지 않음
      this.$set(this.tableData[1], 0, 'X'); // Vue.set과 동일
    },
    customOnInput(state) {
      console.log('자식 컴포넌트에서 보낸 값 : ', state);
    },
    customOnInputEmit(state) {
      console.log('자식 컴포넌트에서 보낸 값 : ', state);
    },
    onToggle(num) {
      // this.toggle[num] = !this.toggle[num]; 작동하지 않음
      console.log(this);
      this.$set(this.toggle, num, !this.toggle[num]);
    },
  },
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
