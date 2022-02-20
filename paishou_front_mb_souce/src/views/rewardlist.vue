<template lang="pug">
//- 打賞紀錄
.reward-list.pb-8
	//- 導覽欄
	nav-bar(title='打赏纪录', icon='/publicAssets/img/rewardlist/icon-reward@3x.png', right-button='/publicAssets/img/icon-close-red@3x.png', @click-right='clickRight')

	//- 搜尋類型
	find-type(:selected='state.findType', @update:selected='updateFindType')

	//- 下拉刷新
	van-pull-refresh(v-model='state.isLoading', @refresh='refresh')
		//- 目前沒有紀錄
		empty.mt-12(v-if='isEmpty')

		//- 打賞紀錄列表
		.flex.flex-col(v-else, v-for='item in state.rewardList')
			//- 紀錄物件
			.flex.flex-col.p-4
				.flex.flex-row.justify-between.item-center
					//- 打賞內容
					.gift-name.text-base.font-bold {{ `\{${item.giftname}\}` }}

					//- 打賞對象
					.user-name.text-base.font-bold {{ `\{${item.user_nicename}\}` }}

				//- 打賞時間
				.add-time.text-sm.mt-2 {{ `打赏时间：${formatAddTime(item.addtime)}` }}

				//- 消費蕉幣
				.coin.text-sm.mt-1 {{ `消费蕉币：${formatMoney(item.totalcoin)}` }}

				//- 數量
				.quantity.text-sm.mt-1 {{ `数量：${formatMoney(item.giftcount)}` }}

			//- 分隔線
			divider
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { rewardList } from '@/api';
import { commaFormat } from '@/utils';
import empty from '@/components/empty';
import navBar from '@/components/navBar';
import divider from '@/components/divider';
import findType from '@/components/findType';
import dayjs from 'dayjs';

export default {
	components: {
		empty,
		navBar,
		divider,
		findType,
	},
	setup() {
		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			findType: 1,
			isLoading: false,
			rewardList: [],
		});

        // 資料是否為空
		const isEmpty = computed(() => {
			return !state.rewardList || state.rewardList.length === 0;
		});

		// 格式化加入時間
		const formatAddTime = (addTime) => {
			try {
				return dayjs(addTime * 1000).format('YYYY-MM-DD HH:mm:ss');
			} catch(e) {
				return addTime;
			}
		};

		// 格式化金額
		const formatMoney = (money) => {
			try {
				return commaFormat(money);
			} catch(e) {
				return money;
			}
		};

		// 取得打賞紀錄
		const getRewardList = () => {
			// Update searching state
			state.isLoading = true;

			// Get query
			const query = {
				find_type: state.findType,
			};

			// Get reward list
			rewardList(query)
				.then((res) => {
					// Update reward list
					state.rewardList = res.data?.list || [];

					// Revert serching state on finished
					state.isLoading = false;
				})
				.catch(() => {
					// Revert serching state on error
					state.isLoading = false;
				});
		};

		// On component mounted
		onMounted(() => {
			getRewardList();
		});

		// 下拉刷新
		const refresh = () => {
			getRewardList();
		};

		// 點擊導覽欄返回按鈕
		const clickRight = () => {
			router.go(-1);
		};

		// 更新搜尋類別
		const updateFindType = (value) => {
			state.findType = value;
			getRewardList();
		};
		return {
			state,
			isEmpty,
			formatAddTime,
			formatMoney,
			refresh,
			clickRight,
			updateFindType,
		};
	},
};
</script>
<style lang="scss" scoped>
.reward-list {
	width: 100%;
	.gift-name {
		color: #191919;
	}
	.user-name {
		color: #a62337;
	}
	.add-time {
		color: #969696;
	}
	.coin {
		color: #969696;
	}
	.quantity {
		color: #969696;
	}
}
</style>