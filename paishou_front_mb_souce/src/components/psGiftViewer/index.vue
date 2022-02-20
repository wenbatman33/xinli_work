<template lang="pug">
//- 直播間送禮動畫
.ps-gift-viewer
	#svgaViewer.svga(ref='canvas')
</template>
<script>
import { computed, reactive, watch, toRaw } from 'vue';
import { useStore } from 'vuex';
import SVGA from 'svgaplayerweb';

export default {
	name: 'ps-gift-viewer',
	setup() {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			playing: false,
			width: 710,
			height: 450,
		});

		// 動畫列表
		const svgaList = computed(() => {
			return store.state.socket.svgaList;
		});

		// 是否顯示動畫
		const svgaVisabled = computed(() => {
			return store?.state?.socket?.svgaVisabled === true;
		});

		// Show svga animation
		const showSVGA = (list) => {
			if (list.length < 1) {
				return;
			}
			if (svgaVisabled.value === false) {
				store.commit('socket/SHIFT_SVGA_LIST');
				return;
			}
			if (state.playing === false) {
				let div = document.getElementById('svgaViewer');
				let object = list[0];
				let url = object['url'];
				let splitList = url.split('.');
				let type = splitList[splitList.length - 1];
				if (type.indexOf('svga') !== -1) {
					const player = new SVGA.Player('#svgaViewer');
					player.loops = 1;
					player.setContentMode = 'AspectFill';

					const parser = new SVGA.Parser('#svgaViewer');
					parser.load(
						url,
						(videoItem) => {
							state.playing = true;
							player.setVideoItem(videoItem);
							player.startAnimation();
							setTimeout(() => {
								player.stopAnimation();
								let nodeList = [];
								for (let node of div.childNodes) {
									nodeList.push(node);
								}
								for (let node of nodeList) {
									node.parentNode.removeChild(node);
								}
								state.playing = false;
								store.commit('socket/SHIFT_SVGA_LIST');
							}, (parseFloat(videoItem.frames) / videoItem.FPS) * 1000);
						},
						() => {
							store.commit('socket/SHIFT_SVGA_LIST');
						}
					);
				}
			}
		};

		// Watch svga list changed
		watch(
			() => svgaList,
			(newList, oldList) => {
				showSVGA(toRaw(newList.value));
			},
			{ deep: true }
		);

		// Watch svga visibled changed
		watch(
			() => svgaVisabled.value,
			(visabled) => {
				if (!visabled) {
					const player = new SVGA.Player('#svgaViewer');
					player.stopAnimation(true);
				}
			}
		);
	},
};
</script>
<style lang="scss" scoped>
.ps-gift-viewer {
	position: absolute;
	z-index: 1001;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-items: center;
	pointer-events: none;
	div {
		text-align: center;
		margin: 0 auto;
	}
}
#svgaViewer {
	width: 100%;
	height: 100%;
}
</style>
