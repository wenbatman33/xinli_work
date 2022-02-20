<template lang="pug">
.userAccount.rounded.bg-white.p-4(v-if='userInfo')
	h3.text-psV3Red 帐号管理
	.w-full.grid.grid-cols-2.gap-4.my-4
		.col-span-1.bg-gray-50.rounded.p-4
			.BETWEEN
				.icon.mr-2
					img.w-8(src='/publicAssets/img/v3/icon-mobile-1@2x.png')
				.flex-grow
					h4.text-psV3Red 
						span 绑定手机
						img.float-right.mx-1.cursor-pointer(src='/publicAssets/img/v3/icon-edit-2.png', @click='showPhoneModal')
					.text-gray-500.my-2 享受更安全的服务及提醒
					h5.text-psV3Yellow {{MOBILE}}
		.col-span-1.bg-gray-50.rounded.p-4
			.BETWEEN
				.icon.mr-2
					img.w-8(src='/publicAssets/img/v3/icon-mail@2x.png')
				.flex-grow
					h4.text-psV3Red 
						span 绑定邮箱
						img.float-right.mx-1.cursor-pointer(src='/publicAssets/img/v3/icon-edit-2.png', @click='showEmailModal')
					.text-gray-500.my-2 以享受更安全的 服务与及时提醒
					h5.text-psV3Yellow {{USER_EMAIL}}
		.col-span-2.bg-gray-50.rounded.p-4
			.BETWEEN
				.icon.mr-2
					img.w-8(src='/publicAssets/img/v3/icon-lock@2x.png')
				.flex-grow
					h4.text-psV3Red
						span 修改密码
						img.float-right.mx-1.cursor-pointer(src='/publicAssets/img/v3/icon-edit-2.png', @click='showPasswordModal')
					.text-gray-500.my-2 定期变更并使用强 密码，帐号更安全
	//- ------------------------------------------------------------------------------------------------------------
	a-modal(:visible='state.showPhoneModal',class='avatarModal', :footer='null' centered='', :closable='false')
		editPhone(@hidePhoneModal='hidePhoneModal')
	//- ------------------------------------------------------------------------------------------------------------
	a-modal(:visible='state.showEmailModal', class='niceNameModal', :footer='null' centered='', @cancel='hideEmailModal')
		editEmailForm(@hideEmailModal='hideEmailModal')
	//- ------------------------------------------------------------------------------------------------------------
	a-modal(:visible='state.showPasswordModal', class='niceNameModal', :footer='null' centered='',  @cancel='hidePasswordModal')
		passwordForm(@hidePasswordModal='hidePasswordModal')

</template>
<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { reactive, computed } from 'vue';
import { editinfo, uploadFile, editNicename } from '@/api';
import { message } from 'ant-design-vue';
import { matomo_personal_edit_avater } from '@/matomoEvent';
import editEmailForm from '@/components/personal/profile/editEmailForm';
import editPhone from '@/components/personal/profile/editPhone';
import passwordForm from '@/components/personal/profile/passwordForm';

export default {
	components: {
		editEmailForm,
		editPhone,
		passwordForm,
	},
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			showEmailModal: false,
			showPhoneModal: false,
			showPasswordModal: false,
		});
		const userInfo = computed(() => store?.state?.user?.userInfo);
		const MOBILE = computed(() => userInfo?.value?.mobile || '');
		const USER_EMAIL = computed(() => userInfo?.value?.user_email || '');
		// 顯示修改信箱
		const showEmailModal = () => {
			state.showEmailModal = true;
		};
		// 隱藏修改信箱
		const hideEmailModal = () => {
			state.showEmailModal = false;
		};
		// 顯示修改手機
		const showPhoneModal = () => {
			matomo_personal_edit_avater();
			state.showPhoneModal = true;
		};
		// 隱藏修改手機
		const hidePhoneModal = () => {
			state.showPhoneModal = false;
		};
		// 顯示修改密碼
		const showPasswordModal = () => {
			state.showPasswordModal = true;
		};
		// 隱藏修改密碼
		const hidePasswordModal = () => {
			state.showPasswordModal = false;
		};

		return {
			store,
			route,
			router,
			state,
			userInfo,
			MOBILE,
			USER_EMAIL,
			// ----------------
			showEmailModal,
			hideEmailModal,
			// ----------------
			showPhoneModal,
			hidePhoneModal,
			// ----------------
			showPasswordModal,
			hidePasswordModal,
		};
	},
};
</script>
<style lang="scss"></style>
