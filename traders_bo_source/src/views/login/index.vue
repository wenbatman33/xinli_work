<template lang="pug">
  .login-container
    el-form.login-form(ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="on" label-position="left")
      .title-container
        //- img(v-if="logo" :src="logo" style="width: 450px;" )
        h1.text-white.text-center HePay 後台
      el-form-item(prop="account")
        span.svg-container
          svg-icon(icon-class="user")
        el-input(ref="account" v-model="loginForm.account" placeholder="account" name="account" type="text" tabindex="1" auto-complete="on")
      el-form-item(prop="password")
        span.svg-container
          svg-icon(icon-class="password")
        el-input(:key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin")
          span.show-pwd(@click="showPwd")
            svg-icon(:icon-class="passwordType === 'password' ? 'eye' : 'eye-open'")
      el-button.px5(:loading="loading" type="primary" style="width:100%;margin-top:30px;" @click.native.prevent="handleLogin") Login
</template>

<script>
import { validAccount, validPassword } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    const validateaccount = (rule, value, callback) => {
      if (!validAccount(value)) {
        callback(new Error('請输入A-Z, a-z, 0-9、5~15字符'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error('請输入8～20位数的字母和数字组成、不含特殊符号'))
      } else {
        callback()
      }
    }
    return {
      logo: (this.$store.state.settings.logo2) ? window.location.href.replace(this.$route.fullPath, '') + '/' + this.$store.state.settings.logo2 : '',
      loginForm: {
        account: 'ahaiyang',
        password: 'pdG2qdvfRw'
      },
      loginRules: {
        account: [
          { required: true, trigger: 'blur', validator: validateaccount }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        valid = true
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(res => {
              console.log(res)
              this.$message({ message: '登入成功', type: 'success' })
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch((err) => {
              this.$message.error({ message: err[0], duration: 1500 })
              this.loading = false
            })
        } else {
          console.log('登入失敗')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
