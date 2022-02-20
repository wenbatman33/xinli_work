<template lang="pug">
//- 道具列表
//- 下拉刷新
van-pull-refresh(:model-value='isLoading', @refresh='refresh')
	.item-list
		//- 没有道具
		empty.mt-12(v-if='isEmpty', text='没有道具')

		//- 道具列表
		.flex.flex-col(v-else)
			item-element(v-for='item in itemList', :item='item')
</template>
<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import empty from '@/components/empty';
import itemElement from '@/components/backpack/itemElement.vue';

export default {
	components: {
		empty,
		itemElement,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// 道具列表
		const itemList = computed(() => store?.state?.user?.backpackItemList || []);

		// 是否正在取得資料
		const isLoading = computed(() => store?.state?.user?.isGettingBackpackItemList === true);

		// 資料是否為空
		const isEmpty = computed(() => itemList.value.length === 0);

		// 取得我的背包道具列表
		const getItemList = () => {
			store.dispatch('user/GET_BACKPACK_ITEM_LIST');
		};

		// On component mounted
		onMounted(() => {
			getItemList();
		});

		// 下拉刷新
		const refresh = () => {
			getItemList();
		};
		return {
			itemList,
			isLoading,
			isEmpty,
			refresh,
		};
	},
};
</script>
<style lang="scss" scoped>
.item-list {
	width: 100%;
}
</style>