<template lang="pug">
.FLEX_C.CENTER.bg-gray-100(:class='"h-[740px]"')
	swiper.mySwiper.w-full.select-none(
		v-if='bannerList.length>0'
		:loop="true" 
		:autoplay='{"delay": 2500, "disableOnInteraction": false}' 
		:pagination='{"clickable": true}' 
		:navigation='navigationOption')
		swiper-slide.cursor-pointer(v-for='item in bannerList' @click='deepLink(item.targetURL)')
			img(:src='apiImgPath(item.imageWeb)' @error='errorImg')
			
		.swiper-button-prev
			SvgIcon.w-8.h-8.text-white(:name='"#Arrow_Left_Line"')
		.swiper-button-next
			SvgIcon.w-8.h-8.text-white(:name='"#Arrow_Right_Line"')

</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
	import { Swiper, SwiperSlide } from 'swiper/vue';
	import { errorImg, apiImgPath, deepLink } from '@/utils';
	import { getEventBanner } from '@/api';
	import SvgIcon from '@/components/SvgIcon/index.vue';
	// Import Swiper styles
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';
	import 'swiper/css/scrollbar';

	SwiperCore.use([Autoplay, Pagination, Navigation]);

	const navigationOption = {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	};

	const bannerList = ref([] as any);
	const init = async () => {
		const res = await getEventBanner({ categortyID: 1 });
		bannerList.value = res.data.data?.list;
	};
	onMounted(() => {
		init();
	});
</script>

<style lang="scss" scoped>
	.swiper {
		width: 100%;
		height: 100%;
	}

	.swiper-slide {
		text-align: center;
		font-size: 18px;
		background: #fff;

		/* Center slide text vertically */
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
	}

	.swiper-slide img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.mySwiper {
		// height: 740px;
	}
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
	::v-deep(.swiper-pagination-bullet) {
		margin-right: 20px !important;
		width: 12px;
		height: 12px;
	}
	::v-deep(.swiper-pagination-bullet-active) {
		background: #f0453a !important;
	}
	::v-deep(.swiper-pagination) {
		padding: 0 90px !important;
		text-align: left !important;
		margin-bottom: 30px;
	}
</style>
