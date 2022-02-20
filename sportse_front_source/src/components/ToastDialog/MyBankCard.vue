<template lang='pug'>
.container.p-3.h-100
  .row.h-100
    .col-12
      el-form.mt-3.h-100.d-flex.flex-column(:model='memberForm', ref='memberForm', @submit.native.prevent='changForm("memberForm")')
        .flex-grow-1
          el-form-item
            el-input.loginInput(v-model='memberForm.realname'  placeholder='戶名', :disabled='PersonalDetail.memberRealname!==null')
          el-form-item
            el-input.loginInput(v-model='memberForm.bank_name'  placeholder='銀行名稱' , :disabled='dataEdited!==null')
          el-form-item
            el-input.loginInput(v-model='memberForm.bank_branch'  placeholder='開戶地點', :disabled='dataEdited!==null') 
          el-form-item
            el-input.loginInput(v-model='memberForm.bank_no', type='tel'  placeholder='銀行卡號', :disabled='dataEdited!==null')
          small.Gray_9 您的銀行卡號必須和用戶資料中的『真實姓名』一致，才能夠迅速到帳。
        .py-3
          a(href='http://line.naver.jp/ti/p/jniBDSE60w#~' , target='_blank', v-if='dataEdited')
            el-button.w-100(type='primary') 聯繫客服修改
          el-form-item.my-1(v-else)
            el-button.w-100(type='primary', native-type='submit', :disabled='memberFormValidate===false') 確認提交
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MyBankCard',
  watch: {
    memberForm: {
      handler(val) {
        const vm = this;
        if (
          vm.memberForm.realname !== '' &&
          vm.memberForm.bank_name !== '' &&
          vm.memberForm.bank_branch !== '' &&
          vm.memberForm.bank_no !== ''
        ) {
          this.memberFormValidate = true;
        } else {
          this.memberFormValidate = false;
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapState('member', [
      'PersonalDetail',
      'BankCard',
    ]),
  },
  data() {
    return {
      memberFormValidate: false,
      dataEdited: null,
      memberForm: {
        realname: '',
        bank_name: '',
        bank_branch: '',
        bank_no: '',
      },
    };
  },
  methods: {
    changForm(form) {
      const vm = this;
      if (this.memberFormValidate) {
        this.$store.dispatch('member/addBankCard', this[form])
          .then((res) => {
            vm.$message({ message: '修改成功', type: 'success', showClose: true });
            this.$store.dispatch('dialog/closeToastDialog');
          });
      }
    },
  },
  mounted() {
    if (this.PersonalDetail.memberRealname !== null) {
      this.memberForm.realname = this.PersonalDetail.memberRealname;
    }
    if (this.BankCard.memberBankName !== '' || this.BankCard.memberBankBranch !== '' || this.BankCard.memberBankNo !== '') {
      this.dataEdited = true;
      this.memberForm.bank_name = this.BankCard.memberBankName;
      this.memberForm.bank_branch = this.BankCard.memberBankBranch;
      this.memberForm.bank_no = this.BankCard.memberBankNo;
    }
  },
};
</script>bank_name
