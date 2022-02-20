<template lang="pug">
.Container.BETWEEN
	//- personal 左側區塊------------------------------------------------------------------------------------------------------------
	.funcBar.w-40.pr-4.flex-shrink-0
		menuList
		a-divider.my-4
		.funcBarSubMenu
			.funcBarSubItem.rounded-lg.mt-4(v-for='(item, index) in state.menuTabList', class='hover:text-psV3Red', :class='{"text-psV3Red border border-psV3Red ":(state.tabID===index)}')
				.flex.px-2.cursor-pointer.p-2.text-center(@click='tabChange(index)') {{item.title}}

	.w-full
		//- 上方 type選單區塊-----------------------------------------------
		.hFuncBar.FLEX_R.bg-white.rounded-lg.shadow.p-4.mb-4
			.typeMenu.FLEX_R
				.typeMenuItem.rounded-lg.text-center.mr-4.p-2(v-for='(item, index) in state.menuTabList', class='hover:text-psV3Red', :class='{"text-psV3Red border border-psV3Red ":(state.tabID===index)}')
					.px-2.cursor-pointer(@click='tabChange(index)' )
						.font-black.mr-1 {{item.title}}

		.min-h-full
			myGift(v-if='state.tabID ===0')
			myItem(v-if='state.tabID ===1')

</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, reactive, toRaw } from 'vue';
import { followsList, followsListV2, setattent } from '@/api';
import myGift from '@/components/personal/backpack/myGift';
import myItem from '@/components/personal/backpack/myItem';
import menuList from '@/components/personal/menuList.vue';
import { matomo_backpack_check_gift, matomo_backpack_check_giftBox } from '@/matomoEvent';

export default {
	name: 'backpack',
	components: {
		myGift,
		myItem,
		menuList,
	},
	setup() {
		const store = useStore();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			tabID: 0,
			menuTabList: [
				{ title: '我的礼物', value: 0 },
				{ title: '我的道具', value: 1 },
			],
		});
		const init = () => {};
		const tabChange = (val) => {
			if (val === '1') {
				matomo_backpack_check_gift();
			} else if (val === '2') {
				matomo_backpack_check_giftBox();
			}
			state.tabID = val;
		};
		onMounted(() => {
			if (!UID.value) {
				router.push('/');
			} else {
				init();
			}
		});
		return {
			router,
			state,
			init,
			tabChange,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.ant-tabs-bar) {
	padding: 0 20px;
	background: #fff;
	border: none;
	border-radius: 8px;
}
</style>
