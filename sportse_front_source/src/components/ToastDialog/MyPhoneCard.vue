<template lang='pug'>
.container.p-3.h-100
  .row.h-100
    .col-12
      el-form.mt-3.h-100.d-flex.flex-column(:model='memberForm', ref='memberForm', @submit.native.prevent='changForm("memberForm")')
        .flex-grow-1
          el-form-item
            el-input.loginInput(v-model='memberForm.phone'  placeholder='請輸入手機號碼', :disabled='dataEdited!==null')
          small.Gray_9 為了您的資金安全，請填寫常用的電話號碼。
        .py-3
          a(href='http://line.naver.jp/ti/p/jniBDSE60w#~' , target='_blank', v-if='dataEdited')
            el-button.w-100(type='primary') 聯繫客服修改
          el-form-item.my-1(v-else)
            el-button.w-100(type='primary', native-type='submit', :disabled='memberFormValidate===false') 確認提交
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MyPhoneCard',
  watch: {
    memberForm: {
      handler(val) {
        const vm = this;
        if (vm.memberForm.phone !== '') {
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
    ]),
  },
  data() {
    return {
      memberFormValidate: false,
      dataEdited: null,
      memberForm: {
        phone: '',
      },
    };
  },
  methods: {
    changForm(form) {
      const vm = this;
      if (this.memberFormValidate) {
        this.$store.dispatch('member/chaengPhone', this[form])
          .then((res) => {
            vm.$message({ message: '修改成功', type: 'success', showClose: true });
            this.$store.dispatch('dialog/closeToastDialog');
          });
      }
    },
  },
  mounted() {
    if (this.PersonalDetail.memberPhone !== null) {
      this.dataEdited = true;
      this.memberForm.phone = this.PersonalDetail.memberPhone;
    }
  },
};
</script>

