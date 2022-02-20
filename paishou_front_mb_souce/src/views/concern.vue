<template lang="pug">
//- 關注
.concern.flex.flex-col.pb-16
	//- 導覽欄
	nav-bar(title='关注', right-button='/publicAssets/img/concern/icon-activity-plus@3x.png', @click-right='clickRight')

	//- 下拉刷新
	van-pull-refresh.pb-4(v-model='state.isLoading', @refresh='refresh')
		//- 沒有關注的主播或賽事
		empty.mt-16(v-if='isEmpty', text='没有关注的主播或赛事')

		//- 關注列表
		concern-list(v-else, :list='state.followList')
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { followsListV2 } from '@/api';
import { matomo_concern_hotAnchor } from '@/matomoTrackEvent.js';
import navBar from '@/components/navBar';
import empty from '@/components/empty';
import concernList from '@/components/concern/concernList.vue';

export default {
	components: {
		navBar,
		empty,
		concernList,
	},
	setup() {
		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			isLoading: false,
			followList: [],
		});

		// 資料是否為空
		const isEmpty = computed(() => {
			return !state.followList || state.followList.length === 0;
		});

		// 取得關注主播列表
		const getFollowList = () => {
			// Update search state
			state.isLoading = true;

			// Get follow list
			followsListV2()
				.then((res) => {
					// Update follow list
					state.followList = res?.data?.list || [];
					state.followList.forEach((element) => (element.is_follow = true));

					// Revert search state on finished
					state.isLoading = false;
				})
				.catch(() => {
					// Revert search state on error
					state.isLoading = false;
				});
		};

		// On component mounted
		onMounted(() => {
			getFollowList();
		});

		// 下拉刷新
		const refresh = () => {
			getFollowList();
		};

		// 點擊導覽欄星星按鈕
		const clickRight = () => {
			router.push('/hotanchor');
			matomo_concern_hotAnchor();
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
.concern {
	width: 100%;
}
</style>
