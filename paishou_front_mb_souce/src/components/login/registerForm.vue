<template lang="pug">
//- 註冊表單
van-form.register-form.pt-4.pb-8(@submit='submitForm')
	//- 手機號碼
	input-field(v-model='registerForm.user_login', label='手机号码', name='user_login', type='tel', placeholder='请输入手机号码', :rules='[ { required: true, message: "请输入手机号码" }, { validator: checkPhone, message: "请输入正确的手机号" }, ]')

	//- 密碼
	.grid.grid-cols-2.gap-4.mt-4
		//- 設置密碼
		input-field(v-model='registerForm.user_pass', label='设定密码', name='user_pass', type='password', placeholder='请输入密码', :rules='[{ required: true, message: "请输入密码" }]')

		//- 確認密碼
		input-field(v-model='registerForm.user_pass2', label='确认密码', name='user_pass2', type='password', placeholder='请再次输入新密码', :rules='[ { required: true, message: "请再次输入新密码" }, { validator: checkPassword, message: "两次输入密码不一致" }, ]')

	//- 推薦碼
	input-field.mt-4(v-model='registerForm.invite_code', label='推荐码(非必填)', placeholder='请输入推荐码(非必填)')

	//- 驗證碼
	input-field.mt-4(v-model='registerForm.code', label='验证码', name='user_pass2', type='text', placeholder='请输入验证码', :rules='[{ required: true, message: "请输入验证码" }]')
		template(#button)
			verify-button(:text='codeState.smsSendBtn ? `${codeState.time} s` : "获取验证码"', :disabled='codeState.smsSendBtn', :loading='codeState.isLoading', @click='clickVerify')

	//- 自動登入
	van-button.auto-button.rounded-md.mt-4
		.flex.flex-row.items-center.py-1
			img.w-4.h-4(src='/publicAssets/img/login/icon-check@3x.png')
			.text-sm.font-bold.ml-2 自动登录
	//- 註冊
	submit-button.mt-8(text='注册', :loading='isRegistering', native-type='submit')

	//- 用戶協議
	agreement.mt-4
</template>

<script>
import { useStore } from 'vuex';
import { reactive, computed, toRaw } from 'vue';
import { register, getRegCode } from '@/api';
import { Notify } from 'vant';
import { matomo_register_getCode, matomo_register_sendCode } from '@/matomoTrackEvent.js';
import inputField from '@/components/inputField';
import verifyButton from '@/components/verifyButton';
import submitButton from '@/components/submitButton';
import agreement from '@/components/login/agreement.vue';

export default {
	components: {
		inputField,
		verifyButton,
		submitButton,
		agreement,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			isRegistering: false,
		});

		// 驗證碼狀態
		const codeState = reactive({
			time: 60,
			smsSendBtn: false,
			isLoading: false,
		});

		// 註冊表單
		const registerForm = reactive({
			user_login: '',
			user_pass: '',
			user_pass2: '',
			code: '',
			invite_code: '',
		});

		// 是否正在註冊
		const isRegistering = computed(() => {
			return state.isRegistering || store?.state?.user?.isLogging === true;
		});

		// 手機格式檢驗
		const checkPhone = () => {
			return /^(1)\d{10}$/.test(registerForm.user_login);
		};

		// 密碼格式檢驗
		const checkPassword = (value) => {
			return value === registerForm.user_pass;
		};

		// 點擊取得驗證碼按鈕
		const clickVerify = () => {
			if (checkPhone()) {
				// Update loading state
				codeState.isLoading = true;

				// Post body
				const payload = { mobile: registerForm.user_login, sign: 'dfgdfffdfddf' };

				// Get register code
				getRegCode(payload)
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
				matomo_register_getCode();
			} else {
				Notify({ type: 'danger', message: '请输入正确的手机号' });
			}
		};

		// 提交表單
		const submitForm = () => {
			// Update registering state
			state.isRegistering = true;

			// Post body
			const payload = toRaw(registerForm);

			// Register
			register(payload)
				.then(() => {
					store.dispatch('user/USER_LOGIN', payload);
					state.isRegistering = false;
				})
				.catch(() => {
					state.isRegistering = false;
				});

			// Matomo track
			matomo_register_sendCode();
		};
		return {
			codeState,
			registerForm,
			isRegistering,
			checkPhone,
			checkPassword,
			clickVerify,
			submitForm,
		};
	},
};
</script>
<style lang="scss" scoped>
.register-form {
	::v-deep(.van-cell) {
		padding: 0;
	}
	.auto-button {
		width: unset;
		height: unset;
		padding: 0;
		color: #000000;
		border: transparent;
		background: rgba(255, 255, 255, 0.75);
	}
}
</style>
