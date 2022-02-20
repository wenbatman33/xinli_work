<template lang="pug">
.comboNumber(:class='{"onScale": state.isScale}') {{countnumber}}
</template>

<script>
import { computed, onMounted, onUnmounted, reactive, watch } from 'vue';

export default {
	props: ['countnumber'],
	setup(props) {
		const state = reactive({
			timer: null,
			isScale: false,
		});
		watch(
			() => props.countnumber,
			(newVal, oldVal) => {
				newVal !== oldVal ? init() : null;
			},
			{ deep: true }
		);
		const init = () => {
			state.isScale = true;
			state.timer = setTimeout(() => {
				state.isScale = false;
			}, 1000);
		};
		onMounted(() => {
			init();
		});
		onUnmounted(() => {
			clearTimeout(state.timer);
		});
		return {
			state,
		};
	},
};
</script>
<style lang="scss">
.onScale {
	transform-origin: center;
	animation: scaleNumber 0.3s;
}

@keyframes scaleNumber {
	0% {
		transform: scale(1, 1);
	}
	50% {
		transform: scale(1.4, 1.4);
	}
	100% {
		transform: scale(1, 1);
	}
}
</style>
