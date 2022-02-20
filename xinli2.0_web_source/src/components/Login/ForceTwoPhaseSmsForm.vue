<template lang="pug">
.w-full
	h5.text-white {{t('sso_login_authentication')}}
	.my-4.text-white {{t('sso_login_authenti_desc')}}

	.my-2.text-gray-400.text-xs {{t('sso_login_authenti_phone_tips')}}
	.my-2.text-gray-400.text-xs {{userStore.userInfo.phone}}

	.w-full.rounded.bg-white.bg-opacity-10.my-4(:class='{ "border border-SystemError" : errorMsg !==""}')
		.BETWEEN_CENTER.p-2
			.CENTER.w-8.h-8.border-r.border-gray-400
				SvgIcon.w-4.h-4.text-white(:name='"#Mobile"')
			.flex-grow.px-2
				input.w-full.bg-transparent.border-none.text-white.outline-none(
					type='tel'
					v-model='ForceTwoPhaseSmsForm.phone', 
					:placeholder='t("sso_login_ForceTwoPhaseForm_phone_placeholder")'
					@input='validate')

	.text-SystemError.my-1 {{errorMsg}}
	.w-full.rounded.bg-white.bg-opacity-10.my-4(v-if='step===2')
		.BETWEEN_CENTER.p-2
			.CENTER.w-8.h-8.border-r.border-gray-400
				SvgIcon.w-4.h-4.text-white(:name='"#Shield_Check"')
			.flex-grow.px-2
				input.w-full.bg-transparent.border-none.text-white.outline-none(
					type='tel'
					v-model='ForceTwoPhaseSmsForm.code', 
					:placeholder='t("registerForm_captchaPlaceholder")'
					@input='validate')
			a-button.rounded-lg.text-white.my-2(type='primary' :disabled='timerButtonDisabled'  @click='onNext') {{timerButtonDisabled ?`${timer} ${t("Personal_detail_phone_code_seconds")}`: t('Personal_detail_phone_get_captcha_code') }}
			
	.desc.text-xs.mt-4
		.my-8.text-center.w-full
			a-button.w-full.h-10.rounded-lg.text-white.my-2(v-if='step===1' type='primary' :disabled='nextButtonIsDisabled' @click='onNext') {{t('Personal_detail_nextButton')}}
			a-button.w-full.h-10.rounded-lg.text-white.my-2(v-if='step===2' type='primary' :disabled='submitButtonIsDisabled' @click='onSubmit') {{t('Personal_detail_sumitButton_2')}}

			.text-white {{t('sso_login_ForceTwoPhaseForm_tips')}}
		.text-gray-400 {{t('sso_login_ForceTwoPhaseForm_tips_desc')}}

</template>

<script setup lang="ts">
	import { onMounted, onUnmounted, ref, toRaw, computed, reactive } from 'vue';
	/* i18n */
	import { useI18n } from 'vue-i18n';
	/* store */
	import { UserStore } from '@/store/userStore';
	import { gotoCommonLogin, setLoginData } from '@/utils';
	import { authorizeSendSms, authorizeSecond } from '@/api';

	import { Modal } from 'ant-design-vue';
	import { useRouter } from 'vue-router';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	const { t } = useI18n();
	const router = useRouter();
	const userStore = UserStore();
	const errorMsg = ref('');
	const step = ref(1);
	const timer = ref(0);
	const timerButtonDisabled = computed(() => timer.value > 0);

	let loop: any;
	const ForceTwoPhaseSmsForm = reactive({
		phone: '',
		deviceID: '1',
		platform: 1,
		code: '',
	});
	const validate = () => {
		if (ForceTwoPhaseSmsForm.phone === '') {
			errorMsg.value = t('registerForm_phonePlaceholder');
		} else if (!/^1[3456789]\d{9}$/.test(ForceTwoPhaseSmsForm.phone)) {
			errorMsg.value = t('registerForm_phoneErrorMsg');
		} else {
			errorMsg.value = '';
		}
	};

	const exg_1 = computed<boolean>(() => ForceTwoPhaseSmsForm.phone === '');
	const exg_2 = computed(() => !/^1[3456789]\d{9}$/.test(ForceTwoPhaseSmsForm.phone));
	const exg_3 = computed<boolean>(() => ForceTwoPhaseSmsForm.phone === '');

	const nextButtonIsDisabled = computed(() => exg_1.value || exg_2.value);
	const submitButtonIsDisabled = computed(() => exg_1.value || exg_2.value || exg_3.value);

	const scussess = () => {
		Modal.confirm({
			class: 'SSO_ERROR_MODAL_noCancelBtn',
			title: () => t('sso_login_authentication_message_success_title'),
			content: () => t('sso_login_authentication_message_success_desc'),
			centered: true,
			okText: '确认',
			okButtonProps: { block: true },
			onOk: () => router.push('/'),
		});
	};
	const onNext = async () => {
		const payload = toRaw(ForceTwoPhaseSmsForm);
		const res = await authorizeSendSms(payload);
		if (res.data.status === 'ok') {
			step.value = 2;
			countDown();
		} else {
			errorMsg.value = res?.data?.msg || '';
		}
	};

	const onSubmit = async () => {
		const payload = toRaw(ForceTwoPhaseSmsForm);
		const res = await authorizeSecond(payload);
		if (res.data.status === 'ok') {
			setLoginData(res?.data?.data);

			userStore.forceChangePasswordCheck();
		} else {
			errorMsg.value = res?.data?.msg || '';
		}
	};

	const countDown = () => {
		timer.value = 120;
		loop = setInterval(() => {
			timer.value -= 1;
			if (timer.value <= 0) {
				clearInterval(loop);
			}
		}, 1000);
	};
	onUnmounted(() => {
		clearInterval(loop);
	});
</script>
