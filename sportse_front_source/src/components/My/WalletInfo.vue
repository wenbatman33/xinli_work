<template lang='pug'>
.myWalletInfo.p-3(v-if='PersonalDetail && Wallet')
  .container
    .row.no-gutters.pt-sm-5.pb-sm-3
      .col-12.col-sm-6.p-2
        .d-flex.flex-row.justify-content-center.justify-content-sm-start
          .d-flex
            .avatar
              .i.fas.fa-user
          .d-flex.flex-column.align-content-center.justify-content-center.ml-2
            p.fs12.text-center.text-sm-left 您好，{{PersonalDetail.memberAccount}}
            p.fs20.text-center.text-sm-left ¥ {{ Wallet.walletAmount+ Wallet.walletGameAmount+ Wallet.walletLockAmount | commaFormat}}
      .col-6.col-sm-3.p-2.walletWap
        .d-flex.flex-column.justify-content-center.align-content-center.h-100
          p.fs12.W_Alpha_40.text-center.text-sm-left 錢包金額
          p.fs16.text-center.text-sm-left ¥ {{  Wallet.walletAmount | commaFormat }}
      .col-6.col-sm-3.p-2.align-content-center
        .d-flex.flex-column.justify-content-center.align-content-center.h-100
          p.fs12.W_Alpha_40.text-center.text-sm-left 未結算
          p.fs16.text-center.text-sm-left ¥ {{ Wallet.walletGameAmount | commaFormat }}
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      cash: 123489,
      memberWallet: 1424,
      gameCash: 12347,
      nameData: '',
    };
  },
  computed: {
    ...mapState('member', [
      'PersonalDetail',
      'Wallet',
    ]),
  },
  methods: {

  },
  mounted() {
  },
};
</script>
<style lang='scss' scoped>

.myWalletInfo{
  color: white;
  background: $Color_5;
  .walletWap{
    border-right: 1px solid $gray_9;
  }
}
.avatar{
  width: 80px;
  height: 80px;
  color: white;
  font-size: 32px;
  line-height: 80px;
  text-align: center;
  border-radius: 100%;
  background: $Color_1;
}
</style>
