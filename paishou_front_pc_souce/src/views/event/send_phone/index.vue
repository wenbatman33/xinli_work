<template lang="pug">
//- 登入拍手抽手機
.w-full.min-h-full.FLEX_C.items-center.bg-event
    //- 頁面內容
    .w-page.FLEX_R.flex-grow.items-center.py-12
        //- 左箭頭
        arrow(left, :text='leftText', @click-arrow='clickLeft')

        //- 路由子頁面
        router-view.flex-grow

        //- 右按鈕
        arrow(right, :text='rightText', @click-arrow='clickRight')
</template>
<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import arrow from '@/views/event/send_phone/arrow.vue';

export default {
	components: {
		arrow,
	},
	setup() {
		// Vue router
		const route = useRoute();
		const router = useRouter();

		// 左箭頭文字
		const leftText = computed(() => {
			if (route.path === '/event/send_phone/home') {
				return '活动规则';
			} else if (route.path === '/event/send_phone/rule') {
				return '开始抽奖';
			} else if (route.path === '/event/send_phone/game') {
				return '活动首页';
			} else {
				return '';
			}
		});

		// 右箭頭文字
		const rightText = computed(() => {
			if (route.path === '/event/send_phone/home') {
				return '开始抽奖';
			} else if (route.path === '/event/send_phone/rule') {
				return '活动首页';
			} else if (route.path === '/event/send_phone/game') {
				return '活动规则';
			} else {
				return '';
			}
		});

		// 點擊左箭頭
		const clickLeft = () => {
			if (route.path === '/event/send_phone/home') {
				router.push('/event/send_phone/rule');
			} else if (route.path === '/event/send_phone/rule') {
				router.push('/event/send_phone/game');
			} else if (route.path === '/event/send_phone/game') {
				router.push('/event/send_phone/home');
			}
		};

		// 點擊右箭頭
		const clickRight = () => {
			if (route.path === '/event/send_phone/home') {
				router.push('/event/send_phone/game');
			} else if (route.path === '/event/send_phone/rule') {
				router.push('/event/send_phone/home');
			} else if (route.path === '/event/send_phone/game') {
				router.push('/event/send_phone/rule');
			}
		};
		return {
			leftText,
			rightText,
			clickLeft,
			clickRight,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-event {
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	background-image: url('/publicAssets/img/event/send_phone/img-webbg@3x.jpg');
}
.w-page {
	width: 83.3%;
}
</style>
