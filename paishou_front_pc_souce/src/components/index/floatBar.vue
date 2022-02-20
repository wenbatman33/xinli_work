<template lang="pug">
#floatBar.floatBar.text-psV3Red.text-center(:style='{top:state.offsetTop+"px"}')
	.FLEX_C.shadow.bg-white.rounded.p-2(class='w-[60px] h-[282px]')
		//- .CENTER_C.cursor-pointer(@click='shraeWeibo')
		//- 	img.w-6(src='/publicAssets/img/v3/Share-web-r.png', srcset='/publicAssets/img/v3/Share-web-r@2x.png 2x')
		//- 	.text-xs 分享
		//- a-divider.my-4
		router-link.mx-2(:to='isLogin && userInfo.is_anchor===1 ? "/personal/liveConfig":"/anchorauth"') 
			.CENTER_C.cursor-pointer
				img.w-6(src='/publicAssets/img/v3/CameraVideo-r.png', srcset='/publicAssets/img/v3/CameraVideo-r@2x.png 2x')
				.text-xs 开播
		a-divider.my-4
		router-link(to='/recruit')
			.CENTER_C.cursor-pointer
				img.w-6(src='/publicAssets/img/v3/Message-web-r.png', srcset='/publicAssets/img/v3/Message-web-r@2x.png 2x')
				.text-xs 合作
		a-divider.my-4
		router-link(to='/download')
			.CENTER_C.cursor-pointer
				img.w-6(src='/publicAssets/img/v3/qr-web-r.png', srcset='/publicAssets/img/v3/qr-web-r@2x.png 2x')
				.text-xs 下载
		//- a-divider.my-4
		//- .CENTER_C.cursor-pointer.relative
		//- 	#CTA_Button_1.absolute.w-full.h-full
		//- 	img.w-6(src='/publicAssets/img/v3/icon-service-line-r.png', srcset='/publicAssets/img/v3/icon-service-line-r@2x.png 2x')
		//- 	.text-xs 客服
		a-divider.my-4
		.CENTER_C.cursor-pointer(@click='scrollTop')
			img.w-6(src='/publicAssets/img/v3/top-web-r.png', srcset='/publicAssets/img/v3/top-web-r@2x.png 2x')
			.text-xs(@click='scrollTop') 顶部
		//- a-divider.my-4
		//- .CENTER_C.cursor-pointer.relative
		//- 	img#CTA_Button_1.cursor-pointer(:src='state.serviceIcon')
</template>
<script>
import { useStore } from 'vuex';
import { onMounted, onUnmounted, reactive, computed } from 'vue';

export default {
	setup() {
		const store = useStore();
		const state = reactive({
			isFixed: false,
			offsetTop: 0,
			rightOffsetTop: 0,
			slideList: [],
			serviceIcon: null,
		});
		const isLogin = computed(() => store.state.user.token !== '' && store.state.user.uid !== '');
		const userInfo = computed(() => store.state.user.userInfo || '');
		const indexPageScroll = () => {
			// -----------------------------------------------------------------------------------------------------------------
			let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			// -----------------------------------------------------------------------------------------------------------------
			const windowHeight = window.innerHeight;
			const Container = document.querySelector('#Container')?.offsetTop;
			const footerTOP = document.querySelector('#footer')?.offsetTop;
			const floatBarHeight = document.querySelector('#floatBar')?.clientHeight;
			// -----------------------------------------------------------------------------------------------------------------
			if (currentScrollTop < Container) {
				state.offsetTop = 0;
			} else if (currentScrollTop > footerTOP - windowHeight) {
				state.offsetTop = footerTOP - Container - floatBarHeight - 60;
			} else {
				state.offsetTop = currentScrollTop - Container;
			}
		};
		const shraeWeibo = () => {
			const shraeWeibostring = `http://service.weibo.com/share/share.php?url=${window.location.href}&title="拍手直播 - 最专业的体育直播平台"`;
			setTimeout(() => {
				window.open(shraeWeibostring, 'newwindow', 'height=300,width=400,top=100,left=100');
			}, 1000);
		};
		const scrollTop = () => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		};
		onUnmounted(() => {
			window.removeEventListener('scroll', indexPageScroll);
		});
		onMounted(() => {
			window.addEventListener('scroll', indexPageScroll);
		});
		return {
			state,
			indexPageScroll,
			scrollTop,
			shraeWeibo,
			isLogin,
			userInfo,
		};
	},
};
</script>
<style lang="scss" scoped>
.floatBar {
	position: absolute;
	right: -80px;
	bottom: 10px;
	width: 60px;
	height: 360px;
	transition: top 0.2s;
}
</style>
