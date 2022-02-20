<template lang="pug">
  .forget
    .forget__header(:style="{'backgroundImage': 'url(' + (DarkMode ? bgImage_night : bgImage_light) + ')'}")
      router-link(to="/login")
        i.el-icon-close
      p 忘记密码
    .forget__main(v-if="step === 1")
      .forget__main__title(:class='{"text-white":DarkMode}') STEP1 验证信息
      el-input.forget__main__input(placeholder="请输入手机或邮箱" v-model.trim="form.otpTarget")
      b-button.forget__main__button(pill @click="getOtp" :disabled="form.otpTarget === ''") 下一步
    .forget__main(v-else-if="step === 2")
      .forget__main__title(:class='{"text-white":DarkMode}') STEP2 身份验证
      .forget__main__remind 已发送验证码至手机 {{ form.otpTarget }}
      .forget__main__input
        el-input(type="tel" placeholder="请输入验证码" v-model.trim="form.otp")
        el-button.theme__button.button__position(v-if="!countDownWaiting" type="text" @click="getOtp") 发送验证码
        el-button.button__position(v-else type="text" disabled) {{ countDown }}秒后重发
      b-button.forget__main__button(pill @click="verifyCode" :disabled="form.otp === ''") 下一步
    el-form.forget__main(v-else :model="submitForm" ref="submitForm", :rules="submitFormRules", @validate="formValidate")
      .forget__main__title(:class='{"text-white":DarkMode}') STEP3 重置密码
      el-form-item.forget__main__input(prop="newPassword")
        el-input(:type="showPassword ? 'text' : 'password'" placeholder="请输入新密码" v-model.trim="submitForm.newPassword" v-validate.continues="'password'" name="password")
        i.fas.fa-eye.button__position(v-if="!showPassword" @click="showPassword = true")
        i.fas.fa-eye-slash.button__position(v-else @click="showPassword = false")
      el-form-item.forget__main__input(prop="checkPassword")
        el-input(:type="showCheckPassword ? 'text' : 'password'" placeholder="再次确认密码" v-model.trim="submitForm.checkPassword")
        i.fas.fa-eye.button__position(v-if="!showCheckPassword" @click="showCheckPassword = true")
        i.fas.fa-eye-slash.button__position(v-else @click="showCheckPassword = false")
      b-button.forget__main__button(pill @click="submit" :disabled="!checkFormValidate") 提交
</template>

<script>
import { mapState } from 'vuex';

