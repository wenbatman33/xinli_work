<template lang="pug">
.Container.BETWEEN
	//- guessAnchorList 左側區塊------------------------------------------------------------------------------------------------------------
	.funcBar.w-40.pr-4.flex-shrink-0
		menuList
		a-divider.my-4
		.funcBarSubMenu
			.funcBarSubItem.rounded-lg.mt-4(v-for='(item, index) in state.menuTabList', class='hover:text-psV3Red', :class='{"text-psV3Red border border-psV3Red ":(state.tabID===item.value)}')
				.flex.px-2.cursor-pointer.p-2.text-center(@click='tabChange(item.value)' )  {{item.title}}
	.w-full
		//- 上方 type選單區塊-----------------------------------------------
		.hFuncBar.BETWEEN.items-center.flex-row.bg-white.rounded-lg.shadow.p-4.mb-4
			.typeMenu.FLEX_R
				.typeMenuItem.rounded-lg.text-center.mr-4.p-2(v-for='(item, index) in state.menuTabList',  class='hover:text-psV3Red', :class='{"text-psV3Red border border-psV3Red ":(state.tabID===item.value)}')
					.px-2.cursor-pointer(@click='tabChange(item.value)' )
						.font-black.mr-1 {{item.title}}
			.border.rounded.p-2.text-xs.text-gray-500.BETWEEN.items-center
				ExclamationCircleFilled.mx-1
				span.mx-1 一天进行中的竞猜活动 
				span.text-psV3Yellow.mx-1 10个/00:00 重置
				span.p-1.bg-psV3Orange.text-white.rounded ({{state.usableCount}}/10)
		.addGuessGmaeBtn.CENTER.bg-white.shadow.h-14.cursor-pointer(@click='addGuessGameHandle')
			h5.text-center.text-psV3Red
				img(src='/publicAssets/img/v3/icon-plus-1.png' , srcset='/publicAssets/img/v3/icon-plus-1@2x.png 2x')
				span 创建竞猜

		.w-full.grid.grid-cols-1.gap-4.my-4(v-if='state?.dataList.length>=1')
			.col-span-1(v-for='item in state.dataList')
				liveGuessItem(:guessGame='item', @update='init')

		.w-full.min-h-screen.CENTER.flex-col(v-if='state?.dataList.length<=0')
			img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
			.text-lg.text-gray-500.my-2 抱歉！目前暂无竞猜！
	a-modal.radiusModal(v-if='state.showAddGameModal', width='800px', :visible='state.showAddGameModal', :maskClosable='true', :closable='true', :footer='null', @cancel='state.showAddGameModal=false')
		.p-4
			h1.text-psV3Red 创建竞猜 
				span.text-base ({{state.usableCount}}/10)
			p.my-1
				span.text-gray-500 一天同时进行中的竞猜活动最多 
				span.text-psV3Yellow 10个/00:00 重置
			.w-full.my-4
				a-radio-group.w-full.text-center(v-model:value='createGuessGameForm.game_type', size='large', button-style='solid', @change='fetchScheduleList')
					a-radio-button(class='w-1/3', :value='1') 足球
					a-radio-button(class='w-1/3', :value='2') 篮球
					a-radio-button(class='w-1/3', :value='3') 娱乐

			guessFormForSport(v-if='createGuessGameForm.game_type!==3', :game_type='createGuessGameForm.game_type', @closeModal='closeModal', @update='init')
			guessFormForOther(v-if='createGuessGameForm.game_type===3', :game_type='createGuessGameForm.game_type', @closeModal='closeModal', @update='init')

</template>
<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, reactive } from 'vue';
import { guessAnchorList, scheduleList } from '@/api';
import { PlusCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons-vue';
import menuList from '@/components/personal/menuList.vue';
import liveGuessItem from '@/components/personal/liveGuess/liveGuessItem';
import guessFormForSport from '@/components/personal/liveGuess/guessFormForSport';
import guessFormForOther from '@/components/personal/liveGuess/guessFormForOther';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export default {
	components: {
		menuList,
		liveGuessItem,
		guessFormForSport,
		guessFormForOther,
		PlusCircleOutlined,
		ExclamationCircleFilled,
	},
	setup() {
		const store = useStore();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			tabID: '',
			menuTabList: [
				{ title: '全部', value: '' },
				{ title: '进行中', value: 1 },
				{ title: '结算中', value: 2 },
				{ title: '已结束', value: 3 },
				{ title: '取消', value: 0 },
			],
			usableCount: 0,
			fetchDataList: [],
			dataList: [],
			scheduleList: [],
			showAddGameModal: false,
			game_type: 1,
		});
		const createGuessGameForm = reactive({
			eid: null,
			game_type: 1,
			title: '',
			item1: '',
			item2: '',
		});

		const transStartDate = (time) => dayjs(time).format('YYYY MM-DD');
		const transEndTime = (time) => dayjs(time).format('YYYY MM-DD HH:mm');
		const transDurationTime = (time) => {
			if (time - dayjs().unix() <= 0) {
				return '00:00:00:00';
			} else {
				return dayjs.duration(time - dayjs().unix()).format('DD[:]HH[:]mm[:]ss');
			}
		};

		const tabChange = (type = '') => {
			state.tabID = type;
			state.dataList = [];
			setTimeout(() => {
				if (type === '') {
					state.dataList = state.fetchDataList;
				} else {
					state.dataList = state.fetchDataList.filter((game) => game.status === type);
				}
			}, 100);
		};

		const showGameModalHandle = (item) => {
			selectBetItem(item);
			state.showGameModal = true;
		};

		const selectBetItem = (item) => {
			state.cueerntGuessGame = item;
		};

		const addGuessGameHandle = () => {
			state.showAddGameModal = true;
			fetchScheduleList();
		};
		const fetchScheduleList = () => {
			state.scheduleList = [];
			createGuessGameForm.eid = null;
			if (createGuessGameForm.game_type !== 3) {
				let param = {
					page: 1,
					pagesize: 9999,
					liveclassid: createGuessGameForm.game_type,
				};
				if (UID.value) {
					param.uid = Number(UID.value);
				}
				scheduleList(param).then((res) => {
					state.scheduleList = res.data.list;
				});
			}
		};
		const closeModal = () => {
			state.showAddGameModal = false;
		};
		const init = () => {
			guessAnchorList({ page: 1, pagesize: 99999 }).then((res) => {
				const tempArray = res.data.list;
				tempArray.map((item) => {
					// 自主判斷等待中 是否時間結束 若結束 自行更改狀態為 status =2
					const { status, end_time_t } = item;
					const date1 = dayjs().unix();
					const date2 = dayjs(end_time_t);
					const isOverTime = date2.diff(date1) > 0 ? date2.diff(date1) : 0;
					if (isOverTime <= 0 && status === 1) item.status = 2;
				});
				state.fetchDataList = tempArray;
				// 剩餘可用競猜數量 需要排除已取消=0 已結束＝3
				state.usableCount = state.fetchDataList.filter((item) => item?.status !== 0 && item?.status !== 3).length;
				tabChange();
			});
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
			transStartDate,
			transEndTime,
			transDurationTime,
			showGameModalHandle,
			tabChange,
			addGuessGameHandle,
			fetchScheduleList,
			createGuessGameForm,
			closeModal,
		};
	},
};
</script>
<style lang="scss" scoped></style>
