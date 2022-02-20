<template lang="pug">
.Container.BETWEEN
	//- personal 左側區塊------------------------------------------------------------------------------------------------------------
	.funcBar.w-40.pr-4.flex-shrink-0
		menuList
		a-divider.my-4
		.funcBarSubMenu
			.funcBarSubItem.rounded-lg.mt-4(v-for='(item, index) in state.menuTabList', class='hover:text-psV3Red', :class='{"text-psV3Red border border-psV3Red ":(state.tabID===index)}')
				.flex.px-2.cursor-pointer.p-2.text-center(@click='tabChange(index)') {{item.title}}
	.w-full.min-h-screen
		//- 上方 type選單區塊-----------------------------------------------
		.hFuncBar.h-36.FLEX_C.bg-white.rounded-lg.shadow.p-4.mb-4
			.typeMenu.FLEX_R
				.typeMenuItem.rounded-lg.text-center.mr-4.p-2(v-for='(item, index) in state.menuTabList',  class='hover:text-psV3Red', :class='{"text-psV3Red border border-psV3Red ":(state.tabID===index)}')
					.px-2.cursor-pointer(@click='tabChange(index)' )
						.font-black.mr-1 {{item.title}}
			a-divider.my-4

		.reservedList.CENTER_BETWEEN(v-if='state.tabID===0')
			reservedList
			
		.scheduleList.CENTER_BETWEEN(v-if='state.tabID===1') 
			scheduleList
</template>
<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { computed, onMounted, reactive, toRaw } from 'vue';
import menuList from '@/components/personal/menuList.vue';
import gameCard from '@/components/personal/liver/gameCard.vue';
import reservedList from '@/components/personal/liver/reservedList.vue';
import scheduleList from '@/components/personal/liver/scheduleList.vue';
import { anchorScheduleList, appointmentLive, liveRecord, liveIncome } from '@/api';

export default {
	components: {
		menuList,
		gameCard,
		reservedList,
		scheduleList,
	},
	setup() {
		const store = useStore();
		const state = reactive({
			tabID: 0,
			menuTabList: [
				{ title: '已预约赛事', value: 0 },
				{ title: '预约赛事', value: 1 },
			],
			loading: false,
		});

		const tabChange = (val = 0) => {
			state.tabID = val;
		};

		return {
			store,
			state,
			tabChange,
		};
	},
};
</script>
<style lang="scss" scoped></style>
