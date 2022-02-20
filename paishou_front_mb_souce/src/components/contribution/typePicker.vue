<template lang="pug">
//- 排行榜標題+報表選擇
.type-picker.flex.flex-row.justify-between.items-center.px-4.py-2
	//- 左側區塊
	.flex.flex-row.items-center
		//- 圖示
		img.w-4.h-4(:src='icon')

		//- 標題
		.title.text-sm.font-bold.ml-2 {{ title }}

	//- 右側區塊
	.flex.flex-row.items-center
		//- 周報
		van-button.type-button.shadow.rounded(:class='{ selected: isWeekSelected }', @click='clickWeek')
			.text-xs.py-1.px-6 周

		//- 月報
		van-button.type-button.shadow.rounded.ml-2(:class='{ selected: isMonthSelected }', @click='clickMonth')
			.text-xs.py-1.px-6 月
</template>
<script>
import { computed } from 'vue';
import { matomo_contribution_check_week, matomo_contribution_check_month } from '@/matomoTrackEvent.js';

export default {
	props: {
		icon: String,
		title: String,
		selected: String,
	},
	emits: ['update:selected'],
	setup(props, { emit }) {
		// 是否選擇周報
		const isWeekSelected = computed(() => props.selected === 'week');

		// 是否選擇月報
		const isMonthSelected = computed(() => props.selected === 'month');

		// 點擊周報按鈕
		const clickWeek = () => {
			emit('update:selected', 'week');
			matomo_contribution_check_week();
		};

		// 點擊月報按鈕
		const clickMonth = () => {
			emit('update:selected', 'month');
			matomo_contribution_check_month();
		};
		return {
			isWeekSelected,
			isMonthSelected,
			clickWeek,
			clickMonth,
		};
	},
};
</script>
<style lang="scss" scoped>
.type-picker {
	width: 100%;
	background: #fcfcfc;
	.title {
		color: #969696;
	}
	.type-button {
		width: unset;
		height: unset;
		padding: 0;
		color: #191919;
		border: transparent;
		background: transparent;
		&.selected {
			color: #ffffff;
			background: #f2994a;
		}
	}
}
</style>