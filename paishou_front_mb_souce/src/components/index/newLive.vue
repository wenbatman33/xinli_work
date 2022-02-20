<template lang="pug">
//- 最新直播
.new-live
	//- 標題
	index-header(icon='/publicAssets/img/index/icon-lightning-red@3x.png', text='最新直播', more, @click-more='clickMore')

	//- 目前沒有賽事
	empty(v-if='isEmpty', text='目前没有赛事')

	//- 熱門直播列表
	video-list(v-else, :list='state.newLiveList', path='/index/newLive')
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { newLive } from '@/api';
import { matomo_index_check_newLive } from '@/matomoTrackEvent.js';
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
			newLiveList: [],
		});

		// 資料是否為空
		const isEmpty = computed(() => {
			return !state.newLiveList || state.newLiveList.length === 0;
		});

		// 點擊更多按鈕
		const clickMore = () => {
			router.push('/newlive');
			matomo_index_check_newLive();
		};

		// On component mounted
		onMounted(() => {
			newLive().then((res) => {
				const list = res?.data?.list || [];
				state.newLiveList = list.splice(0, 4);
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
.new-live {
	width: 100%;
}
</style>
