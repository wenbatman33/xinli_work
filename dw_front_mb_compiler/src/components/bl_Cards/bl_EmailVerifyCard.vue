<template lang="pug">
  .emailVerify
    .emailVerify__header 邮箱验证
      i.fas.i.fa.fa-headphones(onclick="LC_API.open_chat_window()")
    el-form.emailVerify__main
      .emailVerify__main__remind 确保您的资金安全，邮箱将是客服确认身份的重要凭证。
      el-form-item
        el-input.emailVerify__main__input(v-model="emailVerifyForm.email" placeholder="请输入邮箱" v-validate.continues="'EmailV'" name="email")
        .d-flex.justify-content-center
          .error(v-if="errors.has('email')") {{ errors.first('email') }}
      el-form-item
        el-input.emailVerify__main__input(type="tel" v-model="emailVerifyForm.otp" placeholder="请输入验证码")
        el-button.emailVerify__main__verifyBtn(type="text" @click="verifyCode" :disabled="countDownWaiting") {{countDownWaiting ? `${countDown} 秒后重发` : '发送验证码'}}
    b-button.emailVerify__button(type="text" @click="submit" :disabled="!emailVerifyFormValidate") 提交绑定
</template>

<script>
let loop;
export default {
  data() {
    return {
      emailVerifyForm: {
        email: '',
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
          this.$store.dispatch('member/API_MemberChangeEmailOtp', {'email': vm.emailVerifyForm.email }).then((res) => {
            vm.$message({ message: res.data.data[0].otp, type: 'success' });
            if (res.status === 200 && res.data.status === 1) {
              const time = new Date();
              const now = time.getTime();
              const expireTime = now + (1000 * 120);
              window.localStorage.setItem('Verify_emailVerifyCode', expireTime);
              window.localStorage.setItem('Verify_email', vm.emailVerifyForm.email);
              vm.countDownWaiting = true;
              vm.loopTime();
            } else {
              vm.$message({ message: res.message, type: 'error' });
            }
          }).catch((err) => {
            console.log(err.response);
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
          window.localStorage.removeItem('Verify_email');
          clearInterval(loop);
        }
      }, 1000);
    },
    submit() {
      this.$store.dispatch('member/API_MemberChangeEmail', this.emailVerifyForm).then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          this.$message({ message: '验证成功', type: 'success' });
          this.countDownWaiting = false;
          this.emailVerifyForm.email = '';
          this.emailVerifyForm.otp = '';
          window.localStorage.removeItem('Verify_email');
          window.localStorage.removeItem('Verify_emailVerifyCode');
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
    emailVerifyFormValidate() {
      if (this.$validator.errors.items.length > 0 || this.emailVerifyForm.otp === '') {
        return false;
      } else if (this.emailVerifyForm.email === '' || this.emailVerifyForm.otp === '') {
        return false;
      } else {
        return true;
      };
    },
  },
}
</script>

<style lang="scss" scoped>
.emailVerify {

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
  top: -15px;
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
