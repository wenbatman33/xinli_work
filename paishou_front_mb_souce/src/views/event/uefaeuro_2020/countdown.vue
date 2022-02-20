<template lang="pug">
//- 歐洲杯倒數頁面
.relative.bg-rectangle.overflow-hidden
    //- 2021圖示
    .absolute.position-2021.bg-2021

    //- 人物圖示
    .absolute.position-human.bg-human

    //- 煙霧圖示1
    .absolute.position-smoke-1.bg-smoke-1

    //- 煙霧圖示2
    .absolute.position-smoke-2.bg-smoke-2

    //- 頁面內容
    .relative.position-content.flex.flex-col.items-center.pb-4(ref='contentRef')
        //- 關閉按鈕
        van-button.self-end.w-12.h-12.p-2.mr-4.mt-8.rounded-full.bg-transparent.border-transparent(@click='clickClose')
            img.w-full.h-full(src='/publicAssets/img/event/uefaeuro_2020/icon-close@3x.png')

        //- 標題
        img.w-title.mt-16(src='/publicAssets/img/event/uefaeuro_2020/icon-title@3x.png')

        //- 副標題
        img.w-subtitle.mt-8.object-contain(src='/publicAssets/img/event/uefaeuro_2020/icon-subtitle@3x.png')

        //- 歐洲杯圖示
        img.self-center.w-20.mt-6(src='/publicAssets/img/event/uefaeuro_2020/icon-uefa@3x.png')

        //- 倒計時標題
        img.w-countdown-title.mt-8.object-contain(src='/publicAssets/img/event/uefaeuro_2020/icon-countdown-title@3x.png')

        //- 倒計時
        .grid.grid-cols-countdown.items-center.mt-4
            //- 時
            .flex.flex-col.items-center.px-6
                .text-4xl.text-white.font-bold.shadow-countdown {{ hours }}
                .text-xs.text-white.mt-2 时

            //- 分隔線
            .w-full.h-countdown-split.bg-countdown-split

            //- 分
            .flex.flex-col.items-center.px-6
                .text-4xl.text-white.font-bold.shadow-countdown {{ minutes }}
                .text-xs.text-white.mt-2 分

            //- 分隔線
            .w-full.h-countdown-split.bg-countdown-split

            //- 秒
            .flex.flex-col.items-center.px-6
                .text-4xl.text-white.font-bold.shadow-countdown {{ seconds }}
                .text-xs.text-white.mt-2 秒

        //- 開賽日期標題
        .text-base.text-white.font-bold.mt-8 玩转欧洲杯系列活动即将展开

        //- 開賽日期
        .text-base.text-date.font-bold.mt-3 2021/06/12 ~ 2021/07/12

        //- 國家標題
        .text-base.text-white.font-bold.mt-14 参赛国家

        //- 國家副標題
        img.w-countries-subtitle.mt-3.object-contain(src='/publicAssets/img/event/uefaeuro_2020/icon-countries-subtitle@3x.png')

        //- 分組列表
        .flex.flex-col.items-center.mt-4(ref='groupRef')
            template(v-for='groupItem in gameGroup')
                //- 分組標題
                .text-base.text-white.font-bold.mt-10 {{ groupItem.groupName }}

                //- 國家列表
                .grid.grid-cols-4.gap-6.mt-4
                    .flex.flex-col.items-center(v-for='teamItem in groupItem.groupTeam')
                        img.w-16.h-16(:src='teamItem.teamIcon')
                        .text-sm.text-white.mt-4 {{ teamItem.teamName }}

        //- 向上按鈕
        van-button.w-8.h-8.p-0.mt-20.rounded-full.bg-transparent.border-transparent(@click='clickArrwoUp')
            img.w-full.h-full(src='/publicAssets/img/event/uefaeuro_2020/icon-arrow-up@3x.png')

        //- 版權聲明
        .text-sm.text-white.font-bold.mt-28 Copyright © paishou 2021
