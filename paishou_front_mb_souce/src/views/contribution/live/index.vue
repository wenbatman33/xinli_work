<template lang="pug">
//- 排行榜-主播
.contribution-live
    //- 路徑選擇
    .grid.grid-cols-2.gap-2.px-4.mt-4
        //- 人氣主播
        van-button.path-button.rounded-md(@click='clickPopular')
            img.max-h-16(src='/publicAssets/img/contribution/icon-popular@3x.png')

        //- 超級明星
        van-button.path-button.rounded-md(@click='clickSuperstar')
            img.max-h-16(src='/publicAssets/img/contribution/icon-superstar@3x.png')

    //- 子頁面
    router-view.mt-2
</template>
<script>
import { useRouter } from 'vue-router';
import { matomo_contribution_check_live_popular, matomo_contribution_check_live_superstar } from '@/matomoTrackEvent.js';

export default {
    setup() {
        // Vue router
        const router = useRouter();

        // 點擊人氣主播
        const clickPopular = () => {
            router.replace('/contribution/live/popular');
            matomo_contribution_check_live_popular();
        };

        // 點擊超級明星
        const clickSuperstar = () => {
            router.replace('/contribution/live/superstar');
            matomo_contribution_check_live_superstar();
        };
        return {
            clickPopular,
            clickSuperstar,
        };
    },
}
</script>
<style lang="scss" scoped>
.contribution-live {
    width: 100%;
    .path-button {
        width: 100%;
        height: unset;
        padding: 0;
        border: transparent;
        background: transparent;
    }
}
</style>