<template lang="pug">
.FLEX_C.p-8
	h5 {{t('Personal_detail_phone_title')}}
	a-form.w-full.mt-8(layout='vertical')
		.my-4
			a-form-item(name='phone' v-bind='validateInfos.phone')
				a-input.border-none.bg-gray-100.w-full(v-model:value='editForm.phone', :placeholder='t("Personal_detail_phone_Placeholder")')
					template(#prefix)
						.w-8.border-r
							SvgIcon.w-5.h-5.text-xBlue(:name='"#Setting"')
		.my-4
			a-form-item(name='code', v-bind='validateInfos.code')
				.flex
					.flex-grow
						a-input.border-none.bg-gray-100(v-model:value='editForm.code', :placeholder='t("Personal_detail_phone_Placeholder_2")')
							template(#prefix)
								.w-8.border-r
									SvgIcon.w-5.h-5.text-xBlue(:name='"#Shield_Check"')
					.rounded-lg.bg-xRed.text-white.px-4.CENTER(v-if='countDown>0') {{countDown}}{{t('Personal_detail_phone_code_seconds')}}
					a-button.rounded-lg.text-white(v-else type='primary' :disabled='verifyCodeDone' @click='getCode') {{getCodeText}}

		.my-4.text-center.w-full
			a-button.w-full.h-10.rounded-lg.text-white.my-2(type='primary' :disabled='verifyFormDone' @click='onSubmit') {{t('Personal_detail_confirmButton')}}
</template>

<script setup lang="ts">
	import { onMounted, onUnmounted, reactive, computed, ref } from 'vue';
	import { UserStore } from '@/store/userStore';
	import { SystemStore } from '@/store/systemStore';
	import { putMemberPhone, postMemberPhone } from '@/api';

	import { notification } from 'ant-design-vue';
	import { useI18n } from 'vue-i18n';
	import { RuleObject } from 'ant-design-vue/es/form/interface';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	import { Form } from 'ant-design-vue';

	const { t } = useI18n();
	const useForm = Form.useForm;
	const emit = defineEmits(['success']);
	const userStore = UserStore();
	const systemStore = SystemStore();
	const getCodeText = ref(t('Personal_detail_phone_get_captcha_code'));

	// phone: [{ required: true, validator: checkPhone, trigger: ['change', 'blur'] }],
	const checkPhone = async (rule: RuleObject, value: string) => {
		if (value === '') {
			return Promise.reject(t('registerForm_phonePlaceholder'));
		} else if (!/^1[3456789]\d{9}$/.test(value)) {
			return Promise.reject(t('registerForm_phoneErrorMsg'));
		} else {
			return Promise.resolve();
		}
	};
	const checkCode = async (rule: RuleObject, value: string) => {
		if (value === '') {
			return Promise.reject(t('Personal_detail_phone_get_voice_captcha_code'));
		} else {
			return Promise.resolve();
		}
	};
	const editForm = reactive({
		phone: '',
		code: '',
	});

	const editFormRules = reactive({
		phone: [{ required: true, validator: checkPhone, trigger: ['change', 'blur'] }],
		code: [{ required: true, validator: checkCode, trigger: ['change', 'blur'] }],
	});

	const verifyCodeDone = computed(() => !validateInfos.phone.validateStatus || validateInfos.phone.validateStatus === 'error');
	const verifyFormDone = computed(
		() => !validateInfos.phone.validateStatus || !validateInfos.code.validateStatus || validateInfos.phone.validateStatus === 'error' || validateInfos.code.validateStatus === 'error'
	);
	const getCode = async () => {
		const res = await postMemberPhone({ phone: editForm.phone });
		if (res.data.status === 'ok') {
			loopTime();
		} else {
			getCodeText.value = t('Personal_detail_phone_reget_captcha_code');
		}
	};
	let loop: any;
	const countDown = ref(0);
	const loopTime = (checktime = 60) => {
		countDown.value = checktime;
		loop = setInterval(() => {
			countDown.value -= 1;
			if (countDown.value <= 0) {
				clearInterval(loop);
			}
		}, 1000);
	};
	const onSubmit = async () => {
		const res = await putMemberPhone(editForm);
		if (res.data.status === 'ok') {
			notification.success({
				message: t('Personal_detail_submit_success'),
			});
			// 發送偵聽事件
			systemStore.editUserPhoneSuccessHandle;
			userStore.checkUserInfo();
			emit('success');
		} else {
			notification.error({
				message: res?.data?.msg || '',
			});
		}
	};
	const { resetFields, validate, validateInfos } = useForm(editForm, editFormRules);

	onMounted(() => {
		editForm.phone = userStore.userInfo.phone || '';
	});
	onUnmounted(() => {
		clearInterval(loop);
	});
</script>
<style lang="scss" scoped>
	::v-deep(.ant-input-affix-wrapper > input.ant-input) {
		background-color: rgb(243 244 246 / var(--tw-bg-opacity));
	}
</style>
