<template lang="pug">
  .container-fluid.px-0
    #login-page.d-flex.flex-column.justify-content-center.align-items-center
      transition(name="fade", mode="out-in", @afterEnter="focusInput()")
        div(v-if="sendResetPasswordVisible", key="sendResetPassword")
          h3.title 忘记密码
          el-form(:model="resetData", ref="resetForm", :rules="resetRules")
            el-form-item(prop="account")
              el-input(
                placeholder="请输入帐号",
                prefix-icon="el-icon-user-solid",
                v-model.trim="resetData.account",
                tabindex="1"
                autocomplete="on",
                ref="account",
                @keyup.enter.native="$refs.email.focus()",
              )
            el-form-item(prop="email")
              el-input(
                placeholder="请输入Email",
                prefix-icon="el-icon-message",
                v-model.trim="resetData.email",
                ref="email",
                tabindex="2",
                @keyup.enter.native="sendResetMail()"
              )
            el-alert.mb-2(
              v-if="sendError",
              title="发送失败",
              :description="sendError",
              type="error",
              effect="dark",
              show-icon,
              :closable="false"
            )
            el-button(type="info", @click="sendResetMail()", :disabled="sendButtonDisabled") 发送重设密码信
            .text-right.mt-3
              el-link.text-primary(
                type="primary",
                :underline="false",
                @click="BackLoginForm()"
              ) 返回登入
        div(v-else, key="login")
          el-alert.mb-3(
            v-if="onHttp",
            title="请使用 HTTPS 连线",
            description="需要验证您的 Email",
            type="error",
            effect="dark",
            show-icon,
            :closable="false"
          )
          h3.title 后台系统登入
          el-form(:model="loginData", ref="loginForm", :rules="rules")
            el-form-item(prop="account")
              el-tooltip(placement="left", content="是帐号不是信箱喔！", effect="light", :manual="true", v-model="usernameNoticeVisible")
                el-input(
                  v-model.trim="loginData.account",
                  ref="account",
                  tabindex="1"
                  autocomplete="on",
                  prefix-icon="el-icon-user-solid",
                  placeholder="帐号",
                  @keyup.enter.native="$refs.password.focus()",
                  @keyup.native="checkUsername"
                )
            el-form-item(prop="password")
              el-input(
                v-model="loginData.password",
                ref="password",
                tabindex="2",
                :type="passwordType",
                prefix-icon="el-icon-lock",
                placeholder="密码",
                @keyup.enter.native="handleLogin",
                @keyup.native="checkCapslock"
              )
                .login__icon--center(slot="suffix")
                  i.el-icon-upload2.mx-1(v-if="capslock")
                  i.el-icon-view.mx-1(
                    v-if="loginData.password.length",
                    :class="{'text-success': passwordType === 'text'}"
                    @mousedown="showPassword",
                    @mouseup="hidePassword"
                  )
            el-alert.mb-2(
              v-if="error",
              title="登入失败",
              :description="error",
              type="error",
              effect="dark",
              show-icon,
              :closable="false"
            )
            el-button(type="info", @click="handleLogin") 登入
            .text-right.mt-3
              el-link.text-primary(type="primary", :underline="false", @click="forgetPassword()") 忘记密码？
</template>

<script>
import { loginAPI, GoogleLoginAPI, sendResetPasswordMailAPI } from '@/api/auth';

