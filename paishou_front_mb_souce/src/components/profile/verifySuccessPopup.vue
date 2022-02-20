<template lang="pug">
//- 驗證成功彈窗
van-popup(:show='show', round, teleport='.popupTeleport', class='w-10/12 md:w-6/12')
	.verify-success-popup.flex.flex-col.items-center.px-6.pt-10.pb-12
		//- 圖示
		img.w-20.h-20(src='/publicAssets/img/profile/icon-shield-check@3x.png')

		//- 標題
		.title.text-xl.font-bold.mt-2 帐号验证成功
</template>
<script>
export default {
	props: {
		show: Boolean,
	},
};
</script>
<style lang="scss" scoped>
.verify-success-popup {
	width: 100%;
	.title {
		color: #f2994a;
	}
}
</style>