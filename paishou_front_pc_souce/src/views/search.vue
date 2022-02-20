<template lang="pug">
.Container.FLEX_C.py-8
	//- search 左側區塊
	.CENTER.rounded.bg-gray-200.p-2.mb-4
		span.text-gray-700 搜寻：
		span.text-psV3Yellow.mx-2 {{route.query.keywords }}
		span.text-gray-700 共找到相关结果
		span.text-psV3Yellow.mx-2 {{ state.searchListAllLength >999? "999+": state.searchListAllLength }} 
		span.text-gray-700 个

	.BETWEEN.min-h-screen
		.funcBar.w-40.pr-2.flex.flex-shrink-0
			//- search 類別區塊
			.searchMenu
				.text-lg.my-4(:class='{"menuItemActive":(state.tabkey===1)}')
					.pl-4.cursor-pointer(@click='clickTab(1)') 全部 ({{state.searchListAllLength}})
				.text-lg.my-4(v-if='state.searchList.game_list', :class='{"menuItemActive":(state.tabkey===2)}')
					.pl-4.cursor-pointer(@click='clickTab(2)') 赛事 ({{state.searchList.game_list.length}})
				.text-lg.my-4(v-if='state.searchList.room_list', :class='{"menuItemActive":(state.tabkey===3)}')
					.pl-4.cursor-pointer(@click='clickTab(3)') 直播间 ({{state.searchList.room_list.length}})
				.text-lg.my-4(v-if='state.searchList.liver_list', :class='{"menuItemActive":(state.tabkey===4)}')
					.pl-4.cursor-pointer(@click='clickTab(4)') 主播 ({{state.searchList.liver_list.length}})

		//- search 右側區塊
		.searchListData.FLEX_C.flex-grow(v-if='state.searchListAllLength>0')
			.my-4(v-if='Object.keys(state.gameList).length>0  && state.tabkey == 1 || state.tabkey == 2')
				games(:dataList='state.gameList')
			.my-4(v-if='state.roomList && state.tabkey == 1 || state.tabkey == 3')
				rooms(:dataList='state.roomList')
			.my-4(v-if='state.liverList && state.tabkey == 1 || state.tabkey == 4')
				livers(:dataList='state.liverList')
		//- search 右側區塊
		.nullListData.CENTER.FLEX_C.flex-grow(v-if='state.searchListAllLength<=0')
			img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
			.text-gray-500.my-2 抱歉，此次搜寻并未找到任何资料，请换关键字试试。
</template>
<script>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { getToken, getUid } from '@/utils';
import { onMounted, computed, reactive, watch, toRaw } from 'vue';
import { searchLiveRoom } from '@/api';
import games from '@/components/searchItems/games.vue';
import livers from '@/components/searchItems/livers.vue';
import rooms from '@/components/searchItems/rooms.vue';
import recommend from '@/components/searchItems/recommend.vue';

export default {
	components: {
		games,
		livers,
		rooms,
		recommend,
	},
	setup() {
		const store = useStore();
		const route = useRoute();
		const state = reactive({
			tabkey: 1,
			searchList: {},
			searchListAllLength: 0,
			gameList: [],
			roomList: [],
			liverList: [],
			// liveRoomList filter裡面是否追蹤主播
			liverFollowList: [],
		});
		const UID = computed(() => store.state.user.uid || '');
		const isLogin = computed(() => store.state.user.token && store.state.user.uid);
		// -
		const clickTab = (val) => {
			state.tabkey = val;
		};
		const init = () => {
			getSearchData();
		};
		watch(
			() => route.query.keywords,
			(newkeyword, prevkeyword) => {
				getSearchData();
			}
		);
		const getSearchData = () => {
			state.tabkey = 1;
			if (route.query.keywords) {
				searchLiveRoom({
					keywords: route.query.keywords,
				}).then((res) => {
					state.searchList = res.data || [];
					const gameLength = state.searchList.game_list ? state.searchList.game_list.length : 0;
					const roomLength = state.searchList.room_list ? state.searchList.room_list.length : 0;
					const liverLength = state.searchList.liver_list ? state.searchList.liver_list.length : 0;
					state.searchListAllLength = gameLength + roomLength + liverLength;

					const gameList = toRaw(state.searchList.game_list);
					const roomList = toRaw(state.searchList.room_list);
					const liverList = toRaw(state.searchList.liver_list);

					// gameList 物件重整
					state.gameList = {};
					if (gameList) {
						state.gameList = [];
						gameList.forEach((item) => {
							state.gameList.push(item);
						});
					}
					state.roomList = roomList;
					state.liverList = liverList;
				});
			}
		};
		onMounted(() => {
			init();
		});
		return {
			store,
			route,
			UID,
			state,
			isLogin,
			clickTab,
			init,
			getSearchData,
		};
	},
};
</script>
<style lang="scss" scoped></style>
