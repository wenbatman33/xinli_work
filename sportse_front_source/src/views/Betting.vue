<template lang='pug'>
.pageContent.page
  .px-3(v-if='CurrentGame')
    .container
      .row.no-gutters
        .col-12.text-left.text-lg-left.my-3
          h5(@click='$router.back(-1)')
            .i.fas.fa-angle-left.mr-2
            | 返回
    .container(:class='{"CardStyle": DeviceIsPc}')
      .row.p-3
        .col-12.col-lg-7.text-center.text-lg-left
          .px-3
            h5.my-3(v-if='subitem==="1" ||subitem==="2"') 讓球
            h5.my-3(v-else-if='subitem==="3" ||subitem==="3"') 大小
            h5.my-3(v-else) 波膽
            p.T_Color_1.my-2 {{CurrentGame.matchName}}
            h5.T_Color_2.my-2 {{CurrentGame.homeTeamName}}  VS  {{CurrentGame.visitingTeamName}} 
            p.my-2 比賽進行中 / 剩餘時間： {{countDown}}
            //- 選擇的賽事狀態 //////////////////////////////////////////////////////////////////////////////////////////
            //- 讓球
            .betItem.mt-5.mb-3.text-center(v-if='subitem==="1"')
              span.title {{selectedBetItemName}} 
              span.value 讓球 @{{selectBetOdds}}
            .betItem.mt-5.mb-3.text-center(v-if='subitem==="2"')
              span.title {{selectedBetItemName}} 
              span.value 讓球 @{{selectBetOdds}}
            //- 大小球
            .betItem.mt-5.mb-3.text-center(v-if='subitem==="3"')  大 {{selectedBetItemName }} @{{selectBetOdds}}
            .betItem.mt-5.mb-3.text-center(v-if='subitem==="4"')  小 {{selectedBetItemName }} @{{selectBetOdds}}
            //- 波膽 
            .betItem.mt-5.mb-3.text-center(v-if='subitem==="home"')  {{selectedBetItemName}} @{selectBetOdds}}
            .betItem.mt-5.mb-3.text-center(v-if='subitem==="draw"')  {{selectedBetItemName}} @{{selectBetOdds}}
            .betItem.mt-5.mb-3.text-center(v-if='subitem==="visiting"')  {{selectedBetItemName}} @{{selectBetOdds}}
            //- //////////////////////////////////////////////////////////////////////////////////////////////////////
            p.text-center.text-lg-left.T_Color_2 預估獲利：¥ {{Math.ceil(bettingAmount * selectBetOdds) }}
        .col-12.col-lg-5.text-center.text-lg-left.my-3
          h3.bettingAmount.text-right {{ bettingAmount | commaFormatDefault }}
          .F_BETWEEN
            small 請使用數字鍵盤
            small 錢包餘額: {{ maxValue | commaFormat}}
          .row
            .col-12
              .row
                .col-4
                  .computerBtn(@click='countStr(7)') 7
                .col-4
                  .computerBtn(@click='countStr(8)') 8
                .col-4
                  .computerBtn(@click='countStr(9)') 9
                .col-4
                  .computerBtn(@click='countStr(4)') 4
                .col-4
                  .computerBtn(@click='countStr(5)') 5
                .col-4
                  .computerBtn(@click='countStr(6)') 6
                .col-4
                  .computerBtn(@click='countStr(1)') 1
                .col-4
                  .computerBtn(@click='countStr(2)') 2
                .col-4
                  .computerBtn(@click='countStr(3)') 3
                .col-4
                  .computerBtn(@click='countStr(0)') 0
                .col-4
                  .computerBtn(@click='resetNum') C
                .col-4
                  .computerBtn(@click='rounding')
                    i.fas.fa-backspace
          .row.my-3
            .col-12
              el-button.w-100(type="primary", :disabled='bettingAmount<=0', @click='bettingFormSubmit') 確認提交
        
</template>

<script>
import { mapState } from 'vuex';
import { matchBetAPI } from '@/api';

