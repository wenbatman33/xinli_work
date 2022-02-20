<template lang="pug">
el-form.w-100(:model="changePasswordForm", ref="changePasswordForm", :rules="changePasswordFormRules")
  .row.no-gutters.p-4
    .col-12.my-3
      h3.text-center 密码管理
      p.my-3.text-center 确保您的资金安全，手机号将是客服确认身份的重要凭证
    .col-12.my-3
      el-form-item.m-0(prop="password")
        el-input(v-model.trim='changePasswordForm.password', type='password', placeholder='当前密码')
    .col-12.my-3
      el-form-item.m-0(prop="newPassword")
        el-input(v-model.trim='changePasswordForm.newPassword', type='password', placeholder='请输入新密码')
    .col-12.my-3
      el-form-item.m-0(prop="checkPassword")
        el-input(v-model.trim='changePasswordForm.checkPassword', type='password', placeholder='请确认密码')
    .col-12.my-2
      el-form-item
        el-button.w-100(type="primary", @click.prevent='bindingPhone("changePasswordForm")', :disabled='changePasswordFormValidate==false') 提交绑定
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    const check_NewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请輸入8~20位半形英文、数字或特殊符号'));
      } else if (!(/^[a-zA-Z0-9_!@#$%^&*\-+=;:,.?~]{8,20}$/.test(value))) {
        callback(new Error('请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~'));
      } else {
        if (this.changePasswordForm.checkPassword !== '') { 
          this.$refs.changePasswordForm.validateField('checkPassword');
        }
        callback();
      }
    };
    const check_CheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请輸入8~20位半形英文、数字或特殊符号'));
      } else if (!(/^[a-zA-Z0-9_!@#$%^&*\-+=;:,.?~]{8,20}$/.test(value))) {
        callback(new Error('请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~'));
      } else if (value !== this.changePasswordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      changePasswordFormValidate: false,
      changePasswordForm: {
        password: '',
        newPassword: '',
        checkPassword: '',
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
          {
            min: 8, max: 20, message: '请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~', trigger: ['blur', 'change'], 
          },
        ],
        checkPassword: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] }, 
          { validator: check_CheckPassword, trigger: ['blur', 'change'] }, 
          {
            min: 8, max: 20, message: '请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~', trigger: ['blur', 'change'], 
          },
        ],
      },
    };
  },
  computed: {
    ...mapState('member', [
      'PersonalDetail',
    ]),
    ...mapState('member', [
      'memberStatus',
    ]),
  },
  watch: {
    // 侦听表单验证是否完成 返回至bindingEmailFormValidate
    changePasswordForm: {
      handler(val) {
        const vm = this;
        if (vm.changePasswordForm.password !== '' &&
          vm.changePasswordForm.newPassword !== '' &&
          vm.changePasswordForm.checkPassword !== '') {
          this.changePasswordFormValidate = true;
        } else {
          this.changePasswordFormValidate = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    bindingPhone(form) {
      const vm = this;
      this.$refs[form].validate((valid) => {
        this.$store.dispatch('member/MemberChangePassword', vm.changePasswordForm)
          .then((res) => {
            if (res.status === 200 && res.data.status === 1) {
              vm.$store.dispatch('dialog/closeCommandDialog');
              vm.$message({ message: '修改成功', type: 'success' });
            }
          });
      });
    },
  },
  mounted() {
  },
};
</script>
<style lang="scss" scoped>
</style>
