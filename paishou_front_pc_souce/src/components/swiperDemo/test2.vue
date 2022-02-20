<template lang="pug">
.SW
	.prev(@click='prev')
		LeftOutlined
	.next(@click='next')
		RightOutlined
	.swiper-container
		.swiper-wrapper
			.swiper-slide Slide 1
			.swiper-slide Slide 2
			.swiper-slide Slide 3
			.swiper-slide Slide 4
			.swiper-slide Slide 5
			.swiper-slide Slide 6
			.swiper-slide Slide 7
			.swiper-slide Slide 8
			.swiper-slide Slide 9
			.swiper-slide Slide 10
</template>
<script>
import Swiper from 'swiper';
import { computed, onMounted, onUnmounted, reactive, toRaw } from 'vue';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';

// let swiper;
export default {
	components: {
		LeftOutlined,
		RightOutlined,
	},
	setup() {
		const state = reactive({
			swiper: null,
		});
		const next = () => {
			state.swiper.slideNext();
		};
		const prev = () => {
			state.swiper.slidePrev();
		};
		onMounted(() => {
			state.swiper = new Swiper('.swiper-container', {
				slidesPerView: 4,
				spaceBetween: 30,
				// centeredSlides: true,
			});
		});
		onUnmounted(() => {
			state.swiper.destroy();
			state.swiper = null;
		});
		return {
			state,
			next,
			prev,
		};
	},
};
</script>
<style lang="scss" scoped>
.SW {
	position: relative;
	margin-left: 100px;
	width: 400px;
	height: 100px;
	background: #ccc;
	.swiper-container {
		height: 100%;
	}
	.prev {
		position: absolute;
		left: -20px;
		top: 45%;
	}
	.next {
		position: absolute;
		right: -20px;
		top: 45%;
	}
}
</style>
