<template lang='pug'>
	section
		.memberregister
			.membertab_a
				ul
					li
						router-link(to="/login") 登录
					li
						router-link.membertab_a_active(to="/register") 注册
			.memberinput
				ul
					li
						input#username.username(type='text' 
																		ref='username'
																		v-model.trim='memberData.UserName'
																		placeholder='用户名'
																		v-validate='"required|AccountV"'
																		name='userName'
																		data-vv-as='请输入用户名'
																		:class='{"input": true, "error": errors.has("userName")}'
																		@blur='handleFormKeyIn("userName")')
					.error(v-show='errors.has("userName")') {{ errors.first('userName') }}
					li
						input#phone.phone(type='tel'
															v-model.trim='memberData.Phone'
															placeholder='手机号'
															v-validate='"required|PhoneV"'
															name='mobile'
															data-vv-as='请输入手机号'
															maxlength='11'
															:class='{"input": true, "error": errors.has("mobile") }' 
															@blur='handleFormKeyIn("mobile")')
					.error(v-show='errors.has("mobile")') {{ errors.first('mobile') }}
					li
						input#email.email(type='text'
															v-model.trim='memberData.Email'
															placeholder='邮箱'
															v-validate='"required|EmailV"'
															name='email'
															data-vv-as='请输入邮箱'
															:class='{"input": true, "error": errors.has("email") }' 
															@blur='handleFormKeyIn("email")')
					.error(v-show='errors.has("email")') {{ errors.first('email') }}
					li
						input.password(type='password'
													v-model.trim='memberData.Password'
													placeholder='密码'
													v-validate='"required|Psw18"'
													name='password1'
													data-vv-as='请输入密码'
													:class='{"input": true, "error": errors.has("password1") }'
													@blur='handleFormKeyIn("password1")')
					.error(v-show='errors.has("password1")') {{ errors.first('password1') }}
					li
						input.password(type='password'
													v-model.trim='ckPassword'
													placeholder='确认密码'
													v-validate='"required|Psw18|confirmed:"+memberData.Password'
													name='password2'
													data-vv-as='请输入密码'
													:class='{"input": true, "error": errors.has("password2") }'
													@blur='handleFormKeyIn("password2")')
					.error(v-show='errors.has("password2")') {{ errors.first('password2') }}
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
			.memberregister_check
				label
					input#check.check(v-model='privacyPolicy' type="checkbox" )
					| 我已年满18岁，并已阅读同意
					a(href="/faqs?type=3" target="_blank") 《相关条款》
					br
					| 与
					a(href="/faqs?type=2" target="_blank") 《隐私权政策》
				.errorDiv(v-if='showeErorMsg')
					.error {{ errorMsg }}
				.errorDiv(v-if='getMemberRegisterErrorMessage')
					.error {{ getMemberRegisterErrorMessage }}

			form(action="member.html" method="get")
				button.memberregister_btn(@click.prevent='submit' type='button') 注册
			.memberregister_link
				| 已经有账号了？
				router-link(to="/login" v-on:click.native='GA_mregister_login') 登录
</template>
<script>
import router from '@/router/router';
import dragVerify from 'vue-drag-verify';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    dragVerify,
  },
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
      errorMsg: '请确认填入信息',
      showeErorMsg: false,
      privacyPolicy: true,
      ckPassword: '',
      memberData: {
        UserName: '',
        Password: '',
        Phone: '',
        Email: '',
        Aid: '',
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
  computed: {
    ...mapState('member', [
      'Aid',
    ]),
    getMemberRegisterErrorMessage() {
      return this.$store.state.member.MemberRegisterErrorMessage;
    },
  },
  methods: {
    verifyCheck() {
      if (this.$refs.VerifyItem.isPassing) {
        this.verifyIsPassing = true;
        this.verify.text2 = '';
      } 
    },
    cancel(e) {
      this.memberData.UserName = '';
      this.memberData.Password = '';
      this.memberData.Phone = '';
      this.memberData.Email = '';
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
      if (this.privacyPolicy !== true) {
        this.showeErorMsg = true;
        this.errorMsg = '请同意《相关的条款》和《隐私权政策》';
      } else {
        this.errorMsg = '请确认填入信息';
      }
      this.$validator.validate().then((result) => {
        if (!result) {
          this.showeErorMsg = true;
        } else if (this.showeErorMsg === false &&
              this.ckPassword === this.memberData.Password && 
              this.privacyPolicy === true && 
              this.memberData.UserName !== '' && 
              this.memberData.Password !== '' && 
              this.memberData.Phone !== '' && 
              this.memberData.Email !== '' && 
              this.verifyIsPassing === true) {
          this.showeErorMsg = false;
          if (window.localStorage.Aid) {
            this.memberData.Aid = window.localStorage.Aid;
          }
          this.$store.dispatch('member/MemberRegister', this.memberData)
            .then((res) => {
              if (res.data.status === 1) {
                // this.GA_register_successmobile(this.memberData.UserName);
                window.localStorage.removeItem('Aid');
                vm.GA_register_successmobile(); 
                router.push('/');
                vm.$store.dispatch('member/MemberGetDetilData');
              } else {
                vm.GA_mregister_fail();
              }
            });
        }
      });
    },
  },
  mounted() {
    if (this.$route.query.Aid) {
      window.localStorage.setItem('Aid', this.$route.query.Aid);
    }
    if (this.$store.state.member.MemberLogined === true) {
      router.push('/member');
    }
    this.verify.width = this.$refs.username.clientWidth - 80;
  },
};
</script>
<style lang='scss' scoped>
.el-form-item_error{
	input{
		border: 1px solid #dc3545;
	}
}
.errorDiv{
	text-align: center;
  margin-top: 30px;
}
</style>
<style lang='scss'>
.dv_handler{
  margin-top: 1px !important;
  margin-left: 1px !important;
}
</style>
