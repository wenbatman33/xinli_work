<template lang="pug">
.bonusList.rounded-md.shadow
	.bonusListTitle.p-4.border-b.border-gray-200
		.grid.grid-cols-12.gap-2.font-semibold
			.col-span-3.CENTER 返水项目
			.col-span-2.CENTER 返水比例
			.col-span-2.CENTER 返水金额
			.col-span-2.CENTER 流水倍数
			.col-span-1.CENTER 使用限制
			.col-span-2.text-right
				a-button(type='primary' danger @click='takeMemberVipGiftAll') 一键全领
	BonusListItem(:type='1' ref='BonusComp_1')
	BonusListItem(:type='2' ref='BonusComp_2')
	BonusListItem(:type='3' ref='BonusComp_3')
	BonusListItem(:type='4' ref='BonusComp_4')
	BonusListItem(:type='5' ref='BonusComp_5')
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { postMemberVipGiftAll } from '@/api';
	import { notification } from 'ant-design-vue';
	import BonusListItem from '@/components/Personal/VIP/BonusListItem.vue';

	const BonusComp_1 = ref();
	const BonusComp_2 = ref();
	const BonusComp_3 = ref();
	const BonusComp_4 = ref();
	const BonusComp_5 = ref();

	const takeMemberVipGiftAll = () => {
		postMemberVipGiftAll()
			.then((res) => {
				if (res.data.statusCode === 0) {
					notification.success({ message: '已派发至您的中心钱包' });
					BonusComp_1.value?.reaload();
					BonusComp_2.value?.reaload();
					BonusComp_3.value?.reaload();
					BonusComp_4.value?.reaload();
					BonusComp_5.value?.reaload();
				} else {
					notification.error({ message: '派发异常，请联系客服处理' });
				}
			})
			.catch((err) => {
				notification.error({ message: err });
			});
	};
</script>
<style scoped lang="scss"></style>
