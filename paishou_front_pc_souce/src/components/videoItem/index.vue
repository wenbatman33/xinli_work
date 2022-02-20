<template lang="pug">
.videoItem.my-2.cursor-pointer(@click='viewLive(videoData.uid || videoData.live_id)')
	.videoImg
		img(:src='videoData.thumb', @error='errorVideoImg')
		loadingAnitmate
		.playIcon
	.FLEX_R.py-2
		.flex.flex-shrink-0.w-8.mr-2
			img.AVATAR.w-8.h-8.mt-2(v-if='videoData.avatar || videoData.avatar_thumb', :src='videoData.avatar || videoData.avatar_thumb', @error='errorPersonImg')
			img.AVATAR.w-8.h-8.mt-2(v-else, src='/publicAssets/img/v3/default.png')
		.FLEX_C.flex-grow
			.videoTitle.h-10.items-center.font-semibold.align-middle.text-sm.line-clamp-2.my-1 {{ videoData.title || '&nbsp'}}
			.name.truncate.text-xs {{ videoData.user_nicename }}
			.text-xs.text-psV3RedLight.align-middle.my-1
				img.w-2.mr-1(src='/publicAssets/img/v3/heat.png')
				span {{ room_heat || 0 }}
</template>
<script>
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, onUnmounted, reactive, computed } from 'vue';
import loadingAnitmate from '@/components/loadingAnitmate';
import { errorPersonImg } from '@/utils';
import { matomo_errorVideoImg, matomo_index_hot, matomo_index_class, matomo_index_new } from '@/matomoEvent';

export default {
	components: {
		loadingAnitmate,
	},
	props: ['videoData', 'path', 'classID'],
	setup(props) {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const classList = computed(() => store.state.config.classList);
		const filterClassId = (id) => classList?.value?.filter((classItem) => classItem?.id === id)[0]?.name;

		const viewLive = (liveuid) => {
			const name = props?.videoData?.user_nicename;
			const uid = props?.videoData?.uid;
			const className = filterClassId(props?.classID);

			if (props.path === '/index/hotLive') {
				// 首頁/熱門直播 v
				matomo_index_hot(name, uid);
			} else if (props.path === '/index/new') {
				// 首頁/最新直播 v
				matomo_index_new(name, uid);
			} else if (props.path === '/index/class') {
				// 關注進入直播間
				matomo_index_class(name, uid, className);
			} else if (props.path === '/index/class') {
				// 關注進入直播間
				matomo_index_class(name, uid);
			}
			const routeUrl = router.resolve(`/room/${liveuid}`);
			window.open(routeUrl.href, '_blank');
		};
		const ERROR_IMG = computed(() => store.state.config.errorImg);
		const errorVideoImg = (e) => {
			matomo_errorVideoImg();
			return (e.target.src = ERROR_IMG?.value || '/publicAssets/img/v3/imgSoccer2@3x.jpg');
		};
		const room_heat = computed(() => {
			return props.videoData.nums > 9999 ? (props.videoData.nums / 10000).toFixed(1) + '万' : props.videoData.nums;
		});
		return {
			store,
			route,
			router,
			classList,
			filterClassId,
			viewLive,
			errorVideoImg,
			errorPersonImg,
			ERROR_IMG,
			room_heat,
		};
	},
};
</script>
<style lang="scss" scoped>
.videoImg {
	position: relative;
	width: 100%;
	padding-bottom: 56.25%;
	min-height: 80px;
	overflow: hidden;
	background: #ececec;
	.playIcon {
		display: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url('/publicAssets/img/v3/videoPlayIcon.png') 50% no-repeat;
		background-size: 25%;
		z-index: 3;
	}
	&:hover {
		.playIcon {
			display: block !important;
		}
	}
	img {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 2;
	}
}
</style>
