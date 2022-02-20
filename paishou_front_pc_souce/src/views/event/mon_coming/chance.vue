<template lang="pug">
.page.pb-12(class='sm:px-2 md:px-4 lg:px-8 xl:px-20')
	.partTitle.FLEX_R.justify-center.my-12
		img(src='/publicAssets/img/event/mon_coming/img-wheat-left.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-left@2x.png 2x")
		span
			h2.text-center.text-white.pt-2 蕉币买机会
			.text-xs.text-center.text-white.italic Banana buying opportunity
		img(src='/publicAssets/img/event/mon_coming/img-wheat-right.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-right@2x.png 2x")
	//--------------------------------------------------------------------------------------------------------------------------------------
	.text-center.my-4
		a-button.brownBtn.cursor-default.m-2(v-if='COIN', type='primary', round) 
			img.w-4(src='/publicAssets/img/v3/coin.png')
			span 您拥有蕉币 {{commaFormat(COIN)}}
		a-button.greenBtn.cursor-default.m-2(type='primary', round) 您目前拥有转盘机会 {{state.count}} 次
	.tasksList
		.grid.gap-4(class='sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5')
			.col-span-1.text-white(v-for='(item, index) in state.chanceList')
				.p-4.text-center.h-full
					.FLEX_C.justify-between.items-center
						.flex-shrink-0
							img(:src='item.icon')
						.flex-grow.my-4
							img.w-4(src='/publicAssets/img/v3/coin.png')
							span.my-2 {{commaFormat(item.coin)}}
						.flex-shrink-0
							a-button.ghostBtn(round, ghost, @click='buyCount(item.count, item.coin)') 点击购买
	//--------------------------------------------------------------------------------------------------------------------------------------
	.partTitle.FLEX_R.justify-center.my-12
		img(src='/publicAssets/img/event/mon_coming/img-wheat-left.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-left@2x.png 2x")
		span
			h2.text-center.text-white.pt-2 活动说明
			.text-xs.text-center.text-white.italic Event Description
		img(src='/publicAssets/img/event/mon_coming/img-wheat-right.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-right@2x.png 2x")
	.text-lg.text-center.text-white 当日五项任务任选二项完成，即可获得免费转盘一次,当日最高可获得免费转盘2次
	.text-lg.text-center.text-white 每日任务完成后,隔日00:00会重置任务,可重覆完成任务
	.text-lg.text-center.text-white 每日完成任务获得转盘机会可累计次数使用,活动结束未使用次数不予返还蕉币
	//--------------------------------------------------------------------------------------------------------------------------------------
	.partTitle.FLEX_R.justify-center.my-12
		img(src='/publicAssets/img/event/mon_coming/img-wheat-left.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-left@2x.png 2x")
		span
			h2.text-center.text-white.pt-2 注意事项
			.text-xs.text-center.text-white.italic Precautions
		img(src='/publicAssets/img/event/mon_coming/img-wheat-right.png', srcset="/publicAssets/img/event/mon_coming/img-wheat-right@2x.png 2x")
	.text-lg.text-center.text-white 用户账号注册限每日登陆一次优惠，不可重复领取
	.text-lg.text-center.text-white.my-4 拍手直播有权利提早或终止活动，若提前截止，会提早公告。活动过程中如有发现违规行为，我方有权取消此行为的用户参予活动资格，并扣除本活动所获得奖励。
	.text-lg.text-center.text-white 实体赠品于活动结束后14个工作天送达
	a-modal(v-if='state.noCoinModal', :visible='state.noCoinModal', :class='"EventModal"', closable='', :footer='null',  @cancel='state.noCoinModal=false')
		h2.text-psV3Red.text-center.my-2 蕉币不足
		p.text-gray-500.text-center.my-2 是否需先进行充值？ 
		p.text-gray-500.text-center.my-2 (购买1次机会，直接扣20,000蕉币)
		.text-center.my-4
			button.mx-2.confirmBtn(@click='state.noCoinModal=false') 等等再玩
			button.mx-2.cancelBtn(@click='gotoRecharge') 去充值
</template>
<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, onUnmounted, computed, reactive, toRaw } from 'vue';
import { eventMochengBonusInfo, eventMochengBonusBuy } from '@/api';
import { message, Modal } from 'ant-design-vue';
import { deepLink, commaFormat } from '@/utils';

export default {
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const userInfo = computed(() => store.state.user.userInfo);
		const COIN = computed(() => store.state.user.userInfo.coin);
		const state = reactive({
			chanceList: [
				{
					count: 1,
					coin: 20000,
					icon: '/publicAssets/img/event/mon_coming/img-01.png',
				},
				{
					count: 2,
					coin: 25000,
					icon: '/publicAssets/img/event/mon_coming/img-02.png',
				},
				{
					count: 3,
					coin: 30000,
					icon: '/publicAssets/img/event/mon_coming/img-03.png',
				},
				{
					count: 4,
					coin: 35000,
					icon: '/publicAssets/img/event/mon_coming/img-04.png',
				},
				{
					count: 5,
					coin: 37500,
					icon: '/publicAssets/img/event/mon_coming/img-05.png',
				},
			],
			count: 0,
			used_count: 0,
			noCoinModal: false,
		});
		const allGiftList = computed(() => store.state.config.allGiftList);
		const init = () => {
			eventMochengBonusInfo().then((res) => {
				state.count = res.data.count;
				state.used_count = res.data.used_count;
			});
		};
		const buyCount = (times, buyCoin) => {
			if (COIN.value < buyCoin) {
				state.noCoinModal = true;
			} else {
				state.loadingNum = times;
				eventMochengBonusBuy({
					count: times,
				}).then((res) => {
					message.success('购买成功');
					store.dispatch('user/UPDATE_USER_INFO');
					init();
				});
			}
		};
		const gotoRecharge = () => {
			if (route.query.isapp === 'true') {
				window.location.href = 'paishou://recharge';
			} else {
				deepLink('paishou://recharge');
			}
		};
		onMounted(() => {
			init();
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
			init,
			buyCount,
			gotoRecharge,
		};
	},
};
</script>
<style lang="scss" scoped>
.page {
	background: #000;
}
.greenBtn {
	background: #18a300;
	border-radius: 8px;
	border: 1px solid #18a300;
}
.brownBtn {
	background: #cc9625;
	border-radius: 8px;
	border: 1px solid #cc9625;
}
.ghostBtn {
	border-radius: 16px;
	&:hover {
		color: #18a300;
		border: 1px solid #18a300;
	}
}
.confirmBtn,
.cancelBtn {
	width: 40%;
	height: 36px;
	line-height: 36px;
	font-size: 12px;
	outline: none;
	border: none;
	border-radius: 4px;
}
.confirmBtn {
	color: #fff;
	background: #a62337;
	margin-right: 10px;
}
.cancelBtn {
	color: #a62337;
	border: 1px solid #a62337;
	background: #fff;
}
</style>
