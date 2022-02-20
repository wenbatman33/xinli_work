<template lang="pug">
a-modal(:visible='state.showOverLayerBanner', :bodyStyle='{"padding":"0"}', :footer='null', :closable='true', :maskClosable='false', centered, @cancel='closeModal')
	.adBnner.overflow-hidden
		.swiper-wrapper
			.swiper-slide(v-for='item in state.overLayerBannerList')
				img.cursor-pointer(:src='item.slide_pic', @click='bannerClick(item.slide_url)')
		.w-full#pagination.swiper-pagination
</template>

<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, onUnmounted, reactive, ref, watch, nextTick } from 'vue';
import { slideList } from '@/api';

import Swiper, { Autoplay } from 'swiper';
import { deepLink } from '@/utils';

export default {
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			swiper: null,
			overLayerBannerList: null,
			showOverLayerBanner: false,
		});

		const UID = computed(() => store.state.user.uid || '');
		const isLogin = computed(() => store.state.user.token !== '' && store.state.user.uid !== '');

		const closeModal = () => {
			state.showOverLayerBanner = false;
		};
		const bannerClick = (url) => {
			state.showOverLayerBanner = false;
			if (isLogin.value) {
				deepLink(url);
			} else {
				let routeUrl = router.resolve(`/download`);
				window.open(routeUrl.href, '_blank');
			}
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
			slideList({ slide_cid: 27 }).then((res) => {
				window.localStorage.setItem('PAISHOU_LANDED', true);
				state.showOverLayerBanner = true;
				state.overLayerBannerList = res?.data?.list;
				swiperInit();
			});
		};

		onMounted(() => {
			init();
		});

		onUnmounted(() => {
			// state?.swiper?.destroy();
			state.swiper = null;
		});

		return {
			store,
			state,
			route,
			router,
			UID,
			isLogin,
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