export default {
  components: {},
  computed: {
    ...mapState('setting', ['DeviceIsPc']),
    ...mapState('game', ['CurrentGame']),
    ...mapState('member', ['Wallet']),
    maxValue() {
      return this.Wallet.walletAmount + this.Wallet.walletGameAmount + this.Wallet.walletLockAmount;
    },
  },
  data() {
    return {
      bettingAmount: 0,
      countDown: '',
      countDownTimer: null,
      subitem: '',
      selectedBetItemName: '',
      selectBetOdds: 0,
      bettingForm: {
        match_id: '',
        bet_amount: '',
        bet_item: '',
        bet_sub_item: '',
      },
    };
  },
  methods: {
    init() {
      if (this.subitem === '1') {
        this.selectedBetItemName = this.CurrentGame.homeTeamName;
        this.selectBetOdds = this.CurrentGame.pointSpread.homeOdds;
      } else if (this.subitem === '2') {
        this.selectedBetItemName = this.CurrentGame.visitingTeamName;
        this.selectBetOdds = this.CurrentGame.pointSpread.visitingOdds;
      } else if (this.subitem === '3') {
        this.selectedBetItemName = this.CurrentGame.overUnder.itemName;
        this.selectBetOdds = this.CurrentGame.overUnder.overOdds;
      } else if (this.subitem === '4') {
        this.selectedBetItemName = this.CurrentGame.overUnder.itemName;
        this.selectBetOdds = this.CurrentGame.overUnder.underOdds;
      } else if (this.subitem === 'home' || this.subitem === 'draw' || this.subitem === 'visiting') {
        const correctScore = this.CurrentGame.correctScore[this.subitem];
        this.selectBetOdds = correctScore[this.$route.query.item].odds;
        this.selectedBetItemName = correctScore[this.$route.query.item].itemName;
      }
      this.gameCountDown(this.CurrentGame.matchStartTime);
    },
    countNum(num) {
      if ((this.bettingAmount + num) >= this.maxValue) { 
        this.bettingAmount = this.maxValue;
      } else { 
        this.bettingAmount += num;
      }
    },
    countStr(str) {
      const count = Number(String(this.bettingAmount) + String(str));
      if ((count >= this.maxValue)) {
        this.bettingAmount = this.maxValue;
      } else { 
        this.bettingAmount = count;
      }
    },
    setMaxValue() {
      this.bettingAmount = this.maxValue;
    },
    resetNum() {
      this.bettingAmount = 0;
    },
    rounding() {
      let temp = String(this.bettingAmount);
      temp = temp.substr(0, String(temp.length) - 1);
      this.bettingAmount = Number(temp) || 0;
    },
    bettingFormSubmit() {
      this.bettingForm.match_id = this.$route.query.gameid;
      this.bettingForm.bet_amount = this.bettingAmount;
      this.bettingForm.bet_item = this.$route.query.item;
      this.bettingForm.bet_sub_item = this.$route.query.subitem;
      if (this.$route.query.subitem === 'home' || this.$route.query.subitem === 'draw' || this.$route.query.subitem === 'visiting') {
        delete this.bettingForm.bet_sub_item;
      }
      matchBetAPI(this.bettingForm)
        .then((res) => {
          this.$store.dispatch('member/updateMemberStatus');
          const BetSuccessData = {
            matchName: this.CurrentGame.matchName,
            homeTeamName: this.CurrentGame.homeTeamName,
            visitingTeamName: this.CurrentGame.visitingTeamName,
            matchStartTime: this.CurrentGame.matchStartTime,
            selectedBetItemName: this.selectedBetItemName,
            selectBetOdds: this.selectBetOdds,
            bettingAmount: this.bettingAmount,
          };
          this.$store.commit('game/setBetSuccessData', BetSuccessData);
          this.$router.push('/bettingsuccess');
        });
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
    this.subitem = this.$route.query.subitem;
    this.$store.commit('game/setCurrentGame', {});
    this.$store.dispatch('game/getMatchByID', this.$route.query.gameid)
      .then((res) => {
        this.init();
      })
      .catch((error) => {
        this.$router.push('/');
      });
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
.bettingAmount{
  padding: 4px;
  border-radius: 8px;
  border: solid 1px #b3b3b3;
}
.computerBtn{
  cursor: pointer;
  margin: 8px 0;
  height: 44px;
  font-size: 20px;
  color: $Color_2;
  text-align: center;
  line-height: 44px;
  border-radius: 8px;
  border: solid 1px $Color_2;
  background-color: rgba(2, 119, 189, 0.09);
  // ios觸碰限制
  touch-action: manipulation;
  // ios觸碰限制
  &:hover, &:active{
    color:#fff;
    background-color: rgba(2, 119, 189, 0.3);
  }
}
</style>
