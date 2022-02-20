<template lang="pug">
//- 熱門直播 / 最新直播頁籤列表
.hot-live-tabs
	.grid.grid-cols-2
		//- 熱門直播
		hot-live-tab(icon='/publicAssets/img/hotlive/fire2.png', title='热门直播', :selected='isHotSelected', @click='clickHotLive')

		//- 最新直播
		hot-live-tab(icon='/publicAssets/img/hotlive/lightning.png', title='最新直播', :selected='isNewSelected', @click='clickNewLive')

	//- 分隔線
	divider
</template>
<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import divider from '@/components/divider';
import hotLiveTab from '@/components/hotLive/hotLiveTab.vue';

export default {
	components: {
		divider,
		hotLiveTab,
	},
	props: {
		selected: Number,
	},
	setup(props) {
		// Vue router
		const router = useRouter();

		// 是否選取熱門直播
		const isHotSelected = computed(() => props['selected'] === 0);

		// 是否選取最新直播
		const isNewSelected = computed(() => props['selected'] === 1);

		// 點擊熱門直播按鈕
		const clickHotLive = () => {
			router.replace('/hotlive');
		};

		// 點擊最新直播按鈕
		const clickNewLive = () => {
			router.replace('/newlive');
		};
		return {
			isHotSelected,
			isNewSelected,
			clickHotLive,
			clickNewLive,
		};
	},
};
</script>
<style lang="scss" scoped>
.hot-live-tabs {
	width: 100%;
}
</style>