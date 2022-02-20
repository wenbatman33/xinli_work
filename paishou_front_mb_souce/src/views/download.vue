<template lang="pug">
.download
	//- 背景圖片
	.bg-layer
		.bg-top

	//- 內容
	.content.pt-8
		//- Logo
		.text-center#Home_Anchor
			img.cursor-pointer(src='/publicAssets/img/download/img-logo.png'  srcset='/publicAssets/img/download/img-logo@2x.png 2x' @click='backMainPage')

		//- 標題
		.text-center
			img(style='width:360px' src='/publicAssets/img/download/img-download-text.png'  srcset='/publicAssets/img/download/img-download-text@2x.png 2x')

		//- 手機圖
		.text-center
			img(style='width:240px' src='/publicAssets/img/download/h-5-img.png'  srcset='/publicAssets/img/download/h-5-img@2x.png 2x')

		//- 下載按鈕
		.flex.flex-col.flex-grow.mx-4
			.grid.grid-cols-2.gap-4
				//- Android
				.col-span-1.cursor-pointer(@click='downloadAPK')
					.flex.flex-col.bg-white.bg-opacity-75.rounded.p-2
						h4.text-center.text-psV3Red Android下载
						.text-xs.text-center.text-psV3Red Android 适用

				//- iOS
				.col-span-1.cursor-pointer(@click='downloadMobileConfig')
					.flex.flex-col.bg-white.bg-opacity-75.rounded.p-2
						h4.text-center.text-psV3Red iOS下载
						.text-xs.text-center.text-psV3Red iOS 适用

			//- PWA
			.cursor-pointer.mt-4(@click='scrollPWA')
				.flex.flex-col.bg-white.bg-opacity-75.rounded.p-2
					h4.text-center.text-psV3Red 快速安装
					.text-xs.text-center.text-psV3Red iOS 与 Android皆适用

		//- 安裝教學標題
		.my-12
			.text-xs.text-center 快速安装教学
			.text-center
				img.w-4(src='/publicAssets/img/download/icon-bottomarrow.png'  srcset='/publicAssets/img/download/icon-bottomarrow@2x.png 2x')

		//- 側邊欄
		.index-bar
			.absolute.right-0.flex.flex-col.items-center.bg-white.rounded-l.px-2.py-4
				.flex.flex-col.items-center.cursor-pointer(@click='backMainPage')
					img.w-6.h-6(src='/publicAssets/img/download/home.png')
					.text-xs.font-bold 首页
				divider.my-2
				.flex.flex-col.items-center.cursor-pointer(@click='scrollMobileConfig')
					img.w-6.h-6(src='/publicAssets/img/download/applelogo.png')
					.text-xs.font-bold iOS
				divider.my-2
				.flex.flex-col.items-center.cursor-pointer(@click='scrollPWA')
					img.w-6.h-6(src='/publicAssets/img/download/LightningCharge.png')
					.text-xs.font-bold 快速
				divider.my-2
				.flex.flex-col.items-center.cursor-pointer(@click='scrollTop')
					img.w-6.h-6(src='/publicAssets/img/download/top-web.png')
					.text-xs.font-bold 顶部

		//- iOS 安裝教學
		.my-8
			h2.text-center#MobileConfig_Anchor iOS下载
			.text-xs.text-center.mt-2 iOS适用
		.grid.grid-cols-1.gap-4.my-4
			.col-span-1.text-center(v-for='(item, key) in state.iOS_SlideList')
				img.w-full(style='width:240px' :src='item.slide_pic', alt='')
				.text-xs.text-center.my-2 {{state.iOS_SlideDes[key]}}
		.mx-4
			.cursor-pointer(@click='downloadMobileConfig')
				.flex.flex-col.bg-white.bg-opacity-75.rounded.p-2
					h4.text-center.text-psV3Red 立即下载体验
		.my-20

		//- PWA 安裝教學
		.my-8
			h2.text-center#PWA_Anchor 快速安装教学
			.text-xs.text-center.mt-2 iOS 与 Android皆适用
		.grid.grid-cols-1.gap-4.my-4
			.col-span-1.text-center(v-for='(item, key) in state.PWA_SlideList')
				img.w-full(style='width:240px' :src='item.slide_pic', alt='')
				.text-xs.text-center.my-2 {{state.PWA_SlideDes[key]}}
		.text-center.h-44.overflow-hidden
			img(style='width:240px' src='/publicAssets/img/download/img-logohead.png'  srcset='/publicAssets/img/download/img-logohead@2x.png 2x')

	//- Copyright
	.bg-black.p-2
		.text-center.text-white Copyright © paishou {{currentYear}}
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted, computed, reactive } from 'vue';
import { slideList } from '@/api';
import { matomo_download_ios, matomo_download_android, matomo_download_pwa, matomo_download_home } from '@/matomoTrackEvent.js';
import divider from '@/components/divider';
import dayjs from 'dayjs';

