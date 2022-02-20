<template lang="pug">
.AnimationBg
	.overLayer
	video(autoplay muted loop id="AnimationVideoBg")
		source(:src="animationVideo" type="video/mp4")

</template>
<script setup lang="ts">
	import { onUnmounted, ref } from 'vue';
	const animationVideo = `${window.staticPath}/static/video/video.mp4`;
</script>
<style lang="scss" scoped>
	.AnimationBg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center center;
		background: rgba(0, 0, 0, 0.6);
		z-index: 0;
		.overLayer {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background: rgba(0, 0, 0, 0.6);
		}
		video {
			position: fixed;
			right: 0;
			bottom: 0;
			min-width: 100% !important;
			min-height: 100% !important;
			width: auto !important;
			height: auto !important;
			z-index: 0;
			max-width: none !important;
		}
	}
	// 為了預先載入圖片@load使用的暫存loader 這樣才能全部圖片載入完成後 顯示loop動
</style>
