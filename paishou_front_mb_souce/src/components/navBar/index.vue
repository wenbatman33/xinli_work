<template lang="pug">
//- 導覽欄
.nav-bar
	.flex.flex-col
		//- 導覽欄內容
		.flex.flex-row.items-center.px-3.pt-8.pb-2
			//- 左側按鈕
			van-button.button.rounded-full.mr-2(v-if='leftButton', :loading='leftLoading', @click='clickLeft')
				.p-1
					img.w-7.h-7(:src='leftButton')

			//- 圖示
			.p-1.mr-2(v-if='icon')
				img.w-7.h-7(:src='icon')

			//- 標題
			.title.flex-grow.text-2xl.font-bold {{ title }}

			//- 右側按鈕
			van-button.button.rounded-full.ml-2(v-if='rightButton', :loading='rightLoading', @click='clickRight')
				.p-1
					img.w-7.h-7(:src='rightButton')

		//- 下分隔線
		divider(v-if='!hideUnderline')
</template>
<script>
import divider from '@/components/divider';

export default {
	components: {
		divider,
	},
	props: {
		title: String,
		icon: String,
		leftButton: String,
		rightButton: String,
		leftLoading: Boolean,
		rightLoading: Boolean,
		hideUnderline: Boolean,
	},
	emits: ['click-left', 'click-right'],
	setup(props, { emit }) {
        // 點擊左側按鈕
		const clickLeft = () => {
			emit('click-left');
		};

        // 點擊右側按鈕
		const clickRight = () => {
			emit('click-right');
		};
		return {
			clickLeft,
			clickRight,
		};
	},
};
</script>
<style lang="scss" scoped>
.nav-bar {
	width: 100%;
	.button {
		width: unset;
		height: unset;
		padding: unset;
		border: transparent;
		background: transparent;
	}
	.title {
		color: #a62337;
	}
}
</style>