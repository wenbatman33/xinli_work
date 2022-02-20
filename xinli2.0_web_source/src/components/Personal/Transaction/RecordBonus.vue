<template lang="pug">
.grid.grid-cols-4.gap-4.my-4
	.col-span-1.rounded-xl.border.border-gray-200.text-center.overflow-hidden(v-if='props?.data.length>0' v-for="item in props?.data")
		.p-4
			.BETWEEN.my-4
				.text-sm.font-semibold {{t('personal_add_value')}}
				//- 狀態[1處理中2成功3失敗]
				.text-sm.font-semibold(:class='{"text-SystemSuccess": item?.status===2 }') {{statusStr(item.status)}}
			.BETWEEN.text-gray-500.my-4.gap-4
				.text-sm.font-semibold.flex-shrink-0  {{t('personal_amount')}}
				.font-semibold.text-black.truncate ¥ {{commaFormat(item.bonus)}}
			.BETWEEN.text-gray-500.my-4.gap-4
				.text-sm.font-semibold.flex-shrink-0 {{(t('personal_deposit'))}}
				.text-sm.truncate  {{item.typeName}}
			//- .BETWEEN.text-gray-500.my-4.gap-4
			//- 	.text-sm.font-semibold.flex-shrink-0 {{t('personal_explain')}}
			//- 	.text-sm.truncate  {{item.description}}
		.p-4.bg-gray-50.text-left.text-gray-500
			.text-xs {{item.updatedAt}}
			.text-xs {{item.orderNo}}
	.col-span-4.CENTER_C.h-60(v-else)
		img.w-20.my-4(:src='Not_Found')
		.text-xs {{t('bonus_record_not_found')}}

</template>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n';
	import { commaFormat } from '@/utils';
	import type { PAYMENTAJAX_BonusListResponseData } from '@/api/model';

	const Not_Found = `${window.staticPath}/static/img/svg/Not_Found.svg`;
	const { t } = useI18n();
	const statusStr = (type?: number) => {
		let str = '';
		if (type === 1) return (str = '處理中');
		if (type === 2) return (str = '成功');
		if (type === 3) return (str = '失敗');
	};
	interface Props {
		data: PAYMENTAJAX_BonusListResponseData[];
	}
	const props = defineProps<Props>();
</script>

<style scoped lang="scss"></style>
