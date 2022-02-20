<template lang="pug">
.betGameRect.w-100.my-2(:class='{"betGameOver": (item.status.value==1),"betGameOnTime": (item.status.value==2)}')
  .row.no-gutters
    .col-12.col-sm-12.col-md-12.col-lg-3.col-xl-3.p-2
      .ribbon
        i.ribbonBackside
        p {{item.status.display}}
        p(v-if='item.status.value==4')  {{bonusCountDown}}
    .col-12.col-sm-12.col-md-12.col-lg-3.col-xl-3.p-2
      .betGameInfo.mt-1.mt-lg-3.text-center.text-sm-center.text-md-center.text-lg-left.text-xl-left
        p.betGameDate {{getDate(item.date)}}
        p.betGameTime {{getTime(item.date)}} (北京时间)
        p.betGameName {{item.name}}
    .col-12.col-sm-12.col-md-12.col-lg-3.col-xl-3.p-2
      .betGameTeams.mt-1.mt-lg-3.text-center.text-sm-center.text-md-center.text-lg-left.text-xl-left
        .row.no-gutters
          .homeTeam.col-6.col-sm-6.col-md-6.col-lg-12.col-xl-12.mb-2
            //-  勝負
            .row
              .col-12.col-sm-12.col-md-12.col-lg-4.col-xl-4.p-0
                .iconWin.mr-2
                  img(v-show='item.win.value===1', :src='iconWin')
                  img(v-show='item.win.value===2', :src='iconTie')
                //-  隊名
                .homeIcon 主
              .col-12.col-sm-12.col-md-12.col-lg-7.col-xl-7.p-0.teamName {{item.home}}
          .guestTeam.col-6.col-sm-6.col-md-6.col-lg-12.col-xl-12.mb-2
            //-  勝負
            .row
              .col-12.col-sm-12.col-md-12.col-lg-4.col-xl-4.p-0
                .iconWin.mr-2
                  img(v-show='item.win.value===3', :src='iconWin')
                  img(v-show='item.win.value===2', :src='iconTie')
                //-  隊名
                .guestIcon 客
              .col-12.col-sm-12.col-md-12.col-lg-7.col-xl-7.p-0.teamName {{item.guest}}
    .col-12.col-sm-12.col-md-12.col-lg-3.col-xl-3.p-2  
      .betGameAction.mt-1.mt-lg-3.w-100.text-center.mb-3
        .choseTeamBtn.w-75(v-if='item.betButton.value===3 && item.status.value===4', @click='gotBetgame(item)') {{item.betButton.display}}
        .choseTeamBtn.w-75(v-else-if='item.betButton.value===1', @click='gotBetlog') {{item.betButton.display}}
        .choseTeamBtnNoCursor.w-75(v-else, @click='gotBetgame(item)') {{item.betButton.display}}
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: ['item'],
  data() {
    return {
      bonusCountDown:'',
      bonustOnTimeTimer:null,
      iconWin: `${window.CDN_ASSETS}/static/img/icon-win.png`,
      iconTie: `${window.CDN_ASSETS}/static/img/icon-tie.png`,
    };
  },
  methods: {
    getDate(val){
      return this.$dayjs(val).format('YYYY-MM-DD')
    },
    getTime(val){
      return this.$dayjs(val).format('HH:mm')
    },
    checkIsToday(val){
      const today = this.$dayjs().format('YYYY-MM-DD')
      const selectDay = this.$dayjs(val).format('YYYY-MM-DD')
      
      return this.$dayjs(selectDay).isBefore(today);
    },
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
        this.$store.dispatch('bet/getBetGameList');
      } else{
        this.bonustOnTimeTimer = setTimeout(() => {
          vm.bonustOnTime(time);
        }, 1000);
      }
    },
    gotBetgame(game){
      if(game.status.value===4){
        this.$router.push({path:'/betgame',query: {id: game.id}});
      }
    },
    gotBetlog(){
      this.$router.push({path:'/betlog'});
    }
  },
  beforeDestroy () {
    clearTimeout(this.bonustOnTimeTimer);
  },
  mounted () {
    //  等待开赛状态时
    if(this.item.status.value==4){
      this.bonustOnTime(this.item.date);
    }
  }
};
</script>
<style lang='scss' scoped>
.betGameRect {
    position: relative;
    // height: 124px;
    min-height: 100px;
    border-radius: 8px;
    color: white;
    background: linear-gradient(to left, $DW_ColorLight, $DW_Color 100%);
  }
  
  .betGameInfo{
    .betGameDate{
      margin: 5px 0;
      font-size: 14px;
      line-height: 1;
      color: white;
    }
    .betGameTime{
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      line-height: 1;
      color: white;
    }
    .betGameName{
      margin: 10px 0;
      font-size: 14px;
      line-height: 1;
      color: white;
    }
  }
  .betGameTeams{
    .homeIcon{
      width: 22px;
      height: 22px;
      color: white;
      font-size: 14px;
      border-radius: 4px;
      text-align: center;
      display: inline-block;
      background-color: $DW_red;
      margin-right: 10px;
    }
    .guestIcon{
      display: inline-block;
      width: 22px;
      height: 22px;
      color: white;
      font-size: 14px;
      border-radius: 4px;
      text-align: center;
      display: inline-block;
      background-color: $DW_ColorLight;
      margin-right: 10px;
    }
  }
  .betGameAction{
    line-height: 60px;
  }
  .ribbon{
    position: relative;
    background-image: linear-gradient(to bottom, #e4364b, $DW_red);
    width: 140px;
    height: 60px;
    top: -18px;
    left: 0px;
    text-align: center;
    margin: auto;
    padding-top: 16px;
    font-size: 12px;
    margin-bottom: 32px;
  }
  .ribbon:before{
    content: "";
    position: absolute;
    bottom: -32px;
    left: 0;
    width: 0;
    height: 0;
    border-top: 32px solid $DW_red;
    border-right: 70px solid transparent;
  }
  .ribbon:after{
    content: "";
    position: absolute;
    bottom: -32px;
    right: 0;
    width: 0;
    height: 0;
    border-top: 32px solid $DW_red;
    border-left: 70px solid transparent;
  }
  i.ribbonBackside {
    content: "";
    position: absolute;
    left: auto;
    right: -10px;
    top: 0px;
    border: 5px solid transparent;
    border-color: transparent transparent #b30039 #b30039  ;
  }
  .betGameOver{
    background: linear-gradient(to left, #484c54, #283240 100%);
    .ribbon{
      background-image: linear-gradient(to bottom,#131e2b, #384662);
    }
    .ribbon:before{
      border-top: 32px solid #384662;
    }
    .ribbon:after{
      border-top: 32px solid #384662;
    }
    i.ribbonBackside {
      border-color: transparent transparent #222 #222;
    }
  }
  .betGameOnTime{
    .ribbon{
      background-image: linear-gradient(to bottom,#6440a0, #7e50bd);
    }
    .ribbon:before{
      border-top: 32px solid #7e50bd;
    }
    .ribbon:after{
      border-top: 32px solid #7e50bd;
    }
    i.ribbonBackside {
      border-color: transparent transparent #593687 #593687  ;
    }
  }
.choseTeamBtn {
  cursor: pointer;
  display: inline-block;
  width: 136px;
  height: 38px;
  border-radius: 19px;
  text-align: center;
  line-height: 38px;
  background-color: #2c3245;
}
.choseTeamBtnNoCursor {
  display: inline-block;
  width: 136px;
  height: 38px;
  border-radius: 19px;
  text-align: center;
  line-height: 38px;
  background-color: #2c3245;
}
.iconWin{
  position: relative;
  width: 28px;
  height: 28px;
  display: inline-block;
  img{
    position: absolute;
    top: 8px;
    left: 0;
    width: 28px;
    height: 28px;
  }
}
.teamName{
  line-height: 48px;
}
</style>
