<template lang="pug">
//- 賽事列表
.grid.grid-cols-3.gap-4.items-stretch(:class='$attrs.class')
    //- 賽事物件
    schedule-item(v-for='item in filterList', :item='item')
</template>
<script>
import { computed } from 'vue';
import scheduleItem from '@/views/event/uefaeuro_2020/scheduleItem.vue';

export default {
	components: {
		scheduleItem,
	},
	props: {
		list: Array,
		selectedDay: Object,
	},
	setup(props) {
		// 以日期過濾的賽事列表
		const filterList = computed(() => {
			const list = props?.list || [];
			const date = props?.selectedDay?.format('YYYY-MM-DD');
			return list.filter((element) => element.begin_date === date);
		});
		return {
			filterList,
		};
	},
};
</script>
