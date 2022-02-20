<template lang="pug">
.w-full.text-center.px-4
  .pt-5
    h3.text-3xl.font-semibold 欢迎回来
  .loginFormData.p-5
    p.text-lg.my-8 登入uTrader
    el-form(:model="loginFormData", ref="loginFormData", :rules='loginFormRules', @submit.native.prevent='login("loginFormData")')
      el-form-item.my-8
        el-input.loginInput(v-model="loginFormData.account"  placeholder="输入帐号")
      el-form-item.mt-8.mb-1
        el-input.loginInput(v-model="loginFormData.password", type='password' placeholder="输入密码")
      el-form-item.text-right
        router-link.text-blue-500(to='/forget') 忘记密码
      el-form-item.my-4
        el-button.w-full(type="primary", native-type='submit' round) 登录
  .my-4
    router-link.text-sm(to='/signup') 第一次登录点此 启用帐号
</template>

<script>
import { mapState } from 'vuex';
import { MemberLoginAPI } from '@/api';

export default {
  computed: {
    ...mapState('member', ['MemberLogined', 'MemberInfo']),
  },
  watch: {
    loginFormData: {
      handler(val) {
        this.$refs.loginFormData.validate((valid) => {
          if (valid) {
            this.loginFormDataValidate = true;
          } else {
            this.loginFormDataValidate = false;
          }
        });
      }, 
      deep: true,
    },
  },
  data() {
    const check_account = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入5~15位半形英文、数字或下划线'));
      } else if (!(/^[a-zA-Z0-9_]{5,15}$/.test(value))) {
        callback(new Error('请输入5~15位半形英文、数字或下划线'));
      } else {
        callback();
      }
    };
    const check_Password = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请輸入8~20位半形英文、数字或特殊符号'));
      } else if (!(/^[a-zA-Z0-9_!@#$%^&*\-+=;:,.?~]{8,20}$/.test(value))) {
        callback(new Error('请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~'));
      } else {
        if (this.memberForm.ckPassword !== '') {
          this.$refs.memberForm.validateField('ckPassword');
        }
        callback();
      }
    };
    return {
      Code: '',
      loginFormDataValidate: false,
      loginFormData: {
        account: '',
        password: '',
      },
      loginFormRules: {
        account: [
          { required: true, message: '请输入5~15位半形英文、数字或下划线', trigger: ['blur', 'change'] },
          { validator: check_account, trigger: ['blur', 'change'] },
          {
            min: 5, max: 15, message: '请输入5~15位半形英文、数字或下划线', trigger: 'blur', 
          },
        ],
        password: [
          { required: true, message: '请輸入8~20位半形英文、数字或特殊符号', trigger: ['blur', 'change'] },
          { validator: check_Password, trigger: ['blur', 'change'] }, 
          {
            min: 8, max: 20, message: '请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~', trigger: ['blur', 'change'], 
          },
        ],
      },
    };
  },
  methods: {
    login(form) {
      this.$store.dispatch('member/MemberLogin', this.loginFormData)
        .then((res) => {
          this.$store.dispatch('member/checkMemberInfo')
            .then((res) => {
              console.log(this.MemberInfo);
              if (this.MemberInfo === '' || this.MemberInfo.email === '') {
                this.$router.push('/setprofile');
              } else {
                this.$router.push('/');
              }
            });
        });
    },
  },
  mounted() {
    if (window.localStorage.getItem('JWT_TOKEN')) {
      this.$router.push('/');
    }
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
.loginFormData{
  margin: auto;
  max-width: 450px;
}
</style>
