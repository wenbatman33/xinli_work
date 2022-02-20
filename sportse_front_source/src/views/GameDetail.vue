<template lang='pug'>
.pageContent(v-if='CurrentGame')
  .px-3
    .container
      .row.no-gutters
        .col-12.text-left.text-lg-left.my-3
          router-link(to)
            h5(@click="$router.back(-1)")
              .i.fas.fa-angle-left.mr-2
              | 返回
  .row.no-gutters
    .col-12.text-center.my-3
      h5.T_Color_2.my-2 {{CurrentGame.matchName}}
      p.T_Color_2  比賽進行中 / 剩餘時間：{{countDown}} 
  .row.no-gutters.mt-4
    .col-4.text-center
      p.T_Color_2 (主)
      p 
        b {{CurrentGame.homeTeamName}}
    .col-4.text-center
      h3.mt-2.gradient-text VS
    .col-4.text-center
      p.T_Color_2 (客)
      p 
        b {{CurrentGame.visitingTeamName}} 
  .row.no-gutters.my-3
    .bettingModeTitle.text-center.my-3 讓球
    .col-6.px-3.text-center
      p.T_Color_2 (主)
      el-button.gameBtn.w-100.mx-0.my-1(pain, @click='betting(CurrentGame, CurrentGame.pointSpread.item, 1,  CurrentGame.pointSpread.homeOdds)')
        .oddsTitle.mr-1(v-if='CurrentGame.pointSpread.pointSpreadType===1') 
          span(v-if='CurrentGame.pointSpread.pointSpreadType===1')  {{CurrentGame.pointSpread.itemName }}
        p {{CurrentGame.pointSpread.homeOdds}}
    .col-6.px-3.text-center
      p.T_Color_2 (客)
      el-button.gameBtn.w-100.mx-0.my-1(pain, @click='betting(CurrentGame, CurrentGame.pointSpread.item, 2, CurrentGame.pointSpread.visitingOdds)')
        .oddsTitle.mr-1
          span(v-if='CurrentGame.pointSpread.pointSpreadType===2') {{CurrentGame.pointSpread.itemName }}
        p {{CurrentGame.pointSpread.visitingOdds}}
  .row.no-gutters.my-3
    .bettingModeTitle.text-center.my-3 大 / 小
    .col-6.px-3.text-center
      el-button.gameBtn.w-100.mx-0.my-1(pain, @click='betting(CurrentGame, CurrentGame.overUnder.item, 3, CurrentGame.pointSpread.homeOdds)')
        .oddsTitle.mr-1
          span 大 {{CurrentGame.overUnder.itemName }}
        p {{CurrentGame.pointSpread.homeOdds}}
    .col-6.px-3.text-center
      el-button.gameBtn.w-100.mx-0.my-1(pain, @click='betting(CurrentGame, CurrentGame.overUnder.item, 4, CurrentGame.pointSpread.homeOdds)')
        .oddsTitle.mr-1
          span 小 {{CurrentGame.overUnder.itemName }}
        p {{CurrentGame.pointSpread.homeOdds}}
  .row.no-gutters.my-3
    .bettingModeTitle.text-center.my-3 波膽
    .col-4.px-3.text-center
      p.T_Color_2 (主)
      el-button.gameBtn.w-100.mx-0.my-1(pain, v-for='(item, index) in CurrentGame.correctScore.home', @click='betting(CurrentGame, item.item, "home" ,item.odds)')
        .oddsTitle {{item.itemName}}
        p {{item.odds}}
    .col-4.px-3.text-center
      p.T_Color_2 和局
      el-button.gameBtn.w-100.mx-0.my-1(pain, v-for='(item, index) in CurrentGame.correctScore.draw', @click='betting(CurrentGame, item.item, "draw", item.odds)')
        .oddsTitle {{item.itemName}}
        p {{item.odds}}
    .col-4.px-3.text-center
      p.T_Color_2 (客)
      el-button.gameBtn.w-100.mx-0.my-1(pain, v-for='(item, index) in CurrentGame.correctScore.visiting', @click='betting(CurrentGame, item.item, "visiting", item.odds)')
        .oddsTitle {{item.itemName}}
        p {{item.odds}}
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {},
  computed: {
    ...mapState('setting', ['DeviceIsPc']),
    ...mapState('game', ['CurrentGame']),
  },
  data() {
    return {
      val: '全部',
      countDown: '',
      countDownTimer: null,
    };
  },
  methods: {
    betting(game, item, subitem, odds) {
      if (odds !== '' && odds !== 0) {
        this.$router.push(`/betting?gameid=${game.id}&item=${item}&subitem=${subitem}`);
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
    clearTimeout(this.countDownTimer);
  },
  mounted() {
    this.$store.dispatch('game/getMatchByID', this.$route.query.gameid)
      .then((res) => {
        this.gameCountDown(this.CurrentGame.matchStartTime);
      });
  },
};
</script>
<style lang='scss' scoped>
.gradient-text{
  background: -webkit-gradient(linear,top,right top,from(#2d68fb),to(#4dd0e1));
  background: linear-gradient(to right,#2d68fb,#4dd0e1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  text-shadow: none;
  font-weight: 700;
  font-style:italic;
}
.bettingModeTitle{
  color: white;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #0277bd;

}
.gameBtn{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60px;
}
</style>
