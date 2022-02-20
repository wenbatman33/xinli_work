<template lang="pug">
.text-xs {{state.countNumber}}
</template>

<script>
import { computed, onMounted, onUnmounted, reactive, watch } from 'vue';

export default {
	props: ['endNumber'],
	setup(props) {
		const state = reactive({
			countNumber: 0,
			startTimestamp: null,
			start: 0,
			end: 0,
			duration: 0,
		});
		watch(
			() => props.endNumber,
			(newVal, oldVal) => {
				animateValue(Number(oldVal), Number(newVal), 3000);
			},
			{ deep: true }
		);
		const animateValue = (start, end, duration) => {
			state.start = start;
			state.end = end;
			state.duration = duration;
			state.startTimestamp = null;
			window.requestAnimationFrame(step);
		};
		const step = (timestamp) => {
			if (!state.startTimestamp) state.startTimestamp = timestamp;
			const progress = Math.min((timestamp - state.startTimestamp) / state.duration, 1);
			state.countNumber = Math.floor(progress * (state.end - state.start) + state.start);
			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};
		onMounted(() => {
			animateValue(0, Number(props.endNumber), 3000);
		});
		onUnmounted(() => {
			window.cancelAnimationFrame(step);
		});
		return {
			state,
			step,
			animateValue,
		};
	},
};
</script>
