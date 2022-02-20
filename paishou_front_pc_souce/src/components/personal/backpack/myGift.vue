<template lang="pug">
.myGift

	.List(v-if='state.loaded && state.dataList.length>0')
		.grid.grid-cols-3.gap-4
			.col-span-1(v-for='(item, index) in state.dataList', :key='index')
				.w-full.h-full.bg-white.rounded.shadow.CENTER_BETWEEN.p-4.cursor-pointer(@click='clickHandle(item)')
					.gifticon.w-12.h-12.rounded-full.overflow-hidden.bg-gray-300
						img.w-full(:src='item.gifticon')
					.giftInfo.FLEX_C.flex-grow.px-4
						h6.giftname 
							span {{item.giftname}}
							span.text-gray-500.float-right 库存：{{item.quantity}}
						.needcoin.text-xs.text-psV3Yellow.my-1
							img.w-4.h-4.mr-1(src='/publicAssets/img/v3/coin.png')
							span {{item.needcoin}}
						.texplain.text-xs.text-gray-500 {{item.giftexplain}}
					
		//- .mt-8.text-right(v-if='state.total>0')
		//- 	a-pagination(v-model:current='state.page', :page-size='state.pagesize', :total='state.total', size='small', show-less-items='', :hideonsinglepage='true', @change='init')
	
	a-skeleton(v-if='!state.loaded', active, :paragraph='{ rows: 8}')

	.listItemEmpty.CENTER_C(v-if='state.loaded && state.dataList.length<=0')
		div
			img(src='/publicAssets/img/v3/img-no-information.png', alt='')
		p.text-gray-500 親，您目前沒有任何礼物道具喔！
		p.text-gray-500 趕快買起來送給喜歡的主播吧
	//- ------------------------------------------------------------------------------------------------------------------------------------------------
	a-modal(v-if='state.showDetail', :visible='state.showDetail', :class='"BackpackModal"', width='808px'  closable='', :footer='null', @cancel='closeModel')
		.CENTER
			.w-64.flex-col
				.giftImg.w-32.h-32.bg-gray-300.mx-auto.my-4.rounded-full.overflow-hidden
					img.w-full(:src='state.currentItem.gifticon')
				h4.giftname.text-center {{state.currentItem.giftname}}
				.needCoin.text-center.my-2
					img.w-4.h-4.mr-2(src='/publicAssets/img/v3/coin.png')
					span.text-psV3Yellow.txet-xs {{state.currentItem.needcoin}}
				.texplain.text-center.text-gray-500 {{state.currentItem.giftexplain}}
				.quantity.mx-auto.text-center.my-4
						span.mr-2 库存：
						span {{state.currentItem.quantity}}
				.rounded-xl.border.border-psV3Red.cursor-pointer.py-2.text-center.text-psV3Red(@click='closeModel') 关闭
</template>

<script>
import { useStore } from 'vuex';
import { Modal } from 'ant-design-vue';
import { computed, reactive, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { backpack, sendGift } from '@/api';
import { matomo_backpack_check_gift_item } from '@/matomoEvent';

export default {
	name: 'myGift',
	setup() {
		const store = useStore();
		const state = reactive({
			loaded: false,
			dataList: [],
			page: 1,
			pagesize: 9999,
			total: 0,
			currentItem: null,
			showDetail: false,
		});
		const UID = computed(() => store.state.user.uid || '');
		const userInfo = computed(() => store.state.user.userInfo);
		const init = () => {
			state.currentID = null;
			state.giftcount = 1;
			const payload = {
				// sid 1 是禮物
				sid: 1,
				page: state.page,
				pagesize: state.pagesize,
			};
			backpack(payload).then((res) => {
				state.dataList = res.data.gift_list;
				state.total = res.ttl;
				state.loaded = true;
			});
		};
		const clickHandle = (item) => {
			matomo_backpack_check_gift_item(item.giftname, item.id);
			state.currentItem = item;
			state.showDetail = true;
		};
		const closeModel = () => {
			state.showDetail = false;
		};

		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			UID,
			userInfo,
			init,
			clickHandle,
			closeModel,
		};
	},
};
</script>

<style lang="scss" scoped></style>
