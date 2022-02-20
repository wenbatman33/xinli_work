<template lang="pug">
.w-full.text-center.px-4
  .formData.pt-5
    p.text-lg.my-8 填寫完整資料
    el-form.mt-4(:model="formData", ref="formData",:rules='formDataRules', @submit.native.prevent='submit("formData")')
      el-form-item.my-8(prop='name')
        el-input.loginInput(v-model="formData.name"  placeholder="姓名")
      el-form-item.my-8(prop='email')
        el-input.loginInput(v-model="formData.email" placeholder="請輸入郵箱")
      el-form-item.my-8
        el-button.w-full(type="primary", native-type='submit', round,  :disabled='formDataValidate===false') 完成啟用
</template>

<script>
import { mapState } from 'vuex';
import { MemberProfileAPI } from '@/api';

export default {
  computed: {
    ...mapState('member', ['MemberLogined', 'MemberData', 'MemberInfo']),
  },
  watch: {
    MemberInfo() {
      this.getStoreMemberInfo();
    },
    formData: {
      handler(val) {
        this.$refs.formData.validate((valid) => {
          if (valid) {
            this.formDataValidate = true;
          } else {
            this.formDataValidate = false;
          }
        });
      }, 
      deep: true,
    },
  },
  data() {
    return {
      Code: '',
      formDataValidate: false,
      formDataRules: {
        name: [
          {
            required: true, message: '请输入真实姓名', trigger: ['blur', 'change'], 
          },
        ],
        email: [
          {
            required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'], 
          },
        ],
      },
      formData: {
        name: '',
        email: '',
      },
    };
  },
  methods: {
    getStoreMemberInfo() {
      if (this.MemberInfo.name !== '' && this.MemberInfo.email !== '') {
        this.formData.name = this.MemberInfo.name;
        this.formData.email = this.MemberInfo.email;
        this.$router.push('/');
      }
    },
    submit() {
      MemberProfileAPI(this.formData)
        .then((res) => {
          console.log(res);
          this.$message({
            message: '完成启用',
            type: 'success',
          });
          this.$store.dispatch('member/Member');
          this.$store.dispatch('member/checkMemberInfo');
          this.$router.push('/');
        });
    },
  },
  mounted() {
    this.getStoreMemberInfo();
  },
};
</script>
<style lang="scss" scoped>
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
