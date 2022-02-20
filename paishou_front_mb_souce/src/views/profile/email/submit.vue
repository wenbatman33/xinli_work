<template lang="pug">
//- 綁定信箱-提交頁
.email-submit
	//- 表單
	van-form.mx-4.mt-6(@submit='submit')
		//- 信箱輸入框
		input-field(v-model='emailForm.email', label='您的邮箱', name='email', placeholder='请输入邮箱', :rules='[ { required: true, message: "请输入邮箱" }, { validator: checkEmail, message: "邮箱格式错误" }, ]')

		//- 驗證碼輸入框
		input-field.mt-6(v-model='emailForm.code', label='验证码确认', name='code', placeholder='请输入验证码', :rules='[{ required: true, message: "请输入验证码" }]')
			template(#button)
				verify-button(:loading='state.isVerifying', :disabled='state.smsCountDown > 0', :text='verifyButtonText', @click='clickVerify')

		//- 提交按鈕
		submit-button.mt-12(:loading='state.isSubmitting', native-type='submit', text='确认修改')
</template>
<script>
import { reactive, computed, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Dialog } from 'vant';
import { verifyEmailSms, verifyEmail } from '@/api';
import { matomo_bindEmail_getCode, matomo_bindEmail_sendCode } from '@/matomoTrackEvent.js';
import inputField from '@/components/inputField';
import submitButton from '@/components/submitButton';
import verifyButton from '@/components/verifyButton';

export default {
	components: {
		inputField,
		verifyButton,
		submitButton,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			smsCountDown: 0,
			isVerifying: false,
			isSubmitting: false,
		});

		// Email form
		const emailForm = reactive({
			email: '',
			code: '',
		});

		// User id
		const uid = computed(() => {
			return store.state.user.uid || '';
		});

		// 獲取驗證碼按鈕文字
		const verifyButtonText = computed(() => {
			if (state.smsCountDown <= 0) {
				return '获取验证码';
			} else {
				return `重新获取(${state.smsCountDown}秒)`;
			}
		});

		// 檢查信箱欄位
		const checkEmail = () => {
			return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(emailForm.email);
		};

		// 點擊獲取驗證郵件按鈕
		const clickVerify = () => {
			// Validate email format
			if (!checkEmail()) {
				return;
			}

			// Update verifying state
			state.isVerifying = true;

			// Post body
			const body = {
				uid: Number(uid.value),
				email: emailForm.email,
			};

			// Verify email sms
			verifyEmailSms(body)
				.then((res) => {
					// Validate response code
					if (res.code === 0) {
						// Setup sms count down seconds
						state.smsCountDown = 600;

						// Start sms count down interval
						const smsCountDownInterval = setInterval(() => {
							if (state.smsCountDown > 0) {
								state.smsCountDown--;
							} else {
								clearInterval(smsCountDownInterval);
							}
						}, 1000);
					}

					// Revert verifying state on finished
					state.isVerifying = false;
				})
				.catch(() => {
					// Revert verifying state on error
					state.isVerifying = false;
				});

			// Matomo track
			matomo_bindEmail_getCode();
		};

		// 提交表單
		const submit = () => {
			// Update submitting state
			state.isSubmitting = true;

			// Post body
			const body = {
				uid: Number(uid.value),
				...toRaw(emailForm),
			};

			// Verify email
			verifyEmail(body)
				.then((res) => {
					// Validate response code
					if (res.code === 0) {
						// Dispatch update action
						store.dispatch('user/GET_USER_INFO');

						// Dialog success message
						Dialog.alert({
							message: '邮箱绑定成功。',
						}).then(() => {
							// Navigation back
							router.go(-1);
						});
					}

					// Revert submitting state on finished
					state.isSubmitting = false;
				})
				.catch(() => {
					// Revert submitting state on error
					state.isSubmitting = false;
				});

			// Matomo track
			matomo_bindEmail_sendCode();
		};
		return {
			state,
			emailForm,
			verifyButtonText,
			checkEmail,
			clickVerify,
			submit,
		};
	},
};
</script>
<style lang="scss" scoped>
.email-submit {
	width: 100%;
	::v-deep(.van-cell) {
		padding: 0;
	}
}
</style>