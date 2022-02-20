<template lang="pug">
//- 菜單彈窗
van-popup(:show='show', :style='styles', position='left', @click-overlay='clickOverlay')
    //- 彈窗內容
    .flex.flex-col.items-stretch.pt-6.pb-4
        //- 菜單按鈕
        van-button.w-10.h-10.p-1.mx-4.rounded-full.bg-transparent.border-transparent(@click='clickMenu')
            img.w-full.h-full(src='/publicAssets/img/event/uefaeuro_2020/icon-menu@3x.png')

        //- 賽事
        van-button.w-full.h-auto.px-6.py-3.mt-6.bg-transparent.border-transparent(@click='clickSchedule')
            .text-sm.text-white.font-bold 预约欧洲杯赛事

        //- 登入
        van-button.w-full.h-auto.px-6.py-3.bg-transparent.border-transparent(@click='clickLogin')
            .text-sm.text-white.font-bold 限时登入领取

        //- 任務
        van-button.w-full.h-auto.px-6.py-3.bg-transparent.border-transparent(@click='clickTask')
            .text-sm.text-white.font-bold 解任务换点数

        //- 博拼
        van-button.w-full.h-auto.px-6.py-3.bg-transparent.border-transparent(@click='clickDice')
            .text-sm.text-white.font-bold 博拼好运跟着来

        //- 轉轉
        van-button.w-full.h-auto.px-6.py-3.bg-transparent.border-transparent(@click='clickTurntable')
            .text-sm.text-white.font-bold 转转好运来
</template>
<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
	props: {
		show: Boolean,
	},
	emits: ['update:show'],
	setup(props, { emit }) {
		// Vue router
		const router = useRouter();

		// Popup styles
		const styles = computed(() => {
			return {
				width: '72%',
				height: '100%',
				background: 'rgba(134, 2, 2, 0.8)',
				'backdrop-filter': 'blur(10px)',
			};
		});

		// 點擊遮罩層
		const clickOverlay = () => {
			emit('update:show', false);
		};

		// 點擊菜單
		const clickMenu = () => {
			emit('update:show', false);
		};

		// 點擊賽事
		const clickSchedule = () => {
			router.push('/event/uefaeuro_2020/schedule');
		};

		// 點擊登入
		const clickLogin = () => {
			router.push('/event/uefaeuro_2020/login');
		};

		// 點擊任務
		const clickTask = () => {
			router.push('/event/uefaeuro_2020/task');
		};

		// 點擊博拼
		const clickDice = () => {
			router.push('/event/uefaeuro_2020/dice');
		};

		// 點擊轉轉
		const clickTurntable = () => {
			router.push('/event/uefaeuro_2020/turntable');
		};
		return {
			styles,
			clickOverlay,
			clickMenu,
			clickSchedule,
			clickLogin,
			clickTask,
			clickDice,
			clickTurntable,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.van-button__content) {
	width: 100%;
}
::v-deep(.van-button__text) {
	text-align: start;
	width: 100%;
	text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25), 0px 0px 20px rgba(255, 255, 255, 0.7);
}
</style>
