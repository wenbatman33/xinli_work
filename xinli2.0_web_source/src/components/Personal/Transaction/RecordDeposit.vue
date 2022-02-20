<template lang="pug">
.grid.grid-cols-4.gap-4.my-4
	.col-span-1.rounded-xl.border.border-gray-200.text-center.overflow-hidden(v-if='props?.data?.length>0' v-for="item in props?.data")
		RecordDepositItem(:data='item' @reload='reload')
		
	.col-span-4.CENTER_C.h-60(v-else)
		img.w-20.my-4(:src='Not_Found')
		.text-xs {{t('deposit_record_not_found')}}
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { paymentRecordDeposit } from '@/api';
	import type { PAYMENTAJAX_DepositListResponseData } from '@/api/model';
	import SvgIcon from '@/components/SvgIcon/index.vue';
	import RecordDepositItem from '@/components/Personal/Transaction/RecordDepositItem.vue';

	interface Props {
		data: PAYMENTAJAX_DepositListResponseData[];
	}
	const emit = defineEmits(['reload']);

	const reload = () => {
		emit('reload');
	};
	const props = defineProps<Props>();
	const Not_Found = `${window.staticPath}/static/img/svg/Not_Found.svg`;
	const { t } = useI18n();
</script>

<style scoped lang="scss"></style>
