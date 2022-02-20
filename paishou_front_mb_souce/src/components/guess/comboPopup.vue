<template lang="pug">
//- 爆擊彈窗
van-popup.w-full.bg-transparent(:show='show', round, teleport='.popupTeleport')
	//- 彈窗內容
	.w-full.flex.flex-col.items-center.px-6.py-8
		//- 彈窗標題
		.text-base.text-white.font-bold(v-if='!state.comboFinished') 请选择一张扑克牌

		//- 撲克牌列表
		.w-full.grid.items-center.justify-center.mt-6(:style='cardListTemplate')
			//- 撲克牌
			.w-full.h-full.relative.overflow-hidden(v-for='(item, index) in cardList', :style='item.containerStyle', :class='item.classes', @click='clickCard(index)')
				//- 卡背
				img.relative.w-full.h-full.object-contain(:style='item.backStyle', src='/publicAssets/img/guess/icon-poker@3x.png')

				//- 卡面
				img.absolute.top-0.left-0.w-full.h-full.object-contain(v-if='item.flipped', :style='item.frontStyle', src='/publicAssets/img/guess/icon-poker-blank@3x.png')

				//- 卡片內容
				.absolute.top-0.left-0.w-full.h-full.card-text.p-8.flex.flex-col.justify-center.items-center.overflow-hidden(v-if='item.flipped', :style='item.textStyle') 
					//- 爆擊標題
					.text-sm.text-title.font-bold(:class='comboStatus') {{ comboTitle }}

					//- 爆擊倍數
					.text-item.font-bold.mt-2 {{ comboItem }}

					//- 爆擊敘述
					.text-xs.text-desc.mt-4 {{ comboDesc }}

					//- 彩金資訊
					.w-full.grid.grid-cols-bonus.mt-12.items-center
						//- 爆擊彩金
						.flex.flex-col.items-center
							.text-sm.text-combo-bonus-title.font-bold 爆擊彩金
							.text-lg.text-combo-bonus-value.font-bold.mt-1 {{ comboBonus }}

						//- 分隔線
						.w-full.h-8.bg-bonus-split

						//- 總返還
						.flex.flex-col.items-center
							.text-sm.text-final-bonus-title.font-bold 总返还
							.text-lg.text-final-bonus-value.font-bold.mt-1 {{ finalBonus }}

					//- 備註
					.text-sm.text-remark.mt-8 彩金已发送至您的钱包

					//- 關閉
					van-button.w-full.h-auto.px-4.py-2.mt-2.rounded.bg-transparent.border-close(@click='clickClose')
						.text-sm.text-close 关闭

				//- 讀取中
				.absolute.top-0.left-0.w-full.h-full.flex.justify-center.items-center.bg-loading(v-if='item.loading', :style='item.loadingStyle')
					van-loading(color='#ffffff', type='spinner')
