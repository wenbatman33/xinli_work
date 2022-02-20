<template lang="pug">
.maintain.w-full.FLEX_C.justify-around.items-center
	.maintainImg(:style='state.style')
		img(src='/publicAssets/img/maintain/maintenance.png')
	.maintainTips.text-white {{state.maintainTips}}
	.footer_bottom 
		h4.text-white.py-2 Copyright © Paishou 2020 
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, onUnmounted, computed, reactive, toRaw } from 'vue';
import { browserType } from '@/utils';

export default {
	setup() {
		const isPc = browserType();
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			maintainTips: '',
			offsetX: '',
			offsetY: '',
			friction: 1 / 24,
			style: null,
		});
		const mouseMove = (e) => {
			let followX = window.innerWidth / 2 - e.clientX;
			let followY = window.innerHeight / 2 - e.clientY;
			let x = 0;
			let y = 0;
			x += (-followX - x) * state.friction;
			y += (followY - y) * state.friction;
			state.offsetX = x;
			state.offsetY = y;
			state.style = { transform: `translate(-50%, -50%) perspective(600px) rotateY(${state.offsetX}deg) rotateX(${state.offsetY}deg)` };
		};
		const mobileRoll = (e) => {
			let followX = e.gamma * 5;
			let followY = e.beta * 5;
			// gamma aplha beta
			let x = 0;
			let y = 0;
			x += (-followX - x) * state.friction * 10;
			y += 90 - (followY - y) * state.friction * 10;
			state.offsetX = x;
			state.offsetY = y;
			state.style = { transform: `translate(-50%, -50%) perspective(600px) rotateY(${state.offsetX}deg) rotateX(${state.offsetY}deg)` };
		};
		onMounted(() => {
			isPc ? window.removeEventListener('mousemove', mouseMove) : window.removeEventListener('touchmove', mouseMove);
			// window.removeEventListener('deviceorientation', mobileRoll);
		});
		onMounted(() => {
			const config = JSON.parse(window.localStorage.CONFIG);
			state.maintainTips = config.maintain_tips;
			isPc ? window.addEventListener('mousemove', mouseMove) : window.addEventListener('touchmove', mouseMove);
			// window.addEventListener('deviceorientation', mobileRoll);
			// ---------------------------------------------------------------
			// maintain_switch ='0' 結束維修導向首頁
			if (Number(config.maintain_switch) !== 1) {
				router.push('/');
			}
		});
		return {
			state,
			mouseMove,
			isPc,
		};
	},
};
</script>
<style lang="scss" scoped>
.maintain {
	position: relative;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	background-image: linear-gradient(243deg, #005ac9, #03cfc6);
}
.maintainImg {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) perspective(600px) rotateY(20deg) rotateX(10deg);
	transform-style: preserve-3d;
	@media screen and (min-width: 320px) and (max-width: 720px) {
		width: 120%;
		top: 30%;
	}
}
.maintainTips {
	position: absolute;
	bottom: 100px;
	width: 50%;
	max-width: 360px;
}
.footer_bottom {
	position: absolute;
	bottom: 0px;
	text-align: center;
	width: 100%;
	background: #a62337;
}
</style>
