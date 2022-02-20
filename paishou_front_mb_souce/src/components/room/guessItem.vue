<template lang="pug">
//- 競猜物件
.flex.flex-col.items-stretch.p-4.bg-white.rounded.shadow-guess.my-2
	//- 關聯賽事名稱
	.text-game-name.text-sm.text-center.font-bold(v-if='!gameEmpty') {{ gameName }}

	//- 標題
	.text-title.text-sm.text-center.font-bold(:class='{ "mt-2": !gameEmpty }') {{ title }}

	//- 選項
	.grid.grid-cols-2.gap-4.mt-4
		//- 選項1
		van-button.w-full.h-auto.py-2.rounded.bg-white.border-option(@click='clickOption1')
			.text-sm.text-option.text-center.font-bold {{ content1 }}

		//- 選項2
		van-button.w-full.h-auto.py-2.rounded.bg-white.border-option(@click='clickOption2')
			.text-sm.text-option.text-center.font-bold {{ content2 }}

	//- 選項比率
	.grid.grid-cols-percentage.gap-2.mt-2
		//- A圖示
		img.w-6.h-6(src='/publicAssets/img/room/icon-a@3x.png')

		//- 選項1比率
		.text-lg.text-a.font-bold {{ percentageDisplay1 }}%

		//- 比率線條
		.w-full.grid(:style='{ "grid-template-columns": `${percentage1}% ${percentage2}%` }')
			.w-full.flex.flex-row.items-center
				.w-full.h-2.bg-a
			.w-full.flex.flex-row.items-center
				.w-full.h-2.bg-b

		//- 選項2比率
		.text-lg.text-b.font-bold {{ percentageDisplay2 }}%

		//- A圖示
		img.w-6.h-6(src='/publicAssets/img/room/icon-b@3x.png')

	//- 底部
	.grid.grid-cols-footer.gap-2.mt-2
		//- 剩餘時間
		.w-full.flex.flex-row.justify-between.items-center.bg-remaining.rounded.px-4.py-2(v-if='!guessExpired(item, state.now)')
			.text-sm.text-remaining-title 剩余时间
			.text-sm.text-remaining-time.font-bold.ml-2 {{ guessRemaining(item, state.now) }}

		//- 結算中
		.w-full.text-sm.text-settle.text-center.font-bold.bg-settle.rounded.px-4.py-2(v-else) 结算中

		//- 查看競猜明細
		van-button.w-auto.h-auto.px-4.py-2.rounded.bg-detail.border-transparent(@click='clickDetail')
			.flex.flex-row.items-center
				.text-xs.text-detail 查看竞猜明细
				img.w-4.h-4.ml-2(src='/publicAssets/img/room/icon-arrow-jump@3x.png')

//- 競猜彈窗
guess-popup(
	:item='item'
    :show-success-popup='true'
	v-model:show='state.showGuessPopup'
	v-model:selected='state.selectedOption'
	@bet-success='betSuccess'
)
</template>
<script>
import { reactive, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { guessExpired, guessRemaining } from '@/utils';
import { matomo_room_check_guess, matomo_room_check_guessDetail } from '@/matomoTrackEvent.js';
import guessPopup from '@/components/room/guessPopup.vue';
import dayjs from 'dayjs';

export default {
	components: {
		guessPopup,
	},
	props: {
		item: Object,
	},
	emits: ['bet-success'],
	setup(props, { emit }) {
		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			showGuessPopup: false,
			selectedOption: 1,
			now: dayjs(),
			interval: null,
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

		// 賽事是否為空
		const gameEmpty = computed(() => {
			const home = props?.item?.games?.home || '';
			const away = props?.item?.games?.away || '';
			return home.length === 0 && away.length === 0;
		});

		// 標題
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

		// 選項1金額
		const coin1 = computed(() => {
			return props?.item?.item1?.coin || 0;
		});

		// 選項2金額
		const coin2 = computed(() => {
			return props?.item?.item2?.coin || 0;
		});

		// 選項1比率
		const percentage1 = computed(() => {
			const total = coin1.value + coin2.value;
			if (total === 0) {
				return 50;
			} else {
				return Math.floor((100 * coin1.value) / total);
			}
		});

		// 選項2比率
		const percentage2 = computed(() => {
			return 100 - percentage1.value;
		});

		// 選項1顯示比率
		const percentageDisplay1 = computed(() => {
			const total = coin1.value + coin2.value;
			if (total === 0) {
				return 0;
			} else {
				return percentage1.value;
			}
		});

		// 選項2顯示比率
		const percentageDisplay2 = computed(() => {
			const total = coin1.value + coin2.value;
			if (total === 0) {
				return 0;
			} else {
				return percentage2.value;
			}
		});

		// 點擊選項1
		const clickOption1 = () => {
			// Show popup
			state.selectedOption = 1;
			state.showGuessPopup = true;

			// Matomo track
			matomo_room_check_guess(props?.item?.id);
		};

		// 點擊選項2
		const clickOption2 = () => {
			// Show popup
			state.selectedOption = 2;
			state.showGuessPopup = true;

			// Matomo track
			matomo_room_check_guess(props?.item?.id);
		};

		// 點擊查看明細按鈕
		const clickDetail = () => {
			// Navigate
			router.push('/guesshistory');

			// Matomo track
			matomo_room_check_guessDetail(props?.item?.id);
		};

		// 下注成功
		const betSuccess = () => {
			emit('bet-success');
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
			gameEmpty,
			title,
			content1,
			content2,
			percentage1,
			percentage2,
			percentageDisplay1,
			percentageDisplay2,
			clickOption1,
			clickOption2,
			clickDetail,
			betSuccess,
			guessExpired,
			guessRemaining,
		};
	},
};
</script>
<style lang="scss" scoped>
.shadow-guess {
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
}
.text-game-name {
	color: #A62337;
}
.text-title {
	color: #191919;
}
.border-option {
	border: 1px solid #f4f4f4;
}
.text-option {
	color: #191919;
}
.grid-cols-percentage {
	grid-template-columns: auto auto 1fr auto auto;
}
.text-a {
	color: #f2c94c;
}
.text-b {
	color: #2d9cdb;
}
.bg-a {
	background: #f2c94c;
}
.bg-b {
	background: #2d9cdb;
}
.grid-cols-footer {
	grid-template-columns: 1fr auto;
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
.bg-settle {
	background: #FF7A00;
}
.text-settle {
	color: #ffffff;
}
.bg-detail {
	background: #fbfbfb;
}
.text-detail {
	color: #969696;
}
</style>
