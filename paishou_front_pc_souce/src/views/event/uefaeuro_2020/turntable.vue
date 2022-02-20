<template lang="pug">
//- 歐洲杯轉盤
.relative.w-full.min-h-full.bg-turntable.FLEX_C.items-center.overflow-hidden
	//- 2021
	img.absolute.top-32.w-2021(src='/publicAssets/img/event/uefaeuro_2020/icon-home-2021@3x.png')

	//- 頁面內容
	.FLEX_R.items-center.pb-20
		//- 左側按鈕列
		.pr-12
			.w-10

		//- 內容
		.FLEX_C.items-stretch
			//- 導覽欄
			nav-bar

			//- 標題
			.text-2xl.text-white.font-bold.mt-12 转转好运来

			//- 副標題
			.text-base.font-bold.mt-4
				span.text-white 累积30点获得一次转盘机会,华为Mate 40大奖等你拿 
				span.text-highlight 转盘一次扣除30点

			//- 轉盤
			.self-center.w-roulette.relative.overflow-hidden.mt-12
				//- 底圖
				img.reactive.z-10.w-full.object-contain(src='/publicAssets/img/event/uefaeuro_2020/icon-roulette@3x.png')

				//- 外框
				img.absolute.z-20.w-full.h-full.top-0.right-0.bottom-0.left-0.object-contain(ref='rouletteRef', src='/publicAssets/img/event/uefaeuro_2020/icon-roulette-frame@3x.png')

				//- 按鈕
				a-button.absolute.z-30.position-roulette-button.p-0.rounded-full.bg-roulette-button.border-transparent(type='link', :disabled='state.showLoading', @click='clickRoulette')
					img.w-full.h-full.object-contain(v-if='!state.showLoading', src='/publicAssets/img/event/uefaeuro_2020/icon-roulette-button@3x.png')
					a-spin(v-if='state.showLoading', size='large')

			//- 點數
			.self-center.FLEX_R.items-center.bg-point.rounded.px-32.py-4.mt-12
				//- 標題
				.text-sm.text-white.font-bold 您目前拥有点数:

				//- 數量
				.text-sm.text-point.font-bold.ml-1 {{ point }}

				//- 圖示
				img.w-4.h-4.ml-1(src='/publicAssets/img/event/uefaeuro_2020/icon-star@3x.png')

			//- 機會
			.self-center.text-sm.text-white.font-bold.mt-4  (30点，1次机会)

			//- 獎項標題
			.self-center.text-2xl.text-white.font-bold.mt-36 转盘号码对应奖品

			//- 獎項列表
			.grid.grid-cols-3.gap-8.mx-6.mt-14
				//- 獎項
				.FLEX_C.items-center.bg-gift.rounded.p-4.mt-3(v-for='item in giftList')
					//- 圖示
					img.w-16.h-16.object-contain(:src='item.icon')

					//- 編號
					.text-3xl.text-white.font-bold.mt-2 {{ item.id }}

					//- 名稱
					.text-base.text-white.font-bold.mt-4 {{ item.name }}

		//- 右側按鈕列
		.FLEX_C.items-center.pl-12
			//- 說明按鈕
			a-popover
				a-button(type='link')
					img.w-10.h-10(src='/publicAssets/img/event/uefaeuro_2020/icon-info@3x.png')
				template(#content)
					.FLEX_C.items-start.bg-white.rounded.px-4.py-5
						.text-base.text-desc-title.font-bold 转转好运来活动说明
						.text-sm.text-desc.mt-2 累积30点获得一次转盘机会。

			//- 置頂按鈕
			a-button(type='link', @click='clickTop')
				img.w-10.h-10.mt-6(src='/publicAssets/img/event/uefaeuro_2020/icon-top@3x.png')

	//- 登入彈窗
	login-modal(v-model:show='state.showLogin')

	//- 錯誤彈窗
	error-modal(v-model:show='state.showError', :error-msg='state.errorMsg')

	//- 獎勵彈窗
	bonus-modal(v-model:show='state.showBonus', :gift-icon='state.giftIcon', :gift-name='state.giftName', :gift-nums='state.giftNums', :gift-explain='state.giftExplain')
</template>
<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { event010Info, event010Turntable } from '@/api';
import navBar from '@/views/event/uefaeuro_2020/navBar.vue';
import loginModal from '@/views/event/uefaeuro_2020/loginModal.vue';
import errorModal from '@/views/event/uefaeuro_2020/errorModal.vue';
import bonusModal from '@/views/event/uefaeuro_2020/bonusModal.vue';
import bezier from '@/utils/bezier.js';
import { commaFormat } from '@/utils';

const DURATION = 3000;
const BEZIER_EASING = bezier(0, 0.69, 0.34, 1);
const GIFT_DEG = {
	1: 75,
	2: 45,
	3: 15,
	4: 345,
	5: 315,
	6: 285,
	7: 255,
	8: 225,
	9: 195,
	10: 165,
	11: 135,
	12: 105,
};
const GIFT_LIST = [
	{
		id: '01',
		icon: '/publicAssets/img/event/uefaeuro_2020/icon-roulette-gift-1@3x.png',
		name: '华为Mate 40 8GB+256GB',
	},
	{
		id: '02',
		icon: '/publicAssets/img/event/uefaeuro_2020/icon-roulette-gift-2@3x.png',
		name: 'Macbook pro M1 512GB',
	},
	{
		id: '03',
		icon: '/publicAssets/img/event/uefaeuro_2020/icon-roulette-gift-3@3x.png',
		name: 'adidas足球',
	},
	{
		id: '04',
		icon: '/publicAssets/img/event/uefaeuro_2020/icon-roulette-gift-4@3x.png',
		name: 'GuccI男士香水',
	},
	{
		id: '05',
		icon: '/publicAssets/img/event/uefaeuro_2020/icon-roulette-gift-5@3x.png',
		name: '飞利浦剃须刀S5080',
	},
	{
		id: '06',
		icon: '/publicAssets/img/event/uefaeuro_2020/icon-roulette-gift-6@3x.png',
		name: 'zippo打火機',
	},
	{
		id: '07',
		icon: '/publicAssets/img/event/uefaeuro_2020/icon-roulette-gift-7@3x.png',
		name: '蕉币 1688',
	},
	{
		id: '08',
		icon: '/publicAssets/img/event/uefaeuro_2020/icon-roulette-gift-8@3x.png',
		name: '蕉币 888',
	},
	{
		id: '09',
		icon: '/publicAssets/img/event/uefaeuro_2020/icon-roulette-gift-9@3x.png',
		name: '熔岩火山',
	},
	{
		id: '10',
		icon: '/publicAssets/img/event/uefaeuro_2020/icon-roulette-gift-10@3x.png',
		name: '摩天大廈',
	},
	{
		id: '11',
		icon: '/publicAssets/img/event/uefaeuro_2020/icon-roulette-gift-11@3x.png',
		name: '666',
	},
	{
		id: '12',
		icon: '/publicAssets/img/event/uefaeuro_2020/icon-roulette-gift-12@3x.png',
		name: '欧洲杯特效',
	},
];

export default {
	components: {
		navBar,
		loginModal,
		errorModal,
		bonusModal,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Roulette referece
		const rouletteRef = ref(null);

		// Component state
		const state = reactive({
			startDeg: 0,
			targetDeg: 0,
			curentDeg: 0,
			startTime: null,
			requestFrame: null,
			showLogin: false,
			showError: false,
			showBonus: false,
			showLoading: false,
			errorMsg: '',
			giftIcon: '',
			giftName: '',
			giftNums: 0,
			giftExplain: '',
			info: {},
		});

		// 是否為登入狀態
		const isLogin = computed(() => {
			const uid = store?.state?.user?.uid || '';
			const token = store?.state?.user?.token || '';
			return uid !== 0 && uid !== '' && token !== '';
		});

		// 點數
		const point = computed(() => {
			if (!isLogin.value) {
				return 0;
			}
			try {
				return commaFormat(state?.info?.point);
			} catch (e) {
				return state?.info?.point || 0;
			}
		});

		// 獎項列表
		const giftList = computed(() => {
			return GIFT_LIST;
		});

		// 取得資訊
		const getInfo = () => {
			event010Info().then((res) => {
				state.info = res?.data || {};
			});
		};

		// Roulette frame
		const step = (timestamp) => {
			if (!rouletteRef.value) {
				return;
			}
			if (!state.startTime) {
				state.startTime = timestamp;
			}
			const progress = BEZIER_EASING(Math.min((timestamp - state.startTime) / DURATION, 1));
			const nextDeg = state.startDeg + (state.targetDeg - state.startDeg) * progress;
			state.curentDeg = nextDeg % 360;
			rouletteRef.value.style.transform = `rotate(${state.curentDeg}deg)`;
			if (progress < 1) {
				state.requestFrame = requestAnimationFrame(step);
			}
		};

		// 點擊向上按鈕
		const clickTop = () => {
			window.scrollTo(0, 0);
		};

		// 點擊轉盤按鈕
		const clickRoulette = () => {
			// Validate login state
			if (!isLogin.value) {
				state.showLogin = true;
				return;
			}

			// Update loading state
			state.showLoading = true;

			// Request body
			const body = {
				uid: Number(store?.state?.user?.uid || ''),
				token: store?.state?.user?.token || '',
			};

			// Turntable
			event010Turntable(body)
				.then((res) => {
					// Refresh info
					getInfo();

					// Refresh user info
					store.dispatch('user/HOTRELOAD_USER_INFO');

					// Validate response
					if (res?.code !== 0) {
						state.errorMsg = res?.message || '-';
						state.showError = true;
						state.showLoading = false;
						return;
					}

					// Get rotate deg
					const id = res?.data?.Id || res?.data?.id || res?.data?.luckyNum || -1;
					const giftDeg = GIFT_DEG[id];

					// Update gift info
					state.giftIcon = res?.data?.img || '';
					state.giftName = res?.data?.title || '';
					state.giftNums = res?.data?.nums || 0;
					state.giftExplain = res?.data?.description || '';

					// Hardcode coin icon
					if (state.giftIcon.length === 0) {
						if (/^蕉币/.test(state.giftName)) {
							state.giftIcon = '/publicAssets/img/v3/coin.png';
						}
					}

					// Animation if rotate deg definded
					if (giftDeg !== undefined) {
						// Cancel previous animation frame
						if (state.requestFrame) {
							cancelAnimationFrame(state.requestFrame);
						}

						// Request animation frame
						state.startTime = null;
						state.startDeg = state.curentDeg;
						state.targetDeg = giftDeg + 360 * 10;
						state.requestFrame = requestAnimationFrame(step);

						// Show bonus popup after animate finished
						setTimeout(() => {
							state.showBonus = true;
							state.showLoading = false;
						}, DURATION);
					} else {
						// Show bonus popup
						state.showBonus = true;
						state.showLoading = false;
					}
				})
				.catch((reason) => {
					getInfo();
					store.dispatch('user/HOTRELOAD_USER_INFO');
					state.errorMsg = reason?.message || '-';
					state.showError = true;
					state.showLoading = false;
				});
		};

		// On component mounted
		onMounted(() => {
			getInfo();
		});
		return {
			rouletteRef,
			state,
			point,
			giftList,
			clickTop,
			clickRoulette,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-turntable {
	background: url('/publicAssets/img/event/uefaeuro_2020/icon-bg@3x.jpg');
	background-size: cover;
}
.w-2021 {
	width: 72%;
}
.text-highlight {
	color: #ffff10;
}
.w-roulette {
	width: 630px;
}
.bg-roulette-button {
	background: url('/publicAssets/img/event/uefaeuro_2020/icon-roulette-button-empty@3x.png');
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
}
.position-roulette-button {
	width: 30%;
	height: 30%;
	top: 35%;
	right: 35%;
	bottom: 35%;
	left: 35%;
}
.bg-point {
	background: #a62337;
}
.text-point {
	color: #ffff10;
}
.bg-gift {
	background: rgba($color: #ffffff, $alpha: 0.3);
	backdrop-filter: blur(6px);
}
.text-desc-title {
	color: #a62337;
}
.text-desc {
	color: #969696;
}
</style>
