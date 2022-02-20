<template lang="pug">
//- 東奧首頁
.relative.w-full.min-h-full.flex.flex-col.items-stretch.bg-home
    //- 底部花紋
    img.absolute.z-10.bottom-0.object.contain(src='/publicAssets/img/event/2020tokyolympic/icon-footer@3x.png')

    //- 導覽欄
    .z-20.grid.grid-cols-nav.gap-2.px-4.mt-8
        //- 拍手標誌
        img.w-24.h-auto.object-contain(src='/publicAssets/img/event/2020tokyolympic/icon-paishou@3x.png', @click='clickPaishou')

        //- 關閉按鈕
        van-button.w-10.h-10.p-2.mt-2.rounded-full.bg-transparent.border-transparent(@click='clickClose')
            img.w-full.h-full.object-contain(src='/publicAssets/img/event/2020tokyolympic/icon-close@3x.png')

    //- 標題圖片
    img.z-30.mt-header.pointer-events-none.object-contain(src='/publicAssets/img/event/2020tokyolympic/icon-header@3x.png')

    //- 轉盤按鈕
    van-button.z-40.w-auto.h-auto.p-4.mx-12.mt-roulette.rounded-full.bg-transparent.border-button(@click='clickRoulette')
        .text-2xl.text-white.font-bold 好运转转乐

    //- 按鈕群
    .z-40.grid.grid-cols-2.gap-4.mt-8.px-12.items-center
        //- 賽程按鈕
        van-button.w-auto.h-auto.p-3.rounded-full.bg-transparent.border-button(@click='clickSchedule')
            .text-base.text-white.font-bold 奥运会赛程

        //- 競猜按鈕
        van-button.w-auto.h-auto.p-3.rounded-full.bg-transparent.border-button(@click='clickGuess')
            .text-base.text-white.font-bold 抢金决胜猜

    //- 填滿空白
    .flex-grow

    //- 版權聲明
    .z-40.flex.flex-col.items-center.text-copyright.pt-12.pb-8.bg-copyright Copyright © paishou 2021
</template>
<script>
import { useRouter } from 'vue-router';

export default {
    setup() {
        // Vue router
        const router = useRouter();

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

        // 點擊轉盤按鈕
        const clickRoulette = () => {
            router.push('/event/2020tokyolympic/spin');
        };

        // 點擊賽程按鈕
        const clickSchedule = () => {
            router.push('/event/2020tokyolympic/schedule');
        };

        // 點擊競猜按鈕
        const clickGuess = () => {
            router.push('/event/2020tokyolympic/guess');
        };
        return {
            clickPaishou,
            clickClose,
            clickRoulette,
            clickSchedule,
            clickGuess,
        };
    },
};
</script>
<style lang="scss" scoped>
.bg-home {
    background: linear-gradient(152.52deg, #0030FB 29.08%, #0007A4 53.87%), #FFFFFF;
}
.grid-cols-nav {
    grid-template-columns: 1fr auto;
}
.mt-header {
    margin-top: -2.5rem;
}
.mt-roulette {
    margin-top: -2.5rem;
}
.border-button {
    border: 3px solid #FFFFFF;
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