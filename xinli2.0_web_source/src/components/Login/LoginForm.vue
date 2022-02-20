<template lang="pug">
div(class='justify-between w-full CENTER')
	div(class='w-1/2 px-12 loginForm')
		h2.text-psV3Red {{ $t('loginForm_title') }}
		.text-xs.text-gray-500 {{ $t('loginForm_desc') }}
	div(class='px-12 loginForm')
		.flex.justify-center.pt-4
			a-form.w-full(:class='"w-[300px]"' layout='vertical')
				a-form-item.my-2(name='account', v-bind='validateInfos.account' :label='$t("loginForm_account")')
					a-input.w-full(v-model:value='loginForm.account',  :placeholder='$t("loginForm_accountPlaceholder")')

				a-form-item.my-2(name='password', v-bind='validateInfos.password' :label='$t("loginForm_password")')
					a-input.w-full(v-model:value='loginForm.password', :placeholder='$t("loginForm_passwordtPlaceholder")', type='password')
				#verifyCode
				.my-4.text-center.w-full
					a-button.w-full.h-11.rounded-lg.text-white.my-2(type='primary' :disabled='verifyCodeDone' @click='onSubmit') {{$t('loginForm_submitButton')}}
					a-button.w-full.h-11.rounded-lg.my-2(@click='showRegister') {{$t('loginForm_registerButton')}}
</template>

<script setup lang="ts">
	import { onMounted, onUnmounted, reactive, toRaw, computed } from 'vue';
	/* ant */
	import { Form } from 'ant-design-vue';
	/* i18n */
	import { useI18n } from 'vue-i18n';
	/* store */
	import { SystemStore } from '@/store/systemStore';
	import { UserStore } from '@/store/userStore';
	/* api */
	import type { MEMBERAJAX_LoginRequest } from '@/api/model';

	const ENV = import.meta.env;
	// import { message } from 'ant-design-vue';
	const { t } = useI18n();
	/* store */
	const userStore = UserStore();
	const systemStore = SystemStore();

	const myCaptcha = window._dx;

	const useForm = Form.useForm;

	const loginForm = reactive<MEMBERAJAX_LoginRequest>({
		account: '',
		password: '',
		deviceID: '1',
		platform: 1,
		token: '',
	});

	const loginFormRules = reactive({
		account: [{ required: true, message: t('loginForm_accountPlaceholder'), trigger: ['change', 'blur'] }],
		password: [{ required: true, message: t('loginForm_passwordtPlaceholder'), trigger: ['change', 'blur'] }],
		token: [{ required: true, message: t('loginForm_passwordtPlaceholder'), trigger: ['change', 'blur'] }],
	});

	const { validate, validateInfos } = useForm(loginForm, loginFormRules);

	const verifyCodeDone = computed(() => loginForm.token === '');
	const onSubmit = () => {
		validate()
			.then(() => {
				const payload = toRaw(loginForm);
				fetchLogin(payload);
			})
			.catch((err) => {
				console.log('error', err);
			});
	};
	const fetchLogin = async (payload: MEMBERAJAX_LoginRequest) => {
		userStore.login(payload);
	};

	const showRegister = () => {
		systemStore.registerModalShow();
	};
	onUnmounted(() => {});
	const init = () => {
		myCaptcha.Captcha(document.getElementById('verifyCode'), {
			appId: ENV.VITE_CAPTCHA_APPID,
			apiServer: ENV.VITE_CAPTCHA_API_SERVER,
			style: 'inline',
			customLanguage: {
				pass_by_server: '验证成功',
			},
			success: function (token: any) {
				loginForm.token = token;
			},
		});
	};
	onMounted(() => {
		init();
	});
</script>
