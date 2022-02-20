<template lang="pug">
.backpackList.px-4.py-2
	a-tabs(default-active-key='1', @change='tabChange')
		a-tab-pane(key='1', tab='礼物')
			listByGift
		a-tab-pane(key='2', tab='道具')
			listByItem
</template>

<script>
import { useStore } from 'vuex';
import { Modal } from 'ant-design-vue';
import { computed, reactive, onMounted, onUnmounted, watch, nextTick } from 'vue';
import listByGift from '@/components/backpackList/listByGift.vue';
import listByItem from '@/components/backpackList/listByItem.vue';
import { matomo_liveRoom_backpack_gift, matomo_liveRoom_backpack_giftbox } from '@/matomoEvent';

export default {
	name: 'backpackList',
	components: {
		listByGift,
		listByItem,
	},
	setup() {
		const store = useStore();
		const state = reactive({});
		const UID = computed(() => store.state.user.uid || '');
		const tabChange = (val) => {
			if (val === '1') {
				matomo_liveRoom_backpack_gift();
			} else if (val === '2') {
				matomo_liveRoom_backpack_giftbox();
			}
		};

		onUnmounted(() => {});
		onMounted(() => {});
		return {
			store,
			state,
			UID,
			tabChange,
		};
	},
};
</script>

<style lang="scss" scoped>
.backpackList {
	width: 400px;
}
</style>
