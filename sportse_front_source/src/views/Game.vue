<template lang='pug'>
.pageContent
  .p-3
    .row.no-gutters
      .col-12.col-sm-6.text-center.text-sm-left.my-3
        h5
          span.i.fas.fa-futbol.mr-2
          span.mr-2 全部賽事
          span.mt-2
            .d-inline-block.progressOuter
              .progressInner(:style='{width:(100-((countTime/60)*100))+"%"}') 
              .progressTime {{countTime}} 秒後更新
      .col-12.col-sm-6.text-center.text-sm-right.my-3
        span.Gray_c7.mx-2.cursorPointer(:class='{"active": gameType===0}',@click='selectGameType(0)') 按時間
        span.mx-2 |  
        span.Gray_c7.mx-2.cursorPointer(:class='{"active": gameType===1}', @click='selectGameType(1)') 按聯賽
    //- //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    .row(v-if='gameType===0')
      .col-sm-6.col-lg-4.col-xl-3.my-2(v-if='GamesByTime.length>0', v-for='(item, index) in GamesByTime')
        .gameItem.p-2
          .gameInfo.py-2.d-flex.justify-content-between 
            //- p {{item}}
            .flex-grow-1
              span.gameName {{item.matchName}}
              span.divider.mx-1 |
              span.T_Color_3 {{toDayjs(item.matchStartTime)}}
            .moreInfo 
              span(@click='gotoGameDetail(item)') 更多
              i.fas.fa-angle-right.ml-2
          .row.no-gutters
            .col-4.pt-3
              .homeTeam.mb-2
                RollingText(:teamName='item.homeTeamName')
              .guestTeam.mb-2
                RollingText(:teamName='item.visitingTeamName')
            .col-4
              p.text-center.text-white.fs12 讓球
              .gameBetBTN.mb-2(@click='betting(item, item.pointSpread.item, 1,  item.pointSpread.homeOdds)')
                .oddsTitle.mr-1(v-if='item.pointSpread.pointSpreadType===1') 
                  span(v-if='item.pointSpread.pointSpreadType===1')  {{item.pointSpread.itemName }}
                .T_Color_1 {{item.pointSpread.homeOdds}}
              .gameBetBTN.mb-2(@click='betting(item, item.pointSpread.item, 2, item.pointSpread.visitingOdds)')
                .oddsTitle.mr-1
                  span(v-if='item.pointSpread.pointSpreadType===2') {{item.pointSpread.itemName }}
                .T_Color_1 {{item.pointSpread.visitingOdds}}
            .col-4.overUnder
              p.text-center.text-white.fs12 大小
              .gameBetBTN.mb-2(@click='betting(item, item.overUnder.item, 3, item.pointSpread.homeOdds)')
                .oddsTitle.mr-1
                  span 大 {{item.overUnder.itemName }}
                //- .T_Color_1 {{item.overUnder.itemName }}
                .T_Color_1 {{item.overUnder.overOdds}}
              .gameBetBTN.mb-2(@click='betting(item, item.overUnder.item, 4, item.pointSpread.homeOdds)')
                .oddsTitle.mr-1
                  span 小 {{item.overUnder.itemName }}
                //- .T_Color_1 {{item.overUnder.itemName}}
                .T_Color_1 {{item.overUnder.underOdds}}
    //- //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    .w-100(v-if='gameType===1 && GamesByName!==null')
      .row(v-for='(mainItem, mainIndex) in Object.values(GamesByName)')
        .col-12 {{mainItem[0].match_name}}
        .col-sm-6.col-lg-4.col-xl-3.my-2(v-if='mainItem.length>=0', v-for='(item, index) in mainItem')
          .gameItem.p-2
            .gameInfo.py-2.d-flex.justify-content-between 
              //- p {{item}}
              .flex-grow-1
                span.gameName {{item.match_name}}
                span.divider.mx-1 |
                span.T_Color_3 {{toDayjs(item.matchStartTime)}}
              .moreInfo 
                span(@click='gotoGameDetail(item)') 更多
                i.fas.fa-angle-right.ml-2
            .row.no-gutters
              .col-4.pt-3
                .homeTeam.mb-2
                  RollingText(:teamName='item.home_team_name')
                .guestTeam.mb-2
                  RollingText(:teamName='item.visiting_team_name')
              .col-4
                p.text-center.text-white.fs12 讓球
                .gameBetBTN.mb-2(@click='item.pointSpread.homeOdds? betting(item, item.pointSpread.item,1) : null')
                  .oddsTitle.mr-1(v-if='item.pointSpread.pointSpreadType===1') 
                    span(v-if='item.pointSpread.pointSpreadType===1')  {{item.pointSpread.itemName }}
                  //- .T_Color_1 {{item.pointSpread.itemName }}
                  .T_Color_1 {{item.pointSpread.homeOdds}}
                .gameBetBTN.mb-2(@click='item.pointSpread.visitingOdds ? betting(item, item.pointSpread.item, 2): null')
                  .oddsTitle.mr-1
                    span(v-if='item.pointSpread.pointSpreadType===2') {{item.pointSpread.itemName }}
                  //- .T_Color_1 {{item.pointSpread.itemName}}
                  .T_Color_1 {{item.pointSpread.visitingOdds}}
              .col-4.overUnder
                p.text-center.text-white.fs12 大小
                .gameBetBTN.mb-2(@click='item.overUnder.overOdds? betting(item, item.overUnder.item,3): null')
                  .oddsTitle.mr-1
                    span 大 {{item.overUnder.itemName }}
                  //- .T_Color_1 {{item.overUnder.itemName }}
                  .T_Color_1 {{item.overUnder.overOdds}}
                .gameBetBTN.mb-2(@click='item.overUnder.underOdds? betting(item,item.overUnder.item,4): null')
                  .oddsTitle.mr-1
                    span 小 {{item.overUnder.itemName }}
                  //- .T_Color_1 {{item.overUnder.itemName}}
                  .T_Color_1 {{item.overUnder.underOdds}}