export default {
  data() {
    const validateEmail = (rule, value, callback) => {
      this.emailReg.test(this.resetData.email) ? callback(): callback(new Error('Email 格式错误'));
    }

    return {
      // eslint-disable-next-line
      emailReg: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      loginData: {
        account: '',
        password: ''
      },
      passwordType: 'password',
      capslock: false,
      rules: {
        account: [{ required: true, trigger: 'submit', message: '请输入帐号' }],
        password: [{ required: true, trigger: 'submit', message: '请输入密码' }]
      },
      error: '',
      redirect: undefined,
      usernameNoticeVisible: false,
      onHttp: false,
      sendResetPasswordVisible: false,
      resetData: {
        account: '',
        email : ''
      },
      resetRules: {
        account: [{ required: true, trigger: 'submit', message: '请输入帐号' }],
        email: [
          { required: true, trigger: 'submit', message: '请输入Email' },
          { validator: validateEmail, trigger: 'blur' }
        ],
      },
      sendError: '',
      sendButtonDisabled: false,
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.focusInput();

    if (location.protocol !== 'https:') {
      this.onHttp = true;
    }
  },
  methods: {
    handleLogin() {
      this.error = '';
      this.$refs.loginForm.validate(valid => {
        if (! valid) return false;
        loginAPI(this.loginData).then(() => {
          window.localStorage.clear();
          this.$message.success('帐号密码已确认, Email 验证中...');
          this.handleGoogleLogin();
        }, error => {
          this.loginData.password = '';
          this.$refs.password.focus();

          this.error = error.response.data.message;
        })
      });
    },
    handleGoogleLogin() {
      this.$gAuth.signIn(function(googleOAuthData) {
        GoogleLoginAPI({ access_token: googleOAuthData.getAuthResponse().access_token}).then(() => {
          window.localStorage.setItem('userEmail', googleOAuthData.getBasicProfile().getEmail());
          window.localStorage.setItem('username', this.loginData.account);
          this.$router.push({ path: this.redirect || '/' });
        }, error => {
          if (error.response.data && error.response.data.code === 4004) {
            this.error = '二阶段验证错误！ 使用者 Email 与 Google Email 不符';
          }
        })
      }.bind(this)).catch(() => {
        this.error = '二阶段验证错误! 请验证 Gmail (请勿封锁弹跳视窗);';
      });
    },
    checkCapslock({ key, shiftKey }) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capslock = true
        } else {
          this.capslock = false
        }
      }
      if (key === 'CapsLock' && this.capslock === true) {
        this.capslock = false
      }
    },
    showPassword() {
      this.passwordType = 'text';
    },
    hidePassword() {
      this.passwordType = 'password';
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    checkUsername() {
      this.usernameNoticeVisible = this.emailReg.test(this.loginData.account);
    },
    forgetPassword() {
      this.sendResetPasswordVisible = true;
    },
    sendResetMail() {
      this.sendError = '';
      this.$refs.resetForm.validate(valid => {
        if (valid) {
          const data = {
            addr: window.location.origin + '/ResetPass?key=',
            ...this.resetData
          }

          sendResetPasswordMailAPI(data)
          .then(() => {
            this.$message.success('重设密码信已成功发送！')
          }, error => {
            this.sendError = error.response.data.message;
            this.sendError = this.sendError || '系统忙碌中或错误，请稍后再试或联系相关人员！';
          })
          .finally(() => {
            this.sendButtonDisabled = true;
            setTimeout(() => {
              this.sendButtonDisabled = false;
            }, 1000);
          })
        }
      })
    },
    BackLoginForm() {
      this.$refs.resetForm.resetFields();
      this.sendResetPasswordVisible = false;
    },
    focusInput() {
      if (this.sendResetPasswordVisible) {
        this.$refs.account.focus();
      } else {
        this.loginData.account = window.localStorage.getItem('username');

        if (this.loginData.account) {
          this.$refs.password.focus();
        } else {
          this.$refs.account.focus();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#login-page {
  height: 100vh;
  // background-color: #2d3a4b;
  background: #092756;
  background: -moz-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%),-moz-linear-gradient(top,  rgba(57,173,219,.25) 0%, rgba(42,60,87,.4) 100%), -moz-linear-gradient(-45deg,  #670d10 0%, #092756 100%);
	background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -webkit-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -webkit-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
	background: -o-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -o-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -o-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
	background: -ms-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -ms-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -ms-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
	background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), linear-gradient(to bottom,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), linear-gradient(135deg,  #670d10 0%,#092756 100%);
  .logo {
    width: 100%;
    text-align: center;
    img {
      width: 20vw;
      min-width: 200px;
      height: auto;
    }
  }

  .title {
    font-size: 1.8em;
    color: #eee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .el-form {
    width: 540px;
  }

  .login__icon--center {
    line-height: 50px;
  }

  .el-button {
    width: 100%;
  }
}

.box-card {
  width: 100%;
  text-align: center;
  line-height: 40px;
}
</style>

<style lang="scss">
#login-page {
  .el-input {
    height: 50px;
    display: inline-block;
    input {
      border: 0px;
      color: #fff;
      background-color: transparent;
      height: 50px;
      padding: 12px 5px 12px 35px;
      &:focus {
        box-shadow: inset 0 -5px 45px rgba(100,100,100,0.4), 0 1px 1px rgba(255,255,255,0.2);
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .6s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .fade-enter {
    transform: translateX(231px);
  }

  .fade-leave-active {
    transform: translateX(-231px)
  }
}
</style>
