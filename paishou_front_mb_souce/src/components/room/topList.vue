<template lang="pug">
//- 貢獻榜
.w-full.flex-grow.bg-top-list.mt-4
	van-tabs(type='card', @change='changeTab')
		//- 日榜
		van-tab(key='1', title='日榜')
			top-list-container(:list='state.dailyList')

		//- 周榜
		van-tab(key='2', title='周榜')
			top-list-container(:list='state.weekList')

		//- 月榜
		van-tab(key='3', title='月榜')
			top-list-container(:list='state.monthList')
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted, reactive } from 'vue';
import { topList } from '@/api';
import { matomo_room_topList_day, matomo_room_topList_week, matomo_room_topList_month } from '@/matomoTrackEvent.js';
import topListContainer from '@/components/room/topListContainer.vue';

export default {
	components: {
		topListContainer,
	},
	setup() {
		// Vue router
		const route = useRoute();

		// Component state
		const state = reactive({
			dailyList: [],
			weekList: [],
			monthList: [],
		});

		// 改變頁籤
		const changeTab = (index) => {
			if (index === 0) {
				matomo_room_topList_day();
			} else if (index === 1) {
				matomo_room_topList_week();
			} else if (index === 2) {
				matomo_room_topList_month();
			}
		}
		
		// On component mounted
		onMounted(() => {
			topList({ live_id: route.params.id }).then((res) => {
				state.dailyList = res?.data?.daily || [];
				state.weekList = res?.data?.week || [];
				state.monthList = res?.data?.month || [];
			});
		});
		return {
			state,
			changeTab,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.van-tabs--card>.van-tabs__wrap) {
	height: 38px;
}
::v-deep(.van-tabs__nav--card) {
	height: 38px;
}
::v-deep(.van-tabs__nav--card) {
	border: transparent;
	background-color: #F4F4F4;
	border-radius: 4px;
}
::v-deep(.van-tab.van-tab--active) {
	background-color: #F8B62D;
	border-right: transparent;
	border-radius: 4px;
}
::v-deep(.van-tabs__nav--card .van-tab) {
	border-right: transparent;
}
.bg-top-list {
	background: #fafafa;
}
</style>
