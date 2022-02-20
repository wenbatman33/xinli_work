<template lang="pug">
.main
	liveBanner
	.flex.justify-center
		#Container.Container.BETWEEN.relative
			.center.justify-between.flex-1.pb-8
				.indexContent.FLEX_C.justify-start
					schedule
					slideBanner(:slide_cid='12' :autoPlaySpeed='5000')
					//- guessaAndArticle
					hotLive
					noticeBox
					hotAnchor
					newLive
					div(v-if='currentClassList', v-for='(item, index) in currentClassList')
						hotLiveForClass(:classID='item.id')
			floatBar
	overLayerForIndex
</template>

<script>
import { useStore } from 'vuex';
import { onMounted, reactive, computed } from 'vue';
import liveBanner from '@/components/index/liveBanner.vue';
import schedule from '@/components/index/schedule.vue';
import guessaAndArticle from '@/components/index/guessaAndArticle.vue';
import hotLive from '@/components/index/hotLive.vue';
import noticeBox from '@/components/index/noticeBox.vue';
import hotAnchor from '@/components/index/hotAnchor.vue';
import hotLiveForClass from '@/components/index/hotLiveForClass.vue';
import newLive from '@/components/index/newLive.vue';
import floatBar from '@/components/index/floatBar.vue';
import slideBanner from '@/components/swipers/slideBanner.vue';
import overLayerForIndex from '@/components/overLayerBanner/overLayerForIndex';

export default {
	name: 'index',
	components: {
		liveBanner,
		schedule,
		guessaAndArticle,
		hotLive,
		noticeBox,
		hotAnchor,
		newLive,
		floatBar,
		slideBanner,
		hotLiveForClass,
		overLayerForIndex,
	},
	setup() {
		const store = useStore();
		const currentClassList = computed(() => store.state.config.currentclassList);
		const state = reactive({
			adBannerList: null,
		});
		const init = () => {
			const tempArray = [];
		};
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			currentClassList,
		};
	},
};
</script>

<style lang="scss" scoped>
.indexContent {
	width: 1200px;
	min-height: 600px;
}
.leftADBanner,
.rightADBanner {
	width: 200px;
	overflow: hidden;
}
</style>
