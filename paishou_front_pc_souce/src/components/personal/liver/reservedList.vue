<template lang="pug">
.w-full
	.reservedList.CENTER_BETWEEN.px-4(style='margin-top:-70px')
		div
			//- span.p-2.rounded.border.mr-2.cursor-pointer(
			//- 	v-for='(item, index) in state.reservedClassList',
			//- 	:class='{"bg-psV3Yellow text-white": state.reservedTypeId===item.id}', 
			//- 	@click='getReservedList(item.id)') {{item?.name}} {{item?.count}}
			span.p-2.rounded.border.mr-2.cursor-pointer(
				:class='{"bg-psV3Yellow text-white": state.reservedTypeId===0}', 
				@click='selectClassTypeHandle(0)') 全部
			span.p-2.rounded.border.mr-2.cursor-pointer(
				v-for='(item, index) in classList',
				:class='{"bg-psV3Yellow text-white": state.reservedTypeId===item.id}', 
				@click='selectClassTypeHandle(item.id)') {{item?.name}}

		div 
			.CENTER_BETWEEN
				.mr-2
					.text-right.text-xs 目前总计预约 
					.text-right.text-xs 场赛事 
				h2 {{state.reservedTotal}}

	.my-8
		.reservedList
			//- 已预约开播 
			.grid.grid-cols-3.gap-4(v-if='state?.reservedList?.length>0')
				.col-span-1(v-for='(item, index) in state.reservedList')
					gameCard(:scheduleData='item', :is_appointment='1', @upadteGame='init')
			.my-4.text-right(v-if='state?.reservedList?.length>0')
				a-pagination(v-model:current='state.reservedPage', :page-size='state.reservedPagesize', :total='state.reservedTotal', size='small', show-less-items='', :hideonsinglepage='true', @change='getReservedList')

			a-skeleton(v-if='state.loading', active, :paragraph='{ rows: 8}')

			.w-full.min-h-screen.CENTER.flex-col(v-if='state?.reservedList?.length<=0 && state.loading===false')
				img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
				.text-lg.text-gray-500.my-2 抱歉！目前无预约赛事！
</template>

<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { computed, onMounted, reactive, toRaw } from 'vue';
import gameCard from '@/components/personal/liver/gameCard.vue';
import { anchorScheduleList, appointmentLive, liveRecord, liveIncome } from '@/api';

export default {
	components: {
		gameCard,
	},
	setup() {
		const store = useStore();
		const UID = computed(() => store.state.user.uid || '');
		const classList = computed(() => store.state.config.classList);
		const state = reactive({
			tabID: 0,
			//已预约列表
			reservedList: [],
			reservedClassList: [],
			reservedPage: 1,
			reservedPagesize: 20,
			reservedTotal: 0,
			reservedTypeId: 0,
			loading: false,
		});

		const findClassItem = (id) => {
			return classList.value.filter((item) => item.id === id)[0]?.name;
		};
		// 已预约赛事
		const getReservedList = (id = '') => {
			// state.reservedTypeId = id;
			state.loading = true;
			state.reservedList = [];
			state.reservedClassList = [];
			state.reservedTotal = 0;

			anchorScheduleList({
				uid: Number(UID.value),
				page: state.reservedPage,
				pagesize: state.reservedPagesize,
				liveclassid: state.reservedTypeId,
				is_appointment: 1,
			}).then((res) => {
				state.loading = false;
				state.reservedClassList[0] = { name: '全部', id: 0, count: 0 };
				if (res?.data?.list && res.code === 0) {
					state.reservedList = res.data.list;
					res.data.list.forEach((item, index) => {
						if (!state.reservedClassList[item.classid]) {
							state.reservedClassList[item.classid] = {
								name: findClassItem(item.classid),
								id: item.classid,
								count: 0,
							};
						}
						state.reservedClassList[0].count = state.reservedClassList[0].count += 1;
						state.reservedClassList[item.classid].count = state.reservedClassList[item.classid].count += 1;
					});
					state.reservedTotal = res.data.total;
				} else {
					state.reservedList = [];
				}
			});
		};

		const selectClassTypeHandle = (id) => {
			state.reservedTypeId = id;
			getReservedList();
		};
		const init = () => {
			getReservedList();
		};
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			UID,
			classList,
			init,
			findClassItem,
			getReservedList,
			selectClassTypeHandle,
		};
	},
};
</script>
<style lang="scss" scoped></style>
