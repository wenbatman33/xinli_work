<template lang="pug">
.row.p-3.forget
  .col-12.my-3
    h3.text-center(v-if='steps === 1') 忘记密码
    h3.text-center(v-if='steps === 2') 请输入验证码
    h3.text-center(v-if='steps === 3') 设定新密码
    h3.text-center(v-if='steps === 4') 修改成功
  .col-12.my-3(v-if='steps< 4')
    el-steps.steps(:active='steps', align-center='')
      el-step(title='验证信息')
      el-step(title='身份验证')
      el-step(title='重置密码')
  div.step1.w-100(v-show='steps === 1')
    .col-12.my-3
      el-form(:model='forgetForm_1', :rules='forgetFormRules_1', ref='forgetForm_1', @submit.native.prevent='sendStesp_1("forgetForm_1")')
        el-form-item(prop='otpTarget')
          el-input(type='text', v-model='forgetForm_1.otpTarget', placeholder='请输入手机或邮箱')
        el-alert.my-3(v-if='error_message' :title="error_message" type="error" @close="error_message=''")
        el-form-item
          el-button.w-100(type="primary", native-type='submit', :disabled='forgetForm_1_Validate==false') 下一步
  div.step2.w-100(v-show='steps === 2')
    .col-12.my-3
      p.text-center 已发送验证码至 {{forgetForm_2.otpTarget}}
      el-form(:model='forgetForm_2', :rules='forgetFormRules_2', ref='forgetForm_2', @submit.native.prevent='sendStesp_2("forgetForm_2")')
        el-form-item(prop='otp')
          el-input(type='text' v-model='forgetForm_2.otp' placeholder='输入您收到的验证码')
        el-alert.my-3(v-if='error_message' :title="error_message" type="error" @close="error_message=''")
        el-form-item
          el-button.w-100(type="primary", native-type='submit', :disabled='forgetForm_2_Validate==false') 下一步
  // div.step3.w-100(v-bind:class="[steps === 3 ? '' : 'invisible h-0']")
  div.step3.w-100(v-show='steps === 3 ')
    .col-12.my-3
      el-form(:model='forgetForm_3', :rules='forgetFormRules_3', ref='forgetForm_3', @submit.native.prevent='sendStesp_3("forgetForm_3")')
        el-form-item(prop='newPassword')
          el-input(type='password' v-model='forgetForm_3.newPassword' placeholder='请输入新密码')
        el-form-item(prop='checkPassword')
          el-input(type='password' v-model='forgetForm_3.checkPassword' placeholder='再次确认密码')
        el-form-item
          el-button.w-100(type="primary", native-type='submit', :disabled='forgetForm_3_Validate==false') 下一步
  div.step4.w-100(v-show='steps === 4')
    .col-12.my-3.text-center
      img(:src='picSucess')
      p 请重新使用新的密码登录
    .col-12.my-3.text-center
        el-button.w-100(type="success", @click='success') 确认
