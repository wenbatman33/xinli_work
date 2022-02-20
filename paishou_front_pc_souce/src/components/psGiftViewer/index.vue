<template lang="pug">
.psGiftViewer
	#svgaViewer.svga(ref='canvas')
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted, reactive, watch, toRaw } from 'vue';
import SVGA from 'svgaplayerweb';

export default {
	name: 'giftView',
	setup() {
		const store = useStore();
		const state = reactive({
			isShow: false,
			width: 710,
			height: 450,
		});
		const taskList = computed(() => store.state.socket.taskList);
		const showSVGADemo = (list) => {
			const player = new SVGA.Player('#svgaViewer');
			player.loops = 1;
			player.setContentMode = 'AspectFill';
			const parser = new SVGA.Parser('#svgaViewer');
			// parser.load('http://svga.io/assets/svga/index-response.svga', function(videoItem) {
			parser.load('http://svga.io/assets/svga/index-response.svga', function (videoItem) {
				// console.log(videoItem);
				// state.width = videoItem.videoSize.width;
				// state.height = videoItem.videoSize.height;
				player.setVideoItem(videoItem);
				player.startAnimation();
			});
		};
		const showSVGA = (list) => {
			if (list.length < 1) return;
			if (state.isShow == false) {
				let div = document.getElementById('svgaViewer');
				let object = list[0];
				let url = object['url'];
				let splitList = url.split('.');
				let type = splitList[splitList.length - 1];
				if (type.indexOf('svga') !== -1) {
					state.isShow = true;
					const player = new SVGA.Player('#svgaViewer');
					player.loops = 1;
					player.setContentMode = 'AspectFill';
					const parser = new SVGA.Parser('#svgaViewer');
					parser.load(url, function (videoItem) {
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
							state.isShow = false;
							store.commit('socket/DELETE_GIFT');
						}, (parseFloat(videoItem.frames) / videoItem.FPS) * 1000);
					});
				}
			}
		};
		watch(
			() => taskList,
			(newList, oldList) => {
				showSVGA(toRaw(newList.value));
			},
			{ deep: true }
		);
		onMounted(() => {
			// showSVGADemo();
		});
		return {
			store,
			state,
			taskList,
			showSVGA,
			showSVGADemo,
		};
	},
};
</script>

<style lang="scss" scoped>
.psGiftViewer {
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
