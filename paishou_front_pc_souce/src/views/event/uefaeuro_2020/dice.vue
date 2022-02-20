<template lang="pug">
//- 歐洲杯骰盅
.relative.w-full.min-h-full.bg-dice.FLEX_C.items-center.overflow-hidden
	//- 2021
	img.absolute.top-32.w-2021(src='/publicAssets/img/event/uefaeuro_2020/icon-home-2021@3x.png')

	//- 頁面內容
	.FLEX_C.items-stretch.pb-20
		//- 導覽欄
		nav-bar

		//- 標題列
		.grid.grid-cols-title.gap-2.items-center.mt-12
			//- 標題文字
			.FLEX_C
				//- 標題
				.text-2xl.text-white.font-bold 博拼好运跟着来

				//- 副標題
				.text-base.font-bold.mt-4
					span.text-white 花费
					span.text-highlight 3000蕉币
					span.text-white 立即赠送掷骰
					span.text-highlight 1次机会

			//- 點數資訊
			.FLEX_R.items-center.bg-point.rounded.px-4.py-3
				//- 標題
				.text-sm.text-white.font-bold 您目前拥有点数:

				//- 讀取
				.text-sm.text-point.font-bold.ml-1(v-if='state.showLoading') 加载中

				//- 數量
				.text-sm.text-point.font-bold.ml-1(v-else) {{ point }}

				//- 圖示
				img.w-4.h-4.ml-1(src='/publicAssets/img/event/uefaeuro_2020/icon-star@3x.png')

		//- 骰盅圖示
		.self-center.relative.w-dice-bowl.mt-12
			//- 後景
			img.absolute.z-10.top-0.left-0.w-full.h-full.object-contain.transition-bowl(:class='{ "opacity-0": state.showAmimation }', src='/publicAssets/img/event/uefaeuro_2020/icon-dice-bowl-back@3x.png')

			//- 中景
			img.relative.z-20.w-full.h-full.object-contain.transform-bowl(:class='{ "shake": state.showAmimation }', src='/publicAssets/img/event/uefaeuro_2020/icon-dice-bowl@3x.png')

			//- 前景
			img.absolute.z-30.top-0.left-0.w-full.h-full.object-contain.transition-bowl(:class='{ "opacity-0": state.showAmimation }', src='/publicAssets/img/event/uefaeuro_2020/icon-dice-bowl-front@3x.png')

		//- 博一下
		a-button.self-center.w-play.h-auto.p-4.mx-6.mt-12.bg-play.border-transparent.rounded(:disabled='state.showLoading', type='link', @click='clickPlay')
			a-spin(v-if='state.showLoading')
			.FLEX_R.items-end.justify-center(v-else)
				.text-lg.text-white.font-bold  博一下
				.text-base.text-white.font-bold.ml-1  (3000蕉币1次机会)

		//- 蕉幣
		.self-center.w-coin.FLEX_R.justify-center.items-center.bg-white.rounded.p-4.mx-6.mt-6
			//- 圖示
			img.w-5.h-5(src='/publicAssets/img/v3/coin.png')

			//- 標題
			.text-sm.text-coin-title.font-bold.ml-2 蕉币

			//- 數量
			.text-sm.text-coin.font-bold.ml-2 {{ coin }} 

			//- 充值
			a-button.w-auto.h-auto.px-2.py-1.ml-2.rounded.bg-recharge.border-transparent(type='link', @click='clickRecharge')
				.text-xs.text-white 充值

	//- 登入彈窗
	login-modal(v-model:show='state.showLogin')

	//- 錯誤彈窗
	error-modal(v-model:show='state.showError', :error-msg='state.errorMsg')

	//- 骰子彈窗
	dice-modal(v-model:show='state.showDice', :dice-point='state.dicePoint')
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { event010Info, event010Dice } from '@/api';
import { commaFormat } from '@/utils';
import navBar from '@/views/event/uefaeuro_2020/navBar.vue';
import loginModal from '@/views/event/uefaeuro_2020/loginModal.vue';
import errorModal from '@/views/event/uefaeuro_2020/errorModal.vue';
import diceModal from '@/views/event/uefaeuro_2020/diceModal.vue';

