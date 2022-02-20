<template lang="pug">
.px-24.py-14
	h3.text-psV3Red 编辑昵称资料
	.text-gray-500 首次修改免费，后续每次修改需支付 100,000蕉币
	.userNicename.mt-4
		h5 昵称
		a-input(v-model:value='state.user_nicename')
	.CENTER_BETWEEN.p-2.bg-gray-50.rounded.mt-16
		.icon.mr-4.flex-shrink-0
			img(src='/publicAssets/img/v3/coin.png', style='width: 36px')
		.flex-grow
			h5.text-psV3Yellow 您的蕉币
			.text-gray-600 {{ commaFormat(userInfo.coin) }}
		.flex-shrink-0
			.rounded.bg-psV3Yellow.text-white.px-4.py-2.cursor-pointer(@click='showRecharge') 充值
	.BETWEEN.my-4.text-center
		div.pr-4(class='w-1/3')
			a-button.w-full.rounded(@click='hideNameModal', size='large') 取消
		div(class='w-2/3')
			a-button.w-full.rounded(type='primary', size='large', @click='editableNameHandle') 确认修改
</template>
<script>
import { useStore } from 'vuex';
import { reactive, onMounted, computed, toRaw, watch } from 'vue';
import { message } from 'ant-design-vue';
import { editNicename } from '@/api';
import { matomo_personal_edit_name } from '@/matomoEvent';
import { commaFormat } from '@/utils';

export default {
	setup(props, { emit }) {
		const store = useStore();
		const state = reactive({
			user_nicename: '',
		});
		const userInfo = computed(() => store.state.user.userInfo);
		const user_nicename = computed(() => store?.state.user?.userInfo?.user_nicename);
		const UID = computed(() => store.state.user.uid || '');

		const showRecharge = () => {
			store.commit('user/SHOW_RECHARGE_MODEL');
		};
		//- 修改暱稱
		const hideNameModal = () => {
			emit('hideNameModal');
		};
		const editableNameHandle = () => {
			matomo_personal_edit_name();
			editNicename({
				uid: Number(UID.value),
				nicename: state.user_nicename,
			}).then((res) => {
				store.dispatch('user/UPDATE_USER_INFO');
				message.success('修改成功');
				hideNameModal();
			});
		};
		onMounted(() => {
			state.user_nicename = user_nicename.value;
		});
		return {
			store,
			state,
			userInfo,
			UID,
			hideNameModal,
			editableNameHandle,
			showRecharge,
			commaFormat,
		};
	},
};
</script>
<style lang="scss" scoped></style>
