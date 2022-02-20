<template>
	<div class="container pb-4 FLEX_C">
		<div class="container px-2 py-4 FLEX_C">
			<a :href="apiImgPath(imgPath)" download class="FLEX_C">
				<van-image :src="apiImgPath(imgPath)" />
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { apiImgPath } from '@/utils'
	import { useRoute } from 'vue-router';
	const route = useRoute();
	const imgPath = route.query.path?.toString()
</script>

<style lang="less" scoped>
	.van-cell::after,
	[class*='van-hairline']::after {
		display: none;
	}
	.bgColor {
		background: linear-gradient(101.58deg, #333333 3.4%, #1a1a1a 97.37%);
	}
</style>
