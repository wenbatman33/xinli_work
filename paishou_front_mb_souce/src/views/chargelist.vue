<template lang="pug">
//- 充值紀錄
.charge-list.pb-8
	//- 導覽欄
	nav-bar(title='充值纪录', icon='/publicAssets/img/chargelist/icon-recharge@3x.png', right-button='/publicAssets/img/icon-close-red@3x.png', @click-right='clickRight')

	//- 搜尋類型
	find-type(:selected='state.findType', @update:selected='updateFindType')

	//- 下拉刷新
	van-pull-refresh(v-model='state.isLoading', @refresh='refresh')
		//- 目前沒有紀錄
		empty.mt-12(v-if='isEmpty')

		//- 充值紀錄列表
		.flex.flex-col(v-else, v-for='item in state.chargeList')
			.flex.flex-col.p-4.mt-2
				//- 第一列
				.flex.flex-row.justify-between.item-center
					//- 訂單編號
					.order-no.text-base.font-bold.break-all.mr-1 {{ `订单号码：${item.orderno}` }}

					//- 狀態
					.success.flex-shrink-0.text-base.font-bold.ml-1(v-if='item.status === 1') 成功
					.fail.flex-shrink-0.text-base.font-bold.ml-1(v-else) 失败

				//- 充值時間
				.add-time.text-sm.mt-2 {{ `充值时间：${formatAddTime(item.addtime)}` }}

				//- 充值金額
				.money.text-sm.mt-1 {{ `充值金额：${formatQuantity(item.money)}` }}

				//- 獲得蕉幣
				.coin.text-sm.mt-1 {{ `获得${formatGoodsName(item.goods)}：${formatQuantity(item.goods_quantity)}` }}

			//- 分隔線
			divider
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { chargeList } from '@/api';
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
			chargeList: [],
		});

		// 資料是否為空
		const isEmpty = computed(() => {
			return !state.chargeList || state.chargeList.length === 0;
		});

		// 取得充值紀錄
		const getChargeList = () => {
			// Update loading state
			state.isLoading = true;

			// Get query
			const query = {
				find_type: state.findType,
			};

			// Get charge list
			chargeList(query)
				.then((res) => {
					// Update charge list
					state.chargeList = res.data?.list || [];

					// Revert loading state on finished
					state.isLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.isLoading = false;
				});
		};

		// On component mounted
		onMounted(() => {
			getChargeList();
		});

		// 下拉刷新
		const refresh = () => {
			getChargeList();
		};

		// 點擊導覽欄返回按鈕
		const clickRight = () => {
			router.go(-1);
		};

		// 更新搜尋類別
		const updateFindType = (value) => {
			state.findType = value;
			getChargeList();
		};

		// 格式化加入時間
		const formatAddTime = (addTime) => {
			try {
				return dayjs(addTime * 1000).format('YYYY-MM-DD HH:mm:ss');
			} catch (e) {
				return addTime || '-';
			}
		};

		// 格式化數量
		const formatQuantity = (quantity) => {
			try {
				return commaFormat(quantity || 0);
			} catch (e) {
				return quantity || 0;
			}
		};

		// 格式化商品名稱
		const formatGoodsName = (goods) => {
			return goods || '蕉币';
		};
		return {
			state,
			isEmpty,
			refresh,
			clickRight,
			updateFindType,
			formatAddTime,
			formatQuantity,
			formatGoodsName,
		};
	},
};
</script>
<style lang="scss" scoped>
.charge-list {
	width: 100%;
	.order-no {
		color: #191919;
	}
	.success {
		color: #00da16;
	}
	.fail {
		color: #df2f4a;
	}
	.add-time {
		color: #969696;
	}
	.coin {
		color: #969696;
	}
	.money {
		color: #969696;
	}
}
</style>