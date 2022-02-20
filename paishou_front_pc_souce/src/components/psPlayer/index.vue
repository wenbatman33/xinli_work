<template lang="pug">
#player
	img.videoThumb(:src='ERROR_IMG')
	//- mp4影片需要主動設定src 目前測試無法用 js更改src
	.playIcon.w-full.h-full.CENTER(v-if='state.pausing', @click='videoPlay')
		img.cursor-pointer(src='/publicAssets/img/v3/videoPlayIcon.png')
	.MP4_player.CENTER(v-if='state.straemMode==="mp4"')
		video#PS_player(:src='videoDataSrc', :poster='videoDataThumb', autoplay unmuted playsinline controls, controlsList='nodownload')
	
	.Live_player.CENTER(v-if='state.straemMode!=="mp4"')
		video#PS_player(:poster='videoDataThumb', autoplay unmuted playsinline controls, controlsList='nodownload')
</template>

<script>
import { useStore } from 'vuex';
import Hls from 'hls.js';
import flvjs from 'flv.js';
import { onMounted, onUnmounted, reactive, watch, computed } from 'vue';

export default {
	name: 'psPlayer',
	props: ['videoDataSrc', 'videoDataThumb'],
	setup(props) {
		const store = useStore();
		const state = reactive({
			player: null,
			peerConnection: null,
			svrSig: null,
			straemMode: false,
			pausing: false,
		});
		watch(
			() => props.videoDataSrc,
			(newList, oldList) => {
				init();
			},
			{ deep: true }
		);
		const changStream = (data) => {
			const video = document.getElementById('PS_player');
			if (state.straemMode === 'webrtc') {
				if (video) video.srcObject = null;
				stopStream();
			} else if (state.player) {
				if (video) video.srcObject = null;
				state.player.destroy();
				if (state.player) state.player = null;
			}
		};
		const ERROR_IMG = computed(() => store.state.config.errorImg);
		const init = () => {
			changStream();
			setTimeout(() => {
				if (props.videoDataSrc.indexOf('webrtc') > -1) {
					state.straemMode = 'webrtc';
					WEBRTC_SETUP();
				} else if (props.videoDataSrc.indexOf('.m3u8') > -1) {
					state.straemMode = 'hls';
					HLS_SETUP();
				} else if (props.videoDataSrc.indexOf('.flv') > -1) {
					state.straemMode = 'flv';
					FLV_SETUP();
				} else if (props.videoDataSrc.indexOf('.mp4') > -1) {
					state.straemMode = 'mp4';
					MP4_SETUP();
				}
			}, 1000);
		};

		const videoPlay = () => {
			const video = document.getElementById('PS_player');
			video.play();
		};
		const videoOnReady = () => {
			//
			const video = document.getElementById('PS_player');
			video.onloadstart = function () {
				state.pausing = true;
			};
			video.onpause = function () {
				state.pausing = true;
			};
			video.onplaying = function () {
				state.pausing = false;
			};
			video.onended = function () {
				// state.pausing = true;
			};
		};
		const MP4_SETUP = () => {
			const video = document.getElementById('PS_player');
			videoOnReady();
			setTimeout(() => {
				video.play();
			}, 1000);
		};
		const FLV_SETUP = () => {
			const video = document.getElementById('PS_player');
			videoOnReady();
			state.player = flvjs.createPlayer({
				type: 'flv',
				isLive: true,
				url: props.videoDataSrc,
			});
			state.player.attachMediaElement(video);
			state.player.on(flvjs.Events.ERROR, function () {
				// emit('change-stream');
			});
			state.player.on(flvjs.Events.LOADING_COMPLETE, function () {});
			state.player.on(flvjs.Events.RECOVERED_EARLY_EOF, function () {});
			state.player.on(flvjs.Events.MEDIA_INFO, function () {});
			state.player.on(flvjs.Events.METADATA_ARRIVED, function () {});
			state.player.on(flvjs.Events.SCRIPTDATA_ARRIVED, function () {});
			state.player.on(flvjs.Events.STATISTICS_INFO, function () {});
			state.player.load();
			state.player.play();
		};
		const HLS_SETUP = () => {
			if (Hls.isSupported()) {
				state.player = new Hls();
				const video = document.getElementById('PS_player');
				videoOnReady();
				state.player.loadSource(props.videoDataSrc);
				state.player.attachMedia(video);
				state.player.on(Hls.Events.MANIFEST_PARSED, function () {
					video.play();
				});
				state.player.on(Hls.Events.ERROR, function (event, data) {
					if (data.fatal) {
						switch (data.type) {
							case Hls.ErrorTypes.NETWORK_ERROR:
								// console.log('网路问题 切换直播源');
								// emit('change-stream');
								state.player.destroy();
								break;
							case Hls.ErrorTypes.MEDIA_ERROR:
								// console.log('网路问题 切换直播源');
								// emit('change-stream');
								state.player.destroy();
								break;
							default:
								state.player.destroy();
								break;
						}
					}
				});
			}
		};
		// 以下是 WEBRTC 的方法
		const WEBRTC_SETUP = () => {
			WEBRTC_PULL_STREAM('props.videoDataSrc');
		};

		const getStreamId = (url) => {
			//var url = "webrtc://domain/path/stream_id[?txSecret=xxx&txTime=xxx]";
			const parseStreamid = /^(?:webrtc:\/\/)(?:[0-9.\-A-Za-z_]+)(?:\/)(?:[0-9.\-A-Za-z_]+)(?:\/)([^?#]*)(?:\?*)(?:[^?#]*)/;
			const result = parseStreamid.exec(url);
			if (result) return result[1];
			return null;
		};
		const WEBRTC_PULL_STREAM = (url) => {
			const streamId = getStreamId(url);
			// -------------------------------------------
			// IOS WEBRTC RTCPeerConnection必须默认设置DtlsSrtpKeyAgreement，否则请求失败
			const optional = { optional: [{ DtlsSrtpKeyAgreement: true }] };
			// offerToReceiveAudio 提供接收音频 , offerToReceiveVideo 提供接收視频, voiceActivityDetection 語音活動檢測
			const offerSdpOption = { offerToReceiveAudio: true, offerToReceiveVideo: true, voiceActivityDetection: false };
			const config = { iceServers: [], bundlePolicy: 'max-bundle', rtcpMuxPolicy: 'require', tcpCandidatePolicy: 'disable', IceTransportsType: 'nohost', sdpSemantics: 'unified-plan' };
			// -------------------------------------------
			state.peerConnection = new RTCPeerConnection(config, optional);
			state.peerConnection.onicecandidate = function (e) {};
			state.peerConnection.onaddstream = function (e) {};
			state.peerConnection.onremovestream = function (e) {};
			state.peerConnection.ontrack = function (e) {};
			state.peerConnection.onconnectionstatechange = function (e) {};
			state.peerConnection.oniceconnectionstatechange = function (e) {};
			state.peerConnection.onicegatheringstatechange = function (e) {};
			state.peerConnection.onsignalingstatechange = function (e) {};
			state.peerConnection.onnegotiationneeded = function (e) {};
			state.peerConnection.ontrack = function (e) {
				var track = e.track;
				// console.log(peerConnection.stream)
				if (!state.peerConnection.stream) {
					state.peerConnection.streamId = streamId;
					state.peerConnection.stream = new MediaStream();
					state.peerConnection.stream.addTrack(track);
					onAddStream(state.peerConnection);
				} else {
					state.peerConnection.stream.addTrack(track);
				}
			};
			state.peerConnection
				.createOffer(offerSdpOption)
				.then(function (offer) {
					// SDP (Session Description Protocol) 是一个描述peer-to-peer 连接的标准. SDP包含音视频的:编解码(codec),
					const stringSdp = offer.sdp.toString();
					const arrSdp = stringSdp.split('\r\n');
					let stringSdpModify = '';
					for (var i = 0; i < arrSdp.length - 1; i++) {
						if (arrSdp[i].lastIndexOf('a=fmtp:111') != -1) {
							stringSdpModify += arrSdp[i] + ';stereo=1' + '\r\n';
						} else {
							stringSdpModify += arrSdp[i] + '\r\n';
						}
					}
					offer.sdp = stringSdpModify;
					state.peerConnection.setLocalDescription(offer);
					fetchData(offer);
				})
				.catch(function (reason) {
					// console.log('create offer failed : reason = ' + reason);
				});
		};
		const fetchData = (offer) => {
			const reqBody = {
				streamurl: props.videoDataSrc,
				sessionid: 'sessionId_Test',
				clientinfo: 'clientinfo_test',
				localsdp: offer,
			};
			const xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if (xhr.readyState == XMLHttpRequest.DONE) {
					pullStreamRes(JSON.parse(xhr.responseText));
				}
			};
			xhr.open('POST', 'https://overseas-webrtc.liveplay.myqcloud.com/webrtc/v1/pullstream', true);
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xhr.send(JSON.stringify(reqBody));
		};
		const pullStreamRes = (data) => {
			if (data.errcode != 0) {
				return;
			}
			const remoteSdp = data.remotesdp;
			state.svrSig = data.svrsig;
			state.peerConnection.setRemoteDescription(new RTCSessionDescription(remoteSdp));
		};
		const onAddStream = (e) => {
			const video = document.getElementById('PS_player');
			video.srcObject = e.stream;
			//video.muted = true
			video.autoplay = true;
			video.playsinline = true;
			const playPromise = video.play();
			if (playPromise) {
				playPromise
					.then(() => {
						console.log(`play ok!`);
					})
					.catch(() => {
						console.log(`play failed!`);
					});
			}
		};
		const stopStream = () => {
			const reqBody = {
				streamurl: props.videoDataSrc,
				svrsig: state.svrSig,
			};
			const xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if (xhr.readyState == XMLHttpRequest.DONE) {
					stopStreamRes(JSON.parse(xhr.responseText));
				}
			};
			xhr.open('POST', 'https://overseas-webrtc.liveplay.myqcloud.com/webrtc/v1/stopstream', true);
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xhr.send(JSON.stringify(reqBody));
		};
		const stopStreamRes = (data) => {
			state.peerConnection.close();
		};

		onUnmounted(() => {
			changStream();
		});

		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			init,
			HLS_SETUP,
			FLV_SETUP,
			MP4_SETUP,
			WEBRTC_SETUP,
			WEBRTC_PULL_STREAM,
			onAddStream,
			fetchData,
			pullStreamRes,
			stopStream,
			stopStreamRes,
			changStream,
			ERROR_IMG,
			videoOnReady,
			videoPlay,
		};
	},
};
</script>
<style lang="scss" scoped>
// 影片大小取決於父層級 所以父層級一定需要設定大小
#player {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
}
.videoThumb {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 1;
}
#PS_player {
	position: absolute;
	width: 100% !important;
	height: 100% !important;
	border: none !important;
	outline: 0 !important;
	z-index: 50;
	background: #000;
}
.MP4_player {
	position: absolute;
	width: 100% !important;
	height: 100% !important;
	border: none !important;
	outline: 0 !important;
	z-index: 50;
	background: #000;
}
.Live_player {
	position: absolute;
	width: 100% !important;
	height: 100% !important;
	border: none !important;
	outline: 0 !important;
	z-index: 50;
	background: #000;
	/*全屏按钮*/
	/*video::-webkit-media-controls-fullscreen-button {*/
	/*    display: none;*/
	/*}*/
	/*播放按钮*/
	/*  video::-webkit-media-controls-play-button {*/
	/*      display: none;*/
	/*  }*/
	/*进度条*/

	video::-webkit-media-controls-timeline {
		display: none;
	}
	/*观看的当前时间*/
	video::-webkit-media-controls-current-time-display {
		display: none;
	}

	/*剩余时间*/
	video::-webkit-media-controls-time-remaining-display {
		display: none;
	}
	video::-internal-media-controls-loading-panel {
		display: none;
	}
	/*音量按钮*/
	/*video::-webkit-media-controls-mute-button {*/
	/*  display: none;*/
	/*}*/
	/*video::-webkit-media-controls-toggle-closed-captions-button {*/
	/*    display: none;*/
	/*}*/
	/*音量的控制条*/
	/*video::-webkit-media-controls-volume-slider {*/
	/*  display: none;*/
	/*}*/
	/*所有控件*/
	/*video::-webkit-media-controls-enclosure{*/
	/*  display: none;*/
	/*}*/
	/*video::-webkit-media-controls{*/
	/*    display: none;*/
	/*}*/

	/*video::-webkit-media-controls.sizing-small div[pseudo="-webkit-media-controls-panel" i]{*/
	/*    display: none;*/
	/*}*/
}
.playIcon {
	// display: none;
	position: absolute;
	z-index: 51;
}
</style>
