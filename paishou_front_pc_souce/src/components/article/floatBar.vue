<template lang="pug">
.floatBar#floatBar.rounded.p-2.text-psV3Red.text-center(:style='{top:state.offsetTop+"px"}')
	.FLEX_C
		.floatBtn.CENTER.w-10.h-10.bg-white.rounded-full.shadow.mb-4.cursor-pointer.relative(@click='like')
			img.w-6.transform.duration-300(:class='{"scale-150": state.palying}', src='/publicAssets/img/v3/icon-apploud-red.png', srcset='/publicAssets/img/v3/icon-apploud-red@2x.png 2x')
			img.absolute.opacity-0(:class='{"opacity-100 animation-explotion": state.palying}', src='/publicAssets/img/v3/icon-explotion@3x.png')
		.floatBtn.CENTER.w-10.h-10.bg-white.rounded-full.shadow.mb-4.cursor-pointer(@click='shraeQQHandle')
			img(src='/publicAssets/img/v3/button-icon-qq.png' , srcset='/publicAssets/img/v3/button-icon-qq@2x.png 2x')
		.floatBtn.CENTER.w-10.h-10.bg-white.rounded-full.shadow.mb-4.cursor-pointer(@click='shraeWeiboHandle')
			img(src='/publicAssets/img/v3/button-icon-weibo.png' , srcset='/publicAssets/img/v3/button-icon-weibo@2x.png 2x')
		.floatBtn.CENTER.w-10.h-10.bg-white.rounded-full.shadow.mb-4.cursor-pointer(@click='copyUrl')
			img(src='/publicAssets/img/v3/button-icon-link.png' , srcset='/publicAssets/img/v3/button-icon-link@2x.png 2x')
		.floatBtn.CENTER.w-10.h-10.bg-white.rounded-full.shadow.mb-4.cursor-pointer(@click='scrollTop')
			img.w-6(src='/publicAssets/img/v3/top-web-r.png', srcset='/publicAssets/img/v3/top-web-r@2x.png 2x')
</template>
<script>
import { copyText } from 'vue3-clipboard';
import { message } from 'ant-design-vue';
import { useStore } from 'vuex';
import { onMounted, onUnmounted, reactive, computed } from 'vue';
import { shraeToQQ, shraeToWeibo } from '@/utils';

export default {
	props: ['articleData'],
	setup(props, { emit }) {
		const store = useStore();
		const state = reactive({
			isFixed: false,
			offsetTop: 0,
			rightOffsetTop: 0,
			slideList: [],
			scrollTop: 0,
			ftop: 0,
			palying: false,
		});
		const isLogin = computed(() => store.state.user.token !== '' && store.state.user.uid !== '');
		const userInfo = computed(() => store.state.user.userInfo || '');
		const indexPageScroll = () => {
			// -----------------------------------------------------------------------------------------------------------------
			let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			state.scrollTop = currentScrollTop;
			// -----------------------------------------------------------------------------------------------------------------
			const windowHeight = window.innerHeight;
			// -----------------------------------------------------------------------------------------------------------------
			const headerNavHeight = document.querySelector('#headerNav')?.clientHeight;
			const appContainerHight = document.querySelector('#articleInfo')?.clientHeight;
			const footerHight = document.querySelector('#footer')?.clientHeight;
			// -----------------------------------------------------------------------------------------------------------------
			const floatBarHeight = document.querySelector('#floatBar')?.clientHeight;
			const footerTOP = headerNavHeight + appContainerHight;
			// -----------------------------------------------------------------------------------------------------------------
			const floatBarY = currentScrollTop - headerNavHeight + (windowHeight - floatBarHeight);
			state.ftop = footerTOP;
			// -----------------------------------------------------------------------------------------------------------------
			if (currentScrollTop < headerNavHeight) {
				state.offsetTop = 40;
				return;
			} else if (currentScrollTop + windowHeight > footerTOP) {
				state.offsetTop = footerTOP - headerNavHeight - footerHight - 60;
				return;
			} else if (currentScrollTop > headerNavHeight && currentScrollTop + windowHeight < footerTOP) {
				state.offsetTop = floatBarY;
				return;
			}
		};
		// ----------------------------------------------------------------
		const clapPlay = () => {
			setTimeout(() => {
				state.palying = false;
			}, 500);
		};
		const like = () => {
			if (!state.palying) {
				state.palying = true;
				emit('like');
				clapPlay();
			}
		};
		const shraeQQHandle = () => {
			// localhost 會顯示不出來是正常的
			const { title, pic } = props.articleData;
			shraeToQQ(window.location.href, title, pic);
		};
		const shraeWeiboHandle = () => {
			const { title, pic } = props.articleData;
			shraeToWeibo(window.location.href, title, pic);
		};
		const copyUrl = () => {
			const URL = `${window.location.origin}/article/info/${props.articleData.id}`;
			copyText(URL, undefined, (error, event) => (error ? message.error('复制失败') : message.success('复制完成')));
		};

		const scrollTop = (url) => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		};
		onUnmounted(() => {
			window.removeEventListener('scroll', indexPageScroll);
		});
		onMounted(() => {
			window.addEventListener('scroll', indexPageScroll);
			indexPageScroll();
		});
		return {
			state,
			indexPageScroll,
			scrollTop,
			isLogin,
			userInfo,
			like,
			shraeQQHandle,
			shraeWeiboHandle,
			copyUrl,
		};
	},
};
</script>
<style lang="scss" scoped>
.floatBar {
	position: absolute;
	right: -60px;
	bottom: 10px;
	width: 60px;
	height: 282px;
	transition: top 0.2s;
}
.animation-explotion {
	animation: explotion;
	animation-duration: 500ms;
	animation-timing-function: ease-out;
}
@keyframes explotion {
	0% {
		opacity: 0;
		transform: scale(1.5);
	}
	50% {
		opacity: 1;
		transform: scale(2.5);
	}
	100% {
		opacity: 0;
		transform: scale(3.5);
	}
}
</style>