</template>
<script>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export default {
	setup() {
        // Vue router
        const router = useRouter();

        // Close ref
        const contentRef = ref(null);

        // Group ref
        const groupRef = ref(null);

		// Component state
		const state = reactive({
			now: dayjs(),
			interval: null,
		});

		// Remaining duration
		const remainingDuration = computed(() => {
			const gameDate = dayjs('2021/06/12 00:00:00', 'YYYY/MM/DD HH:mm:ss', 'zh-cn');
			const remainingMilliseconds = gameDate.diff(state.now);
			return dayjs.duration(remainingMilliseconds);
		});

		// Remaining seconds
		const seconds = computed(() => {
			return remainingDuration.value.format('ss');
		});

		// Remaining minutes
		const minutes = computed(() => {
			return remainingDuration.value.format('mm');
		});

		// Remaining hours
		const hours = computed(() => {
			if (remainingDuration.value.asDays() > 0) {
				return Math.floor(remainingDuration.value.asHours());
			} else {
				return remainingDuration.value.format('HH');
			}
		});

		// Game group
		const gameGroup = computed(() => {
			return [
				{
					groupName: 'A組',
					groupTeam: [
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-turkey@3x.png',
							teamName: '土耳其',
						},
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-italy@3x.png',
							teamName: '义大利',
						},
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-wales@3x.png',
							teamName: '威尔士',
						},
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-switzerland@3x.png',
							teamName: '瑞士',
						},
					],
				},
				{
					groupName: 'B組',
					groupTeam: [
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-denmark@3x.png',
							teamName: '丹麦',
						},
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-finland@3x.png',
							teamName: '芬兰',
						},
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-belgium@3x.png',
							teamName: '比利时',
						},
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-russia@3x.png',
							teamName: '俄罗斯',
						},
					],
				},
				{
					groupName: 'C組',
					groupTeam: [
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-netherlands@3x.png',
							teamName: '荷兰',
						},
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-ukraine@3x.png',
							teamName: '乌克兰',
						},
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-austria@3x.png',
							teamName: '奥地利',
						},
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-north-macedonia@3x.png',
							teamName: '北马其顿',
						},
					],
				},
				{
					groupName: 'D組',
					groupTeam: [
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-england@3x.png',
							teamName: '英格兰',
						},
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-croatia@3x.png',
							teamName: '克罗地亚',
						},
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-scotland@3x.png',
							teamName: '苏格兰',
						},
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-czech@3x.png',
							teamName: '捷克',
						},
					],
				},
				{
					groupName: 'E組',
					groupTeam: [
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-spain@3x.png',
							teamName: '西班牙',
						},
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-sweden@3x.png',
							teamName: '瑞典',
						},
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-poland@3x.png',
							teamName: '波兰',
						},
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-slovakia@3x.png',
							teamName: '斯洛伐克',
						},
					],
				},
				{
					groupName: 'F組',
					groupTeam: [
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-hungary@3x.png',
							teamName: '匈牙利',
						},
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-portugal@3x.png',
							teamName: '葡萄牙',
						},
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-france@3x.png',
							teamName: '法国',
						},
						{
							teamIcon: '/publicAssets/img/event/uefaeuro_2020/icon-germany@3x.png',
							teamName: '德国',
						},
					],
				},
			];
		});

        // 點擊關閉按鈕
        const clickClose = () => {
            router.go(-1);
        };

        // 點擊向下按鈕
        const clickArrwoDown = () => {
            groupRef.value.scrollIntoView();
        };

        // 點擊向上按鈕
        const clickArrwoUp = () => {
            contentRef.value.scrollIntoView();
        };

		// On component mounted
		onMounted(() => {
			if (state.interval) {
				clearInterval(state.interval);
			}
			state.interval = setInterval(() => {
				state.now = dayjs();
			}, 1000);
		});

		// On component unmounted
		onUnmounted(() => {
			if (state.interval) {
				clearInterval(state.interval);
			}
		});
		return {
            contentRef,
            groupRef,
			seconds,
			minutes,
			hours,
			gameGroup,
            clickClose,
            clickArrwoDown,
            clickArrwoUp,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-rectangle {
	background: linear-gradient(101.49deg, #00e7ff 22.87%, #0095a4 100%);
}
.position-2021 {
	z-index: 1;
	top: 308px;
	left: 13px;
	right: 14px;
	bottom: 0px;
}
.bg-2021 {
	background-size: contain;
	background-position: top;
	background-repeat: no-repeat;
	background-image: url('/publicAssets/img/event/uefaeuro_2020/icon-2021@3x.png');
	mix-blend-mode: overlay;
}
.position-human {
	z-index: 2;
	top: 113px;
	left: 0px;
	right: 0px;
	bottom: 0px;
}
.bg-human {
	background-size: contain;
	background-position: top;
	background-repeat: no-repeat;
	background-image: url('/publicAssets/img/event/uefaeuro_2020/icon-human@3x.png');
	mix-blend-mode: color-dodge;
}
.position-smoke-1 {
	z-index: 3;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
}
.bg-smoke-1 {
	background-size: cover;
	background-position: top;
	background-repeat: no-repeat;
	background-image: url('/publicAssets/img/event/uefaeuro_2020/icon-smoke-1@3x.png');
	mix-blend-mode: saturation;
}
.position-smoke-2 {
	z-index: 4;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
}
.bg-smoke-2 {
	background-size: cover;
	background-position: top;
	background-repeat: no-repeat;
	background-image: url('/publicAssets/img/event/uefaeuro_2020/icon-smoke-2@3x.png');
	mix-blend-mode: luminosity;
}
.position-content {
	z-index: 10;
}
.w-title {
	width: 85%;
}
.w-subtitle {
	width: 79%;
	max-height: 12px;
}
.w-countdown-title {
	width: 48%;
	max-height: 12px;
}
.grid-cols-countdown {
	grid-template-columns: 1fr 2px 1fr 2px 1fr;
}
.h-countdown-split {
	height: 34px;
}
.bg-countdown-split {
	background: rgba($color: #ffffff, $alpha: 0.5);
}
.shadow-countdown {
	text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.8);
}
.text-date {
	color: #ffff10;
}
.w-countries-subtitle {
	width: 40%;
	max-height: 36px;
}
</style>
