<template lang="pug">
//- 直播播放器
.ps-player(v-if='onlive')
	//- Video-js m3u8 player
	videojs-player(v-if='playerType === "m3u8"', :video-source='videoSource', video-type='application/x-mpegURL', @click-change-source='clickChangeSource')

	//- Video-js mp4 player
	videojs-player(v-else-if='playerType === "mp4"', :video-source='videoSource', video-type='video/mp4', @click-change-source='clickChangeSource')

	//- WebRTC player
	webrtc-player(v-else-if='playerType === "webrtc"', :video-source='videoSource', @click-change-source='clickChangeSource')

	//- 空白區塊
	.blank(v-else)
		player-controls(:video-source='videoSource', @click-change-source='clickChangeSource')

	//- 彈幕
	ps-barrage

	//- 禮物動畫
	ps-gift-viewer

	//- 線路彈窗
	source-popup(v-model:show='state.showChangeSource', :source='videoSource', @update:source='updateSource')
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import videojsPlayer from '@/components/psPlayer/videojsPlayer.vue';
import webrtcPlayer from '@/components/psPlayer/webrtcPlayer.vue';
import playerControls from '@/components/psPlayer/playerControls.vue';
import psBarrage from '@/components/psBarrage';
import psGiftViewer from '@/components/psGiftViewer';
import sourcePopup from '@/components/psPlayer/sourcePopup.vue';

export default {
	name: 'ps-player',
	components: {
		videojsPlayer,
		webrtcPlayer,
		playerControls,
		psBarrage,
		psGiftViewer,
		sourcePopup,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			currentVideoSrc: null,
			showChangeSource: false,
		});

		// 是否直播中
		const onlive = computed(() => {
			return store?.state?.socket?.onLive === true;
		});

		// 播源
		const videoSource = computed(() => {
			const sourceList = store?.getters['socket/SOURCE_LIST'] || [];
			const videoSource = store?.state?.socket?.liveInfo?.pull || '';
			const firstSource = sourceList[0] || {};
			const defaultSource = firstSource?.p480 || firstSource?.pull || firstSource?.p720 || '';
			if (store?.state?.socket?.roomInfo?.is_video !== 0) {
				return videoSource;
			} else if (!state.currentVideoSrc) {
				return defaultSource;
			} else {
				return state.currentVideoSrc;
			}
		});

		// 播放器類別
		const playerType = computed(() => {
			const src = videoSource.value || '';
			if (src.indexOf('.m3u8') > -1) {
				return 'm3u8';
			} else if (src.indexOf('.mp4') > -1) {
				return 'mp4';
			} else if (src.indexOf('webrtc') > -1) {
				return 'webrtc';
			} else {
				return 'unknown';
			}
		});

		// 點擊更換播源
		const clickChangeSource = () => {
			state.showChangeSource = true;
		};

		// 更新播源
		const updateSource = (src) => {
			state.currentVideoSrc = src;
		};
		return {
			state,
			onlive,
			videoSource,
			playerType,
			clickChangeSource,
			updateSource,
		};
	},
};
</script>
<style lang="scss">
.ps-player {
	position: relative;
	height: auto;
	background: #000000;
}
.blank {
	width: 100%;
	height: 12rem;
	position: relative;
}
</style>
