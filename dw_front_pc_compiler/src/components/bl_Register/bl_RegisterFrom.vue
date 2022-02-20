<template lang="pug">
el-form.w-100(:model="memberForm", ref="memberForm", :rules="memberFormRules", @submit.native.prevent='register("memberForm")')
  .col-12.py-3
    el-form-item.m-0(prop="account")
      el-input(v-model.trim='memberForm.account', placeholder='用户名：请输入5~15位半形英文、数字或下划线', maxlength='15')
  .col-12.py-3
    el-form-item.m-0(prop="password")
      el-input(v-model.trim='memberForm.password', :type='passwordType', maxlength='20', placeholder='密码：请輸入8~20位半形英文、数字或特殊符号')
      .showPassword(@click='showPassword =! showPassword')
        i.fas.fa-eye-slash(v-if='showPassword')
        i.fas.fa-eye(v-else)
  .col-12.py-3
    el-form-item.m-0(prop="ckPassword")
      el-input(v-model.trim='memberForm.ckPassword', :type='passwordType', maxlength='20', placeholder='再次确认密码')
      .showPassword(@click='showPassword =! showPassword')
        i.fas.fa-eye-slash(v-if='showPassword')
        i.fas.fa-eye(v-else)
  .col-12.py-3
    el-form-item.m-0(prop="privacyPolicy")
      el-checkbox-group.m-0(v-model='memberForm.privacyPolicy')
        el-checkbox.privacyPolicy.m-0(label="", name="privacyPolicy")
          span 已年满18岁，并接受
          router-link(to="/about#about4" target='_blank') 《相关的条款》
          span 与
          router-link(to="/about#about3" target='_blank') 《隐私权政策》
  .col-12.text-center.my-2
    bl_ImageVerify(@VerifySuccess='VerifySuccessEvent', @imageVerifyReset='imageVerifyReset', :verifyOK='memberForm.imageVerify')
  .col-12.py-3
    el-form-item.m-0
      el-button.w-100(type="primary", native-type='submit', :disabled='memberFormValidate==false') 立即注册
  
</template>
<script>
import bl_ImageVerify from '@/components/bl_ImageVerify/bl_ImageVerify.vue';

export default {
  components: {
    bl_ImageVerify,
  },
  data() {
    const check_account = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入5~15位半形英文、数字或下划线'));
      } else if (!(/^[a-zA-Z0-9_]{5,15}$/.test(value))) {
        callback(new Error('请输入5~15位半形英文、数字或下划线'));
      } else {
        callback();
      }
    };
    const check_Pass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请輸入8~20位半形英文、数字或特殊符号'));
      } else if (!(/^[a-zA-Z0-9_!@#$%^&*\-+=;:,.?~]{8,20}$/.test(value))) {
        callback(new Error('请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~'));
      } else {
        if (this.memberForm.ckPassword !== '') {
          this.$refs.memberForm.validateField('ckPassword');
        }
        callback();
      }
    };
    const check_ckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请輸入8~20位半形英文、数字或特殊符号'));
      } else if (!(/^[a-zA-Z0-9_!@#$%^&*\-+=;:,.?~]{8,20}$/.test(value))) {
        callback(new Error('请輸入8~20位半形英文、数字或特殊符号'));
      } else if (value !== this.memberForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      memberFormValidate: false,
      showPassword: false,
      passwordType: 'password',
      memberForm: {
        imageVerify: false,
        privacyPolicy: [],
        account: '',
        password: '',
        ckPassword: '',
        tryTime: '',
        rpc: '',
      },
      memberFormRules: {
        account: [
          { required: true, message: '请输入5~15位半形英文、数字或下划线', trigger: ['blur', 'change'] },
          { validator: check_account, trigger: ['blur', 'change'] },
          {
            min: 5, max: 15, message: '请输入5~15位半形英文、数字或下划线', trigger: 'blur', 
          },
        ],
        password: [
          { required: true, message: '请輸入8~20位半形英文、数字或特殊符号', trigger: ['blur', 'change'] },
          { validator: check_Pass, trigger: ['blur', 'change'] }, 
          {
            min: 8, max: 20, message: '请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~', trigger: ['blur', 'change'], 
          },
        ],
        ckPassword: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { validator: check_ckPassword, trigger: ['blur', 'change'] },
          {
            min: 8, max: 20, message: '请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~', trigger: ['blur', 'change'], 
          },
        ],
        privacyPolicy: [
          {
            type: 'array', required: true, message: '请同意相关的条款', trigger: 'change', 
          },
        ],
      },
    };
  },
  watch: {
    // 侦听表单验证是否完成 返回至memberFormValidate
    memberForm: {
      handler(val) {
        const vm = this;
        if (vm.memberForm.account !== '' &&
          vm.memberForm.password !== '' &&
          vm.memberForm.ckPassword !== '' &&
          vm.memberForm.privacyPolicy.length > 0 &&
          vm.memberForm.imageVerify === true) {
          this.$refs.memberForm.validate((valid) => {
            if (valid) {
              vm.memberFormValidate = true;
            } else {
              vm.memberFormValidate = false;
            }
          });
        } else {
          vm.memberFormValidate = false;
        }
      },
      deep: true,
    },
    showPassword(value) {
      if (value) {
        this.passwordType = 'text';
      } else {
        this.passwordType = 'password';
      }
    },
  },
  methods: {
    restMemberForm() {
      this.$refs.memberForm.clearValidate();
      this.$refs.memberForm.resetFields();
    },
    register(form) {
      const vm = this;
      // console.log(vm.memberForm);
      this.$refs[form].validate((valid) => {
        // 图片验证
        if (vm.memberForm.imageVerify === true & valid === true) {
          this.$store.dispatch('member/MemberRegister', vm.memberForm)
            .then((res) => {
              if (res.status === 200) {
                vm.memberForm.imageVerify = true;
                // 跳出注册成功
                // vm.$message({ message: '成功', type: 'success' });
                vm.$store.dispatch('dialog/openCommandDialog_level2', { component: 'bl_Registered' });
              } 
            })
            .catch((error) => {
              // 格式验证错误 次数<3 错误码1106，
              // 格式验证错误 次数>=3 错误码1107，
              // 装置（finger)冻结 暂停注册24小时 错误码1108
              vm.imageVerifyReset();
            });
        }
      });
    },
    VerifySuccessEvent() {
      const vm = this;
      vm.memberForm.imageVerify = true;
    },
    imageVerifyReset() {
      const vm = this;
      vm.memberForm.imageVerify = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.privacyPolicy{
  font-size: 12px;
  color: $garyBlue_Dark;
}
.showPassword{
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 10px;
  font-size: 13px;
  color: $garyBlue_lightest;
}
</style>
