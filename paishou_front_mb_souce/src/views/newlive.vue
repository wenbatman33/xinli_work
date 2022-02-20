<template lang="pug">
//- 最新直播
.new-live.pb-8
	//- 導航欄
	nav-bar(title='推荐直播', right-button='/publicAssets/img/icon-close-red@3x.png', @click-right='clickRight')

	//- 分類欄
	hot-live-tabs(:selected='1')

	//- 下拉刷新
	van-pull-refresh(v-model='state.isLoading', @refresh='refresh')
		//- 目前沒有紀錄
		empty.mt-12(v-if='isEmpty')

		//- 直播列表
		video-list(v-else, :list='state.newLiveList')
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { newLive } from '@/api';
import empty from '@/components/empty';
import navBar from '@/components/navBar';
import videoList from '@/components/videoList';
import hotLiveTabs from '@/components/hotLive/hotLiveTabs.vue';

export default {
	components: {
		empty,
		navBar,
		videoList,
		hotLiveTabs,
	},
	setup() {
		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			isLoading: false,
			newLiveList: [],
		});

		// 資料是否為空
		const isEmpty = computed(() => {
			return !state.newLiveList || state.newLiveList.length === 0;
		});

		// 取得最新直播列表
		const getNewLiveList = () => {
			// Update loading state
			state.isLoading = true;

			// Get query
			const query = {
				quantity: 100,
			};

			// Get new live list
			newLive(query)
				.then((res) => {
					// Update live list
					state.newLiveList = res.data.list || [];

					// Update empty state
					state.isListEmpty = state.newLiveList.length === 0;

					// Revert loading state on finished
					state.isLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.isLoading = false;
				});
		};

		// On component mountet
		onMounted(() => {
			getNewLiveList();
		});

		// 下拉刷新
		const refresh = () => {
			getNewLiveList();
		};

		// 點擊導覽欄返回按鈕
		const clickRight = () => {
			router.go(-1);
		};
		return {
			state,
			isEmpty,
			refresh,
			clickRight,
		};
	},
};
</script>
<style lang="scss" scoped>
.new-live {
	width: 100%;
}
</style>