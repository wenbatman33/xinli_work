<template lang="pug">
//- 幸運轉盤
.flex.flex-col.items-stretch.min-h-full.bg-luckyspin.pt-6.pb-8
    //- 導覽欄
    .flex.flex-row.justify-between.items-center.px-6
        //- Logo
        van-button.w-auto.h-auto.p-0.rounded.bg-transparent.border-transparent(@click='clickLogo')
            img.w-auto.h-10.object-contain(src='/publicAssets/img/event/luckyspin/icon-logo@3x.png')

        //- 關閉
        van-button.w-auto.h-auto.p-1.rounded-full.bg-transparent.border-transparent(@click='clickClose')
            img.w-6.h-6.object-contain(src='/publicAssets/img/event/luckyspin/icon-close@3x.png')

    //- 標題
    img.mx-8.mt-6.object-contain(src='/publicAssets/img/event/luckyspin/icon-title@3x.png')

    //- 轉盤
    .relative.mt-8
        //- 底圖
        img.relative.z-10.w-full.h-auto.object-contain(ref='spinDom', src='/publicAssets/img/event/luckyspin/icon-spin-bg@3x.png')
        //- 外框
        img.absolute.z-20.left-0.top-0.w-full.h-auto.object-contain(src='/publicAssets/img/event/luckyspin/icon-spin-border@3x.png')
        //- 中獎區塊
        img.absolute.z-30.left-0.top-0.w-full.h-auto.object-contain(src='/publicAssets/img/event/luckyspin/icon-spin-piece@3x.png')
        //- 抽獎中
        img.absolute.z-40.left-0.top-0.w-full.h-auto.object-contain(v-if='state.spinLoading', src='/publicAssets/img/event/luckyspin/icon-spin-button-disabled@3x.png')
        //- 點擊抽獎
        img.absolute.z-40.left-0.top-0.w-full.h-auto.object-contain(v-else, src='/publicAssets/img/event/luckyspin/icon-spin-button@3x.png')
        //- 點擊按鈕
        van-button.absolute.z-50.left-spin.top-spin.w-spin.h-spin.rounded-full.p-0.bg-transparent.border-transparent(:disabled='state.spinLoading', @click='clickSpin')

    //- 說明標題
    .text-white.text-lg.font-bold.mt-12.mx-6
        span 活动说明

    //- 說明內容
    .text-white.text-sm.mt-3.mx-6
        span 拍手天天送，每日登入抢彩金
        br
        span 1、所有已注册用户皆可参与活动。
        br
        span 2、每日进入活动都有抽奖机会，转盘的彩金红包立即有效。
        br
        span 3、中奖后需要即时找小助手登记领取，遇时不候。

    //- 注意標題
    .text-white.text-lg.font-bold.mt-12.mx-6
        span 注意事项

    //- 注意內容
    .text-white.text-sm.mt-3.mx-6
        span 1、拍手直播有权利提早或终止活动，若提前截止，会提早公告。
        br
        span 2、活动过程中如有发现违规行为，我方有权取消此行为的用户参予活动资格，并扣除本活动所获得奖励。

    //- 加載中
    .text-white.text-sm.mt-8.mx-6(v-if='state.slideLoading')
        span 加载中

    //- 目前沒有紀錄
    .text-white.text-sm.mt-8.mx-6(v-else-if='slideEmpty')
        span 目前没有紀錄

    //- 獎項列表
    reward-list.mt-8.mx-6(v-else, :list='state.slideList')

    //- 回到頂部
    van-button.self-center.w-auto.h-auto.p-0.mt-12.rounded-full.bg-transparent.border-transparent(@click='clickTop')
        img.w-7.h-7.object-contain(src='/publicAssets/img/event/luckyspin/icon-arrow-top@3x.png')

    //- 版權聲明
    .text-copyright.mt-20 Copyright © paishou 2021

//- 登入彈窗
login-popup(v-model:show='state.showLoginPopup')

//- 獎項彈窗
reward-popup(v-model:show='state.showRewardPopup', :icon='state.rewardIcon', :name='state.rewardName')

//- 次數限制彈窗
limited-popup(v-model:show='state.showLimitedPopup')
</template>
<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { slideList } from '@/api';
import rewardList from '@/components/event/luckyspin/rewardList.vue';
import loginPopup from '@/components/event/luckyspin/loginPopup.vue';
import rewardPopup from '@/components/event/luckyspin/rewardPopup.vue';
import limitedPopup from '@/components/event/luckyspin/limitedPopup.vue';
import bezier from '@/utils/bezier.js';
import dayjs from 'dayjs';

