<template lang="pug">
.w-full
	h5.text-white {{t('loginForm_captchaTitle')}}
	//- 圖形驗證
	#verifyCode
	.w-full.rounded.bg-white.bg-opacity-10.mt-4(v-if='!isCaptcha')
		.BETWEEN_CENTER.p-2
			.CENTER.w-10.h-10.brder-r.border-gray-400
				SvgIcon.w-4.h-4.text-white(:name='"#Shield_Check"')
			a-input.w-full.bg-transparent.border-none.text-white(v-model:value='loginForm.captcha', :placeholder='$t("registerForm_captchaPlaceholder")')
			img(class='w-[130px] cursor-pointer', :src='captchaImage')
			.CENTER.w-10.h-10.cursor-pointer.ml-2(@click="getCaptcha")
				SvgIcon.w-4.h-4.text-white(:name='"#Refresh_Regular"')
	//- 頂象行為驗證
	.mt-8.text-center.w-full
		a-button.w-full.h-11.rounded-lg.text-white.my-2(
			type='primary' 
			:disabled='disabledButtonStatus' 
			@click='onSubmit') {{$t('loginForm_submitButton')}}
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
	import { getLoginConfig, captcha, ssoLogin } from '@/api';
	import { Modal } from 'ant-design-vue';
	import type { MEMBERAJAX_SsoLoginRequest } from '@/api/model';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	const ENV = import.meta.env;
	const { t } = useI18n();
	const route = useRoute();
	const dingxiangCaptcha = window._dx;
	const userStore = UserStore();
	const isCaptcha = ref(false);
	const loginForm = reactive<MEMBERAJAX_SsoLoginRequest>({
		data: '',
		deviceID: '1',
		platform: 1,
		token: '',
		captcha: '',
		secret: '',
	});

	const captchaImage = ref('');
	const secretData = ref('');

	const onSubmit = () => {
		const payload = toRaw(loginForm);
		userStore.commonLogin(payload);
	};

	const init = async () => {
		loginForm.data = String(route.query.data) || '';
		// 登入是否需要行為驗證(關閉即為圖形驗證) true:需要 false:不需要
		const res = await getLoginConfig();
		isCaptcha.value = res?.data?.data?.verify || false;
		isCaptcha.value ? thirdPartyCaptcha() : getCaptcha();
	};
	const getCaptcha = async () => {
		// 圖形驗證
		const result = await captcha();
		captchaImage.value = result?.data?.data?.image || '';
		secretData.value = result?.data?.data?.secret || '';
		loginForm.secret = result?.data?.data?.secret || '';
	};

	const chaeckCampaignUrl = () => {
		if (route.query.redirectUrl) window.localStorage.setItem('redirectUrl', String(route.query.redirectUrl));
	};

	const thirdPartyCaptcha = () => {
		console.log('thirdPartyCaptcha');
		// 頂象行為驗證
		dingxiangCaptcha.Captcha(document.getElementById('verifyCode'), {
			appId: ENV.VITE_CAPTCHA_APPID,
			apiServer: ENV.VITE_CAPTCHA_API_SERVER,
			// style: 'inline',
			customLanguage: {
				pass_by_server: t('loginForm_captchaSuccess'),
			},
			success: function (token: any) {
				loginForm.token = token;
			},
		});
	};

	const disabledButtonStatus = computed(() => {
		// 發送表單按鈕狀態 確認驗證是否執行完成
		return isCaptcha.value ? loginForm.token === '' : loginForm.captcha === '';
	});

	onMounted(() => {
		init();
		chaeckCampaignUrl();
	});
</script>
<style lang="scss">
	.dx_captcha_basic_wrapper {
		background: black !important;
	}
</style>