</template>
<script>
import router from '@/router';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    const check_otpTarget = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机或信箱'));
      } else if (!(/^(1)\d{10}$/.test(value) || /^[a-z0-9\.\-_]+@[a-z0-9\-]+(\.[a-z0-9\-]+)+$/i.test(value))) {
        callback(new Error('请输入正确的手机或邮箱'));
      } else {
        callback();
      }
    };
    const check_newPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请輸入8~20位半形英文、数字或特殊符号'));
      } else if (!(/^[a-zA-Z0-9_!@#$%^&*\-+=;:,.?~]{8,20}$/.test(value))) {
        callback(new Error('请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~'));
      } else {
        if (this.forgetForm_3.newPassword !== '') {
          this.$refs.forgetForm_3.validateField('checkPassword');
        }
        callback();
      }
    };
    const check_checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请輸入8~20位半形英文、数字或特殊符号'));
      } else if (!(/^[a-zA-Z0-9_!@#$%^&*\-+=;:,.?~]{8,20}$/.test(value))) {
        callback(new Error('请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~'));
      } else if (value !== this.forgetForm_3.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      steps: 1,
      forgetForm_1_Validate: false,
      forgetForm_2_Validate: false,
      forgetForm_3_Validate: false,
      error_message: '',
      forgetForm_1: {
        otpTarget: '',
      },
      forgetForm_2: {
        otpTarget: '',
        otp: '',
      },
      forgetForm_3: {
        otpTarget: '',
        otpCert: '',
        newPassword: '',
        checkPassword: '',
      },
      forgetFormRules_1: {
        otpTarget: [
          { required: true, message: '请输入正确的手机或信箱', trigger: 'blur' }, 
          { validator: check_otpTarget, message: '请输入正确的手机或信箱', trigger: 'blur' },
        ],
      },
      forgetFormRules_2: {
        otpTarget: [
          { required: true, message: '请输入正确的手机或信箱', trigger: 'blur' }, 
          { validator: check_otpTarget, message: '请输入正确的手机或信箱', trigger: 'blur' },
        ],
        otp: [{ required: true, message: '请输入您收到的验证码', trigger: 'blur' }],
      },
      forgetFormRules_3: {
        // otpCert: [{ required: true, message: '请输入您收到的验证码', trigger: 'blur' }],
        newPassword: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] }, 
          { validator: check_newPassword, trigger: ['blur', 'change'] }, 
          {
            min: 8, max: 20, message: '请输入8～20字母或下划线和数字组合、不含特殊符号', trigger: ['blur', 'change'], 
          },
        ],
        checkPassword: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { validator: check_checkPassword, trigger: ['blur', 'change'] },
          {
            min: 8, max: 20, message: '请输入8～20字母或下划线和数字组合、不含特殊符号', trigger: ['blur', 'change'], 
          },
        ],
        picSucess: `${window.CDN_ASSETS}/static/img/pic-sucess.jpg`,
      },
    };
  },
  watch: {
    // 侦听表单验证是否完成 返回至memberFormValidate
    forgetForm_1: {
      handler(val) {
        const vm = this;
        if (vm.forgetForm_1.otpTarget !== '') {
          this.forgetForm_1_Validate = true;
        } else {
          this.forgetForm_1_Validate = false;
        }
      },
      deep: true,
    },
    forgetForm_2: {
      handler(val) {
        const vm = this;
        if (vm.forgetForm_2.otp !== '') {
          this.forgetForm_2_Validate = true;
        } else {
          this.forgetForm_2_Validate = false;
        }
      },
      deep: true,
    },
    forgetForm_3: {
      handler(val) {
        const vm = this;
        if (vm.forgetForm_3.newPassword !== '' && vm.forgetForm_3.checkPassword !== '') {
          this.forgetForm_3_Validate = true;
        } else {
          this.forgetForm_3_Validate = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    stepNext() {
      if (this.steps < 4) this.steps += 1;
    },
    sendStesp_1(form) {
      const vm = this;
      this.$refs[form].validate((valid) => {
        this.$store.dispatch('member/MemberForgetPassOtp', vm.forgetForm_1)
          .then((res) => {
            if (res.status === 200) {
              vm.forgetForm_2.otpTarget = vm.forgetForm_1.otpTarget;
              vm.forgetForm_3.otpTarget = vm.forgetForm_1.otpTarget;
              vm.stepNext();
            }
          });
      });
    },
    sendStesp_2(form) {
      const vm = this;
      this.$refs[form].validate((valid) => {
        this.$store.dispatch('member/MemberForgetPassCert', vm.forgetForm_2)
          .then((res) => {
            if (res.status === 200) {
              vm.forgetForm_3.otpCert = res.data.data[0].otpCert;
              vm.stepNext();
            }
          });
      });
    },
    sendStesp_3(form) {
      const vm = this;
      this.$refs[form].validate((valid) => {
        this.$store.dispatch('member/MemberForgetPassChange', vm.forgetForm_3)
          .then((res) => {
            if (res.status === 200) {
              vm.stepNext();
            }
          });
      });
    },
    success() {
      this.$router.push({ path: '/' }).catch((err) => {});
      this.$store.dispatch('dialog/closeCommandDialog');
    },
  },
};
</script>
<style lang="scss" scoped>
.forget{
  .ForgetWrap{
    min-height: 600px;
  }
  .overlapping{
    margin-top: -300px
  }
  .card{
    min-height: 400px
  }
  .h-0{
    height: 0;
  }
  /deep/.steps{
    .el-step__title.is-process{
      font-weight: 500!important;
    }
    .is-process{
      font-weight: 500!important;
    }
    .is-finish {
      color: $DW_greenMiddle;
      border-color: $DW_greenMiddle;
    }
  }
}
</style>
<style lang="scss">
.MAIN_LIGHT{
  .forget{
    /deep/.steps{
      .is-finish {color: $L_DW_greenMiddle; border-color: $L_DW_greenMiddle;}
    }
  }
}
</style>
