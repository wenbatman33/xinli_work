<template lang="pug">
//- 登入表單
van-form.login-form.pt-4.pb-8(@submit='submitForm')
	//- 手機號碼
	input-field(v-model='loginForm.user_login', label='手机号码', name='user_login', type='tel', placeholder='请输入手机号码', :rules='[ { required: true, message: "请输入手机号码" }, { validator: checkPhone, message: "请输入正确的手机号" }, ]')

	//- 密碼
	input-field.mt-4(v-model='loginForm.user_pass', label='您的密码', name='user_pass', type='password', placeholder='请输入密码', :rules='[{ required: true, message: "请输入密码" }]')

	.w-full.flex.flex-row.justify-between.mt-4
		//- 自動登入
		van-button.auto-button.rounded-md
			.flex.flex-row.items-center.py-1
				img.w-4.h-4(src='/publicAssets/img/login/icon-check@3x.png')
				.text-sm.font-bold.ml-2 自动登录

		//- 忘記密碼
		van-button.forget-button.rounded-md(@click='clickForget')
			.flex.flex-row.items-center.py-1
				.text-sm.font-bold 忘记密码
				img.w-4.h-4.ml-2(src='/publicAssets/img/login/icon-arrow-right@3x.png')

	//- 登入
	submit-button.mt-2(text='登录', :loading='isLogging', native-type='submit')

	//- 用戶協議
	agreement.mt-4
</template>

<script>
import { useStore } from 'vuex';
import { reactive, computed, toRaw } from 'vue';
import inputField from '@/components/inputField';
import submitButton from '@/components/submitButton';
import agreement from '@/components/login/agreement.vue';

export default {
	components: {
		inputField,
		submitButton,
		agreement,
	},
	emits: ['click-forget'],
	setup(props, { emit }) {
		// Vue store
		const store = useStore();

		// Login form
		const loginForm = reactive({
			user_login: '',
			user_pass: '',
		});

		// 是否正在登入
		const isLogging = computed(() => {
			return store?.state?.user?.isLogging === true;
		});

		// 手機格式檢驗
		const checkPhone = () => {
			return /^(1)\d{10}$/.test(loginForm.user_login);
		}

		// 點擊忘記密碼按鈕
		const clickForget = () => {
			emit('click-forget');
		};

		// 提交表單
		const submitForm = () => {
			const payload = toRaw(loginForm);
			store.dispatch('user/USER_LOGIN', payload)
		};
		return {
			isLogging,
			loginForm,
			checkPhone,
			clickForget,
			submitForm,
		};
	},
};
</script>
<style lang="scss" scoped>
.login-form {
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
	.forget-button {
		width: unset;
		height: unset;
		padding: 0;
		color: #a62337;
		border: transparent;
		background: rgba(255, 255, 255, 0.75);
	}
}
</style>
