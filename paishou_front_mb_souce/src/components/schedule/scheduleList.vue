<template lang="pug">
//- 賽程列表
.w-full.flex.flex-col
	//- 賽程時間與賽程物件
	.flex.flex-col.items-stretch(v-for='item in computedScheduleList')
		//- 賽程時間
		.text-date.text-base.font-bold.mx-4.my-2(v-if='item.isFirstElement') {{ item.dateSection }}

		//- 賽事物件
		schedule-item(:item='item', :path='path', @update:appointment='updateAppointment')
</template>
<script>
import { computed } from 'vue';
import scheduleItem from '@/components/schedule/scheduleItem.vue';
import dayjs from 'dayjs';

export default {
	components: {
		scheduleItem,
	},
	props: {
		list: Array,
		path: String,
	},
	emits: ['update:appointment'],
	setup(props, { emit }) {
		// Computed schedule list
		const computedScheduleList = computed(() => {
			return props?.list?.map((element, index) => {
				const date = dayjs(element.begin_date || element.date);
				const formatDay = date.format('YYYY/MM/DD');
				const day = date.day();
				var dayName = '';
				switch (day) {
					case 0:
						dayName = '日';
						break;
					case 1:
						dayName = '一';
						break;
					case 2:
						dayName = '二';
						break;
					case 3:
						dayName = '三';
						break;
					case 4:
						dayName = '四';
						break;
					case 5:
						dayName = '五';
						break;
					case 6:
						dayName = '六';
						break;
				}
				const currDateStr = element.begin_date || element.date;
				const prevDateStr = props.list[index - 1]?.begin_date || props.list[index - 1]?.date;
				const isFirstElement = index === 0 || currDateStr != prevDateStr;
				const dateSection = `${formatDay} (${dayName}) `;
				return { ...element, isFirstElement, dateSection };
			}) || [];
		});

		// 更新預約狀態
		const updateAppointment = (data) => {
			emit('update:appointment', data);
		};
		return {
			computedScheduleList,
			updateAppointment,
		};
	},
};
</script>
<style lang="scss" scoped>
.text-date {
	color: #191919;
}
</style>