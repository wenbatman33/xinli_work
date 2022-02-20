<template lang="pug">
//- 獎項彈窗
van-popup(:show='show', round, class='w-10/12 md:w-1/2', teleport='.popupTeleport')
	.flex.flex-col.items-center.px-6.py-8
		//- 標題
		.text-base.text-title.font-bold 恭喜获得

		//- 圖示
		img.w-20.h-20.mt-4.rounded-full(:src='giftIcon || ""', @error='errorIcon')

		//- 名稱
		.text-lg.text-name.font-bold.mt-2 
			span {{ giftName || '-' }}
			span.ml-1 x
			span {{ giftNums || '0' }}

		//- 說明
		.text-sm.text-explain.mt-2 {{ giftExplain }}
		
		//- 關閉
		van-button.w-auto.h-auto.mt-6.px-8.py-2.rounded.shadow-close.border-transparent.bg-close(@click='clickClose')
			.text-lg.text-white.font-bold 关闭
</template>
<script>
export default {
	props: {
		show: Boolean,
		giftIcon: String,
		giftName: String,
		giftNums: Number,
		giftExplain: String,
	},
	emits: ['update:show'],
	setup(props, { emit }) {
		// 獎勵圖示讀取失敗
		const errorIcon = (e) => {
			e.target.src = '/publicAssets/img/event/uefaeuro_2020/icon-gift-placeholder@3x.png';
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
.bg-close {
	background: #a62337;
}
</style>