</template>
<script>
import { reactive, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { guessCombo } from '@/api';
import { commaFormat } from '@/utils';
import bezier from '@/utils/bezier.js';

const CARD_COUNT = 8;
const COLUMN_COUNT = 2;

const INIT_DURATION = 1450;
const INIT_EASING = bezier(0, 0.26, 0.72, 1);

const FLIP_DURATION = 750;
const FLIP_EASING = bezier(0, 0.34, 0.46, 1);

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
			initStart: null,
			initFrame: null,
			initProgress: 0,

			flipStart: null,
			flipFrame: null,
			flipProgress: 0,

			selectedIndex: -1,
			flippedIndex: -1,

			comboInfo: {},
			comboLoading: false,
			comboFinished: false,
		});

		// Card list
		const cardList = computed(() => {
			const list = [];
			for (var i = 0; i < CARD_COUNT; i++) {
				const loading = i === state.selectedIndex && state.comboLoading;
				const flipped = state.flippedIndex >= 0 && i === state.flippedIndex;
				const hidden = state.flippedIndex >= 0 && i !== state.flippedIndex;

				const cardColumn = i % COLUMN_COUNT;
				const cardRow = Math.floor(i / COLUMN_COUNT);
				const centerColumn = (COLUMN_COUNT - 1) / 2;
                const initProgressStart = 1 / CARD_COUNT * i;
                const initProgressEnd = 1 / CARD_COUNT * (i + 1);
                const initProgressLength = initProgressEnd - initProgressStart;
                const initProgress = Math.min(Math.max(state.initProgress - initProgressStart, 0), initProgressLength) / initProgressLength;
                const flipProgress = flipped ? state.flipProgress : 0;
                const hiddenProgress = hidden ? state.flipProgress : 0;

                const initOpacity = 0;
                const opacity = initOpacity + initProgress - hiddenProgress;

				const initTranslateX = (centerColumn - cardColumn) * 100;
                const translateX = initTranslateX - initTranslateX * initProgress;

				const initTranslateY = -100 * (cardRow + 1);
                const translateY = initTranslateY - initTranslateY * initProgress;

				const a = cardRow + 1;
				const b = Math.abs(centerColumn - cardColumn);
				const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
				const beta = (Math.asin(b / c) * 180) / Math.PI;
				const symbol = centerColumn >= cardColumn ? 1 : -1;
				const initRotate = beta * symbol;
                const rotate = initRotate - initRotate * initProgress;

				const rotate3xStart1 = 0;
				const rotate3xLength1 = 0.25;
				const rotate3xProgress1 = Math.min(Math.max(flipProgress - rotate3xStart1, 0), rotate3xLength1) / rotate3xLength1;

				const rotate3xStart2 = 0.25;
				const rotate3xLength2 = 0.25;
				const rotate3xProgress2 = Math.min(Math.max(flipProgress - rotate3xStart2, 0), rotate3xLength2) / rotate3xLength2;
				
				const rotate3x = rotate3xProgress1 - rotate3xProgress2;
				const rotate3deg = 180 * flipProgress;
				const sacle = 1 - hiddenProgress;

				list[i] = {
					loading: loading,
					flipped: flipped,
					containerStyle: `opacity: ${opacity}; transform: translateX(${translateX}%) translateY(${translateY}%) rotate(${rotate}deg) rotate3d(${rotate3x}, 1, 0, ${rotate3deg}deg) scale(${sacle});`,
					backStyle: `z-index: ${Math.floor(30 - 20 * flipProgress)};`,
					frontStyle: 'z-index: 20;',
					textStyle: `z-index: ${Math.floor(10 + 20 * flipProgress)}; transform: rotate3d(0, 1, 0, 180deg);`,
					loadingStyle: 'z-index: 40;',
				};
			}
			return list;
		});

		// Card list template
		const cardListTemplate = computed(() => {
			var gap = 24;
			if (state.flippedIndex >= 0) {
				gap *= 1 - state.flipProgress;
			}

			var rowsTemolate = '';
			const rowCount = Math.ceil(CARD_COUNT / COLUMN_COUNT);
			const flippedRow = Math.floor(state.flippedIndex / COLUMN_COUNT);
			for (var i = 0; i < rowCount; i++) {
				if (rowsTemolate.length > 0) {
					rowsTemolate += ' ';
				}
				if (state.flippedIndex < 0) {
					rowsTemolate += '140px';
				} else if (i === flippedRow) {
					rowsTemolate += `${140 + 312 * state.flipProgress}px`;
				} else {
					rowsTemolate += `${100 - 100 * state.flipProgress}px`;
				}
			}

			var columnsTemplate = '';
			const flippedColumn = state.flippedIndex % COLUMN_COUNT;
			for (var i = 0; i < COLUMN_COUNT; i++) {
				if (columnsTemplate.length > 0) {
					columnsTemplate += ' ';
				}
				if (state.flippedIndex < 0) {
					columnsTemplate += '100px';
				} else if (i === flippedColumn) {
					columnsTemplate += `${100 + 224 * state.flipProgress}px`;
				} else {
					columnsTemplate += `${100 - 100 * state.flipProgress}px`;
				}
			}
			return {
				'grid-row-gap': `${gap}px`,
				'grid-column-gap': `${gap}px`,
				'grid-template-rows': rowsTemolate,
				'grid-template-columns': columnsTemplate,
			};
		});

		// Init step
		const initStep = (timestamp) => {
			if (!state.initStart) {
				state.initStart = timestamp;
			}
			state.initProgress = INIT_EASING(Math.min((timestamp - state.initStart) / INIT_DURATION, 1));
			if (state.initProgress < 1) {
				state.initFrame = requestAnimationFrame(initStep);
			}
		};

		// Flip step
		const flipStep = (timestamp) => {
			if (!state.flipStart) {
				state.flipStart = timestamp;
			}
			state.flipProgress = FLIP_EASING(Math.min((timestamp - state.flipStart) / FLIP_DURATION, 1));
			if (state.flipProgress < 1) {
				state.flipFrame = requestAnimationFrame(flipStep);
			}
		};

		// 爆擊標題
		const comboTitle = computed(() => {
			return state?.comboInfo?.title || '-';
		});

		// 爆擊狀態
		const comboStatus = computed(() => {
			const ratio = state?.comboInfo?.ratio || 0;
			if (ratio > 0) {
				return 'success';
			} else if (ratio < 0) {
				return 'failed';
			} else {
				return 'zero';
			}
		});

		// 爆擊倍數
		const comboItem = computed(() => {
			return state?.comboInfo?.item || '-';
		});

		// 爆擊敘述
		const comboDesc = computed(() => {
			return state?.comboInfo?.description || '-';
		});

		// 爆擊彩金
		const comboBonus = computed(() => {
			try {
				return commaFormat(state?.comboInfo?.combo_bonus);
			} catch (e) {
				return state?.comboInfo?.combo_bonus || 0;
			}
		});

		// 總返還
		const finalBonus = computed(() => {
			try {
				return commaFormat(state?.comboInfo?.final_bonus);
			} catch (e) {
				return state?.comboInfo?.final_bonus || 0;
			}
		});

		// 點擊卡片
		const clickCard = (index) => {
			// Skip if combo loading
			if (state.comboLoading) {
				return;
			}

			// Skip if combo finished
			if (state.comboFinished) {
				return;
			}

			// Update selected card
			state.selectedIndex = index;

			// Update loading state
			state.comboLoading = true;

			// Post body
			const body = {
				bet_id: props?.item?.id,
			};

			// Combo reward
			guessCombo(body)
				.then((res) => {
					// Update combo info
					state.comboInfo = res?.data || {};

					// Update guess history
					store.dispatch('user/GET_GUESS_HISTORY');

					// Update user info
					store.dispatch('user/GET_USER_INFO');

					// Filp selected card
					state.flippedIndex = state.selectedIndex;

					// Cancel previous animation frame
					if (state.flipFrame) {
						cancelAnimationFrame(state.flipFrame);
					}
					// Request animation frame
					state.flipStart = null;
					state.flipFrame = requestAnimationFrame(flipStep);

					// Combo finished
					state.comboFinished = true;

					// Revert loading state on finished
					state.comboLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.comboLoading = false;
				});
		};

		// 點擊關閉按鈕
		const clickClose = () => {
			emit('update:show', false);
		};

		// 發牌
		const distribute = () => {
			state.selectedIndex = -1;
			state.flippedIndex = -1;
			state.initProgress = 0;
			state.flipProgress = 0;
			state.comboFinished = false;

			if (state.initFrame) {
				cancelAnimationFrame(state.initFrame);
			}

			state.initStart = null;
			state.initFrame = requestAnimationFrame(initStep);
		};

		// On component mounted
		onMounted(() => {
			distribute();
		});

		// Watch show property changed
		watch(
			() => props.show,
			() => {
				distribute();
			}
		);
		return {
			state,
			cardList,
			cardListTemplate,
			comboTitle,
			comboStatus,
			comboItem,
			comboDesc,
			comboBonus,
			finalBonus,
			clickCard,
			clickClose,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-loading {
	background: rgba($color: #000000, $alpha: 0.6);
}
.text-title {
	&.success {
		color: #00da16;
	}
	&.failed {
		color: #a62337;
	}
	&.zero {
		color: #c8c8c8;
	}
}
.text-item {
	font-size: 3.35rem;
	color: #191919;
}
.text-desc {
	color: #969696;
}
.grid-cols-bonus {
	grid-template-columns: 1fr 1px 1fr;
}
.bg-bonus-split {
	background: #e1e1e1;
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
	color: #f8b62d;
}
.text-remark {
	color: #c8c8c8;
}
.border-close {
	border: 1px solid #a62337;
}
.text-close {
	color: #a62337;
}
</style>
