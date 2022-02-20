<template lang="pug">
.userProfile.rounded.bg-white(v-if='userInfo')
	.CENTER_BETWEEN.rounded.relative.overflow-hidden.p-4
		.absolute.rounded-full.z-0.cursor-pointer(@click='showProfileModal' :style='{top:"-80px",right:"-80px",width:"160px",height:"160px",background:"#2f80ed",}') 
			.absolute.text-white(:style='{top:"100px",right:"100px"}') 编辑
		.infoAvater.relative.p-2
			img.AVATAR.w-20.h-20(:src='userInfo.avatar', @error='errorPersonImg')
			.rounded-full.CENTER.bg-psV3Yellow.w-6.h-6.absolute.right-2.bottom-2.cursor-pointer(@click='showAvatarModal')
				img(src='/publicAssets/img/v3/icon-camera.png')
		.infoData.FLEX_C.flex-grow.px-2.truncate
			div
				img.w-12.mr-2.cursor-pointer(:src='userLevelThumb(userInfo.level)', @click='clickLevel') 
				img.w-12.mr-2.cursor-pointer(v-if='userInfo.level_anchor_info.thumb', :src='userInfo.level_anchor_info.thumb', @click='clickAnchorLevel') 
				span.font-black.text-psV3Orange ID {{ userInfo.id }}
			h4.name.my-1 
				span {{ userInfo.user_nicename }}
				img.mx-1.cursor-pointer(src='/publicAssets/img/v3/icon-edit-2.png', @click='showNameModal')
			.text-xs.text-gray-600.truncate {{ userInfo.signature }}
	.p-4
		.w-full.grid.grid-cols-2.gap-4
			.col-span-1.bg-gray-50.rounded
				.CENTER_BETWEEN.p-2
					.icon.mr-4.flex-shrink-0
						img(src='/publicAssets/img/v3/coin.png', style='width: 36px')
					.flex-grow
						h4.text-psV3Yellow.cursor-pointer 蕉币
						.text-gray-600 {{ commaFormat(userInfo.coin) }}
					.flex-shrink-0
						.rounded.bg-psV3Yellow.text-white.px-4.py-2.cursor-pointer(@click='showRecharge')  充值
			.col-span-1.bg-gray-50.rounded
				.CENTER_BETWEEN.p-2
					.icon.mr-4.flex-shrink-0
						img(src='/publicAssets/img/v3/banana.png', style='width: 30px')
					.flex-grow
						h4 香蕉
						.text-gray-600 {{ commaFormat(userInfo.banana) }}
	//- ------------------------------------------------------------------------------------------------------------
	a-modal(:visible='state.showAvatarModal',class='avatarModal', :footer='null' centered='', :closable='false')
		editAvatarForm(@hideAvatarModal='hideAvatarModal')
	//- ------------------------------------------------------------------------------------------------------------
	a-modal(:visible='state.showNiceNameModal', class='niceNameModal', :footer='null' centered='', :closable='false')
		editNameForm(@hideNameModal='hideNameModal')
	//- ------------------------------------------------------------------------------------------------------------
	a-modal(:visible='state.showProfileModal', class='niceNameModal', :footer='null' centered='', :closable='false')
		editProfileForm(@hideProfileModal='hideProfileModal')

</template>
<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { reactive, computed } from 'vue';
import { matomo_personal_edit_avater, matomo_my_wallet_recharge } from '@/matomoEvent';
import editNameForm from '@/components/personal/profile/editNameForm';
import editAvatarForm from '@/components/personal/profile/editAvatarForm';
import editProfileForm from '@/components/personal/profile/editProfileForm';
import { userLevelThumb, errorPersonImg, commaFormat } from '@/utils';

export default {
	components: {
		editNameForm,
		editAvatarForm,
		editProfileForm,
	},
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			showNiceNameModal: false,
			showAvatarModal: false,
			showProfileModal: false,
		});
		const userInfo = computed(() => store?.state?.user?.userInfo);
		const levelList = computed(() => store?.state?.config?.levelList);
		// 充值視窗
		const showRecharge = () => {
			matomo_my_wallet_recharge();
			store.commit('user/SHOW_RECHARGE_MODEL');
		};

		// 點擊主播等級按鈕
		const clickAnchorLevel = () => {
			router.push('/about/262141');
		};
		// 點擊用戶等級按鈕
		const clickLevel = () => {
			router.push('/about/262143');
		};

		// 顯示修改昵称
		const showNameModal = () => {
			state.showNiceNameModal = true;
		};
		// 隱藏修改昵称
		const hideNameModal = () => {
			state.showNiceNameModal = false;
		};
		// 顯示修改頭像
		const showAvatarModal = () => {
			matomo_personal_edit_avater();
			state.showAvatarModal = true;
		};
		// 隱藏修改頭像
		const hideAvatarModal = () => {
			state.showAvatarModal = false;
		};
		// 顯示修改頭像
		const showProfileModal = () => {
			state.showProfileModal = true;
		};
		// 隱藏修改頭像
		const hideProfileModal = () => {
			state.showProfileModal = false;
		};

		return {
			store,
			route,
			router,
			state,
			userInfo,
			levelList,
			userLevelThumb,
			showRecharge,
			errorPersonImg,
			commaFormat,
			clickAnchorLevel,
			clickLevel,
			// ----------------
			showNameModal,
			hideNameModal,
			// ----------------
			showAvatarModal,
			hideAvatarModal,
			// ----------------
			showProfileModal,
			hideProfileModal,
		};
	},
};
</script>
<style lang="scss">
.avatarUploader {
	width: 300px;
	height: 300px;
	.ant-upload {
		width: 100% !important;
		height: 100% !important;
		display: flex;
		overflow: hidden;
		margin: 0;
	}
}
.avatarModal {
	width: 450px;
	border-radius: 8px !important;
	overflow: hidden;
	padding-bottom: 0px !important;
}
.niceNameModal {
	width: 650px !important;
	border-radius: 8px !important;
	overflow: hidden;
	padding-bottom: 0px !important;
}
</style>
