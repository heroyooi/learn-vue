<template>
  <div>
    <input type="text" v-model="inputValue" :placeholder="placeholder" @input="onInput" />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    onInput() {
      this.$emit('cinput', this.inputValue);
    },
  },
};
</script>

<style scoped>
div {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
}
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #666;
  box-sizing: border-box;
}
</style>
