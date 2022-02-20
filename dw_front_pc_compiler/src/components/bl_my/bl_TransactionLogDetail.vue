<template lang="pug">
div.text-center.p-3
  h5 交易明细
  el-divider
  h6 {{transactionLogDetail.createdAt}}
  h6
    i.fas.fa-check-circle.successIcon(v-if='transactionLogDetail.status.value === 3')
    i.fas.fa-times-circle.errorIcon(v-else-if='transactionLogDetail.status.value === 4')
    i.fas.fa-exclamation-circle.waringIcon(v-else)
  p 交易金额
  h6 ￥ {{transactionLogDetail.amount | commaFormat}}
  .detail.my-3.p-2
    .row.no-gutters
      .col-6.text-right.p-2 支付类型
      .col-6.text-left.p-2 {{transactionLogDetail.type.display}}
    .row.no-gutters
      .col-6.text-right.p-2 交易类型
      .col-6.text-left.p-2 {{transactionLogDetail.payChannelServiceId.display}}
    .row.no-gutters
      .col-6.text-right.p-2 单号
      .col-6.text-left.p-2 {{transactionLogDetail.orderId}}
    .row.no-gutters
      .col-6.text-right.p-2 交易状态
      .col-6.text-left.p-2 {{transactionLogDetail.status.display}}
    .row.no-gutters
      .col-6.text-right.p-2 交易前
      .col-6.text-left.p-2 ￥ {{transactionLogDetail.oldCash | commaFormat}}
    .row.no-gutters
      .col-6.text-right.p-2 存款手续费
      .col-6.text-left.p-2 ￥ {{transactionLogDetail.depositFee | commaFormat}}
    .row.no-gutters
      .col-6.text-right.p-2 交易后
      .col-6.text-left.p-2 ￥ {{transactionLogDetail.newCash | commaFormat}}
    .row.no-gutters(v-if='transactionLogDetail.remark')
      .col-6.text-right.p-2 备注
      .col-6.text-left.p-2 {{transactionLogDetail.remark}}
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('wallet', [
      'transactionLogDetail', 
    ]),
  },
  methods: {
  },
  mounted() {
  },
};
</script>
<style lang="scss" scoped>
.detail{
  background: $garyBlue_lightest;
}
.successIcon{
  font-size: 80px;
  color: $DW_greenMiddle;
}
.errorIcon{
  font-size: 80px;
  color: $DW_orange;
}
.warningIcon{
  font-size: 80px;
  color: $DW_yellow;
}
</style>
