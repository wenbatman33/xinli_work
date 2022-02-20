<template lang='pug'>
.w-full
  .headerBar
    p.text-center 邀请
    .backBtn
      router-link(to='/')
        span.mx-2
          i.fas.fa-angle-left
        span Back
  .w-full.pt-4
    .formData.p-5(v-if='MemberInfo.identity')
      p.text-lg.my-8.text-center(v-if='MemberInfo.identity.value ===2') 邀请代理
      p.text-lg.my-8.text-center(v-if='MemberInfo.identity.value ===3') 邀请交易员
      el-form.mt-3(:model='formData', ref='formData', :rules='formDataRules', @submit.native.prevent='invite')
        el-form-item.my-8(prop='phone')
          el-input.loginInput(v-model='formData.phone', maxlength='11', placeholder='输入行动电话')
        el-form-item.my-8
          el-button.w-full(type='primary', native-type='submit', round) 发送邀请
</template>

<script>
import { mapState } from 'vuex';
import { 
  InviteAgencyAPI,
  InviteTraderAPI,
} from '@/api';

export default {
  computed: {
    ...mapState('member', ['MemberData', 'MemberInfo']),
  },
  data() {
    const check_Phone = (rule, value, callback) => {
      if (value === '') {
        console.log(value);
        callback(new Error('请输手机号'));
      } else if (!/^(1)\d{10}$/.test(value)) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    return {
      Code: '',
      formDataValidate: false,
      formData: {
        phone: '',
      },
      formDataRules: {
        phone: [
          { required: true, message: '请输入联系电话', trigger: ['blur', 'change'] },
          { validator: check_Phone, trigger: ['blur', 'change'] },
        ],
      },
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    invite() {
      // this.MemberInfo.identity.value=2 是總代理
      // this.MemberInfo.identity.value=3 是代理
      // this.MemberInfo.identity.value=4 是交易員 
      if (this.MemberInfo.identity.value === 2) {
        InviteAgencyAPI(this.formData)
          .then((res) => {
            this.$message({
              message: '發送邀請完成！',
              type: 'success',
              showClose: true,
            });
            this.resetForm('formData');
          });
      } else if (this.MemberInfo.identity.value === 3) {
        InviteTraderAPI(this.formData)
          .then((res) => {
            this.$message({
              message: '發送邀請完成！',
              type: 'success',
              showClose: true,
            });
            this.resetForm('formData');
          });
      }
    },
  },
  mounted() {
  },
};
</script>
<style lang='scss' scoped>
.loginBg{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.logoWrap{
  margin: 35px 0 20px 0;
}
.formData{
  margin: auto;
  max-width: 450px;
}
</style>
