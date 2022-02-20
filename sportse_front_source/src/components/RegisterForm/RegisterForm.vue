<template lang='pug'>
.col-12.text-center.pt-3
  .F_CENTER.py-3.pt-5
    h2.text-white
      img.logo(:src='logo_v')
  .registerForm.px-5(v-if='!registerSucces')
    h2.text-white 註冊
    el-form.mt-3(:model='registerForm', ref='registerForm', @submit.native.prevent='register("registerForm")')
      el-form-item
        el-input(v-model='registerForm.account'  placeholder='請輸入您的帳號')
      el-form-item
        el-input(v-model='registerForm.password', type='password', placeholder='請輸入您的密碼')
      el-form-item
        el-input(v-model='registerForm.agency_code' placeholder='請輸入邀請碼')
      el-form-item
        .F_START.text-white.text-left.tip.px-2
            | 點擊註冊即代表您已年滿18歲，
            br
            | 並同意我們的隱私權政策與網站服務條款
      el-form-item.my-1
        el-button.w-100(type='primary', native-type='submit', :disabled='registerFormValidate==false') 立即註冊
      p.my-3 
        router-link.T_Color_1(to='/login') 已有帳號？馬上登錄

  .registerSucces(v-else)
    .p-3
      img.succesImg(:src='succesImg')
      h2.my-2.title 註冊成功
      p.my-2 歡迎加入 感受賽事刺激
      router-link.T_Color_1(to='/') 
        el-button.w-100(type='primary') 全部賽事
</template>

<script>
export default {
  name: 'registerForm',
  watch: {
    registerForm: {
      handler(val) {
        const vm = this;
        if (vm.registerForm.account !== '' &&
          vm.registerForm.password !== '' &&
          vm.registerForm.agency_code !== '') {
          this.registerFormValidate = true;
        } else {
          this.registerFormValidate = false;
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      logo_v: '/static/img/logo_v.png',
      registerFormValidate: false,
      registerSucces: false,
      registerForm: {
        account: '',
        password: '',
        agency_code: '',
        rpc: '',
      },
      succesImg: '/static/img/sporeSE-man.png',
    };
  },
  methods: {
    upper(e) {
      e.target.value = e.target.value.toUpperCase();
    },
    register(form) {
      const vm = this;
      if (this.registerFormValidate) {
        this.$store.dispatch('member/signUp', this[form])
          .then((res) => {
            if (res.status === 200) {
              vm.login(form);
            }
          });
      }
    },
    login(form) {
      const vm = this;
      this.$store.dispatch('member/login', this[form])
        .then((res) => {
          // vm.$message({ message: '註冊成功', type: 'success', showClose: true });
          this.registerSucces = true;
          if (this.saveLoginForm) window.localStorage.setItem('loginData', JSON.stringify(this[form]));
          // this.$router.push('/');
        });
    },
  },
};
</script>
<style lang='scss' scoped>
.registerForm{
  margin: auto;
  max-width: 450px;
  min-height: 532px;
  border-radius: 12px;
}
.tip{
  font-size: 10px;
  line-height: 1.2;
}
.registerSucces{
  margin: auto auto;
  margin-top: 100px;
  width: 100%;
  max-width: 300px;
  height: 320px;
  border-radius: 24px;
  background-color: #ffffff;
  .title{
    color: $Color_1;
  }
}
.succesImg{
  width: 200px;
  margin-top: -120px;
}
.logo{
  width: 150px;
}
</style>
