<template lang="pug">
.w-full
	.mx-4
		
	.SW
		.prevBtn
			LeftOutlined
		.nextBtn
			RightOutlined
		swiper(
			ref='myswiper'
			:slides-per-view='4',
			:options="state.swiperOptions", 
			navigation,
			:space-between='10')
			swiper-slide 
				.mydiv Slide 1
			swiper-slide 
				.mydiv Slide 2
			swiper-slide 
				.mydiv Slide 3
			swiper-slide 
				.mydiv Slide 4
			swiper-slide 
				.mydiv Slide 5
			swiper-slide 
				.mydiv Slide 6
</template>
<script>
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide, SwiperWrapper } from 'swiper/vue';
import { computed, onMounted, reactive, ref, toRaw } from 'vue';
// import 'swiper/components/navigation/navigation.scss';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';

SwiperCore.use([Navigation]);
export default {
	components: {
		Swiper,
		SwiperWrapper,
		SwiperSlide,
		LeftOutlined,
		RightOutlined,
	},

	setup() {
		const myswiper = ref(null);

		const state = reactive({
			swiperOptions: {
				navigation: {
					nextEl: '.prevBtn',
					prevEl: '.nextBtn',
				},
			},
		});
		return {
			state,
			myswiper,
		};
	},
};
</script>
<style lang="scss" scoped>
.SW {
	margin-left: 100px;
	width: 500px;
	height: 200px;
	background: #fff;
	.swiper-container {
		height: 100%;
	}
}
::v-deep(.swiper-button-prev) {
	width: 16px !important;
	height: 16px !important;
	top: 50% !important;
	left: 0px;
	font-size: 14px !important;
	&::after {
		font-size: 14px !important;
	}
}
::v-deep(.swiper-button-next) {
	width: 16px !important;
	height: 16px !important;
	top: 50% !important;
	right: 0px;
	&::after {
		font-size: 14px !important;
	}
}
::v-deep(.swiper-container) {
	padding: 0 40px;
}
::v-deep(.swiper-wrapper) {
	overflow: hidden;
}
.mydiv {
	background: #f90;
	height: 100%;
}
</style>
