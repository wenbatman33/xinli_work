<template lang="pug">
svg.fill-current
	use(:xlink:href="props.name")
</template>

<script setup lang="ts">
	const props = defineProps({
		name: String,
	});
</script>
