<template lang="pug">
//- 熱門直播
.hot-live.pb-8
	//- 導航欄
	nav-bar(title='推荐直播', right-button='/publicAssets/img/icon-close-red@3x.png', @click-right='clickRight')

	//- 分類欄
	hot-live-tabs(:selected='0')

	//- 下拉刷新
	van-pull-refresh(v-model='state.isLoading', @refresh='refresh')
		//- 目前沒有紀錄
		empty.mt-12(v-if='isEmpty')

		//- 直播列表
		video-list(v-else, :list='state.hotLiveList')
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { hotLive } from '@/api';
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
			hotLiveList: [],
		});

		// 資料是否為空
		const isEmpty = computed(() => {
			return !state.hotLiveList || state.hotLiveList.length === 0;
		});

		// 取得熱門直播列表
		const getHotLiveList = () => {
			// Update loading state
			state.isLoading = true;

			// Get query
			const query = {
				quantity: 100,
			};

			// Get hot live list
			hotLive(query)
				.then((res) => {
					// Update live list
					state.hotLiveList = res.data.list || [];

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
			getHotLiveList();
		});

		// 下拉刷新
		const refresh = () => {
			getHotLiveList();
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
.hot-live {
	width: 100%;
}
</style>