<template lang="pug">
.w-full
	.pt-4.CENTER
		img(v-if='steps===2' :src='step_2' :srcset="step_2_2x")
		img(v-if='steps===3' :src='step_3' :srcset="step_3_2x")

	.w-full(v-if='steps===2')
		.w-full.rounded.bg-white.bg-opacity-10.mt-8(v-if='steps===2')
			.BETWEEN_CENTER.p-2
				.CENTER.w-8.h-8.border-r.border-gray-400
					SvgIcon.w-4.h-4.text-white(:name='"#Mobile"')
				.flex-grow.px-2
					input.w-full.bg-transparent.border-none.text-white.outline-none(
						type='tel'
						v-model='chengPasswordForm.phone', 
						disabled)

		.w-full.rounded.bg-white.bg-opacity-10.my-4(v-if='steps===2')
			.BETWEEN_CENTER.px-2
				.CENTER.w-8.h-8.border-r.border-gray-400
					SvgIcon.w-4.h-4.text-white(:name='"#Shield_Check"')
				.flex-grow.px-2
					input.w-full.bg-transparent.border-none.text-white.outline-none(
						type='tel'
						v-model='chengPasswordForm.code', 
						:placeholder='t("registerForm_captchaPlaceholder")')
				a-button.rounded-lg.text-white.my-2(type='primary' @click='getCode') {{timerButtonDisabled ?`${timer} ${t("Personal_detail_phone_code_seconds")}`: t('Personal_detail_phone_get_captcha_code') }}
			
		.my-8.text-center.w-full
			.text-xs.text-gray-400 {{t('forget_formNew_desc_1')}}
		.my-8.text-center.w-full
			a-button.w-full.h-10.rounded-lg.text-white.my-2(type='primary' :disabled='verifyButtonIsDisabled' @click='VerifyCode') {{t('Personal_detail_nextButton')}}
	
	.w-full(v-if='steps===3')
		
		.BETWEEN_CENTER.p-2.w-full.rounded.bg-white.bg-opacity-10.mt-8
			.CENTER.w-8.h-8.border-r.border-gray-400
				SvgIcon.w-4.h-4.text-white(:name='"#Lock"')
			.flex-grow.px-2
				input.w-full.bg-transparent.border-none.text-white.outline-none(
					:type='inputType'
					v-model='chengPasswordForm.password', 
					:placeholder='t("registerForm_passwordPlaceholder")')
			.CENTER.w-8.h-8.cursor-pointer
				SvgIcon.w-4.h-4.text-white(v-if='inputType==="password"' :name='"#Eye_Close"' @click='inputType="text"')
				SvgIcon.w-4.h-4.text-white(v-if='inputType==="text"' :name='"#Eye_Open"' @click='inputType="password"')
		
		.my-8.w-full
			.text-sm(:class='exg_1_style')
				SvgIcon.w-3.h-3(:name='"#Check_Circle_Solid"')
				span {{t('Personal_detail_password_exg_1')}}
			.text-sm(:class='exg_2_style')
				SvgIcon.w-3.h-3(v-if='exg_2_style==="text-xRed"' :name='"#Unacommpolished"')
				SvgIcon.w-3.h-3(v-else :name='"#Check_Circle_Solid"')
				span {{t('Personal_detail_password_exg_2')}}
			.text-sm(:class='exg_3_style')
				SvgIcon.w-3.h-3(v-if='exg_3_style==="text-xRed"' :name='"#Unacommpolished"')
				SvgIcon.w-3.h-3(v-else :name='"#Check_Circle_Solid"')
				span {{t('Personal_detail_password_exg_3')}}

		.my-8.text-center.w-full
			a-button.w-full.h-10.rounded-lg.text-white.my-2(type='primary' :disabled='buttonIsDisabled' @click='onChamgPasswordSubmit') {{t('Personal_detail_confirmButton')}}
</template>

