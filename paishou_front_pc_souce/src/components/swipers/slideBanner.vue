<template lang="pug">
.slideBanner
	.swiper-wrapper
		.swiper-slide(v-for='(item, index) in state.adBannerList')
			img.cursor-pointer(:src='item.slide_pic', @click='bannerClick(item.slide_url)')
</template>

<script>
import Swiper, { Autoplay } from 'swiper';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, onUnmounted, reactive, computed, watch, nextTick, toRaw } from 'vue';
import { deepLink } from '@/utils';
import { slideList } from '@/api';
import { matomo_slide_banner } from '@/matomoEvent';

export default {
	props: ['slide_cid', 'autoPlaySpeed'],
	setup(props, { emit }) {
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			swiper: null,
			adBannerList: null,
		});
		const bannerClick = (url) => {
			matomo_slide_banner(route.path, props.slide_cid);
			if (url) deepLink(url);
		};
		watch(
			() => state.adBannerList,
			(newVal) => {
				nextTick(() => {
					setTimeout(() => {
						try {
							state.swiper.update();
						} catch (e) {
							// console.log(e);
						}
					}, 500);
				});
			},
			{ deep: true }
		);
		const init = () => {
			Swiper.use([Autoplay]);
			state.swiper = new Swiper('.slideBanner', {
				autoHeight: true,
				autoplay: {
					delay: props.autoPlaySpeed,
				},
			});
		};
		onMounted(() => {
			slideList({ slide_cid: props?.slide_cid }).then((res) => {
				state.adBannerList = res.data.list;
				init();
			});
		});
		onUnmounted(() => {
			// state?.swiper?.destroy();
			state.swiper = null;
		});
		return {
			route,
			router,
			state,
			init,
			bannerClick,
		};
	},
};
</script>

<style lang="scss" scoped>
.slideBanner {
	width: 100%;
	overflow: hidden;
}
</style>
