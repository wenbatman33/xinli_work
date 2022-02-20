<template lang="pug">
//- 驗證失敗彈窗
van-popup(:show='show', round, teleport='.popupTeleport', class='w-10/12 md:w-6/12')
	.verify-failed-popup.flex.flex-col.items-center.px-6.pt-10.pb-12
		//- 圖示
		img.w-20.h-20(src='/publicAssets/img/profile/icon-shield-close@3x.png')

		//- 標題
		.title.text-xl.font-bold.mt-2 帐号验证失败

		//- 再次驗證與取消按鈕
		confirm-cancel-button.mt-8(confirm-text='再次验证', cancel-text='取消', @click-confirm='clickRetry', @click-cancel='clickCancel')
</template>
<script>
import confirmCancelButton from '@/components/confirmCancelButton';

export default {
	components: {
		confirmCancelButton,
	},
	props: {
		show: Boolean,
	},
	emits: ['update:show', 'retry'],
	setup(props, { emit }) {
		// 點擊再次驗證按鈕
		const clickRetry = () => {
			emit('retry');
			emit('update:show', false);
		};

		// 點擊取消按鈕
		const clickCancel = () => {
			emit('update:show', false);
		};
		return {
			clickRetry,
			clickCancel,
		};
	},
};
</script>
<style lang="scss" scoped>
.verify-failed-popup {
	width: 100%;
	.title {
		color: #a62337;
	}
}
</style>