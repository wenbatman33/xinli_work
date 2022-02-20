<template lang="pug">
.w-full.FLEX_C.justify-center
	.forgotForm.pt-16.pb-24.px-12.relative
		h2.text-psV3Red 忘记密码
		a-form.w-full(:model='forgotForm', :rules='ForgotFormRules', @submit='submitForgotForm')
			a-form-item.my-4(name='user_login')
				a-input(v-model:value='forgotForm.user_login', :autocomplete='forgotForm.remember', placeholder='请输入手机号码')
			a-form-item.my-4.p-0(name='code')
				.BETWEEN
					a-input(v-model:value='forgotForm.code', placeholder='请输入验证码')
					button.w-24.bg-psV3Red.text-white.text-xs(type='primary', :loading='codeState.loading', :disabled='codeState.smsSendBtn', @click='getRegCodeHandle') 
						span(v-if='codeState.smsSendBtn') {{ codeState.time + ' s' }}
						span(v-if='!codeState.smsSendBtn') 获取验证码
			a-form-item.my-4(name='user_pass')
				a-input(v-model:value='forgotForm.user_pass', :autocomplete='forgotForm.remember', type='password', placeholder='请输入密码')
			a-form-item.my-4(name='user_pass2')
				a-input(v-model:value='forgotForm.user_pass2', :autocomplete='forgotForm.remember', type='password', placeholder='请再次输入密码')
			a-form-item.my-4.text-center
				button.w-40.rounded-lg.bg-psV3Red.text-white(html-type='submit') 确认重置
		.monkey.w-full.text-right.absolute.bottom-0.z-0(style='pointer-events: none;')
			img(src='/publicAssets/img/v3/img-wretched-orangutan-3.png', srcset='/publicAssets/img/v3/img-wretched-orangutan-3@2x.png 2x')
</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, toRaw } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { message } from 'ant-design-vue';
import { register, getRegCode, getForgotCode, resetPass } from '@/api';
import { matomo_forget_sendCode, matomo_forget_getCode } from '@/matomoEvent';

export default {
	props: [],
	setup(props, { emit }) {
		const store = useStore();
		const router = useRouter();
		// validator 需先宣告
		let checkPhone = async (rule, value) => {
			if (value === '') {
				return Promise.reject(new Error('请输手机号'));
			} else if (!/^(1)\d{10}$/.test(value)) {
				return Promise.reject(new Error('请输入正确的手机号'));
			} else {
				return Promise.resolve();
			}
		};
		let checkPassword = async (rule, value) => {
			if (value !== forgotForm.user_pass) {
				return Promise.reject(new Error('两次输入密码不一致'));
			} else {
				return Promise.resolve();
			}
		};
		const codeState = reactive({
			time: 60,
			smsSendBtn: false,
			loading: false,
		});
		const forgotForm = reactive({
			user_login: '',
			user_pass: '',
			user_pass2: '',
			code: '',
			remember: true,
		});
		const ForgotFormRules = reactive({
			user_login: [
				{ required: true, message: '请输入手机号码', trigger: ['change', 'blur'] },
				{ validator: checkPhone, trigger: 'change' },
			],
			user_pass: [{ required: true, message: '请输入密码', trigger: ['change', 'blur'] }],
			user_pass2: [
				{ required: true, message: '请再次输入密码', trigger: ['change', 'blur'] },
				{ validator: checkPassword, trigger: ['change', 'blur'] },
			],
			code: [{ required: true, message: '验证码错误', trigger: ['change', 'blur'] }],
		});
		const { validate, validateInfos } = useForm(forgotForm, ForgotFormRules);

		const submitForgotForm = (e) => {
			matomo_forget_sendCode();
			e.preventDefault();
			validate()
				.then(() => {
					const payload = toRaw(forgotForm);
					resetPass(payload).then((res) => {
						message.success('重设密码完成');
						emit('change-login-modal', 1);
					});
				})
				.catch((error) => {
					message.error(error.message);
				});
		};
		const agreement = () => {
			router.push({ path: '/about/4' });
			store.commit('user/CLOSE_LOGIN_MODEL');
		};
		const getRegCodeHandle = () => {
			matomo_forget_getCode();
			checkPhone('', forgotForm.user_login).then(() => {
				const payload = { mobile: forgotForm.user_login, sign: 'dfgdfffdfddf' };
				getRegCodeEvent(payload);
			});
		};
		const getRegCodeEvent = (payload) => {
			codeState.loading = false;
			getForgotCode(payload)
				.then((res) => {
					codeState.smsSendBtn = true;
					const interval = window.setInterval(() => {
						if (codeState.time-- <= 0) {
							codeState.time = 60;
							codeState.smsSendBtn = false;
							window.clearInterval(interval);
						}
					}, 1000);
				})
				.catch((error) => {
					codeState.loading = false;
					codeState.time = 60;
					codeState.smsSendBtn = false;
					message.error(error.message);
				});
		};
		return {
			codeState,
			forgotForm,
			validateInfos,
			ForgotFormRules,
			submitForgotForm,
			agreement,
			getRegCodeHandle,
			getRegCodeEvent,
		};
	},
};
</script>

<style lang="scss" scoped>
.forgotFormButton {
	width: 170px;
	height: 36px;
	line-height: 36px;
	border-radius: 30px;
	outline: none;
	border: none;
	color: #fff;
	background: #a62337;
}
.footerText {
	font-size: 12px;
	color: #8e8e93;
	background: #f4f5f8;
	text-align: center;
	padding: 10px 0;
	margin: 15px 0 0 0;

	span {
		color: #a62337;
		cursor: pointer;
	}
}
::v-deep(.ant-form-explain),
::v-deep(.ant-form-extra) {
	font-size: 12px;
	text-align: right;
	margin-top: -6px;
}
</style>
