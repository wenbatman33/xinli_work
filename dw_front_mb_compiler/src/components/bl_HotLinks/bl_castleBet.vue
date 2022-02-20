<template lang="pug">
.castleBet.d-flex.flex-row.align-content-center.my-2(v-if='APILoaded', @click='gotoCastleBet')
  .castleBetImg_1
    img(:src='sportImg')
  .castleBetImg_2
    img(:src='picSemicircle')
  .castleBetList
    .castleBetInfo
      p.my-1 梦基金游戏竞猜
      small(v-if='nextBetGame.length<=0') 赛事已结束,下次请早
      small(v-else) 剩余时间 {{betGameCountDown}}
    .castleBetBtn.mt-2
      span.mx-2 我要竞猜
      i.fas.fa-hand-point-up
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      APILoaded: false,
      nextBetGame: [],
      betGameCountDown: null,
      betGameCountTimer: null,
      sportImg: `${window.CDN_ASSETS}/static/img/sport_img@3x.png`,
      picSemicircle: `${window.CDN_ASSETS}/static/img/picSemicircle3@3x.png`,
    };
  },
  computed: {
    ...mapState('index', [
      'DarkMode',
      'indexJsonData',
    ]),
    ...mapState('payment', [
      'IndexWallet',
    ]),
  },
  methods: {
    gotoCastleBet() {
      if (window.localStorage.Finger && window.localStorage.JWT_TOKEN) {
        this.$matomo_index_castleBet();
        window.location.href = `${window.CASTLEDOMAIN}/bet`;
      } else {
        this.$router.push('/login').catch((err) => {});
      }
    },
    getNextGame() {
      const res = this.indexJsonData['/api/TaskGame/Coming'];
      this.nextBetGame = res.data;
      this.APILoaded = true;
      if (this.nextBetGame.length > 0) { 
        this.CountGameTime(this.nextBetGame[0].date);
      }
    },
    CountGameTime(gameTime) {
      const vm = this; 
      const currentTime = this.$dayjs().format('YYYY-MM-DD HH:mm:ss');
      // 利用 dayjs 算时间差距 賽前一小時開放投注 （subtract(1,'hour') 和gameTime減去一小時）
      const timeGap = this.$dayjs(gameTime).subtract(1, 'hour').diff(this.$dayjs(currentTime));
      // 换算毫秒后格式化时间
      const hours = parseInt(Math.floor(timeGap / 1000 / 60 / 60), 10);
      const minutes = parseInt((timeGap % (1000 * 60 * 60)) / (1000 * 60), 10);
      const seconds = (timeGap % (1000 * 60)) / 1000;
      // 
      vm.betGameCountDown = `${(hours < 10) ? `0${hours}` : hours}:${(minutes < 10) ? `0${minutes}` : minutes}:${(seconds < 10) ? `0${seconds}` : seconds}`;
      if (timeGap <= 0) {
        // 倒數時間到了 顯示'00:00:00' 並且去更新下一場賽事
        vm.betGameCountDown = '00:00:00';
        clearTimeout(vm.betGameCountTimer);
        setTimeout(() => {
          vm.getNextGame();
        }, 10000);
      } else {
        this.betGameCountTimer = setTimeout(() => {
          vm.CountGameTime(gameTime);
        }, 1000);
      }
    },
  },
  beforeDestroy() {
    clearTimeout(this.betGameCountTimer);
  },
  mounted() {
    this.getNextGame();
  },
};
</script>

<style lang="scss" scoped>
// castleBet
.castleBet{
  position: relative;
  width: 100%;
  height: 50px;
  border-radius: 12px;
  border: solid 2px $sky_light;
  background-color:rgba(0,0,0,.3);
  .castleBetImg_1{
    position: absolute;
    margin-top: -18px;
    height: 48px;
    z-index: 0;
    img{
      width: 163px;
    }
  }
  .castleBetImg_2{
    position: absolute;
    top: 0px;
    height: 48px;
    right: 0;
    z-index: 0;
    img{
      width: 128px;
      height: 47px;
    }
  }
  
  .castleBetList{
    position: relative;
    width: 100%;
    .castleBetInfo{
      position: absolute;
      z-index: 1;
      margin-left: 100px;
      line-height: 20px;
      width: 170px;
      color: white;
      font-size: 12px;
      p{
        font-size: 14px;
      }
    }
    .castleBetBtn{
      cursor: pointer;
      position: absolute;
      right: 8px;
      width: 118px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 16px;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.3);
      border: solid 1px $sky_light;
      background-image: linear-gradient(to right, $sky_light, $theme);
      color: white;
      font-size: 13px;
    }
    position: relative;
    line-height: 60px;
    z-index: 1;
    color: white;
    font-size: $text-14;
  }
}

.GameListItem{
  width: 25%;
  color: white;
  font-size: 13px;
  border: 1px solid black;
  background-image: linear-gradient(to bottom, #333, #111)
}
</style>
