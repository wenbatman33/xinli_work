<template lang="pug">
.BARRAGE
	#CANVAS_BARRAGE.CANVAS_BARRAGE
		.BARRAGE_LINE.my-2
		.BARRAGE_LINE.my-2
		.BARRAGE_LINE.my-2
		.BARRAGE_LINE.my-2
		.BARRAGE_LINE.my-2
		.BARRAGE_LINE.my-2
		.BARRAGE_LINE.my-2
		.BARRAGE_LINE.my-2
		.BARRAGE_LINE.my-2
</template>
<script>
import { useStore } from 'vuex';
import { computed, reactive, watch, toRaw } from 'vue';

export default {
	props: ['dataList'],
	setup(props) {
		let timer = null;
		const store = useStore();
		const BARRAGE_LIST = computed(() => store.state.socket.barrageList || '');
		const state = reactive({
			currentNum: 0,
		});
		const addBarrage = (item) => {
			const node = document.createElement('p');
			node.className = 'BARRAGE_LINE_ITEM';
			const textnode = document.createTextNode(item.msg);
			node.appendChild(textnode);
			document.querySelector('.CANVAS_BARRAGE').childNodes[state.currentNum % 9].appendChild(node);
			state.currentNum += 1;
			setTimeout(() => {
				node.parentNode.removeChild(node);
			}, 10000);
		};
		watch(
			() => BARRAGE_LIST,
			(newList, oldList) => {
				const MSG = toRaw(newList.value).slice(-1)[0];
				addBarrage(MSG);
			},
			{ deep: true }
		);
		return {
			state,
			addBarrage,
			BARRAGE_LIST,
		};
	},
};
</script>
<style lang="scss">
.BARRAGE_LINE_ITEM {
	position: absolute;
	width: 100%;
	top: 0;
	user-select: none;
	font-size: 120%;
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
	// background: #ccc;
	&:before {
		content: '\00a0 ';
	}
}
</style>
