<template lang="pug">
  .container-fluid.d-flex.flex-column.h-100.bg.main
    .row.no-gutters
      .col-12
        .logo
          img.logo-style.pt-4(src="/static/img/logo_corporate.png")
    .row.no-gutters.pb-5.px-3.flex-grow-1(v-if='steps==1')
      el-card.box-card.col-sm-10.col-md-6.offset-sm-1.offset-md-3.formCard
        h4.mt-4.title-style 快速注册
        div.row.no-gutters
          el-form.col-md-10.offset-md-1(:model="registerForm"  :rules="registerFormRules" ref="registerForm" @keyup.enter.native='submit')
            el-form-item(prop="UserName")
              el-input.w-100.mt-4(v-model.trim='registerForm.UserName', placeholder='用户名：请输入5~15字符(A-Z，a-z，0-9)'  :disabled="registerStatus.AccountCheck==0")
            el-form-item(prop="Phone")
              el-input.w-100.mt-3(v-model.trim='registerForm.Phone', placeholder='手机号码'   :disabled="registerStatus.Register!==1")
            el-form-item(prop="Email")
              el-input.w-100.mt-3(v-model.trim='registerForm.Email', placeholder='邮箱'  :disabled="registerStatus.EmailCheck==0")
            el-form-item(prop="Password")
              el-input.w-100.mt-3(type='password' v-model='registerForm.Password', placeholder='密码，输入 8～20 字符')
            el-form-item(prop="ckPassword")
              el-input.w-100.mt-3(type='password' v-model='registerForm.ckPassword', placeholder='确认密码')
            el-form-item.w-100.mt-3(prop="privacyPolicy")
              el-checkbox-group(v-model='registerForm.privacyPolicy')
                el-checkbox(label="" name="privacyPolicy")
                  span 我已同意
                  router-link(to="/faq#faq4" target='_blank') 相关的条款
                  span 与
                  router-link(to="/faq#faq3" target='_blank') 隐私权政策
            el-form-item
              .row
                .col-12.col-sm-6.px-2.my-2
                  a(href='https://tiger-integration.18luckportal.biz/')
                    el-button.w-100(type='primary' plain) 回到活动页
                .col-12.col-sm-6.px-2.my-2
                  el-button.w-100(type='primary', @click.prevent='submit("registerForm")' :loading="submitLoading") 注册
    .row.no-gutters.flex-grow-1.px-3(v-if='steps==2')
      el-card.box-card.col-sm-10.col-md-6.offset-sm-1.offset-md-3.ResultCard
        h4.my-5.text-center 快速注册
        p.text-center.my-5 该手机号注册成功 用户名为 {{UserName}}
        
        .w-100.text-center
          a.mx-2(:href='host')
            el-button.mb-4(type='') 体验游戏
          a.mx-2(:href='registerStatus.ReturnUrl')
            el-button.mb-4(type='primary') 钱包转账
    .row.no-gutters
      .footer.col-12
        span Copyright © 2018 18老虎城
</template>
<script>
import axios from 'axios';
import router from '@/router/routerForFastRegister';

