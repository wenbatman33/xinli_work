<template lang="pug">
//- 限時任務領取成功彈窗
van-popup(class='w-8/12 md:w-1/2', round, :show='show', teleport='.popupTeleport')
	.limit-task-success-popup.flex.flex-col.items-center.px-4.py-8
		//- 打勾圖示
		.lottie.w-8.h-8(ref='checkedIcon')

		//- 標題
		.title.text-xl.font-bold.mt-4 领取成功

		//- 獎勵
		.flex.flex-col.items-center.mt-2
			.flex.flex-row.justify-between.items-center.py-2(v-for='item in giftList || []')
				//- 圖示
				img.w-8.h-8.rounded-sm(:src='item.gifticon || ""', @error='errorGiftImg')

				//- 禮物內容
				.flex.flex-row.items-center.ml-4
					//- 名稱
					.gift-name.text-base {{ item.giftname }}

					//- 數量
					.gift-quantity.text-base.font-bold.ml-1 +{{ item.quantity }}

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
		giftList: Array,
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

		// 點擊彈窗外圍
		const clickCancel = () => {
			emit('update:show', false);
		};

		// 禮物圖示讀取失敗
		const errorGiftImg = (event) => {
			event.target.src = '/publicAssets/img/tasks/icon-gift-placeholder@3x.png';
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
				state.checkedAnimation?.setSpeed(0.65);
			}
			if (props.show) {
				state.checkedAnimation?.goToAndPlay(0);
			}
		};

		// Watch checked icon reference chnaged
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
			errorGiftImg,
		};
	},
};
</script>
<style lang="scss">
.limit-task-success-popup {
	background: #ffffff;
	.title {
		color: #a62337;
	}
	.gift-name {
		color: #a62337;
	}
	.gift-quantity {
		color: #f8b62d;
	}
}
</style>