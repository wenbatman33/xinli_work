<template lang='pug'>
	div(v-if='this.$store.state.member.MemberForgetSteps === 1')
		.memberforget
			.memberforget_step
				ul
					li.step01
						.step_fettle01 1
						hr.hr_fettle01
						span.span_fettle01 验证信息
					li.step02
						.step_fettle02 2
						hr.hr_fettle02
						span.span_fettle02 身份验证
					li.step03
						.step_fettle03 3
						hr.hr_fettle02
						span.span_fettle03 重置密码
			.memberforget_caption 输入验证信息
			.memberforget_content
				.memberinput
					ul
						li
							input#phone.phone(type="text"
																v-model.trim='VertifyInfo'
																placeholder="输入手机或邮箱"
																v-validate='"required|Accounts"'
																name='userAccount'
																data-vv-as='请输入正确的手机或邮箱'
																:class='{"input": true, "error": errors.has("userAccount")}'
																@blur='handleFormKeyIn("userAccount")')
						div.error(v-show='errors.has("userAccount")') {{ errors.first("userAccount") }}
				form(action="member_forget_step2.html" method="get")
					button.memberforget_btn(@click.prevent="MemberPasswordForget" type="button") 下一步
	div(v-else-if='this.$store.state.member.MemberForgetSteps === 2')
		.memberforget
			.memberforget_step
				ul
					li.step01
						.step_fettle01 1
						hr.hr_fettle01
						span.span_fettle01 验证信息
					li.step02
						.step_fettle01 2
						hr.hr_fettle01
						span.span_fettle01 身份验证
					li.step03
						.step_fettle02 3
						hr.hr_fettle02
						span.span_fettle02 重置密码
			.memberforget_caption
			.memberforget_phone(v-if='infotype == 1') 已发送验证码至手机<br><br>
				span {{tempInputVal}}
			.memberforget_phone(v-else) 已发送验证码至电子邮箱<br><br>
				span {{tempInputVal}}
			.memberforget_content
				.memberinput
					ul
						li
							input#phonevtcod.phonevtcod(v-model='Code' type="text" placeholder="输入您收到的验证码")
						div.error(v-if='VertifyError') {{VertifyError}}
				// .resendphone
				// 	span 49	
				// 	|秒可后重新发送
				form(v-if='infotype==1' action="member_forget_step3.html" method="get")
					button.memberforget_btn(@click.prevent="PhoneVertify" type="button") 下一步
				form(v-else action="member_forget_step3.html" method="get")
					button.memberforget_btn(@click.prevent="EmailVertify" type="button") 下一步

	div(v-else-if='this.$store.state.member.MemberForgetSteps === 3')
		.memberforget
			.memberforget_step
				ul
					li.step01
						.step_fettle01 1
						hr.hr_fettle01
						span.span_fettle01 验证信息
					li.step02
						.step_fettle01 2
						hr.hr_fettle01
						span.span_fettle01 身份验证
					li.step03
						.step_fettle01 3
						hr.hr_fettle01
						span.span_fettle01 重置密码
			.memberforget_caption 設定新密碼
			.memberforget_content
				.memberinput
					ul
						li
							input#password.password(type="password"
																			v-model.trim='Password'
																			placeholder="请输入新密码"
																			v-validate='"required|Psw18"'
																			name='passwordold'
																			data-vv-as='8～20字母和数字或下划线的组合、不含特殊符号'
																			:class='{"input": true, "error": errors.has("passwordold") }'
																			@blur='resetIsMatch("passwordold")')
						.error(v-show='errors.has("passwordold")') {{ errors.first('passwordold') }}
						li
							input#ckPassword.password(type="password"
																				v-model.trim='ckPassword'
																				placeholder="再次确认密码"
																				v-validate='"required|Psw18Check"'
																				name='passwordnew'
																				data-vv-as='请输入新密码'
																				:class='{"input": true, "error": errors.has("passwordnew") }'
																				@blur='resetIsMatch("passwordnew")')
						.error(v-show='errors.has("passwordnew")') {{ errors.first('passwordnew') }}
						div.error(v-if='VertifyError') {{VertifyError}}
				form(action="member_forget_sucess.html" method="get")
					button.memberforget_btn(@click.prevent="MemberPasswordReset" type="button") 提交

	div(v-else-if='this.$store.state.member.MemberForgetSteps === 4')
		.memberforget
			.memberforget_content
				.memberforget_sucess
					img(src="/static/img/icon-forget-sucess.svg")
					span 修改成功
				// .memberforget_return 正在跳转回老虎城首页	
				// 	span 5 秒，
				// 	br 
				// 	| 或直接点击下方按钮
				form(action="index.html" method="get")
					router-link.memberforget_btn(to="/") 回首页
