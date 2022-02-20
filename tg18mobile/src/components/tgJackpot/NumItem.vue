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
    display: inline-block;
    height: 56px;
    margin: 0 4px;
    padding: 0 13px;
    background: rgba(255,255,255,1);
    color: rgba(63,63,63,1);
    font-family: Arial;
    font-size: 40px;
    font-weight: 900;
    line-height: 56px;
    vertical-align: bottom;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
  }
  .number{
    position: relative;
    top: -56px;
  }
  /*-- Mobile --*/
  @media screen and (max-width: 750px) {
    .num{
      height: 7.5vw;
      margin: 0 0.53vw;
      padding: 0 1.73vw;
      font-size: 5.3vw;
      line-height: 7.5vw;
      border-radius: 0.67vw;
    }
    .number{
      top: -7vw;
    }
  }
	/*-- Mobile End --*/
</style>

