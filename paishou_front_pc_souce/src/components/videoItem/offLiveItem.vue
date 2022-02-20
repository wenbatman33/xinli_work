<template lang="pug">
.videoItem.my-2.cursor-pointer(@click='viewLive(videoData.uid || videoData.live_id)')
	.videoImg
		img(:src='videoData.thumb', @error='errorVideoImg')
		loadingAnitmate
		.playIcon
	.videoTitle.font-semibold.text-sm.text-white.my-1 {{ videoData.title || '&nbsp'}}
	.videoAnchorInfo
		.videoAnchor
			img.AVATAR.w-8.h-8.mr-2(v-if='videoData.avatar || videoData.avatar_thumb', :src='videoData.avatar || videoData.avatar_thumb', @error='errorPersonImg')
			img.AVATAR.w-8.h-8.mr-2(v-else, src='/publicAssets/img/v3/default.png')
			.videoAnchorName.text-xs {{ videoData.user_nicename }}
		.videoViewedTimes
			.icon.mr-2
				img(src='/publicAssets/img/v3/icon_eye.png', alt='')
			.text-xs {{ videoData.nums || 0 }}
</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted, reactive, computed } from 'vue';
import loadingAnitmate from '@/components/loadingAnitmate';
import { errorPersonImg } from '@/utils';

export default {
	components: {
		loadingAnitmate,
	},
	props: ['videoData'],
	setup() {
		const store = useStore();
		const router = useRouter();
		const viewLive = (liveuid) => {
			const routeUrl = router.resolve(`/room/${liveuid}`);
			window.open(routeUrl.href, '_blank');
		};
		const ERROR_IMG = computed(() => store.state.config.errorImg);
		const errorVideoImg = (e) => {
			return (e.target.src = ERROR_IMG.value);
		};
		return {
			store,
			router,
			viewLive,
			errorVideoImg,
			errorPersonImg,
			ERROR_IMG,
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
	border-radius: 8px;
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
.videoTitle {
	width: 100%;
	text-align: left;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.videoAnchorInfo {
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #8e8e93;
}
.videoAnchor {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.videoAvatar {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background: #ececec;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	.videoAnchorName {
		width: 80px;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
.videoViewedTimes {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
