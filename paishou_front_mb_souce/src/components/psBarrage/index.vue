<template lang="pug">
//- 直播間彈幕
.BARRAGE
	#CANVAS_BARRAGE.CANVAS_BARRAGE
		.BARRAGE_LINE.my-2
		.BARRAGE_LINE.my-2
		.BARRAGE_LINE.my-2
		.BARRAGE_LINE.my-2
		.BARRAGE_LINE.my-2
</template>
<script>
import { computed, reactive, watch, toRaw } from 'vue';
import { useStore } from 'vuex';

export default {
	name: 'ps-barrage',
	setup() {
		// Vuex store
		const store = useStore();

		// 彈幕列表
		const barrageList = computed(() => {
			return store?.state?.socket?.barrageList || '';
		});

		// 是否顯示彈幕
		const barrageVisabled = computed(() => {
			return store?.state?.socket?.barrageVisabled === true;
		});

		// Component state
		const state = reactive({
			currentNum: 0,
		});

		// 加入彈幕
		const addBarrage = (item) => {
			const node = document.createElement('p');
			node.className = 'BARRAGE_LINE_ITEM';
			const textnode = document.createTextNode(item?.msg || '');
			node.appendChild(textnode);
			document.querySelector('.CANVAS_BARRAGE').childNodes[state.currentNum % 5].appendChild(node);
			state.currentNum += 1;
			setTimeout(() => {
				try {
					node.parentNode.removeChild(node);
				} catch (e) {}
			}, 10000);
		};

		// Watch barrage list changed
		watch(
			() => barrageList,
			(newList, oldList) => {
				const MSG = toRaw(newList.value).slice(-1)[0];
				if (barrageVisabled.value) {
					addBarrage(MSG);
				}
			},
			{ deep: true }
		);

		// Watch barrage visibled changed
		watch(
			() => barrageVisabled.value,
			(visabled) => {
				if (!visabled) {
					document.querySelector('.CANVAS_BARRAGE').childNodes.forEach((node) => {
						node.innerHTML = '';
					});
				}
			}
		);
	},
};
</script>
<style lang="scss">
.BARRAGE_LINE_ITEM {
	position: absolute;
	width: 100%;
	top: 0;
	user-select: none;
	font-size: 16px;
	color: #fff;
	text-shadow: 1px 1px 2px black;
	animation-name: fadeLeft;
	animation-duration: 10s;
	animation-fill-mode: forwards;
	animation-timing-function: linear;
}
@keyframes fadeLeft {
	0% {
		transform: translateX(100%);
	}
	100% {
		transform: translateX(-100%);
	}
}
</style>
<style lang="scss" scoped>
.BARRAGE {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	z-index: 1000;
	pointer-events: none;
}
.CANVAS_BARRAGE {
	user-select: none;
	position: relative;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.05);
	overflow: hidden;
	pointer-events: none;
}
.BARRAGE_LINE {
	position: relative;
	width: 100%;
	overflow: hidden;
	&:before {
		content: '\00a0 ';
	}
}
</style>
