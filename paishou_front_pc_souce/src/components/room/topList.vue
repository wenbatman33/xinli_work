<template lang="pug">
.topList.FLEX_C
	a-tabs.w-full(type='card', :tabBarGutter='0' :animated='false', @change='tabChange')
		a-tab-pane(key='1', tab='日榜')
			.daily_list.h-30.py-2
				.grid.grid-cols-3.gap-4(v-if='D_LIST.length>0')
					.col-span-1.text-center.px-2.h-full
						.h-full.CENTER_C.relative(v-if='D_LIST[1]')
							.w-12.h-12.rounded-full.overflow-hidden.bg-gray-200
								img.w-full(:src='D_LIST[1].avatar || "/publicAssets/img/v3/default.png"')
							img.w-7.my-1(v-if='userLevelThumb(D_LIST[1].level)', :src='userLevelThumb(D_LIST[1].level)')
							h5.w-20.truncate.name {{ D_LIST[1].user_nicename }}
					.col-span-1.text-center.px-22.h-full
						.h-full.CENTER_C.relative(v-if='D_LIST[0]')
							.top_1.w-6.h-4.absolute.text-center(style='top:-16px')
								img.w-8(src='/publicAssets/img/v3/icon-crown@3x.png')
							.w-16.h-16.rounded-full.overflow-hidden.bg-gray-200
								img.w-full(:src='D_LIST[0].avatar || "/publicAssets/img/v3/default.png"')
							img.w-7.my-1(v-if='userLevelThumb(D_LIST[0].level)', :src='userLevelThumb(D_LIST[0].level)')
							h5.w-20.truncate.name {{ D_LIST[0].user_nicename }}
					.col-span-1.text-center.px-22.h-full
						.h-full.CENTER_C.relative(v-if='D_LIST[2]')
							.w-12.h-12.rounded-full.overflow-hidden.bg-gray-200
								img.w-full(:src='D_LIST[2].avatar || "/publicAssets/img/v3/default.png"')
							img.w-7.my-1(v-if='userLevelThumb(D_LIST[2].level)', :src='userLevelThumb(D_LIST[2].level)')
							h5.w-20.truncate.name {{ D_LIST[2].user_nicename }}
				.grid.grid-cols-1.gap-4(v-else)
					.col-span-1
						.text-center.text-xs.text-gray-500.mt-8 头号粉丝，就是你

		a-tab-pane(key='2', tab='周榜')
			.daily_list.h-30.py-2
				.grid.grid-cols-3.gap-4(v-if='W_LIST.length>0')
					.col-span-1.text-center.px-2.h-full
						.h-full.CENTER_C.relative(v-if='W_LIST[1]')
							.w-12.h-12.rounded-full.overflow-hidden.bg-gray-200
								img.w-full(:src='W_LIST[1].avatar || "/publicAssets/img/v3/default.png"')
							img.w-7.my-1(v-if='userLevelThumb(W_LIST[1].level)', :src='userLevelThumb(W_LIST[1].level)')
							h5.w-20.truncate.name {{ W_LIST[1].user_nicename }}
					.col-span-1.text-center.px-22.h-full
						.h-full.CENTER_C.relative(v-if='W_LIST[0]')
							.top_1.w-6.h-4.absolute.text-center(style='top:-16px')
								img.w-8(src='/publicAssets/img/v3/icon-crown@3x.png')
							.w-16.h-16.rounded-full.overflow-hidden.bg-gray-200
								img.w-full(:src='W_LIST[0].avatar || "/publicAssets/img/v3/default.png"')
							img.w-7.my-1(v-if='userLevelThumb(W_LIST[0].level)', :src='userLevelThumb(W_LIST[0].level)')
							h5.w-20.truncate.name {{ W_LIST[0].user_nicename }}
					.col-span-1.text-center.px-22.h-full
						.h-full.CENTER_C.relative(v-if='W_LIST[2]')
							.w-12.h-12.rounded-full.overflow-hidden.bg-gray-200
								img.w-full(:src='W_LIST[2].avatar || "/publicAssets/img/v3/default.png"')
							img.w-7.my-1(v-if='userLevelThumb(W_LIST[2].level)', :src='userLevelThumb(W_LIST[2].level)')
							h5.w-20.truncate.name {{ W_LIST[2].user_nicename }}
				.grid.grid-cols-1.gap-4(v-else)
					.col-span-1
						.text-center.text-xs.text-gray-500.mt-8 头号粉丝，就是你
		a-tab-pane(key='3', tab='月榜')
			.daily_list.h-30.py-2
				.grid.grid-cols-3.gap-4(v-if='M_LIST.length>0')
					.col-span-1.text-center.px-2.h-full
						.h-full.CENTER_C.relative(v-if='M_LIST[1]')
							.w-12.h-12.rounded-full.overflow-hidden.bg-gray-200
								img.w-full(:src='M_LIST[1].avatar || "/publicAssets/img/v3/default.png"')
							img.w-7.my-1(v-if='userLevelThumb(M_LIST[1].level)', :src='userLevelThumb(M_LIST[1].level)')
							h5.w-20.truncate.name {{ M_LIST[1].user_nicename }}
					.col-span-1.text-center.px-22.h-full
						.h-full.CENTER_C.relative(v-if='M_LIST[0]')
							.top_1.w-6.h-4.absolute.text-center(style='top:-16px')
								img.w-8(src='/publicAssets/img/v3/icon-crown@3x.png')
							.w-16.h-16.rounded-full.overflow-hidden.bg-gray-200
								img.w-full(:src='M_LIST[0].avatar || "/publicAssets/img/v3/default.png"')
							img.w-7.my-1(v-if='userLevelThumb(M_LIST[0].level)', :src='userLevelThumb(M_LIST[0].level)')
							h5.w-20.truncate.name {{ M_LIST[0].user_nicename }}
					.col-span-1.text-center.px-22.h-full
						.h-full.CENTER_C.relative(v-if='M_LIST[2]')
							.w-12.h-12.rounded-full.overflow-hidden.bg-gray-200
								img.w-full(:src='M_LIST[2].avatar || "/publicAssets/img/v3/default.png"')
							img.w-7.my-1(v-if='userLevelThumb(M_LIST[2].level)', :src='userLevelThumb(M_LIST[2].level)')
							h5.w-20.truncate.name {{ M_LIST[2].user_nicename }}
				.grid.grid-cols-1.gap-4(v-else)
					.col-span-1
						.text-center.text-xs.text-gray-500.mt-8 头号粉丝，就是你
	a-divider.m-0
