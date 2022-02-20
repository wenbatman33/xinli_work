<template lang="pug">
  component(:is='TAG' :style='{"font-size":SIZE,"color":COLOR}') {{combineLetter}}
</template>
<script>
export default {
  name: 'RandomText',
  props: ['TXT', 'TAG', 'delayTime', 'LoopTime', 'SIZE', 'COLOR'],
  data() {
    return {
      loopTimer: null,
      randomLetters: 'abcdefghijklmnopqrstuvwxyz#%&@^*+=------',
      speed: 30,
      len: 0,
      steps: 4,
      Letter_1: '',
      Letter_2: '',
      combineLetter: '',
    };
  },
  methods: {
    init() {
      // 動畫時間持續0.5秒 除於字元長度
      this.Letter_1 = '';
      this.len = 0;
      this.randomTextAnimate();
      if (this.LoopTime) {
        this.loopTimer = setTimeout(() => { this.init(); }, Number(this.LoopTime));
      }
    },
    randomTextAnimate() {
      this.loopTimer = setTimeout(() => {
        if (this.len <= String(this.TXT).length) {
          this.Letter_1 += String(this.TXT).charAt(this.len - 1); 
          this.Letter_2 = '';  
          for (let i = 0; i < String(this.TXT).length - this.len; i += 1) {
            const num = Math.floor(this.randomLetters.length * Math.random());
            const letter = this.randomLetters.charAt(num);
            this.Letter_2 += letter;
          }
          this.len += 1;
          this.combineLetter = this.Letter_1 + this.Letter_2; 
          this.randomTextAnimate();
        }
      }, this.speed);
    },
  },
  beforeDestroy() {
    clearTimeout(this.loopTimer);
  },
  mounted() {
    if (this.delayTime) {
      setTimeout(() => {
        this.init();
      }, Number(this.delayTime));
    } else {
      this.init();
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
