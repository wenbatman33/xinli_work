<template lang="pug">
//- WebRTC 播放器
#player
	//- 播放器
	video#PS_player(:poster='videoThumb', autoplay, unmuted, playsinline, @play='updatePlay', @pause='updatePause', @volumechange='updateMute')

	//- 控制按鈕
	player-controls(:playing='state.playing', :muted='state.muted', @click-play='clickPlay', @click-mute='clickMute', @click-fullscreen='clickFullscreen', @click-change-source='clickChangeSource')
</template>
<script>
import { onMounted, onUnmounted, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { setOrientation } from '@/utils/landscapeFullscreen.js';
import playerControls from '@/components/psPlayer/playerControls.vue';

export default {
	components: {
		playerControls,
	},
	props: {
		videoSource: String,
	},
	emits: ['click-change-source'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			peerConnection: null,
			svrSig: null,
			playing: false,
			muted: false,
		});


		// 直播預覽圖
		const videoThumb = computed(() => {
			return store?.state?.socket?.liveInfo?.thumb || '';
		});

		// 是否為橫向影片
		const videoLandscape = computed(() => {
			return store?.state?.socket?.liveInfo?.anyway === 1;
		});

		// 取得串流
		const pullStream = () => {
			// Create peer connection
			// iOS WEBRTC RTCPeerConnection 必须默认设置 DtlsSrtpKeyAgreement，否则请求失败
			const config = {
				iceServers: [],
				bundlePolicy: 'max-bundle',
				rtcpMuxPolicy: 'require',
				tcpCandidatePolicy: 'disable',
				IceTransportsType: 'nohost',
				sdpSemantics: 'unified-plan',
			};
			const optional = {
				optional: [
					{
						DtlsSrtpKeyAgreement: true,
					},
				],
			};
			state.peerConnection = new RTCPeerConnection(config, optional);
			state.peerConnection.ontrack = (e) => {
				const streams = e.streams || [];
				const stream = streams[0] || {};
				const video = document.getElementById('PS_player');
				video.srcObject = stream;
				video.autoplay = true;
				video.playsinline = true;

				const playPromise = video.play();
				if (playPromise) {
					playPromise
						.then(() => {
							updateMute();
						})
						.catch(() => {});
				}
			};

			// Create offer
			const offerSdpOption = {
				offerToReceiveAudio: true, // 提供接收音频
				offerToReceiveVideo: true, // 提供接收視频
				voiceActivityDetection: false, // 語音活動檢測
			};
			state.peerConnection
				.createOffer(offerSdpOption)
				.then((offer) => {
					// Set the description of the local end of the connection
					const stringSdp = offer.sdp.toString();
					offer.sdp = stringSdp;
					state.peerConnection.setLocalDescription(offer);

					// 向信令服务器发送 offer，获取 remote SDP
					// SDP (Session Description Protocol) 是一个描述 peer-to-peer 连接的标准.
					// SDP 包含音视频的: 编解码(codec)
					const reqBody = {
						streamurl: props.videoSource,
						sessionid: 'sessionId_Test', // 业务生成的唯一key, 标识本次拉流, 用户可自定义
						clientinfo: 'clientinfo_test', // 终端类型信息, 用户可自定义
						localsdp: offer,
					};
					const xhr = new XMLHttpRequest();
					xhr.onreadystatechange = () => {
						if (xhr.readyState == XMLHttpRequest.DONE) {
							// Validate response data
							const data = JSON.parse(xhr.responseText);
							if (data.errcode != 0) {
								return;
							}

							// svrsig 服务器签名
							// 后面每个请求必须携带这个字段内容，业务无需理解字段内容
							state.svrSig = data.svrsig;

							// Set the answer as the remote description
							const remoteSdp = data.remotesdp;
							state.peerConnection.setRemoteDescription(new RTCSessionDescription(remoteSdp));
						}
					};
					xhr.open('POST', 'https://overseas-webrtc.liveplay.myqcloud.com/webrtc/v1/pullstream', true);
					xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
					xhr.send(JSON.stringify(reqBody));
				})
				.catch((reason) => {
					console.error(reason);
				});
		};

		// 停止串流
		const stopStream = () => {
			const reqBody = {
				streamurl: props.videoSource,
				svrsig: state.svrSig,
			};
			const xhr = new XMLHttpRequest();
			xhr.onreadystatechange = () => {
				if (xhr.readyState == XMLHttpRequest.DONE) {
					state.peerConnection.close();
				}
			};
			xhr.open('POST', 'https://overseas-webrtc.liveplay.myqcloud.com/webrtc/v1/stopstream', true);
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xhr.send(JSON.stringify(reqBody));
		};

		// 更新播放狀態
		const updatePlay = () => {
			state.playing = true;
		};

		// 更新暫停狀態
		const updatePause = () => {
			state.playing = false;
		};

		// 更新靜音狀態
		const updateMute = () => {
			const video = document.getElementById('PS_player');
			state.muted = video.muted;
		};

		// 點擊播放
		const clickPlay = () => {
			const video = document.getElementById('PS_player');
			if (video.paused == true) {
				video.play();
			} else {
				video.pause();
			}
		};

		// 點擊靜音
		const clickMute = () => {
			const video = document.getElementById('PS_player');
			if (video.muted == false) {
				video.muted = true;
			} else {
				video.muted = false;
			}
		};

		// 點擊全螢幕
		const clickFullscreen = () => {
			const video = document.getElementById('PS_player');
			const userAgent = navigator.userAgent.toLowerCase();
			const isIpad = userAgent.match(/ipad/i) == 'ipad';
			const isIphoneOs = userAgent.match(/iphone/i) == 'iphone';
			if (isIpad || isIphoneOs) {
				// iOS
				try {
					video.webkitEnterFullScreen();
				} catch (e) {
					console.error(e);
				}
				try {
					video.enterFullscreen();
				} catch (e) {
					console.error(e);
				}
			} else if (video.requestFullscreen) {
				video.requestFullscreen();
			} else if (video.mozRequestFullScreen) {
				// Firefox
				video.mozRequestFullScreen();
			} else if (video.webkitRequestFullscreen) {
				// Chrome and Safari
				video.webkitRequestFullscreen();
			}
			if (videoLandscape.value) {
				setOrientation('landscape');
			}
		};

		// 點擊更換播源
		const clickChangeSource = () => {
			emit('click-change-source');
		};

		// On component mounted
		onMounted(() => {
			pullStream();
		});

		// On component unmounted
		onUnmounted(() => {
			stopStream();
		});
		return {
			state,
			videoThumb,
			updatePlay,
			updatePause,
			updateMute,
			clickPlay,
			clickMute,
			clickFullscreen,
			clickChangeSource,
		};
	},
};
</script>

<style lang="scss" scoped>
#player {
	position: relative;
	width: 100%;
	height: auto;
}
#PS_player {
	position: relative;
	width: 100% !important;
	border: none !important;
	outline: 0 !important;
	z-index: 50;
}
</style>
