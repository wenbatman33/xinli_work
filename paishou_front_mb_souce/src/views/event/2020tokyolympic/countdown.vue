<template lang="pug">
//- 東奧倒計時
.w-full.min-h-full.flex.flex-col.items-stretch.bg-countdown
    //- 導覽欄
    .z-20.grid.grid-cols-nav.gap-2.px-4.mt-8
        //- 拍手標誌
        img.w-24.h-auto.object-contain(src='/publicAssets/img/event/2020tokyolympic/icon-paishou@3x.png', @click='clickPaishou')

        //- 關閉按鈕
        van-button.w-10.h-10.p-2.mt-2.rounded-full.bg-transparent.border-transparent(@click='clickClose')
            img.w-full.h-full.object-contain(src='/publicAssets/img/event/2020tokyolympic/icon-close@3x.png')

    //- 東奧標誌
    img.z-20.w-28.h-auto.ml-4.object-contain(src='/publicAssets/img/event/2020tokyolympic/icon-logo-text@3x.png')

    //- 標題圖片
    img.z-10.mt-header.object-contain(src='/publicAssets/img/event/2020tokyolympic/icon-countdown-header@3x.png')

    //- 標題文字
    .z-20.self-center.mt-title.text-title 7/21东京奥运会开幕倒数迎战

    //- 倒計時
    .z-20.self-center.mt-4.grid.grid-cols-countdown.gap-4.items-center
        //- 時
        .flex.flex-col.items-center
            //- 數值
            .text-value.font-bold {{ hours }}

            //- 單位
            .text-unit.mt-2 时

        //- 分隔線
        .h-9.bg-split

        //- 分
        .flex.flex-col.items-center
            //- 數值
            .text-value.font-bold {{ minutes }}

            //- 單位
            .text-unit.mt-2 分

        //- 分隔線
        .h-9.bg-split

        //- 秒
        .flex.flex-col.items-center
            //- 數值
            .text-value.font-bold {{ seconds }}

            //- 單位
            .text-unit.mt-2 秒

    //- 填滿空白
    .flex-grow

    //- 花紋
    img.z-10.w-36.h-auto.self-end.mr-12.mt-footer.object-contain(src='/publicAssets/img/event/2020tokyolympic/icon-countdown-footer@3x.png')

    //- 版權聲明
    .z-20.flex.flex-col.items-center.text-copyright.mt-copyright.pt-12.pb-8.bg-copyright Copyright © paishou 2021
</template>
<script>
import { reactive, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';

export default {
    setup() {
        // Vue router
        const router = useRouter();

		// Component state
		const state = reactive({
			now: dayjs(),
			interval: null,
		});
        
		// Remaining duration
		const remainingDuration = computed(() => {
			const gameDate = dayjs('2021/7/21 00:00:00', 'YYYY/MM/DD HH:mm:ss', 'zh-cn');
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

        // 點擊拍手標誌
        const clickPaishou = () => {
            router.replace('/');
        };

        // 點擊關閉按鈕
        const clickClose = () => {
            router.go(-1).catch(() => {
                window.close();
            });
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
            clickPaishou,
            clickClose,
            hours,
            minutes,
            seconds,
        };
    },
};
</script>
<style lang="scss" scoped>
.bg-countdown {
    background: linear-gradient(152.52deg, #0030FB 29.08%, #0007A4 53.87%), #FFFFFF;
}
.grid-cols-nav {
    grid-template-columns: 1fr auto;
}
.mt-header {
    margin-top: -7rem;
}
.mt-title {
    margin-top: -4rem;
}
.text-title {
    color: #FFFFFF;
    font-family: PingFang TC;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 14px;
    letter-spacing: 6px;
}
.grid-cols-countdown {
    grid-template-columns: 1fr 1px 1fr 1px 1fr;
}
.text-value {
    color: #FFFFFF;
    font-family: Arial Black;
    font-style: normal;
    font-weight: 900;
    font-size: 40px;
    line-height: 40px;
}
.text-unit {
    color: #7F90DA;
    font-family: PingFang TC;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
}
.bg-split {
    background: #4158B9;
}
.mt-footer {
    margin-top: -3.5rem;
}
.mt-copyright {
    margin-top: -3.5rem;
}
.bg-copyright {
    background: linear-gradient(360deg, #000467 0%, rgba(1, 7, 164, 0) 100%);
}
.text-copyright {
    color: #FFFFFF;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 12px;
}
</style>