<template lang="pug">
//- 競猜彈窗
van-popup.w-full.bg-transparent(:show='show', teleport='.popupTeleport', @click-overlay='clickOverlay')
    .flex.flex-col.items-stretch.px-4
        //- 撕票圖
        .h-4.bg-ticket-top

        //- 內容
        .flex-col.items-stretch.bg-white.px-4.py-6
            //- 關聯賽事標題
            .text-xs.text-game-title 关联赛事

            //- 關聯賽事名稱
            .text-sm.text-game-name.font-bold.mt-1 {{ gameName }}

            //- 關聯賽事時間
            .text-xs.text-game-date.mt-1 {{ gameDate }}

            //- 競猜資訊
            .grid.grid-cols-info.gap-2
                //- 剩餘時間
                .w-full.flex.flex-row.justify-between.items-center.rounded.bg-remaining.p-2
                    .text-xs.text-remaining-title 剩余时间
                    .text-xs.text-remaining-time.font-bold.ml-2(:class='{ "expired": guessExpired(item, state.now) }') {{ guessRemaining(item, state.now) }}

                //- 總彩金
                .w-full.flex.flex-row.justify-between.items-center.rounded.bg-total-coin.p-2
                    .text-xs.text-total-coin-title 总彩金
                    .flex.flex-row.items-center.ml-2
                        img.w-4.h-4(src='/publicAssets/img/coin.png')
                        .text-xs.text-total-coin-value.ml-2 {{ totalCoin }}

            //- 標題
            .text-base.text-title.font-bold.mt-2 {{ title }}

            //- 選項
            .grid.grid-cols-2.gap-2.mt-4
                //- 選項1
                van-button.w-full.h-auto.p-4.rounded.shadow.bg-transparent.border-option.text-option(:class='{ "selected": selected === 1 }', @click='clickOption1')
                    .text-base {{ content1 }}

                //- 選項2
                van-button.w-full.h-auto.p-4.rounded.shadow.bg-transparent.border-option.text-option(:class='{ "selected": selected === 2 }', @click='clickOption2')
                    .text-base {{ content2 }}

            //- 金額標題
            .text-xs.text-amount-title.mt-4(:class='{ "disabled": confirmDisabled }') 竞猜蕉币金额

            //- 金額資訊
            .grid.grid-cols-amount.gap-2.mt-1
                //- 金額輸入框
                input-field(v-model='state.amount', type='number', placeholder='请输入下注金额', :formatter='amountFormatter')

                //- 確認下注
                van-button.w-auto.h-auto.px-4.py-1.rounded.bg-submit.border-transparent(:class='{ "disabled": confirmDisabled }', :loading='state.submitLoading', @click='clickSubmit')
                    .text-base.text-white.font-bold 确认下注

            //- 備註
            .text-xs.text-remark.text-center.mt-5 竞猜下注的最低值不得低于100蕉币,最高值不得高于10,000蕉币

        //- 撕票圖
        .h-4.bg-ticket-bottom

//- 競猜下注成功彈窗
guess-success-popup(v-model:show='state.showSuccessPopup', :item='item')
</template>
<script>
import { reactive, computed, onMounted, onUnmounted } from '@vue/runtime-core';
import { guessBet } from '@/api';
import { guessExpired, guessRemaining } from '@/utils';
import { matomo_room_bet_guess } from '@/matomoTrackEvent.js';
import inputField from '@/components/inputField';
import guessSuccessPopup from '@/components/room/guessSuccessPopup.vue';
import dayjs from 'dayjs';

export default {
	components: {
		inputField,
		guessSuccessPopup,
	},
	props: {
		item: Object,
		show: Boolean,
		showSuccessPopup: Boolean,
		selected: Number,
	},
	emits: ['update:show', 'update:selected', 'bet-success'],
	setup(props, { emit }) {
		// Component state
		const state = reactive({
			submitLoading: false,
			showSuccessPopup: false,
			now: dayjs(),
			interval: null,
			amount: '',
		});

		// 賽事名稱
		const gameName = computed(() => {
			const home = props?.item?.games?.home || '';
			const away = props?.item?.games?.away || '';
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
			const home = props?.item?.games?.home || '';
			const away = props?.item?.games?.away || '';
			if (home.length === 0 && away.length === 0) {
				return '-';
			} else {
				try {
					return dayjs(props?.games?.begin).format('YYYY/MM/DD HH:mm');
				} catch (e) {
					return '-';
				}
			}
		});

		// 總彩金
		const totalCoin = computed(() => {
			return props?.item?.total?.coin || 0;
		});

		// 競猜標題
		const title = computed(() => {
			return props?.item?.title || '';
		});

		// 選項1內容
		const content1 = computed(() => {
			return props?.item?.item1?.content || '';
		});

		// 選項2內容
		const content2 = computed(() => {
			return props?.item?.item2?.content || '';
		});

		// 是否禁用確認按鈕
		const confirmDisabled = computed(() => {
			if (props?.selected !== 1 && props?.selected !== 2) {
				return true;
			}
			if (state.amount === undefined) {
				return true;
			}
			if (state.amount.length === 0) {
				return true;
			}
			return false;
		});

		// 格式化金額
		const amountFormatter = (amount) => {
			return amount.replace(/\D/, '');
		};

		// 點擊遮罩層
		const clickOverlay = () => {
			emit('update:show', false);
		};

		// 點擊選項1
		const clickOption1 = () => {
			emit('update:selected', 1);
		};

		// 點擊選項2
		const clickOption2 = () => {
			emit('update:selected', 2);
		};

		// 點擊確認下注
		const clickSubmit = () => {
			// Update loading state
			state.submitLoading = true;

			// Post body
			const body = {
				guess_id: props?.item?.id,
				item: props?.selected,
				coin: Number(state.amount),
			};

			// Bet
			guessBet(body)
				.then((res) => {
					// Validate response code
					if (res.code === 0) {
						// Reset selected option
						emit('update:selected', 0);

						// Reset input amount
						state.amount = '';

						// Show success popup
						if (props?.showSuccessPopup) {
							state.showSuccessPopup = true;
						}

						// Hide guess popup
						emit('update:show', false);

						// Notify bet success
						emit('bet-success');
					}

					// Revert loading state on finished
					state.submitLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.submitLoading = false;
				});

			// Matomo track
			matomo_room_bet_guess(props?.item?.id);
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
			gameName,
			gameDate,
			totalCoin,
			title,
			content1,
			content2,
			confirmDisabled,
			amountFormatter,
			clickOverlay,
			clickOption1,
			clickOption2,
			clickSubmit,
			guessExpired,
			guessRemaining,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.van-cell) {
	padding: 0;
}
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
	grid-template-columns: auto 1fr;
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
.bg-total-coin {
	background: #fbfbfb;
}
.text-total-coin-title {
	color: #969696;
}
.text-total-coin-value {
	color: #f8b62d;
}
.text-title {
	color: #191919;
}
.border-option {
	border: transparent;
	&.selected {
		border: 1px solid #a62337;
	}
}
.text-option {
	color: #969696;
	&.selected {
		color: #a62337;
	}
}
.text-amount-title {
	color: #191919;
	&.disabled {
		color: #969696;
	}
}
.grid-cols-amount {
	grid-template-columns: 1fr auto;
}
.bg-submit {
	background: linear-gradient(90deg, #a62337 0%, #d10828 100%);
	&.disabled {
		background: #c8c8c8;
	}
}
.text-remark {
	color: #ff7a00;
}
</style>
