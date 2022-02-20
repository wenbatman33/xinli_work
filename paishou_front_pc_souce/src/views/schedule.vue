<template lang="pug">
.Container.BETWEEN.py-8
	//- schedule 左側區塊
	.funcBar.w-40.pr-2.flex-shrink-0
		//- schedule 類別區塊
		.classListMenu
			//- ------------------------------------------------------
			.menuItem(class='hover:text-psV3Red', :class='{"menuItemActive":(state.typeActive==="appointment")}')
				.pl-4.cursor-pointer(@click='appointmentFetch') 我的预约
			//- ------------------------------------------------------
			.menuItem(class='hover:text-psV3Red', :class='{"menuItemActive":(state.typeActive==="wonderful")}')
				.pl-4.cursor-pointer(@click='wonderfulFetch') 精彩赛事
			//- 賽事活動列表
			.text-lg.my-4(v-for='citem in state.collaborationList', :key='`classType_${citem.id}`', :class='{"menuItemActive":(state.typeActive==="competition" && state.competitionId===citem.id)}')
				.pl-4.cursor-pointer(@click='competitionFetch(citem)') {{ citem.name }}
			//- ------------------------------------------------------
			.text-lg.my-4(v-for='item in classList', :key='`classType_${item.id}`', :class='{"menuItemActive":(state.typeActive==="live" && state.liveId===item.id)}')
				.pl-4.cursor-pointer(@click='classFetch(item)') {{ item.name }}
			
		//- ------------------------------------------------------
		a-divider
		//- schedule 時間選單區塊-----------------------------------------------
		.timeMenuItem
			.timeMenuItem.rounded-lg.mt-4(v-for='(item, index) in state.timeMenuDays', :key='item.day',class='hover:text-psV3Red', :class='{"text-psV3Red border border-psV3Red":(state.currentDay===item)}')
				.flex.px-2.cursor-pointer.p-2.text-center(@click ='changeDay(item, index)' )
					.font-black.mr-1 {{ item.day===''? '所有賽事': item.day }}
					.text-gray-300(:class='{"text-psV3Red":(state.currentDay===item)}') {{ item.day==='' ? 'All Time': formatDay(item.day_date) }}

	//- schedule 右側區塊
	.scheduleListData.FLEX_C.flex-grow
		//- schedule 時間選單區塊-----------------------------------------------
		.hFuncBar.FLEX_R.bg-white.rounded-lg.shadow.p-4.mb-4
			.timeMenu.FLEX_R
				.timeMenuItem.rounded-lg.text-center.mr-4.p-2(v-for='(item, index) in state.timeMenuDays', :key='item.day', :class='{"text-psV3Red border border-psV3Red ":(state.currentDay===item)}')
					.px-2.cursor-pointer(@click ='changeDay(item, index)' )
						.text-gray-300(:class='{"text-psV3Red":(state.currentDay===item)}') {{ item.day==='' ? 'All Time': formatDay(item.day_date) }}
						.font-black.mr-1 {{ item.day===''? '所有賽事':  item.day }}
		//- schedule 內容-----------------------------------------------
		.scheduleList.w-full.grid.grid-cols-3.gap-4(v-if='state.scheduleList')
			.col-span-1(v-for='(item, index) in  state.scheduleList', :key='index')
				scheduleCard(:scheduleData='item')
		//- schedule 無內容-----------------------------------------------
		.w-full.min-h-screen.CENTER.flex-col(v-else)
			img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
			.text-lg.text-gray-500.my-2 抱歉！目前暂无赛事！
</template>

<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, reactive } from 'vue';
import { scheduleList, competitionCollaboration } from '@/api';
import scheduleCard from '@/components/schedule/scheduleCard.vue';
import { matomo_schedule_appointment, matomo_schedule_wonderful, matomo_schedule_class } from '@/matomoEvent';