export default {
	components: {
		navBar,
		loginModal,
		errorModal,
		diceModal,
	},
	setup() {
		// Vue router
		const router = useRouter();

		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			info: {},
			showLoading: false,
			showAmimation: false,
			showLogin: false,
			showError: false,
			showDice: false,
			errorMsg: '',
			dicePoint: 0,
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

		// 蕉幣
		const coin = computed(() => {
			try {
				return commaFormat(store?.state?.user?.userInfo?.coin);
			} catch (e) {
				return store?.state?.user?.userInfo?.coin || 0;
			}
		});

		// 取得資訊
		const getInfo = () => {
			event010Info().then((res) => {
				state.info = res?.data || {};
			});
			store.dispatch('user/HOTRELOAD_USER_INFO');
		};

		// 點擊充值
		const clickRecharge = () => {
			router.push('/recharge');
		};

		// 點擊博一下
		const clickPlay = () => {
			// Validate login state
			if (!isLogin.value) {
				state.showLogin = true;
				return;
			}

			// Update loading state
			state.showLoading = true;

			// Post body
			const body = {
				uid: Number(store?.state?.user?.uid),
				token: store?.state?.user?.token,
			};

			// Dice
			event010Dice(body)
				.then((res) => {
					// Refresh info
					getInfo();

					// Validate response
					if (res?.code !== 0) {
						state.errorMsg = res?.message || '-';
						state.showError = true;
						state.showLoading = false;
						return;
					}

					// Update point
					state.info = {
						...(state?.info || {}),
						point: res?.data?.point || 0,
					};

					// Update coin
					store?.commit('user/EDIT_INFO', { coin: res?.data?.coin || 0 });

					// Update dice point
					state.dicePoint = res?.data?.get || 0;

					// Play dice bowl animation
					state.showAmimation = true;

					// Stop after animation duration exceed
					setTimeout(() => {
						state.showAmimation = false;
						state.showDice = true;
						state.showLoading = false;
					}, 1700);
				})
				.catch((reason) => {
					getInfo();
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
			state,
			point,
			coin,
			clickRecharge,
			clickPlay,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-dice {
	background: url('/publicAssets/img/event/uefaeuro_2020/icon-bg@3x.jpg');
	background-size: cover;
}
.w-2021 {
	width: 72%;
}
.grid-cols-title {
	grid-template-columns: 1fr auto;
}
.text-highlight {
	color: #ffff10;
}
.bg-point {
	background: #a62337;
}
.text-point {
	color: #ffff10;
}
.w-dice-bowl {
	width: 473px;
}
.transition-bowl {
	transition-property: opacity;
	transition-timing-function: linear;
	transition-duration: 350ms;
}
.transform-bowl {
	&.shake {
		animation: shake-bowl 1250ms cubic-bezier(0.35, -0.44, 0.75, 1.42) 350ms 1;
	}
}
@keyframes shake-bowl {
	0% {
		transform: rotate(0deg) translateX(0%) translateY(0%);
	}
	25% {
		transform: rotate(45deg) translateX(-15%) translateY(-45%);
	}
	40% {
		transform: rotate(10deg) translateX(5%) translateY(-10%);
	}
	70% {
		transform: rotate(45deg) translateX(-15%) translateY(-45%);
	}
	100% {
		transform: rotate(0deg) translateX(0%) translateY(0%);
	}
}
.w-play {
	width: 420px;
}
.bg-play {
	background: #f8b62d;
}
.w-coin {
	width: 420px;
}
.text-coin-title {
	color: #969696;
}
.text-coin {
	color: #f8b62d;
}
.bg-recharge {
	background: #f8b62d;
}
</style>
