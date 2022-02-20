<template lang="pug">
.mx-4.mt-4
	.home-banner
		van-swipe.my-swipe(:autoplay='3000', indicator-color='white')
			van-swipe-item.bannerImg(v-for='item in state.slideList')
				van-button.banner-button(@click='clickBanner(item)')
					img.w-full.object-cover(:src='item.slide_pic || ""', @error='errorBannerImg')
</template>
<script>
import { onMounted, reactive } from 'vue';
import { slideList } from '@/api';
import { deepLink } from '@/utils';
import { matomo_index_click_slide } from '@/matomoTrackEvent.js';

export default {
	setup() {
		// Component state
		const state = reactive({
			slideList: [],
		});

		// 點擊廣告
		const clickBanner = (item) => {
			// Slide url
			const url = item.slide_url;
			console.log(url);

			// Deep link
			if (url !== '') {
				deepLink(url);
			}

			// Matomo track
			matomo_index_click_slide(item.slide_name, item.slide_id);
		};

		// 廣告圖片讀取失敗
		const errorBannerImg = (e) => {
			e.target.src = '/publicAssets/img/default-banner@3x.png';
		};

		// On component mounted
		onMounted(() => {
			slideList({ slide_cid: 2 }).then((res) => {
				state.slideList = res.data.list;
			});
		});
		return {
			state,
			clickBanner,
			errorBannerImg,
		};
	},
};
</script>
<style lang="scss" scoped>
.home-banner {
	width: 100%;
	border-radius: 8px;
	padding-bottom: 39.06%;
	height: 0;
	overflow: hidden;
}
.banner-button {
	width: 100%;
	height: unset;
	padding: 0;
	border: transparent;
	background: transparent;
	::v-deep(.van-button__content) {
		width: 100%;
	}
	::v-deep(.van-button__text) {
		width: 100%;
	}
}
</style>
