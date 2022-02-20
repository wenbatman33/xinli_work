<template lang="pug">
//- 賽程
.schedule.flex.flex-col.items-stretch.pb-16
	//- 導覽欄
	nav-bar(title='赛程')

	//- 賽程分類
	van-tabs(:active='state.activeTab', @update:active='updateActiveTab')
		van-tab(v-for='item in tabList', :title='item.title', :name='item.name')

	//- 分隔線
	divider

	//- 日期
	day-list.mt-4(
		v-if='isDaysVisible'
		:path='path'
		:selected-date='state.selectedDate'
		:selected-collaboration='state.selectedCollaboration'
		@update:selected-date='updateSelectedDate'
	)

	//- 下拉刷新
	van-pull-refresh(v-model='state.isLoading', @refresh='refresh')
		//- 底部加載更多
		van-list(v-model:loading='state.isLoadMore', :finished='state.isFinished', :immediate-check='false', @load='loadMore')
			//- 未登入
			empty.mt-12(
				v-if='state.activeTab === "appointment" && !isLogin'
				text='您还未登录\n登录后方能使用此功能'
				button='帐号登录'
				hide-icon
				@click-button='clickLogin'
			)
		
			//- 目前沒有預約
			empty.mt-12(
				v-else-if='state.activeTab === "appointment" && isEmpty'
				text='您尚未预约任何赛事\n请至精彩赛事预约賽事或查看赛事'
				button='精彩赛事'
				@click-button='clickWonderful'
			)

			//- 目前沒有賽事
			empty.mt-12(
				v-else-if='isEmpty'
				text='目前没有赛事'
			)

			//- 賽事列表
			schedule-lists.my-2(
				v-else
				:list='state.scheduleList'
				:path='path'
				@update:appointment='updateAppointment'
			)
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { competitionCollaboration, scheduleList } from '@/api';
import { matomo_schedule_check_myAppointment, matomo_schedule_check_wonderful, matomo_schedule_check_class } from '@/matomoTrackEvent.js';
import empty from '@/components/empty';
import navBar from '@/components/navBar';
import divider from '@/components/divider';
import dayList from '@/components/schedule/dayList.vue';
import scheduleLists from '@/components/schedule/scheduleList.vue';
import dayjs from 'dayjs';

var isToday = require('dayjs/plugin/isToday');
dayjs.extend(isToday);

