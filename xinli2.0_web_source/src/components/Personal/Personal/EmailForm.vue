<template lang="pug">
.FLEX_C
	h5 {{userStore.userInfo.emailCert==='"1"' ? t('Personal_detail_email_title'):t('Personal_detail_email_edit_title')}}
	a-form.w-full.mt-8(layout='vertical')
		.my-4
			a-form-item(name='email' v-bind='validateInfos.email')
				a-input.border-none.bg-gray-100.w-full(v-model:value='editForm.email', :placeholder='t("Personal_detail_email_Placeholder")')
					template(#prefix)
						.w-8.border-r
							SvgIcon.w-5.h-5.text-xBlue(:name='"#Mail"')
		.my-4.text-center.w-full
			a-button.w-full.h-10.rounded-lg.text-white.my-2(type='primary' :disabled='verifyEmailDone' @click='onSubmit')  {{userStore.userInfo.emailCert==='"1"' ? t('Personal_detail_confirmButton'):t('Personal_detail_modifyButton')}}
</template>

<script setup lang="ts">
	import { onMounted, reactive, computed, ref } from 'vue';
	import { UserStore } from '@/store/userStore';
	import { putMemberEmail } from '@/api';

	import { notification } from 'ant-design-vue';
	import { useI18n } from 'vue-i18n';
	import { RuleObject } from 'ant-design-vue/es/form/interface';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	import { Form, Modal } from 'ant-design-vue';

	const { t } = useI18n();
	const useForm = Form.useForm;
	const emit = defineEmits(['success']);
	const userStore = UserStore();

	const checkEmail = async (rule: any, value: any, callback: any) => {
		if (value === '') {
			return Promise.reject(new Error(t('Personal_detail_email_Placeholder')));
		} else if (!/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)) {
			return Promise.reject(new Error(t('Personal_detail_email_errorMsg')));
		} else {
			return Promise.resolve();
		}
	};
	const editForm = reactive({
		email: '',
	});

	const editFormRules = reactive({
		email: [{ required: true, validator: checkEmail, trigger: ['change', 'blur'] }],
	});

	const verifyEmailDone = computed(
		() => !validateInfos.email.validateStatus || validateInfos.email.validateStatus === 'error'
	);
	const onSubmit = async () => {
		const res = await putMemberEmail(editForm);
		if (res.data.status === 'ok') {
			Modal.success({
				title: t('Personal_detail_email_success_title'),
				content: t('Personal_detail_email_success_desc'),
				okText: t('Personal_detail_confirmButton'),
			});
			emit('success');
			userStore.checkUserInfo();
		} else {
			notification.error({
				message: res?.data?.msg || '',
			});
		}
	};
	const { resetFields, validate, validateInfos } = useForm(editForm, editFormRules);

	onMounted(() => {
		editForm.email = userStore.userInfo.email || '';
	});
</script>
<style lang="scss" scoped>
	::v-deep(.ant-input-affix-wrapper > input.ant-input) {
		background-color: rgb(243 244 246 / var(--tw-bg-opacity));
	}
</style>