<script setup lang="ts">
	import { onMounted, reactive, ref, computed } from 'vue';
	/* i18n */
	import { useI18n } from 'vue-i18n';
	/* store */
	import { SystemStore } from '@/store/systemStore';
	import { useRoute, useRouter } from 'vue-router';
	import { UserStore } from '@/store/userStore';
	import { postMemberPhone, putMemberPssword, getMemberSmsSend, postMemberSmsVerify } from '@/api';
	import { Modal } from 'ant-design-vue';
	import { gotoCommonLogin } from '@/utils';

	import SvgIcon from '@/components/SvgIcon/index.vue';

	let loop: any;
	const step_1 = `${window.staticPath}/static/img/commandLogin/step_1.png`;
	const step_1_2x = `${window.staticPath}/static/img/commandLogin/step_1@2x.png 2x`;
	const step_2 = `${window.staticPath}/static/img/commandLogin/step_2.png`;
	const step_2_2x = `${window.staticPath}/static/img/commandLogin/step_2@2x.png 2x`;
	const step_3 = `${window.staticPath}/static/img/commandLogin/step_3.png`;
	const step_3_2x = `${window.staticPath}/static/img/commandLogin/step_3@2x.png 2x`;

	const { t } = useI18n();
	const route = useRoute();
	const userStore = UserStore();
	const chengPasswordForm = reactive({
		phone: '',
		code: '',
		password: '',
		secret: '',
	});
	const steps = ref(2);
	const timer = ref(0);
	const inputType = ref('password');
	const timerButtonDisabled = computed(() => timer.value > 0);
	const verifyButtonIsDisabled = computed(() => chengPasswordForm.phone === '' || chengPasswordForm.code === '');
	const buttonIsDisabled = computed(() => chengPasswordForm.phone === '' || chengPasswordForm.password === '');

	const getCode = () => {
		const payload = { phone: chengPasswordForm.phone };
		getMemberSmsSend(payload).then((res) => {
			if (res.data.statusCode === 0) countDown();
		});
	};

	const VerifyCode = () => {
		const payload = { code: chengPasswordForm.code };
		postMemberSmsVerify(payload).then((res) => {
			if (res.data.statusCode === 0) {
				chengPasswordForm.secret = res?.data?.data?.secret || '';
				steps.value = 3;
			}
		});
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

	const exg_1 = computed(() => chengPasswordForm.password.length >= 8);
	const exg_2 = computed(() => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(chengPasswordForm.password));
	const exg_3 = computed(() => chengPasswordForm.password !== userStore.userInfo.account);

	const exg_1_style = computed(() => {
		return exg_1.value ? 'text-xGreenDark' : 'text-gray-400';
	});
	const exg_2_style = computed(() => {
		let style = '';
		if (exg_1.value && !exg_2.value) {
			style = 'text-xRed';
		} else if (exg_2.value) {
			style = 'text-xGreenDark';
		} else {
			style = 'text-gray-400';
		}
		return style;
	});
	const exg_3_style = computed(() => {
		let style = '';
		if (!exg_3.value) {
			style = 'text-xRed';
		} else if (exg_1.value && exg_3.value) {
			style = 'text-xGreenDark';
		} else {
			style = 'text-gray-400';
		}
		return style;
	});
	const onChamgPasswordSubmit = () => {
		const payload = { password: chengPasswordForm.password, secret: chengPasswordForm.secret };
		putMemberPssword(payload).then((res) => {
			if (res.data.statusCode === 0) onChamgPasswordSucceeded();
		});
	};
	const onChamgPasswordSucceeded = () => {
		Modal.confirm({
			class: 'SSO_ERROR_MODAL_noCancelBtn',
			title: () => t('forget_password_success_title'),
			content: () => t('forget_password_success_back_to_login'),
			centered: true,
			okText: t('loginForm_ModalTitle_ForceChangePassword_button'),
			okButtonProps: { block: true },
			onOk: () => gotoCommonLogin('?form=empty'),
		});
	};

	onMounted(() => {
		chengPasswordForm.phone = String(route?.query?.phone) || '';
	});
</script>
