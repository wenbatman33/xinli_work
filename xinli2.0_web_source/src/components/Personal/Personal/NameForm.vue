<template lang="pug">
.FLEX_C
	h5 {{t('Personal_detail_name_title')}}
	a-form.w-full(layout='vertical')
		a-form-item.my-8(name='account')
			a-input.border-none.bg-gray-100.w-full(v-model:value='editForm.name', :placeholder='t("Personal_detail_name_Placeholder")')

		.my-4 {{t('Personal_detail_name_notice')}}
		.text-xs {{t('Personal_detail_name_notice_desc_line_1')}}
		.text-xs {{t('Personal_detail_name_notice_desc_line_2')}}

		.my-4.text-center.w-full
			a-button.w-full.h-11.rounded-lg.text-white.my-2(type='primary' @click='onSubmit') {{t('Personal_detail_confirmButton')}}
</template>

<script setup lang="ts">
	import { onMounted, reactive } from 'vue';
	import { UserStore } from '@/store/userStore';
	import { SystemStore } from '@/store/systemStore';
	import { putMemberName } from '@/api';
	import { notification } from 'ant-design-vue';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
	const emit = defineEmits(['success']);
	const userStore = UserStore();
	const systemStore = SystemStore();
	const editForm = reactive({
		name: '',
	});
	const onSubmit = async () => {
		const res = await putMemberName(editForm);
		if (res.data.status === 'ok') {
			notification.success({
				message: t('Personal_detail_submit_success'),
			});
			// 發送偵聽事件
			systemStore.editUserNameSuccessHandle();
			userStore.checkUserInfo();
			emit('success');
		} else {
			notification.error({
				message: res?.data?.msg || '',
			});
		}
	};
	onMounted(() => {
		editForm.name = userStore.userInfo.name || '';
	});
</script>
