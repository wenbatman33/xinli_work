<template lang="pug">
//- 排行榜-用戶
.contribution-user
    //- 路徑選擇
    .grid.grid-cols-2.gap-2.px-4.mt-4
        //- 富豪貢獻
        van-button.path-button.rounded-md(@click='clickRich')
            img.max-h-16(src='/publicAssets/img/contribution/icon-rich@3x.png')

        //- 超級明星
        van-button.path-button.rounded-md(@click='clickSuperstar')
            img.max-h-16(src='/publicAssets/img/contribution/icon-superstar@3x.png')

    //- 子頁面
    router-view.mt-2
</template>
<script>
import { useRouter } from 'vue-router';
import { matomo_contribution_check_user_rich, matomo_contribution_check_user_superstar } from '@/matomoTrackEvent.js';

export default {
    setup() {
        // Vue router
        const router = useRouter();

        // 點擊富豪貢獻
        const clickRich = () => {
            router.replace('/contribution/user/rich');
            matomo_contribution_check_user_rich();
        };

        // 點擊超級明星
        const clickSuperstar = () => {
            router.replace('/contribution/user/superstar');
            matomo_contribution_check_user_superstar();
        };
        return {
            clickRich,
            clickSuperstar,
        };
    },
}
</script>
<style lang="scss" scoped>
.contribution-user {
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