export default {
	components: {
		divider,
	},
	setup() {
		const currentYear = computed(() => dayjs().format('YYYY'));
		const store = useStore();
		const router = useRouter();
		const APK_URL = computed(() => (store.state.config.config ? store.state.config.config.apk_url : ''));
		const state = reactive({
			param: {},
			url: '',
			showPWAModal: false,
			iOS_SlideList: [],
			iOS_SlideDes: ['下载描述档', '打开设置', '点击已下载描述安装档', '点击安装', '点击安装', '点击安装', '点击完成', '开始体验'],
			PWA_SlideList: [],
			PWA_SlideDes: ['开启拍手手机版网页，点击浏览器分享按钮', '选择加入主画面', '点击新增按钮', '在桌面建立快捷'],
			mobileSite: null,
		});
		const init = () => {
			// iOS 教學縮圖
			slideList({ slide_cid: 10 }).then((res) => {
				state.iOS_SlideList = res.data.list;
			});

			// PWA 教學縮圖
			slideList({ slide_cid: 11 }).then((res) => {
				state.PWA_SlideList = res.data.list;
			});
			state.mobileSite = process.env.VUE_APP_PWA_URL;
		};
		const scrollTop = () => {
			window.document.getElementById('Home_Anchor').scrollIntoView();
		};
		const scrollMobileConfig = () => {	
			window.document.getElementById('MobileConfig_Anchor').scrollIntoView();
		};
		const scrollPWA = () => {
			matomo_download_pwa();
			window.document.getElementById('PWA_Anchor').scrollIntoView();
		};
		const downloadAPK = () => {
			matomo_download_android();
			if (APK_URL.value) {
				window.location.href = APK_URL.value;
			}
		};
		const downloadMobileConfig = () => {
			matomo_download_ios();
			window.location.href = '/publicAssets/apps/PaishouLive.mobileconfig';
		};
		const closeModel = () => {
			state.showPWAModal = false;
		};
		const backMainPage = () => {
			matomo_download_home();
			router.replace('/');
		};
		onMounted(() => {
			init();
		});
		return {
			currentYear,
			store,
			APK_URL,
			state,
			init,
			scrollTop,
			scrollMobileConfig,
			scrollPWA,
			downloadAPK,
			downloadMobileConfig,
			closeModel,
			backMainPage,
		};
	},
};
</script>
<style lang="scss">
.PWA_Modal {
	width: 680px;
	border-radius: 8px !important;
	overflow: hidden;
	padding-bottom: 0px !important;
}
</style>
<style lang="scss" scoped>
.download {
	position: relative;
	background: linear-gradient(136deg, #f3e7e9 0%, #e3eeff 100%);
	min-height: 900px;
}
.bg-layer {
	position: absolute;
	width: 100%;
	height: 100%;
	min-height: 900px;
	z-index: 1;
	overflow: hidden;
	user-select: none;
	top: 0;
	.bg-top {
		width: 150%;
		height: 400px;
		position: absolute;
		top: 0%;
		left: 50%;
		transform: translate(-50%, -20%);
		border-radius: 100%;
		background-image: linear-gradient(90deg, #ffc156 0%, #ffa251 27%, #fe6847 50%, #e74d6a 78%, #c439a4 100%);
	}
}
.content {
	position: relative;
	top: 0;
	width: 100%;
	min-height: 800px;
	margin: auto auto;
	z-index: 2;
}
.index-bar {
	position: sticky;
	top: 0px;
	color: #A62337;
	z-index: 9999;
}
</style>
