<template lang="pug">
//- 直播間
.w-full.min-h-full.flex.flex-col.items-stretch
	//- 導覽欄
	room-nav-bar

	//- 直播影片
	ps-player

	//- 直播結束
	off-live-video

	//- 相同賽事直播列表
	like-list

	//- 分隔線
	divider

	//- 公告列表
	notice-list

	//- 分隔線
	divider

	//- 營運看板列表
	banner-list

	//- 頁籤列表
	van-tabs(:active='state.activeTab', @change='changeTab')
		van-tab(title='聊天', name='chat')
		van-tab(title='主播', name='info')
		van-tab(title='贡献榜', name='toplist')
		van-tab(title='任务', name='tasklist')
		van-tab(title='竞猜', name='guesslist')

	//- 分隔線
	divider

	//- 頁籤內容
	.relative.flex-grow
		//- 聊天室
		chat(v-if='state.activeTab === "chat"')

		//- 主播詳細資訊
		anchor-detail(v-else-if='state.activeTab === "info"')

		//- 貢獻榜
		top-list(v-else-if='state.activeTab === "toplist"')

		//- 任務
		task-list(v-else-if='state.activeTab === "tasklist"')

		//- 競猜
		guess-list(v-else-if='state.activeTab === "guesslist"')
</template>
<script>
import { reactive, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { matomo_room_check_chat, matomo_room_check_anchorDetail, matomo_room_topList_day, matomo_room_check_guessList, matomo_room_check_taskList } from '@/matomoTrackEvent.js';
import roomNavBar from '@/components/room/roomNavBar.vue';
import divider from '@/components/divider';
import psPlayer from '@/components/psPlayer';
import offLiveVideo from '@/components/room/offLiveVideo.vue';
import likeList from '@/components/room/likeList.vue';
import noticeList from '@/components/room/noticeList.vue';
import bannerList from '@/components/room/bannerList.vue';
import chat from '@/components/room/chat.vue';
import anchorDetail from '@/components/room/anchorDetail.vue';
import topList from '@/components/room/topList.vue';
import taskList from '@/components/room/taskList.vue';
import guessList from '@/components/room/guessList.vue';

export default {
	components: {
		roomNavBar,
		divider,
		psPlayer,
		offLiveVideo,
		likeList,
		noticeList,
		bannerList,
		chat,
		anchorDetail,
		topList,
		taskList,
		guessList,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const route = useRoute();
		const router = useRouter();

		// Component state
		const state = reactive({
			jigsawInterval: null,
			activeTab: route?.query?.tab || 'chat',
		});

		// 是否為登入狀態
		const isLogin = computed(() => {
			return store.getters['user/IS_LOGIN'];
		});

		// 改變頁籤
		const changeTab = (name) => {
			// Update active tab
			state.activeTab = name;

			// Update query
			router.replace({
				query: {
					tab: name,
				},
			});

			// Validate login state
			if (name === 'tasklist' && !isLogin.value) {
				window.localStorage.setItem('tempUrl', route.path);
				router.push('/login');
			} else if (name === 'guesslist' && !isLogin.value) {
				window.localStorage.setItem('tempUrl', route.path);
				router.push('/login');
			}

			// Matomo track
			if (name === 'chat') {
				matomo_room_check_chat();
			} else if (name === 'info') {
				matomo_room_check_anchorDetail(route.params.id);
			} else if (name === 'toplist') {
				matomo_room_topList_day();
			} else if (name === 'tasklist') {
				matomo_room_check_taskList();
			} else if (name === 'guesslist') {
				matomo_room_check_guessList();
			}
		};

		// On component mounted
		onMounted(() => {
			// Update room uid
			store.dispatch('socket/UPDATE_UID', Number(route.params.id));

			// Start event 011 jigsaw update interval
			state.jigsawInterval = setInterval(() => {
				store.dispatch('socket/GET_JIGSAW_INFO');
			}, 1000 * 60 * 10);
		});

		// On component unmounted
		onUnmounted(() => {
			// Disconnect socket
			store.dispatch('socket/DISCONNECT_SOCKET');

			// Reset room info
			store.commit('socket/RESET');

			// Clear event 011 jigsaw update interval
			clearTimeout(state.jigsawInterval);
		});
		return {
			state,
			changeTab,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.van-tabs__line) {
	background-color: #a62337;
}
::v-deep(.van-tab) {
	color: #969696;
}
::v-deep(.van-tab--active) {
	color: #a62337;
	font-weight: bold;
}
</style>
