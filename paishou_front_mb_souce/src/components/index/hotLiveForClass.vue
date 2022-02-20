<template lang="pug">
//- 分類熱門直播
.hot-live-for-class(v-if='!hideIfEmpty || !isEmpty')
	//- 標題
	index-header(icon='/publicAssets/img/index/icon-fire-2-red@3x.png', :text='title', :more='more', @click-more='clickMore')
	
	//- 目前沒有賽事
	empty(v-if='isEmpty', text='目前没有赛事')

	//- 熱門直播列表
	video-list(v-else, :list='state.classLiveList', :path='path', :class-name='className')
</template>
<script>
import { onMounted, reactive, computed } from 'vue';
import { liveClassList } from '@/api';
import { matomo_index_check_classLive } from '@/matomoTrackEvent.js';
import empty from '@/components/empty';
import videoList from '@/components/videoList';
import indexHeader from '@/components/index/indexHeader.vue';

export default {
	props: {
		path: String,
		classId: Number,
		className: String,
		limitCount: Number,
		hideIfEmpty: Boolean,
		more: Boolean,
	},
	components: {
		empty,
		videoList,
		indexHeader,
	},
	emits: ['click-more'],
	setup(props, { emit }) {
		// Component state
		const state = reactive({
			classLiveList: [],
		});

		// 資料是否為空
		const isEmpty = computed(() => {
			return !state.classLiveList || state.classLiveList.length === 0
		});

		// 標題
		const title = computed(() => {
			return `${props.className}热门直播`;
		});

		// 點擊更多按鈕
		const clickMore = () => {
			emit('click-more');
			matomo_index_check_classLive(props.className);
		};
		
		// On component mounted
		onMounted(() => {
			liveClassList({ liveclassid: props.classId }).then((res) => {
				const classLiveList = res?.data?.list || [];
				if (props.limitCount > 0) {
					state.classLiveList = classLiveList.splice(0, props.limitCount);
				} else {
					state.classLiveList = classLiveList;
				}
			});
		});
		return {
			state,
			isEmpty,
			title,
			clickMore,
		};
	},
};
</script>
<style lang="scss" scoped>
.hot-live-for-class {
	width: 100%;
	height: auto;
}
</style>
