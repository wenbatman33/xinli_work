<template lang='pug'>
.pageContent.d-flex.flex-column
  WalletInfo
  .myFunc.flex-grow-1
    .container(:class='{"CardStyle": DeviceIsPc}')
      .row.no-gutters.py-sm-3
        .col-12.p-2.mt-2
          h5.T_Color_2 提款
          el-form.mt-3.h-100.d-flex.flex-column(:model='withdrawForm', ref='withdrawForm', @submit.native.prevent='submitForm("withdrawForm")')
            .row
              .col-12.col-sm-6
                el-form-item
                  p.text-right 凍結金額: {{ Wallet.walletLockAmount | commaFormat}}
                  el-input.loginInput(v-model='withdrawForm.amount', type='number', maxlength='10', oninput='value=value.replace(/[^0-9.]/g,"")', placeholder='請輸入提款金額')
              .col-12.col-sm-6
                p.text-right(v-if='DeviceIsPc') &nbsp;
                .row.no-gutters.mt-sm-3
                  el-button.col(@click='addAmount(50)') +50 
                  el-button.col(@click='addAmount(100)') +100
                  el-button.col(@click='addAmount(250)') +250
              .col-12
                hr
            el-form-item
              el-input.loginInput(v-model='memberBankNo' , placeholder='請填寫銀行帳號末5碼', :disabled='dataEdited!==null')
            el-form-item.my-1
              el-button.w-100(type='primary', native-type='submit', :disabled='withdrawFormValidate===false') 確認提交
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
      'Wallet',
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
      withdrawFormValidate: false,
      dataEdited: null,
      withdrawForm: {
        amount: '',
      },
      memberBankNo: '',
    };
  },
  watch: {
    withdrawForm: {
      handler(val) {
        const vm = this;
        if (vm.withdrawForm.amount !== '' && vm.memberBankNo !== '') {
          this.withdrawFormValidate = true;
        } else {
          this.withdrawFormValidate = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    init() {
      // 檢查銀行卡是否已有資料
      console.log(this.BankCard);
      if (this.BankCard.memberBankName === '' || this.BankCard.memberBankBranch === '' || this.BankCard.memberBankNo === '' || this.BankCard.init === false) {
        const Card = { component: 'MyBankCard', title: '銀行卡管理' };
        this.$store.dispatch('dialog/openToastDialog', Card);
        this.$router.push('/my');
      }
      if (this.BankCard.memberBankNo !== '') {
        this.dataEdited = true;
        this.memberBankNo = this.BankCard.memberBankNo;
      }
    },
    addAmount(num) {
      const amount = this.withdrawForm.amount;
      this.withdrawForm.amount = (amount === '') ? 0 + num : Number(amount) + num;
    },
    submitForm(form) {
      if (this.withdrawFormValidate) {
        const vm = this;
        this.$store.dispatch('member/withdraw', this[form])
          .then((res) => {
            this.$message({ message: '提款成功', type: 'success', showClose: true });
            this.$router.push('/transactionLog');
          });
      }
    },
  },
  mounted() {
    this.$store.dispatch('member/getBankCard')
      .then((res) => {
        this.init();
      });
  },
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
</style>
