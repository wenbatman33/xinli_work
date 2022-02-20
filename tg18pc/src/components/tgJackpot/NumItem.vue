<template lang='pug'>
  .num
    div.number.animated(:class=" rolling ? 'slideInUp' : '' ") {{ preCount }}
    div.number.animated(:class=" rolling ? 'slideInUp' : '' ") {{ nextCount }}
</template>
<script>
let loop;
export default {
  props: ['count'],
  data() {
    return {
      rolling: false,
      preCount: 0,
      nextCount: this.count,
      loop: '',
    };
  },
  methods: {
    run() {
      const vm = this;
      this.loop = setTimeout(() => {
        vm.rolling = false;
      }, 50);
    },
  },
  beforeDestroy() {
    clearTimeout(loop);
  },
  watch: {
    count(val, oldVal) {
      this.rolling = true;
      this.nextCount = val;
      this.preCount = oldVal;
      this.run();
    },
  },
  mounted() {
    this.run();
  },
};
</script>
<style lang="scss" scoped>
  .num{
    position: relative;
    width: 44px;
    height: 44px;
    overflow: hidden;
    background: #fff;
    font-size: 44px;
    line-height: 44px;
    border-radius: 4px;
    margin:0 5px;
  }
  .number{
    position: relative;
    top:-44px;
    font-family: Arial;
    font-weight: bold;
    color: #3f3f41;
    font-size: 44px;
  }
</style>

