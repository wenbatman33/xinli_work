<template lang="pug">
.FLEX_C
	a-form.w-full.mt-8(layout='vertical')
		.my-4
			a-form-item(name='password' v-bind='validateInfos.password')
				a-input-password.border-none.bg-gray-100.w-full(v-model:value='editForm.password', :placeholder='t("Personal_detail_password_old_Placeholder")')
					template(#prefix)
						.w-8.border-r
							SvgIcon.w-5.h-5.text-xBlue(:name='"#Lock"')
		.my-8.mb-20.text-center.w-full
			a-button.w-full.h-10.rounded-lg.text-white.my-2(type='primary' :disabled='verifyPasswordDone' @click='onSubmit') {{t('Personal_detail_confirmButton')}}
</template>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n';
	import { reactive, computed, ref } from 'vue';
	import { UserStore } from '@/store/userStore';
	import { Form, Modal } from 'ant-design-vue';
	import { postMemberPssword } from '@/api';

	import SvgIcon from '@/components/SvgIcon/index.vue';

	const emit = defineEmits(['success']);

	const { t } = useI18n();
	const useForm = Form.useForm;
	const editForm = reactive({
		password: '',
	});

	const editFormRules = reactive({
		password: [{ required: true, trigger: ['change', 'blur'] }],
	});

	const verifyPasswordDone = computed(
		() => !validateInfos.password.validateStatus || validateInfos.password.validateStatus === 'error'
	);
	const onSubmit = async () => {
		const res = await postMemberPssword(editForm);
		if (res?.data?.status === 'ok') {
			emit('success', res?.data?.data?.secret);
		}
	};
	const { resetFields, validate, validateInfos } = useForm(editForm, editFormRules);
</script>
<style lang="scss" scoped>
	::v-deep(.ant-input-affix-wrapper > input.ant-input) {
		background-color: rgb(243 244 246 / var(--tw-bg-opacity));
	}
</style>