export default {
	components: {
		empty,
		navBar,
		divider,
		dayList,
		scheduleLists,
	},
	setup() {
		// Vue router
		const route = useRoute();
		const router = useRouter();

		// Vuex store
		const store = useStore();

		// Component state
		const initActiveTab = route.query.tab || 'wonderful';
		const initAppointment = initActiveTab === 'appointment' ? 1 : undefined;
		const initWonderful = initActiveTab === 'wonderful' ? 1 : undefined;
		const state = reactive({
			currentPage: 1,
			isLoading: false,
			isLoadMore: false,
			isFinished: false,
			activeTab: initActiveTab,
			selectedAppointment: initAppointment,
			selectedWonderful: initWonderful,
			selectedClassId: undefined,
			selectedCollaboration: undefined,
			selectedDate: undefined,
			scheduleList: [],
			collaborationList: [],
		});

		// 聯賽分類
		const classList = computed(() => {
			return [
				{
					id: 1,
					name: '足球',
				},
				{
					id: 2,
					name: '篮球',
				},
			];
		});
		
		// 分類頁籤列表
		const tabList = computed(() => {
			const list = [];
			list.push({
				title: '我的预约',
				name: 'appointment',
			});
			list.push({
				title: '精彩赛事',
				name: 'wonderful',
			});
			state.collaborationList.forEach((element) => {
				list.push({
					title: element.name,
					name: `collaboration-${element.id}`,
				});
			});
			classList.value.forEach((element) => {
				list.push({
					title: element.name,
					name: `class-${element.id}`,
				});
			});
			return list;
		});

		// Matomo track path
		const path = computed(() => {
			if (state.activeTab === 'appointment') {
				return '/schedule/appointment';
			} else if (state.activeTab === 'wonderful') {
				return '/schedule/wonderful';
			} else if (/^collaboration-\d+$/.test(state.activeTab)) {
				const collaborationName = state?.selectedCollaboration?.name || '';
				return `/schedule/collaboration/${collaborationName}`;
			} else if (/^class-\d+$/.test(state.activeTab)) {
				const classItem = classList.value.find((element) => element.id === state.selectedClassId);
				const className = classItem?.name || '';
				return `/schedule/class/${className}`;
			}
		});

		// 是否為登入狀態
		const isLogin = computed(() => {
			return store?.getters['user/IS_LOGIN'] === true
		});

        // 資料是否為空
		const isEmpty = computed(() => {
			return !state.scheduleList || state.scheduleList.length === 0;
		});

		// 是否顯示日期選擇
		const isDaysVisible = computed(() => {
			if (/^collaboration-\d+$/.test(state.activeTab)) {
				return true;
			} else if (/^class-\d+/.test(state.activeTab)) {
				return true;
			} else {
				return false;
			}
		});

		// 取得活動賽事
		const getCollaborationList = () => {
			competitionCollaboration().then((res) => {
				state.collaborationList = res?.data?.list || [];
			});
		};

		// 取得賽程列表
		const getScheduleList = () => {
			// Update searching state
			state.isLoading = true;

			// Check login state
			if (state.selectedAppointment === 1 && !isLogin.value) {
				state.scheduleList = [];
				state.isLoading = false;
				return;
			}

			// Compute start time
			var startTime = undefined;
			if (state.selectedDate) {
				const offsetStartDay = state.selectedDate.add(-2, 'hour').set('second', 0).set('millisecond', 0);
				if (state.selectedDate.isToday() && offsetStartDay.isToday()) {
					startTime = offsetStartDay.unix();
				} else {
					startTime = state.selectedDate.set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).unix();
				}
			}

			// Compute end time
			const endTime = state.selectedDate?.set('hour', 23)?.set('minute', 59)?.set('second', 0)?.set('millisecond', 0)?.unix();

			// Get schedule list
			scheduleList({
				pageSize: 20,
				page: state.isLoadMore ? state.currentPage + 1 : state.currentPage,
				liveclassid: state.selectedClassId,
				is_wonderful: state.selectedWonderful,
				is_appointment: state.selectedAppointment,
				collaboration: state.selectedCollaboration?.id,
				start_time: startTime,
				end_time: endTime,
			}).then(
				(res) => {
					// Update schedlue list
					const resList = res?.data?.list || [];
					if (state.isLoadMore) {
						state.scheduleList = state.scheduleList.concat(resList);
					} else {
						state.scheduleList = resList;
					}

					// Update current page
					if (state.isLoadMore) {
						state.currentPage += 1;
					}

					// Update finished state
					state.isFinished = resList.length === 0;

					// Revert load more state
					state.isLoadMore = false;

					// Revert searching state
					state.isLoading = false;
				},
				() => {
					// Revert load more state
					state.isLoadMore = false;

					// Revert searching state on error
					state.isLoading = false;
				}
			);
		};

		// On component mounted
		onMounted(() => {
			getCollaborationList();
			getScheduleList();
		});

		// 下拉刷新
		const refresh = () => {
			state.isLoadMore = false;
			state.currentPage = 1;
			getScheduleList();
		};

		// 加載更多
		const loadMore = () => {
			state.isLoadMore = true;
			getScheduleList();
		};

		// 更新選擇的分類
		const updateActiveTab = (tab) => {
			// Previous active tab
			const prevActiveTab = state.activeTab;

			// Init search state
			state.activeTab = tab;
			state.isLoadMore = false;
			state.currentPage = 1;

			// Update query options
			if (tab === 'appointment') {
				// 我的預約
				state.selectedAppointment = 1;
				state.selectedWonderful = undefined;
				state.selectedClassId = undefined;
				state.selectedDate = undefined;
				state.selectedCollaboration = undefined;
			} else if (tab === 'wonderful') {
				// 精彩賽事
				state.selectedAppointment = undefined;
				state.selectedWonderful = 1;
				state.selectedClassId = undefined;
				state.selectedDate = undefined;
				state.selectedCollaboration = undefined;
			} else if (/^collaboration-\d+$/.test(tab)) {
				// 活動賽事
				const collaborationId = Number(tab.replace(/^collaboration-/, ''));
				const collaborationItem = state.collaborationList.find((element) => element.id == collaborationId);
				const startTimeStr = collaborationItem?.start || '';
				const startTime = dayjs(startTimeStr, 'YYYY-MM-DD HH:mm:ss', 'zh-cn');
				const endTimeStr = collaborationItem?.end || '';
				const endTime = dayjs(endTimeStr, 'YYYY-MM-DD HH:mm:ss', 'zh-cn');
				const now = dayjs();
				var selectedDate;
				if (now.isBetween(startTime, endTime)) {
					selectedDate = now;
				} else {
					selectedDate = startTime;
				}
				
				state.selectedAppointment = undefined;
				state.selectedWonderful = undefined;
				state.selectedClassId = undefined;
				state.selectedDate = selectedDate;
				state.selectedCollaboration = collaborationItem
			} else if (/^class-\d+$/.test(tab)) {
				// 聯賽分類
				const classId = Number(tab.replace(/^class-/, ''));

				state.selectedAppointment = undefined;
				state.selectedWonderful = undefined;
				state.selectedClassId = classId;
				state.selectedDate = dayjs();
				state.selectedCollaboration = undefined;
			}

			// Fetch schedule list
			getScheduleList();

			// Matomo track
			var prevPage = '';
			if (prevActiveTab === 'appointment') {
				prevPage = '我的預約';
			} else if (prevActiveTab === 'wonderful') {
				prevPage = '精彩賽事';
			} else if (/^collaboration-\d+$/.test(prevActiveTab)) {
				const prevCollaborationId = Number(prevActiveTab.replace(/^collaboration-/, ''));
				const prevCollaborationItem = state.collaborationList.find((element) => element.id == prevCollaborationId);
				prevPage = prevCollaborationItem?.name || '';
			} else if (/^class-\d+$/.test(prevActiveTab)) {
				const prevClassId = Number(prevActiveTab.replace(/^class-/, ''));
				const prevClassItem = classList.value.find((element) => element.id == prevClassId);
				prevPage = prevClassItem?.name || '';
			}
			if (tab === 'appointment') {
				matomo_schedule_check_myAppointment(prevPage);
			} else if (tab === 'wonderful') {
				matomo_schedule_check_wonderful(prevPage);
			} else if (/^collaboration-\d+$/.test(tab)) {
				const collaborationId = Number(tab.replace(/^collaboration-/, ''));
				const collaborationItem = state.collaborationList.find((element) => element.id == collaborationId);
				matomo_schedule_check_class(prevPage, collaborationItem?.name);
			} else if (/^class-\d+$/.test(tab)) {
				const classId = Number(tab.replace(/^class-/, ''));
				const classItem = classList.value.find((element) => element.id == classId);
				matomo_schedule_check_class(prevPage, classItem?.name);
			}
		};

		// 更新選擇的日期
		const updateSelectedDate = (date) => {
			state.isLoadMore = false;
			state.currentPage = 1;
			state.selectedDate = date;
			getScheduleList();
		};

		// 更新預約狀態
		const updateAppointment = ({ eid, is_appointment }) => {
			state.scheduleList = state.scheduleList.map((element) => {
				if (element.eid === eid) {
					return {
						...element,
						is_appointment,
					}
				} else {
					return element;
				}
			});
		};

		// 點擊登入
		const clickLogin = () => {
			window.localStorage.tempDeepLink = 'paishou://schedule_appointment';
			router.push('/login');
		};

		// 點擊精彩賽事
		const clickWonderful = () => {
			updateActiveTab('wonderful');
		};
		return {
			state,
			tabList,
			path,
			isLogin,
			isEmpty,
			isDaysVisible,
			refresh,
			loadMore,
			updateActiveTab,
			updateSelectedDate,
			updateAppointment,
			clickLogin,
			clickWonderful,
		};
	},
};
</script>
<style lang="scss" scoped>
.schedule {
	width: 100%;
	::v-deep(.van-tab__text) {
		font-weight: bold;
	}
	::v-deep(.van-tab--active) {
		color: #a62337;
	}
	::v-deep(.van-tabs__line) {
		background: #a62337;
	}
}
</style>
