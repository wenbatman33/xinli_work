<template lang="pug">
.w-full
	.bonusListItem.p-4.border-b.border-gray-200
		.grid.grid-cols-12.gap-2
			.col-span-3.CENTER.cursor-pointer(@click="showsubList=!showsubList")
				SvgIcon.w-4.h-4.text-paimary(:name='"#Arrow_Down_Line"')
				img.mx-2(:src='VIP_Icon')
				span {{VIP_itemName}}
			.col-span-2.CENTER {{subList?.summery ? `${subList?.summery[0]?.percent}%` : '--'}}
			.col-span-2.CENTER {{subList?.summery ? `￥ ${subList?.summery[0]?.money}`: '--'}}
			.col-span-2.CENTER 1
			.col-span-1.CENTER --
			.col-span-2.text-right
				a-button(v-if='subList.list && subList.list?.length >0' danger @click='takeMemberVipGiftByType(props.type)') {{VIP_typeName}}
				a-button.text-xRed(v-else type='primary' disabled) 尚未结算
	.subList.bg-gray-50.p-4.border-b.border-gray-200.p-4(v-if='showsubList')
		.text-center(v-if='subList.list && subList.list?.length ===0') 暂无回馈金
		.w-fullv-else(v-else v-for='item in subList.list')
			.grid.grid-cols-12.gap-2
				.col-span-3.CENTER {{item.createdAt}} 
				.col-span-2.CENTER 0.40 %
				.col-span-2.CENTER ￥ {{commaFormat(item.gift)}}
				.col-span-2.CENTER 1
				.col-span-1.CENTER --
				.col-span-2.text-right
					span(v-if='item===1') 已領取
					a-button.text-xRed(type="text" v-if='item===2' @click='item.id && takeMemberVipGiftByID(item.id)') 立即领取
</template>

<script setup lang="ts">
	import { onMounted, ref, computed, defineProps, defineExpose } from 'vue';
	import { getMemberVipGift, postMemberVipGift, postMemberVipGiftType, postMemberVipGiftAll } from '@/api';
	import type { MEMBERAJAX_GetVipGiftResponse } from '@/api/model';
	import { notification } from 'ant-design-vue';
	import SvgIcon from '@/components/SvgIcon/index.vue';
	import { commaFormat } from '@/utils';

	// 曝露 function 給父組件使用
	defineExpose({
		reaload() {
			init();
		},
	});
	interface Props {
		type: number;
	}
	const props = defineProps<Props>();
	const VIP_Icon = computed(() => `${window.staticPath}/static/img/VIP/VIP_Icon_${props.type}.png`);
	const VIP_itemName = computed(() => {
		let name = '';
		if (props.type === 1) {
			name = 'VIP 专属体育返水';
		} else if (props.type === 2) {
			name = 'VIP 专属真人返水';
		} else if (props.type === 3) {
			name = 'VIP 专属电子返水';
		} else if (props.type === 4) {
			name = 'VIP 专属彩票返水';
		} else if (props.type === 5) {
			name = 'VIP 专属电竞返水';
		}
		return name;
	});
	const VIP_typeName = computed(() => {
		let name = '';
		if (props.type === 1) {
			name = '领取体育';
		} else if (props.type === 2) {
			name = '领取真人';
		} else if (props.type === 3) {
			name = '领取电子';
		} else if (props.type === 4) {
			name = '领取彩票';
		} else if (props.type === 5) {
			name = '领取电竞';
		}
		return name;
	});

	const showsubList = ref(false);
	const subList = ref({} as MEMBERAJAX_GetVipGiftResponse);

	const takeMemberVipGiftByID = (giftID: number) => {
		postMemberVipGift({ id: giftID })
			.then((res) => {
				if (res.data.statusCode === 0) {
					notification.success({ message: '已派发至您的中心钱包' });
					init();
				} else {
					notification.error({ message: '派发异常，请联系客服处理' });
				}
			})
			.catch((err) => {
				notification.error({ message: err });
			});
	};
	const takeMemberVipGiftByType = (giftID: number) => {
		postMemberVipGiftType({ type: giftID })
			.then((res) => {
				if (res.data.statusCode === 0) {
					notification.success({ message: '已派发至您的中心钱包' });
					init();
				} else {
					notification.error({ message: '派发异常，请联系客服处理' });
				}
			})
			.catch((err) => {
				notification.error({ message: err });
			});
	};
	// postMemberVipGiftType
	const init = () => {
		getMemberVipGift({ type: 4, gameType: props.type }).then((res) => (subList.value = res?.data?.data || {}));
	};

	onMounted(() => {
		init();
	});
</script>
<style scoped lang="scss"></style>
