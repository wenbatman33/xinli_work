<template lang="pug">
.Container.BETWEEN.py-8
	//- rank 左側區塊
	.funcBar.w-40.pr-2.flex-shrink-0
		//- rank 類別區塊
		.classListMenu
			//- ------------------------------------------------------
			div(v-for='(item , index) in state.menuList')
				.text-lg.my-4(class='hover:text-psV3Red', class='hover:text-psV3Red', :class='{"menuItemActive":(state.rankType===index)}')
					.pl-4.cursor-pointer(@click='selectMenu(index, item.title)') {{ item.title }}
			//- ----------------------------------------------------
			a-divider
			//- rank sub menu -----------------------------------------------
			.timeMenuItem
				.timeMenuItem.rounded-lg.mt-4(v-for='(subItem, subIndex) in state.currentSubMenu', class='hover:text-psV3Red', :class='{"text-psV3Red border border-psV3Red":(state.rankChildID===subIndex)}')
					.flex.px-2.cursor-pointer.p-2.text-center(@click='selectsSubMenu(subItem.api, subIndex, subItem.leftBarTitle )')
						.text-sm.mr-1 {{ subItem.leftBarTitle }}

	//- rank 右側區塊
	.rankListData.FLEX_C.flex-grow
		//- rank 時間選單區塊-----------------------------------------------
		.hFuncBar.FLEX_R.bg-white.rounded-lg.shadow.p-4.mb-4
			.timeMenuItem.rounded-lg.text-center.mr-4.p-2(v-for='(subItem, subIndex) in state.currentSubMenu' , class='hover:text-psV3Red', :class='{"text-psV3Red border border-psV3Red":(state.rankChildID===subIndex)}')
					.px-2.cursor-pointer(@click='selectsSubMenu(subItem.api, subIndex, subItem.leftBarTitle )')
						.text-sm {{ subItem.subTitle}}
		//- rank 內容-----------------------------------------------
		.rankList.w-full.grid.grid-cols-2.gap-4
			.col-span-1.rounded-lg.shadow.relative.overflow-hidden.min-h-screen
				.absolute.rounded-full.z-0(:style='{top:"-80px",right:"-80px",width:"160px",height:"160px",background:state.weekColor,}') 
					h3.absolute.text-white(:style='{top:"100px",right:"100px"}') 周
				.content.relative.z-10.p-4
					rankingList(:dataList='state.weekDataList', :themeColor='state.weekColor', :rankType='state.rankType', :rankChildID='state.rankChildID')
					
			.col-span-1.rounded-lg.shadow.relative.overflow-hidden.min-h-screen
				.absolute.rounded-full.z-0(:style='{top:"-80px",right:"-80px",width:"160px",height:"160px",background:state.monthColor,}')
					h3.absolute.text-white(:style='{top:"100px",right:"100px"}') 月
				.content.relative.z-10.p-4
					rankingList(:dataList='state.monthDataList', :themeColor='state.monthColor', :rankType='state.rankType', :rankChildID='state.rankChildID')

</template>
<script>
import { useStore } from 'vuex';
import { onMounted, reactive } from 'vue';
import { livePopular, liveSuperStar, userRich, userSuperStar } from '@/api';
import { errorPersonImg } from '@/utils';
import { matomo_rank_select_menu, matomo_rank_select_submenu } from '@/matomoEvent';
import rankingList from '@/components/rank/rankingList.vue';

export default {
	components: {
		rankingList,
	},
	setup() {
		const store = useStore();
		const state = reactive({
			rankType: null,
			rankChildID: null,
			currentSubMenu: [],
			menuList: [
				{
					title: '主播',
					subMenu: [
						{ subTitle: '人气主播排行榜', leftBarTitle: '人气主播', api: livePopular, weekColor: '#df2f4a', monthColor: '#a62337' },
						{ subTitle: '超級明星榜', leftBarTitle: '超級明星', api: liveSuperStar, weekColor: '#56ccf2', monthColor: '#2f80ed' },
					],
				},
				{
					title: '用户',
					subMenu: [
						{ subTitle: '富豪贡献榜', leftBarTitle: '富豪贡献', api: userRich, weekColor: '#df2f4a', monthColor: '#a62337' },
						{ subTitle: '超級明星榜', leftBarTitle: '超級明星', api: userSuperStar, weekColor: '#56ccf2', monthColor: '#2f80ed' },
					],
				},
			],
			weekColor: null,
			weekDataList: [],
			monthDataList: [],
			monthColor: null,
		});
		// ----------------------------------------------------------------------------------------------------
		const selectMenu = (num, name) => {
			matomo_rank_select_menu(name);
			state.weekDataList = [];
			state.monthDataList = [];
			state.rankType = num;
			state.rankChildID = 0;
			state.currentSubMenu = state.menuList[state.rankType].subMenu;
			state.weekColor = state.menuList[state.rankType]?.subMenu[0]?.weekColor;
			state.monthColor = state.menuList[state.rankType]?.subMenu[0]?.monthColor;
			// -------------------------------------------------------------------------------------
			state.menuList[state.rankType].subMenu[0].api({ type: 'week' }).then((res) => {
				state.weekDataList = res.data.list;
			});
			state.menuList[state.rankType].subMenu[0].api({ type: 'month' }).then((res) => {
				state.monthDataList = res.data.list;
			});
			// -------------------------------------------------------------------------------------
		};
		const selectsSubMenu = (api, index, name) => {
			matomo_rank_select_submenu(name);
			state.weekDataList = [];
			state.monthDataList = [];
			state.rankChildID = index;
			state.weekColor = state.menuList[state.rankType]?.subMenu[index]?.weekColor;
			state.monthColor = state.menuList[state.rankType]?.subMenu[index]?.monthColor;
			// -------------------------------------------------------------------------------------
			api({ type: 'week' }).then((res) => {
				state.weekDataList = res.data.list;
			});
			api({ type: 'month' }).then((res) => {
				state.monthDataList = res.data.list;
			});
			// -------------------------------------------------------------------------------------
		};
		const init = () => {
			selectMenu(0);
		};
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			init,
			errorPersonImg,
			selectMenu,
			selectsSubMenu,
		};
	},
};
</script>
<style lang="scss" scoped></style>
