<template lang='pug'>
  .content
    memberState
    section
      .member
        .member_caption
          | 您好，
          router-link(to='/vip')
            .badge.px-2.mx-1
              span(v-if='MemberVIPData.UserLevel<=1') 铁 
              i.el-icon-star-on(v-if='MemberVIPData.UserLevel>=2')
              span(v-if='MemberVIPData.UserLevel>=2') {{ MemberVIPData.UserLevel-1 }} 
          span {{UserName}}
          br
          | 账户总额
          .member_quota ¥ {{parseFloat(totalAccount).toFixed(2) | commaFormat}}
          .member_quota_info
            ul
              li
                | 中心钱包
                span ¥ {{Cash | commaFormat}}
              hr
              li
                | 冻结资金
                span ¥ {{LockCash | commaFormat}}
        form
          //- el-button.member_recover(@click='getAllMoney' :loading="submitLoading" :class='(haveGameMoney ? "member_recover_o" : "member_recover")' :disabled='haveGameMoney === true') 一键收回中心钱包
</template>
<script>
import axios from 'axios';
import memberState from '@/components/tgMember/memberState.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      submitLoading: false,
      vipButtonShow: false,
    };
  },
  components: {
    memberState,
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberWallet',
      'MemberGameWallet',
      'MemberGameWalletCommon',
      'MemberGameWalletNormal',
      'MemberVIPData',
    ]),
    Cash() {
      return this.MemberWallet.Cash;
    },
    LockCash() {
      return this.MemberWallet.LockCash;
    },
    totalAccount() {
      return (Number(this.MemberWallet.Cash) + Number(this.MemberWallet.LockCash));
    },
    haveGameMoney() {
      let total = 0;
      if (Object.keys(this.MemberGameWallet).length > 0) {
        const vm = this;
        Object.keys(this.MemberGameWallet).map((objectKey, index) => {
          const value = vm.MemberGameWallet[objectKey];
          if (value[1].toString().indexOf(',') >= 0) {
            total += Number(value[1].replace(/,/g, ''));
          } else {
            total += Number(value[1]);
          }
          
          return total;
        });
      } 
      return !(total > 0);
    },
  },
  watch: {
    haveGameMoney(val, oldVal) {
      this.submitLoading = false;
    },
  },
  methods: {
    getAllMoney() {
      this.GA_wallet_takeallmobile();
      this.submitLoading = true;
      const vm = this;
      const payload = { UserId: this.UserId };
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/WalletTransferAll`, payload)
        .then((res) => {
          console.log(res);
          if (res.data.status === 1) {
            vm.sendMessage();
            vm.transferFinish();
          } else {
            vm.errorMessage(res.data.error_message);
          }
          vm.submitLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    errorMessage(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'error',
        duration: 1500,
        center: true,
      });
    },
    sendMessage() {
      this.$message({
        message: '成功收回中心钱包',
        type: 'success',
        duration: 1500,
        center: true,
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
  mounted() {
    // console.log(this.submitLoading)
    const nowTimeStamp = Date.parse(new Date());
    const stringTime = '2019-01-01 11:18:00';
    const targetTimeStamp = Date.parse(new Date(stringTime));
    if (nowTimeStamp >= targetTimeStamp) this.vipButtonShow = true;
  },
};
</script>
<style lang="scss" scoped>
.badge{
  color: #fff;
  border-radius: 18px;
  background-color: #1890ff;
  font-size: 16px;
  i{
    font-size: 16px;
  }
}
</style>
