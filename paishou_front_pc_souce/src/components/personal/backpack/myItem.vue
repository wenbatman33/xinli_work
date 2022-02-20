<template lang="pug">
.myGift

	.List(v-if='myBackpack')
		.grid.grid-cols-3.gap-4
			.col-span-1(v-for='(item, index) in myBackpack.data.gift_list', :key='index')
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

		//- .mt-8.text-right(v-if='myBackpack && myBackpack.data.gift_list.length>0')
		//- 	a-pagination(v-if='myBackpack.ttl>0', v-model:current='state.page', :page-size='state.pagesize', :total='myBackpack.ttl', size='small', show-less-items='', :hideonsinglepage='true', @change='init')
	
	a-skeleton(v-if='!myBackpack', active, :paragraph='{ rows: 8}')

	.listItemEmpty.CENTER_C(v-if='myBackpack?.data?.gift_list.length<=0')
		div
			img(src='/publicAssets/img/v3/img-no-information.png', alt='')
		p.text-gray-500 親，您目前沒有任何礼物道具喔！
		p.text-gray-500 趕快買起來送給喜歡的主播吧
</template>

<script>
import { useStore } from 'vuex';
import { Modal } from 'ant-design-vue';
import { computed, reactive, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { backpack, sendGift } from '@/api';
import { matomo_backpack_check_giftBox_item } from '@/matomoEvent';

export default {
	name: 'myGift',
	setup() {
		const store = useStore();
		const state = reactive({
			page: 1,
			pagesize: 9999,
		});
		const UID = computed(() => store.state.user.uid || '');
		const userInfo = computed(() => store.state.user.userInfo);
		const myBackpack = computed(() => store.state.user.myBackpack);
		const init = () => {
			const payload = {
				// sid 2 是道具
				sid: 2,
				page: state.page,
				pagesize: state.pagesize,
			};
			store.dispatch('user/GET_MT_BACKPACK', payload).then((res) => {});
		};
		const clickHandle = (item) => {
			matomo_backpack_check_giftBox_item(item.giftname, item.id);
			store.commit('user/SET_CURRENT_BACKPACK_ITEM', item);
			store.commit('user/SHOW_BACKPACK_MODEL', true);
		};
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			UID,
			init,
			userInfo,
			clickHandle,
			myBackpack,
		};
	},
};
</script>

<style lang="scss" scoped>
.myGift {
	width: 100%;
}
.myGiftItem {
	height: 80px;
	border: solid 2px #ffffff;
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 12px;
}
.gifticon {
	position: relative;
	width: 42px;
	height: 42px;
	border: solid 1px #f4f5f8;
	img {
		width: 100%;
		height: 100%;
	}
}
.giftname,
.texplain {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.quantity {
	width: 80px;
	color: #fff;
	border-radius: 80px 0 0 80px;
	background: #a62337;
}
.listItemEmpty {
	height: 600px;
}
</style>