export default {
	components: { scheduleCard },
	setup() {
		const store = useStore();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		// 暫時修改成只取足球籃球類別
		const classList = computed(() => store.state.config.classList.filter((item) => item.id === 1 || item.id === 2));
		// -------------------------------------------------------------------------------------
		const state = reactive({
			// ---------------
			typeActive: 'wonderful',
			liveId: 0,
			competitionId: 0,
			// ---------------
			timeMenuDays: [],
			currentDay: null,
			page: 1,
			pagesize: 20,
			total: null,
			scheduleList: [],
			collaborationList: [],
			competitionStartDay: null,
		});
		// -------------------------------------------------------------------------------------
		const formatDay = (day_date) => dayjs(day_date).format('ddd').toUpperCase();
		// 判斷當下時間參數
		const currentIsBefore2AM = dayjs().hour() < 2;
		const yesterdayDate = dayjs().subtract(1, 'days').format('YYYY/MM/DD');
		const checkCurrentIsYesterday = () => {
			const targetDay = dayjs(state.currentDay.date * 1000).format('YYYY/MM/DD');
			const today = dayjs().format('YYYY/MM/DD');
			return dayjs(targetDay).isBefore(dayjs(today), 'date');
		};
		const checkStartTime = () => {
			return checkCurrentIsYesterday() && currentIsBefore2AM ? dayjs(yesterdayDate + ' 21:00:00').unix() : dayjs().subtract(2, 'hour').unix();
		};
		const checkEndTime = () => {
			return checkCurrentIsYesterday() && currentIsBefore2AM ? dayjs(yesterdayDate + ' 23:59:59').unix() : '';
		};
		// -------------------------------------------------------------------------------------
		const appointmentFetch = () => {
			state.typeActive = 'appointment';
			chagneFetchScheduleListMode();
			matomo_schedule_appointment();
		};
		const wonderfulFetch = () => {
			state.typeActive = 'wonderful';
			chagneFetchScheduleListMode();
			matomo_schedule_wonderful();
		};
		const classFetch = (item) => {
			state.typeActive = 'live';
			state.liveId = item.id;
			init();
			matomo_schedule_class(item.name);
		};
		const competitionFetch = (item) => {
			state.typeActive = 'competition';
			state.competitionId = item.id;
			state.competitionStartDay = item.start;
			init();
			matomo_schedule_class(item.name);
		};

		const changeDay = (item) => {
			state.currentDay = item;
			state.typeActive === 'live' || state.typeActive === 'wonderful' ? fetchScheduleList(state.currentDay.date) : competitionFetchScheduleList(state.currentDay.date, state.currentDay.end_time);
		};
		// -------------------------------------------------------------------------------------

		const chagneFetchScheduleListMode = (date = '') => {
			state.scheduleList = [];
			let param = {
				page: state.page,
				pagesize: state.pagesize,
				liveclassid: state.liveId,
				is_appointment: state.typeActive === 'appointment' ? 1 : 0,
				is_wonderful: state.typeActive === 'wonderful' ? 1 : 0,
				date_time: date,
			};
			if (UID.value) {
				param.uid = Number(UID.value);
			}
			scheduleList(param).then((res) => {
				state.scheduleList = res.data.list;
				state.total = res.data.total;
				state.timeMenuDays = [];
				const newDaysArray = [];
				const allTimeData = {
					date: '',
					day: '',
					day_date: '',
					week: '',
				};
				state.timeMenuDays.push(allTimeData);
				state.currentDay = allTimeData;
				// 篩選排列res data 內容日期列表
				if (res?.data?.list) {
					res?.data?.list.forEach((item) => {
						if (newDaysArray.indexOf(item.begin_date) < 0) {
							newDaysArray.push(item.begin_date);
							state.timeMenuDays.push({
								date: dayjs(item.begin_date).unix(),
								day: dayjs(item.begin_date).format('MM/DD'),
								day_date: dayjs(item.begin_date).format('YYYY/MM/DD'),
								week: dayjs(item.begin_date).format('MM/DD'),
							});
						}
					});
				}
			});
		};
		const competitionFetchScheduleList = (date = '', end_time = '') => {
			const startTime = dayjs(date * 1000).format('YYYY/MM/DD 00:00:00');
			state.scheduleList = [];
			let param = {
				page: state.page,
				pagesize: state.pagesize,
				collaboration: state.competitionId,
				// -------------------------------
				start_time: dayjs(startTime).unix(),
				end_time: end_time ? end_time : checkEndTime(),
				// -------------------------------
			};
			if (UID.value) {
				param.uid = Number(UID.value);
			}
			scheduleList(param).then((res) => {
				state.scheduleList = res.data.list;
				state.total = res.data.total;
			});
		};
		const fetchScheduleList = (date = '') => {
			state.scheduleList = [];
			let param = {
				page: state.page,
				pagesize: state.pagesize,
				liveclassid: state.liveId,
				is_appointment: state.typeActive === 'appointment' ? 1 : 0,
				is_wonderful: state.typeActive === 'wonderful' ? 1 : 0,
				// -------------------------------
				date_time: date,
				start_time: checkStartTime(),
				end_time: checkEndTime(),
				// -------------------------------
			};
			if (UID.value) {
				param.uid = Number(UID.value);
			}
			scheduleList(param).then((res) => {
				state.scheduleList = res.data.list;
				state.total = res.data.total;
			});
		};
		// -------------------------------------------------------------------------------------
		const init = () => {
			if (state.typeActive === 'live') {
				const days = [];
				// 塞入後七天天數
				for (let i = 0; i < 7; i += 1) {
					let day;
					if (currentIsBefore2AM) {
						day = dayjs().subtract(1, 'day').add(i, 'day');
					} else {
						day = dayjs().add(i, 'day');
					}
					days.push({
						date: day.unix(),
						day: day.format('MM/DD'),
						day_date: day.format('YYYY/MM/DD'),
						week: day.format('dddd'),
					});
				}
				state.timeMenuDays = days;
				if (currentIsBefore2AM) {
					changeDay(state.timeMenuDays[1]);
				} else {
					changeDay(state.timeMenuDays[0]);
				}
			} else if (state.typeActive === 'competition') {
				const days = [];
				// 塞入後七天天數
				const startDay = dayjs().isBefore(state.competitionStartDay) ? dayjs(state.competitionStartDay) : dayjs();
				for (let i = 0; i < 7; i += 1) {
					let day, endTime;
					day = dayjs(startDay).add(i, 'day');
					endTime = dayjs(startDay).add(i, 'day').format('YYYY/MM/DD 23:59:59');
					days.push({
						date: day.unix(),
						end_time: dayjs(endTime).unix(),
						day: day.format('MM/DD'),
						day_date: day.format('YYYY/MM/DD'),
						week: day.format('dddd'),
					});
				}
				state.timeMenuDays = days;
				changeDay(state.timeMenuDays[0]);
			} else if (state.typeActive === 'appointment') {
				appointmentFetch();
			} else if (state.typeActive === 'wonderful') {
				wonderfulFetch();
			}
		};
		onMounted(() => {
			competitionCollaboration().then((res) => {
				state.collaborationList = res.data.list;
				init();
			});
		});
		return {
			store,
			state,
			router,
			UID,
			classList,
			init,
			// -----------------------
			changeDay,
			classFetch,
			appointmentFetch,
			wonderfulFetch,
			// -----------------------
			fetchScheduleList,
			competitionFetchScheduleList,
			chagneFetchScheduleListMode,
			checkCurrentIsYesterday,
			checkStartTime,
			checkEndTime,
			formatDay,
			competitionFetch,
		};
	},
};
</script>
<style lang="scss" scoped></style>
