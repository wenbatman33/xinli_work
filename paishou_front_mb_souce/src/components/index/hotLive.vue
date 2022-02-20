<template lang="pug">
//- 熱門直播
.hot-live
	//- 標題
	index-header(icon='/publicAssets/img/index/icon-fire-2-red@3x.png', text='热门直播', more, @click-more='clickMore')

	//- 目前沒有賽事
	empty(v-if='isEmpty', text='目前没有赛事')

	//- 熱門直播列表
	video-list(v-else, :list='state.hotLiveList', path='/index/hotLive')
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { hotLive } from '@/api';
import { matomo_index_check_hotLive } from '@/matomoTrackEvent.js';
import empty from '@/components/empty';
import videoList from '@/components/videoList';
import indexHeader from '@/components/index/indexHeader.vue';

export default {
	components: {
		empty,
		videoList,
		indexHeader,
	},
	setup() {
		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			hotLiveList: [],
		});

		// 資料是否為空
		const isEmpty = computed(() => {
			return !state.hotLiveList || state.hotLiveList.length === 0;
		});

		// 點擊更多按鈕
		const clickMore = () => {
			router.push('/hotlive');
			matomo_index_check_hotLive();
		};

		// On component mounted
		onMounted(() => {
			hotLive().then((res) => {
				const list = res?.data?.list || [];
				state.hotLiveList = list.splice(0, 4);
			});
		});
		return {
			state,
			isEmpty,
			clickMore,
		};
	},
};
</script>
<style lang="scss" scoped>
.hot-live {
	width: 100%;
}
</style>
