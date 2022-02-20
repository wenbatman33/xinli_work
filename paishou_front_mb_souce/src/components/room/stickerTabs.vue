<template lang="pug">
//- 貼圖頁籤列表
van-tabs.bg-sticker-tabs(v-if='show', :active='state.activeTab', @change='changeTab')
	//- 貼圖頁籤
	sticker-tab(v-for='item in tabList', :item='item', :active='state.activeTab', @update:show='updateShow')
</template>
<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import stickerTab from '@/components/room/stickerTab.vue';

export default {
    components: {
        stickerTab,
    },
    props: {
        show: Boolean,
    },
	emits: ['update:show'],
    setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// Sticker group
		const stickerGroup = computed(() => {
			return store?.state?.config?.config?.sticker_group || [];
		});

		// 頁籤列表
		const tabList = computed(() => {
            return stickerGroup.value;
        });

		// Component state
		const firstTab = tabList.value[0] || {};
		const defaultActiveTab = firstTab.id || 0;
		const state = reactive({
			activeTab: defaultActiveTab,
		});

		// 頁籤改變
		const changeTab = (name) => {
			state.activeTab = name;
		};

		// 更新貼圖列表顯示狀態
		const updateShow = (show) => {
			emit('update:show', show);
		};
        return {
            state,
            tabList,
            changeTab,
            updateShow,
        };
    },
};
</script>
<style lang="scss" scoped>
::v-deep(.van-tab) {
	background: #f4f4f4;
}
::v-deep(.van-tabs__wrap) {
	height: 54px;
}
::v-deep(.van-tabs__line) {
	background-color: transparent !important;
}
.bg-sticker-tabs {
	background: #f4f4f4;
}
</style>