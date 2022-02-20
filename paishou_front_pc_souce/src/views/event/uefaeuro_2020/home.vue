<template lang="pug">
//- 歐洲杯首頁
.w-full.min-h-full.bg-home.FLEX_C.items-center.pb-20
    //- 標題圖示
    img.w-title.mt-40(src='/publicAssets/img/event/uefaeuro_2020/icon-home-title@3x.png')

    //- 選單
    .grid.grid-cols-menu.items-center.mt-12
        //- 賽事
        a-button.w-auto.h-auto.px-8.py-2(type='link', @click='clickSchedule')
            .text-base.text-white.font-menu.shadow-menu 预约欧洲杯赛事

        //- 分隔線
        .w-split.h-4.bg-split

        //- 登入
        a-button.w-auto.h-auto.px-8.py-2(type='link', @click='clickLogin')
            .text-base.text-white.font-menu.shadow-menu 限时登入领取

        //- 分隔線
        .w-split.h-4.bg-split

        //- 任務
        a-button.w-auto.h-auto.px-8.py-2(type='link', @click='clickTask')
            .text-base.text-white.font-menu.shadow-menu 解任务换点数

        //- 分隔線
        .w-split.h-4.bg-split

        //- 骰盅
        a-button.w-auto.h-auto.px-8.py-2(type='link', @click='clickDice')
            .text-base.text-white.font-menu.shadow-menu 博拼好运跟着来

        //- 分隔線
        .w-split.h-4.bg-split

        //- 轉盤
        a-button.w-auto.h-auto.px-8.py-2(type='link', @click='clickTurntable')
            .text-base.text-white.font-menu.shadow-menu 转转好运来
</template>
<script>
import { useRouter } from 'vue-router';

export default {
	setup() {
		// Vue router
		const router = useRouter();

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

		// 點擊骰盅
		const clickDice = () => {
			router.push('/event/uefaeuro_2020/dice');
		};

		// 點擊轉盤
		const clickTurntable = () => {
			router.push('/event/uefaeuro_2020/turntable');
		};
		return {
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
.bg-home {
	background: url('/publicAssets/img/event/uefaeuro_2020/icon-bg@3x.jpg');
	background-size: cover;
}
.w-title {
	width: 72%;
}
.grid-cols-menu {
	grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr auto 1fr;
}
.font-menu {
	font-weight: 600;
}
.shadow-menu {
	text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25), 0px 0px 20px rgba(255, 255, 255, 0.7);
}
.w-split {
	width: 1.5px;
}
.bg-split {
	background: rgba($color: #ffffff, $alpha: 0.3);
}
</style>
