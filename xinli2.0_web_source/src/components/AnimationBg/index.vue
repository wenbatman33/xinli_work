<template lang="pug">
.AnimationBg(:style='{ "background-image": "url(" + animationBg + ")" }')
	.h-screen.w-screen.absolute.z-10.bg-black.bg-opacity-60
	.h-screen.w-screen(v-if='allLoaded')
		.bgImg(
			v-for='(item ,index) in 236' 
			:style='{ "background-image": "url(" + getIndexBg(index) + ")" , "opacity": currentID===index ? "1": "0" }'
			@load="onImgLoad")
	.AnimationBgLoader
		img(v-for='(item ,index) in totalImgs' :src='getIndexBg(index)' @load='onImgLoad')
</template>
<script setup lang="ts">
	import { onUnmounted, ref } from 'vue';
	const allLoaded = ref(false);
	const preloaded = ref(0);
	const totalImgs = 235;

	const currentID = ref(0);
	const fps = 24;
	let loop: any = null;
	const animationBg = `${window.staticPath}/static/img/animationBg/bg_0.png`;
	const getIndexBg = (id: number) => `${window.staticPath}/static/img/animationBg/bg_${id}.png`;

	const step = () => {
		if (currentID.value >= totalImgs) {
			currentID.value = 1;
		} else {
			currentID.value += 1;
		}
		setTimeout(() => {
			loop = requestAnimationFrame(step);
		}, 1000 / fps);
	};
	onUnmounted(() => {
		cancelAnimationFrame(loop);
	});
	const onImgLoad = () => {
		preloaded.value += 1;
		if (preloaded.value >= totalImgs) {
			allLoaded.value = true;
			step();
		}
	};
</script>
<style lang="scss" scoped>
	.AnimationBg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-size: cover;
		background-position: center center;
		background-image: url(../img/animationPng/bg_0.png);
		z-index: 0;
		.AnimationBgContainer {
			position: absolute;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100vh;
		}
		.bgImg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-size: cover;
			background-position: center center;
		}
	}
	// 為了預先載入圖片@load使用的暫存loader 這樣才能全部圖片載入完成後 顯示loop動畫
	.AnimationBgLoader {
		opacity: 0;
		width: 0px;
		height: 0px;
	}
</style>
