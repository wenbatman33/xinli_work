<template lang="pug">
  .betGmaeGameWrap.d-flex.justify-content-center.mb-3(v-if='APILoaded')
    .betGmaeGame.d-flex.flex-row.align-content-center
      .betGmaeGameImg_1
        img(:src='sport_img')
      .betGmaeGameImg_2
        img(:src='sport_img_r')
      .betGmaeGameList.d-flex.flex-row.mx-3.justify-content-around(v-if='nextBetGame.length<=0')
        p.text-white 赛事已结束,下次请早
      .betGmaeGameList.d-flex.flex-row.mx-3.justify-content-around(v-else)
        .betGmaeGameInfo.mt-2
          p.text-center 梦基金游戏竞猜
          h6.text-center  剩余时间 {{betGameCountDown}}
        div.gameInfo
          span.text-center {{nextBetGame[0].name}} ：  
          span.mx-3 {{nextBetGame[0].home}}  
          span.mx-3 vs. 
          span.mx-3 {{nextBetGame[0].guest}}  
        div
          .betGmaeGameBtn.mt-3(@click='gotoBetGame')
            span.mx-2 我要竞猜
            i.fas.fa-hand-point-up
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      APILoaded: false,
      nextBetGame: [],
      betGameCountDown: null,
      betGameCountTimer: null,
      sport_img: `${window.CDN_ASSETS}/static/img/dw/sport_img.png`,
      sport_img_r: `${window.CDN_ASSETS}/static/img/dw/sport_img_r.png`,
    };
  },
  computed: {
    ...mapState('member', [
      'memberLogined',
    ]),
    ...mapState('index', ['CASTLEDOMAIN', 'indexJsonData']),
  },
  methods: {
    gotoBetGame() {
      if (this.memberLogined) {
        window.location.replace(`${window.CASTLEDOMAIN}/bet`);
      } else {
        this.$store.dispatch('dialog/openCommandDialog', { component: 'bl_Login' });
      }
    },
    getNextGame() {
      const res = this.indexJsonData['/api/TaskGame/Coming'];
      this.nextBetGame = res.data;
      this.APILoaded = true;
      if (this.nextBetGame.length > 0) this.CountGameTime(this.nextBetGame[0].date);
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
<style lang='scss' scoped>
.betGmaeGameWrap{
  position: relative;
  height: 80px;
  width: 100%;
  .betGmaeGame{
    position: relative;
    margin: 30px 0px;
    width: 100%;
    height: 60px;
    border-radius: 4px;
    border: solid 1px $DW_ColorLight;
    background-color: $balckAlpha_20;
    .betGmaeGameImg_1{
      position: absolute;
      margin-top: -24px;
      z-index: 0;
    }
    .betGmaeGameImg_2{
      position: absolute;
      top: 0px;
      right: 0;
      z-index: 0;
    }
    
    .betGmaeGameList{
      width: 100%;
      .betGmaeGameInfo{
        position: relative;
        z-index: 1;
        margin-left: 100px;
        line-height: 20px;
        width: 170px;
        color: white;
        font-size: $text-12;
      }
      .betGmaeGameBtn{
        cursor: pointer;
        position: relative;
        width: 118px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 16px;
        box-shadow: 0 2px 4px 0 $balckAlpha_20;
        border: solid 1px $DW_ColorLight;
        background-image: linear-gradient(to right, $DW_ColorLight, $DW_Color);
        color: white;
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
    background-image: linear-gradient(to bottom, $gray_333, $gray_111)
  }
}
</style>
