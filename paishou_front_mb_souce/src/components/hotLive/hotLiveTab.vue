<template lang="pug">
//- 熱門直播 / 最新直播頁籤物件
van-button.hot-live-tab.rounded-md(@click='clickTab')
	.flex.flex-col.items-center
		//- 頁籤內容
		.flex.flex-row.justify-center.my-2
			//- 圖示
			img.icon.w-6.h-6(:src='icon', :class='{ selected: selected }')

			//- 標題
			.title.text-base.font-bold.ml-1(:class='{ selected: selected }') {{ title }}

		//- 被選擇的標記
		.indicator.rounded-full(class='w-1/2 h-0.5', :class='{ selected: selected }')
</template>
<script>
export default {
	props: {
		icon: String,
		title: String,
		selected: Boolean,
	},
	emits: ['click'],
	setup(props, { emit }) {
		// 點擊頁籤
		const clickTab = () => {
			emit('click');
		};
		return {
			clickTab,
		};
	},
};
</script>
<style lang="scss" scoped>
.hot-live-tab {
	width: 100%;
	height: unset;
	border: transparent;
	background-color: transparent;
	.icon.selected {
		filter: invert(23%) sepia(43%) saturate(2719%) hue-rotate(324deg) brightness(91%) contrast(102%);
	}
	.title {
		color: #000000;
		&.selected {
			color: #a62337;
		}
	}
	.indicator.selected {
		background-color: #a62337;
	}
}
</style>