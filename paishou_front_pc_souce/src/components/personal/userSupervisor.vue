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

		.add_box
			.List(v-if='state.roomList.length>0')
				.grid.grid-cols-3.gap-4
					.col-span-1(v-for='(item, index) in state.roomList')
						.w-full.h-full.bg-white.rounded.shadow.p-2
							.BETWEEN.my-2
								img.AVATAR.w-12.h-12(:src='item.avatar')
								.giftInfo.FLEX_C.flex-grow.px-4
									.BETWEEN
										div
											img.w-7.mr-1(:src='item?.level_anchor_info?.thumb')
											span.text-psV3Yellow UID:{{item.uid}}
											h6.name {{item.nickname}}
										div
											.rounded-full.border.border-psV3Orange.text-psV3Orange.text-xs.py-1.px-2(v-if='item.status===1') 开播中
											.rounded-full.border.border-gray-200.text-gray-200.text-xs.py-1.px-2(v-if='item.status===0')  关播

							.latest_live.my-2
								.bg-gray-100.p-2
									span 最近开播
									span.float-right {{item.latest_live}}
							.latest_login.my-2
								.bg-gray-100.p-2
									span 最近访问
									span.float-right {{item.latest_login}}
							.w-full.my-2
								.grid.grid-cols-2.gap-4
									.col-span-1 
										a-button(block, @click='showConfirm(item)') 辞职
									.col-span-1 
										a-button(type='primary', block, :disabled='item.status===0', @click='viewLive(item.uid)') 进入直播间
			div(v-else='', style='text-align: center;color: #c6c6c9;')
				img.mt-24(src='/publicAssets/img/v3/img-no-information.png', alt='')
				p 抱歉！暂无相关直播！
	a-modal(v-if='state.showModal', :visible='state.showModal', :maskClosable='true', :closable='true', :footer='null', @cancel='state.showModal=false')
		.p-4
			h4.my-12.text-center 确定要跟主播 {{state.currentItem.name}} 解除关系吗?
			.my-12.text-center
				a-button.mx-4(@click='state.showModal=false') 取消
				a-button.mx-4(type='primary', @click='resignationAdminHandle') 确定

</template>
<script>
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { reactive, onMounted, computed, toRaw } from 'vue';
import { adminList, resignationAdmin } from '@/api';
import menuList from '@/components/personal/menuList.vue';

import { message, Modal } from 'ant-design-vue';

export default {
	components: {
		menuList,
	},
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			tabID: 0,
			menuTabList: [
				{ title: '全部', value: 0 },
				{ title: '开播中', value: 1 },
				{ title: '未开播', value: 2 },
			],
			roomList: [],
			returnList: [],
			showModal: false,
			currentItem: null,
		});
		onMounted(() => {
			getadminList();
		});
		const tabChange = (val) => {
			state.tabID = val;
			state.roomList = state?.returnList[val] || [];
		};
		const showConfirm = (item) => {
			state.currentItem = toRaw(item);
			state.showModal = true;
		};
		const resignationAdminHandle = () => {
			resignationAdmin({
				uid: Number(UID.value),
				live_uid: state.currentItem.uid,
			}).then((res) => {
				state.showModal = false;
				message.success(`已开除主播 ${state.currentItem.nickname}`);
				getadminList();
			});
		};
		const getadminList = () => {
			adminList({
				uid: Number(UID.value),
			}).then((res) => {
				if (res.code === 0 && res.data) {
					if (res.data.list) {
						// 全部 開播中 未開播
						state.returnList[0] = res?.data?.list || [];
						state.returnList[1] = res?.data?.list.filter((item) => item.status == 1) || [];
						state.returnList[2] = res.data.list.filter((item) => item.status == 0) || [];
						tabChange(0);
					} else {
						state.roomList = [];
					}
				}
			});
		};
		const viewLive = (liveuid) => {
			router.push(`/room/${liveuid}`);
		};
		return {
			store,
			state,
			route,
			router,
			UID,
			getadminList,
			showConfirm,
			resignationAdminHandle,
			tabChange,
			viewLive,
		};
	},
};
</script>
<style lang="scss" scoped></style>
