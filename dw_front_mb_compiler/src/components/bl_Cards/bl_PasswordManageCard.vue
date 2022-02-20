<template lang="pug">
  .passwordManage
    .passwordManage__header 密码管理
      i.fas.i.fa.fa-headphones(onclick="LC_API.open_chat_window()")
    el-form.passwordManage__main(:model="changePasswordForm", ref="changePasswordForm", :rules="changePasswordFormRules" @validate="formValidate")
      .passwordManage__main__remind 确保您的资金安全，邮箱将是客服确认身份的重要凭证。
      el-form-item.passwordManage__main__input(prop="password")
        el-input(v-model="changePasswordForm.password" placeholder="当前密码" type="password")
      el-form-item.passwordManage__main__input(prop="newPassword")
        el-input(v-model="changePasswordForm.newPassword" placeholder="请输入新密码" type="password")
      el-form-item.passwordManage__main__input(prop="checkPassword")
        el-input(v-model="changePasswordForm.checkPassword" placeholder="请确认密码" type="password")
    el-button.passwordManage__button(type="text" @click="submit" :disabled="!checkFormValidate") 提交绑定
</template>

<script>
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
      } else if (value !== this.changePasswordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      changePasswordForm: {
        password: '',
        newPassword: '',
        checkPassword: '',
      },
      changePasswordFormValidate: {
        password: false,
        newPassword: false,
        checkPassword: false,
      },
      changePasswordFormRules: {
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          {
            min: 8, max: 20, message: '请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~', trigger: ['blur', 'change'],
          },
        ],
        newPassword: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { validator: check_NewPassword, trigger: ['blur', 'change'] },
        ],
        checkPassword: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { validator: check_CheckPassword, trigger: ['blur', 'change'] },
        ],
      },
    };
  },
  methods: {
    formValidate(prop, status) {
      this.changePasswordFormValidate[prop] = status;
    },
    submit() {
      this.$store.dispatch('member/API_MemberChangePassword', this.changePasswordForm).then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          this.changePasswordForm.password = '';
          this.changePasswordForm.newPassword = '';
          this.changePasswordForm.checkPassword = '';
          this.$store.dispatch('index/setCardOpen', false);
          this.$message({ message: '密碼更新成功', type: 'success' });
        } else {
          this.$message({ message: res.message, type: 'error' });
        }
      }).catch((err) => {
        console.log(err);
      });
    },
  },
  computed: {
    checkFormValidate() {
      if (Object.values(this.changePasswordFormValidate).includes(false)) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.passwordManage {

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
      margin-bottom: $height-40;
      font-size: $text-16;

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

/deep/ .el-button {
  border-radius: 0px;
}

/deep/ .is-disabled {
  background-color: $origin_dark !important;
  color: white !important;
}
</style>
