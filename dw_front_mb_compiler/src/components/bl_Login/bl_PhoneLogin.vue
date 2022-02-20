<template lang="pug">
  div
    el-form.phoneLogin(v-if="errorTimes < 3")
      el-form-item.phoneLogin__phone
        el-input.pl-2(placeholder="请输入手机号" type="tel" v-model.number="memberForm.phoneNumber" v-validate.continues="'phone'" name="phone")
        .error(v-if="errors.has('phone')") {{ errors.first('phone') }}
      el-form-item.phoneLogin__verifycode
        el-input.pl-2(type="tel" maxlength="11" placeholder="请输入验证码" v-model="memberForm.verifyCode")
        el-button.pr-2.phoneLogin__verifycode__button(v-if="!countDownWaiting" type="text" @click="verifyCode") 发送验证码
        el-button.pr-2.phoneLogin__verifycode__button(v-else type="text" @click="verifyCode" disabled) {{ countDown }}秒后重发
      ImageVerify(@VerifySuccess='VerifySuccessEvent', @imageVerifyReset='imageVerifyReset', :verifyOK='imageVerify')
      .phoneLogin__function
        router-link.phoneLogin__function__forget(to="/forget") 忘记密码
      b-button.phoneLogin__button(pill @click="submit" :disabled="!memberFormValidate") 登录
      .phoneLogin__remind 还没有梦工厂帐号？
        router-link(to="/register") 注册帐号
</template>

<script>
import axios from 'axios';
import ImageVerify from '@/components/bl_ImageVerify/bl_ImageVerify.vue';

let loop;
export default {
  components: {
    ImageVerify,
  },
  data() {
    return {
      keepLogin: false,
      memberForm: {
        phoneNumber: '',
        verifyCode: '',
      },
      countDownWaiting: false,
      countDown: 0,
      errorTimes: 0,
      imageVerify: false,
    };
  },
  methods: {
    verifyCode() {
      const vm = this;
      this.$validator.validate().then((result) => {
        if (result) {
          const api = `${window.APIHOST}/api/Member/LoginOtp`;
          const payload = {};
          payload.phone = vm.memberForm.phoneNumber;
          axios.post(api, payload).then((res) => {
            if (res.data.status === 1) {
              this.memberForm.verifyCode = res.data.data[0].otp; // for 測試用
              const time = new Date();
              const now = time.getTime();
              const expireTime = now + (1000 * 120);
              window.localStorage.setItem('Login_phoneVerifyCode', expireTime);
              window.localStorage.setItem('Login_phone', vm.memberForm.phoneNumber);
              vm.countDownWaiting = true;
              vm.loopTime();
            }
          }).catch((error) => {
            vm.imageVerifyReset();
            vm.$message({ message: error.response.data.errors.phone[0], type: 'error' });
          });
        } else {
          
        }
      }).catch((error) => {
        console.log(error.response);
      });
    },
    submit() {
      const vm = this;
      const time = new Date();
      const now = time.getTime();
      const finger = window.localStorage.getItem('Finger');
      this.$store.dispatch('member/API_MemberLogin', ['phone', {
        phone: this.memberForm.phoneNumber,
        otp: this.memberForm.verifyCode,
        tryTime: now,
        rpc: `${finger}${now.toString()}`,
        version: process.env.VUE_APP_VERSION,
      }]).then((res) => {
        vm.errorTimes = 0;
        // 判斷是否有登入前的連結導向
        if (window.localStorage.tempLink) {
          this.$router.push(window.localStorage.tempLink).catch((err) => {});
          window.localStorage.removeItem('tempLink');
        } else if (window.localStorage.tempOutsideLink) {
          window.open(window.localStorage.tempOutsideLink, '_blank');
          this.$router.push('/');
          window.localStorage.removeItem('tempOutsideLink');
        } else if (window.localStorage.tempGameData) {
          const gameData = JSON.parse(window.localStorage.tempGameData);
          this.$router.push('/');
          this.$store.dispatch('games/GameLogin', gameData);
          window.localStorage.removeItem('tempGameData');
        } else {
          this.$router.push('/').catch((err) => {});
        }
      }).catch((err) => {
        vm.imageVerifyReset();
        vm.$message({ message: err.response.data.message, type: 'error' });
        vm.errorTimes += 1;
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
          clearInterval(loop);
        }
      }, 1000);
    },
    VerifySuccessEvent() {
      const vm = this;
      vm.imageVerify = true;
    },
    imageVerifyReset() {
      const vm = this;
      vm.imageVerify = false;
    },
  },
  computed: {
    memberFormValidate() {
      if (this.$validator.errors.items.length > 0 || this.memberForm.verifyCode === '') {
        return false;
      } if (this.imageVerify === false) {
        return false;
      } if (this.memberForm.phoneNumber === '' || this.memberForm.verifyCode === '') {
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
    // 清除登入前的連結導向
    window.localStorage.removeItem('tempLink');
    window.localStorage.removeItem('tempOutsideLink');
    window.localStorage.removeItem('tempGameData');
  },
  mounted() {
    const vm = this;
    const now = new Date().getTime();
    const expireTime = window.localStorage.getItem('Login_phoneVerifyCode');
    const checkTime = Math.floor((expireTime - now) / 1000);
    if (checkTime > 0) {
      vm.loopTime(checkTime);
    } else {
      vm.countDownWaiting = false;
      window.localStorage.removeItem('Login_phone');
      window.localStorage.removeItem('Login_phoneVerifyCode');
    }
  },
};
</script>

<style lang="scss" scoped>
.phoneLogin {
  /deep/ input {
    border: none;
    padding: $width-16 0;
    font-size: $text-16;
    height: auto;
    line-height: unset;
    background: none;
    color: white;
  }

  /deep/ .el-form-item__content {
    display: flex;
    align-items: center;
    width: 100%;
    line-height: unset;
  }

  &__phone {
    margin-bottom: $height-40;
    background-color: rgba(25, 25, 25, 0.48);
    color: white;
  }

  &__verifycode {
    margin-bottom: $height-48;
    background-color: rgba(25, 25, 25, 0.48);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__button {
      color: $dw_yellow;
    }

    button {
      font-size: $text-14;
    }
  }

  &__function {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: $height-40;
    color: white;
    font-size: $text-16;

    &__keep {
      span {
        margin-left: 6px;
      }
    }

    &__forget {
      color: $dw_yellow;
    }
  }

  &__button {
    width: 100%;
    padding: $width-16 0;
    font-size: $text-16;
    margin-bottom: $height-32;
    background-color: $theme_dark;
    border: none;
  }

  &__remind {
    font-size: $text-14;
    color: white;
    padding-bottom: 7vh;

    a {
      color: $dw_yellow;
    }
  }

  ::placeholder {
    color: $origin_darkest;
  }
}

.active {
  color: $theme_dark;
}

.inactive {
  color: $origin_dark;
}

.error {
  position: absolute;
  background-color: black;
  color: white;
  width: 100%;
  opacity: 0.7;
  padding: 8px 16px;
  border-radius: 5px;
  top: 45px;
  font-size: 14px;
  line-height: normal;
}
</style>
