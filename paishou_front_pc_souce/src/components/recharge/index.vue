<template lang="pug">
.recharge.w-full.rounded-xl.bg-white(v-if='userInfo')
	.BETWEEN.p-8
		.rechargeInfo.w-80.pr-4.border-r.flex-shrink-0
			h3.text-psV3Red.my-2 蕉币充值
			.userCoin.bg-gray-100.rounded-xl.FLEX_C.p-4.my-4(v-if='COIN')
				.text-xs.text-gray-600 您的蕉币
				p
					img.w-6.h-6.mr-2(src='/publicAssets/img/v3/coin.png')
					span.text-xl.text-psV3Orange {{commaFormat(COIN)}}
			.alipay.bg-gray-100.rounded-xl.BETWEEN.py-4.my-4
				.flex.flex-shrink-0.mx-2(style='width:92px;height:32px;')
					img.w-full.h-auto(src='/publicAssets/img/v3/alipay-logo-1.png',srcset='/publicAssets/img/v3/alipay-logo-1@2x.png 2x')
				.flex.flex-grow.text-xs.text-gray-600 拍手平台仅使用支付宝第三方支付提供充值服务，如有不便敬请见谅。
				//- span.text-xs.text-gray-600 拍手平台仅使用支付宝第三方支付提供充值服务，如有不便敬请见谅。
			.adBanner.bg-gray-100.rounded-xl.overflow-hidden.my-4
				.cursor-pointer(v-for='(item,index) in state.adBannerList', @click='gotoDeepLink(item.slide_url)')
					img.w-full(:src='item.slide_pic')
		.rechargeOderList.flex.flex-grow.px-4
			//- 額外贈送
			.w-full.FLEX_C.justify-between(v-if='state.rechargeList')
				.grid.grid-cols-4.gap-4.w-full
					.col-span-1(v-for='(item, index) in state.rechargeList')
						.flex.justify-center.items-center.h-16.rounded-xl.bg-gray-100.cursor-pointer(:class='{ "activeMoney": index == state.activeMoney }', @click='selectMoney(index)')
							h2.text-gray-600 ¥ {{item.money}}
				.paidBlock(v-if='state.activeMoneyItem')
					.paidInfo.flex.justify-around.items-center.h-16.rounded-xl.bg-gray-100.my-4.px-8(:class='{"border-2 border-psV3Red":state.activeMoneyItem}')
						.w-28.flex.flex-shrink-0
							h2 ¥{{state.activeMoneyItem.money}}
						.FLEX_C.flex-grow
							h3.text-psV3Red {{state.activeMoneyItem.goods_name}} x {{state.activeMoneyItem.goods_quantity}}
							.text-xs.text-gray-600 赠送{{state.activeMoneyItem.bonus_name}} x {{state.activeMoneyItem.bonus_quantity}}
						.FLEX_C
							.text-xs.text-gray-600  总计需支付
							h3.text-psV3Red {{state.activeMoneyItem.money}}
					a-button.h-12.rounded-xl(type='primary', block , @click='payment') 前往支付			
</template>

<script>
import { useStore } from 'vuex';
import { reactive, computed, onMounted } from 'vue';
import { rechargeList, alipay, slideList } from '@/api';
import { deepLink, commaFormat } from '@/utils';

import { matomo_recharge_slide_banner, matomo_recharge_payment } from '@/matomoEvent';

export default {
	setup() {
		const store = useStore();
		const state = reactive({
			payMethod: 0,
			payid: 0,
			activeMoney: null,
			activeMoneyItem: null,
			rechargeList: [],
			rechargeType: 0,

			adBannerList: null,
		});
		const userInfo = computed(() => store.state.user.userInfo);
		const UID = computed(() => store.state.user.uid || '');
		const COIN = computed(() => store?.state?.user?.userInfo?.coin);
		const init = () => {
			state.rechargeList = [];
			slideList({ slide_cid: 20 }).then((res) => {
				state.adBannerList = res?.data?.list?.filter((task, index) => index < 1) || [];
			});
			rechargeList({
				uid: Number(UID.value),
				rules_type: state.rechargeType,
			}).then((res) => {
				const giftList = res?.data?.gift_list || [];
				const goodsList = res?.data?.goods_list || [];
				const coinList = res?.data?.coin_list || [];
				state.rechargeList = giftList.concat(goodsList).concat(coinList);
				selectMoney(0);
			});
		};
		const closeMode = () => {
			store.commit('user/CLOSE_RECHARGE_MODEL');
		};
		// 选择充值的金额
		const selectMoney = (index) => {
			state.activeMoney = index;
			state.activeMoneyItem = state.rechargeList[index];
		};
		// 充值蕉币/红包列表
		const getRechargeList = (type) => {
			state.rechargeType = type;
			rechargeList({
				uid: Number(UID.value),
				rules_type: state.rechargeType,
			}).then((res) => {
				state.rechargeList = res.data;
			});
		};
		// 支付
		const payment = () => {
			alipay({
				rules_id: state.activeMoneyItem.id,
				ambient: 1,
			}).then((res) => {
				matomo_recharge_payment();
				let url = res.data.pay_url;
				window.open(url);
				store.commit('user/CLOSE_RECHARGE_MODEL');
			});
		};
		const gotoDeepLink = (link) => {
			matomo_recharge_slide_banner();
			deepLink(link);
		};
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			userInfo,
			UID,
			COIN,
			closeMode,
			selectMoney,
			getRechargeList,
			payment,
			commaFormat,
			gotoDeepLink,
		};
	},
};
</script>
<style lang="scss" scoped>
.activeMoney,
.activeType,
.activePaymantMethod {
	border: 2px solid #a62337 !important;
}
</style>
