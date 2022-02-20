<template lang="pug">
.NumberWrap.relative(:style='`font-size:${props.fontSize}px; height:${props.fontSize}px;`')
	.NumberItem(v-if='isNaN(Number(props.rollText))') {{props.rollText}}
	.NumberItem(v-else :style='roolStyle')
		p 0
		p 1
		p 2
		p 3
		p 4
		p 5
		p 6
		p 7
		p 8
		p 9
</template>

<script setup lang="ts">
	import { onMounted, ref, defineProps, computed } from 'vue';
	interface Props {
		fontSize: number;
		rollText: string;
		speed: number;
	}
	const props = defineProps<Props>();
	const roolStyle = ref('');

	const init = () => {
		roolStyle.value = `transition-property: margin-top; transition-duration: ${props.speed}s; margin-top: -${Number(props.rollText) * props.fontSize}px`;
	};
	onMounted(() => {
		setTimeout(() => {
			init();
		}, 500);
	});
</script>
<style lang="scss" scoped>
	.NumberWrap {
		line-height: 1 !important;
		margin-top: 0;
		overflow: hidden;
	}
</style>
