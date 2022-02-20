<template lang="pug">
  .container-fluid
    tgNavi
    .content
      section
        .memberlogin
          .membertab_a
            ul
              li
                router-link.membertab_a_active(to="/login") 登录
              li
                router-link(to="/register") 注册
          .memberinput
            form(@keyup.enter.prevent="submit")
              ul
                li
                  input#username.username(type="text"
                                          ref='username'
                                          v-model.trim="member.UserName"
                                          placeholder="用户名"
                                          v-validate='"required|AccountR"'
                                          name='userName'
                                          data-vv-as='请输入用户名'
                                          :class='{"input": true, "error": errors.has("userName")}'
                                          @blur='handleFormKeyIn("userName")')
                .error(v-show='errors.has("userName")')  {{ errors.first('userName') }}
                li
                  input#password.password(type="password"
                                          v-model.trim="member.Password"
                                          placeholder="密码"
                                          v-validate='"required|Psw18R"'
                                          name='Password'
                                          data-vv-as='请输入密码'
                                          :class='{"input": true, "error": errors.has("Password")}'
                                          @blur='handleFormKeyIn("Password")')
                .error(v-show='errors.has("Password")')  {{ errors.first('Password') }}
                li.d-flex.justify-content-center(style="border:none;")
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
                .error(v-if='verify.text2') {{ verify.text2 }}
          form(action="member.html" method="get")
            button.memberlogin_btn(@click.prevent="submit" type="button") 立即登录
          .memberlogin_link
            router-link(to="/forget" v-on:click.native='GA_mlogin_forgotpw') 忘记密码
            router-link(to="/register" v-on:click.native='GA_mlogin_register') 注册账号
    el-dialog(width='90%', :visible.sync='error_dialogShow', append-to-body='' center)
      h5.mb-3.text-danger.text-center 该帐号目前无法登入
      p.text-center(v-html="error_dialogMessage")
    tgFooter
    tgFix
</template>
<script>
import jwt from 'jwt-simple';
import router from '@/router/router';
import dragVerify from 'vue-drag-verify';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import tgFix from '@/components/tgFix/tgFix.vue';

export default {
  data() {
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
        text2: '',
        textSize: '16px',
        width: 0,
      },
      getLoginNullData: false,
      showeErorMsg: false,
      error_message: '',
      error_dialogShow: false,
      error_dialogMessage: 'false',
      member: {
        keepData: false,
        UserName: '',
        Password: '',
      },
      registerForm: {
        ckPassword: '',
        UserName: '',
        Password: '',
        Phone: '',
        Email: '',
        privacyPolicy: [''],
        verifyIsPassing: '',
      },
      verifyIsPassing: '',
    };
  },
  components: {
    tgNavi,
    tgLogin,
    tgFooter,
    tgFix,
    dragVerify,
  },
  computed: {
    getMemberLogined() {
      return this.$store.state.member.MemberLogined;
    },
    getUrlID() {
      const path = this.$route.path.split('/');
      const parHash = path[1];
      return parHash;
    },
  },
  methods: {
    verifyCheck() {
      if (this.$refs.VerifyItem.isPassing) {
        this.verifyIsPassing = true;
        this.verify.text2 = '';
      } 
    },
    handleFormKeyIn(name) {
      this.$validator.validate(name);
      this.$store.state.member.MemberRegisterErrorMessage = '';
      this.showeErorMsg = false;
    },
    submit() {
      const vm = this;
      this.showeErorMsg = false;
      if (this.verifyIsPassing === '') {
        this.showeErorMsg = true;
        this.verify.text2 = '拖动滑块完成验证';
      }
      this.$validator.validate().then((result) => {
        if (!result) {
          this.showeErorMsg = true;
          this.GA_mlogin_login();
        } else if (this.verifyIsPassing === true) {
          this.showeErorMsg = false;
          this.GA_mlogin_login();
          this.$store.dispatch('member/MemberLogin', this.member)
            .then((res) => {
              if (res.data.status === 1 || res.data.status === '1') {
                // if (vm.getUrlID === 'login') {
                //   router.push('/member');
                // }
                // 更換在線客服UserName
                window.LC_API.set_custom_variables([{ name: vm.UserName }]);
                // window.location.reload();
              } else if (res.data.error_code === 20006 || res.data.error_code === '20006') {
                vm.error_dialogShow = true;
                vm.error_dialogMessage = res.data.error_message;
                if(res.data.other.jwt_token){
                  window.localStorage.setItem('JWT_TOKEN', res.data.other.jwt_token);
                };
              } else {
                vm.showeErorMsg = true;
                vm.verify.text2 = res.data.error_message;
                if(res.data.other.jwt_token){
                  window.localStorage.setItem('JWT_TOKEN', res.data.other.jwt_token);
                };
              }
            });
        }
      });
    },
  },
  watch: {
    getMemberLogined() {
      if (this.$store.state.member.MemberLogined === true) {
        router.push('/member');
      } else {
        router.push('/index');
      }
    },
  },
  mounted() {
    if (this.$store.state.member.MemberLogined === true) {
      router.push('/member');
    }
    this.verify.width = this.$refs.username.clientWidth - 80;
  },
};
</script>
<style lang="scss" scoped>
</style>
