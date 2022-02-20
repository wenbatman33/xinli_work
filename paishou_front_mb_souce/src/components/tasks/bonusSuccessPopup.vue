<template lang="pug">
//- 簽到/新手/每日/充值任務領取成功彈窗
van-popup(class='w-8/12 md:w-1/2', teleport='.popupTeleport', round, :show='show')
	.bonus-success-popup.flex.flex-col.items-center.px-4.py-8
		//- 打勾圖示
		.lottie.w-8.h-8(ref='checkedIcon')

		//- 標題
		.title.text-xl.font-bold.mt-4 {{ title }}

		//- 獎勵
		.flex.flex-row.items-center.mt-2
			//- 單位
			.type.text-base 获得奖励{{ type }}

			//- 數量
			.quantity.text-xl.font-bold.ml-2 +{{ quantity }}

		//- 關閉按鈕
		.self-stretch.px-6.mt-8
			confirm-cancel-button(cancel-text='关闭', @click-cancel='clickCancel')
</template>
<script>
import { ref, reactive, watch } from 'vue';
import confirmCancelButton from '@/components/confirmCancelButton';
import lottie from 'lottie-web';

export default {
	components: {
		confirmCancelButton,
	},
	props: {
		show: Boolean,
		title: String,
		type: String,
		quantity: Number,
	},
	emits: ['update:show'],
	setup(props, { emit }) {
		// Checked icon reference
		const checkedIcon = ref(null);

		// Component state
		const state = reactive({
			prevCheckedIcon: undefined,
			checkedAnimation: undefined,
		});

		// 點擊取消按鈕
		const clickCancel = () => {
			emit('update:show', false);
		};

		// Load checked animation
		const loadCheckedAnimation = () => {
			if (checkedIcon.value !== state.prevCheckedIcon) {
				state.prevCheckedIcon = checkedIcon.value;
				state.checkedAnimation = lottie.loadAnimation({
					container: checkedIcon.value,
					autoplay: false,
					loop: false,
					path: '/publicAssets/lottie/checked.json',
				});
				state.checkedAnimation?.setSpeed(0.75);
			}
			if (props.show) {
				state.checkedAnimation?.goToAndPlay(0);
			}
		};

		// Watch reference chnaged
		watch(
			() => checkedIcon.value,
			() => {
				loadCheckedAnimation();
			}
		);
		watch(
			() => props.show,
			() => {
				loadCheckedAnimation();
			}
		);
		return {
			checkedIcon,
			clickCancel,
		};
	},
};
</script>
<style lang="scss">
.bonus-success-popup {
	background: #ffffff;
	.title {
		color: #a62337;
	}
	.type {
		color: #a62337;
	}
	.quantity {
		color: #f8b62d;
	}
}
</style>