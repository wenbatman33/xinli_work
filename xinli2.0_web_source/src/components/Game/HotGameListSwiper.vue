<template lang="pug">
.w-full
	.BETWEEN.my-4 
		span.text-lg.font-bold {{data?.gameGroupDisplayName}}
		.FLEX_R_CENTER 
			router-link(:to='{ name: currentUrl, params: { id: data?.gameGroupID }}')
				span 更多
				SvgIcon.w-5.h-5.text-xBlue(:name='"#Arrow_Right_Line"')

	swiper.w-full.select-none(:slidesPerView="5" :spaceBetween="20" :navigation='navigationOption')
		swiper-slide(v-for='item in data?.gLists') 
			GameItem.w-10.h-10(:data='item')

		.swiper-button-prev
			SvgIcon.w-8.h-8.text-white(:name='"#Arrow_Left_Line"')
		.swiper-button-next
			SvgIcon.w-8.h-8.text-white(:name='"#Arrow_Right_Line"')
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
	import { Swiper, SwiperSlide } from 'swiper/vue';
	import { useRoute, useRouter } from 'vue-router';

	import GameItem from '@/components/Game/GameItem.vue';
	import SvgIcon from '@/components/SvgIcon/index.vue';
	// install Swiper modules
	SwiperCore.use([Autoplay, Pagination, Navigation]);
	const route = useRoute();
	const router = useRouter();
	const currentUrl = ref('');
	const props = defineProps({
		data: Object,
	});
	const navigationOption = {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	};
	onMounted(() => {
		currentUrl.value = String(route?.name);
	});
</script>

<style lang="scss" scoped>
	.swiper-button-prev,
	.swiper-button-next {
		width: 40px;
		height: 40px;
		border-radius: 100%;
		background: rgba(0, 0, 0, 0.4);
		overflow: hidden;
		&:hover {
			background: rgba(0, 0, 0, 0.6);
		}
	}
	.swiper-button-prev:after,
	.swiper-button-next:after {
		content: '';
	}
	.swiper-button-disabled {
		opacity: 0;
	}
</style>
