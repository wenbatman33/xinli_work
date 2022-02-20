<template lang="pug">
//- 我的背包
.backpack.flex.flex-col
    //- 導覽欄
    nav-bar(title='我的背包', icon='/publicAssets/img/backpack/icon-gift@3x.png', right-button='/publicAssets/img/icon-close-red@3x.png', @click-right='clickRight')

    //- 路徑選擇
    van-tabs(:active='activeTab', @click='clickTab')
        van-tab(title='我的礼物', to='/backpack/gift', replace)
        van-tab(title='我的道具', to='/backpack/item', replace)

    //- 分隔線
    divider

    //- 子頁面
    router-view 
</template>
<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { matomo_backpack_check_giftList, matomo_backpack_check_itemList } from '@/matomoTrackEvent.js';
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

        // 選擇的頁籤
        const activeTab = computed(() => {
            if (route.path === '/backpack/gift') {
                matomo_backpack_check_giftList();
                return 0;
            } else if (route.path === '/backpack/item') {
                matomo_backpack_check_itemList();
                return 1;
            } else {
                matomo_backpack_check_giftList();
                return 0;
            }
        });

		// 點擊導覽欄返回按鈕
		const clickRight = () => {
			router.go(-1);
		};

        // 點擊頁籤
        const clickTab = (index) => {
            if (index === 0) {
                matomo_backpack_check_giftList();
            } else if (index === 1) {
                matomo_backpack_check_itemList();
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
.backpack {
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