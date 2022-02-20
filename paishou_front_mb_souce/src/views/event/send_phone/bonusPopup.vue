<template lang="pug">
//- 獎項彈窗
van-popup(:show='show', round, class='w-10/12 md:w-1/2', teleport='.popupTeleport')
	.flex.flex-col.items-center.px-6.py-8
		//- 標題
		.text-base.text-title.font-bold 您获得

		//- 圖示
		img.w-20.h-20.mt-4.rounded-full(:src='giftIcon || ""', @error='errorIcon')

		//- 名稱
		.text-lg.text-name.font-bold.mt-2
			span {{ giftName || '-' }}
			span  *
			span {{ quantity || '-' }}

		//- 說明
		.text-sm.text-explain.mt-2 {{ giftExplain }}
		
		//- 關閉
		van-button.w-auto.h-auto.mt-6.px-4.py-2.rounded-full.shadow-close.border-transparent.bg-transparent(@click='clickClose')
			.text-sm.text-close 关闭
</template>
<script>
export default {
	props: {
		show: Boolean,
		giftIcon: String,
		giftName: String,
		giftExplain: String,
		quantity: Number,
	},
	emits: ['update:show'],
	setup(props, { emit }) {
		// 獎勵圖示讀取失敗
		const errorIcon = (e) => {
			e.target.src = '/publicAssets/img/event/send_phone/icon-gift-placeholder@3x.png';
		};

		// 點擊關閉按鈕
		const clickClose = () => {
			emit('update:show', false);
		};
		return {
			errorIcon,
			clickClose,
		};
	},
};
</script>
<style lang="scss" scoped>
.text-title {
	color: #a62337;
}
.text-name {
	color: #a62337;
}
.text-explain {
	color: #969696;
}
.shadow-close {
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
}
.text-close {
	color: #a62337;
}
</style>
