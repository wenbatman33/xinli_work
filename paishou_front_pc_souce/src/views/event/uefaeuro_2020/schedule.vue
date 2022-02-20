<template lang="pug">
//- 歐洲杯賽事
.relative.w-full.min-h-full.bg-schedule.FLEX_C.items-center.overflow-hidden
	//- 2021
	img.absolute.top-32.w-2021(src='/publicAssets/img/event/uefaeuro_2020/icon-home-2021@3x.png')

	//- 頁面內容
	.FLEX_R.items-end.pb-20
		//- 左側按鈕列
		.pr-12
			.w-10

		//- 內容
		.FLEX_C.items-stretch
			//- 導覽欄
			nav-bar

			//- 標題
			.text-2xl.text-white.font-bold.mt-12 预约欧洲杯赛事

			//- 副標題
			.text-base.font-bold.mt-4
				span.text-white 预约观看赛事,直播间 
				span.text-highlight 观看满10分钟
				span.text-white , 立即领取 
				span.text-highlight 冠军奖杯礼物特效*1

			//- 目前沒有紀錄
			.text-sm.text-white.mt-12(v-if='scheduleListEmpty') 目前没有紀錄

			//- 日期列表
			day-list.mt-12(:list='state.dayList', v-model:selected='state.selectedDay')
			
			//- 賽程列表
			schedule-list-view.mt-6(:list='state.scheduleList', :selected-day='state.selectedDay')

		//- 右側按鈕列
		.FLEX_C.items-center.pl-12
			//- 說明按鈕
			a-popover
				a-button(type='link')
					img.w-10.h-10(src='/publicAssets/img/event/uefaeuro_2020/icon-info@3x.png')
				template(#content)
					.FLEX_C.items-start.bg-white.rounded.px-4.py-5
						.text-base.text-desc-title.font-bold 预约赛事活动说明
						.text-sm.mt-2
							span.text-desc 预约观看赛事,直播间
							span.text-highlight 观看
							br
							span.text-highlight 满10分钟
							span.text-desc ,立即领取
							span.text-highlight 冠军奖
							br
							span.text-highlight 杯礼物特效*1

			//- 置頂按鈕
			a-button(type='link', @click='clickTop')
				img.w-10.h-10.mt-6(src='/publicAssets/img/event/uefaeuro_2020/icon-top@3x.png')
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

		// 點擊置頂按鈕
		const clickTop = () => {
			window.scrollTo(0, 0);
		};

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
			clickTop,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-schedule {
	background: url('/publicAssets/img/event/uefaeuro_2020/icon-bg@3x.jpg');
	background-size: cover;
}
.w-2021 {
	width: 72%;
}
.text-highlight {
	color: #ffff10;
}
.text-desc-title {
	color: #a62337;
}
.text-desc {
	color: #969696;
}
</style>
