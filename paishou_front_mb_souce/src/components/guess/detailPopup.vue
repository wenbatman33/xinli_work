<template lang="pug">
//- 明細彈窗
van-popup.w-full.bg-transparent(:show='show', round, teleport='.popupTeleport', @click-overlay='clickOverlay')
	.flex.flex-col.items-stretch.px-4
		//- 撕票圖
		.h-4.bg-ticket-top

		//- 內容
		.relative
			.relative.z-10.flex.flex-col.items-stretch.bg-white.px-4.py-6
				//- 橫列
				.grid.grid-cols-game-info.gap-2
					//- 賽事資訊
					.flex.flex-col.items-stretch
						//- 關聯賽事標題
						.text-xs.text-game-title 关联赛事

						//- 關聯賽事名稱
						.text-sm.text-game-name.font-bold.mt-1 {{ gameName }}

						//- 關聯賽事時間
						.text-xs.text-game-date.mt-1 {{ gameDate }}

					//- 勝圖示
					img.w-8.h-8(v-if='isVictory', src='/publicAssets/img/guess/icon-correct@3x.png')

					//- 負圖示
					img.w-8.h-8(v-else-if='isDefeat', src='/publicAssets/img/guess/icon-incorrect@3x.png')

				//- 競猜資訊
				.grid.grid-cols-info.gap-2.mt-2
					//- 下注時間
					.w-full.flex.flex-row.justify-between.items-center.rounded.bg-bet-time.p-2
						.text-xs.text-bet-time-title 下注时间
						.text-xs.text-bet-time-value.ml-2 {{ betTime }}

					//- 剩餘時間
					.w-full.flex.flex-row.justify-between.items-center.rounded.bg-remaining.p-2
						.text-xs.text-remaining-title 剩余时间
						.text-xs.text-remaining-time.font-bold.ml-2(:class='{ "expired": guessExpired(item, state.now) }') {{ guessRemaining(item, state.now) }}

				//- 競猜標題
				.text-base.text-title.font-bold.mt-4 {{ title }}

				//- 下注選項
				.w-full.text-base.text-guess-item.text-center.font-bold.p-2.rounded.bg-transparent.border-guess-item.mt-4 {{ guessItem }}

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

				//- 競猜發起人
				.flex.flex-row.justify-between.items-center.bg-nick-name.rounded.p-2.mt-2
					//- 標題
					.text-sm.text-nick-name-title 竞猜发起人

					//- 數值
					.text-sm.text-nick-name-value {{ nickName }}
				
				//- 橫列
				.grid.grid-cols-bonus.items-center.mt-4
					//- 參加爆擊
					.flex.flex-col.items-center
						.text-sm.text-combo-status-title.font-bold 参加爆击
						.text-base.text-combo-status-value.font-bold {{ comboStatus }}

					//- 分隔線
					.w-full.h-8.bg-bonus-split

					//- 爆擊結果
					.flex.flex-col.items-center
						.text-sm.text-ratio-title.font-bold 爆击结果
						.text-base.text-ratio-value.font-bold {{ ratio }}

					//- 分隔線
					.w-full.h-8.bg-bonus-split

					//- 爆擊彩金
					.flex.flex-col.items-center
						.text-sm.text-combo-bonus-title.font-bold 爆击彩金
						.text-base.text-combo-bonus-value.font-bold {{ comboBonus }}

					//- 分隔線
					.w-full.h-8.bg-bonus-split

					//- 總返還
					.flex.flex-col.items-center
						.text-sm.text-final-bonus-title.font-bold 总返还
						.text-base.text-final-bonus-value.font-bold {{ finalBonus }}

			//- 資料更新中
			.absolute.z-20.top-0.left-0.w-full.h-full.bg-refreshing.flex.flex-col.items-center.justify-center(v-if='isRefreshing')
				van-loading.w-6.h-6(color='#191919', type='spinner')
				.text-sm.text-refreshing.mt-4 信息更新中

		//- 撕票圖
		.h-4.bg-ticket-bottom
