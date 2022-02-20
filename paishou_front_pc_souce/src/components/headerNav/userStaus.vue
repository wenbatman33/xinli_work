<template lang="pug">
a-popover(placement='bottom', v-if='userInfo', @visibleChange='handleHoverChange')
	.userBtn.flex.items-center.cursor-pointer.relative
		img.AVATAR.w-10.h-10(:src='userInfo.avatar', @error='errorPersonImg')
		.unRead(v-if='userUnreadInbox')
	template(#content)
		.popover.glassBg.relative(style='width:360px;border-radius:8px')
			.popoverHeader.flex.p-4
				img.AVATAR.w-12.h-12(:src='userInfo.avatar', @error='errorPersonImg')
				//- .userAvatar
				.userData.FLEX_C.flex-grow
					.BETWEEN
						div
							img.w-7.mr-1(v-if='levelAnchorThumb', :src='levelAnchorThumb')
							img.w-7.mr-1(v-if='userLevelThumb(userInfo.level)', :src='userLevelThumb(userInfo.level)')
							span.text-xs.text-gray-500.mr-1 ID {{ userInfo.id }}
						router-link(to='/personal/inbox')
							.inbox
								.unRead(v-if='userUnreadInbox')
								img(src='/publicAssets/img/v3/icon-mail-outline-r.png')
					h4.text-xs.mr-1.my-1 {{ userInfo.user_nicename }}
					.userFuncBtns.BETWEEN
						.signature.w-40.text-xs.text-gray-500.truncate {{ userInfo.signature }}
			.popoverWallet.grid.grid-cols-2.gap-4.px-4
				.col-span-1.bg-white.rounded
					.FLEX_R.items-center.p-2
						.icon.mr-2
							img.w-6(src='/publicAssets/img/v3/coin.png', alt='')
						.info.truncate
							h5.text-psV3Yellow.cursor-pointer(@click='showRecharge')  
								span 蕉币
								img.w-3.h-3(src='/publicAssets/img/v3/icon-plus-1.png', srcset='/publicAssets/img/v3/icon-plus-1@2x.png 2x')
							.text-gray-500 {{ commaFormat(COIN) || 0}}
				.col-span-1.bg-white.rounded
					.FLEX_R.items-center.p-2
						.icon.mr-2
							img.w-6(src='/publicAssets/img/v3/banana.png', alt='')
						.info.truncate
							h5 香蕉
							.text-gray-500 {{ commaFormat(userInfo.banana) ||0 }}
			headCampaign
			.popoverFooter.w-full.glassBg.BETWEEN.px-4.py-2.absolute.bottom-0
				router-link(to='/personal')
					.footerBtn.FLEX_C.justify-center.my-1
						img.footerBtnImg(src='/publicAssets/img/v3/icon-user-b.png')
						.text-xs.text-center.my-1 个人中心
				router-link(to='/personal/concern')
					.footerBtn.FLEX_C.justify-center.my-1
						img.footerBtnImg(src='/publicAssets/img/v3/icon-heart-b.png')
						.text-xs.text-center.my-1 我的关注
				router-link(v-if='userInfo.is_anchor!==1', to='/anchorauth')
					.footerBtn.FLEX_C.justify-center.my-1
						img.footerBtnImg(src='/publicAssets/img/v3/icon-camera-video.png')
						.text-xs.text-center.my-1 申请直播
				router-link(v-if='userInfo.is_anchor===1', to='/personal/liveConfig')
					.footerBtn.FLEX_C.justify-center.my-1
						img.footerBtnImg(src='/publicAssets/img/v3/icon-camera-video.png')
						.text-xs.text-center.my-1 立即直播
				.footerBtn.FLEX_C.justify-center.cursor-pointer.my-1(@click='exit')
					img.footerBtnImg(src='/publicAssets/img/v3/icon-logout.png')
					.text-xs.text-center.my-1 账号登出
</template>

<script>
import { useStore } from 'vuex';
import { computed, reactive, onMounted, toRaw } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';
import headCampaign from '@/components/headerNav/headCampaign';
import { matomo_tabBar_check_personal } from '@/matomoEvent';
import { commaFormat, userLevelThumb, errorPersonImg } from '@/utils';

export default {
	components: {
		DownOutlined,
		headCampaign,
	},
	setup() {
		//  ------------
		const store = useStore();
		const state = reactive({
			popoverShow: false,
		});
		// store  ------------
		const userInfo = computed(() => store.state.user.userInfo);
		const COIN = computed(() => store?.state?.user?.userInfo?.coin || 0);
		const userUnreadInbox = computed(() => store.state.user.unreadInbox);
		const levelList = computed(() => store.state.config.levelList);
		const levelAnchorThumb = computed(() => store?.state?.user?.userInfo?.level_anchor_info?.thumb);
		const showRecharge = () => store.commit('user/SHOW_RECHARGE_MODEL');
		const exit = () => store.dispatch('user/RESET_TOKEN');
		const GET_LEVEL_PERCENT = (level, consumption) => store.getters['config/GET_LEVEL_PERCENT'](level, consumption);
		// store ------------
		const handleHoverChange = (isShow) => {
			if (isShow) matomo_tabBar_check_personal();
			state.popoverShow = isShow;
		};

		return {
			state,
			store,
			userInfo,
			COIN,
			userUnreadInbox,
			levelList,
			levelAnchorThumb,
			GET_LEVEL_PERCENT,
			handleHoverChange,
			showRecharge,
			exit,
			errorPersonImg,
			userLevelThumb,
			commaFormat,
		};
	},
};
</script>

<style lang="scss" scoped>
.popover {
	width: 320px;
	min-height: 400px;
}
.glassBg {
	backdrop-filter: saturate(180%) blur(20px) !important;
	background-color: rgba(255, 255, 255, 0.7);
	transition: height 0.5s !important;
	box-shadow: 0px 2px 3px rgba(43, 28, 28, 0.1) !important;
}
.userBtn {
	position: relative;
	.unRead {
		position: absolute;
		left: 40px;
		top: 0;
		width: 8px;
		height: 8px;
		border-radius: 100%;
		box-shadow: 0 2px 4px 0 #ff9a00;
		background-color: #ff9a00;
		overflow: hidden;
		z-index: 2;
		animation: fadein 1.5s ease-in-out infinite;
	}
}

.userBtnName {
	width: auto;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 200px;
}
.userAvatar {
	width: 50px !important;
	height: 50px !important;
	border-radius: 50%;
	margin-right: 16px;
	margin-top: 5px;
	border: 2px solid #a62337;
	overflow: hidden;
	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		margin-right: 12px;
	}
}
.rechargeBtn {
	width: 50px;
	border: none;
	outline: none;
	color: #fff;
	border-radius: 30px;
	font-size: 12px;
	padding: 2px 0;
	cursor: pointer;
	background: linear-gradient(156deg, rgba(255, 0, 0, 1) -30%, rgba(255, 255, 0, 1) 100%);
}
.levelLabel {
	img {
		width: 40px;
	}
}
.popoverTaskBox {
	width: 100%;
	height: 200px;
	overflow: auto;
}

.footerBtnImg {
	margin: auto auto;
	width: 24px;
	height: 24px;
}

.inbox {
	position: relative;
	.unRead {
		position: absolute;
		right: -5px;
		top: -5px;
		width: 8px;
		height: 8px;
		border-radius: 100%;
		box-shadow: 0 2px 4px 0 #ff9a00;
		background-color: #ff9a00;
		z-index: 2;
		animation: fadein 1.5s ease-in-out infinite;
	}
}
@keyframes fadein {
	0% {
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
</style>
