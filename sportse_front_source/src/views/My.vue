<template lang='pug'>
.pageContent.d-flex.flex-column
  WalletInfo
  .myFunc.flex-grow-1
    .container(:class='{"CardStyle": DeviceIsPc}')
      .row.p-3
        .col-12.no-gutters.col-lg-8.py-2
          .partTitle.fs20.T_Color_2 用戶資料
          .my-3
            .funcBtn.w-100.text-left(@click='changeName')
              span.title 真實姓名
              span.value {{PersonalDetail.memberRealname}}
              i.fas.fa-angle-right.funcBtnIcon
          .my-3
            .funcBtn.w-100.text-left(@click='changePhone')
              span.title 手機管理
              span.value {{PersonalDetail.memberPhone}}
              i.fas.fa-angle-right.funcBtnIcon
          .my-3
            .funcBtn.w-100.text-left(@click='changePassword')
              span.title 修改密碼
              span.value
              i.fas.fa-angle-right.funcBtnIcon
          .partTitle.fs20.T_Color_2 銀行卡管理
          .my-3
            .funcBtn.w-100.text-left(@click='changeBank')
              span.title 銀行卡
              span.value {{BankCard.memberBankName}}
              i.fas.fa-angle-right.funcBtnIcon
        .col-12.col-lg-4.py-2
          .partTitle.fs20.T_Color_2 常用功能
          .my-3
            router-link(to='/withdraw')
              .funcBtn.w-100.text-left 
                span.title
                  img.icon16(:src='icon_withdraw')
                  | 提款
                span.value 
                i.fas.fa-angle-right.funcBtnIcon
          .my-3
            router-link(to='/deposit')
              .funcBtn.w-100.text-left 
                span.title 
                  img.icon16(:src='icon_deposit')
                  | 存款
                span.value 
                i.fas.fa-angle-right.funcBtnIcon
          .my-3
            router-link(to='/betlog')
              .funcBtn.w-100.text-left 
                span.title 
                  img.icon16(:src='icon_record')
                  | 投注記錄
                span.value 
                i.fas.fa-angle-right.funcBtnIcon
          .my-3
            router-link(to='/transactionLog')
              .funcBtn.w-100.text-left 
                span.title 
                  img.icon16(:src='icon_record')
                  | 交易紀錄
                span.value 
                i.fas.fa-angle-right.funcBtnIcon
          .my-3
            .funcBtn.w-100.text-left(@click='logout')
              i.fas.fa-sign-out-alt.funcBtnIcon
              span.title 登出
              span.value 
              i.fas.fa-angle-right.funcBtnIcon
</template>

<script>
import WalletInfo from '@/components/My/WalletInfo.vue';
import { mapState } from 'vuex';

export default {
  components: {
    WalletInfo,
  },
  computed: {
    ...mapState('member', [
      'PersonalDetail',
      'BankCard',
    ]),
    ...mapState('setting', [
      'WindowWidth',
      'WindowHeight',
      'DeviceIsPc',
    ]),
  },
  data() {
    return {
      icon_deposit: '/static/img/icon-deposit.svg',
      icon_withdraw: '/static/img/icon-withdraw.svg',
      icon_record: '/static/img/icon-record-b.svg',
    };
  },
  methods: {
    changeName() {
      const Card = { component: 'MyNameCard', title: '真實姓名' };
      this.$store.dispatch('dialog/openToastDialog', Card);
    },
    changePhone() {
      const Card = { component: 'MyPhoneCard', title: '手機管理' };
      this.$store.dispatch('dialog/openToastDialog', Card);
    },
    changePassword() {
      const Card = { component: 'MyPasswordCard', title: '修改密碼' };
      this.$store.dispatch('dialog/openToastDialog', Card);
    },
    changeBank() {
      const Card = { component: 'MyBankCard', title: '銀行卡管理' };
      this.$store.dispatch('dialog/openToastDialog', Card);
    },
    logout() {
      this.$store.dispatch('member/logout');
      this.$router.push('/');
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.myFunc{
  background: $gray_f5;
}
.CardStyle{
  position: relative;
  top: -20px;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 10px 0 rgba(150, 150, 150, 0.5);
}
.funcBtn{
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 48px;
  padding: 0 24px;
  line-height: 48px;
  border-radius: 4px;
  border: solid 1px #b3b3b3;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  i.funcBtnIcon{
    position: absolute;
    top: 16px;
    right: 20px;
  }
  .value{
    margin-right: 24px;
    color: $gray_c7;
  }
}
.icon16{
  width: 16px;
  height: 16px;
  margin-right: 8px;
}
</style>
