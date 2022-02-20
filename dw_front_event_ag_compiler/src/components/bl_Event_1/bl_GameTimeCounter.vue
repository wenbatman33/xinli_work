<template lang="pug">
  p {{bonusCountDown}}
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: ['time'],
  data() {
    return {
      bonusCountDown:'',
      bonustOnTimeTimer:null,
    };
  },
  methods: {
    bonustOnTime(time){
      // 目前在抢红包时段内的倒计时 每秒倒数
      const vm = this; 
      const today = this.$dayjs().format('YYYY-MM-DD HH:mm:ss');
      // 賽前一小時
      const currentTime = this.$dayjs(time).subtract(1,'hour').format('YYYY-MM-DD HH:mm:ss');
      // 利用 dayjs 算时间差距
      const timeGap = this.$dayjs(time).subtract(1,'hour').diff(this.$dayjs(today));
      // 换算毫秒后格式化时间
      const hours = parseInt(Math.floor(timeGap / 1000 / 60 / 60 ), 10);
      const minutes = parseInt((timeGap % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = (timeGap % (1000 * 60)) / 1000;
      
      this.bonusCountDown = ((hours<10)?'0'+hours :hours)+":"+((minutes<10)?'0'+minutes :minutes)+":"+((seconds<10)?'0'+seconds :seconds);
      if(timeGap<=0){
        clearTimeout(vm.bonustOnTimeTimer);
        this.bonusCountDown = '00:00:00';
      } else{
        this.bonustOnTimeTimer = setTimeout(() => {
          vm.bonustOnTime(time);
        }, 1000);
      }
    },
  },
  beforeDestroy () {
    clearTimeout(this.bonustOnTimeTimer);
  },
  mounted () {
    if(this.time)  this.bonustOnTime(this.time);
  }
};
</script>
<style lang='scss' scoped>
</style>
