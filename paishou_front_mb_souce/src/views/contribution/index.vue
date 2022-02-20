<template lang="pug">
//- 排行榜
.contribution
    //- 導覽欄
    nav-bar(title='排行榜', icon='/publicAssets/img/contribution/icon-trophy@3x.png', right-button='/publicAssets/img/icon-close-red@3x.png', @click-right='clickRight')

    //- 頁籤列
    van-tabs(:active='activeTab', @click='clickTab')
        van-tab(title='主播', name='live')
        van-tab(title='用户', name='user')

    //- 分隔線
    divider

    //- 子頁面
    router-view
</template>
<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { matomo_contribution_check_live, matomo_contribution_check_user } from '@/matomoTrackEvent.js';
import navBar from '@/components/navBar';
import divider from '@/components/divider';

export default {
    components: {
        navBar,
        divider,
    },
    setup() {
        // Vue router
        const route = useRoute();
        const router = useRouter();

        // 啟動的頁籤
        const activeTab = computed(() => route.path[1]);

        // 點擊導覽欄關閉按鈕
        const clickRight = () => {
            router.go(-1);
        };

        // 點擊頁籤
        const clickTab = (tab) => {
            // Navigate child page
            if (tab != activeTab.value) {
                router.replace(`/contribution/${tab}`)
            }

            // Matomo track
            if (tab === 'live') {
                matomo_contribution_check_live();
            } else if (tab === 'user') {
                matomo_contribution_check_user();
            }
        };
        return {
            activeTab,
            clickRight,
            clickTab,
        };
    },
}
</script>
<style lang="scss" scoped>
.contribution {
    width: 100%;
	::v-deep(.van-tab__text) {
		font-weight: bold;
	}
	::v-deep(.van-tab--active) {
		color: #a62337;
	}
	::v-deep(.van-tabs__line) {
		background-color: #a62337;
	}
}
</style>