const ANIMATION_LENGTH = 3000;
const BEZIER_EASING = bezier(0, 0.69, 0.34, 1);
const DEG_LIST = [0, 51, 102, 154, 205, 257, 308];

export default {
	components: {
		rewardList,
		loginPopup,
		rewardPopup,
		limitedPopup,
	},
	setup() {
		// Vue router
		const router = useRouter();

		// Vuex store
		const store = useStore();

		// Spin dom reference
		const spinDom = ref(null);

		// Component state
		const state = reactive({
			spinLoading: false,
			slideLoading: false,
			showLoginPopup: false,
			showRewardPopup: false,
			showLimitedPopup: false,
			slideList: [],
			rewardIcon: '',
			rewardName: '',
			startDeg: 0,
			targetDeg: 0,
			currentDeg: 0,
			startTimestamp: undefined,
			animationFrame: undefined,
		});

		// Slide list empty
		const slideEmpty = computed(() => {
			const list = state.slideList || [];
			return list.length === 0;
		});

		// Animation frame step
		const step = (timestamp) => {
			if (!state.startTimestamp) {
				state.startTimestamp = timestamp;
			}
			const duration = timestamp - state.startTimestamp;
			const progress = BEZIER_EASING(Math.min(duration / ANIMATION_LENGTH, 1));
			const deg = ((state.targetDeg - state.startDeg) * progress) % 360;
			state.currentDeg = deg;
			if (spinDom.value) {
				spinDom.value.style = `transform: rotate(${deg}deg);`;
			}
			if (progress < 1) {
				state.animationFrame = requestAnimationFrame(step);
			} else {
				state.spinLoading = false;
				state.showRewardPopup = true;
			}
		};

		// Click logo image
		const clickLogo = () => {
			router.replace('/');
		};

		// Click close button
		const clickClose = () => {
			router.go(-1);
		};

		// Click spin button
		const clickSpin = () => {
			// Validate login staus
			if (store.getters['user/IS_LOGIN'] !== true) {
				state.showLoginPopup = true;
				return;
			}

			// Validate spin date
			const uid = store?.state?.user?.uid || '';
			const key = 'LuckySpin_' + uid;
			const spinDate = window.localStorage[key];
			const today = dayjs().format('YYYY-MM-DD');
			if (spinDate && dayjs(spinDate).isSame(today)) {
				state.showLimitedPopup = true;
				return;
			} else {
				window.localStorage.setItem(key, today);
			}

			// Update spin loading
			state.spinLoading = true;

			// Cancel animation
			if (state.animationFrame) {
				cancelAnimationFrame(state.animationFrame);
			}

			// Request animation
			const allowedList = [1, 2, 4, 5, 6];
			const randomRound = Math.floor(Math.random() * 3) + 4;
			const randomIndex = allowedList[Math.floor(Math.random() * allowedList.length)];
			const slideItem = state.slideList[randomIndex] || {};
			const degItem = DEG_LIST[randomIndex];
			state.rewardIcon = slideItem.slide_pic || '';
			state.rewardName = slideItem.slide_name || '';
			state.startDeg = state.currentDeg;
			state.targetDeg = degItem + 360 * randomRound;
			state.startTimestamp = undefined;
			state.animationFrame = requestAnimationFrame(step);
		};

		// Click scroll to top
		const clickTop = () => {
			window.scrollTo(0, 0);
		};

		// Get slide list
		const getSlideList = () => {
			// Update loading state
			state.slideLoading = true;

			// Query params
			const query = {
				slide_cid: 29,
			};

			// Fetch slide list
			slideList(query)
				.then((res) => {
					// Update slide list
					state.slideList = res?.data?.list || [];

					// Revert loading state
					state.slideLoading = false;
				})
				.catch(() => {
					// Revert loading state
					state.slideLoading = false;
				});
		};

		// On component mounted
		onMounted(() => {
			getSlideList();
		});
		return {
			spinDom,
			state,
			slideEmpty,
			clickLogo,
			clickClose,
			clickSpin,
			clickTop,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-luckyspin {
	background-image: url('/publicAssets/img/event/luckyspin/icon-bg@3x.png');
	background-size: cover;
	background-position-x: center;
	background-position-y: top;
	background-repeat: no-repeat;
}
.left-spin {
	left: 35%;
}
.top-spin {
	top: 35%;
}
.w-spin {
	width: 30%;
}
.h-spin {
	height: 30%;
}
.text-copyright {
	font-family: PingFang SC;
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	line-height: 12px;
	text-align: center;
	color: #ffffff;
}
</style>
