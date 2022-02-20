<template lang='pug'>
.col-12.text-center.pt-3
  .F_CENTER.py-3.pt-5
    h2.text-white
      img.logo(:src='logo_v')
  .loginForm.px-5
    h2.text-white 登錄
    el-form.mt-3(:model='loginForm', ref='loginForm', @submit.native.prevent='login("loginForm")')
      el-form-item
        el-input(v-model='loginForm.account'  placeholder='請輸入您的帳號')
      el-form-item
        el-input(v-model='loginForm.password', type='password' placeholder='請輸入您的密碼')
      el-form-item.m-0
        .row.no-gutters
          .col.mr-2
            el-input(v-model.trim='verifyCodeToUpperCase')
          ImageCodeVerify(@imgCode='imgCode')
      .F_BETWEEN
        el-checkbox.text-white(v-model='saveLoginForm', @change='handleChecked') 記住帳號
        span
          a.T_Color_1(href='http://line.naver.jp/ti/p/jniBDSE60w#~' , target='_blank') 線上客服
      el-form-item.my-1
        el-button.w-100(type='primary', native-type='submit', :disabled='loginFormValidate==false') 登錄
      .F_CENTER.my-3 
        router-link.T_Color_1(to='/register') 沒有帳號嗎？馬上註冊！
</template>

<script>
import ImageCodeVerify from '@/components/ImageCodeVerify/index.vue';

export default {
  name: 'LoginForm',
  components: {
    ImageCodeVerify,
  },
  computed: {
    verifyCodeToUpperCase: {
      get() {
        return this.loginForm.Code;
      },
      set(val) {
        this.loginForm.Code = val.toUpperCase();
      },
    },
  },
  watch: {
    loginForm: {
      handler(val) {
        const vm = this;
        if (val.account !== '' &&
          val.password !== '' &&
          val.Code !== '' &&
          val.Code === vm.Captcha) {
          this.loginFormValidate = true;
        } else {
          this.loginFormValidate = false;
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      Captcha: '',
      logo_v: '/static/img/logo_v.png',
      loginFormValidate: false,
      saveLoginForm: false,
      loginForm: {
        account: '',
        password: '',
        Code: '',
        tryTime: '',
        rpc: '',
      },
    };
  },
  methods: {
    imgCode(code) {
      this.loginFormValidate = false;
      this.loginForm.Code = '';
      this.Captcha = code;
    },
    upper(e) {
      e.target.value = e.target.value.toUpperCase();
    },
    handleChecked(val) {
      if (!val) {
        window.localStorage.removeItem('loginData');
      }
    },
    login(form) {
      const vm = this;
      if (this.loginFormValidate) {
        this.$store.dispatch('member/login', this[form])
          .then((res) => {
            vm.$message({ message: '登錄成功', type: 'success', showClose: true });
            if (this.saveLoginForm) window.localStorage.setItem('loginData', JSON.stringify(this[form]));
            this.$router.push('/');
          });
      }
    },
  },
  mounted() {
    if (window.localStorage.getItem('loginData')) {
      const { account, password } = JSON.parse(window.localStorage.getItem('loginData'));
      this.saveLoginForm = true;
      this.loginForm.account = account;
      this.loginForm.password = password;
    }
  },
};
</script>
<style lang='scss' scoped>
.loginForm{
  margin: auto;
  max-width: 450px;
  min-height: 532px;
}
.logo{
  width: 150px;
}
</style>
