<template lang="pug">
.downloadV2
	.bgLayer.relative
		.topBg
			img(src='/publicAssets/img/download/img-assistimg-2.png')
		.bottomBg
			img(src='/publicAssets/img/download/img-assistimg-1.png')
	.content.FLEX_R.pt-20
		.leftContent
			img(src='/publicAssets/img/download/web-img.png'  srcset='/publicAssets/img/download/web-img@2x.png 2x')
		.rightContent.px-8
			img(src='/publicAssets/img/download/img-download-text.png'  srcset='/publicAssets/img/download/img-download-text@2x.png 2x')
			.FLEX_R
				vue-qrcode(v-if='state.PWA_URL', :value='state.PWA_URL', :width='168')
				.FLEX_C.flex-grow.mx-4
					.grid.grid-cols-1.gap-4
						.col-span-1.bg-white.bg-opacity-75.rounded.h-20.p-4.FLEX_R.cursor-pointer(@click='downloadAPK')
							span
								img(src='/publicAssets/img/download/icon-android.png'  srcset='/publicAssets/img/download/icon-android@2x.png 2x')
							span.mx-4
								h4.text-psV3Red Android下载
								.text-xs.text-psV3Red Android 适用
						.col-span-1.bg-white.bg-opacity-75.rounded.h-20.p-4.FLEX_R.cursor-pointer(@click='downloadIOS')
							span
								img(src='/publicAssets/img/download/icon-applelogo.png'  srcset='/publicAssets/img/download/icon-applelogo@2x.png 2x')
							span.mx-4
								h4.text-psV3Red iOS安装教学
								.text-xs.text-psV3Red iOS 适用 
				.CENTER_C.mx-4
					.bg-white.bg-opacity-75.rounded.h-full.p-4.flex.justify-center.items-center.cursor-pointer(@click='downloadPWA')
						span
							img(src='/publicAssets/img/download/icon-a-i.png'  srcset='/publicAssets/img/download/icon-a-i@2x.png 2x')
						span.mx-4
							h4.text-psV3Red 快速安装
							.text-xs.text-psV3Red iOS 与 Android皆适用
	a-modal(v-if='state.showPWAModal', :visible='state.showPWAModal', :zIndex='2000', width='800px', :class='"PWA_Modal"', :maskClosable='false'  closable='', :footer='null', @cancel='closeModel')
		.mt-8
			.CENTER_BETWEEN
				div
					h4 快速安装教学
					.text-xs iOS 与 Android皆适用
				.bg-gray-300.rounded.p-2
					.FLEX_R.items-center
						vue-qrcode(v-if='state.PWA_URL', :value='state.PWA_URL', :width='60')
						div.px-2
							.text-xs 扫码立刻加入
							.text-xs 拍手直播
			.grid.grid-cols-4.gap-4.my-4
				.col-span-1(v-for='(item, key) in state.PWA_SlideList')
					img.w-full(:src='item.slide_pic', alt='')
					.text-xs.text-center.my-2 {{state.PWA_SlideDes[key]}}
	a-modal(v-if='state.showIOSModal', :visible='state.showIOSModal', :zIndex='2000', width='800px', :class='"PWA_Modal"', :maskClosable='false'  closable='', :footer='null', @cancel='closeModel')
		.mt-8
			.CENTER_BETWEEN
				div
					h4 IOS安装教学
					.text-xs iOS适用
				.bg-gray-300.rounded.p-2
					.FLEX_R.items-center
						vue-qrcode(v-if='state.PWA_URL', :value='state.PWA_URL', :width='60')
						div.px-2
							.text-xs 扫码立刻加入
							.text-xs 拍手直播
			.grid.grid-cols-1.gap-4.my-4
				.col-span-1(v-for='(item, key) in state.IOS_SlideList')
					img.w-full(:src='item.slide_pic', alt='')
</template>

<script>
import { useStore } from 'vuex';
import { onMounted, computed, reactive } from 'vue';
import { slideList } from '@/api';
import VueQrcode from 'vue3-qrcode';
import { message } from 'ant-design-vue';
import { matomo_androidDownload, matomo_iosDownload, matomo_pwaDownload } from '@/matomoEvent';

export default {
	components: {
		VueQrcode,
	},
	setup() {
		const store = useStore();
		const APK_URL = computed(() => (store.state.config.config ? store.state.config.config.apk_url : ''));
		// const levelList = computed(() => store.state.configData.levelList);
		const state = reactive({
			param: {},
			url: '',
			showIOSModal: false,
			showPWAModal: false,
			IOS_SlideList: [],
			PWA_SlideList: [],
			PWA_SlideDes: ['开启拍手手机版网页，点击浏览器分享按钮', '选择加入主画面', '点击新增按钮', '在桌面建立快捷'],
			PWA_URL: null,
		});
		const init = () => {
			// PWA 教學縮圖
			slideList({ slide_cid: 9 }).then((res) => {
				state.IOS_SlideList = res.data.list;
			});
			slideList({ slide_cid: 11 }).then((res) => {
				state.PWA_SlideList = res.data.list;
			});
			state.PWA_URL = process.env.VUE_APP_PWA_URL;
		};
		const downloadAPK = () => {
			if (APK_URL.value) {
				matomo_androidDownload();
				window.location.href = APK_URL.value;
			} else {
				message.warning('敬请期待！');
			}
		};
		const downloadIOS = () => {
			matomo_iosDownload();
			state.showIOSModal = true;
		};
		const downloadPWA = () => {
			matomo_pwaDownload();
			state.showPWAModal = true;
		};
		const closeModel = () => {
			state.showPWAModal = false;
			state.showIOSModal = false;
		};
		onMounted(() => {
			init();
		});
		return {
			store,
			APK_URL,
			state,
			init,
			downloadIOS,
			downloadPWA,
			downloadAPK,
			closeModel,
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
.downloadV2 {
	position: relative;
	background: linear-gradient(136deg, #f3e7e9 0%, #e3eeff 100%);
	min-height: 900px;
}
.bgLayer {
	position: absolute;
	width: 100%;
	height: 100%;
	min-height: 900px;
	z-index: 1;
	overflow: hidden;
	user-select: none;
	top: 0;
	.topBg {
		position: absolute;
		right: -24%;
		top: -60%;
	}
	.bottomBg {
		position: absolute;
		bottom: -80%;
		left: -10%;
	}
}
.content {
	position: relative;
	width: 1200px;
	min-height: 800px;
	margin: auto auto;
	z-index: 2;
}
</style>
