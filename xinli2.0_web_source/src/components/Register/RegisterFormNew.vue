<template lang="pug">
.w-full
	h5.text-white {{t('registerForm_captchaTitle')}}
	a-form.w-full(layout='vertical')
		#verifyCode
		.w-full.rounded.bg-white.bg-opacity-10.mt-4(v-if='!isCaptcha')
			.BETWEEN_CENTER.p-2
				a-input.w-full.bg-transparent.border-none.text-white(v-model:value='registerForm.captcha', :placeholder='$t("registerForm_captchaPlaceholder")')
				img(class='w-[150px] cursor-pointer', :src='captchaImage')
				.CENTER.w-10.h-10.cursor-pointer.ml-2(@click="getCaptcha")
					SvgIcon.w-4.h-4.text-white(:name='"#Refresh_Regular"')
		.my-2.text-center.w-full
			a-button.w-full.h-11.rounded-lg.text-white.my-4(type='primary' @click='onSubmit') {{$t('registerForm_submitButton')}}
</template>

<script setup lang="ts">
	import { onMounted, onUnmounted, ref, toRaw, computed, reactive } from 'vue';
	/* i18n */
	import { useI18n } from 'vue-i18n';
	/* store */
	import { SystemStore } from '@/store/systemStore';
	import { useRoute, useRouter } from 'vue-router';
	import { UserStore } from '@/store/userStore';
	import { gotoCommonLogin } from '@/utils';
	import { Form } from 'ant-design-vue';
	import { RuleObject } from 'ant-design-vue/es/form/interface';
	import { getRegisterConfig, captcha } from '@/api';

	import type { MEMBERAJAX_RegisterRequest, MEMBERAJAX_CaptchaResponse } from '@/api/model';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	const logo = `${window.staticPath}/static/img/commandLogin/logo.png`;
	const logo_2x = `${window.staticPath}/static/img/commandLogin/logo@2x.png 2x`;
	const sponsor_1 = `${window.staticPath}/static/img/commandLogin/sponsor_1.png`;
	const sponsor_1_2x = `${window.staticPath}/static/img/commandLogin/sponsor_1@2x.png 2x`;
	const sponsor_2 = `${window.staticPath}/static/img/commandLogin/sponsor_2.png`;
	const sponsor_2_2x = `${window.staticPath}/static/img/commandLogin/sponsor_2@2x.png 2x`;
	const sponsor_3 = `${window.staticPath}/static/img/commandLogin/sponsor_3.png`;
	const sponsor_3_2x = `${window.staticPath}/static/img/commandLogin/sponsor_3@2x.png 2x`;
	const divider = `${window.staticPath}/static/img/commandLogin/divider.png`;

	const { t } = useI18n();
	const userStore = UserStore();
	const ENV = import.meta.env;
	const route = useRoute();
	const router = useRouter();
	const dingxiangCaptcha = window._dx;
	const queryString = computed(() => route.query.data);
	const isCaptcha = ref(false);
	const useForm = Form.useForm;

	const registerForm = reactive({
		data: '',
		deviceID: '1',
		platform: 1,
		token: '',
		captcha: '',
		secret: '',
	});
	const captchaImage = ref('');
	const secretData = ref('');
	const registerFormRules = reactive({});

	const { resetFields, validate, validateInfos } = useForm(registerForm, registerFormRules);

	const onSubmit = () => {
		const payload = toRaw(registerForm);
		fetchRegister(payload);
	};
	const fetchRegister = async (payload: MEMBERAJAX_RegisterRequest) => {
		userStore.commonRegister(payload);
	};
	const init = async () => {
		registerForm.data = String(route.query.data) || '';
		// 登入是否需要行為驗證(關閉即為圖形驗證) true:需要 false:不需要
		try {
			const res = await getRegisterConfig();
			isCaptcha.value = res?.data?.data?.registerVerify || false;
			isCaptcha.value ? thirdPartyCaptcha() : getCaptcha();
		} catch (error) {
			thirdPartyCaptcha();
		}
	};
	const thirdPartyCaptcha = () => {
		// 頂象行為驗證
		dingxiangCaptcha.Captcha(document.getElementById('verifyCode'), {
			appId: ENV.VITE_CAPTCHA_APPID,
			apiServer: ENV.VITE_CAPTCHA_API_SERVER,
			// style: 'inline',
			customLanguage: {
				pass_by_server: t('loginForm_captchaSuccess'),
			},
			success: function (token: any) {
				registerForm.token = token;
			},
		});
	};
	const getCaptcha = async () => {
		// 圖形驗證
		const result = await captcha();
		captchaImage.value = result?.data?.data?.image || '';
		secretData.value = result?.data?.data?.secret || '';
		registerForm.secret = result?.data?.data?.secret || '';
	};
	onMounted(() => {
		init();
		getCaptcha();
	});
</script>
<style lang="scss">
	.dx_captcha_basic_wrapper {
		background: black !important;
	}
</style>
