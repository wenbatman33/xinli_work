<template lang='pug'>
.pageContent.d-flex.flex-column
  WalletInfo
  .myFunc.flex-grow-1
    .container(:class='{"CardStyle": DeviceIsPc}')
      .row.no-gutters.py-sm-3
        .col-12.p-2.mt-2
          h5.T_Color_2 存款
          el-form.mt-3.h-100.d-flex.flex-column(:model='depositForm', ref='depositForm', @submit.native.prevent='submitForm("depositForm")')
            .row
              .col-12
                el-form-item
                  p.text-right 凍結金額: ¥ {{ Wallet.walletLockAmount | commaFormat}}
                  el-input.loginInput(v-model='depositForm.amount', maxlength='10', oninput='value=value.replace(/[^0-9.]/g,"")', placeholder='請輸入存款金額')
              .col-12
                p.text-right(v-if='DeviceIsPc') &nbsp;
                .row.no-gutters
                  el-button.col(@click='addAmount(50)') +50 
                  el-button.col(@click='addAmount(100)') +100
                  el-button.col(@click='addAmount(250)') +250
              .col-12
                hr
            el-form-item
              el-input.loginInput(v-model='depositForm.deposit_note', type='number', maxlength='5', placeholder='請填寫銀行帳號末5碼')
            el-form-item.my-1
              el-button.w-100(type='primary', native-type='submit', :disabled='depositFormValidate===false') 確認提交
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
    ]),
    ...mapState('setting', [
      'WindowWidth',
      'WindowHeight',
      'DeviceIsPc',
    ]),
  },
  data() {
    return {
      depositFormValidate: false,
      depositForm: {
        amount: '',
        deposit_note: '',
      },
    };
  },
  watch: {
    depositForm: {
      handler(val) {
        const vm = this;
        if (vm.depositForm.amount !== '' && vm.depositForm.deposit_note !== '' && vm.depositForm.deposit_note.length === 5) {
          this.depositFormValidate = true;
        } else {
          this.depositFormValidate = false;
        }
      },
      deep: true,
    },
    PersonalDetail: {
      handler(val) {
        this.init();
      },
      deep: true,
    },
  },
  methods: {
    init() {
      console.log(this.PersonalDetail.memberAccount);
      if (window.localStorage[`DepositPaddingData_${this.PersonalDetail.memberAccount}`]) {
      // 判斷是否尚在交易十分鐘之內
        const { paymentDepositEndAt } = JSON.parse(window.localStorage.getItem(`DepositPaddingData_${this.PersonalDetail.memberAccount}`));
        console.log(paymentDepositEndAt);
        console.log(this.$dayjs().isBefore(paymentDepositEndAt));
        if (this.$dayjs().isBefore(paymentDepositEndAt) === true) {
          this.$router.push('/deposittransfer');
        } else {
        // 超過十分鐘  清除暫存資料
          window.localStorage.removeItem(`DepositPaddingData_${this.PersonalDetail.memberAccount}`);
        }
      }
    },
    addAmount(num) {
      const amount = this.depositForm.amount;
      this.depositForm.amount = (amount === '') ? 0 + num : Number(amount) + num;
    },
    submitForm(form) {
      if (this.depositFormValidate) {
        const vm = this;
        this.$store.dispatch('member/deposit', this[form])
          .then((res) => {
            this.setDepositPaddingData(res);
          });
      }
    },
    setDepositPaddingData(res) {
      // 交易完成後進行十分鐘倒數訊息
      const payload = {
        paymentBankBranch: res.data.data[0].BankCard.data[0].paymentBankBranch,
        paymentBankHolder: res.data.data[0].BankCard.data[0].paymentBankHolder,
        paymentBankName: res.data.data[0].BankCard.data[0].paymentBankName,
        paymentBankNo: res.data.data[0].BankCard.data[0].paymentBankNo,
        paymentAmount: res.data.data[0].paymentAmount,
        paymentDepositEndAt: res.data.data[0].paymentDepositEndAt,
      };
      window.localStorage.setItem(`DepositPaddingData_${this.PersonalDetail.memberAccount}`, JSON.stringify(payload));
      this.$router.push('/deposittransfer');
    },
  },
  mounted() {
    if (this.PersonalDetail) {
      this.init();
    }
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
