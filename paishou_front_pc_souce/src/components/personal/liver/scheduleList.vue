<template lang="pug">
.w-full
	.scheduleList.CENTER_BETWEEN.px-4(style='margin-top:-70px')
		.typeGroup
			span.p-2.rounded.border.mr-2.cursor-pointer(
				:class='{"bg-psV3Yellow text-white": state.scheduleTypeId===0}', 
				@click='selectClassTypeHandle(0)') 全部
			span.p-2.rounded.border.mr-2.cursor-pointer(
				v-for='(item, index) in classList',
				:class='{"bg-psV3Yellow text-white": state.scheduleTypeId===item.id}', 
				@click='selectClassTypeHandle(item.id)') {{item?.name}}
		div
			select.border.p-2(v-model='state.selectTime', @change='selectDateHandle')
				option(v-for='item in state.times', :value='item') {{ item.date }}

	.my-8
		.scheduleList
			.grid.grid-cols-3.gap-4(v-if='state?.scheduleList?.length>0')
				.col-span-1(v-for='(item, index) in state.scheduleList')
					gameCard(:scheduleData='item', :is_appointment='0', @upadteGame='init')
			.my-4.text-right(v-if='state?.scheduleList?.length>0')
				a-pagination(v-model:current='state.schedulePage', :page-size='state.schedulePagesize', :total='state.scheduleTotal', size='small', show-less-items='', :hideonsinglepage='true', @change='getScheduleList')

			a-skeleton(v-if='state.loading', active, :paragraph='{ rows: 8}')

			.w-full.min-h-screen.CENTER.flex-col(v-if='state?.scheduleList?.length<=0 && state.loading===false')
				img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
				.text-lg.text-gray-500.my-2 抱歉！目前无赛事！

</template>
<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { computed, onMounted, reactive, toRaw } from 'vue';
import gameCard from '@/components/personal/liver/gameCard.vue';
import { anchorScheduleList } from '@/api';
const isToday = require('dayjs/plugin/isToday');
dayjs.extend(isToday);

export default {
	components: {
		gameCard,
	},
	setup() {
		const store = useStore();
		const UID = computed(() => store.state.user.uid || '');
		const classList = computed(() => store.state.config.classList);
		const state = reactive({
			//预约直播列表
			scheduleList: [],
			scheduleClassList: [],
			schedulePage: 1,
			schedulePagesize: 20,
			scheduleTotal: 0,
			//直播类型id
			scheduleTypeId: 0,
			selectTime: null,
			times: [],
			loading: false,
		});

		const checkIsToday = () => {
			const targetDay = dayjs(state.selectTime.unix * 1000).format('YYYY/MM/DD');
			return dayjs(targetDay).isToday();
		};
		const checkStartTime = () => {
			const currentYear = dayjs().year();
			return checkIsToday() ? dayjs().unix() : dayjs(`${currentYear}/${state.selectTime.date}  00:00:00`).unix();
		};
		const checkEndTime = () => {
			const currentYear = dayjs().year();
			return dayjs(`${currentYear}/${state.selectTime.date}  23:59:59`).unix();
		};
		const findClassItem = (id) => {
			return classList.value.filter((item) => item.id === id)[0]?.name;
		};
		// 可预约赛事
		const getScheduleList = (id = 0) => {
			state.scheduleList = [];
			state.scheduleTotal = 0;
			state.loading = true;
			anchorScheduleList({
				uid: Number(UID.value),
				page: state.schedulePage,
				pagesize: state.schedulePagesize,
				liveclassid: state.scheduleTypeId,
				is_appointment: 0,
				date_time: state.selectTime.unix || Date.parse(new Date()) / 1000,
				start_time: checkStartTime(),
				end_time: checkEndTime(),
			}).then((res) => {
				state.loading = false;
				if (res.data.list && res.code === 0) {
					state.scheduleList = res.data.list;
					state.scheduleTotal = res.data.total;
				} else {
					state.scheduleList = [];
				}
			});
		};
		const selectClassTypeHandle = (id) => {
			state.scheduleTypeId = id;
			getScheduleList();
		};
		const selectDateHandle = (e) => {
			getScheduleList();
		};
		const init = () => {
			getScheduleList();
		};
		onMounted(() => {
			let item;
			for (let index = 0; index < 7; index++) {
				if (state.currentIsBefore3AM) {
					item = {
						date: dayjs().subtract(1, 'day').add(index, 'day').format('MM/DD'),
						unix: dayjs().subtract(1, 'day').add(index, 'day').unix(),
					};
				} else {
					item = {
						date: dayjs().add(index, 'day').format('MM/DD'),
						unix: dayjs().add(index, 'day').unix(),
					};
				}

				state.times.push(item);
				state.selectTime = state.times[0];
			}
			init();
		});
		return {
			store,
			state,
			UID,
			classList,
			init,
			checkIsToday,
			checkStartTime,
			checkEndTime,
			findClassItem,
			getScheduleList,
			selectDateHandle,
			selectClassTypeHandle,
		};
	},
};
</script>
<style lang="scss" scoped></style>
