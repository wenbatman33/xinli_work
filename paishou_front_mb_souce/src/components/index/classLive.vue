<template lang="pug">
//- 分類
.w-full.flex.flex-col.pb-8
	//- 分隔線
	divider

	//- 廣告
	class-live-banner(:class-id='classId')

	//- 公告跑馬燈
	notice-bar(path='/classLive')

	//- 精彩賽事
	schedule-list(:class-id='classId')
	
	//- 分類直播
	hot-live-for-class(:class-id='classId', :class-name='className', path='/classLive')
</template>
<script>
import { onMounted, reactive } from 'vue';
import { liveClassList, bulltein } from '@/api';
import divider from '@/components/divider';
import classLiveBanner from '@/components/index/classLiveBanner';
import videoItem from '@/components/videoItem';
import noticeBar from '@/components/index/noticeBar.vue';
import hotLiveForClass from '@/components/index/hotLiveForClass.vue';
import scheduleList from '@/components/index/scheduleList.vue';

export default {
	components: {
		divider,
		classLiveBanner,
		videoItem,
		noticeBar,
		hotLiveForClass,
		scheduleList,
	},
	props: {
		classId: Number,
		className: String,
	},
	setup(props) {
		// Component state
		const state = reactive({
			dataList: [],
			indexBulltein: null,
		});
		
		// On component mounted
		onMounted(() => {
			liveClassList({
				liveclassid: props.classId,
			}).then((res) => {
				state.dataList = res.data.list;
			});
			bulltein().then((res) => {
				state.indexBulltein = res.data.list;
			});
		});
		return {
			state,
		};
	},
};
</script>