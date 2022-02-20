<template lang="pug">
a-modal(v-if='showBackpackModal', :visible='showBackpackModal', :zIndex='2000', width='808px', :class='"BackpackModal"', :maskClosable='false'  closable='', :footer='null', @cancel='closeModel')
	//-  currentBackpackItem.is_special===true 為實體商品道具 不用執行開啟 就直接兌換
	.is_special(v-if='currentBackpackItem.is_special===true')
		.CENTER(v-if='currentBackpackItem')
			.w-64.flex-col
				.giftImg.w-32.h-32.bg-gray-300.mx-auto.my-4.rounded-full.overflow-hidden
					img.w-full(:src='currentBackpackItem.gifticon')
				h4.giftname.text-center {{currentBackpackItem.giftname}}
				.needCoin.text-center.my-2
					img.w-4.h-4.mr-2(src='/publicAssets/img/v3/coin.png')
					span.text-psV3Yellow.txet-xs {{currentBackpackItem.needcoin}}
				.texplain.text-center.text-gray-500 {{currentBackpackItem.giftexplain}}
				.quantity.mx-auto.text-center.my-4
					span.mr-2 库存：
					span {{currentBackpackItem.quantity}}
				.w-full.rounded-xl.border.border-psV3Red.cursor-pointer.py-2.text-center.text-psV3Red(@click='closeModel') 关闭


	.step_1(v-if='state.step===1 && currentBackpackItem.is_special!==true')
		.CENTER(v-if='currentBackpackItem')
			.w-64.flex-col
				.giftImg.w-32.h-32.bg-gray-300.mx-auto.my-4.rounded-full.overflow-hidden
					img.w-full(:src='currentBackpackItem.gifticon')
				h4.giftname.text-center {{currentBackpackItem.giftname}}
				.needCoin.text-center.my-2
					img.w-4.h-4.mr-2(src='/publicAssets/img/v3/coin.png')
					span.text-psV3Yellow.txet-xs {{currentBackpackItem.needcoin}}
				.texplain.text-center.text-gray-500 {{currentBackpackItem.giftexplain}}
				.quantity.mx-auto.text-center.my-4
					span.mr-2 库存：
					span {{currentBackpackItem.quantity}}
		.flex.justify-center.items-center.my-4
			a-button.mx-4(@click='closeModel') 取消
			a-button.mx-4(type='primary', @click='packageUseHandle', :loading='state.loading' ) 开启

	.step_2(v-if='state.step===2 && currentBackpackItem.is_special!==true')
		.BETWEEN
			.p-4.border-r(class='w-1/2')
				.giftImg.w-32.h-32.bg-gray-300.mx-auto.my-4.rounded-full.overflow-hidden
					img.w-full(:src='currentBackpackItem.gifticon')
				h4.giftname.text-center {{currentBackpackItem.giftname}}
				.needCoin.text-center.my-2
					img.w-4.h-4.mr-2(src='/publicAssets/img/v3/coin.png')
					span.text-psV3Yellow.txet-xs {{currentBackpackItem.needcoin}}
				.texplain.text-center.text-gray-500 {{currentBackpackItem.giftexplain}}
				.quantity.mx-auto.text-center.my-4
					span.mr-2 库存：
					span {{currentBackpackItem.quantity}}
			.BETWEEN.flex-col(class='w-1/2')
				.p-4
					h5.text-center.text-psV3Red 恭喜您获得
					.grid.grid-cols-1.gap-4
						.giftItem.col-span-1(v-for='(item,index) in state.resResult')
							.BETWEEN.rounded.border
								.flex.flex-grow.items-center.p-2
									.giftImg.w-6.h-6.mr-2.rounded-full.overflow-hidden
										img.w-full(v-if='item.giftname==="bcoin"', src='/publicAssets/img/v3/coin.png')
										img.w-full(v-else, :src='item.gifticon')
									h6.my-2 {{ (item.giftname==='bcoin')?'蕉幣':item.giftname}}
								.quantity.CENTER.text-xs.px-2 X {{item.quantity}}
				.text-center.p-4
					.rounded-xl.border.border-psV3Red.cursor-pointer.py-2.text-center.text-psV3Red(type='primary', @click='closeModelAndReload' ) 確定
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Modal } from 'ant-design-vue';
import { computed, reactive, onMounted, toRaw } from 'vue';
import { packageUse } from '@/api';
import 'csshake/dist/csshake.min.css';
import { matomo_backpack_use_giftBox_item, matomo_liveRoom_open_giftItem } from '@/matomoEvent';

export default {
	name: 'backpackModal',
	components: {},
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			step: 1,
			resResult: null,
			shake: false,
			loading: false,
		});
		const currentBackpackItem = computed(() => store.state.user.currentBackpackItem);
		const showBackpackModal = computed(() => store.state.user.showBackpackModal);
		const closeModel = () => {
			state.step = 1;
			state.resResult = null;
			store.commit('user/SHOW_BACKPACK_MODEL', false);
		};
		const closeModelAndReload = () => {
			// 數量重整
			const payload = {
				// sid 2 是道具
				sid: 2,
				page: 1,
				pagesize: 12,
			};
			store.dispatch('user/GET_MT_BACKPACK', payload).then((res) => {
				state.step = 1;
				state.resResult = null;
				store.commit('user/SHOW_BACKPACK_MODEL', false);
			});
		};
		const packageUseHandle = () => {
			if (route.path === '/personal/backpack') {
				matomo_backpack_use_giftBox_item(currentBackpackItem.value.giftname, currentBackpackItem.value.id);
			} else {
				matomo_liveRoom_open_giftItem(currentBackpackItem.value.giftname, currentBackpackItem.value.id);
			}
			const giftItem = toRaw(currentBackpackItem.value);
			state.resResult = null;
			state.loading = true;
			packageUse({
				gift_id: giftItem.id,
			}).then((res) => {
				state.resResult = res.data.gift_list;
				setTimeout(() => {
					state.step = 2;
					state.loading = false;
				}, 2000);
			});
		};
		onMounted(() => {
			state.step = 1;
			state.resResult = null;
		});
		return {
			store,
			route,
			router,
			state,
			currentBackpackItem,
			showBackpackModal,
			closeModel,
			closeModelAndReload,
			packageUseHandle,
		};
	},
};
</script>
<style lang="scss">
.BackpackModal {
	width: 680px;
	border-radius: 8px !important;
	overflow: hidden;
	padding-bottom: 0px !important;
}
</style>
