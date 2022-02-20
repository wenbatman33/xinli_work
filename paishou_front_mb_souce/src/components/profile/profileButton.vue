<template lang="pug">
//- 個人資料頁功能按鈕
van-button.porfile-button(@click.prevent='click')
	.flex.flex-col.items-stretch
		//- 上分隔線
		divider

		//- 內容
		.flex.flex-row.items-center.px-4.py-3
			//- 標題
			.title.text-base.font-bold.flex-shrink-0.flex-grow.mr-4 {{ title }}

			//- 提示
			.placeholder.flex-shrink.text-sm.whitespace-nowrap.overflow-hidden.overflow-ellipsis(v-if='isVauleBlank') {{ placeholder }}

			//- 數值
			.value.flex-shrink.text-sm.whitespace-nowrap.overflow-hidden.overflow-ellipsis(v-else) {{ value }}

			//- 箭頭
			img.flex-shrink-0.w-4.h-4.ml-4(src='/publicAssets/img/icon-right-gray@3x.png')

		//- 下分隔線
		divider
.divider
</template>
<script>
import { computed } from 'vue';
import divider from '@/components/divider';

export default {
	components: {
		divider,
	},
	props: {
		title: String,
		value: String,
		placeholder: String,
	},
	emits: ['click'],
	setup(props, { emit }) {
		// 數值是否為空值
		const isVauleBlank = computed(() => {
			return !props.value || props.value.length === 0;
		});

		// 點擊按鈕
		const click = (e) => {
			emit('click', e);
		};
		return {
			isVauleBlank,
			click,
		};
	},
};
</script>
<style lang="scss" scoped>
.porfile-button {
	width: 100%;
	height: unset;
	padding: 0;
	border: transparent;
	color: #303133;
	background-color: #ffffff;
	::v-deep(.van-button__content) {
		width: 100%;
	}
	::v-deep(.van-button__text) {
		width: 100%;
		text-align: start;
	}
	.title {
		color: #191919;
	}
	.placeholder {
		color: #a62337;
	}
	.value {
		color: #969696;
	}
}
</style>