<template lang="pug">
.castleBonus(@click='gotoCastleBonus')
  .castleBonusIcon
    img(:src='picRedenvelopeImg')
  .castleBonusInfo
    p.my-1 领取限时红包
    small {{ bonusCountDown }}
  .castleBonusTimes
    p 今日剩余 {{ bonusTimes }} 次
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      bonusTimes: 0,
      bonusTimeArray: [['02:30:00', '02:40:00'], ['15:30:00', '15:40:00'], ['19:30:00', '19:40:00'], ['23:30:00', '23:40:00']],
      bonusCountDown: '',
      nextBonusCountDown: '',
      bonustOnTimeTimer: null,
      countDownTimer: null,
      picRedenvelopeImg: `${window.CDN_ASSETS}/static/img/picRedenvelope@3x.png`,
    };
  },
  computed: {
    ...mapState('index', [
      'DarkMode',
    ]),
    ...mapState('payment', [
      'IndexWallet',
    ]),
  },
  methods: {
    gotoCastleBonus() {
      if (window.localStorage.Finger && window.localStorage.JWT_TOKEN) {
        this.$matomo_index_bonus();
        window.location.href = `${window.CASTLEDOMAIN}/mission?missionType=3`;
      } else {
        this.$router.push('/login').catch((err) => {});
      }
    },
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
        } if (this.$dayjs(currentTime).isBefore(range_start) && this.$dayjs(currentTime).isBefore(range_end)) {
          // 目前在等待抢红包
          vm.countDownTime(range_start);
          return false;
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
      let minutes = parseInt((timeGap % (1000 * 60 * 60)) / (1000 * 60));
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

      this.bonusCountDown = `下次时间: ${hours}:${minutes}:${seconds}`;
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
  },
  mounted() {
    if (window.localStorage.Finger && window.localStorage.JWT_TOKEN) {
      // 取得夢之城的搶紅包次數
      const api = `${window.APIHOST}/api/Task/Bonus/Count`;
      axios.get(api)
        .then((res) => {
          this.bonusTimes = res.data.data[0].count;
        });
    }
    this.getCountTimeDown();
  },
  beforeDestroy() {
    clearTimeout(this.bonustOnTimeTimer);
    clearTimeout(this.countDownTimer);
  },
};
</script>

<style lang="scss" scoped>
// castleBonus
.castleBonus{
  position: relative;
  width: 100%;
  height: 50px;
  color: white;
  border-radius: 12px;
  border: solid 1px rgb(245, 238, 0);
  background-image: linear-gradient(to right, rgb(255, 117, 25), rgb(245, 238, 0));
  .castleBonusIcon{
    position: relative;
    img{
      position: absolute;
      top: -6px;
      left: 15px;
      width: 68px;
      height: 61px;
    }
  }
  .castleBonusInfo{
    position: absolute;
    width: 200px;
    margin-left: 100px;
    font-size: 12px;
    p{
      font-size: 14px;
    }
  } 
  .castleBonusTimes{
    position: absolute;
    text-align: center;
    top: 8px;
    right: 8px;
    line-height: 30px;
    width: 110px;
    height: 30px;
    font-size: 12px;
    color: white;
    border-radius: 8px;
    background: rgb(26, 34, 51)
  }
}
</style>
