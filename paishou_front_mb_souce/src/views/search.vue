<template lang="pug">
//- 搜尋
.w-full.pb-4
	//- 搜尋欄
	nav-bar(:keyword='state.keyword', @update:keyword='updateKeyword', @click-back='clickBack', @click-search='submit')

	//- 搜尋結果
	van-tabs(v-if='!isKeywordEmpty', v-model:active='state.activeTab', swipeable)
		//- 全部
		van-tab(title='全部') 
			.flex.flex-col
				//- 分隔線
				divider

				//- 下拉刷新
				van-pull-refresh(v-model='state.isLoading', @refresh='submit')
					//- 目前沒有紀錄
					empty.mt-12(v-if='isAllEmpty')

					//- 主播
					search-header.mt-4(v-if='!isLiverEmpty', icon='/publicAssets/img/search/diamond@3x.png', text='主播', more, @click-more='clickMoreLiver')
					concern-list(v-if='!isLiverEmpty', :list='liverListLimited', path='/search')

					//- 賽程
					search-header.mt-4(v-if='!isGameEmpty', icon='/publicAssets/img/search/game@3x.png', text='赛程', more, @click-more='clickMoreGame')
					schedule-list(v-if='!isGameEmpty', :list='gameListLimited', path='/search', @update:appointment='updateAppointment')

					//- 直播
					search-header.mt-4(v-if='!isRoomEmpty', icon='/publicAssets/img/search/liveroom@3x.png', text='直播间', more, @click-more='clickMoreRoom')
					video-list(v-if='!isRoomEmpty', :list='roomListLimited', path='/search')

		//- 主播
		van-tab(title='主播')
			.flex.flex-col
				//- 分隔線
				divider

				//- 下拉刷新
				van-pull-refresh(v-model='state.isLoading', @refresh='submit')
					//- 目前沒有紀錄
					empty.mt-12(v-if='isLiverEmpty')

					//- 主播
					search-header.mt-4(v-if='!isLiverEmpty', icon='/publicAssets/img/search/diamond@3x.png', text='主播')
					concern-list(v-if='!isLiverEmpty', :list='state.liverList', path='/search')

		//- 賽程
		van-tab(title='赛程') 
			.flex.flex-col
				//- 分隔線
				divider

				//- 下拉刷新
				van-pull-refresh(v-model='state.isLoading', @refresh='submit')
					//- 目前沒有紀錄
					empty.mt-12(v-if='isGameEmpty')

					//- 賽程
					search-header.mt-4(v-if='!isGameEmpty', icon='/publicAssets/img/search/game@3x.png', text='赛程')
					schedule-list(v-if='!isGameEmpty', :list='state.gameList', path='/search', @update:appointment='updateAppointment')

		//- 直播間
		van-tab(title='直播间')
			.flex.flex-col
				//- 分隔線
				divider

				//- 下拉刷新
				van-pull-refresh(v-model='state.isLoading', @refresh='submit')
					//- 目前沒有紀錄
					empty.mt-12(v-if='isRoomEmpty')

					//- 直播
					search-header.mt-4(v-if='!isRoomEmpty', icon='/publicAssets/img/search/liveroom@3x.png', text='直播间')
					video-list.mt-2(v-if='!isRoomEmpty', :list='state.roomList', path='/search')
</template>
<script>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { searchLiveRoom } from '@/api';
import { matomo_search_search } from '@/matomoTrackEvent.js';
import empty from '@/components/empty';
import divider from '@/components/divider';
import videoList from '@/components/videoList';
import navBar from '@/components/search/navBar.vue';
import searchHeader from '@/components/search/searchHeader.vue';
import concernList from '@/components/concern/concernList.vue';
import scheduleList from '@/components/schedule/scheduleList.vue';

export default {
	components: {
		empty,
		divider,
		videoList,
		navBar,
		searchHeader,
		concernList,
		scheduleList,
	},
	setup() {
		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			activeTab: 0,
			keyword: '',
			isLoading: false,
			liverList: [],
			gameList: [],
			roomList: [],
			roomListLimited: [],
		});

		// 最多四筆的主播列表
		const liverListLimited = computed(() => {
			return state.liverList.slice(0, 4);
		});

		// 最多四筆的賽程列表
		const gameListLimited = computed(() => {
			return state.gameList.slice(0, 4);
		});

		// 最多四筆的直播列表
		const roomListLimited = computed(() => {
			return state.roomList.slice(0, 4);
		});

		// 主播列表是否為空
		const isLiverEmpty = computed(() => {
			return state.liverList.length === 0;
		});

		// 賽程列表是否為空
		const isGameEmpty = computed(() => {
			return state.gameList.length === 0;
		});

		// 直播列表是否為空
		const isRoomEmpty = computed(() => {
			return state.roomList.length === 0;
		});

		// 全部列表是否為空
		const isAllEmpty = computed(() => {
			return isLiverEmpty.value && isGameEmpty.value && isRoomEmpty.value;
		});

		// 搜尋關鍵字是否為空
		const isKeywordEmpty = computed(() => {
			return !state.keyword || state.keyword.length === 0;
		});

		// 提交搜尋
		const submit = () => {
			// Skip if keyword empty
			if (isKeywordEmpty.value) {
				state.liverList = [];
				state.gameList = [];
				state.roomList = [];
				return;
			}
			
			// Update searching state
			state.isLoading = true;

			// Get query
			const query = {
				keywords: state.keyword,
			};

			// Search with keyword
			searchLiveRoom(query)
				.then((res) => {
					// Validate response code and update data state
					if (res.code === 0) {
						// Liver list
						state.liverList = res.data.liver_list || [];

						// Game list
						state.gameList = res.data.game_list || [];

						// Room list
						state.roomList = res.data.room_list || [];
					}

					// Revert searching state on finish
					state.isLoading = false;
				})
				.catch(() => {
					// Revert searching state on error
					state.isLoading = false;
				});

			// Matomo track
			matomo_search_search(state.keyword);
		};

		// 搜尋關鍵字改變
		const updateKeyword = (value) => {
			state.keyword = value || '';
			submit();
		};

		// 更新預約狀態
		const updateAppointment = ({ eid, is_appointment }) => {
			state.gameList = state.gameList.map((element) => {
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

		// 點擊導覽欄返回按鈕
		const clickBack = () => {
			if (state.keyword.length > 0) {
				updateKeyword('');
			} else {
				router.go(-1);
			}
		};

		// 點擊查看更多主播
		const clickMoreLiver = () => {
			state.activeTab = 1;
		};

		// 點擊查看更多賽事
		const clickMoreGame = () => {
			state.activeTab = 2;
		};

		// 點擊查看更多直播間
		const clickMoreRoom = () => {
			state.activeTab = 3;
		};
		return {
			state,
			liverListLimited,
			gameListLimited,
			roomListLimited,
			isLiverEmpty,
			isGameEmpty,
			isRoomEmpty,
			isAllEmpty,
			isKeywordEmpty,
			submit,
			updateKeyword,
			updateAppointment,
			clickBack,
			clickMoreLiver,
			clickMoreGame,
			clickMoreRoom,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.van-search__content) {
	border: 1.5px solid #f3f3f3;
	background-color: transparent;
}
::v-deep(.van-tab__text) {
	font-weight: bold;
}
::v-deep(.van-tab--active) {
	color: #a62337;
}
::v-deep(.van-tabs__line) {
	background-color: #a62337;
}
</style>
