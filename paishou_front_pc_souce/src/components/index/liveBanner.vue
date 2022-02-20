<template lang="pug">
.liveBanner#liveBanner
	.bannerBG
		img.w-full(v-if='state.liveBannerBg', :src='state.liveBannerBg')
	.indexBannerContainer
		.liveBox.py-10
			.BETWEEN.bg-black.bg-opacity-50.p-2(class='min-h-[440px]')
				.flex.flex-grow
					.w-full.h-full(@mouseenter='state.isEnter = true', @mouseleave='state.isEnter = false')
						.hotLive.h-full.relative
							psPlayer(:videoDataSrc='state.videoDataSrc', :videoDataThumb='state.videoDataThumb')
							//- .enter_btn(v-if='state.videoDataSrc && state.isEnter', @click='enterLiveroom') 进入直播间
							.enter_btn(@click='enterLiveroom') 进入直播间
				.videoList.pl-2(class='w-1/6')
					.liveList.grid.grid-rows-5.grid-flow-col.gap-2.h-full
						.row-span-1.cursor-pointer.overflow-hidden(v-for='(item, index) in state.recommendList', :key='index', @click='activeVideo(index)')
							.videoImg
								img.w-full.h-full(:src='item.thumb', @error='errorVideoImg')
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import { onMounted, reactive, toRaw, computed } from 'vue';
import { slideList, recommendV2 } from '@/api';
import psPlayer from '@/components/psPlayer';
import { matomo_errorVideoImg } from '@/matomoEvent';

export default {
	components: {
		LeftOutlined,
		RightOutlined,
		psPlayer,
	},
	setup() {
		const store = useStore();
		const router = useRouter();
		const state = reactive({
			recommendList: [],
			currentVideo: null,
			isEnter: false,
			liveBannerBg: '',
			active: 0,
			videoDataSrc: '',
			videoDataThumb: '',
		});
		const init = () => {
			recommendV2().then((res) => {
				state.recommendList = res.data.list.splice(0, 5);
				state.currentVideo = state.recommendList[0];
				if (state.currentVideo) {
					// flv 為最優先級別
					const videoSrc = state.currentVideo?.resource.length > 0 ? state.currentVideo?.resource[0]?.p720?.flv : state.currentVideo?.pull;
					state.videoDataSrc = videoSrc;
					state.videoDataThumb = state.currentVideo.thumb;
				}
			});
			slideList({ slide_cid: 7 }).then((res) => {
				state.liveBannerBg = res.data.list[0].slide_pic;
			});
		};
		const activeVideo = (index) => {
			state.active = index;
			const CURRTENT = toRaw(state.recommendList);
			state.currentVideo = CURRTENT[index];
			const videoSrc = state.currentVideo?.resource.length > 0 ? state.currentVideo?.resource[0]?.p720?.flv : state.currentVideo?.pull;
			state.videoDataSrc = videoSrc;
			state.videoDataThumb = state.currentVideo.thumb;
		};

		const enterLiveroom = () => {
			let routeUrl = router.resolve(`/room/${state.currentVideo.uid}`);
			window.open(routeUrl.href, '_blank');
		};
		onMounted(() => {
			init();
		});
		const ERROR_IMG = computed(() => store.state.config.errorImg);
		const errorVideoImg = (e) => {
			matomo_errorVideoImg();
			return (e.target.src = ERROR_IMG.value);
		};
		return {
			store,
			router,
			state,
			init,
			enterLiveroom,
			activeVideo,
			errorVideoImg,
			ERROR_IMG,
		};
	},
};
</script>
<style lang="scss" scoped>
.liveBanner {
	position: relative;
	width: 100%;
}
.bannerBG {
	position: absolute;
	z-index: 0;
	width: 100%;
}
.liveBox {
	position: relative;
	top: 0;
	z-index: 2;
	margin: auto auto;
}

.enter_btn {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	width: 164px;
	height: 42px;
	margin: auto;
	line-height: 42px;
	background: rgba(255, 255, 255, 0.6);
	border-radius: 21px;
	font-size: 16px;
	font-weight: 600;
	text-align: center;
	color: #191919;
	cursor: pointer;
	z-index: 10005;
}
.enter_btn:hover {
	transition: 0.5s ease-in-out;
	background: rgba(166, 35, 55, 1);
	color: #fff;
}
.videoImg {
	position: relative;
	width: 100%;
	padding-bottom: 56.25%;
	min-height: 80px;
	overflow: hidden;
	background: #000;
	img {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 2;
	}
}
</style>
