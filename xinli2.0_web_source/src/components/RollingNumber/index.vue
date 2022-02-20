<template lang="pug">
.content
	.box.text-white
		span.preFix.mr-4(v-if='props.preFix' :style='{fontSize: (props.fontSize||30)+"px"}') {{props.preFix}}
		NumberItem(v-for='item in rollString' :fontSize='props.fontSize||30' :rollText='item' :speed='props.speed||2')
</template>

<script setup lang="ts">
	import { defineProps, computed } from 'vue';
	import NumberItem from '@/components/RollingNumber/NumberItem.vue';
	interface Props {
		preFix?: string;
		number?: string;
		fontSize?: number | undefined;
		speed?: number | undefined;
	}
	const props = defineProps<Props>();
	const rollString = computed(() => String(props.number));
</script>
<style lang="scss" scoped>
	.box {
		overflow: hidden;
		display: flex;
		height: 100px;
	}
	.preFix {
		line-height: 1;
	}
</style>
