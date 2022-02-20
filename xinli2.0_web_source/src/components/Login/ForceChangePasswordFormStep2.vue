<template lang="pug">
.w-full
	.pt-4.CENTER
		img(:src='step_2' :srcset="step_2_2x")
	.w-full.rounded.bg-white.bg-opacity-10.mt-8(:class='{ "border border-SystemError" : errorMsg !==""}')
		.BETWEEN_CENTER.p-2
			.CENTER.w-8.h-8.border-r.border-gray-400
				SvgIcon.w-4.h-4.text-white(:name='"#Lock"')
			.flex-grow.px-2
				input.w-full.bg-transparent.border-none.text-white.outline-none(
					:type='inputType'
					v-model='passwordForm.password', 
					:placeholder='$t("Personal_detail_password_old_Placeholder")'
					@input='validate')

			.CENTER.w-8.h-8.cursor-pointer
				SvgIcon.w-4.h-4.text-white(v-if='inputType==="password"' :name='"#Eye_Close"' @click='inputType="text"')
				SvgIcon.w-4.h-4.text-white(v-if='inputType==="text"' :name='"#Eye_Open"' @click='inputType="password"')
	p.text-SystemError.my-1 {{errorMsg}}

	.my-8.mb-20.w-full
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
		.text-sm(:class='exg_4_style')
			SvgIcon.w-3.h-3(v-if='exg_4_style==="text-xRed"' :name='"#Unacommpolished"')
			SvgIcon.w-3.h-3(v-else :name='"#Check_Circle_Solid"')
			span {{t('Personal_detail_password_exg_4')}}

	.my-8.mb-20.text-center.w-full
		a-button.w-full.h-10.rounded-lg.text-white.my-2(type='primary' :disabled='buttonIsDisabled' @click='onSubmit') {{t('Personal_detail_confirmButton')}}
		//- 測試更改密碼後的成功
		//- a-button.w-full.h-10.rounded-lg.text-white.my-2(type='primary' @click='scussess') scussess

</template>

<script setup lang="ts">
	import { ref, computed, reactive } from 'vue';
	/* i18n */
	import { useI18n } from 'vue-i18n';
	import { UserStore } from '@/store/userStore';
	import { putMemberPssword } from '@/api';
	import { Modal } from 'ant-design-vue';
	import { gotoCommonLogin } from '@/utils';
	import { useRouter } from 'vue-router';

	import SvgIcon from '@/components/SvgIcon/index.vue';
	const step_2 = `${window.staticPath}/static/img/commandLogin/ForceChangePassword_step_2.png`;
	const step_2_2x = `${window.staticPath}/static/img/commandLogin/ForceChangePassword_step_2@2x.png 2x`;
	const userStore = UserStore();
	const { t } = useI18n();
	const router = useRouter();
	const inputType = ref('password');
	const passwordForm = reactive({
		password: '',
		secret: userStore.forceOldPasswordSecret,
	});
	const errorMsg = ref('');
	const validate = () => {
		if (passwordForm.password === '') {
			errorMsg.value = t('Personal_detail_password_exg_0');
		} else if (passwordForm.password.length < 8) {
			errorMsg.value = t('Personal_detail_password_exg_1');
		} else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(passwordForm.password)) {
			errorMsg.value = t('Personal_detail_password_exg_2');
		} else {
			errorMsg.value = '';
		}
	};

	const exg_1 = computed(() => passwordForm.password.length >= 8);
	const exg_2 = computed(() => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(passwordForm.password));
	const exg_3 = computed(() => passwordForm.password !== userStore.userInfo.account);
	const exg_4 = computed(() => passwordForm.password !== userStore.forceOldPassword);

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
	const exg_4_style = computed(() => {
		let style = '';
		if (!exg_4.value) {
			style = 'text-xRed';
		} else if (exg_1.value && exg_4.value) {
			style = 'text-xGreenDark';
		} else {
			style = 'text-gray-400';
		}
		return style;
	});
	const buttonIsDisabled = computed(() => passwordForm.password === '' || errorMsg.value !== '');
	const onSubmitStep2 = async () => {
		userStore.longinStep = 'forceChangePasswordStep2';
	};
	const onSubmit = async () => {
		const res = await putMemberPssword(passwordForm);
		if (res.data.status === 'ok') {
			scussess();
		}
	};
	const scussess = async () => {
		Modal.confirm({
			class: 'SSO_ERROR_MODAL_noCancelBtn',
			title: () => t('loginForm_ModalTitle_ForceChangePassword_success_title'),
			content: () => t('loginForm_ModalTitle_ForceChangePassword_success_content'),
			centered: true,
			okText: t('loginForm_ModalTitle_ForceChangePassword_success_button'),
			okButtonProps: { block: true },
			onOk: () => router.push('/'),
		});
	};
</script>
