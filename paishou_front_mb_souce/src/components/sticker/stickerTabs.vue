<template lang="pug">
//- 貼圖頁籤列表
van-tabs(:active='state.activeTab', @change='changeTab')
    //- 分隔線
    divider

    //- 貼圖頁籤
    sticker-tab(v-for='item in tabList', :item='item', :active='state.activeTab')
</template>
<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import divider from '@/components/divider';
import stickerTab from '@/components/sticker/stickerTab.vue';

export default {
    components: {
        divider,
        stickerTab,
    },
    setup() {
		// Vuex store
		const store = useStore();

        // Vue router
        const route = useRoute();
        const router = useRouter();

		// Sticker group
		const stickerGroup = computed(() => {
			return store?.state?.config?.config?.sticker_group || [];
		});

		// 頁籤列表
		const tabList = computed(() => {
            return stickerGroup.value.filter((element) => {
                if (element.id === 1) {
                    return false;
                } else if (element.has_program === true) {
                    return true;
                } else if (element.id === 2) {
                    return true;
                } else if (element.id === 3) {
                    return true;
                } else if (element.id === 4) {
                    return true;
                } else {
                    return false;
                }
            });
        });

		// Component state
        var queryTab = 0;
        try {
            queryTab = Number(route?.query?.tab);
        } catch (e) {
            queryTab = 0;
        }
        const firstTab = tabList.value[0] || {};
        const firstTabId = firstTab.id || 0;
		const state = reactive({
			activeTab: queryTab || firstTabId,
		});

		// 頁籤改變
		const changeTab = (name) => {
            // Update active tab
			state.activeTab = name;

            // Update query
            router.replace({
                query: {
                    tab: name,
                },
            });
		};
        return {
            state,
            tabList,
            changeTab,
        };
    },
};
</script>
<style lang="scss" scoped>
::v-deep(.van-tabs__wrap) {
	height: 80px;
}
::v-deep(.van-tabs__line) {
	background-color: transparent !important;
}
</style>