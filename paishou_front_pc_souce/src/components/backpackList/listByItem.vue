<template lang="pug">
.listByGift.pb-4(v-if='myBackpack')
	.listItemList(v-if='myBackpack.data.gift_list.length>0')
		.FLEX_R.flex-wrap
			.listItem.cursor-pointer.mr-2(v-for='(item ,index) in myBackpack.data.gift_list', @click='clickHandle(item)', :class='{"listItemActive": (state.currentID === item.id) }')
				img(:src='item.gifticon')
				.quantity {{ ( item.quantity > 999) ?'999+': item.quantity}}
		.mt-8.CENTER_BETWEEN
			a-pagination(v-if='myBackpack.ttl>0', v-model:current='state.page', :page-size='state.pagesize', :total='myBackpack.ttl', size='small', show-less-items='', :hideonsinglepage='true', @change='init')
	.listItemEmpty(v-else)
		a-empty(:description='"无礼物"')
</template>

<script>
import { useStore } from 'vuex';
import { Modal } from 'ant-design-vue';
import { computed, reactive, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { backpack, usepackage } from '@/api';

export default {
	name: 'listByItem',
	setup() {
		const store = useStore();
		const state = reactive({
			dataList: [],
			page: 1,
			pagesize: 12,
		});
		const myBackpack = computed(() => store.state.user.myBackpack);
		const init = () => {
			const payload = {
				// sid 2 是道具
				sid: 2,
				page: state.page,
				pagesize: state.pagesize,
			};
			store.dispatch('user/GET_MT_BACKPACK', payload);
		};
		const clickHandle = (item) => {
			store.commit('user/SET_CURRENT_BACKPACK_ITEM', item);
			store.commit('user/SHOW_BACKPACK_MODEL', true);
		};
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			init,
			clickHandle,
			myBackpack,
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
