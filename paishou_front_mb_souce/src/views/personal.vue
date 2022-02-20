<template lang="pug">
//- 我的頁面
.personal.flex.flex-col.pb-16
	//- 導覽欄
	.flex.flex-row-reverse.items-center.px-3.pt-8.pb-2
		.flex.flex-row
			//- 設定
			van-button.transparent-button.rounded-full(@click='clickSetting')
				.p-1
					img.w-7.h-7(src='/publicAssets/img/setting/icon-setting@3x.png')

			//- 站內信
			van-button.transparent-button.rounded-full.ml-2(@click='clickInbox')
				.relative
					img.w-1.h-1.unread(v-if='inboxUnread', src='/publicAssets/img/personal/icon-unread@3x.png')
					.p-1
						img.w-7.h-7(src='/publicAssets/img/inbox/icon-inbox@3x.png')

			//- 每日簽到
			van-button.bonus-button.rounded-md.ml-2(v-if='containsAvailableBonus', @click='clickBonus')
				.relative
					img.w-1.h-1.unread(src='/publicAssets/img/personal/icon-unread@3x.png')
					.text-sm.px-3(class='py-1.5') 每日签到

	//- 下拉刷新
	van-pull-refresh(:model-value='isLoading', @refresh='refresh')
		//- 使用者資訊
		.relative
			van-button.profile-button(@click='clickProfile')
			.flex.flex-row.items-center.p-4
				//- 頭像
				van-button.flex-shrink-0.transparent-button.rounded-full.mr-4(@click='clickProfile')
					img.w-20.h-20.object-cover.rounded-full(:src='avatar', @error='errorAvatarImg')

				//- 資訊
				.flex.flex-col.flex-shrink
					.w-full.flex.flex-row.items-center
						//- 主播等級
						van-button.transparent-button.flex-shrink-0(v-if='levelAnchorThumb', @click.stop='clickAnchorLevel')
							img.h-4(:src='levelAnchorThumb', @error='errorLevelImg')

						//- 會員等級
						van-button.transparent-button.user-level.flex-shrink-0(@click.stop='clickLevel')
							img.h-4(:src='levelThumb', @error='errorLevelImg')

						//- UID
						.uid.w-full.text-xs.break-all(class='ml-1.5') UID: {{ uid }}

					//- 暱稱
					.name.w-full.text-xl.font-bold.mt-1 {{ userName }}

					//- 簽名
					.signature.w-full.text-xs.mt-1(v-if='signature') {{ signature }}

				//- 留白
				.flex-grow

				//- 箭頭
				img.flex-shrink-0.ml-4.w-6.h-6(src='/publicAssets/img/icon-right-gray@3x.png')

		//- 錢包資訊
		.grid.mt-4.mx-4(:class='{ "grid-cols-3": isLiver, "grid-cols-2": !isLiver }')
			//- 蕉幣
			.flex.flex-row.items-center
				van-button.transparent-button.rounded-md.flex-grow.mr-1(@click='clickCoin')
					.flex.flex-col.items-center.rounded-md.px-4.py-2.coin
						.amount.text-base.font-bold.break-all {{ coin }}
						.flex.flex-row.items-center.mt-1
							img.flex-shrink-0.w-4.h-4(src='/publicAssets/img/personal/icon-plus@3x.png')
							.coin.text-sm.ml-1 蕉币
				.wallet-split-line.h-6

			//- 香蕉
			.flex.flex-row.items-center
				van-button.transparent-button.rounded-md.flex-grow.mx-1(@click='clickBanana')
					.flex.flex-col.items-center.rounded-md.px-4.py-2.banana
						.amount.text-base.font-bold.break-all {{ banana }}
						.banana.text-sm.mt-1 香蕉

			//- 粉絲數
			.flex.flex-row.items-center(v-if='isLiver')
				.wallet-split-line.h-6
				van-button.transparent-button.rounded-md.flex-grow.ml-1(@click='clickFans')
					.flex.flex-col.items-center.rounded-md.px-4.py-2.banana
						.amount.text-base.font-bold.break-all {{ fans }}
						.fans.text-sm.mt-1 粉丝关注

		//- 房間管理
		personal-button.mt-2(v-if='isAdmin', icon='icon-briefcase@3x.png', title='房间管理', @click='clickAdminList')

		//- 我的推荐码
		personal-button.mt-2(icon='icon-share@3x.png', title='我的推荐码', @click='clickInvite')

		//- 我的背包
		personal-button.mt-2(icon='icon-gift@3x.png', title='我的背包', @click='clickBackpack')

		//- 我的任務
		personal-button.mt-2(icon='icon-task@3x.png', title='我的任务', @click='clickTaskList')

		//- 拍手公告
		personal-button.mt-2(icon='icon-announcement@3x.png', title='拍手公告', @click='clickNoticeList')

		//- 競猜紀錄
		personal-button.mt-2(icon='icon-guess@3x.png', title='竞猜纪录', @click='clickGuessHistory')

		//- 充值紀錄
		personal-button.mt-2(icon='icon-recharge@3x.png', title='充值纪录', @click='clickChargeList')

		//- 打賞紀錄
		personal-button.mt-2(icon='icon-reward@3x.png', title='打赏纪录', @click='clickRewardList')
