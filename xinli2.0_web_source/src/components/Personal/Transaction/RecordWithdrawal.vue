<template lang="pug">
.grid.grid-cols-4.gap-4.my-4
	.col-span-1.rounded-xl.border.border-gray-200.text-center.overflow-hidden(v-if='props?.data?.length>0' v-for="item in props?.data")
		.p-4
			.BETWEEN.my-4
				.text-sm.font-semibold {{t('personal_Withdrawal_Bank_Card')}} ({{item.payment}})
				//- 狀態[1.待審核 2.待出款 3.退回 4.出款中 5. 完成 6.失敗]
				.text-sm.font-semibold(:class='{"text-SystemSuccess": item?.status===5 }') {{item.statusStr}}
			.BETWEEN.text-gray-500.my-4.gap-4
				.text-sm.font-semibold.flex-shrink-0  {{t('personal_amount')}}
				.font-semibold.text-black.truncate  {{item.payment ==='USDT'? `${commaFormat(item.amount)} USDT`:`¥ ${commaFormat(item.amount)}`}}
			.BETWEEN.text-gray-500.my-4.gap-4
				.text-sm.font-semibold.flex-shrink-0 {{t('personal_deposit')}}
				.text-sm.truncate {{item.to}}
			.BETWEEN.text-gray-500.my-4.gap-4
				.text-sm.font-semibold.flex-shrink-0  {{t('personal_transaction_exchange_rate')}}
				.text-sm.truncate {{item.exchangeRate}}
		.p-4.bg-gray-50.text-left.text-gray-500
			.text-xs {{item.createdAt}}
			.text-xs {{item.id}}
	.col-span-4.CENTER_C.h-60(v-else)
		img.w-20.my-4(:src='Not_Found')
		.text-xs {{t('withdrawal_record_not_found')}}

</template>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n';
	import { commaFormat } from '@/utils';
	import type { PAYMENTAJAX_WithdrawalListResponseData } from '@/api/model';

	const Not_Found = `${window.staticPath}/static/img/svg/Not_Found.svg`;
	const { t } = useI18n();

	interface Props {
		data: PAYMENTAJAX_WithdrawalListResponseData[];
	}
	const props = defineProps<Props>();
</script>

<style scoped lang="scss"></style>
