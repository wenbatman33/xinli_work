<template lang="pug">
.w-full
	.pt-4.CENTER
		img(:src='step_1' :srcset="step_1_2x")
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

	.my-8.mb-20.text-center.w-full
		a-button.w-full.h-10.rounded-lg.text-white.my-2(type='primary' :disabled='buttonIsDisabled' @click='onSubmit') {{t('Personal_detail_confirmButton')}}
	.my-8.mb-20.text-center.w-full
		.text-sm.text-gray-400 {{t('loginForm_safetyTips')}}
</template>

<script setup lang="ts">
	import { onMounted, ref, computed, reactive } from 'vue';
	/* i18n */
	import { useI18n } from 'vue-i18n';
	import { UserStore } from '@/store/userStore';
	import { Modal } from 'ant-design-vue';
	import { postMemberPssword } from '@/api';

	import SvgIcon from '@/components/SvgIcon/index.vue';

	const step_1 = `${window.staticPath}/static/img/commandLogin/ForceChangePassword_step_1.png`;
	const step_1_2x = `${window.staticPath}/static/img/commandLogin/ForceChangePassword_step_1@2x.png 2x`;

	const { t } = useI18n();
	const userStore = UserStore();
	const inputType = ref('password');
	const passwordForm = reactive({
		password: '',
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
	const buttonIsDisabled = computed(() => passwordForm.password === '' || errorMsg.value !== '');

	const onSubmit = async () => {
		const res = await postMemberPssword(passwordForm);
		if (res?.data?.status === 'ok') {
			userStore.forceOldPassword = passwordForm.password;
			userStore.forceOldPasswordSecret = res?.data?.data?.secret || '';
			userStore.longinStep = 'forceChangePasswordStep2';
		}
	};

	const init = async () => {
		Modal.confirm({
			class: 'SSO_ERROR_MODAL_noCancelBtn',
			title: () => t('loginForm_ModalTitle_ForceChangePassword_title'),
			content: () => t('loginForm_ModalTitle_ForceChangePassword_content'),
			centered: true,
			okText: t('loginForm_ModalTitle_ForceChangePassword_button'),
			okButtonProps: { block: true },
			onOk: () => {},
		});
	};
	onMounted(() => {
		init();
	});
</script>
