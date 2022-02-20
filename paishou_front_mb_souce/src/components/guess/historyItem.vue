<template lang="pug">
//- 競猜物件
.relative.bg-white.rounded.shadow.my-2
	//- 物件按鈕
	van-button.absolute.w-full.h-full.p-0.rounded.bg-transparent.border-transparent(@click='clickItem')

	//- 內容
	.flex.flex-col.p-4
		//- 橫列
		.grid.grid-cols-title-victory.gap-2.items-center
			//- 競猜標題
			.text-base.text-title.font-bold {{ title }}

			//- 勝圖示
			img.w-8.h-8(v-if='isVictory', src='/publicAssets/img/guess/icon-correct@3x.png')

			//- 負圖示
			img.w-8.h-8(v-else-if='isDefeat', src='/publicAssets/img/guess/icon-incorrect@3x.png')

		//- 下注選項
		.text-sm.text-guess-item.text-center.font-bold.border-guess-item.rounded.p-2.mt-2 {{ guessItem }}

		//- 橫列
		.grid.grid-cols-remaining-bet-time.gap-2.mt-2
			//- 剩餘時間
			.flex.flex-row.items-center.bg-remaining.rounded.p-2
				//- 標題
				.text-sm.text-remaining-title 剩余时间

				//- 數值
				.text-sm.text-remaining-value.font-bold.ml-2(:class='{ "expired": guessExpired(item, state.now) }') {{ guessRemaining(item, state.now) }}

			//- 下注時間
			.flex.flex-row.justify-between.items-center.bg-bet-time.rounded.p-2
				//- 標題
				.text-sm.text-bet-time-title 下注时间

				//- 數值
				.text-sm.text-bet-time-value.font-bold.ml-2 {{ betTime }}

		//- 下注彩金
		.flex.flex-row.justify-between.items-center.bg-guess-bet.rounded.p-2.mt-2
			//- 標題
			.text-sm.text-guess-bet-title 下注彩金

			//- 數值
			.flex.flex-row.items-center.ml-2
				//- 下注位置
				.text-sm.text-guess-position {{ guessPosition }}

				//- 蕉幣圖示
				img.w-4.h-4.ml-2(src='/publicAssets/img/coin.png')

				//- 金額
				.text-sm.text-guess-bet-value.ml-2 {{ guessBet }}

		//- 狀態
		van-button.w-auto.h-auto.rounded.bg-status.border-transparent.p-2.mt-4(:class='status.class', @click='clickStatus')
			.text-sm.text-status.text-center.font-bold {{ status.name }}

//- 詳細彈窗
detail-popup(:item='item', v-model:show='state.showDetailPopup')

//- 爆擊彈窗
combo-popup(:item='item', v-model:show='state.showComboPopup')

//- 領取彈窗
receive-popup(:item='item', v-model:show='state.showReceivePopup', @show-receive-success-popup='showReceiveSuccessPopup', @show-combo-popup='showComboPopup')

//- 領取成功彈窗
receive-success-popup(v-model:show='state.showReceiveSuccessPoup')
</template>
<script>
import { reactive, computed, onMounted, onUnmounted } from 'vue';
import { commaFormat, guessExpired, guessRemaining } from '@/utils';
import comboPopup from '@/components/guess/comboPopup.vue';
import detailPopup from '@/components/guess/detailPopup.vue';
import receivePopup from '@/components/guess/receivePopup.vue';
import receiveSuccessPopup from '@/components/guess/receiveSuccessPopup.vue';
import dayjs from 'dayjs';

