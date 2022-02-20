<template lang='pug'>
  .memberStatus
    .memberStatusBarBG
    .memberStatusBar
      .container.h-100.align-items-center
        .row.h-100.justify-content-between.align-items-center
          div.m-2
            img(src="/static/img/pic-crown.png")
          div.d-flex.flex-column.status
            div
              p.text-white  {{UserName}}
            div.w-100.d-flex.flex-row.justify-content-between
              div.totalAmount
                  h6.text-white 帐户总额
                  h5.text-tgYellow(v-if='MemberWallet') ¥ {{totalAccount | commaFormat}}
              div
                h6.text-white 中心钱包
                h5.text-tgBlueLight(v-if='MemberWallet') ¥ {{Cash | commaFormat}}
              div
                h6.text-white 冻结资金
                h5.text-tgBlueLight(v-if='MemberWallet') ¥ {{LockCash | commaFormat}}
              div.totalAmountBtns.pr-3
                el-button.btn.btn-outline-tgBlueLight.radiusBtn(@click='WalletTransferAll'  :loading="submitLoading") 一键收回中心钱包
</template>
<script>
import axios from 'axios';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      submitLoading: false,
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberWallet',
      'MemberGameWallet',
    ]),
    Cash() {
      return this.MemberWallet.Cash;
    },
    LockCash() {
      return this.MemberWallet.LockCash;
    },
    totalAccount() {
      const totalAccount = Number(this.MemberWallet.Cash) + Number(this.MemberWallet.LockCash);
      return totalAccount.toFixed(2);
    },
  },
  methods: {
    WalletTransferAll() {
      const payload = { UserId: this.UserId };
      const vm = this;
      vm.submitLoading = true;
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/WalletTransferAll`, payload)
        .then((res) => {
          vm.submitLoading = false;
          if (res.data.status === 1) {
            vm.$message({ message: '已收回中心钱包', type: 'success' });
            vm.transferFinish();
          } else {
            vm.$message({ message: res.data.error_message, type: 'error' });
            vm.transferFinish();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    transferFinish() {
      if (this.UserId) {
        const payload = { UserId: this.UserId, Status: '0' };
        this.$store.dispatch('member/MemberUserWalletInfo', payload);
        this.$store.dispatch('member/MemberGetGameWallet', payload);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .status{
    width: 88%;
  }
  .totalAmount{
    width: 160px;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
  }
  .totalAmountBtns{
    width: 450px;
    text-align: right;
  }
  .memberStatus {
    width: 100%;
    height: 152px;
    background-image: linear-gradient(to right, #002766, #001332);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  }
  .memberStatusBarBG{
    width: 100%;
    height: 152px;
    background-image: url('/static/img/bg-member.png');
    background-size: cover;
  }
  .memberStatusBar{
    margin-top: -152px;
    height: 152px;
  }
  .memberPage{
    min-height: 600px;
  }
</style>
