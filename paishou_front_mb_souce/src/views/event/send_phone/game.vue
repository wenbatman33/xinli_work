<template lang="pug">
//- 活動遊戲
.w-full.flex.flex-col.items-stretch.justify-between
    //- 導覽欄
    nav-bar(rule, close)

    //- 頁面內容
    .flex.flex-col.flex-grow.items-stretch.py-6
        //- 轉盤
        .relative.overflow-hidden
            //- 底圖
            img.absolute.z-10.top-0.left-0.w-full.h-full(ref='roulette', src='/publicAssets/img/event/send_phone/img-turntable@3x.png')

            //- 外框
            img.relative.z-20.w-full(src='/publicAssets/img/event/send_phone/img-turntable-outside-frame@3x.png')

            //- 按鈕
            .absolute.z-30.top-0.left-0.w-full.h-full.flex.items-center.justify-center
                van-button.w-spin.h-spin.p-0.rounded-full.border-transparent.bg-transparent(:loading='state.showLoading', @click='clickSpin')
                    .relative.w-full.h-full
                        img.relative.z-10.w-full.h-full(src='/publicAssets/img/event/send_phone/icon-spin@3x.png')
                        .absolute.z-20.top-0.left-0.w-full.h-full.flex.items-center.justify-center
                            img.w-spin-text.h-spin-text(src='/publicAssets/img/event/send_phone/icon-spin-text@3x.png')
                    template(#loading)
                        .relative.w-full.h-full
                            img.relative.z-10.w-full.h-full(src='/publicAssets/img/event/send_phone/icon-spin@3x.png')
                            .absolute.z-20.top-0.left-0.w-full.h-full.flex.items-center.justify-center
                                van-loading.w-spin-loading.h-spin-loading(color='#ffffff', type='spinner', size='100%')

        //- 活動說明
        .text-sm.text-white.text-center.mt-8 每人限定可获得一次抽奖机会

        //- 醒目說明
        .text-sm.text-white.text-center.font-bold.mt-4 只要下载拍手登入免费获得转盘机会一次!

        //- 廣告圖片
        img.mt-8(src='/publicAssets/img/event/send_phone/littlebanner@3x.png')

    //- 版權聲明
    copyright

    //- 登入彈窗
    login-popup(v-model:show='state.showLogin')

    //- 錯誤彈窗
    error-popup(v-model:show='state.showError', :error-msg='state.errorMsg')

    //- 獎勵彈窗
    bonus-popup(v-model:show='state.showBonus', :gift-icon='state.giftIcon', :gift-name='state.giftName', :gift-explain='state.giftExplain', :quantity='state.quantity')
</template>
<script>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { eventSendPhoneBonus } from '@/api';
import navBar from '@/views/event/send_phone/navBar.vue';
import copyright from '@/views/event/send_phone/copyright.vue';
import loginPopup from '@/views/event/send_phone/loginPopup.vue';
import errorPopup from '@/views/event/send_phone/errorPopup.vue';
import bonusPopup from '@/views/event/send_phone/bonusPopup.vue';
import bezier from '@/utils/bezier.js';

const DURATION = 3000;
const BEZIER_EASING = bezier(0, 0.69, 0.34, 1);
const GIFT_DEG = {
	1: 0, // 蕉幣
	2: 45, // 香蕉
	3: 90, // 摩天大夏
	4: 135, // 關鍵一球
	5: 180, // 666
	6: 225, // LOVE
	7: 270, // 熔岩火山
	8: 315, // OPPO Find X3 Pro
};

export default {
	components: {
		navBar,
		copyright,
		loginPopup,
		errorPopup,
		bonusPopup,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			startDeg: 0,
			curentDeg: 0,
			targetDeg: 0,
			startTime: null,
			requestFrame: null,
			showLogin: false,
			showError: false,
			showBonus: false,
			showLoading: false,
			errorMsg: '',
			giftIcon: '',
			giftName: '',
			quantity: 0,
		});

		// Roulette element
		const roulette = ref(null);

		// Animation step
		const step = (timestamp) => {
			if (!roulette.value) {
				return;
			}
			if (!state.startTime) {
				state.startTime = timestamp;
			}
			const progress = BEZIER_EASING(Math.min((timestamp - state.startTime) / DURATION, 1));
			const nextDeg = state.startDeg + (state.targetDeg - state.startDeg) * progress;
			state.curentDeg = nextDeg % 360;
			roulette.value.style.transform = `rotate(${state.curentDeg}deg)`;
			if (progress < 1) {
				state.requestFrame = requestAnimationFrame(step);
			}
		};

		//- 點擊抽獎
		const clickSpin = () => {
			// Validate login state
			if (!store.getters['user/IS_LOGIN']) {
				state.showLogin = true;
				return;
			}

			// Update loading state
			state.showLoading = true;

			// Get bonus
			eventSendPhoneBonus()
				.then((res) => {
					// Validate response
					if (res?.code !== 0) {
                        state.errorMsg = res?.message || '-';
                        state.showError = true;
                        state.showLoading = false;
						return;
					}

					// Get rotate deg
					const luckyNum = res?.data?.luckyNum || -1;
					const giftDeg = GIFT_DEG[luckyNum];

					// Update gift info
					state.giftIcon = res?.data?.gifticon || '';
					state.giftName = res?.data?.giftname || '';
					state.giftExplain = res?.data?.giftexplain || '';
					state.quantity = res?.data?.quantity || 0;

					// Bug #5021 [登入拍手抽手機]抽到蕉幣時不會顯示蕉幣圖片
					if (state.giftIcon.length === 0) {
						if (state.giftName === '蕉币') {
							state.giftIcon = '/publicAssets/img/coin.png';
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
                    state.errorMsg = reason?.message || '-';
                    state.showError = true;
                    state.showLoading = false;
                });
		};
		return {
			state,
			roulette,
			clickSpin,
		};
	},
};
</script>
<style lang="scss" scoped>
.w-spin {
	width: 26.2%;
}
.h-spin {
	height: 26.2%;
}
.w-spin-text {
	width: 60%;
}
.h-spin-text {
	height: 60%;
}
.top-spin-text {
	top: 20%;
}
.left-spin-text {
	left: 20%;
}
.w-spin-loading {
	width: 30%;
}
.h-spin-loading {
	height: 30%;
}
</style>