</template>

<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, reactive, toRaw } from 'vue';
import { topList } from '@/api';
import { matomo_liveRoom_rank_day, matomo_liveRoom_rank_week, matomo_liveRoom_rank_month } from '@/matomoEvent';
import { userLevelThumb } from '@/utils';

export default {
	setup() {
		const store = useStore();
		const router = useRouter();
		const route = useRoute();
		const state = reactive({
			dailyList: [],
			weekList: [],
			monthList: [],
			top3Assets: [
				{
					rank: '/publicAssets/img/classify/rank_1.png',
					gift: '/publicAssets/img/classify/rankGift_1.png',
					color: '#ff9a00',
				},
				{
					rank: '/publicAssets/img/classify/rank_2.png',
					gift: '/publicAssets/img/classify/rankGift_2.png',
					color: '#c6c6c9',
				},
				{
					rank: '/publicAssets/img/classify/rank_3.png',
					gift: '/publicAssets/img/classify/rankGift_3.png',
					color: '#c6a375',
				},
			],
		});
		const D_LIST = computed(() => (state.dailyList ? state.dailyList.filter((task, index) => index < 3) : []));
		const W_LIST = computed(() => (state.weekList ? state.weekList.filter((task, index) => index < 3) : []));
		const M_LIST = computed(() => (state.monthList ? state.monthList.filter((task, index) => index < 3) : []));
		const init = () => {
			topList({ live_id: route.params.id }).then((res) => {
				state.dailyList = res.data.daily;
				state.weekList = res.data.week;
				state.monthList = res.data.month;
			});
		};
		const tabChange = (val) => {
			if (val === '1') {
				matomo_liveRoom_rank_day();
			} else if (val === '2') {
				matomo_liveRoom_rank_week();
			} else if (val === '3') {
				matomo_liveRoom_rank_month();
			}
		};
		const showUserLoginModal = () => {
			store.commit('user/SHOW_LOGIN_MODEL', 1);
		};
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			route,
			router,
			D_LIST,
			W_LIST,
			M_LIST,
			tabChange,
			userLevelThumb,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.ant-tabs-nav.ant-tabs-nav-animated) {
	width: 100%;
}
::v-deep(.ant-tabs-tab-active.ant-tabs-tab) {
	text-align: center;
}
::v-deep(.ant-tabs-tab) {
	text-align: center;
}
::v-deep(.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active) {
	height: 40px;
	// color: #1890ff;
	background: #fff;
	text-align: center;
}

::v-deep(.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab) {
	width: 33.3%;
	height: 40px;
	margin: 0;
	margin-right: 2px;
	padding: 0 16px;
	line-height: 38px;
	background: #fafafa;
}
</style>