</template>
<script>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { commaFormat } from '@/utils';
import { matomo_personal_recharge, matomo_personal_click_checkin, matomo_personal_check_setting, matomo_personal_check_inbox, matomo_personal_check_invite, matomo_personal_check_backpack, matomo_personal_check_tasks, matomo_personal_check_notice, matomo_personal_check_chargeList, matomo_personal_check_rewardList, matomo_personal_check_adminList, matomo_personal_check_userLevel, matomo_personal_check_anchorLevel, matomo_personal_check_profile } from '@/matomoTrackEvent.js';
import personalButton from '@/components/personalButton';

export default {
	components: {
		personalButton,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// 是否正在取得個人資料
		const isLoading = computed(() => {
			if (store?.state?.user?.isGettingUserInfo === true) {
				return true;
			} else if (store?.state?.user?.isGettingInboxList === true) {
				return true;
			} else if (store?.state?.tasks?.isGettingBonusList === true) {
				return true;
			} else {
				return false;
			}
		});

		// 站內信列表
		const inboxList = computed(() => {
			return store?.state?.user?.inboxList || [];
		});

		// 等級列表
		const levelList = computed(() => {
			return store?.state?.config?.levelList || [];
		});

		// 用戶資訊
		const userInfo = computed(() => {
			return store?.state?.user?.userInfo || {};
		});

		// 是否存在可簽到的天數
		const containsAvailableBonus = computed(() => {
			return store.getters['tasks/containsAvailableBonus'];
		});

		// 是否有未讀站內信
		const inboxUnread = computed(() => {
			return inboxList?.value?.find((element) => element?.status === 0) != undefined;
		});

		// 主播等級圖片網址
		const levelAnchorThumb = computed(() => {
			return userInfo?.value?.level_anchor_info?.thumb || '';
		});

		// 用戶等級圖片網址
		const levelThumb = computed(() => {
			return levelList?.value?.find((element) => {
				return element?.levelid === userInfo?.value?.level;
			})?.thumb || '';
		});

		// 頭像圖片網址
		const avatar = computed(() => {
			return userInfo?.value?.avatar || '';
		});

		// User id
		const uid = computed(() => {
			return userInfo?.value?.id || '';
		});

		// 暱稱
		const userName = computed(() => {
			return userInfo?.value?.user_nicename || '';
		});

		// 簽名
		const signature = computed(() => {
			return userInfo?.value?.signature || '';
		});

		// 蕉幣數量
		const coin = computed(() => {
			if (userInfo?.value?.coin) {
				return commaFormat(userInfo?.value?.coin);
			} else {
				return '0';
			}
		});

		// 香蕉數量
		const banana = computed(() => {
			if (userInfo?.value?.banana) {
				return commaFormat(userInfo?.value?.banana);
			} else {
				return '0';
			}
		});

		// 粉絲數量
		const fans = computed(() => {
			return userInfo?.value?.fans_num || '';
		});

		// 是否為主播身份
		const isLiver = computed(() => {
			return userInfo?.value?.identities?.find((element) => {
				return element?.identity === 4;
			}) != undefined;
		});

		// 使否為房間管理身份
		const isAdmin = computed(() => {
			return userInfo?.value?.identities?.find((element) => {
				return element?.identity === 3;
			}) != undefined
		});

		// 取得個人資料
		const getPersonalData = () => {
			if (!store.state?.user?.isGettingUserInfo) {
				store.dispatch('user/GET_USER_INFO', {});
			}
			if (!store.state?.user?.isGettingInboxList) {
				store.dispatch('user/GET_INBOX_LIST', {});
			}
			if (!store.state?.tasks?.isGettingBonusList) {
				store.dispatch('tasks/GET_BONUS_LIST', {});
			}
		};

		// 下拉刷新
		const refresh = () => {
			getPersonalData();
		};

		// 用戶等級圖片讀取失敗
		const errorLevelImg = (event) => {
			event.target.src = '/publicAssets/img/default-level@3x.png';
		};

		// 頭像圖片讀取失敗
		const errorAvatarImg = (event) => {
			event.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 點擊站內信按鈕
		const clickInbox = () => {
			router.push('/inbox');
			matomo_personal_check_inbox();
		};

		// 點擊設置按鈕
		const clickSetting = () => {
			router.push('/setting');
			matomo_personal_check_setting();
		};

		// 點擊每日簽到按鈕
		const clickBonus = () => {
			router.push('/tasks');
			matomo_personal_click_checkin();
		};

		// 點擊主播等級按鈕
		const clickAnchorLevel = () => {
			router.push('/about/262141');
			matomo_personal_check_anchorLevel();
		};

		// 點擊用戶等級按鈕
		const clickLevel = () => {
			router.push('/about/262143');
			matomo_personal_check_userLevel();
		};

		// 點擊個人資料按鈕
		const clickProfile = () => {
			router.push('/profile');
			matomo_personal_check_profile();
		};

		// 點擊蕉幣按鈕
		const clickCoin = () => {
			router.push('recharge');
			matomo_personal_recharge();
		};

		// 點擊香蕉按鈕
		const clickBanana = () => {};

		// 點擊粉絲數按鈕
		const clickFans = () => {};

		// 點擊房間管理按鈕
		const clickAdminList = () => {
			router.push('/adminlist');
			matomo_personal_check_adminList();
		};

		// 點擊我的推薦碼按鈕
		const clickInvite = () => {
			router.push('/invite');
			matomo_personal_check_invite();
		};

		// 點擊我的背包按鈕
		const clickBackpack = () => {
			router.push('/backpack');
			matomo_personal_check_backpack();
		};

		// 點擊我的任務按鈕
		const clickTaskList = () => {
			router.push('/tasks');
			matomo_personal_check_tasks();
		};

		// 點擊系統公告按鈕
		const clickNoticeList = () => {
			router.push('/notice');
			matomo_personal_check_notice();
		};

		// 點擊競猜紀錄按鈕
		const clickGuessHistory = () => {
			router.push('/guesshistory');
			// matomo_personal_check_guessList();
		};

		// 點擊充值紀錄按鈕
		const clickChargeList = () => {
			router.push('/chargelist');
			matomo_personal_check_chargeList();
		};

		// 點擊打賞紀錄按鈕
		const clickRewardList = () => {
			router.push('/rewardlist');
			matomo_personal_check_rewardList();
		};

		// On component mounted
		onMounted(() => {
			getPersonalData();
		});
		return {
			isLoading,
			containsAvailableBonus,
			inboxUnread,
			levelAnchorThumb,
			levelThumb,
			avatar,
			uid,
			userName,
			signature,
			coin,
			banana,
			fans,
			isLiver,
			isAdmin,
			refresh,
			errorLevelImg,
			errorAvatarImg,
			clickInbox,
			clickSetting,
			clickBonus,
			clickAnchorLevel,
			clickLevel,
			clickProfile,
			clickCoin,
			clickBanana,
			clickFans,
			clickAdminList,
			clickInvite,
			clickBackpack,
			clickTaskList,
			clickNoticeList,
			clickGuessHistory,
			clickChargeList,
			clickRewardList,
		};
	},
};
</script>
<style lang="scss" scoped>
.personal {
	width: 100%;
	.transparent-button {
		width: unset;
		height: unset;
		padding: 0;
		border: transparent;
		background-color: transparent;
		::v-deep(.van-button__content) {
			width: 100%;
		}
		::v-deep(.van-button__text) {
			width: 100%;
			text-align: start;
		}
	}
	.bonus-button {
		width: unset;
		height: unset;
		padding: 0;
		border: transparent;
		color: #ffffff;
		background: linear-gradient(262deg, #a62337, #df2f4a);
		::v-deep(.van-button__content) {
			width: 100%;
		}
		::v-deep(.van-button__text) {
			width: 100%;
			text-align: start;
		}
	}
	.unread {
		position: absolute;
		top: 0.25rem;
		right: 0.25rem;
	}
	.profile-button {
		width: 100%;
		height: 100%;
		padding: 0;
		border: transparent;
		background-color: transparent;
		position: absolute;
		::v-deep(.van-button__content) {
			width: 100%;
		}
		::v-deep(.van-button__text) {
			width: 100%;
			text-align: start;
		}
	}
	.user-level {
		margin-left: 0.25rem;
		&:first-of-type {
			margin-left: 0rem;
		}
	}
	.uid {
		color: #afafaf;
	}
	.name {
		color: #191919;
	}
	.signature {
		color: #afafaf;
	}
	.amount {
		color: #191919;
	}
	.coin {
		color: #f2994a;
	}
	.banana {
		color: #969696;
	}
	.fans {
		color: #969696;
	}
	.wallet-split-line {
		width: 1px;
		background: #e1e1e1;
	}
}
</style>