let loop;
export default {
  data() {
    const check_NewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        const result = /^[a-zA-Z0-9_!@#$%^&*\-+=;:,.?~]{8,20}$/.test(value);
        if (!result) {
          callback(new Error('请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~'));
        }
        callback();
      }
    };
    const check_CheckPassword = (rule, value, callback) => {
      const result = /^[a-zA-Z0-9_!@#$%^&*\-+=;:,.?~]{8,20}$/.test(value);
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!result) {
        callback(new Error('请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~'));
      } else if (value !== this.submitForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      bgImage_light: `${window.CDN_ASSETS}/static/img/bluebg.png`,
      bgImage_night: `${window.CDN_ASSETS}/static/img/bluebg_night.png`,
      step: 1,
      showPassword: false,
      showCheckPassword: false,
      form: {
        otpTarget: '',
        otp: '',
      },
      submitForm: {
        otpTarget: '',
        otpCert: '',
        newPassword: '',
        checkPassword: '',
      },
      submitFormValidate: {
        newPassword: false,
        checkPassword: false,
      },
      submitFormRules: {
        newPassword: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { validator: check_NewPassword, trigger: ['blur', 'change'] },
        ],
        checkPassword: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { validator: check_CheckPassword, trigger: ['blur', 'change'] },
        ],
      },
      countDownWaiting: false,
      countDown: 0,
    };
  },
  methods: {
    formValidate(prop, status) {
      this.submitFormValidate[prop] = status;
    },
    getOtp() {
      this.$store.dispatch('member/API_ForgetPassOtp', this.form).then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.status === 1) {
          const time = new Date();
          const now = time.getTime();
          const expireTime = now + (1000 * 120);
          window.localStorage.setItem('Forget_accountCode', expireTime);
          window.localStorage.setItem('Forget_account', this.form.otpTarget);
          this.countDownWaiting = true;
          this.loopTime();
          this.step = 2;
          // this.$message({ message: res.data.data[0].otp, type: 'success' });
        }
      }).catch((err) => {
        this.$message({ message: err.response.data.message, type: 'error' });
      });
    },
    verifyCode() {
      this.$store.dispatch('member/API_ForgetPassCert', this.form).then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          // this.$message({ message: res.data.data[0].otp, type: 'success' });
          this.submitForm.otpTarget = this.form.otpTarget;
          this.submitForm.otpCert = res.data.data[0].otpCert;
          this.step = 3;
        }
      }).catch((err) => {
        this.$message({ message: err.response.data.message, type: 'error' });
        console.log(err.message);
      });
    },
    submit() {
      this.$store.dispatch('member/API_ForgetPassChange', this.submitForm).then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          this.$message({ message: '修改成功', type: 'success' });
          this.$router.push('/login').catch((err) => {});
        }
      }).catch((err) => {
        this.$message({ message: err.response.data.message, type: 'error' });
        console.log(err.response);
      });
    },
    loopTime(checktime = 120) {
      const vm = this;
      vm.countDown = checktime;
      vm.countDownWaiting = true;
      loop = setInterval(() => {
        vm.countDown -= 1;
        if (vm.countDown <= 0) {
          vm.countDownWaiting = false;
          window.localStorage.removeItem('Forget_account');
          clearInterval(loop);
        }
      }, 1000);
    },
  },
  computed: {
    ...mapState('index', [
      'DarkMode',
    ]),
    checkFormValidate() {
      if (Object.values(this.submitFormValidate).includes(false)) {
        return false;
      }
      return true;
    },
  },
  created() {
    clearInterval(loop);
  },
  beforeDestroy() {
    clearInterval(loop);
  },
  mounted() {
    const vm = this;
    const now = new Date().getTime();
    const expireTime = window.localStorage.getItem('Forget_accountCode');
    const checkTime = Math.floor((expireTime - now) / 1000);
    if (checkTime > 0) {
      vm.loopTime(checkTime);
    } else {
      vm.countDownWaiting = false;
      window.localStorage.removeItem('Forget_account');
      window.localStorage.removeItem('Forget_accountCode');
    }
  },
};
</script>

<style lang="scss" scoped>
.forget {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__header {
    font-size: $text-20;
    color: white;
    padding: $height-36 $width-24;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;

    a {
      position: absolute;
      left: $width-24;
      color: white;
      font-size: 8.4vw;
    }

    p {
      margin: 0;
    }
  }

  &__main {
    flex: 1;
    padding: $height-40 $width-28 0;
    text-align: center;

    &__title {
      font-size: $text-20;
      font-weight: 900;
      color: $navy_dark;
    }

    &__remind {
      margin-top: $height-24;
      color: $origin_dark;
      font-size: $text-16;
    }

    &__input {
      margin-top: $height-48;
      margin-bottom: $height-40;
      border-bottom: 2px solid $origin;
      position: relative;

      /deep/ input {
        background: transparent;
        border: none;
      }

      ::placeholder {
        color: $origin;
      }

      .theme__button {
        color: $theme;
      }

      i {
        color: $origin_light;
      }

      .button__position {
        position: absolute;
        top: 12px;
        right: 0px;
        padding: 0;
      }
    }

    &__button {
      width: 100%;
      padding: $width-16 0;
      margin-bottom: $height-32;
      font-size: $text-16;
      background-color: $theme;
      border: none;
    }
  }

  &__password {
    margin-bottom: $height-48;
    border-bottom: 2px solid white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    i {
      color: white;
      font-size: $text-16;
    }
  }
}
</style>
