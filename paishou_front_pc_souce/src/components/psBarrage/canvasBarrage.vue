<template lang="pug">
.barrage
	canvas#canvasBarrage.canvas-barrage
</template>
<script>
import { useStore } from 'vuex';
import { computed, reactive, onMounted, onUnmounted } from 'vue';

export default {
	setup() {
		let timer = null;
		const state = reactive({
			num: 1,
			barrageList: [],
			speed: 1,
			loop: false,
			hx: 900,
		});
		const barrageDraw = () => {
			state.hx -= 3;
			// ------------------------------------------------------
			const canvas = document.querySelector('#canvasBarrage');
			const context = canvas.getContext('2d');

			context.clearRect(0, 0, canvas.width, canvas.height);

			canvas.width = canvas.clientWidth ? canvas.clientWidth : 0;
			canvas.height = canvas.clientHeight ? canvas.clientHeight : 0;
			context.font = 'bold 16px "microsoft yahei", sans-serif';
			context.fillStyle = 'rgba(255,255,255,1)';
			context.shadowOffsetX = 2;
			context.shadowOffsetY = 2;
			context.shadowBlur = 2;
			context.shadowColor = 'rgba(0, 0, 0, 0.5)';
			// ------------------------------------------------------
			state.barrageList.forEach((item, index) => {
				if (!item.position) {
					item.position = [720, Math.floor(Math.random() * 280) + 20];
				} else {
					item.position[0] -= 3;
				}
				const msg = item.msg;

				context.fillText(msg, item.position[0], item.position[1]);
				if (item.position[0] <= 0 - context.measureText(msg).width) {
					state.barrageList.splice(index, 1);
				}
			});
			// ------------------------------------------------------
			timer = requestAnimationFrame(barrageDraw);

			// ------------------------------------------------------
		};
		const removeAnimation = () => {
			cancelAnimationFrame(timer);
		};
		const init = () => {
			window.requestAnimationFrame = (function () {
				return (
					window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					function (callback) {
						window.setTimeout(callback, 1000 / 60);
					}
				);
			})();

			const canvas = document.querySelector('#canvasBarrage');
			const context = canvas.getContext('2d');
			barrageDraw();
		};
		onUnmounted(() => {
			cancelAnimationFrame(timer);
		});
		onMounted(() => {
			init();
		});
		return {
			state,
			init,
			barrageDraw,
			removeAnimation,
		};
	},
};
</script>
<style lang="scss" scoped>
.barrage {
	position: absolute;
	width: 100%;
	height: 320px;
	top: 0;
	z-index: 10000;
}
.canvas-barrage {
	position: relative;
	width: 100%;
	height: 320px;
}
</style>
