<template lang="pug">
//- 賽程列表
.flex.flex-col.items-stretch
	//- 賽事物件
	schedule-item(
		v-for='item in list'
		:item='item'
		@update:appointment='updateAppointment'
	)
</template>
<script>
import scheduleItem from '@/components/event/2020tokyolympic/scheduleItem.vue';

export default {
	components: {
		scheduleItem,
	},
	props: {
		list: Array,
	},
	emits: ['update:appointment'],
	setup(props, { emit }) {
		// 更新預約狀態
		const updateAppointment = (data) => {
			emit('update:appointment', data);
		};
		return {
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