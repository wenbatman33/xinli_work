<template lang="pug">
  .container-fluid.px-0
    #reset-page.d-flex.flex-column.justify-content-center.align-items-center(v-if="canReset")
      h3.title 重设密码
      el-form(:model="resetData", ref="resetForm", :rules="rules")
        el-form-item(prop="account")
          el-input(
            v-model.trim="resetData.account",
            ref="account",
            tabindex="1",
            autocomplete="on",
            prefix-icon="el-icon-user-solid",
            placeholder="帐号",
            @keyup.enter.native="$refs.email.focus()"
          )
        el-form-item(prop="email")
          el-input(
            v-model.trim="resetData.email",
            ref="email",
            tabindex="2",
            prefix-icon="el-icon-message",
            placeholder="email",
            @keyup.enter.native="$refs.password.focus()"
          )
        el-form-item(prop="password")
          el-input(
            v-model.trim="resetData.password",
            ref="password",
            tabindex="2",
            :type="passwordType",
            prefix-icon="el-icon-message",
            placeholder="新密码",
            @keyup.enter.native="$refs.check.focus()"
          )
            .reset__icon--center(slot="suffix")
              i.el-icon-view.mx-1(
                v-if="resetData.password.length",
                :class="{'text-success': passwordType === 'text'}"
                @mousedown="showPassword('password')",
                @mouseup="hidePassword('password')"
              )
        el-form-item(prop="check")
          el-input(
            v-model="resetData.check",
            ref="check",
            tabindex="4",
            :type="checkType",
            prefix-icon="el-icon-lock",
            placeholder="再次输入新密码",
            @keyup.enter.native="handleReset"
          )
            .reset__icon--center(slot="suffix")
              i.el-icon-view.mx-1(
                v-if="resetData.password.length",
                :class="{'text-success': checkType === 'text'}"
                @mousedown="showPassword('check')",
                @mouseup="hidePassword('check')"
              )
        el-alert.mb-2(
          v-if="error",
          title="重设密码失败",
          :description="error",
          type="error",
          effect="dark",
          show-icon,
          :closable="false"
        )
        el-button(type="warning", @click="handleReset") 送出
    .d-flex.justify-content-center.align-items-center.vw-100.vh-100(v-else)
      h1(v-if="errorMessage") {{ errorMessage }}
        el-link.text-primary.mx-2(@click="goToLoginPage()") 返回登入页
</template>

<script>
import { resetPasswordAPI, checkResetKeyAPI } from '@/api/auth';

export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value !== this.resetData.password) {
        callback(new Error('两次密码不一致'));
      } else {
        callback();
      }
    }

    return {
      resetData: {
        account: '',
        email: '',
        password: '',
        check: '',
        key: ''
      },
      passwordType: 'password',
      checkType: 'password',
      rules: {
        account: [{ required: true, message: '请输入帐号' }],
        email: [{ required: true, message: '请输入信箱' }],
        password: [
          { required: true, message: '請填寫原密碼' },
          { min: 8, max: 20, message: '长度限制为 8 - 20 个字元', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_!@#$%^&*-+=;:,.?~]{8,20}$/, message: '含有非法字元', trigger: 'blur' },
        ],
        check: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度限制为 8 - 20 个字元', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ]
      },
      error: '',
      redirect: undefined,
      usernameNoticeVisible: false,
      canReset: false,
      errorMessage: '',
    };
  },
  created() {
    const key = this.$route.query.key
    if (key) {
      checkResetKeyAPI({ key }).then(() => {
        this.canReset = true;
      }, error => {
        this.errorMessage = error.response.data.message;
      });
    } else {
      this.goToLoginPage();
    }
  },
  methods: {
    goToLoginPage() {
      this.$router.push('/login');
    },
    handleReset() {
      this.error = '';
      this.$refs.resetForm.validate(valid => {
        if (! valid) return false;

        resetPasswordAPI({
          key: this.$route.query.key,
          account: this.resetData.account,
          email: this.resetData.email,
          newPassword: this.resetData.password,
          checkPassword: this.resetData.check
        }).then(() => {
          this.$message.success('密码更新成功...请重新登入');
          this.goToLoginPage();
        }, error => {
          this.resetData.password = '';
          this.resetData.check = '';
          this.$refs.password.focus();

          this.error = error.response.data.message;

          if (! this.error) {
            this.error = '系统忙碌中或错误，请稍后再试或联系相关人员！';
          }
        })
      });
    },
    showPassword(key) {
      this[`${key}Type`] = 'text'
    },
    hidePassword(key) {
      this[`${key}Type`] = 'password';
      this.$nextTick(() => {
        this.$refs[key].focus();
      });
    },
  }
};
</script>

<style lang="scss" scoped>
#reset-page {
  height: 100vh;
  width: 100%;
  background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
  background-size: 400% 400%;
  animation: Gradient 5s ease infinite;
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

  .reset__icon--center {
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
#reset-page {
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
}

@keyframes Gradient {
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
}
</style>
