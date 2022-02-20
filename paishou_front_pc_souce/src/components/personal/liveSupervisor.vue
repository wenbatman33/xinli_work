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

		.content.min-h-screen
			adminList(v-if='state.tabID===0')
			banList(v-if='state.tabID===1')
			ipBanList(v-if='state.tabID===2')
			

</template>
<script>
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { reactive, onMounted, computed, toRaw } from 'vue';
import { adminListByHost, setadmin } from '@/api';
import menuList from '@/components/personal/menuList.vue';
import adminList from '@/components/personal/liveSupervisor/adminList.vue';
import banList from '@/components/personal/liveSupervisor/banList.vue';
import ipBanList from '@/components/personal/liveSupervisor/ipBanList.vue';

export default {
	components: {
		menuList,
		adminList,
		banList,
		ipBanList,
	},
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			tabID: 0,
			menuTabList: [
				{ title: '管理员', value: 0 },
				{ title: '黑名单', value: 1 },
				{ title: 'IP封禁', value: 2 },
			],
		});
		const tabChange = (val) => {
			state.tabID = val;
		};

		return {
			store,
			state,
			route,
			router,
			UID,
			tabChange,
		};
	},
};
</script>
<style lang="scss" scoped></style>
