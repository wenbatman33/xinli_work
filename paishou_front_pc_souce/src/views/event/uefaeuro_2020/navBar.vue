<template lang="pug">
//- 導覽欄
.grid.grid-cols-nav.items-center.py-8
    //- Logo
    img.h-28.cursor-pointer.object-contain(src='/publicAssets/img/event/uefaeuro_2020/icon-nav-logo@3x.png', @click='clickLogo')

    //- 賽事
    a-button.w-auto.h-auto.px-6.py-2(type='link', @click='clickSchedule')
        .text-sm.text-white.font-menu.shadow-menu(:class='{ "selected": scheduleSelected }') 预约欧洲杯赛事

    //- 分隔線
    .w-split.h-4.bg-split

    //- 登入
    a-button.w-auto.h-auto.px-6.py-2(type='link', @click='clickLogin')
        .text-sm.text-white.font-menu.shadow-menu(:class='{ "selected": loginSelected }') 限时登入领取

    //- 分隔線
    .w-split.h-4.bg-split

    //- 任務
    a-button.w-auto.h-auto.px-6.py-2(type='link', @click='clickTask')
        .text-sm.text-white.font-menu.shadow-menu(:class='{ "selected": taskSelected }') 解任务换点数

    //- 分隔線
    .w-split.h-4.bg-split

    //- 骰盅
    a-button.w-auto.h-auto.px-6.py-2(type='link', @click='clickDice')
        .text-sm.text-white.font-menu.shadow-menu(:class='{ "selected": diceSelected }') 博拼好运跟着来

    //- 分隔線
    .w-split.h-4.bg-split

    //- 轉盤
    a-button.w-auto.h-auto.px-6.py-2(type='link', @click='clickTurntable')
        .text-sm.text-white.font-menu.shadow-menu(:class='{ "selected": turntableSelected }') 转转好运来
</template>
<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
	setup() {
		// Vue router
		const route = useRoute();
		const router = useRouter();

		// 是否選擇賽事
		const scheduleSelected = computed(() => {
			return route.path === '/event/uefaeuro_2020/schedule';
		});

		// 是否選擇登入
		const loginSelected = computed(() => {
			return route.path === '/event/uefaeuro_2020/login';
		});

		// 是否選擇任務
		const taskSelected = computed(() => {
			return route.path === '/event/uefaeuro_2020/task';
		});

		// 是否選擇骰盅
		const diceSelected = computed(() => {
			return route.path === '/event/uefaeuro_2020/dice';
		});

		// 是否選擇轉盤
		const turntableSelected = computed(() => {
			return route.path === '/event/uefaeuro_2020/turntable';
		});

		// 點擊Logo
		const clickLogo = () => {
			router.replace('/event/uefaeuro_2020/home');
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

		// 點擊骰盅
		const clickDice = () => {
			router.push('/event/uefaeuro_2020/dice');
		};

		// 點擊轉盤
		const clickTurntable = () => {
			router.push('/event/uefaeuro_2020/turntable');
		};
		return {
			scheduleSelected,
			loginSelected,
			taskSelected,
			diceSelected,
			turntableSelected,
			clickLogo,
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
.grid-cols-nav {
	grid-template-columns: auto 1fr auto 1fr auto 1fr auto 1fr auto 1fr;
}
.font-menu {
	&.selected {
		font-weight: 600;
	}
}
.shadow-menu {
	&.selected {
		text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25), 0px 0px 20px rgba(255, 255, 255, 0.7);
	}
}
.w-split {
	width: 1.5px;
}
.bg-split {
	background: rgba($color: #ffffff, $alpha: 0.3);
}
</style>
