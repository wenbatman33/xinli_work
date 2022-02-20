<template lang="pug">
.listByGift.pb-4
	.listItemList(v-if='state.dataList.length>0')
		.FLEX_R.flex-wrap
			.listItem.cursor-pointer.mr-2(v-for='(item ,index) in state.dataList', @click='selectItem(item)', :class='{"listItemActive": (state.currentID === item.id) }')
				img(:src='item.gifticon')
				.quantity {{ ( item.quantity > 999) ?'999+': item.quantity}}
		.mt-8.CENTER_BETWEEN
			a-pagination(v-model:current='state.page', :page-size='state.pagesize', :total='state.total', size='small', show-less-items='', :hideonsinglepage='true', @change='init')
			.giveGift
				span 数量
				input(type='text', v-model.number='state.giftcount')
				a-button.text-xs(type='primary', size='small', shape='round', :disabled='state.currentID===null', @click='sendGiftHandle') 赠送
	.listItemEmpty(v-else)
		a-empty(:description='"无道具"')
</template>

<script>
import { useStore } from 'vuex';
import { Modal } from 'ant-design-vue';
import { computed, reactive, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { backpack, sendGift } from '@/api';
import { matomo_liveRoom_backpack_send_gift } from '@/matomoEvent';

export default {
	name: 'listByGift',
	setup() {
		const store = useStore();
		const state = reactive({
			dataList: [],
			page: 1,
			pagesize: 12,
			total: 0,
			currentName: null,
			currentID: null,
			giftcount: 1,
		});
		const UID = computed(() => store.state.user.uid || '');
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
			});
		};
		const selectItem = (item) => {
			state.currentID = item.id;
		};
		const sendGiftHandle = () => {
			matomo_liveRoom_backpack_send_gift(state.currentName, state.currentID);
			const payload = {
				uid: 0,
				liveuid: 0,
				stream: 'string',
				giftid: 0,
				giftcount: 0,
			};
			let param = { giftId: state.currentID, number: state.giftcount };
			store.commit('socket/SEND_BACKPACK_ITEM', param);
			setTimeout(() => {
				init();
				// 更新禮物列表
				store.dispatch('user/GET_GIFT_LIST');
			}, 300);
		};
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			UID,
			init,
			selectItem,
			sendGiftHandle,
		};
	},
};
</script>

<style lang="scss" scoped>
.listByGift {
	width: 100%;
}
.listItem {
	position: relative;
	width: 42px;
	height: 42px;
	border: solid 1px #f4f5f8;
	img {
		width: 100%;
		height: 100%;
	}
	.quantity {
		position: absolute;
		right: 0;
		bottom: 0;
		color: #fff;
		width: 30px;
		height: 12px;
		font-size: 12px;
		border-radius: 2px 2px 0 0;
		text-align: center;
		line-height: 12px;
		background: #ffa100;
	}
}
.listItemActive {
	border: solid 1px #a62337;
}
.giveGift {
	width: 150px;
	font-size: 12px;
	input {
		width: 45px;
		height: 20px;
		outline: none;
		border: 1px solid #c6c6c9;
		border-radius: 5px;
		padding: 5px;
		margin: 0 5px;
	}
}
</style>
