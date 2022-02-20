<template lang="pug">
#globalLoading.WH_FULL.fixed.CENTER.bg-black.bg-opacity-20.hidden
	.w-20.h-20.rounded-xl.bg-black.bg-opacity-60.CENTER
		a-spin(:indicator="indicator" size="large")

</template>
<script setup lang="ts">
	import { h } from 'vue';
	import { LoadingOutlined } from '@ant-design/icons-vue';
	const indicator = h(LoadingOutlined, {
		style: {
			fontSize: '24px',
		},
		spin: true,
	});
</script>
