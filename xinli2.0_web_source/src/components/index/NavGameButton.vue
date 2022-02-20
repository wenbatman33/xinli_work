<template lang="pug">
.NavGameButton.relative.cursor-pointer(:class='"w-[312px] h-[170px]"' @mouseover="isHover=true" @mouseout="isHover=false" )
	.Bg.WH_FULL.absolute.top-0.bg-cover.z-0.animate-fadeIn(:style='{ "background-image": "url(" + navBg + ")"}')
	.HoverBg.WH_FULL.absolute.top-0.bg-cover.z-10.animate-fadeIn(v-if='isHover===true' :style='{ "background-image": "url(" + navBgHover + ")"}' :class='"hover:opacity-100"' )
	img.navItemHoverBg.absolute.top-0.z-20(:class='"w-[312px] h-[170px]"' :src='apiImgPath(props.data?.imagePc)')


</template>
<script setup lang="ts">
	import { ref } from 'vue';
	import { apiImgPath } from '@/utils';

	const navBg = `${window.staticPath}/static/img/index/nav/navBg@2x.png`;
	const navBgHover = `${window.staticPath}/static/img/index/nav/navBgHover@2x.png`;

	const isHover = ref(false);
	const props = defineProps({
		data: Object,
	});
</script>