</template>
<script>
import { reactive, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { commaFormat, guessExpired, guessRemaining } from '@/utils';
import dayjs from 'dayjs';

export default {
	props: {
		item: Object,
		show: Boolean,
	},
	emits: ['update:show'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			now: dayjs(),
			interval: null,
		});

		// 競猜紀錄是否更新中
		const isRefreshing = computed(() => {
			return store?.state?.user?.isGettingGuessHistory === true;
		});

		// 關聯賽事名稱
		const gameName = computed(() => {
			const home = props?.games?.home || '';
			const away = props?.games?.away || '';
			if (home.length === 0 && away.length === 0) {
				return '无关联赛事';
			} else if (home.length > 0 && away.length > 0) {
				return `${home} vs ${away}`
			} else if (home.length > 0) {
				return `${home} vs -`;
			} else {
				return `- vs ${away}`;
			}
		});

		// 賽事時間
		const gameDate = computed(() => {
			const cn = props?.games?.cn || '';
			if (cn.length === 0) {
				return '-';
			} else {
				try {
					return dayjs(props?.games?.begin).format('YYYY/MM/DD HH:mm');
				} catch (e) {
					return '-';
				}
			}
		});

		// 是否勝利
		const isVictory = computed(() => {
			return props?.item?.status === 3 && props?.item?.guess_status === 1;
		});

		// 是否戰敗
		const isDefeat = computed(() => {
			return props?.item?.status === 3 && props?.item?.guess_status === 2;
		});

		// 下注時間
		const betTime = computed(() => {
			try {
				return dayjs(props?.item?.bet_time, 'YYYY-MM-DD HH:mm:ss', 'zh-cn').format('YYYY/MM/DD HH:mm');
			} catch (e) {
				return props?.item?.bet_time_t || '-';
			}
		});

		// 競猜標題
		const title = computed(() => {
			return props?.item?.title || '';
		});

		// 下注選項
		const guessItem = computed(() => {
			return props?.item?.guess_item || '';
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

		// 競猜發起人
		const nickName = computed(() => {
			return props?.item?.nickname || '-';
		});

		// 參加爆擊
		const comboStatus = computed(() => {
			if (props?.item?.combo_status) {
				return '参加';
			} else if (props?.item?.received) {
				return '不参加';
			} else {
				return '-';
			}
		});

		// 爆擊結果
		const ratio = computed(() => {
			if (props?.item?.combo_status) {
				return `x ${props?.item?.ratio || 0}`;
			} else {
				return '-';
			}
		});

		// 爆擊彩金
		const comboBonus = computed(() => {
			if (props?.item?.combo_status) {
				try {
					return commaFormat(props?.item?.combo_bonus);
				} catch (e) {
					return props?.item?.combo_bonus || 0;
				}
			} else {
				return '-';
			}
		});

		// 總返還
		const finalBonus = computed(() => {
			if (props?.item?.received || props?.item?.combo_status) {
				try {
					return commaFormat(props?.item?.final_bonus);
				} catch (e) {
					return props?.item?.final_bonus || 0;
				}
			} else {
				return '-';
			}
		});

		// 點擊遮罩層
		const clickOverlay = () => {
			emit('update:show', false);
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
			isRefreshing,
			gameName,
			gameDate,
			isVictory,
			isDefeat,
			betTime,
			title,
			guessItem,
			guessPosition,
			guessBet,
			nickName,
			comboStatus,
			ratio,
			comboBonus,
			finalBonus,
			clickOverlay,
			guessExpired,
			guessRemaining,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-ticket-top {
	background-size: contain;
	background-repeat: repeat-x;
	background-position-y: bottom;
	background-image: url('/publicAssets/img/room/icon-ticket-top@3x.png');
}
.bg-ticket-bottom {
	background-size: contain;
	background-repeat: repeat-x;
	background-position-y: top;
	background-image: url('/publicAssets/img/room/icon-ticket-bottom@3x.png');
}
.grid-cols-game-info {
	grid-template-columns: 1fr auto;
}
.text-game-title {
	color: #afafaf;
}
.text-game-name {
	color: #191919;
}
.text-game-date {
	color: #c8c8c8;
}
.grid-cols-info {
	grid-template-columns: 1fr auto;
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
.bg-remaining {
	background: #fbfbfb;
}
.text-remaining-title {
	color: #969696;
}
.text-remaining-time {
	color: #ff7a00;
	&.expired {
		color: #969696;
	}
}
.text-title {
	color: #191919;
}
.text-guess-item {
	color: #191919;
}
.border-guess-item {
	border: 1px solid #f4f4f4;
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
.bg-nick-name {
	background: #fbfbfb;
}
.text-nick-name-title {
	color: #969696;
}
.text-nick-name-value {
	color: #191919;
}
.grid-cols-bonus {
	grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr;
}
.bg-bonus-split {
    background: #E1E1E1;
}
.text-combo-status-title {
	color: #c8c8c8;
}
.text-combo-status-value {
	color: #191919;
}
.text-ratio-title {
	color: #c8c8c8;
}
.text-ratio-value {
	color: #191919;
}
.text-combo-bonus-title {
	color: #c8c8c8;
}
.text-combo-bonus-value {
	color: #191919;
}
.text-final-bonus-title {
	color: #c8c8c8;
}
.text-final-bonus-value {
	color: #F8B62D;
}
.bg-refreshing {
	background: rgba($color: #ffffff, $alpha: 0.9);
}
.text-refreshing {
	color: #191919;
}
</style>
