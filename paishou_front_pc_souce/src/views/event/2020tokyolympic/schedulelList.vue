<template lang="pug">
.Container.py-4
	//- schedule 右側區塊
	.scheduleListData.FLEX_C.flex-grow
		//- schedule 時間選單區塊-----------------------------------------------
		.classTypeBar.w-72.FLEX_R.rounded-lg.shadow.p-2.mb-4.overflow-hidden.overflow-x-auto(class='bg-[#001056]')
			.typeBtn.w-36.h-12.text-white.rounded.CENTER.cursor-pointer(:class='{"bg-psV3Orange":(state.liveId===1)}', @click='changeClassType(1)') 
				span
					img(src='/publicAssets/img/event/2020tokyolympic/icon-football.png' , srcset='/publicAssets/img/event/2020tokyolympic/icon-football@2x.png 2x')
				span 足球
			.typeBtn.w-36.h-12.text-white.rounded.CENTER.cursor-pointer(:class='{"bg-psV3Orange":(state.liveId===2)}',@click='changeClassType(2)') 
				span
					img(src='/publicAssets/img/event/2020tokyolympic/icon-basketball.png' , srcset='/publicAssets/img/event/2020tokyolympic/icon-basketball@2x.png 2x')
				span 篮球
		
		//- p.text-white {{state.timeMenuDays}}
		.timeMenuBar.FLEX_R.rounded-lg.shadow.p-4.mb-4(class='bg-[#001056]')
			.timeMenu.w-full.BETWEEN
				.prev.CENTER.w-12.flex-shrink-0.cursor-pointer(@click='prev')
					LeftOutlined.text-psV3Red
				.flex-grow.overflow-hidden.w-full.h-14.relative
					.timeMenuItemWrap.absolute.w-full.FLEX_R
						.swiper-wrapper
							.swiper-slide.timeMenuItem.rounded-lg.text-center.mr-4.p-2(v-for='(item, index) in state.timeMenuDays', :key='item.day')
								.px-2.cursor-pointer(@click ='changeDay(item, index)' )
									.text-white(:class='{"text-psV3Orange":(state.currentDay===item)}') {{ item.day==='' ? 'All Time': formatDay(item.day_date) }}
									.text-white.font-black(:class='{"text-psV3Orange":(state.currentDay===item)}')  {{ item.day===''? '所有賽事':  item.day }}
				.next.CENTER.w-12.flex-shrink-0.cursor-pointer(@click='next')
					RightOutlined.text-psV3Red
		
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
import Swiper from 'swiper';
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, onUnmounted, reactive, watch, nextTick } from 'vue';
import { scheduleList, competitionCollaboration } from '@/api';
import scheduleCard from '@/components/schedule/scheduleCardForOlympic.vue';
import { matomo_schedule_appointment, matomo_schedule_wonderful, matomo_schedule_class } from '@/matomoEvent';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';

export default {
	components: { scheduleCard, LeftOutlined, RightOutlined },
	setup() {
		const store = useStore();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		// 暫時修改成只取足球籃球類別
		const classList = computed(() => store.state.config.classList.filter((item) => item.id === 1 || item.id === 2));
		// -------------------------------------------------------------------------------------
		const state = reactive({
			swiper: null,
			// ---------------
			liveId: 1,
			competitionId: 1,
			// ---------------
			timeMenuDays: [],
			currentDay: null,
			page: 1,
			pagesize: 20,
			total: null,
			scheduleList: [],
			collaborationList: [],
			competitionStartDay: null,
			competitionEndDay: null,
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
		const competitionFetch = (item = null) => {
			state.competitionId = item ? item.id : state.collaborationList[0].id;
			state.competitionStartDay = item ? item.start : state.collaborationList[0].start;
			state.competitionEndDay = item ? item.start : state.collaborationList[0].end;
			matomo_schedule_class(item ? item.name : state.collaborationList[0].name);
			init();
		};

		const changeDay = (item) => {
			state.currentDay = item;
			competitionFetchScheduleList(state.currentDay.date, state.currentDay.end_time);
		};
		const changeClassType = (item) => {
			state.liveId = item;
			init();
		};
		// -------------------------------------------------------------------------------------
		const competitionFetchScheduleList = (date = '', end_time = '') => {
			state.scheduleList = [];
			let param = {
				page: state.page,
				pagesize: state.pagesize,
				liveclassid: state.liveId,
				collaboration: state.competitionId,
				// -------------------------------
				start_time: date ? date : checkStartTime(),
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
		// -------------------------------------------------------------------------------------
		const init = () => {
			const days = [];
			// 塞入後七天天數
			const startDay = dayjs(state.competitionStartDay);
			const matchDays = dayjs(state.competitionEndDay).diff(startDay, 'day');
			for (let i = 0; i <= matchDays; i += 1) {
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
			// 預設讓當日選單亮起來-----------------------------------------------------------------
			let activeTodayIndex = 0;
			state.timeMenuDays.forEach((item, index) => {
				if (dayjs(item.day_date).format('YYYY/MM/DD') === dayjs().format('YYYY/MM/DD')) {
					activeTodayIndex = index;
				}
			});
			changeDay(state.timeMenuDays[activeTodayIndex]);
			state.swiper.slideTo(activeTodayIndex, 0);
			// 預設讓當日選單亮起來-----------------------------------------------------------------
		};
		const next = () => {
			state.swiper.slideNext();
		};
		const prev = () => {
			state.swiper.slidePrev();
		};
		watch(
			() => state.timeMenuDays,
			(newVal) => {
				nextTick(() => {
					state.swiper.update();
				});
			},
			{ deep: true }
		);
		onUnmounted(() => {
			state?.swiper.destroy();
			state.swiper = null;
		});
		onMounted(() => {
			state.swiper = new Swiper('.timeMenuItemWrap', {
				observer: true,
				observeParents: true,
				slidesPerView: 10,
				spaceBetween: 4,
				slidesPerGroup: 10,
				slideToClickedSlide: true,
			});
			competitionCollaboration().then((res) => {
				state.collaborationList = res.data.list;
				competitionFetch();
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
			changeClassType,
			// -----------------------
			competitionFetchScheduleList,
			checkCurrentIsYesterday,
			checkStartTime,
			checkEndTime,
			formatDay,
			competitionFetch,
			next,
			prev,
		};
	},
};
</script>
<style lang="scss" scoped></style>
