<template lang="pug">
.Container.BETWEEN
	//- guessHistory 左側區塊------------------------------------------------------------------------------------------------------------
	.funcBar.w-40.pr-4.flex-shrink-0
		menuList
		a-divider.my-4
		.funcBarSubMenu
			.funcBarSubItem.rounded-lg.mt-4(v-for='(item, index) in state.menuTabList', class='hover:text-psV3Red', :class='{"text-psV3Red border border-psV3Red ":(state.tabID===item.value)}')
				.flex.px-2.cursor-pointer.p-2.text-center(@click='tabChange(item.value)' )  {{item.title}}
	.w-full
		//- 上方 type選單區塊-----------------------------------------------
		.hFuncBar.FLEX_C.bg-white.rounded-lg.shadow.p-4.mb-4
			.typeMenu.FLEX_R
				.typeMenuItem.rounded-lg.text-center.mr-4.p-2(v-for='(item, index) in state.menuTabList',  class='hover:text-psV3Red', :class='{"text-psV3Red border border-psV3Red ":(state.tabID===item.value)}')
					.px-2.cursor-pointer(@click='tabChange(item.value)' )
						.font-black.mr-1 {{item.title}}
			a-divider.my-4
			.sortBar
				.inline-block.p-2.border.cursor-pointer(:class='{"bg-psV3Yellow text-white":state.sortType==="time"}',  @click='sortByBetTime')
					span.mr-1 时间排序
					CaretDownOutlined(v-if='state.tiemDesc')
					CaretUpOutlined(v-else) 
				.inline-block.p-2.border.cursor-pointer(:class='{"bg-psV3Yellow text-white":state.sortType==="money"}',  @click='sortByBetMoney')
					span.mr-1 金额排序
					CaretDownOutlined(v-if='state.moneyDesc')
					CaretUpOutlined(v-else)

		.w-full.grid.grid-cols-3.gap-4.my-4(v-if='state.dataList')
			.col-span-1(v-for='(item, index) in state.dataList')
				historyItem(:guessGame='item', @updatList='init')

		.w-full.min-h-screen.CENTER.flex-col(v-if='!state.dataList')
			img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
			.text-lg.text-gray-500.my-2 抱歉！目前暂无竞猜！
	
</template>
<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, reactive, toRaw } from 'vue';
import { guessHistory, guessReceive, guessCombo } from '@/api';
import menuList from '@/components/personal/menuList.vue';
import historyItem from '@/components/personal/guessHistory/historyItem.vue';
import { FallOutlined, RiseOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons-vue';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export default {
	components: {
		menuList,
		historyItem,
		FallOutlined,
		RiseOutlined,
		CaretDownOutlined,
		CaretUpOutlined,
	},
	setup() {
		const store = useStore();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			tabID: '',
			menuTabList: [
				{ title: '全部', value: '' },
				{ title: '未结算', value: 1 },
				{ title: '已结算', value: 3 },
				{ title: '取消', value: 0 },
			],
			fetchDataList: null,
			dataList: null,
			sortType: 'time',
			tiemDesc: true,
			moneyDesc: true,
		});

		const tabChange = (type = '') => {
			state.tabID = type;
			if (state.fetchDataList) {
				state.dataList = type === '' ? state.fetchDataList : state.fetchDataList.filter((game) => game.status === type);
			}
			state.sortType === 'time' ? sortByBetTime() : sortByBetMoney();
		};

		const init = () => {
			state.fetchDataList = null;
			guessHistory({ page: 1, pagesize: 99999 }).then((res) => {
				state.fetchDataList = res?.data?.list;
				tabChange();
			});
		};

		const sortByBetTime = () => {
			state.sortType = 'time';
			state.tiemDesc = !state.tiemDesc;
			const sortData = JSON.parse(JSON.stringify(state.dataList));
			if (sortData) {
				state.dataList = state.tiemDesc ? sortData.sort((a, b) => (dayjs(b.bet_time).isAfter(dayjs(a.bet_time)) ? 1 : -1)) : sortData.sort((a, b) => (dayjs(a.bet_time).isAfter(dayjs(b.bet_time)) ? 1 : -1));
			}
		};
		const sortByBetMoney = () => {
			state.sortType = 'money';
			state.moneyDesc = !state.moneyDesc;
			const sortData = JSON.parse(JSON.stringify(state.dataList));
			if (sortData) {
				state.dataList = state.moneyDesc ? sortData.sort((a, b) => b.guess_bet - a.guess_bet) : sortData.sort((a, b) => a.guess_bet - b.guess_bet);
			}
		};
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			router,
			UID,
			init,
			tabChange,
			sortByBetTime,
			sortByBetMoney,
		};
	},
};
</script>
<style lang="scss" scoped></style>
