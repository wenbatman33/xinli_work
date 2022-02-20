<template lang="pug">
//- Videojs 播放器
#player
	//- 播放器
	video(:id='state.ID', class='video-js vjs-default-skin vjs-big-play-centered vjs-16-9', data-setup='{"fluid": true}' playsinline)

	//- 控制按鈕
	player-controls(:playing='state.playing', :muted='state.muted', :current-time='state.currentTime', :duration='state.duration', @click-play='clickPlay', @click-time='clickTime', @click-mute='clickMute', @click-fullscreen='clickFullscreen', @click-change-source='clickChangeSource')
</template>
<script>
import { onMounted, onUnmounted, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import playerControls from '@/components/psPlayer/playerControls.vue';
import landscapeFullscreen from '@/utils/landscapeFullscreen.js';
import videojs from 'video.js';
import videozhCN from 'video.js/dist/lang/zh-CN.json';
import 'video.js/dist/video-js.css';

export default {
	components: {
		playerControls,
	},
	props: {
		videoSource: String,
		videoType: String,
	},
	emits: ['click-change-source'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			ID: 'PS_player' + new Date().getTime(),
			videojsPlayer: null,
			playing: false,
			muted: false,
			currentTime: 0,
			duration: 0,
		});

		// 是否為橫向影片
		const videoLandscape = computed(() => {
			return store?.state?.socket?.liveInfo?.anyway === 1;
		});

		// 初始化 video-js 播放器
		const initVideojsPlayer = () => {
			// Video-js options
			const videoOptions = {
				language: 'zh-CN',
				autoplay: 'muted',
				fluid: true,
				controls: false,
				notSupportedMessage: '此视频暂无法播放，请稍后再试',
				sources: [
					{
						src: props.videoSource,
						type: props.videoType,
						withCredentials: true,
					},
				],
			};

			// Player element
			const player = document.getElementById(state.ID);

			// Video-js player
			state.videojsPlayer = videojs(player, videoOptions, () => {
				state.playing = !state.videojsPlayer.paused();
				state.muted = state.videojsPlayer.muted();
				state.currentTime = state.videojsPlayer.currentTime();
				state.duration = state.videojsPlayer.duration();
			});

			// Target player language
			videojs.addLanguage('zh-CN', videozhCN);

			// Video-js play event
			state.videojsPlayer.on('play', () => {
				state.playing = true;
			});

			// Video-js pause event
			state.videojsPlayer.on('pause', () => {
				state.playing = false;
			});

			// Video-js volume event
			state.videojsPlayer.on('volumechange', () => {
				state.muted = state.videojsPlayer.muted();
			});

			// Video-js fullscreen event
			state.videojsPlayer.on('fullscreenchange', () => {
				state.videojsPlayer.controls(state.videojsPlayer.isFullscreen());
			});

			// Video-js time event
			state.videojsPlayer.on('timeupdate', () => {
				state.currentTime = state.videojsPlayer.currentTime();
				state.duration = state.videojsPlayer.duration();
			});

			// Landscape on fullscreen
			if (videoLandscape.value) {
				state.videojsPlayer.landscapeFullscreen();
			}

			// Reload on error
			state.videojsPlayer.reloadSourceOnError({
				getSource: function (reload) {
					reload({
						src: props.videoSource,
						type: props.videoType,
						withCredentials: true,
					});
				},
				errorInterval: 5,
			});
		};

		// 點擊播放
		const clickPlay = () => {
			if (state.videojsPlayer.paused()) {
				state.videojsPlayer.play();
			} else {
				state.videojsPlayer.pause();
			}
		};

		// 點擊時間
		const clickTime = (time) => {
			state.videojsPlayer.currentTime(time);
		};

		// 點擊靜音
		const clickMute = () => {
			state.videojsPlayer.muted(!state.videojsPlayer.muted());
		};

		// 點擊全螢幕
		const clickFullscreen = () => {
			state.videojsPlayer.requestFullscreen();
		};

		// 點擊更換播源
		const clickChangeSource = () => {
			emit('click-change-source');
		};

		// On component mounted
		onMounted(() => {
			initVideojsPlayer();
		});

		// On component unmounted
		onUnmounted(() => {
			videojs(state.ID).dispose();
		});
		return {
			state,
			clickPlay,
			clickTime,
			clickMute,
			clickFullscreen,
			clickChangeSource,
		};
	},
};
</script>
<style lang="scss">
#player {
	height: auto;
	position: relative;
}
#PS_player {
	height: auto;
}
</style>
