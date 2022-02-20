<template lang="pug">
//- 推薦主播
.hotanchor.flex.flex-col
	//- 導覽欄
	nav-bar(title='推荐主播', icon='/publicAssets/img/hotanchor/icon-activity@3x.png', right-button='/publicAssets/img/icon-close-red@3x.png', @click-right='clickRight')

	//- 下拉刷新
	van-pull-refresh.pb-4(v-model='state.isLoading', @refresh='refresh')
		//- 目前沒有紀錄
		empty.m-16(v-if='isEmpty')

		//- 推薦列表
		concern-list(v-else, :list='state.hotAnchourList')
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { hotNanchour } from '@/api';
import navBar from '@/components/navBar';
import empty from '../components/empty';
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
			hotAnchourList: [],
		});

		// 資料是否為空
		const isEmpty = computed(() => {
			return !state.hotAnchourList || state.hotAnchourList.length === 0;
		});

		// 取得熱門主播列表
		const getHotAnchourList = () => {
			// Update loading state
			state.isLoading = true;
			
			// Get query
			const query = {
				pagesize: 9999,
			};

			// Get hot anchor list
			hotNanchour(query)
				.then((res) => {
					// Update anchour list
					state.hotAnchourList = res.data.list || [];

					// Revert loading state on finished
					state.isLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.isLoading = false;
				});
		};

		// On component mounted
		onMounted(() => {
			getHotAnchourList();
		});

		// 下拉刷新
		const refresh = () => {
			getHotAnchourList();
		};

		// 點擊導覽欄關閉按鈕
		const clickRight = () => {
			router.go(-1);
		};
		return {
			state,
			isEmpty,
			clickRight,
			refresh,
		};
	},
};
</script>
<style lang="scss" scoped>
.hotanchor {
	width: 100%;
}
</style>
