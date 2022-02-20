<template lang='pug'>
.rollText.w-100(ref='rollText')
  .teamName(ref='text') {{teamName}}
</template>

<script>
export default {
  props: ['teamName'],
  methods: {
    reSize() {
      if (this.$refs.text.clientWidth > this.$refs.rollText.clientWidth) {
        this.$refs.text.classList.add('txtTooLong');
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.reSize);
  },
  mounted() {
    window.addEventListener('resize', this.reSize);
    this.reSize();
  },
};
</script>
<style lang='scss' scoped>
.rollText{
  height: 50px;
  overflow: hidden;
  .txtTooLong{
    animation: 12s linear infinite rollTextAnimate;
    transform: translateX(100%);
  }
  .teamName{
    color: white;
    position: relative;
    margin: 0;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
    overflow: visible;
    display: inline-block;
    white-space: nowrap;
  }
}
@keyframes rollTextAnimate {
  0% {transform: translateX(0%)}
  50% {transform: translateX(0%)}
  69% {transform: translateX(-100%)}
  69.001% {transform: translateX(50%)}
  80% {transform: translateX(0%)}
  100% {transform: translateX(0%)}
}
</style>
