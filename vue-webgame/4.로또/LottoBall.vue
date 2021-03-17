<template>
  <div class="ball" :style="styleObject">{{ number }}</div>
</template>

<script>
export default {
  name: 'LottoBall', // name을 안적으면 자동으로 컴포넌트의 이름이 name이 된다.
  props: {
    number: Number,
  },
  computed: {
    styleObject() {
      let background;
      if (this.number <= 10) {
        background = 'red';
      } else if (this.number <= 20) {
        background = 'orange';
      } else if (this.number <= 30) {
        background = 'yellow';
      } else if (this.number <= 40) {
        background = 'blue';
      } else {
        background = 'green';
      }
      return {
        background,
      };
    },
  },
};
</script>

<style>
.ball {
  display: inline-block;
  border: 1px solid black;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  margin-right: 20px;
}
</style>
