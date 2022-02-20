<template lang='pug'>
  div.m-3
    el-form(:model="changePasswordForm"  label-width="80px" :rules="changePasswordFormRules" ref="changePasswordForm" @submit.native.prevent='')
      el-form-item.col-12(label="当前密码" prop="OldPassword")
        el-input(type='password' v-model.trim='changePasswordForm.OldPassword' placeholder='输入当前密码')
      el-form-item.col-12(label="新密码" prop="Password")
        el-input(type='password' v-model.trim='changePasswordForm.Password' placeholder='请输入新密码')
      el-form-item.col-12(label="确认密码" prop="ckPassword")
        el-input(type='password' v-model.trim='changePasswordForm.ckPassword' placeholder='再次输入新密码')
      el-alert(v-if='error_message' :title="error_message" type="error" @close="error_message=''")
      el-form-item.col-12.mt-5(label=" ")
        el-button(type="primary" @click.prevent="submit('changePasswordForm')"  :loading="submitLoading") 提交
    el-dialog(title='修改密码成功', :visible.sync='passwordDialogShow', width='36%')
      P 密码更改完成，下次请用新密码登入
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    const checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value))) {
        callback(new Error('请输入8～20字母和数字或下划线的组合、不含特殊符号'));
      } else {
        if (this.changePasswordForm.ckPassword !== '') {
          this.$refs.changePasswordForm.validateField('ckPassword');
        }
        callback();
      }
    };
    const checkCkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value))) {
        callback(new Error('请输入新密码'));
      } else if (value !== this.changePasswordForm.Password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      passwordDialogShow: false,
      submitLoading: false,
      error_message: '',
      changePasswordForm: {
        OldPassword: '',
        Password: '',
        ckPassword: '',
      },
      changePasswordFormRules: {
        OldPassword: [{ required: true, message: '输入当前密码', trigger: 'blur' }, {
          min: 8, max: 20, message: '请输入正确的密码', trigger: 'blur',
        }],
        Password: [{ required: true, message: '请输入新密码', trigger: 'blur' }, { validator: checkPass, trigger: 'blur' }, {
          min: 8, max: 20, message: '请输入8～20字母和数字或下划线的组合、不含特殊符号', trigger: 'blur',
        }],
        ckPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }, { validator: checkCkPassword, trigger: 'blur' }, {
          min: 8, max: 20, message: '请输入新密码', trigger: 'blur',
        }],
      },
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberData',
      'MemberBankList',
    ]),
  },
  methods: {
    resetIsMatch() {
      console.log('resetIsMatch');
      this.disMatch = false;
    },
    submit(form) {
      const vm = this;
      this.$refs[form].validate((valid) => {
        if (valid) {
          const payload = this.changePasswordForm;
          payload.VertifyInfo = this.UserName;
          vm.submitLoading = true;
          console.log(payload);
          this.$store.dispatch('member/Member_AllMemberPasswordReset', payload)
            .then((res) => {
              vm.submitLoading = false;
              if (res.data.status === 1) {
                vm.changePasswordForm.OldPassword = '';
                vm.changePasswordForm.Password = '';
                vm.changePasswordForm.ckPassword = '';
                vm.error_message = '';
                vm.passwordDialogShow = true;
              } else {
                vm.error_message = res.data.error_message;
              }
            });
        }
      });
    },
  },
};
</script>
<style lang="scss">
</style>
