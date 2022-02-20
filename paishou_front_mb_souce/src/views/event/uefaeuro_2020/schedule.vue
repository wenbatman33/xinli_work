<template lang="pug">
//- 歐洲杯賽事
.w-full.min-h-full.bg-schedule.flex.flex-col.items-stretch
	//- 2021
	img.absolute.top-52.w-2021.object-contain(src='/publicAssets/img/event/uefaeuro_2020/icon-home-2021@3x.png')
	
	//- 頁面內容
	.flex.flex-col.items-center
		//- 導覽欄
		nav-bar.w-full(title='预约欧洲杯赛事')

		//- 目前沒有紀錄
		.text-sm.text-white.mt-12(v-if='scheduleListEmpty') 目前没有紀錄

		//- 日期列表
		day-list.w-full(:list='state.dayList', v-model:selected='state.selectedDay')
			
		//- 賽程列表
		schedule-list-view.w-full.px-4.mt-6(:list='state.scheduleList', :selected-day='state.selectedDay')
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { scheduleList } from '@/api';
import navBar from '@/views/event/uefaeuro_2020/navBar.vue';
import dayList from '@/views/event/uefaeuro_2020/dayList.vue';
import scheduleListView from '@/views/event/uefaeuro_2020/scheduleListView.vue';
import dayjs from 'dayjs';

export default {
	components: {
		navBar,
		dayList,
		scheduleListView,
	},
	setup() {
		// Component state
		const state = reactive({
			dayList: [],
			scheduleList: [],
			scheduleListLoading: false,
			selectedDay: null,
		});

		// 賽程列表是否為空
		const scheduleListEmpty = computed(() => {
			return !state.scheduleList || state.scheduleList.length === 0;
		});

		// On component mounted
		onMounted(() => {
			// Update loading state
			state.scheduleListLoading = true;

			// Get query
			const query = {
				page: 1,
				pagesize: 100,
				liveclassid: 1,
				collaboration: 3,
				start_time: 1623427200,
				end_time: 1627747199,
			};

			// Get schedule list
			scheduleList(query)
				.then((res) => {
					// Update schedule list
					state.scheduleList = res?.data?.list || [];

					// Update day list
					state.dayList = state.scheduleList
						.map((element) => element.begin_date || '')
						.filter((element) => /\w{4}-\w{2}-\w{2}/.test(element))
						.filter((element, index, array) => array.indexOf(element) === index)
						.map((element) => dayjs(element, 'YYYY-MM-DD', 'zh-cn'))
						.sort((a, b) => a.valueOf() - b.valueOf());

					// Update selected day
					const today = dayjs(dayjs().format('YYYY-MM-DD'), 'YYYY-MM-DD', 'zh-cn');
					const nearestDay = state.dayList.find((element) => element.isSame(today) || element.isAfter(today));
					state.selectedDay = nearestDay || state.dayList[0];

					// Revert loading state on finished
					state.scheduleListLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.scheduleListLoading = false;
				});
		});
		return {
			state,
			scheduleListEmpty,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-schedule {
	background: url('/publicAssets/img/event/uefaeuro_2020/icon-bg@3x.png');
	background-size: cover;
}
.w-2021 {
	width: 92%;
}
</style>
