<template lang="pug">
.p-4
	h3.text-psV3Red.text-center 更换头像
	.upload_avatar.text-center.my-4
		a-upload(name='avatar', class='avatarUploader', list-type='picture-card', :show-upload-list='false', :customRequest='customRequest')
			img.w-full.h-full(v-if='state.avatar', :src='state.avatar')
			div(v-else='')
				.ant-upload-text Upload
	.modelBtn.text-center.my-4
		a-button.mx-2(@click='hideAvatarModal', size='large') 取消
		a-button.mx-2(type='primary', @click='editAvatar', size='large') 确定
</template>
<script>
import { useStore } from 'vuex';
import { reactive, onMounted, computed, toRaw, watch } from 'vue';
import { message } from 'ant-design-vue';
import { editinfo, uploadFile } from '@/api';
import { matomo_personal_edit_avater } from '@/matomoEvent';
import { commaFormat } from '@/utils';

export default {
	setup(props, { emit }) {
		const store = useStore();
		const state = reactive({
			avatar: '',
		});
		const userInfo = computed(() => store.state.user.userInfo);
		const user_nicename = computed(() => store?.state.user?.userInfo?.user_nicename);
		const UID = computed(() => store.state.user.uid || '');
		const showRecharge = () => {
			store.commit('user/SHOW_RECHARGE_MODEL');
		};
		//- 修改暱稱
		const hideAvatarModal = () => {
			emit('hideAvatarModal');
		};
		const customRequest = (data) => {
			let formData = new FormData();
			formData.append('file_name', data.file);
			// formData.append('uid', parseInt(getUid()))
			uploadFile(formData).then((res) => {
				if (res.code === 0 && res.data) {
					state.avatar = res?.data?.avatar;
				}
			});
		};
		const editAvatar = (data) => {
			matomo_personal_edit_avater();
			editinfo({
				uid: Number(UID.value),
				avatar: state?.avatar,
			}).then((res) => {
				if (res.code === 0) {
					let data = { avatar: state?.avatar };
					store.commit('user/EDIT_INFO', data);
					message.success('修改成功');
					hideAvatarModal();
				}
			});
		};
		onMounted(() => {
			state.avatar = userInfo.value.avatar;
		});
		return {
			store,
			state,
			userInfo,
			UID,
			hideAvatarModal,
			showRecharge,
			commaFormat,
			customRequest,
			editAvatar,
		};
	},
};
</script>
<style lang="scss" scoped></style>
