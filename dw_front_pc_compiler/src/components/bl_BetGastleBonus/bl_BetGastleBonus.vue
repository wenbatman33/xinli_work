<template  lang="pug">
.dreamFund
  .dreamFundBanner(@click='gotoCastle')
    .dreamFundBG
      img(:src='dreamwork_fund')
    .row.dreamFundInfo
      .col-6
        i.fas.fa-chess-knight.mr-2
        span 我的梦基金
      .col-6.text-right
        span.dreamFundPoint.mr-2 {{(memberWallet.point!==undefined) ? memberWallet.point: "?" | commaFormatDefault}}
        span 点
  .dreamFundBonus.my-3(@click='gotoMissionType3')
    .icon
      img(:src='bonusImg')
    span.dreamDes {{bonusCountDown}}
    .dreamTimes 今日剩余 {{bonusTimes}} 次
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      bonusTimeArray: [['02:30:00', '02:40:00'], ['15:30:00', '15:40:00'], ['19:30:00', '19:40:00'], ['23:30:00', '23:40:00']],
      bonusCountDown: '',
      nextBonusCountDown: '',
      bonustOnTimeTimer: null,
      countDownTimer: null,
      dreamwork_fund: `${window.CDN_ASSETS}/static/img/dw/dreamwork_fund.png`,
      bonusImg: `${window.CDN_ASSETS}/static/img/dw/bonus.png`,
    };
  },
  computed: {
    ...mapState('member', ['memberLogined', 'PersonalDetail', 'bonusTimes']),
    ...mapState('wallet', ['memberWallet']),
  },
  methods: {
    getCountTimeDown() {
      //  计算目前时间 判断是在抢红包时段内还是 等待抢红包
      const currentTime = this.$dayjs().format('YYYY-MM-DD HH:mm:ss');
      const vm = this; 
      this.bonusTimeArray.every((element) => {
        const range_start = `${this.$dayjs().format('YYYY-MM-DD')} ${element[0]}`;
        const range_end = `${this.$dayjs().format('YYYY-MM-DD')} ${element[1]}`;
        if (this.$dayjs(currentTime).isAfter(range_start) && this.$dayjs(currentTime).isBefore(range_end)) {
          // 目前在抢红包时段内
          vm.bonustOnTime(range_end);
          return false;
        } else if (this.$dayjs(currentTime).isBefore(range_start) && this.$dayjs(currentTime).isBefore(range_end)) {
          // 目前在等待抢红包
          vm.countDownTime(range_start);
          return false;
        } else if (this.$dayjs(currentTime).isAfter(`${this.$dayjs().format('YYYY-MM-DD')} 23:40:00`)) { 
          // 目前在超過 23:40:00 必須算到隔天
          const newDayTime = `${this.$dayjs().add(1, 'days').format('YYYY-MM-DD')} ${this.bonusTimeArray[0][0]}`;
          vm.countDownTime(newDayTime);
        } 
        return true;
      });
    },
    bonustOnTime(time) {
      // 目前在抢红包时段内
      const vm = this; 
      const currentTime = this.$dayjs().format('YYYY-MM-DD HH:mm:ss');
      // 利用 dayjs 算时间差距
      const timeGap = this.$dayjs(time).diff(this.$dayjs(currentTime));
      // 换算毫秒后格式化时间
      let minutes = parseInt((timeGap % (1000 * 60 * 60)) / (1000 * 60), 10);
      minutes = (minutes < 10) ? `0${minutes}` : minutes;
      let seconds = (timeGap % (1000 * 60)) / 1000;
      seconds = (seconds < 10) ? `0${seconds}` : seconds;
      this.bonusCountDown = `抢红包剩余时间: ${minutes}:${seconds}`;
      if (timeGap <= 0) {
        clearTimeout(vm.bonustOnTimeTimer);
        setTimeout(() => {
          vm.getCountTimeDown();
        }, 500);
      } else {
        this.bonustOnTimeTimer = setTimeout(() => {
          vm.bonustOnTime(time);
        }, 1000);
      }
    },
    countDownTime(time) {
      // 目前在等待抢红包的倒计时 每分钟倒数
      const vm = this; 
      const currentTime = this.$dayjs().format('YYYY-MM-DD HH:mm:ss');
      // 利用 dayjs 算时间差距
      const timeGap = this.$dayjs(time).diff(this.$dayjs(currentTime));
      // 换算毫秒后格式化时间
      let hours = parseInt((timeGap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60), 10);
      hours = (hours < 10) ? `0${hours}` : hours;
      let minutes = parseInt((timeGap % (1000 * 60 * 60)) / (1000 * 60), 10);
      minutes = (minutes < 10) ? `0${minutes}` : minutes;
      let seconds = (timeGap % (1000 * 60)) / 1000;
      seconds = (seconds < 10) ? `0${seconds}` : seconds;

      this.bonusCountDown = `下次抢红包剩余时间: ${hours}:${minutes}:${seconds}`;
      if (timeGap <= 0) {
        clearTimeout(vm.countDownTimer);
        setTimeout(() => {
          vm.getCountTimeDown();
        }, 500);
      } else {
        this.countDownTimer = setTimeout(() => {
          vm.countDownTime(time);
        }, 1000);
      }
    },
    gotoCastle() {
      if (this.memberLogined) {
        window.location.replace(window.CASTLEDOMAIN);
      } else {
        this.$store.dispatch('dialog/openCommandDialog', { component: 'bl_Login' });
      }
    },
    gotoMissionType3() {
      if (this.memberLogined) {
        window.location.replace(`${window.CASTLEDOMAIN}/mission?missionType=3`);
      } else {
        this.$store.dispatch('dialog/openCommandDialog', { component: 'bl_Login' });
      }
    },
  },
  beforeDestroy() {
    const vm = this; 
    clearTimeout(vm.countDownTimer);
    clearTimeout(vm.bonustOnTimeTimer);
  },
  mounted() {
    this.getCountTimeDown();
  },
};
</script>
<style lang="scss" scoped>
.dreamFundBonus{
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 52px;
  line-height: 52px;
  border-radius: 8px;
  background: linear-gradient(to right, $DW_orange 0%, $DW_yellow);
  .icon{
    position: absolute;
    top: -8px;
  }
  .dreamDes{
    margin-left: 90px;
    color: white;
    font-size: $text-14;
  }
  .dreamCount{
    color: white;
    font-size: $text-20;
  }
  .dreamTimes{
    position: absolute;
    top: 10px;
    right: 10px;
    color: #ffffff;
    width: 124px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    color: white;
    font-size: $text-14;
    border-radius: 8px;
    box-shadow: inset 0 2px 4px 0 $balckAlpha_30;
    background: linear-gradient(to top, $blueDark, $DW_slatBlue);
  }
}
.dreamFundBanner{
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 287px;
  .dreamFundBG{
    position: absolute;
  }
  .dreamFundInfo{
    height: 28px;
    line-height: 24px;
    color: $whiteAlpha_60;
    padding: 0 30px;
    margin-top: 250px;
    .dreamFundPoint{
      color: white;
      font-size: $text-20;
    }
  }
}
</style>