export default {
	components: {
		comboPopup,
		detailPopup,
		receivePopup,
		receiveSuccessPopup,
	},
	props: {
		item: Object,
	},
	setup(props) {
		// Component state
		const state = reactive({
			showComboPopup: false,
			showDetailPopup: false,
			showReceivePopup: false,
			showReceiveSuccessPoup: false,
			now: dayjs(),
			interval: null,
		});

		// 競猜標題
		const title = computed(() => {
			return props?.item?.title || '';
		});

		// 下注選項
		const guessItem = computed(() => {
			return props?.item?.guess_item || '';
		});

		// 下注時間
		const betTime = computed(() => {
			try {
				return dayjs(props?.item?.bet_time, 'YYYY-MM-DD HH:mm:ss', 'zh-cn').format('YYYY/MM/DD HH:mm');
			} catch (e) {
				return props?.item?.bet_time_t || '-';
			}
		});

		// 下注位置
		const guessPosition = computed(() => {
			if (props?.item?.guess_item === props?.item?.item1) {
				return '选项A';
			} else if (props?.item?.guess_item === props?.item?.item2) {
				return '选项B';
			} else {
				return '-';
			}
		});

		// 下注金額
		const guessBet = computed(() => {
			try {
				return commaFormat(props?.item?.guess_bet);
			} catch (e) {
				return props?.item?.guess_bet || '-';
			}
		});

		// 狀態類別
		const status = computed(() => {
			if (props?.item?.status === 3 && props?.item?.guess_status === 1 && (props?.item?.received === true || props?.item?.combo_status === true)) {
				return {
					class: 'victory',
					name: '胜利',
				};
			}
			if (props?.item?.status === 3 && props?.item?.guess_status === 1 && (props?.item?.received === false && props?.item?.combo_status === false)) {
				return {
					class: 'receive',
					name: '领取奖励',
				};
			}
			if (props?.item?.status === 3 && props?.item?.guess_status === 2) {
				return { 
					class: 'defeat',
					name: '已结束',
				};
			}
			if (props?.item?.status === 0) {
				return { 
					class: 'cancel',
					name: '竞猜取消',
				};
			}
			if (props?.item?.status === 1 && guessExpired(props?.item, state.now)) {
				return {
					class: 'settle',
					name: '系统结算中',
				};
			}
			if (props?.item?.status === 1 && !guessExpired(props?.item, state.now)) {
				return {
					class: 'wait',
					name: '等待中',
				};
			}
			return {
				class: 'wait',
				name: '-',
			};
		});

		// 是否勝利
		const isVictory = computed(() => {
			return props?.item?.status === 3 && props?.item?.guess_status === 1;
		});

		// 是否戰敗
		const isDefeat = computed(() => {
			return props?.item?.status === 3 && props?.item?.guess_status === 2;
		});

		// 點擊紀錄物件
		const clickItem = () => {
			state.showDetailPopup = true;
		};

		// 點擊狀態按鈕
		const clickStatus = () => {
			if (status.value.class === 'receive') {
				state.showReceivePopup = true;
			} else {
				state.showDetailPopup = true;
			}
		};

		// 顯示明細彈窗
		const showDetailPopup = () => {
			state.showDetailPopup = true;
		};

		// 顯示領取成功彈窗
		const showReceiveSuccessPopup = () => {
			state.showReceiveSuccessPoup = true;
		};

		// 顯示爆擊彈窗
		const showComboPopup = () => {
			state.showComboPopup = true;
		};

		// On component mounted
		onMounted(() => {
			state.interval = setInterval(() => {
				state.now = dayjs();
			}, 1000);
		});

		// On component unmounted
		onUnmounted(() => {
			clearInterval(state.interval);
		});
		return {
			state,
			title,
			guessItem,
			betTime,
			guessPosition,
			guessBet,
			status,
			isVictory,
			isDefeat,
			clickItem,
			clickStatus,
			showDetailPopup,
			showReceiveSuccessPopup,
			showComboPopup,
			guessExpired,
			guessRemaining,
		};
	},
};
</script>
<style lang="scss" scoped>
.grid-cols-title-victory {
	grid-template-columns: 1fr auto;
}
.text-title {
	color: #191919;
}
.text-guess-item {
	color: #191919;
}
.border-guess-item {
	border: 1px solid #c8c8c8;
}
.grid-cols-remaining-bet-time {
	grid-template-columns: auto 1fr;
}
.bg-remaining {
	background: #fbfbfb;
}
.text-remaining-title {
	color: #969696;
}
.text-remaining-value {
	color: #ff7a00;
	&.expired {
		color: #969696;
	}
}
.bg-bet-time {
	background: #fbfbfb;
}
.text-bet-time-title {
	color: #969696;
}
.text-bet-time-value {
	color: #191919;
}
.bg-guess-bet {
	background: #fbfbfb;
}
.text-guess-bet-title {
	color: #969696;
}
.text-guess-position {
	color: #f8b62d;
}
.text-guess-bet-value {
	color: #f8b62d;
}
.bg-status {
	&.victory {
		background: #00da16;
	}
	&.receive {
		background: #2f80ed;
	}
	&.defeat {
		background: #a62337;
	}
	&.cancel {
		background: #c8c8c8;
	}
	&.settle {
		background: #ff7a00;
	}
	&.wait {
		background: #f8b62d;
	}
}
.text-status {
	color: #ffffff;
}
</style>