</template>

<script>
import RollingText from '@/components/RollingText/RollingText.vue';
import { mapState } from 'vuex';

export default {
  components: {
    RollingText,
  },
  computed: {
    ...mapState('setting', ['DeviceIsPc']),
    ...mapState('game', ['GamesByName', 'GamesByTime']),
  },
  data() {
    return {
      gameType: 0,
      loopTimer: null,
      countTime: 0,
      flagTime: 60,
    };
  },
  methods: {
    betting(game, item, subitem, odds) {
      if (odds !== '' && odds !== 0) {
        this.$router.push(`/betting?gameid=${game.id}&item=${item}&subitem=${subitem}`);
      }
    },
    gotoGameDetail(game) {
      this.$router.push(`/gamedetail?gameid=${game.id}`);
    },
    getMatchForTime() {
      this.$store.dispatch('game/getMatchForTime')
        .then((res) => {
        });
    },
    getMatchForName() {
      this.$store.dispatch('game/getMatchForName')
        .then((res) => {
        });
    },
    selectSeries(item) {
      this.currentSeries = item;
    },
    toDayjs(day) {
      return this.$dayjs(day).format('MM/DD HH:mm');
    },
    selectGameType(num) {
      this.gameType = num;
      this.countTime = this.flagTime;
      this.getGameData();
    },
    getGameData() {
      const vm = this;
      clearInterval(this.loopTimer);
      this.loopTimer = setInterval(() => {
        vm.countTime -= 1;
        if (vm.countTime <= 0) {
          vm.countTime = vm.flagTime;
          clearInterval(this.loopTimer);
          if (vm.gameType === 0) {
            this.getMatchForTime();
            this.getMatchForName();
          } else {
            this.getMatchForTime();
            this.getMatchForName();
          }
          vm.getGameData();
        }
      }, 1000);
    },
  },
  beforeDestroy() {
    clearInterval(this.loopTimer);
  },
  mounted() {
    this.getGameData();
  },
};
</script>
<style lang='scss' scoped>
.gameList{
  .title{
    border-left: 8px solid #000 ;
    .moreLink{
      cursor: pointer;
      color: $Color_2;
    }
  }
}
.gameItem{
  border-radius: 8px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.15);
  background-image: linear-gradient(53deg, $Color_2 31%, $Color_3 114%);
  .gameInfo{
    font-size: 14px;
    .gameName, .divider{
      color:#fff;
    }
    .moreInfo{
      cursor: pointer;
      color:#fff;
    }
  }
}
.active{
  color: $Color_2 !important;
}
.teamName{
  color: #fff;
  overflow : hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.teamScore{
  color: #fff;
}
.gameBetBTN{
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  margin: 0px 4px;
  padding: 0 4px;
  color: #fff;
  text-align: center;
  border-radius: 12px;
  font-size: 12px;
  border: solid 1px #ffffff;
  background-color: rgba(2, 119, 189, 0.15);
  &:hover{
    background-color: rgba(2, 119, 189, 0.5);
  }
  .odds{
    color: $Color_1;
  }
}
.rounddDropdown{
  border-radius: 24px;
  overflow: hidden;
}
.seriesGameName{
  border-left: 8px solid $Color_2 ;
  padding-left: 10px;
  .moreLink{
    cursor: pointer;
    color: $Color_2;
  }
}

.homeTeam, .guestTeam{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 48px;
}
.progressOuter{
  width: 120px;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  height: 20px;
  line-height: 20px;
  background-color: rgba(2,119,189, .3);
  text-align: center;
  .progressInner{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: rgba(2,119,189, 1);
  }
  .progressTime{
    position: relative;
    text-align: center;
    font-size: 12px;
    z-index: 2;
    color: white;
    text-shadow: 1px 1px 1px  rgba(0, 0, 0, 0.7);
  }
}
</style>
