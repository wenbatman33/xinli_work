<template lang='pug'>
.pageContent.page
  .p-3
    .row.no-gutters
      .col-12.col-sm-6.text-center.text-sm-left.my-3
        h5 
          .i.fas.fa-clipboard-list.mr-2
          | 投注記錄
      .col-12.col-sm-6.text-center.text-sm-right.my-3
        span.Gray_c7.mx-2.cursorPointer(:class='{"active": payload.status===0}',@click='cahngeStatus(0)') 未結算
        span.mx-2n |  
        span.Gray_c7.mx-2.cursorPointer(:class='{"active": payload.status===1}',@click='cahngeStatus(1)') 已結算
    .row.no-gutters.my-2
      .col-12.col-sm-12.col-md-6.text-center.text-md-left
        .row
          .col-6
            p 總流水 
            h5 ¥ {{betLogSumData.effectiveBetAmountSum | commaFormatDefault }}
          .col-6
            p 總輸贏 
            h5 ¥ {{betLogSumData.winAmountSum | commaFormatDefault }}
      .col-12.col-sm-12.col-md-6.text-center.text-md-right.my-2
        el-button.m-1(v-for='item in seriesList' type='primary', size='small' plain round,  @click='cahngeDateMode(item.value)') {{item.dispaly}}
    .row
      .col-12.col-sm-6.col-md-4.col-lg-3.my-2(v-if='betLogData.length>0' ,v-for='(item, index) in betLogData')
        .betLogItem.p-3(@click='showDeatil(item)')
          .d-flex.justify-content-between.px-2.my-2
            span {{toDayjs(item.betTime)}}
            b {{item.betType}}
          .d-flex.flex-column.px-2.my-2
            p.T_Color_2.fs12 {{item.matchName}}
            p {{item.team}}
          .d-flex.justify-content-between.Amount.px-2.my-2
            span {{item.betItem}}
            span | 
            span @{{item.betOdds}}
          .d-flex.justify-content-between.px-2.my-2(v-if='payload.status===0')
            span.T_Color_2 投注金額
            span ¥ {{item.betAmount | commaFormatDefault }}
          .d-flex.justify-content-between.px-2.my-2(v-if='payload.status===1')
            span.T_Color_2 輸贏金額
            span ¥ {{item.effectiveBetAmount | commaFormatDefault }}
      .col-12(v-if='betLogData.length<=0') 
        .d-flex.justify-content-center.px-2.my-2 暫無紀錄
          
</template>

<script>
import { mapState } from 'vuex';
import { MatchBetLogAPI, MatchBetLogSumAPI } from '@/api';

export default {
  components: {},
  computed: {
    ...mapState('setting', ['DeviceIsPc']),
  },
  data() {
    return {
      currentSeries: '今天',
      seriesList: [
        {
          value: 1,
          dispaly: '今天',
        },
        {
          value: 2,
          dispaly: '昨天',
        },
        {
          value: 3,
          dispaly: '7天',
        },
        {
          value: 4,
          dispaly: '30天',
        },
        {
          value: 5,
          dispaly: '上月',
        },
      ],
      betLogData: [],
      betLogSumData: [],
      payload: {  
        status: 0,
        dateMode: 1,
      },
    };
  },
  methods: {
    init() {
      this.getData(this.payload);
    },
    getData(payload) {
      MatchBetLogAPI(payload)
        .then((res) => {
          this.betLogData = res.data.data;
        });
      MatchBetLogSumAPI(payload)
        .then((res) => {
          this.betLogSumData = res.data.data;
        });
    },
    toDayjs(day) {
      return this.$dayjs(day).format('MM/DD HH:mm');
    },
    cahngeStatus(num) {
      this.payload.status = num;
      this.getData(this.payload);
    },
    cahngeDateMode(num) {
      this.payload.dateMode = num;
      this.getData(this.payload);
    },
    showDeatil(item) {
      const Card = { component: 'BettingLogDetail', title: '注單細項' };
      this.$store.commit('game/setBetLogDetail', item);
      this.$store.dispatch('dialog/openToastDialog', Card);
    },
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
.gameList{
  .title{
    border-left: 8px solid #000 ;
    .moreLink{
      cursor: pointer;
      color: $Color_2;
    }
  }
}
.betLogItem{
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 2px 10px 0 rgba(150, 150, 150, 0.5);
  background-color: #ffffff;
  .gameInfo{
    font-size: 12px;
    .gameName, .divider{
      color:#fff;
    }
    .moreInfo{
      cursor: pointer;
      color:#fff;
    }
  }
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
  margin: 0px 4px;
  padding: 0 4px;
  color: #fff;
  line-height: 24px;
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
.Amount{
  color: white;
  height: 42px;
  line-height: 42px;
  background: $Color_1;
  border-radius: 4px;
}
.active{
  color: $Color_2 !important;
}

</style>
