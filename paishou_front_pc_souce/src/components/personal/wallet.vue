<template lang="pug">
.Container.BETWEEN
	//- personal 左側區塊------------------------------------------------------------------------------------------------------------
	.funcBar.w-40.pr-4.flex-shrink-0
		menuList
		a-divider.my-4
		.funcBarSubMenu
			.funcBarSubItem.rounded-lg.mt-4(v-for='(item, index) in state.menuTabList', class='hover:text-psV3Red', :class='{"text-psV3Red border border-psV3Red ":(state.tabID===index)}')
				.flex.px-2.cursor-pointer.p-2.text-center(@click='tabChange(index)') {{item.title}}
			
	.w-full
		//- 上方 type選單區塊-----------------------------------------------
		.hFuncBar.FLEX_C.bg-white.rounded-lg.shadow.p-4.mb-4
			.typeMenu.FLEX_R
				.typeMenuItem.rounded-lg.text-center.mr-4.p-2(v-for='(item, index) in state.menuTabList',  class='hover:text-psV3Red', :class='{"text-psV3Red border border-psV3Red ":(state.tabID===index)}')
					.px-2.cursor-pointer(@click='tabChange(index)' )
						.font-black.mr-1 {{item.title}}
			a-divider.my-4
			.userWallet.flex
				span.rounded.border.border-psV3Yellow.text-psV3Yellow.p-2.mr-2 
					span 
						img.w-5(src='/publicAssets/img/v3/coin.png')
					span.mr-4 蕉币 
					span {{COIN}}
				span.rounded.border.border-psV3Yellow.text-psV3Yellow.p-2.mr-2 
					span 
						img.w-5(src='/publicAssets/img/v3/banana.png')
					span.mr-4 香蕉 
					span {{BANANA}}

		chargeList(v-if='state.tabID ===0')
		expensesList(v-if='state.tabID ===1')
		rewardList(v-if='state.tabID ===2')
		
</template>
<script>
import { useStore } from 'vuex';
import chargeList from '@/components/personal/wallet/chargeList';
import expensesList from '@/components/personal/wallet/expensesList';
import rewardList from '@/components/personal/wallet/rewardList';
import menuList from '@/components/personal/menuList.vue';
import { computed, onMounted, reactive, toRaw } from 'vue';
import { matomo_my_wallet_reward } from '@/matomoEvent';

export default {
	components: {
		chargeList,
		expensesList,
		rewardList,
		menuList,
	},
	setup() {
		const store = useStore();
		const COIN = computed(() => store?.state?.user?.userInfo?.coin || 0);
		const BANANA = computed(() => store?.state?.user?.userInfo?.banana);
		const state = reactive({
			tabID: 0,
			menuTabList: [
				{ title: '充值纪录', value: 0 },
				{ title: '收支记录', value: 1 },
				{ title: '打赏纪录', value: 2 },
			],
		});
		const tabChange = (val) => {
			state.tabID = val;
			if (val === '3') {
				matomo_my_wallet_reward();
			}
		};
		return {
			store,
			COIN,
			BANANA,
			state,
			tabChange,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.ant-tabs-bar) {
	padding: 0 20px;
	background: #fff;
	border: none;
	border-radius: 8px;
}
.paneBody {
	overflow: hidden;
	min-height: 900px;
	background: #fff;
	border: none;
	border-radius: 8px;
}
</style>
