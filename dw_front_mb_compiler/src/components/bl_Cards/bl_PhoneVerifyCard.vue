<template lang="pug">
  .phoneVerify
    .phoneVerify__header 手机验证
      i.fas.i.fa.fa-headphones(onclick="LC_API.open_chat_window()")
    el-form.phoneVerify__main
      .phoneVerify__main__remind 请先绑定您的手机！确保您的资金安全，手机号将是客服确认身份的重要凭证。
      el-form-item
        el-input.phoneVerify__main__input(type="tel" maxlength="11" v-model.number="phoneVerifyForm.phone" placeholder="请输入手机号" v-validate.continues="'phone'" name="phone")
        .d-flex.justify-content-center
          .error(v-if="errors.has('phone')") {{ errors.first('phone') }}
      el-form-item
        el-input.phoneVerify__main__input(type="tel" v-model="phoneVerifyForm.otp" placeholder="请输入验证码")
        el-button.phoneVerify__main__verifyBtn(type="text" @click="verifyCode" :disabled="countDownWaiting") {{countDownWaiting ? `${countDown} 秒后重发` : '发送验证码'}}
    b-button.phoneVerify__button(type="text" @click="submit" :disabled="!phoneVerifyFormValidate") 提交绑定
</template>

<script>
let loop;
export default {
  data() {
    return {
      phoneVerifyForm: {
        phone: '',
        otp: '',
      },
      countDownWaiting: false,
      countDown: 0,
    };
  },
  methods: {
    verifyCode() {
      const vm = this;
      this.$validator.validate().then((result) => {
        if (result) {
          this.$store.dispatch('member/API_MemberChangePhoneOtp', {'phone': vm.phoneVerifyForm.phone }).then((res) => {
            vm.$message({ message: res.data.data[0].otp, type: 'success' });
            if (res.status === 200 && res.data.status === 1) {
              const time = new Date();
              const now = time.getTime();
              const expireTime = now + (1000 * 120);
              window.localStorage.setItem('Verify_phoneVerifyCode', expireTime);
              window.localStorage.setItem('Verify_phone', vm.phoneVerifyForm.phone);
              vm.countDownWaiting = true;
              vm.loopTime();
            } else {
              vm.$message({ message: res.message, type: 'error' });
            }
          }).catch((err) => {
            console.log(err.response);
            this.$message({ message: err.response.data.message, type: 'error' });
          })
        } else {
          return;
        }
      })
    },
    loopTime(checktime = 120) {
      const vm = this;
      vm.countDown = checktime;
      vm.countDownWaiting = true;
      loop = setInterval(() => {
        vm.countDown -= 1;
        if (vm.countDown <= 0) {
          vm.countDownWaiting = false;
          window.localStorage.removeItem('Verify_phone');
          clearInterval(loop);
        }
      }, 1000);
    },
    submit() {
      this.$store.dispatch('member/API_MemberChangePhone', this.phoneVerifyForm).then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          this.$message({ message: '验证成功', type: 'success' });
          this.countDownWaiting = false;
          this.phoneVerifyForm.phone = '';
          this.phoneVerifyForm.otp = '';
          window.localStorage.removeItem('Verify_phone');
          window.localStorage.removeItem('Verify_phoneVerifyCode');
          clearInterval(loop);
          this.$store.dispatch('index/setCardOpen', false);
          this.$store.dispatch('member/API_MemberDetail');
        }
      }).catch((err) => {
        console.log(err.response);
        this.$message({ message: '验证码错误', type: 'error' });
      });
    }
  },
  computed: {
    phoneVerifyFormValidate() {
      if (this.$validator.errors.items.length > 0 || this.phoneVerifyForm.otp === '') {
        return false;
      } else if (this.phoneVerifyForm.phone === '' || this.phoneVerifyForm.otp === '') {
        return false;
      } else {
        return true;
      };
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
    const expireTime = window.localStorage.getItem('Verify_phoneVerifyCode');
    const checkTime = Math.floor((expireTime - now) / 1000);
    if (checkTime > 0) {
      vm.loopTime(checkTime);
      this.phoneVerifyForm.phone = window.localStorage.getItem('Verify_phone');
    } else {
      vm.countDownWaiting = false;
      window.localStorage.removeItem('Verify_phoneVerifyCode');
      window.localStorage.removeItem('Verify_phone');
    }
  }
}
</script>

<style lang="scss" scoped>
.phoneVerify {

  /deep/ .el-form-item {
    margin: 0;
  }

  &__header {
    font-size: $text-20;
    font-weight: bold;
    color: $card-title;
    padding: $width-24 0;
    border-bottom: 1px solid $origin-light;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      position: absolute;
      right: $width-24;
      color: $origin;
    }
  }

  &__main {
    padding: $width-28 $width-24 0;

    &__remind {
      font-size: $text-16;
      color: $origin_darkest;
      margin-bottom: $height-40;
    }

    &__input {
      color: $origin;
      border: 1px solid $origin;
      border-radius: 4px;
      margin-bottom: $height-40;
      font-size: $text-16;
      position: relative;

      /deep/ input {
        border: none;
        font-size: $text-16;
      }

      ::placeholder {
        color: $origin;
      }
    }

    &__verifyBtn {
      position: absolute;
      right: $width-12;
      color: $theme;
      font-size: $text-14;
    }
  }

  &__button {
    width: 100%;
    display: block;
    text-align: center;
    padding: $width-20 0;
    background-color: $theme;
    color: white;
    position: absolute;
    bottom: 0;
    font-size: $text-20;
    text-decoration: none;
  }
}

.error {
  position: absolute;
  background-color: black;
  color: white;
  opacity: 0.7;
  padding: 8px 16px;
  border-radius: 5px;
  top: 5vh;
  font-size: 14px;
  line-height: normal;
}

.btn {
  opacity: 1 !important;
  border: none;
  border-radius: 0;
}

.disabled {
  background-color: $origin_dark !important;
  color: white;
}

</style>
