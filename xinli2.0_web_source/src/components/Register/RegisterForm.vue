<template lang="pug">
.w-full.CENTER.justify-between
  div(class='w-1/2 px-12 RegisterForm')
    h2.text-psV3Red {{ $t('registerForm_title') }}
    .text-xs.text-gray-500 {{ $t('registerForm_desc') }}
  div(class='w-1/2 px-12 RegisterForm')
    .flex.justify-center.pt-4
      a-form.w-full(layout='vertical')
        a-form-item.my-2(name='account', v-bind='validateInfos.account' :label='$t("registerForm_account")')
          a-input.w-full(v-model:value='RegisterForm.account',  :placeholder='$t("registerForm_accountPlaceholder")')

        a-form-item.my-2(name='password', v-bind='validateInfos.password' :label='$t("registerForm_password")')
          a-input.w-full(v-model:value='RegisterForm.password', :placeholder='$t("registerForm_passwordPlaceholder")', type='password')

        a-form-item.my-2(name='phone', v-bind='validateInfos.phone' :label='$t("registerForm_phone")')
          a-input.w-full(v-model:value='RegisterForm.phone', :placeholder='$t("registerForm_phonePlaceholder")')

        a-form-item.my-2(name='email', v-bind='validateInfos.email' :label='$t("registerForm_email")')
          a-input.w-full(v-model:value='RegisterForm.email', :placeholder='$t("registerForm_emailPlaceholder")')

        a-form-item.my-2(name='captcha', v-bind='validateInfos.captcha' :label='$t("registerForm_captcha")')
          .FLEX_R.justify-between
            a-input.w-full(v-model:value='RegisterForm.captcha', :placeholder='$t("registerForm_captchaPlaceholder")')
            img(class='w-[150px] cursor-pointer', :src='state.image' @click="getCaptcha")

        .my-2.text-center.w-full
          a-button.w-full.h-11.rounded-lg.text-white.my-4(type='primary' @click='onSubmit') {{$t('registerForm_submitButton')}}
          a-button.w-full.h-11.rounded-lg.my-4(@click='showLogin') {{$t('registerForm_loginButton')}}

</template>

<script setup lang="ts">
	import { reactive, toRaw, onMounted } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { Form } from 'ant-design-vue';
	import { UserStore } from '@/store/userStore';
	import { SystemStore } from '@/store/systemStore';
	import { captcha } from '@/api';
	import { RuleObject } from 'ant-design-vue/es/form/interface';
	import type { MEMBERAJAX_RegisterRequest, MEMBERAJAX_CaptchaResponse } from '@/api/model';

	const { t } = useI18n();
	const userStore = UserStore();
	const systemStore = SystemStore();
	const useForm = Form.useForm;
	const state = reactive<MEMBERAJAX_CaptchaResponse>({
		image: '',
		secret: '',
	});
	const RegisterForm = reactive<MEMBERAJAX_RegisterRequest>({
		account: '',
		password: '',
		phone: '',
		captcha: '',
		secret: '',
		email: '',
		deviceID: '1',
		platform: 1,
	});

	const checkPhone = async (rule: RuleObject, value: string) => {
		if (value === '') {
			return Promise.reject(t('registerForm_phone'));
		} else if (!/^1[3456789]\d{9}$/.test(value)) {
			return Promise.reject(t('registerForm_phoneErrorMsg'));
		} else {
			return Promise.resolve();
		}
	};
	const checkEmail = async (rule: RuleObject, value: string) => {
		if (!/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)) {
			return Promise.reject(t('registerForm_emailErrorMsg'));
		} else {
			return Promise.resolve();
		}
	};
	const RegisterFormRules = reactive({
		account: [
			{
				required: true,
				message: t('registerForm_accountPlaceholder'),
				trigger: ['change', 'blur'],
			},
		],
		password: [
			{
				required: true,
				message: t('registerForm_passwordPlaceholder'),
				trigger: ['change', 'blur'],
			},
		],
		phone: [{ required: true, validator: checkPhone, trigger: ['change', 'blur'] }],
		email: [{ validator: checkEmail, trigger: ['change', 'blur'] }],
	});

	const { resetFields, validate, validateInfos } = useForm(RegisterForm, RegisterFormRules);

	const onSubmit = () => {
		validate()
			.then(() => {
				const payload = toRaw(RegisterForm);
				payload.secret = state.secret;
				fetchRegister(payload);
			})
			.catch((err) => {
				console.log('error', err);
			});
	};
	const fetchRegister = async (payload: MEMBERAJAX_RegisterRequest) => {
		userStore.register(payload);
	};
	const showLogin = () => {
		systemStore.loginModalShow();
	};
	const getCaptcha = async () => {
		const result = await captcha();
		state.image = result?.data?.data?.image || '';
		state.secret = result?.data?.data?.secret || '';
	};
	onMounted(() => {
		getCaptcha();
	});
</script>
