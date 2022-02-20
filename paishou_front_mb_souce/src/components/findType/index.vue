<template lang="pug">
//- 搜尋類型(充值紀錄/打賞紀錄)
.find-type.flex.flex-col
	//- 搜尋類型頁籤列表
	van-tabs(:active='activeTab', @click='clickTab')
		van-tab(v-for='item in findTypes', :title='item.title')

	//- 分隔線
	divider
</template>
<script>
import { computed } from 'vue';
import divider from '@/components/divider';

export default {
	components: {
		divider,
	},
	props: {
		selected: Number,
	},
	emits: ['update:selected'],
	setup(props, { emit }) {
		// 搜尋類別列表
		const findTypes = computed(() => {
			return [
				{
					title: '本月',
					value: 1,
				},
				{
					title: '上月',
					value: 2,
				},
			];
		});

		// 選擇的頁籤
		const activeTab = computed(() => {
			return findTypes.value.findIndex((element) => element.value === props.selected);
		});

		// 點擊頁籤
		const clickTab = (index) => {
			const findType = findTypes.value[index]?.value;
			emit('update:selected', findType);
		};
		return {
			findTypes,
			activeTab,
			clickTab,
		};
	},
};
</script>
<style lang="scss" scoped>
.find-type {
	width: 100%;
	::v-deep(.van-tab__text) {
		font-weight: bold;
	}
	::v-deep(.van-tab--active) {
		color: #a62337;
	}
	::v-deep(.van-tabs__line) {
		background-color: #a62337;
	}
}
</style>