export default {
  data() {
    const checkUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (!(/^[a-zA-Z0-9_]{5,16}$/.test(value))) {
        callback(new Error('请输入 5～15 字符如：A～Z、a～z、0～9')); 
      } else {
        callback();
      }
    };
    const checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.ckPassword !== '') {
          this.$refs.registerForm.validateField('ckPassword');
        }
        callback();
      }
    };
    const checkCkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.Password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    const checkPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输手机号码'));
      } else if (!(/^((13|14|15|16|18|19)\d{9}){1}$/.test(value))) {
        callback(new Error('请确认手机号码'));
      } else {
        callback();
      }
    };
    return {
      host: process.env.VUE_APP_HOST,
      submitLoading: false,
      Dialog: false,
      UserName: '',
      steps: 1,
      registerStatus: {
        Register: '',
        AccountCheck: '',
        EmailCheck: '',
        ReturnUrl: '',
      },
      registerForm: {
        LuckUserName: '',
        Aid: '18luck',
        UserName: '',
        Phone: '',
        Email: '',
        Password: '',
        ckPassword: '',
        privacyPolicy: [''],
      },
      registerFormRules: {
        UserName: [{ required: true, message: '请输入用户名', trigger: ['blur', 'change'] }, { validator: checkUserName, trigger: ['blur', 'change'] }, {
          min: 5, max: 15, message: '输入 5～15 字符如：A～Z、a～z、0～9', trigger: 'blur',
        }],
        Email: [{
          required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'],
        }],
        Phone: [{ required: true, message: '请输入手机号码', trigger: ['blur', 'change'] }, { validator: checkPhone, trigger: ['blur', 'change'] }],
        Password: [{ required: true, message: '请输入密码', trigger: ['blur', 'change'] }, { validator: checkPass, trigger: 'blur' }, {
          min: 8, max: 20, message: '输入 8～20 字符如：A～Z、a～z、0～9', trigger: 'blur',
        }],
        ckPassword: [{ required: true, message: '请确认密码', trigger: ['blur', 'change'] }, { validator: checkCkPassword, trigger: 'blur' }, {
          min: 8, max: 20, message: '输入 8～20 字符如：A～Z、a～z、0～9', trigger: 'blur',
        }],
        privacyPolicy: [{
          type: 'array', required: true, message: '请同意相关的条款', trigger: 'change',
        }],
      },
    };
  },
  methods: {
    APIResult() {
      const vm = this;
      router.push({
        path: '/fastregister.html',
        query: {
          ReturnUrl: vm.registerStatus.ReturnUrl,
          UserName: vm.registerForm.UserName,
        },
      });
      window.location.reload();
    },
    submit(form) {
      const vm = this;
      vm.submitLoading = true;
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$store.dispatch('member/MemberRegister', this.registerForm)
            .then((res) => {
              vm.submitLoading = false;
              if (res.data.status === 1) {
                vm.APIResult();
                vm.steps = 2;
              } else {
                vm.$message({ message: res.data.error_message, type: 'error' });
              }
            });
          return true;
        }
        return false;
      });
    },
    DataDecode(RSA) {
      // 18老虎城取得解密後資料
      const vm = this;
      const payload = { Parameter: RSA };
      axios.post(`${process.env.VUE_APP_APIHOST}/Luck_Page/DataDecode/`, payload)
        .then((res) => {
          if (res.data.status === 1) {
            vm.registerForm.LuckUserName = res.data.data.Account;
            vm.registerForm.UserName = res.data.data.Account;
            vm.registerForm.Email = res.data.data.Email;
            vm.registerForm.Phone = res.data.data.Phone;
            vm.registerStatus.Register = res.data.data.Register;
            vm.registerStatus.AccountCheck = res.data.data.AccountCheck;
            vm.registerStatus.EmailCheck = res.data.data.EmailCheck;
            vm.registerStatus.ReturnUrl = res.data.data.ReturnUrl;
            if (vm.registerStatus.Register === 1) {
              vm.APIResult();
            }
          } else {
            window.location = '/register';
            // vm.$message({message: res.data.error_message ,type: 'error'})
          }
        });
    },
  },
  mounted() {
    const vm = this;
    const RSAURL = new URL(window.location.href);
    const RSA = RSAURL.searchParams.get('Parameter');
    const ReturnUrl = RSAURL.searchParams.get('ReturnUrl');
    const UserName = RSAURL.searchParams.get('UserName');
    if (ReturnUrl) {
      this.steps = 2;
      this.Dialog = true;
      this.registerStatus.ReturnUrl = ReturnUrl;
      this.UserName = UserName;
    } else {
      this.DataDecode(RSA);
    }
  },
};
</script>
<style scoped>
.bg {
  height: auto;
  background-image: linear-gradient(286deg, #002766, #001332);
}
.logo-style {
  height: 80%;
}
.logo {
  height: 18vh;
  text-align: center;
}
.title-style {
  text-align: center;
}
.formCard{
  min-height: 660px;
}
.box-card {
  width: 100%;
  line-height: 40px;
  font-size: 14px;
  border-bottom: 6px #fadb14 solid;
}
.box-card .el-card__header {
  border-bottom: 0px;
}
.footer {
  background: #fff;
  text-align: center;
  font-size: 13px;
  line-height: 30px;
  height: 30px;
  color: #606266;
}
.dialog-style {
  margin-top: 20vh;
}
.ResultCard{
  height: 380px;
}
.el-button{
  min-height: 40px;
}
</style>
