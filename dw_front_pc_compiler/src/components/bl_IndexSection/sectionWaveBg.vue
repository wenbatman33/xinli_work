<template lang="pug">
.wrapper
  svg.waves(xmlns='http://www.w3.org/2000/svg', xmlns:xlink='http://www.w3.org/1999/xlink', viewBox='0 24 150 28', preserveAspectRatio='none', shape-rendering='auto')
    defs
      path#gentle-wave(d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z')
    g.parallax
      use(xlink:href='#gentle-wave', x='44', y='5', fill='rgba(255,255,255,0.1)')
      use(xlink:href='#gentle-wave', x='44', y='3', fill='rgba(255,255,255,0.2)')
      //- use(xlink:href='#gentle-wave', x='44', y='0', fill='rgba(255,255,255,0.3')

</template>
<script>
export default {
  data() {
    return {
    };
  },
};
</script>
<style lang="scss" scoped>
.wrapper{
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 0;
  .waves{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
  }
}
/* Animation */
.parallax > use {
  animation: move-forever 30s cubic-bezier(.55,.5,.45,.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
    transform: translate(-90px, 0%);
  }
  100% {
    transform: translate(85px, 0%);
  }
}

/*prevent many large-by-comparison ripples by shrinking the height*/

@media (max-width: 50em) {
  .waves {
    height: 17vw;
  }
}
</style>
