<template lang="pug">
.w-full
	h5.my-4.text-white {{t('sso_login_authentication')}}
	.my-4.text-white {{t('sso_login_authenti_desc')}}

	.my-4.text-gray-400.text-xs {{t('sso_login_authenti_phone_tips')}}
	.my-4.text-gray-400.text-xs {{userStore.userInfo.phone}}

	.w-full.rounded.bg-white.bg-opacity-10(:class='{ "border border-SystemError" : errorMsg !==""}')
		.BETWEEN_CENTER.p-2
			.CENTER.w-8.h-8.border-r.border-gray-400
				SvgIcon.w-4.h-4.text-white(:name='"#Mobile"')
			.flex-grow.px-2
				input.w-full.bg-transparent.border-none.text-white.outline-none(
					type='tel'
					v-model='ForceTwoPhaseForm.phone', 
					:placeholder='t("sso_login_ForceTwoPhaseForm_phone_placeholder")'
					@input='validate')
	.text-SystemError.my-1 {{errorMsg}}
				
	.desc.text-xs.mt-8
		.my-8.mb-20.text-center.w-full
			a-button.w-full.h-10.rounded-lg.text-white.my-2(type='primary' :disabled='buttonIsDisabled' @click='onSubmit') {{t('Personal_detail_sumitButton_2')}}

		.text-white {{t('sso_login_ForceTwoPhaseForm_tips')}}
		.text-gray-400 {{t('sso_login_ForceTwoPhaseForm_tips_desc')}}

</template>

<script setup lang="ts">
	import { onMounted, ref, toRaw, computed, reactive } from 'vue';
	/* i18n */
	import { useI18n } from 'vue-i18n';
	/* store */
	import { UserStore } from '@/store/userStore';
	import { gotoCommonLogin, setLoginData } from '@/utils';
	import { authorizePhone } from '@/api';
	import { Modal } from 'ant-design-vue';
	import { useRouter } from 'vue-router';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	const { t } = useI18n();
	const router = useRouter();
	const userStore = UserStore();
	const errorMsg = ref('');
	const ForceTwoPhaseForm = reactive({
		phone: '',
		deviceID: '1',
		platform: 1,
	});
	const validate = () => {
		if (ForceTwoPhaseForm.phone === '') {
			errorMsg.value = t('registerForm_phonePlaceholder');
		} else if (!/^1[3456789]\d{9}$/.test(ForceTwoPhaseForm.phone)) {
			errorMsg.value = t('registerForm_phoneErrorMsg');
		} else {
			errorMsg.value = '';
		}
	};

	const exg_1 = computed<boolean>(() => ForceTwoPhaseForm.phone === '');
	const exg_2 = computed(() => !/^1[3456789]\d{9}$/.test(ForceTwoPhaseForm.phone));
	const buttonIsDisabled = computed(() => exg_1.value || exg_2.value);
	// const exg_3 = computed(() => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(ForceTwoPhaseForm.phone));

	const scussess = () => {
		Modal.confirm({
			class: 'SSO_ERROR_MODAL_noCancelBtn',
			title: () => t('sso_login_authentication_message_success_title'),
			content: () => t('sso_login_authentication_message_success_desc'),
			centered: true,
			okText: t('confirmButton'),
			okButtonProps: { block: true },
			onOk: () => router.push('/'),
		});
	};
	const onSubmit = async () => {
		const payload = toRaw(ForceTwoPhaseForm);
		const res = await authorizePhone(payload);
		if (res.data.status === 'ok') {
			// scussess();
			setLoginData(res?.data?.data?.result);
			userStore.forceChangePasswordCheck();
		} else {
			errorMsg.value = res?.data?.msg || '';
		}
	};
</script>
