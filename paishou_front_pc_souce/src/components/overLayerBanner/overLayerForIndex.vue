<template lang="pug">
a-modal(:visible='state.showOverLayerBanner', :bodyStyle='{"padding":"0"}', :footer='null', :closable='true', :maskClosable='false', centered, @cancel='closeModal')
	.adBnner.overflow-hidden
		.swiper-wrapper
			.swiper-slide(v-for='item in state.overLayerBannerList')
				img.cursor-pointer(:src='item.slide_pic', @click='bannerClick(item.slide_url)')
		.w-full#pagination.swiper-pagination
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, onUnmounted, reactive, ref, watch, nextTick } from 'vue';
import { slideList } from '@/api';

import Swiper, { Autoplay } from 'swiper';
import { deepLink } from '@/utils';

export default {
	setup() {
		const route = useRoute();
		const state = reactive({
			swiper: null,
			overLayerBannerList: null,
			showOverLayerBanner: false,
		});

		const closeModal = () => {
			state.showOverLayerBanner = false;
		};
		const bannerClick = (url) => {
			state.showOverLayerBanner = false;
			if (url) deepLink(url);
		};

		const swiperInit = () => {
			setTimeout(() => {
				Swiper.use([Autoplay]);
				state.swiper = new Swiper('.adBnner', {
					autoHeight: true,
					autoplay: {
						delay: 2000,
					},
					loop: true,
					pagination: {
						el: '.swiper-pagination',
						type: 'bullets',
						bulletElement: 'li',
						clickable: true,
					},
				});
			}, 800);
		};
		const init = () => {
			if (!window.localStorage.PAISHOU_LANDED) {
				slideList({ slide_cid: 27 }).then((res) => {
					window.localStorage.setItem('PAISHOU_LANDED', true);
					state.showOverLayerBanner = true;
					state.overLayerBannerList = res?.data?.list;
					swiperInit();
				});
			}
		};

		onMounted(() => {
			init();
		});

		onUnmounted(() => {
			// state?.swiper?.destroy();
			state.swiper = null;
		});

		return {
			state,
			route,
			closeModal,
			init,
			bannerClick,
			swiperInit,
		};
	},
};
</script>

<style lang="scss">
::v-deep(.swiper-pagination-bullet-active) {
	background-color: #a62337 !important;
}
</style>
