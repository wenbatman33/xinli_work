<template lang='pug'>
.BettingCard
  .container.p-3
    .row
      .col-12.text-center
        p.gameName.T_Color_2 {{BetLogDetail.matchName}}
        h5.teamName {{BetLogDetail.team}}
        p.my-2.Amount
          span.text-right {{BetLogDetail.betType}} 
          span @{{BetLogDetail.betOdds}}
    .row.my-3.rect.m-1
      .col-12.col-md-6
        .d-flex.justify-content-between.my-3
          span 投注單號: 
          span {{BetLogDetail.betNumber}}
        .d-flex.justify-content-between.my-3
          span 投注金額: 
          span ¥ {{BetLogDetail.betAmount | commaFormatDefault }}
        .d-flex.justify-content-between.my-3
          span 輸贏金額: 
          span ¥ {{BetLogDetail.winAmount | commaFormatDefault }}
      .col-12.col-md-6
        .d-flex.justify-content-between.my-3
          span 結算時間: 
          span {{BetLogDetail.settlementTime}}
        .d-flex.justify-content-between.my-3
          span 流水金額: 
          span {{BetLogDetail.effectiveBetAmount}}
        .d-flex.justify-content-between.my-3
          span 結算狀態: 
          span {{BetLogDetail.status.display}}
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('game', ['BetLogDetail']),
  },
  data() {
    return {
      bettingAmount: 0,
      maxValue: 99999,
    };
  },
  methods: {
  },
};
</script>

<style lang='scss' scoped>
.rect{
  border-radius: 8px;
  border: solid 1px #c7c7c7;
}
.Amount{
  color: white;
  height: 42px;
  line-height: 42px;
  background: $Color_1;
  border-radius: 4px;
}
</style>
