<template lang='pug'>
.w-full.text-center.px-4
  .step_1.text-center.pt-5(v-if='steps===1')
    h3.text-4xl.font-bold 欢迎
    .formData.p-5
      p.text-lg.my-8 启用帐号
      el-form.mt-4(:model='formData', ref='formData', :rules='formDataRules', @submit.native.prevent='SmsVerify("formData")')
        el-form-item.my-8(prop='phone')
          el-input(v-model.trim='formData.phone', maxlength='11', placeholder='输入行动电话')
        el-form-item.my-8(prop='verify_code')
          .flex
            el-input.mr-2(v-model.trim='formData.verify_code', placeholder='输入验证码')
            el-button(v-if='returnVerify_code', type='primary', round, size='mini', disabled) {{returnVerifyCountDown}} 秒后发送
            el-button(v-else, type='primary', round, size='mini',@click='SmsSend') 发送验证码
        el-form-item.my-1
          el-button.w-full(type='primary', native-type='submit' round, :disabled='formDataValidate===false') 启用
    .my-4
      router-link.text-sm(to='/login') 已启用过帐过点此登入
  .step_2.text-center.pt-5(v-if='steps===2')
    p.text-sm 手机号码 {{registerformData.phone}} 已完成验证
    .formData.p-5
      p.text-lg.my-8 设定登入帐密
      el-form.mt-4(:model="registerformData", ref="registerformData", :rules='registerformDataRules', @submit.native.prevent='register("registerformData")')
        el-form-item.my-8(prop='account')
          el-input.loginInput(v-model="registerformData.account"  placeholder="请输入帐号")
        el-form-item.my-8(prop='password')
          el-input.loginInput(v-model="registerformData.password" placeholder="请输入密码")
        el-form-item.my-1
          el-button.w-full(type="primary", native-type='submit' round) 完成启用
</template>

<script>
import { mapState } from 'vuex';
import { 
  SmsSendAPI,
  SmsVerifyAPI,
  BankCardMapListAPI,
  MemberRegisterAPI,
} from '@/api';

export default {
  data() {
    const check_Phone = (rule, value, callback) => {
      if (value === '') {
        console.log(value);
        callback(new Error('请输手机号'));
      } else if (!/^(1)\d{10}$/.test(value)) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    const check_verify_code = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else {
        callback();
      }
    };
    const check_account = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入5~15位半形英文、数字或下划线'));
      } else if (!(/^[a-zA-Z0-9_]{5,15}$/.test(value))) {
        callback(new Error('请输入5~15位半形英文、数字或下划线'));
      } else {
        callback();
      }
    };
    const check_Password = (rule, value, callback) => {
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
    return {
      steps: 1,
      loopTimer: null,
      returnVerify_code: false,
      returnVerifyCountDown: 0,
      formDataValidate: false,
      formDataRules: {
        phone: [
          { required: true, message: '请输入联系电话', trigger: ['blur', 'change'] },
          { validator: check_Phone, trigger: ['blur', 'change'] },
        ],
        verify_code: [
          { required: true, message: '请输验证码', trigger: ['blur'] },
        ],
      },
      formData: {
        phone: '',
        verify_code: '',
      },
      registerformDataRules: {
        account: [
          { required: true, message: '请输入5~15位半形英文、数字或下划线', trigger: ['blur', 'change'] },
          { validator: check_account, trigger: ['blur', 'change'] },
          {
            min: 5, max: 15, message: '请输入5~15位半形英文、数字或下划线', trigger: 'blur', 
          },
        ],
        password: [
          { required: true, message: '请輸入8~20位半形英文、数字或特殊符号', trigger: ['blur', 'change'] },
          { validator: check_Password, trigger: ['blur', 'change'] }, 
          {
            min: 8, max: 20, message: '请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~', trigger: ['blur', 'change'], 
          },
        ],
      },
      registerformData: {
        account: '',
        password: '',
        phone: '',
        verify_code: '',
      },
    };
  },
  watch: {
    formData: {
      handler(val) {
        this.$refs.formData.validate((valid) => {
          if (valid && this.returnVerify_code) {
            this.formDataValidate = true;
          } else {
            this.formDataValidate = false;
          }
        });
      }, 
      deep: true,
    },
    registerformData: {
      handler(val) {
        this.$refs.registerformData.validate((valid) => {
          if (valid) {
            this.formDataValidate = true;
          } else {
            this.formDataValidate = false;
          }
        });
      }, 
      deep: true,
    },
  },
  methods: {
    SmsSend() {
      const payload = {
        phone: this.formData.phone,
      };
      SmsSendAPI(payload)
        .then((res) => {
          if (res.data.data[0] === true) {
            const endTime = this.$dayjs().add(2, 'minute').format();
            window.localStorage.setItem('verifyTime', endTime);
            window.localStorage.setItem('setUpPhone', this.formData.phone);
            this.loopTime();
          }
        })
        .catch((error) => {
          clearInterval(this.loopTimer);
        });
    },
    SmsVerify(form) {
      SmsVerifyAPI(this.formData)
        .then((res) => {
          if (res.data.data[0] === true) {
            window.localStorage.setItem('verify_code', this.formData.verify_code);
            this.gotoStep2();
          }
        });
    },
    loopTime() {
      const vm = this;
      const endTime = this.$dayjs(window.localStorage.verifyTime);
      this.returnVerify_code = true;
      this.loopTimer = setInterval(() => {
        const currentTime = this.$dayjs().format();
        const timeGap = this.$dayjs(endTime).diff(this.$dayjs(currentTime));
        const seconds = timeGap / 1000;
        this.returnVerifyCountDown = seconds;
        if (seconds <= 0) {
          this.returnVerify_code = false;
          this.cleanTempData(); 
        } 
      }, 1000);
    },
    gotoStep2() {
      clearInterval(this.loopTimer);
      this.registerformData.phone = window.localStorage.setUpPhone;
      this.registerformData.verify_code = window.localStorage.verify_code;
      this.steps = 2;
    },
    cleanTempData() {
      clearInterval(this.loopTimer);
      this.returnVerifyCountDown = 0;
      window.localStorage.removeItem('setUpPhone');
      window.localStorage.removeItem('verify_code');
      window.localStorage.removeItem('verifyTime');
    },
    register(form) {
      MemberRegisterAPI(this.registerformData)
        .then((res) => {
          this.cleanTempData(); 
          if (res.data.data[0] === true) {
            // 註冊後進入填寫完整資料頁面
            this.$router.push('/setprofile');
          }
        });
    },
  },
  created() {
    clearInterval(this.loopTimer);
  },
  beforeDestroy() {
    clearInterval(this.loopTimer);
  },
  mounted() {
    if (window.localStorage.verifyTime && window.localStorage.setUpPhone) {
      this.returnVerify_code = true;
      this.formData.phone = window.localStorage.setUpPhone;
      this.loopTime();
    } else {
      this.cleanTempData(); 
    }
    if (window.localStorage.verifyTime && window.localStorage.setUpPhone && window.localStorage.verify_code) {
      const currentTime = new Date().getTime();
      const endTime = this.$dayjs(window.localStorage.verifyTime).valueOf();
      if ((endTime - currentTime) <= 0) {
        window.localStorage.removeItem('verifyTime');
      } else {
        this.gotoStep2();
      }
    } 
  },
};
</script>
<style lang='scss' scoped>
.formData{
  margin: auto;
  min-width: 300px;
  max-width: 450px;
}
</style>
