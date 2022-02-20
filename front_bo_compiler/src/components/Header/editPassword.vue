<template lang="pug">
  div
    h3.mb-3.text-center 修改密码
    el-form(:model="editPasswordData", ref="editPasswordForm", label-width="100px", :rules="rules")
      el-form-item(label="原密码", prop="password")
        el-input(
          ref="password",
          v-model="editPasswordData.password",
          type="password",
          show-password,
          placeholder="请输入原密码",
          @keyup.enter.native="$refs.newPassword.focus()",
        )
      el-form-item(label="新密码", prop="newPassword")
        el-input(
          ref="newPassword",
          v-model="editPasswordData.newPassword",
          type="password",
          show-password,
          placeholder="请输入新密码",
          @keyup.enter.native="$refs.checkPassword.focus()",
        )
      el-form-item(label="确认新密码", prop="checkPassword")
        el-input(
          ref="checkPassword",
          v-model="editPasswordData.checkPassword",
          type="password",
          show-password,
          placeholder="请再次輸入新密码",
          @keyup.enter.native="handleEditPassword()",
        )
    el-alert.mb-3(
      v-if="editPasswordErrorMessage",
      type="error",
      :title="editPasswordErrorMessage",
      show-icon,
      center,
      :closable="false"
    )
    .d-flex.justify-content-around.col-6.offset-3
      el-button(round, @click="$emit('close')") 取消
      el-button(round, type="danger", @click="handleEditPassword") 确认
</template>

<script>
import { editPasswordAPI } from '@/api/common.js';

export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value !== this.editPasswordData.newPassword) {
        callback(new Error('两次密码不一致'));
      } else {
        callback();
      }
    }

    return {
      editPasswordData: {
        password: '',
        newPassword: '',
        checkPassword: ''
      },
      editPasswordErrorMessage: '',
      rules: {
        password: [
          { required: true, message: '請填寫原密碼', trigger: 'blur' },
          { min: 8, max: 20, message: '长度限制为 8 - 20 个字元', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '請填寫新密碼', trigger: 'blur' },
          { min: 8, max: 20, message: '长度限制为 8 - 20 个字元', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_!@#$%^&*-+=;:,.?~]{8,20}$/, message: '含有非法字元', trigger: 'blur' },
        ],
        checkPassword: [
          { required: true, message: '請填寫确认新密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度限制为 8 - 20 个字元', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleEditPassword() {
      this.editPasswordErrorMessage = '';

      // this.$refs.editPasswordForm.validate(valid => {
      //   if (valid) {
          editPasswordAPI(this.editPasswordData).then(() => {
            this.$emit('success');
          }, error => {
            this.editPasswordErrorMessage = error.response.data.message;
            this.$refs.editPasswordForm.resetFields();
            this.$refs.password.focus();
          });
      //   }
      // });
    },
  }
}
</script>
