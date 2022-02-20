<template lang='pug'>
  .container-fluid.tgJackpotBG
    .container
      .row
        .col-12.tgJackpot
          h3.mb-0.mr-2 累积奖池
          span(v-for="(item, index) in dataCountArray" :key="index")
            span.punctuation(v-if="item[0]===',' || item[0]==='.' ") {{item[0]}}
            NumItem(v-else :key="index" :count="item[0]")

</template>
<script>
import NumItem from '@/components/tgJackpot/NumItem.vue';

let loop;
export default {
  components: {
    NumItem,
  },
  props: ['jackpot'],
  data() {
    return {
      countJackpot: 0,
      stringJackpot: 0,
      dataCountArray: [],
    };
  },
  computed: {
    thousandComma() {
      let num = this.stringJackpot.toString();
      const pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(num)) {
        num = num.replace(pattern, '$1,$2');
      }
      return num;
    },
  },
  methods: {
    init() {
      const temp = Number(this.jackpot) * 100;
      this.countJackpot = temp;
      this.increment();
    },
    formatCurrency() {
      let num = this.stringJackpot.toString().replace(/\$|,/g, '');
      if (Number.isNaN(num)) { num = '0'; }
      const sign = Math.abs(num);
      num = Math.floor((num * 100) + 0.50000000001);
      let cents = num % 100;
      num = Math.floor(num / 100).toString();
      if (cents < 10) { cents = `0${cents}`; }
      for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i += 1) {
        num = `${num.substring(0, num.length - ((4 * i) + 3))},${
          num.substring(num.length - ((4 * i) + 3))}`;
      }
      return (`${((sign) ? '' : '-') + num}.${cents}`);
    },
    setTimer() {
      const dataArray = Array.from(this.stringJackpot.toString());
      this.dataCountArray = dataArray;
    },
    increment() {
      const vm = this;
      this.increment_step2();
      loop = setInterval(this.increment_step2, 50);
    },
    increment_step2() {
      // const tempNum = Math.floor(Math.random() * 100) + 1;
      this.countJackpot += 1;
      this.stringJackpot = (this.countJackpot / 100).toFixed(2);
      this.stringJackpot = this.formatCurrency();
      this.setTimer();
    },
  },
  beforeDestroy() {
    this.dataJackpot = 0;
    this.dataCountArray = [];
    clearInterval(loop);
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
  .tgJackpotBG{
    background-image: linear-gradient(87deg, #002766, #001332);
  }
  .tgJackpot{
    display:flex;
    color: #FFF;
    min-height: 88px;
    line-height: 88px;
    text-align: center;
    justify-content: center;
    align-items:center;
  }

  .punctuation{
    font-family: Arial;
    font-weight: bold;
    color: #FFF;
    font-size: 44px;
  }
</style>

