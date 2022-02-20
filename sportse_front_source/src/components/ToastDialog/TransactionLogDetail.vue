<template lang='pug'>
.BettingCard
  .container
    .w-100.mt-3
      .logItem.d-flex.justify-content-between
        span 交易類型: 
        span {{TransactionLogDetail.paymentType.display}}
      .logItem.d-flex.justify-content-between
        span 交易渠道: 
        span {{TransactionLogDetail.paymentChannel}}
      .logItem.d-flex.justify-content-between
        span 交易單號: 
        span {{TransactionLogDetail.paymentOrderId}}
      .logItem.d-flex.justify-content-between
        span 交易金額: 
        span {{TransactionLogDetail.paymentAmount}}
      .logItem.d-flex.justify-content-between
        span 交易前錢包金額: 
        span {{TransactionLogDetail.paymentOldCash}}
      .logItem.d-flex.justify-content-between
        span 交易後錢包金額: 
        span {{TransactionLogDetail.paymentNewCash}}
      .logItem.d-flex.justify-content-between
        span 交易狀態: 
        span {{TransactionLogDetail.paymentCheckStatus.display}}
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('member', ['TransactionLogDetail']),
  },
  data() {
    return {
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
.logItem{
  padding: 10px 5px;

}
.logItem:nth-child(odd) {
  background: $gray_f5;
}
</style>
