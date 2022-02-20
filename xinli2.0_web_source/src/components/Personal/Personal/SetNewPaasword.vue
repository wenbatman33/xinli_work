<template lang="pug">
.FLEX_C
	a-form.w-full.mt-8(layout='vertical')
		.my-4
			a-form-item(name='password' v-bind='validateInfos.password')
				a-input-password.border-none.bg-gray-100.w-full(v-model:value='editForm.password', :placeholder='t("Personal_detail_password_Placeholder")')
					template(#prefix)
						.w-8.border-r
							SvgIcon.w-5.h-5.text-xBlue(:name='"#Lock"')
		.my-8.mb-20.w-full.relative
			.rounded-xl.bg-white.shadow-lg.w-52.p-4.absolute.z-10(:class='"top-[-20px] left-[60px]"' v-if='!exg_1 || !exg_2 || !exg_3')
				.text-sm.my-4 {{t('Personal_detail_password_exg_title')}}
				.text-sm(:class='exg_1_style')
					SvgIcon.w-5.h-5(:name='"#Check_Circle_Solid"')
					span {{t('Personal_detail_password_exg_1')}}
				.text-sm(:class='exg_2_style')
					SvgIcon.w-5.h-5(v-if='exg_2_style==="text-xRed"' :name='"#Unacommpolished"')
					SvgIcon.w-5.h-5(v-else :name='"#Check_Circle_Solid"')
					span {{t('Personal_detail_password_exg_2')}}
				.text-sm(:class='exg_3_style')
					SvgIcon.w-5.h-5(v-if='exg_3_style==="text-xRed"' :name='"#Unacommpolished"')
					SvgIcon.w-5.h-5(v-else :name='"#Check_Circle_Solid"')
					span {{t('Personal_detail_password_exg_3')}}
					
			a-button.w-full.h-10.rounded-lg.text-white(type='primary' :disabled='verifyPasswordDone' @click='onSubmit') {{t('Personal_detail_confirmButton')}}
</template>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n';
	import { reactive, computed, ref } from 'vue';
	import { Form } from 'ant-design-vue';
	import { notification } from 'ant-design-vue';
	import { UserStore } from '@/store/userStore';
	import { putMemberPssword } from '@/api';

	import SvgIcon from '@/components/SvgIcon/index.vue';

	const props = defineProps({ secretRef: String });
	const emit = defineEmits(['success']);
	const userStore = UserStore();
	const { t } = useI18n();
	const useForm = Form.useForm;

	const currentRef = ref(1);

	// 长度至少 8 碼
	// 需包含英文大小写字母
	// 不得与用户名相同
	const exg_1 = computed(() => editForm.password.length >= 8);
	const exg_2 = computed(() => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(editForm.password));
	const exg_3 = computed(() => editForm.password !== userStore.userInfo.account);

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

	const checkPassword = async (rule: any, value: any, callback: any) => {
		if (value === '') {
			return Promise.reject(new Error(t('Personal_detail_password_exg_0')));
		} else if (value.length < 8) {
			return Promise.reject(new Error(t('Personal_detail_password_exg_1')));
		} else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(value)) {
			return Promise.reject(new Error(t('Personal_detail_password_exg_2')));
		} else if (value === userStore.userInfo.account) {
			return Promise.reject(new Error(t('Personal_detail_password_exg_3')));
		} else {
			return Promise.resolve();
		}
	};
	const reg_1 = computed(() => {
		return '';
	});

	const editForm = reactive({
		password: '',
		secret: props.secretRef,
	});

	const editFormRules = reactive({
		password: [{ required: true, validator: checkPassword, trigger: ['change', 'blur'] }],
	});

	const verifyPasswordDone = computed(
		() => !validateInfos.password.validateStatus || validateInfos.password.validateStatus === 'error'
	);
	const onSubmit = async () => {
		const res = await putMemberPssword(editForm);
		if (res.data.status === 'ok') {
			notification.success({
				message: t('Personal_detail_submit_success'),
			});
			emit('success');
			userStore.checkUserInfo();
		}
	};
	const { resetFields, validate, validateInfos } = useForm(editForm, editFormRules);
</script>
<style lang="scss" scoped>
	::v-deep(.ant-input-affix-wrapper > input.ant-input) {
		background-color: rgb(243 244 246 / var(--tw-bg-opacity));
	}
</style>
