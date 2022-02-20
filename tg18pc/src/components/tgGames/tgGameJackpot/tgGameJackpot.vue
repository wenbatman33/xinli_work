<template lang='pug'>
  .container-fluid.tgJackpot
    .container
      .row
        .col-12.jackpot
          h3.mx-3.my-0 {{getJackpotName}} 游戏累积奖池
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
    getUrlID() {
      const path = this.$route.path.split('/');
      const parHash = path[1];
      return parHash;
    },
    getJackpotName() {
      let JackpotName = '';
      if (this.getUrlID === 'pt') {
        JackpotName = 'PT';
      } else if (this.getUrlID === 'pg') {
        JackpotName = 'PP';
      } else if (this.getUrlID === 'pp') {
        JackpotName = 'PG';
      }
      return JackpotName;
    },
  },
  watch: {
    jackpot(val) {
      this.countJackpot = Number(val) * 100;
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
  .tgJackpot{
    display:flex;
    color: #FFF;
    min-height: 70px;
    line-height: 70px;
    background: #fadb14;
    background-image: url('/static/img/pic-777-left.png');
    background-repeat: repeat-x;
    h3{
      margin-right:30px;
    }
  }
  .jackpot{
    display:flex;
    color: #FFF;
    min-height: 70px;
    line-height: 70px;
    text-align: center;
    justify-content: center;
    align-items:center;
    background: #fadb14;
    background: linear-gradient(to right, rgba(250,219,20,.1) 0%,rgba(250,219,20,1) 50%,rgba(250,219,20,.1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fadb14', endColorstr='#fadb14',GradientType=0 );
  }
  .punctuation{
    font-family: Arial;
    font-weight: bold;
    color: #3f3f41;
    font-size: 44px;
  }
</style>

