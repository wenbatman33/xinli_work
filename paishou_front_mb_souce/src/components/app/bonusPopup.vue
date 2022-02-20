<template lang="pug">
//- 每日簽到彈窗
van-popup(:show='state.isShowBonusPopup', :style='{ "background": "transparent" }', class='w-10/12 md:w-1/2', @click-overlay='clickOverlay')
	.relative
		//- 光暈
		img.absolute.w-full.max-h-full.z-10.object-contain(src='/publicAssets/img/tasks/icon-flare@3x.png')

		//- 大香蕉圖示
		img.absolute.w-full.h-20.top-16.z-30.object-contain(src='/publicAssets/img/tasks/icon-banana@3x.png')

		//- 彈窗
		.relative.pt-24.z-20
			.bonus-popup.flex.flex-col.items-stretch.bg-white.rounded-lg.pt-10.pb-6
				//- 標題文字
				.title.text-2xl.text-center.font-bold.mt-2 每日登入奖励
				
				//- 已簽到
				.flex.flex-row.justify-center.mt-2
					.day-tip.text-sm.rounded-full.px-4.py-1
						span 已连续登入
						span.mx-1 {{ bonusDay }}
						span 天

				//- 每日簽到列表
				bonus-list.mt-4.px-3(path='/bonusPopup', @receive-success='receiveSuccess')
</template>

<script>
import { computed, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import bonusList from '@/components/tasks/bonusList.vue';
import submitButton from '@/components/submitButton';
import bonusSuccessPopup from '@/components/tasks/bonusSuccessPopup.vue';
import dayjs from 'dayjs';

export default {
	components: {
		bonusList,
		submitButton,
		bonusSuccessPopup,
	},
	setup() {
		// Vue store
		const store = useStore();

		// Component state
		const state = reactive({
			isGettingBonus: false,
			isShowBonusPopup: false,
			isShowSuccessPopup: false,
			bonusUnit: '',
			bonusCoin: 0,
		});

		// User id
		const uid = computed(() => store?.state?.user?.uid || '');

		// 簽到天數
		const bonusDay = computed(() => store.getters['tasks/bonusDay']);

		// 是否存在可簽到的天數
		const containsAvailableBonus = computed(() => store.getters['tasks/containsAvailableBonus']);

		// Watch user info changed
		watch(
			[uid, containsAvailableBonus],
			() => {
				if (uid.value) {
					if (containsAvailableBonus.value) {
						const key = 'BonusPopup' + uid.value;
						const poupupDate = window.localStorage[key];
						const today = dayjs().format('YYYY-MM-DD');
						if (!poupupDate || dayjs(poupupDate).isBefore(today)) {
							state.isShowBonusPopup = true;
							window.localStorage.setItem(key, today);
						}
					}
				}
			}
		);

		// 點擊關閉按鈕
		const clickOverlay = () => {
			state.isShowBonusPopup = false;
		};

		// 簽到成功
		const receiveSuccess = () => {
			state.isShowBonusPopup = false;
		};
		return {
			state,
			bonusDay,
			clickOverlay,
			receiveSuccess,
		};
	},
};
</script>

<style lang="scss" scoped>
.bonus-popup {
	width: 100%;
	background: #e8e7e7;
	.header {
		width: 100%;
		color: #ffffff;
		background: linear-gradient(90deg, #a62337, #d10828);
	}
	.title {
		color: #A62337;
	}
	.day-tip {
		color: #ffffff;
		background: #A62337;
	}
}
</style>
