<template lang="pug">
//- 歐洲杯倒數頁面
.relative.bg-rectangle.overflow-hidden
    //- 副標題圖示
    .absolute.position-subtitle.bg-subtitle

    //- 2021圖示
    .absolute.position-2021.bg-2021.opacity-60

    //- 煙霧圖示1
    .absolute.position-smoke-1.bg-smoke-1

    //- 煙霧圖示2
    .absolute.position-smoke-2.bg-smoke-2

    //- 頁面內容
    .relative.position-content.FLEX_C.items-center.pb-36(ref='contentRef')
        //- 標題
        img.w-title.mt-20(src='/publicAssets/img/event/uefaeuro_2020/icon-title@3x.png')

        //- 倒計時標題
        img.w-countdown-title.-mt-8.object-contain(src='/publicAssets/img/event/uefaeuro_2020/icon-countdown-title@3x.png')

        //- 倒計時
        .w-countdown.grid.grid-cols-countdown.items-center
            //- 時
            .FLEX_C.items-center.px-6
                .text-countdown.text-white.font-bold.shadow-countdown {{ hours }}
                .text-2xl.text-white 时

            //- 分隔線
            .w-full.h-countdown-split.bg-countdown-split

            //- 分
            .FLEX_C.items-center.px-6
                .text-countdown.text-white.font-bold.shadow-countdown {{ minutes }}
                .text-2xl.text-white 分

            //- 分隔線
            .w-full.h-countdown-split.bg-countdown-split

            //- 秒
            .FLEX_C.items-center.px-6
                .text-countdown.text-white.font-bold.shadow-countdown {{ seconds }}
                .text-2xl.text-white 秒

        //- 國家標題
        .text-3xl.text-white.font-bold.mt-52 参赛国家

        //- 國家副標題
        img.w-countries-subtitle.mt-3.object-contain(src='/publicAssets/img/event/uefaeuro_2020/icon-countries-subtitle@3x.png')

        //- 分組列表
        .grid.grid-cols-2.grid-flow-row-dense.gap-x-48.gap-y-10.mt-10(ref='groupRef')
            .FLEX_R.items-center(v-for='groupItem in gameGroup', :style='`grid-column-start: ${groupItem.groupColumn};`')
                //- 分組標題(左)
                .text-4xl.text-white.font-bold.mr-3(v-if='groupItem.groupColumn === 1') {{ groupItem.groupName }}

                //- 國家列表
                .FLEX_C.items-center.mx-5(v-for='teamItem in groupItem.groupTeam')
                    img.w-16.h-16(:src='teamItem.teamIcon')
                    .text-sm.text-white.mt-4 {{ teamItem.teamName }}

                //- 分組標題(右)
                .text-4xl.text-white.font-bold.ml-3(v-if='groupItem.groupColumn === 2') {{ groupItem.groupName }}
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
					groupColumn: 1,
					groupName: 'A',
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
					groupColumn: 1,
					groupName: 'B',
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
					groupColumn: 1,
					groupName: 'C',
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
					groupColumn: 2,
					groupName: 'D',
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
					groupColumn: 2,
					groupName: 'E',
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
					groupColumn: 2,
					groupName: 'F',
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
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-rectangle {
	background: linear-gradient(101.49deg, #00e7ff 22.87%, #0095a4 100%);
}
.position-subtitle {
	z-index: 1;
	top: 112px;
	left: 29%;
	right: 29%;
	bottom: 0px;
}
.bg-subtitle {
	max-height: 25px;
	background-size: contain;
	background-position: top;
	background-repeat: no-repeat;
	background-image: url('/publicAssets/img/event/uefaeuro_2020/icon-subtitle@3x.png');
	mix-blend-mode: screen;
}
.position-2021 {
	z-index: 2;
	top: 258px;
	left: 21%;
	right: 21%;
	bottom: 0px;
}
.bg-2021 {
	background-size: contain;
	background-position: top;
	background-repeat: no-repeat;
	background-image: url('/publicAssets/img/event/uefaeuro_2020/icon-2021@3x.png');
	mix-blend-mode: soft-light;
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
	background-image: url('/publicAssets/img/event/uefaeuro_2020/icon-smoke-1@3x.jpg');
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
	width: 49%;
}
.w-countdown-title {
	width: 12%;
	max-height: 16px;
}
.w-countdown {
	width: 49%;
}
.grid-cols-countdown {
	grid-template-columns: 1fr 2px 1fr 2px 1fr;
}
.h-countdown-split {
	height: 86px;
}
.bg-countdown-split {
	background: rgba($color: #ffffff, $alpha: 0.5);
}
.text-countdown {
	font-size: 5rem;
}
.shadow-countdown {
	text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.8);
}
.w-countries-subtitle {
	width: 40%;
	max-height: 40px;
}
</style>
