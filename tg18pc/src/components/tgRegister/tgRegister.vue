<template lang='pug'>
  div.w-100
    h3.text-center.mb-5 注册
    el-form(:model="registerForm"  :rules="registerFormRules" ref="registerForm" @keyup.enter.native='submit')
      el-form-item.col-12(prop="UserName")
        el-input(type='text'
                  v-model.trim='registerForm.UserName'
                  placeholder='用户名'
                  name='userName')
      el-form-item.col-12(prop="Phone")
        el-input(type='tel'
                  v-model.trim='registerForm.Phone'
                  placeholder='手机号'
                  maxlength='11'
                  name='mobile')
      el-form-item.col-12(prop="Password")
        el-input(type='password' v-model.trim='registerForm.Password' placeholder='密码')
      el-form-item.col-12(prop="ckPassword")
        el-input(type='password' v-model='registerForm.ckPassword' placeholder='确认密码')
      el-form-item.col-12(prop="verifyIsPassing")
        drag-verify.d-block(ref='VerifyItem'
          :width='verify.width' 
          :height='verify.height' 
          :text='verify.text' 
          :success-text='verify.successText' 
          :background='verify.background' 
          :progress-bar-bg='verify.progressBarBg' 
          :completed-bg='verify.completedBg' 
          :handler-bg='verify.handlerBg' 
          :handler-icon='verify.handlerIcon' 
          :text-size='verify.textSize' 
          :success-icon='verify.successIcon' 
          :circle='verify.circle'
          @passcallback="verifyCheck")
      el-form-item.col-12(prop="privacyPolicy")
        el-checkbox-group(v-model='registerForm.privacyPolicy')
          el-checkbox(label="" name="privacyPolicy")
            span 我已年满18岁，并已阅读同意
            router-link(to="/faq#faq4" target='_blank') 《相关的条款》
            span 与
            router-link(to="/faq#faq3" target='_blank') 《隐私权政策》
            span 。
      el-form-item
        .row
          .col-6.mt-3.mb-3
            button.col-12.btn.btn-tgBlueDark(@click.prevent='submit("registerForm")' type='button')
              span 注册
          .col-6.mt-3.mb-3
            button.col-12.btn.btn-outline-dark(type='button' @click.prevent='cancel') 取消
      el-alert(v-if='error_message' :title="error_message" type="error" @close="error_message=''" v-on:click.native='GA_register_fail()')
</template>
<script>
import axios from 'axios';
import dragVerify from 'vue-drag-verify';
import router from '@/router/router';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    dragVerify,
  },
  data() {
    const check_userName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (!(/^[a-zA-Z0-9_]{5,16}$/.test(value))) {
        callback(new Error('请输入5～15字符（A-Z ,a-z,0-9）'));
      } else {
        callback();
      }
    };
    const check_Phone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输手机号'));
      } else if (!(/^(13|14|15|16|18|19)\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    const check_Pass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.ckPassword !== '') {
          this.$refs.registerForm.validateField('ckPassword');
        }
        callback();
      }
    };
    const check_ckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value !== this.registerForm.Password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      verify: {
        background: '#cccccc',
        circle: true,
        completedBg: '#66cc66',
        handlerBg: '#fff',
        handlerIcon: 'el-icon-arrow-right',
        height: 36,
        progressBarBg: '#cccccc',
        successIcon: 'el-icon-check',
        successText: '完成验证',
        text: '拖动滑块完成验证',
        textSize: '16px',
        width: 442,
      },
      error_message: '',
      showeErorMsg: false,
      privacyPolicy: false,
      registerForm: {
        ckPassword: '',
        UserName: '',
        Password: '',
        Phone: '',
        privacyPolicy: [''],
        verifyIsPassing: '',
        Aid: '',
        AgencyId: '',
      },
      registerFormRules: {
        UserName: [{ required: true, message: '请输入用户名', trigger: ['blur', 'change'] }, { validator: check_userName, trigger: ['blur', 'change'] }, {
          min: 5, max: 15, message: '请输入5～15字符（A-Z ,a-z,0-9）', trigger: 'blur',
        }],
        Phone: [{ required: true, message: '请输入手机号码', trigger: ['blur', 'change'] }, { validator: check_Phone, trigger: ['blur', 'change'] }],
        Password: [{ required: true, message: '请输入密码', trigger: ['blur', 'change'] }, { validator: check_Pass, trigger: ['blur', 'change'] }, {
          min: 8, max: 20, message: '请输入8～20字母或下划线和数字组合、不含特殊符号', trigger: ['blur', 'change'],
        }],
        ckPassword: [{ required: true, message: '请输入密码', trigger: ['blur', 'change'] }, { validator: check_ckPassword, trigger: ['blur', 'change'] }, {
          min: 8, max: 20, message: '请输入8～20字母或下划线和数字组合、不含特殊符号', trigger: ['blur', 'change'],
        }],
        privacyPolicy: [{
          type: 'array', required: true, message: '请同意相关的条款', trigger: 'change',
        }],
        verifyIsPassing: [{
          required: true, message: '请拖动滑块完成验证', trigger: 'change',
        }],
      },
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
      'Aid',
    ]),
    getMemberRegisterErrorMessage() {
      return this.$store.state.member.MemberRegisterErrorMessage;
    },
    getGA_AD_Path() {
      const path = this.$route.query;
      let GA_Path = '';
      if (Object.keys(path).length === 0) {
        GA_Path = '';
      } else {
        Object.keys(path).map((key, index) => {
          const value = path[key];
          if (index === 0) {
            GA_Path += value;
          } else {
            GA_Path += `_${value}`;
          }
          return GA_Path;
        });
      }
      return GA_Path;
    },
  },
  methods: {
    verifyCheck() {
      if (this.$refs.VerifyItem.isPassing) {
        this.registerForm.verifyIsPassing = true;
      } else {
        this.registerForm.verifyIsPassing = '';
      }
    },
    cancel(e) {
      this.registerForm.UserName = '';
      this.registerForm.Password = '';
      this.registerForm.Phone = '';
      this.registerForm.verifyIsPassing = '';
    },
    submit(form) {
      const vm = this;
      if (window.localStorage.Aid) {
        this.registerForm.Aid = window.localStorage.Aid;
      }
      if (window.localStorage.AgencyId) {
        this.registerForm.AgencyId = window.localStorage.AgencyId;
      }
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$store.dispatch('member/MemberRegister', this.registerForm)
            .then((res) => {
              if (res.data.status === 1) {
                window.localStorage.removeItem('Aid');
                vm.checkLogin();
              } else {
                vm.error_message = res.data.error_message;
              }
            });
          return true;
        }
        return false;
      });
    },
    checkLogin() {
      if (this.MemberLogined) {
        this.GA_register_success();
        this.$message({
          message: '註冊成功',
          showClose: true,
          duration: 1000,
          type: 'success',
        });
        router.push('/');
        this.$emit('loginDialogHide');
      }
    },
  },
  mounted() {
    if (this.$route.query.Aid) {
      window.localStorage.setItem('Aid', this.$route.query.Aid);
    }
    if (this.$store.state.member.memberLogined === true) {
      router.push('/index');
    }
  },
};
</script>
<style lang='scss' scoped>
.el-form-item_error{
  input{
    border: 1px solid #dc3545;
  }
}
</style>
<style lang='scss'>
.dv_handler{
  margin-top: 1px !important;
  margin-left: 1px !important;
}
.drag_verify .dv_progress_bar {
  transition: background .3s ease-in !important;
}
</style>