</template>
<script>
import axios from 'axios';
import router from '@/router/router';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      VertifyInfo: '',
      VertifyError: '',
      Code: '',
      member: {},
      username: '',
      Password: '',
      ckPassword: '',
      disMatch: false,
      tempInputVal: '',
      infotype: '',
    };
  },
  methods: { 
    stepNext() {
      if (this.$store.state.member.MemberForgetSteps < 4) this.$store.state.member.MemberForgetSteps += 1;
    },
    handleFormKeyIn(name) {
      this.$validator.validate(name);
    },
    MemberPasswordForget() {
      if (this.VertifyInfo === '') {
        this.VertifyError = '请确认手机或信箱';
        return false;
      }
      const vm = this;
      const payload = {};
      payload.VertifyInfo = this.VertifyInfo;
      this.tempInputVal = this.VertifyInfo;
      axios.post(`${process.env.VUE_APP_APIHOST}/Member/MemberPasswordForget`, payload)
        .then((res) => {
          console.log(res);
          if (res.data.status === 1) {
            vm.infotype = res.data.infotype;
            vm.VertifyError = '';
            vm.stepNext();
          } else {
            vm.$message({
              message: res.data.error_message,
              type: 'error',
              duration: 1500,
              center: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      return true;
      // if (this.VertifyInfo === '') {
      //   this.VertifyError = '请确认手机或信箱';
      //   // return false;
      // } else if (!(/^(13|14|15|18)\d{9}$/.test(this.VertifyInfo) || /^09\d{8}$/.test(this.VertifyInfo) || /^09\d{9}$/.test(this.VertifyInfo) || /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.VertifyInfo))) {
      //   this.VertifyError = '请确认手机或信箱';
      // } else {
      //   const vm = this;
      //   const payload = {};
      //   payload.VertifyInfo = this.VertifyInfo;
      //   this.tempInputVal = this.VertifyInfo;
      //   axios.post(`${process.env.VUE_APP_APIHOST}/Member/MemberPasswordForget`, payload)
      //     .then((res) => {
      //       console.log(res);
      //       if (res.data.status === 1) {
      //         vm.infotype = res.data.infotype;
      //         vm.VertifyError = '';
      //         vm.stepNext();
      //       } else {
      //         vm.VertifyError = res.data.error_message;
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // }
    },
    PhoneVertify() {
      const vm = this;
      const payload = {};
      payload.VertifyInfo = this.VertifyInfo;
      payload.Code = this.Code;
      axios.post(`${process.env.VUE_APP_APIHOST}/member/PhoneVertify`, payload)
        .then((res) => {
          console.log(res);
          if (res.data.status === 1) {
            vm.VertifyError = '';
            vm.stepNext();
          } else {
            vm.$message({
              message: res.data.error_message,
              type: 'error',
              duration: 1500,
              center: true,
            });
            vm.VertifyError = res.data.error_message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    EmailVertify() {
      const vm = this;
      const payload = {};
      payload.VertifyInfo = this.VertifyInfo;
      payload.Code = this.Code;
      axios.post(`${process.env.VUE_APP_APIHOST}/member/EmailVertify`, payload)
        .then((res) => {
          console.log(res);
          if (res.data.status === 1) {
            vm.VertifyError = '';
            vm.stepNext();
          } else {
            vm.$message({
              message: res.data.error_message,
              type: 'error',
              duration: 1500,
              center: true,
            });
            vm.VertifyError = res.data.error_message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetIsMatch(name) {
      this.disMatch = false;
      this.$validator.validate(name);
    },
    MemberPasswordReset() {
      const vm = this;
      if (this.Password === this.ckPassword) {
        const payload = {};
        payload.VertifyInfo = this.VertifyInfo;
        payload.Password = this.Password; 
        this.disMatch = false;
        axios.post(`${process.env.VUE_APP_APIHOST}/member/MemberPasswordReset`, payload)
          .then((res) => {
            console.log(res);
            if (res.data.status === 1) {
              vm.VertifyError = '';
              vm.stepNext();
            } else {
              vm.VertifyError = res.data.error_message;
            }
          })
          .catch((error) => {
            // console.log(error)
          });
      } else {
        vm.VertifyError = '请确认密码一致性';
        this.disMatch = true;
      }
    },
  },
  mounted() {
    this.$store.state.member.MemberForgetSteps = 1;
  },
};
</script>
<style lang="scss" scoped>
</style>
