<template lang="pug">
  .verifycode.px-3.d-flex.justify-content-center.align-items-center(@click="randomNum")
    | {{ verifycode }}
</template>

<script>
export default {
  data() {
    return {
      verifycode: '',
    };
  },
  methods: {
    randomNum() {
      let result = String(Math.floor(Math.random() * 10000));
      while (result.length !== 4) {
        result = `0${result}`;
      }
      this.verifycode = result;
      this.$emit('getRandom', this.verifycode);
    },
  },
  created() {
    this.randomNum();
  },
};
</script>

<style lang="scss" scoped>
  .verifycode {
    background-color: #202020;
    height: 100%;
    border-radius: 0 4px 4px 0;
    color: white;
    cursor: pointer;
  }
</style>
