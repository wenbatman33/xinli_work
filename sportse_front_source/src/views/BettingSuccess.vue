<template lang='pug'>
.pageContent.page
  .p-3(v-if='BetSuccessData')
    .container
      .row.no-gutters
        .col-12.text-left.text-lg-left.my-3
          router-link(to='/game')
            h5 
              .i.fas.fa-angle-left.mr-2
              | 回賽事列表
    .container(:class='{"CardStyle": DeviceIsPc}')
      .row.p-3
        .col-12.col-lg-6.text-center.my-3
          .p-3
            p.my-3
              svg(width='100px', height='100px', viewBox='0 0 32 32', version='1.1', xmlns='http://www.w3.org/2000/svg', xmlns:xlink='http://www.w3.org/1999/xlink')
                title icon-tick-2
                desc Created with Sketch.
                g#Page-1(stroke='none', stroke-width='1', fill='none', fill-rule='evenodd')
                  g#icon-tick-2(transform='translate(1.000000, 1.000000)', fill='#00db1e', fill-rule='nonzero', stroke='#00db1e', stroke-width='0.684')
                    path#Path(d='M29.142,4.101 C28.701,3.659 27.985,3.658 27.543,4.099 L13.98,17.628 L9.087,12.312 C8.664,11.853 7.949,11.824 7.489,12.246 C7.029,12.669 7,13.385 7.423,13.844 L13.113,20.024 C13.323,20.251 13.614,20.383 13.922,20.389 L13.946,20.389 C14.245,20.389 14.532,20.271 14.744,20.059 L29.14,5.7 C29.582,5.26 29.583,4.543 29.142,4.101 Z')
                    path#Path(d='M28.87,13.87 C28.245,13.87 27.739,14.375 27.739,15 C27.739,22.024 22.024,27.739 15,27.739 C7.976,27.739 2.261,22.024 2.261,15 C2.261,7.976 7.976,2.261 15,2.261 C15.624,2.261 16.13,1.755 16.13,1.131 C16.13,0.506 15.625,0 15,0 C6.729,0 0,6.729 0,15 C0,23.27 6.729,30 15,30 C23.27,30 30,23.27 30,15 C30,14.376 29.494,13.87 28.87,13.87 Z')
            h5.T_Color_6.my-3 投注成功
            p(v-if='DeviceIsPc')
              router-link(to='/betlog')
                .funcBtn.my-3 查看投注記錄
              router-link(to='/game')
                .funcBtn.my-3 回賽事列表
        .col-12.col-lg-6.text-center.text-lg-left.my-3
          p.T_Color_1.my-2 {{BetSuccessData.matchName}}
          h5.T_Color_2.my-2 {{BetSuccessData.homeTeamName}}  VS  {{BetSuccessData.visitingTeamName}}
          p.my-2 比賽進行中 / 剩餘時間：{{countDown}}
          .betItem.my-2 讓球 {{BetSuccessData.selectedBetItemName}} | {{BetSuccessData.selectBetOdds}}
          .betInfo.my-2
            span.title 投注金額
            span.value ¥ {{BetSuccessData.bettingAmount}}
          .betInfo.my-2
            span.title 預估獲利
            span.value ¥ {{Math.ceil(BetSuccessData.bettingAmount * BetSuccessData.selectBetOdds) }}
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {},
  computed: {
    ...mapState('setting', ['DeviceIsPc']),
    ...mapState('game', ['BetSuccessData']),
  },
  data() {
    return {
      successIcon: '/static/img/icon-tick-2.svg',
      countDown: '',
      countDownTimer: null,
    };
  },
  methods: {
    init() {
      if (this.BetSuccessData === null) {
        this.$router.push('/');
      } else {
        this.gameCountDown(this.BetSuccessData.matchStartTime);
      }
    },
    gameCountDown(endTime) {
      const vm = this; 
      const today = this.$dayjs().format('YYYY-MM-DD HH:mm:ss');
      // 賽前一小時
      const currentTime = this.$dayjs().format('YYYY-MM-DD HH:mm:ss');
      // 利用 dayjs 算时间差距
      const timeGap = this.$dayjs(endTime).subtract(1, 'hour').diff(this.$dayjs(today));
      // const timeGap = this.$dayjs('2020-05-30 00:00:00').subtract(1, 'hour').diff(this.$dayjs(today));
      // 换算毫秒后格式化时间
      const hours = parseInt(Math.floor(timeGap / 1000 / 60 / 60), 10);
      const minutes = parseInt((timeGap % (1000 * 60 * 60)) / (1000 * 60), 10);
      const seconds = (timeGap % (1000 * 60)) / 1000;
      
      this.countDown = `${(hours < 10) ? `0${hours}` : hours}:${(minutes < 10) ? `0${minutes}` : minutes}:${(seconds < 10) ? `0${seconds}` : seconds}`;
      if (timeGap <= 0) {
        clearTimeout(vm.bonustOnTimeTimer);
        this.countDown = '00:00:00';
      } else {
        this.countDownTimer = setTimeout(() => {
          vm.gameCountDown(endTime);
        }, 1000);
      }
    },
  },
  beforeDestroy() {
    this.$store.commit('game/setBetSuccessData', null);
    clearTimeout(this.countDownTimer);
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang='scss' scoped>
.page{
  background: $gray_f5;
}
.CardStyle{
  position: relative;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 10px 0 rgba(150, 150, 150, 0.5);
}
.funcBtn{
  text-align: center;
  position: relative;
  width: 100%;
  height: 48px;
  color: white;
  padding: 0 20px;
  line-height: 48px;
  border-radius: 4px;
  font-size: 16px;
  background: $Color_2;
}
.betItem{
  position: relative;
  width: 100%;
  height: 48px;
  color: white;
  padding: 0 20px;
  line-height: 48px;
  border-radius: 4px;
  font-size: 16px;
  background: $Color_1;
}
.betInfo{
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 48px;
  padding: 0 20px;
  line-height: 48px;
  border-radius: 4px;
  border: solid 1px #b3b3b3;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
}
</style>
