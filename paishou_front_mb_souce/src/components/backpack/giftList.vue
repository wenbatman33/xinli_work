<template lang="pug">
//- 禮物列表
//- 下拉刷新
van-pull-refresh(:model-value='isLoading', @refresh='refresh')
	.gift-list
		//- 沒有禮物
		empty.mt-12(v-if='isEmpty', text='没有礼物')

		//- 禮物列表
		.flex.flex-col(v-else)
			gift-element(v-for='item in giftList', :item='item')
</template>
<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import empty from '@/components/empty';
import giftElement from '@/components/backpack/giftElement.vue';

export default {
	components: {
		empty,
		giftElement,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// 禮物列表
		const giftList = computed(() => store?.state?.user?.backpackGiftList || []);

		// 是否正在取得資料
		const isLoading = computed(() => store?.state?.user?.isGettingBackpackGiftList === true);

		// 資料室否為空
		const isEmpty = computed(() => giftList.value.length === 0);

		// 取得禮物列表
		const getGiftList = () => {
			store.dispatch('user/GET_BACKPACK_GIFT_LIST');
		};

		// On component mounted
		onMounted(() => {
			getGiftList();
		});

		// 下拉刷新
		const refresh = () => {
			getGiftList();
		};
		return {
			giftList,
			isLoading,
			isEmpty,
			refresh,
		};
	},
};
</script>
<style lang="scss" scoped>
.gift-list {
	width: 100%;
}
</style>