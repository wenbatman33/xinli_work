<template lang="pug">
//- 我的推薦碼
.invite.flex.flex-col
	//- 導覽欄
	nav-bar(title='我的推荐码', icon='/publicAssets/img/invite/icon-share-big@3x.png', right-button='/publicAssets/img/icon-close-red@3x.png', @click-right='clickRight')

	//- 紀錄類型
	van-tabs(swipeable, @click='clickTab')
		van-tab(title='推荐纪录')
		van-tab(title='加码纪录')

	//- 分隔線
	divider

	//- 下拉刷新
	van-pull-refresh(v-model='state.isLoading', @refresh='refresh')
		//- 圖示
		img.align-stretch.mt-4.px-4(src='/publicAssets/img/invite/banner.png')

		//- 標題
		.title.text-xl.font-bold.mt-4.px-4 荐者有份

		//- 副標題
		.header.text-base.font-bold.mt-2.px-4 好友一起来 优惠拿不完

		//- 內容
		.content.text-sm.mt-6.px-4 邀请朋友使用您的推荐码进行注册，注册成功后你与好友皆会获得1,000蕉币奖励。

		//- 說明
		.info.text-sm.text-center.mt-4.mx-4.px-4.py-6.rounded-md
			| 每累计推荐
			mark 10个好友
			| ，额外加送
			mark 5000蕉币
			| 单月推荐奖励上限10次，隔月1号00:00 重置，赶紧一起推荐好友!!

		//- 推薦紀錄
		.flex.flex-col.mt-4(v-if='state.isRecommendRecord')
			//- 標題
			.flex.flex-row.items-center.mx-4
				.header.text-base.font-bold 推荐纪录
				.content.text-sm.font-bold.ml-2 {{ `(本月已推荐 ${state.num}/10)` }}

			//- 沒有紀錄
			empty.mt-2(v-if='isInviteListEmpty')

			//- 推薦列表
			.mt-2(v-else)
				.flex.flex-row.items-center.justify-between.rounded-md.shadow.px-4.py-6.my-1.mx-4(v-for='(item, index) in state.inviteList')
					.flex.flex-row.flex-shrink-0.items-center
						//- 編號
						.indicator.text-lg.font-bold {{ index < 9 ? `0${index + 1}` : index + 1 }}

						//- 蕉幣圖示
						img.w-6.h-6.ml-4(src='/publicAssets/img/coin.png')

						//- 蕉幣數量
						.coin.text-base.font-bold.ml-1 {{ commaFormat(item.coin || '0') }}

					.flex.flex-col.flex-shrink.items-end.ml-2
						//- 暱稱
						.content.text-sm.font-bold.break-all {{ item.user_nicename }}

						//- 時間
						.content.text-sm.mt-1.break-all {{ `${item.invite_date} 注册` }}

		//- 加碼紀錄
		.flex.flex-col.mt-4(v-if='state.isBonusRecord')
			//- 標題
			.header.text-base.font-bold.mx-4 奖励纪录

			//- 沒有紀錄
			empty.mt-2(v-if='isBonusListEmpty')

			//- 加碼列表
			.mt-2(v-else)
				.flex.flex-row.items-center.justify-between.rounded-md.shadow.px-4.py-6.my-1.mx-4(v-for='item in state.bonusList')
					.flex.flex-row.flex-shrink-0.items-center
						//- 獎勵
						.indicator.text-lg.font-bold 奖励

						//- 蕉幣圖示
						img.w-6.h-6.ml-4(src='/publicAssets/img/coin.png')

						//- 蕉幣數量
						.coin.text-base.font-bold.ml-1 {{ commaFormat(item.coin || '0') }}

					.flex.flex-col.flex-shrink.items-end.ml-2
						//- 類別
						.content.text-sm.font-bold.break-all 系統

						//- 時間
						.content.text-sm.mt-1.break-all {{ `${item.create_time}` }}

		//- 分享資訊
		.invite-info.flex.flex-col.shadow.mt-4.pb-8
			//- 箭頭
			img.w-4.h-4.self-center.mt-1(src='/publicAssets/img/invite/icon-bottomarrow@3x.png')

			//- 您的專屬分享碼
			.header.text-base.font-bold.mt-8.mx-4 您的专属分享码

			//- 分享碼
			.mt-6.px-4
				van-button.invite-code-button.rounded-md.shadow(@click='clickCopy')
					.flex.flex-row.items-center.px-6.py-4
						.invite-code.flex-grow.text-2xl.font-bold {{ code }}
						.copy.text.base.font-bold.ml-2 复制

			//- 推薦資訊
			.grid.grid-cols-2.gap-4.text-center.mx-4.mt-4
				//- 成功邀請
				.info.flex.flex-col.px-4.py-2
					.amount.text-base.font-bold {{ count }}
					.text-sm.mt-2 成功邀请

				//- 累積蕉幣
				.info.flex.flex-col.px-4.py-2
					.amount.text-base.font-bold {{ bonus }}
					.text-sm.mt-2 累积蕉币

			//- 立即分享
			.mt-6.px-4
				submit-button(text='立即分享您的推荐码', @click='clickShare')
