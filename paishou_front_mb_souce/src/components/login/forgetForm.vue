<template lang="pug">
//- 忘記密碼表單
van-form.forget-form.pt-4.pb-8(@submit='submitForm')
	//- 手機號碼
	input-field(v-model='forgotForm.user_login', label='手机号码', name='user_login', type='tel', placeholder='请输入手机号码', :rules='[ { required: true, message: "请输入手机号码" }, { validator: checkPhone, message: "请输入正确的手机号" }, ]')

	//- 驗證碼
	input-field.mt-4(v-model='forgotForm.code', label='验证码', name='user_pass2', type='text', placeholder='请输入验证码', :rules='[{ required: true, message: "请输入验证码" }]')
		template(#button) 
			verify-button(:text='codeState.smsSendBtn ? `${codeState.time} s` : "获取验证码"', :disabled='codeState.smsSendBtn', :loading='codeState.isLoading', @click='clickVerify')

	//- 新密碼
	input-field.mt-4(v-model='forgotForm.user_pass', label='新密码', name='user_pass', type='password', placeholder='请输入密码', :rules='[{ required: true, message: "请输入密码" }]')

	//- 確認密碼
	input-field.mt-4(v-model='forgotForm.user_pass2', label='确认密码', name='user_pass2', type='password', placeholder='请再次输入新密码', :rules='[ { required: true, message: "请再次输入新密码" }, { validator: checkPassword, message: "两次输入密码不一致" }, ]')

	//- 確認重置
	submit-button.mt-8(text='确认重置', :loading='state.isSubmitting', native-type='submit')
</template>
<script>
import { reactive, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { getForgotCode, resetPass } from '@/api';
import { Notify } from 'vant';
import { matomo_forget_getCode, matomo_forget_sendCode } from '@/matomoTrackEvent.js';
import inputField from '@/components/inputField';
import verifyButton from '@/components/verifyButton';
import submitButton from '@/components/submitButton';

export default {
	components: {
		inputField,
		verifyButton,
		submitButton,
	},
	setup() {
		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			isSubmitting: false,
		});

		// 驗證碼狀態
		const codeState = reactive({
			time: 60,
			smsSendBtn: false,
			isLoading: false,
		});

		// 忘記密碼表單
		const forgotForm = reactive({
			user_login: '',
			user_pass: '',
			user_pass2: '',
			code: '',
			remember: true,
		});

		// 手機格式檢驗
		const checkPhone = () => /^(1)\d{10}$/.test(forgotForm.user_login);

		// 密碼格式檢驗
		const checkPassword = (value) => value === forgotForm.user_pass;

		// 點擊取得驗證碼按鈕
		const clickVerify = () => {
			if (checkPhone()) {
				// Update loading state
				codeState.isLoading = true;
				
				// Post body
				const payload = { mobile: forgotForm.user_login, sign: 'dfgdfffdfddf' };

				// Get forget code
				getForgotCode(payload)
					.then(() => {
						codeState.isLoading = false;
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
						codeState.isLoading = false;
						codeState.time = 60;
						codeState.smsSendBtn = false;
						Notify({ type: 'danger', message: error.message });
					});

				// Matomo track
				matomo_forget_getCode();
			} else {
				Notify({ type: 'danger', message: '请输入正确的手机号' });
			}
		};

		// 提交表單
		const submitForm = () => {
			// Update submitting state
			state.isSubmitting = true;

			// Post body
			const payload = toRaw(forgotForm);

			// Reset password
			resetPass(payload)
				.then((res) => {
					state.isSubmitting = false;
					if (res.code === 0) {
						Notify({ type: 'success', message: '密码重置成功，请重新登录' });
						router.replace('/login');
					}
				})
				.catch(() => {
					state.isSubmitting = false;
				});

			// Matomo track
			matomo_forget_sendCode();
		};
		return {
			state,
			codeState,
			forgotForm,
			checkPhone,
			checkPassword,
			clickVerify,
			submitForm,
		};
	},
};
</script>
<style lang="scss" scoped>
.forget-form {
	::v-deep(.van-cell) {
		padding: 0;
	}
}
</style>