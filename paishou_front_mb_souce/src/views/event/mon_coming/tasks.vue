<template lang="pug">
.page.pb-12(class='sm:px-2 md:px-4 lg:px-8 xl:px-20')
	.partTitle.flex.flex-row.justify-center.my-12
		img(src='/publicAssets/img/event/mon_coming/img-wheat-left.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-left@2x.png 2x")
		span
			h2.text-center.text-white.pt-2 任务拿奖励
			.text-xs.text-center.text-white.italic Get paid for tasks
		img(src='/publicAssets/img/event/mon_coming/img-wheat-right.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-right@2x.png 2x")
	.text-base.text-center.text-white 每日5项任务完成其中2项者，即可获得免费转盘一次
	.text-base.text-center.text-psOrange (转盘可累计计算,隔天不归零)
	//--------------------------------------------------------------------------------------------------------------------------------------
	.text-center.my-4
		van-button.green-btn.cursor-default(type='primary', round) 您目前拥有转盘机会 {{state.count}} 次
	.tasksList
		.grid.gap-4(class='sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-5')
			.col-span-1.text-white(v-for='(item, index) in state.tasksList')
				.p-4.border.rounded.border-white.text-center.h-full
					.flex.justify-between.items-center(class='sm:flex-row md:flex-row lg:flex-col')
						.flex-shrink-0
							img(:src='state.tasksIcon[index]')
						.flex-grow
							p.my-2 {{item.task_name}}
							.text-gray-700.my-2 {{item.giftname|| '&nbsp;'}}
						.flex-shrink-0
							van-button.ghost-btn.cursor-default(v-if='item.status===1', round, ghost, disabled) 完成
							van-button.ghost-btn(v-else, round, ghost, @click='gotoDeepLink(item.deeplink)') 去完成
	//--------------------------------------------------------------------------------------------------------------------------------------
	.partTitle.flex.flex-row.justify-center.my-12
		img(src='/publicAssets/img/event/mon_coming/img-wheat-left.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-left@2x.png 2x")
		span
			h2.text-center.text-white.pt-2 活动说明
			.text-xs.text-center.text-white.italic Event Description
		img(src='/publicAssets/img/event/mon_coming/img-wheat-right.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-right@2x.png 2x")
	.text-lg.text-center.text-white ・当日五项任务任选二项完成，即可获得免费转盘一次,当日最高可获得免费转盘2次
	.text-lg.text-center.text-white ・每日任务完成后,隔日00:00会重置任务,可重覆完成任务
	.text-lg.text-center.text-white ・每日完成任务获得转盘机会可累计次数使用,活动结束未使用次数不予返还蕉币
	//--------------------------------------------------------------------------------------------------------------------------------------
	.partTitle.flex.flex-row.justify-center.my-12
		img(src='/publicAssets/img/event/mon_coming/img-wheat-left.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-left@2x.png 2x")
		span
			h2.text-center.text-white.pt-2 注意事项
			.text-xs.text-center.text-white.italic Precautions
		img(src='/publicAssets/img/event/mon_coming/img-wheat-right.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-right@2x.png 2x")
	.text-lg.text-center.text-white ・用户账号注册限每日登陆一次优惠，不可重复领取
	.text-lg.text-center.text-white.my-4 ・拍手直播有权利提早或终止活动，若提前截止，会提早公告。活动过程中如有发现违规行为，我方有权取消此行为的用户参予活动资格，并扣除本活动所获得奖励。
	.text-lg.text-center.text-white ・实体赠品于活动结束后14个工作天送达
</template>
<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, onUnmounted, computed, reactive, toRaw } from 'vue';
import { deepLink } from '@/utils';
import { eventMocheng, eventMochengBonusInfo } from '@/api';

export default {
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			tasksList: null,
			tasksIcon: ['/publicAssets/img/event/mon_coming/icon-heart.png', '/publicAssets/img/event/mon_coming/icon-banana.png', '/publicAssets/img/event/mon_coming/icon-eyes.png', '/publicAssets/img/event/mon_coming/icon-gift.png', '/publicAssets/img/event/mon_coming/icon-message.png'],
			count: 0,
			used_count: 0,
		});
		// store  ------------
		const userInfo = computed(() => store.state.user.userInfo);
		const COIN = computed(() => store.state.user.userInfo.coin);
		const allGiftList = computed(() => store.state.config.allGiftList);
		const commaFormat = (value) => value.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
		const gotoDeepLink = (url) => {
			// 判斷是不是app 然後選擇開啟方式
			if (route.query.isapp === 'true') {
				window.location.href = url;
			} else {
				deepLink(url);
			}
		};
		onMounted(() => {
			eventMocheng().then((res) => {
				state.tasksList = res.data.list;
			});
			eventMochengBonusInfo().then((res) => {
				state.count = res.data.count;
				state.used_count = res.data.used_count;
			});
		});
		return {
			store,
			state,
			route,
			router,
			userInfo,
			COIN,
			allGiftList,
			stop,
			commaFormat,
			gotoDeepLink,
		};
	},
};
</script>
<style lang="scss" scoped>
.page {
	background: #000;
}
.green-btn {
	background: #18a300;
	border-radius: 8px;
	border: 1px solid #18a300;
}
.ghost-btn {
	border-radius: 16px;
	background: none;
	color: #fff;
	&:hover {
		color: #18a300;
		border: 1px solid #18a300;
	}
}
</style>
