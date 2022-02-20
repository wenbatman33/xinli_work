<template lang="pug">
.px-24.py-14
	h3.text-psV3Red 编辑个人资料
	.signature.mt-4
		h5 签名 
		a-input(v-model:value='state.signature')
	.grid.grid-cols-7.gap-4.my-8
		.col-span-5
			h5 生日
			a-date-picker.w-full(@change='onChange', :disabled='state.disabledBirthday', :placeholder='state.birthday?state.birthday:"请设置您的生日"', :allowClear='false')
		.col-span-2
			h5 性别 
			a-radio-group(v-model:value='state.sex' button-style='solid')
				a-radio-button(value='1') 男
				a-radio-button(value='2') 女
	.BETWEEN.my-4.text-center
		div.pr-4(class='w-1/3')
			a-button.w-full.rounded(@click='hideProfileModal', size='large') 取消
		div(class='w-2/3')
			a-button.w-full.rounded(type='primary', size='large', @click='editableNameHandle') 确认修改
</template>
<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { reactive, onMounted, computed, toRaw, watch } from 'vue';
import { message } from 'ant-design-vue';
import { editinfo } from '@/api';
import { matomo_my_edit_personal } from '@/matomoEvent';
import { commaFormat } from '@/utils';

export default {
	setup(props, { emit }) {
		const store = useStore();
		const state = reactive({
			signature: '',
			sex: 1,
			birthday: null,
		});
		const userInfo = computed(() => store.state.user.userInfo);
		const signature = computed(() => store?.state.user?.userInfo?.signature);
		const sex = computed(() => store?.state.user?.userInfo?.sex);
		const birthday = computed(() => store?.state.user?.userInfo?.birthday);
		const UID = computed(() => store.state.user.uid || '');
		//- 修改暱稱
		const hideProfileModal = () => {
			emit('hideProfileModal');
		};
		const editableNameHandle = () => {
			matomo_my_edit_personal();
			editinfo({
				uid: Number(UID.value),
				signature: state.signature,
				birthday: state.birthday,
				sex: Number(state.sex),
			}).then((res) => {
				store.dispatch('user/UPDATE_USER_INFO');
				message.success('修改成功');
				hideProfileModal();
			});
		};
		const onChange = (date, dateString) => {
			state.birthday = dayjs(date).format('YYYY-MM-DD');
		};
		onMounted(() => {
			state.signature = signature.value;
			state.sex = sex.value;
			state.birthday = birthday.value ? dayjs(birthday.value).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
		});
		return {
			store,
			state,
			userInfo,
			signature,
			sex,
			birthday,
			UID,
			hideProfileModal,
			editableNameHandle,
			commaFormat,
			onChange,
		};
	},
};
</script>
<style lang="scss" scoped></style>
