<template lang="pug">
//- 我的/設定頁功能按鈕
van-button.personal-button(@click.prevent='click')
	.flex.flex-col.items-stretch
		//- 上分隔線
		divider

		//- 內容
		.flex.flex-row.justify-between.items-center.px-4(class='py-2.5')
			//- 左側
			.flex.flex-row.flex-shrink.items-center.overflow-hidden
				//- 圖示
				img.flex-shrink-0.w-8.h-8.mr-3(:src='`/publicAssets/img/personal/${icon ?? ""}`')

				//- 標題
				.text-base.font-bold.flex-shrink.whitespace-nowrap.overflow-hidden.overflow-ellipsis {{ title }}

			//- 箭頭
			img.flex-shrink-0.w-6.h-6.ml-4(src='/publicAssets/img/icon-right-gray@3x.png')

		//- 下分隔線
		divider
</template>
<script>
import divider from '@/components/divider';

export default {
	components: {
		divider,
	},
	props: {
		icon: String,
		title: String,
	},
	emits: ['click'],
	setup(props, { emit }) {
		// 點擊按鈕
		const click = (e) => {
			emit('click', e);
		};
		return {
			click,
		};
	},
};
</script>
<style lang="scss" scoped>
.personal-button {
	width: 100%;
	height: unset;
	padding: 0;
	border: transparent;
	color: #000000;
	background-color: #ffffff;
	::v-deep(.van-button__content) {
		width: 100%;
	}
	::v-deep(.van-button__text) {
		width: 100%;
		text-align: start;
	}
}
</style>