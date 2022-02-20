<template lang="pug">
  div
    el-form.accountLogin
      el-form-item.accountLogin__account
        el-input.pl-2(placeholder="用户名：请输入5~15位半形英文、数字或下划线" v-model="memberForm.account" v-validate.continues="'account'" name="account")
        .error(v-if="errors.has('account')") {{ errors.first('account') }}
      el-form-item.accountLogin__password
        el-input.pl-2(placeholder="密碼：輸入8~20位半形英文、数字或特殊符号" :type="showPassword ? 'text' : 'password'" v-model="memberForm.password" v-validate.continues="'password'" name="password")
        i.fas.fa-eye(v-if="!showPassword" @click="showPassword = true")
        i.fas.fa-eye-slash(v-else @click="showPassword = false")
        .error(v-if="errors.has('password')") {{ errors.first('password') }}
      ImageVerify(@VerifySuccess='VerifySuccessEvent', @imageVerifyReset='imageVerifyReset', :verifyOK='imageVerify')
      .accountLogin__function
        router-link.accountLogin__function__forget(to="/forget") 忘记密码
      b-button.accountLogin__button(pill @click="submit" :disabled="!memberFormValidate") 登录
      .accountLogin__remind 还没有梦工厂帐号？
        router-link(to="/register") 注册帐号
</template>

<script>
import ImageVerify from '@/components/bl_ImageVerify/bl_ImageVerify.vue';

export default {
  components: {
    ImageVerify,
  },
  data() {
    return {
      showPassword: false,
      memberForm: {
        account: '',
        password: '',
      },
      imageVerify: false,
    };
  },
  methods: {
    submit() {
      const vm = this;
      const time = new Date();
      const now = time.getTime();
      const finger = window.localStorage.getItem('Finger');
      this.$store.dispatch('member/API_MemberLogin', ['account', {
        account: this.memberForm.account,
        password: this.memberForm.password,
        tryTime: now,
        rpc: `${finger}${now.toString()}`,
        version: process.env.VUE_APP_VERSION,
      }]).then((res) => {
        // 判斷是否有登入前的連結導向
        console.log(res);
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
      });
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
      if (this.$validator.errors.items.length > 0) {
        return false;
      } if (this.imageVerify === false) {
        return false;
      } if (this.memberForm.account === '' || this.memberForm.password === '') {
        return false;
      } 
      return true;
    },
  },
  beforeDestroy() {
    // 清除登入前的連結導向
    window.localStorage.removeItem('tempLink');
    window.localStorage.removeItem('tempOutsideLink');
    window.localStorage.removeItem('tempGameData');
  },
};
</script>

<style lang="scss" scoped>
.accountLogin {
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

  &__account {
    margin-bottom: $height-40;
    background-color: rgba(25, 25, 25, 0.48);
    color: white;
  }

  &__password {
    margin-bottom: $height-48;
    background-color: rgba(25, 25, 25, 0.48);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    i {
      color: white;
      font-size: $text-16;
    }
  }

  &__function {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: $height-40;
    color: white;
    font-size: $text-16;

    &__forget {
      color: $dw_yellow;
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
    font-size: $text-14;
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
