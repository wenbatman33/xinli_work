<template lang="pug">
//- 直播物件
van-button.video-item.rounded.shadow(@click='clickLive')
	.p-2
		//- 圖片
		.video-img
			img(:src='thumb', @error='errorVideoImg')
			loading-anitmate

		//- 標題
		.video-title.text-sm.font-semibold.mt-1 {{ title }}

		//- 暱稱
		.video-anchor.text-xs.font-normal.mt-1 {{ name }}

		//- 熱度
		.flex.flex-row.items-center.mt-1
			//- 圖示
			img.w-4.h-4(src='/publicAssets/img/videoitem/icon-fire@3x.png')

			//- 數值
			.video-nums.text-xs.font-normal.ml-1 {{ heat }}
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { heatFormat } from '@/utils';
import { matomo_index_newLive_watch, matomo_index_hotLive_watch, matomo_index_classLive_watch, matomo_classLive_watch, matomo_search_watch } from '@/matomoTrackEvent.js';
import loadingAnitmate from '@/components/loadingAnitmate';

export default {
	components: {
		loadingAnitmate,
	},
	props: {
        path: String,
		className: String,
		videoData: Object,
	},
	setup(props) {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// 預設直播預覽圖base64
		const errorImg = computed(() => {
			return store?.state?.config?.errorImg;
		});

		// 直播預覽圖
		const thumb = computed(() => {
			return props?.videoData?.thumb || '';
		})

		// 直播間標題
		const title = computed(() => {
			return props?.videoData?.title || '-';
		})

		// 直播主暱稱
		const name = computed(() => {
			return props?.videoData?.user_nicename || '-';
		})

		// 直播間熱度
		const heat = computed(() => {
			const nums = props?.videoData?.nums || 0;
			return heatFormat(nums);
		})

		// 直播圖片讀取失敗
		const errorVideoImg = (e) => {
			e.target.src = errorImg?.value || '/publicAssets/img/default-room@3x.jpg';
		};

		// 點擊直播物件
		const clickLive = () => {
			// Navigate room page
			const liveuid = props?.videoData?.uid || props?.videoData?.live_id || '';
			router.push(`/room/${liveuid}`);

			// Matomo track
			const anchorName = props?.videoData?.user_nicename || '';
			const className = props?.className || '';
			if (props.path === '/index/newLive') {
				matomo_index_newLive_watch(anchorName, liveuid);
			} else if (props.path === '/index/hotLive') {
				matomo_index_hotLive_watch(anchorName, liveuid);
			} else if (props.path === '/index/classLive') {
				matomo_index_classLive_watch(className, liveuid);
			} else if (props.path === '/classLive') {
				matomo_classLive_watch(className, liveuid);
			} else if (props.path === '/search') {
				matomo_search_watch(anchorName, liveuid);
			}
		};
		return {
			thumb,
			title,
			name,
			heat,
			errorVideoImg,
			clickLive,
		};
	},
};
</script>
<style lang="scss" scoped>
.video-item {
	width: 100%;
	height: unset;
	padding: 0;
	border: transparent;
	background: transparent;
	::v-deep(.van-button__content) {
		width: 100%;
	}
	::v-deep(.van-button__text) {
		width: 100%;
		text-align: start;
	}
}
.video-img {
	position: relative;
	width: 100%;
	padding-bottom: 56.25%;
	overflow: hidden;
	background: #ececec;
	img {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 2;
	}
}
.video-title {
	width: 100%;
	min-height: 40px;
	text-align: left;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.video-anchor {
	color: #8e8e93;
	text-align: left;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.video-nums {
	color: #df2f4a;
	text-align: left;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
