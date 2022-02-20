<template lang='pug'>
div
  h3.my-2.text-center 登录
  el-form(:model="memberForm", :rules="memberFormRules",ref="memberForm",@keyup.enter.native='submit')
    el-form-item(prop="UserName")
      el-input(type="text",v-model="memberForm.UserName",auto-complete="off",placeholder="请输入用户名")
    el-form-item(prop="Password")
      el-input(type="password" v-model="memberForm.Password" auto-complete="off" placeholder="请输入密码")
    el-form-item(prop="verifyIsPassing")
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
    el-form-item.my-2(prop="keepData")
      el-checkbox(v-model="memberForm.keepData" auto-complete="off" @change="keepUserData") 记住我，提醒：保管好账号密码及重要绑定信息
    el-alert.my-2(v-if='error_message' :title="error_message" type="error" @close="error_message=''")
    el-form-item.my-2
      button.col-12.btn.btn-tgBlueDark(ref="FormButton",@click.prevent="submit('memberForm')" type="button" v-on:click.native='GA_login_login()')
        span 立即登录
    el-form-item.my-1
      .col-12.text-center
        router-link(to="/forget" v-on:click.native='GA_login_forgotpw()')
          small.mx-3 忘记密码
        span   |
        router-link(to="/register" v-on:click.native='GA_login_register()')
          small.mx-3 注册账号
  el-dialog(width='30%', :visible.sync='error_dialogShow', append-to-body='' center)
    h5.mb-3.text-danger.text-center 该帐号目前无法登入
    p.text-center(v-html='error_dialogMessage')
</template>
<script>
import jwt from 'jwt-simple';
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
        callback(new Error('请输入正确的用户名'));
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
        progressBarBg: '#66cc66',
        successIcon: 'el-icon-check',
        successText: '完成验证',
        text: '拖动滑块完成验证',
        textSize: '16px',
        width: 318,
      },
      getLoginNullData: false,
      error_message: '',
      error_dialogShow: false,
      error_dialogMessage: 'false',
      memberForm: {
        keepData: false,
        UserName: '',
        Password: '',
        verifyIsPassing: '',
      },
      memberFormRules: {
        UserName: [{ required: true, message: '请输入用户名', trigger: ['blur', 'change'] }, { validator: check_userName, trigger: ['blur', 'change'] }, {
          min: 5, max: 15, message: '输入 5～15 字符如：A～Z、a～z、0～9', trigger: 'blur',
        }],
        Password: [{ required: true, message: '请输入密码', trigger: ['blur', 'change'] }, {
          min: 8, max: 20, message: '请输入正确的密码', trigger: 'blur', 
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
    ]),
    getUrlID() {
      const path = this.$route.path.split('/');
      const parHash = path[1];
      return parHash;
    },
  },
  methods: {
    verifyCheck() {
      if (this.$refs.VerifyItem.isPassing) {
        this.memberForm.verifyIsPassing = true;
      } else {
        this.memberForm.verifyIsPassing = '';
      }
    },
    keepUserData() {
      this.$store.dispatch('member/MemberKeepUserLoginID', this.memberForm.keepData);
    },
    submit(form) {
      const vm = this;
      // console.log(form);
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$store.dispatch('member/MemberLogin', this.memberForm)
            .then((res) => {
              if (res.data.status === 1 || res.data.status === '1') {
                if (vm.getUrlID === 'login') {
                  router.push('/');
                } else {
                  vm.$emit('loginDialogHide');
                }
                // 更換在線客服UserName
                window.LC_API.set_custom_variables([{ name: vm.UserName }]);
                // window.location.reload();
              } else if (res.data.error_code === 20006 || res.data.error_code === '20006') {
                vm.error_dialogShow = true;
                vm.error_dialogMessage = res.data.error_message;
                if (res.data.other.jwt_token) {
                  window.localStorage.setItem('JWT_TOKEN', res.data.other.jwt_token);
                }
              } else {
                vm.error_message = res.data.error_message;
                if (res.data.other.jwt_token) {
                  window.localStorage.setItem('JWT_TOKEN', res.data.other.jwt_token);
                }
              }
            });
        }
      });
    },
    checkLogin() {
      this.$message({
        message: '登入成功',
        showClose: true,
        duration: 1000,
        type: 'success',
      });
    },
  },
  mounted() {
    this.verify.width = this.$refs.FormButton.clientWidth;
    if (window.localStorage.tgUserName) {
      this.memberForm.UserName = window.localStorage.tgUserName;
      this.memberForm.keepData = true;
    }
    if (this.$store.state.member.memberLogined === true) {
      router.push('/index');
    }
  },
};

</script>
<style lang="scss" scoped>

</style>