</template>
<script>
import { computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Notify } from 'vant';
import { userInviteList } from '@/api';
import { commaFormat } from '@/utils';
import { matomo_invite_check_record, matomo_invite_check_bonus, matomo_invite_copy, matomo_invite_share, matomo_invite_copyLink, matomo_invite_shareWeibo, matomo_invite_shareQQ } from '@/matomoTrackEvent.js';
import empty from '@/components/empty';
import navBar from '@/components/navBar';
import divider from '@/components/divider';
import submitButton from '@/components/submitButton';

export default {
	components: {
		empty,
		navBar,
		divider,
		submitButton,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			num: 0,
			isLoading: false,
			isSharing: false,
			isRecommendRecord: true,
			isBonusRecord: false,
			inviteList: [],
			bonusList: [],
		});

		// 用戶名稱
		const userName = computed(() => {
			return store?.state?.user?.userInfo?.user_nicename || '';
		});

		// 分享碼
		const code = computed(() => {
			return store.state?.user?.userInfo?.invite?.code || '-';
		});

		// 成功邀請
		const count = computed(() => {
			return commaFormat(store.state?.user?.userInfo?.invite?.count || 0);
		});

		// 累積蕉幣
		const bonus = computed(() => {
			return commaFormat(store.state?.user?.userInfo?.invite?.bonus || 0);
		});

		// 推薦紀錄是否為空
		const isInviteListEmpty = computed(() => {
			return state.inviteList.length === 0;
		});

		// 加碼紀錄是否為空
		const isBonusListEmpty = computed(() => {
			return state.bonusList.length === 0;
		});

		// 分享網址
		const signupHref = computed(() => {
			const signupUrl = new URL(window.location.origin);
			signupUrl.pathname = 'signup';
			signupUrl.searchParams.append('invitecode', code.value);
			return signupUrl.href;
		});

		// 取得推薦、加碼紀錄
		const getInviteList = () => {
			// Update searching state
			state.isLoading = true;

			// Get invite list
			userInviteList()
				.then((res) => {
					// Update invite list
					state.inviteList = res?.data?.list || [];

					// Update bonus list
					state.bonusList = res?.data?.bonus || [];

					// Update invite nums
					state.num = res?.data?.num || 0;

					// Revert searching state on finished
					state.isLoading = false;
				})
				.catch(() => {
					// Revert searching state on error
					state.isLoading = false;
				});
		};

		// 複製字串
		const copyString = (string) => {
			const x = window.scrollX;
			const y = window.scrollY;
			const input = document.createElement('textarea');
			try {
				document.body.appendChild(input);
				input.value = string;
				input.focus();
				input.select();
				input.setSelectionRange(0, 99999);
				document.execCommand('copy');
			} catch (err) {}
			document.body.removeChild(input);
			window.scrollTo(x, y);
		};

		// On component mounted
		onMounted(() => {
			getInviteList();
		});

		// On refresh
		const refresh = () => {
			getInviteList();
		};

		// 點擊導覽欄關閉按鈕
		const clickRight = () => {
			router.go(-1);
		};

		// 更新選擇的頁籤
		const clickTab = (index) => {
			// Update record type
			state.isRecommendRecord = index === 0;
			state.isBonusRecord = index === 1;

			// Matomo track
			if (index === 0) {
				matomo_invite_check_record();
			} else if (index === 1) {
				matomo_invite_check_bonus();
			}
		};

		// 點擊複製按鈕
		const clickCopy = () => {
			copyString(code.value);
			Notify({ type: 'success', message: '分享码复制完成' });
			matomo_invite_copy();
		};

		// 點擊分享按鈕
		const clickShare = () => {
			copyString(`Hi！
您的朋友${userName.value}推荐您使用拍手直播。
注册並绑定个人资料，即可获得1000蕉币!!
每累计推荐10个好友，额外加送5000蕉币，无上限额度，赶紧一起来推荐好友!!
分享碼：${code.value}
点击链接立即注册领好礼:${signupHref.value}`);
			Notify({ type: 'success', message: '分享信息复制完成' });
			matomo_invite_share();
		};
		return {
			state,
			code,
			count,
			bonus,
			isInviteListEmpty,
			isBonusListEmpty,
			refresh,
			clickRight,
			clickTab,
			clickCopy,
			clickShare,
			commaFormat,
		};
	},
};
</script>
<style lang="scss" scoped>
.invite {
	width: 100%;
	::v-deep(.van-tab__text) {
		font-weight: bold;
	}
	::v-deep(.van-tab--active) {
		color: #a62337;
	}
	::v-deep(.van-tabs__line) {
		background-color: #a62337;
	}
	.title {
		color: #a62337;
	}
	.header {
		color: #191919;
	}
	.content {
		color: #969696;
	}
	.info {
		color: #afafaf;
		background: #fcfcfc;
		mark {
			color: #df2f4a;
			background: transparent;
		}
	}
	.invite-info {
		box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.15);
	}
	.invite-code-button {
		width: 100%;
		height: unset;
		padding: 0;
		border: transparent;
		background: transparent;
		::v-deep(.van-button__content) {
			width: 100%;
		}
		::v-deep(.van-button__text) {
			width: 100%;
			text-align: start;
		}
	}
	.invite-code {
		color: #a62337;
	}
	.copy {
		color: #f8b62d;
	}
	.amount {
		color: #191919;
	}
	.indicator {
		color: #f8b62d;
	}
	.coin {
		color: #000000;
	}
	.content {
		color: #afafaf;
	}
}
</style>
