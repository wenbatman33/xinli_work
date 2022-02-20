<template lang="pug">
.row.no-gutters.w-100
  el-form.w-100(:model="withdrawForm", ref="withdrawForm", label-width="100px")
    el-alert(type='info', :closable='false')
      slot
        span.mr-2
          i.el-alert__icon.el-icon-info
        span 提示：单笔限额 
        span.alertHighLight {{memberWallet.singleMin | commaFormat}} 
        span 元 ～ 
        span.alertHighLight {{memberWallet.singleMax | commaFormat}} 
        span 元，今日尚可提款额度 
        span.alertHighLight {{memberWallet.dayMax | commaFormat}}
        span 元
    .col-12.py-3
      el-form-item.m-0(label="银行户名") 
        el-input(v-model='bank_account', type='text' ,placeholder='开户名', :disabled='PersonalDetail.memberRealname!==null')
    .col-12
      el-form-item.m-0(label="可提款金额")
        h6.mt-2 ￥ {{ Math.floor(memberWallet.cash) | commaFormat}}
    .col-12.py-md-1
      el-form-item.m-0(label="提款金额")
        el-input.w-75(v-model.trim='withdrawForm.amount', type='number', @keyup.native="withdrawFormIntegerNumber",  placeholder='请输入提款金额', width =200)
        el-button.mx-2(type="primary", plain, @click='maxAmount') 最高
    .col-12.py-3
      el-form-item.m-0(label="选择银行卡")
        el-radio.ml-0.mr-2(v-model="withdrawForm.bank_card_id", :label='item.id', border, v-for='(item, index) in memberBankCard', v-if='item.memberStatus.value===1') {{filterBankCodeMappingList(item.memberBankCode)}} {{item.memberBankNo}}
        el-button.px-3(type="text", @click='openBankFormDialog') 添加银行卡
    .col-12.py-3
      el-button.w-100(type="primary", :disabled='submitButtonEnabled==false', @click='submitForm') 提交提款
    //- .col-12
    //-   el-button.w-100(type="text") 查看提款教程
</template>  
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      bank_account: '',
      withdrawForm: {
        amount: '',
        bank_card_id: '',
      },
      submitButtonEnabled: false,
      bankList: [],
    };
  },
  computed: {
    ...mapState('member', [
      'PersonalDetail',
    ]),
    
    ...mapState('wallet', [
      'memberWallet',
      'paymentDepositList',
      'bankCodeMappingList',
      'memberBankCard',
    ]),

  },
  watch: {
    withdrawForm: {
      handler(val) {
        const vm = this;
        if (vm.withdrawForm.amount !== '' && vm.withdrawForm.bank_card_id !== '' && vm.memberWallet.cash > 0) {
          vm.submitButtonEnabled = true;
        } else {
          vm.submitButtonEnabled = false;
        }
      },
      deep: true,
    },
    payment(value) {
      const vm = this;
      vm.bank = [];
    },
    PersonalDetail(val) {
      this.bank_account = val.memberRealname;
    },
  },
  methods: {
    init() {
      const vm = this;
      vm.bank_account = vm.PersonalDetail.memberRealname || '';
    },
    openBankFormDialog() {
      this.$store.dispatch('dialog/openCommandDialog_level2', { component: 'bl_BankForm' });
    },
    submitForm() {
      const vm = this;
      this.$store.dispatch('wallet/submitPaymentWithdraw', vm.withdrawForm)
        .then((res) => {
          if (res.status === 200 && res.data.status === 1) {
            vm.$message({ message: '送出成功', type: 'success' });
            vm.$store.dispatch('dialog/closeCommandDialog');
            vm.$router.push({ path: '/my/transactionlog', query: { currentType: 2, status: 2 } }).catch((err) => {});
            // 资金纪录预设参数
            const payload = {};
            payload.type = '';
            payload.status = '';
            payload.page = 1;
            payload.per_page = 10;
            payload.start_time = '';
            payload.end_time = '';
            vm.$store.dispatch('wallet/getTransactionLog', payload);
          }
        });
    },
    // minAndMax() {
    //   const result = this.withdrawForm.amount;
    //   if (result < this.memberWallet.singleMin) {
    //     this.withdrawForm.amount = this.memberWallet.singleMin;
    //   }
    //   if (result > this.memberWallet.singleMax) {
    //     this.withdrawForm.amount = this.memberWallet.singleMax;
    //   }
    //   // return result;
    // },
    withdrawFormIntegerNumber() {
      this.withdrawForm.amount = Number(this.withdrawForm.amount.toString().replace(/[^\.\d]/g, '').replace('.', ''));
    },
    maxAmount() {
      this.withdrawForm.amount = (Number(this.memberWallet.cash) > Number(this.memberWallet.singleMax)) ? this.memberWallet.singleMax : Math.floor(this.memberWallet.cash);
    },
    filterBankCodeMappingList(bankCode) {
      const result = this.bankCodeMappingList.filter(item => item.bankCode === bankCode);
      return result[0].bankName;
    },
  },
  mounted() {
    this.init();
    if (this.memberBankCard[0].id) this.withdrawForm.bank_card_id = this.memberBankCard[0].id;
  },
};
</script>

<style lang="scss" scoped>
.active{
  color: white !important;
  background-color: $DW_Color !important;
}
.alertHighLight{
  color: $DW_sky_1;
}
</style>
