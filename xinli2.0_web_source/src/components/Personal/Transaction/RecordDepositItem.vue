<template lang="pug">
.RecordDepositItem.h-full.BETWEEN_C
	.p-4
		.BETWEEN.my-4
			.text-sm.font-semibold {{t('personal_add_value')}}
			//- 狀態[1:處理中 2:失敗 3:完成 4:逾時]
			.text-sm.font-semibold(:class='{"text-SystemSuccess": data.status===3 }') {{data.statusStr}}
		.BETWEEN.text-gray-500.my-4.gap-4
			.text-sm.font-semibold.flex-shrink-0 {{t('personal_amount')}}
			.font-semibold.text-black.truncate ¥ {{commaFormat(data.amount)}}
		.BETWEEN.text-gray-500.my-4.gap-4(v-if='data.status===1')
			.text-sm.font-semibold.flex-shrink-0 {{t('personal_explain')}}
			.text-sm.truncate  {{countDownTime}}
	.p-4.bg-gray-50.text-left.text-gray-500
		.text-xs {{data.payment}}
		.text-xs {{data.createdAt}}
		.text-xs {{data.id}}
		a-button.w-full.my-2(v-if='data.status===1' danger @click='cancelOder') {{t('personal_transaction_cancel_oder')}}
</template>

<script setup lang="ts">
	import { onMounted, onUnmounted, ref, defineProps } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { postPaymentDepositCancel } from '@/api';
	import type { PAYMENTAJAX_DepositListResponseData } from '@/api/model';
	import { commaFormat } from '@/utils';

	import SvgIcon from '@/components/SvgIcon/index.vue';
	import dayjs from 'dayjs';
	// dayjs 兩個時間點的差距 plugin
	import duration from 'dayjs/plugin/duration';
	dayjs.extend(duration);

	const { t } = useI18n();
	const emit = defineEmits(['reload']);
	interface Props {
		data: PAYMENTAJAX_DepositListResponseData;
	}
	const props = defineProps<Props>();
	const timer = ref<number>();
	const endTime = ref('');
	const countDownTime = ref('');

	// 倒數計時
	const cancelOder = () => {
		postPaymentDepositCancel({ id: props.data.id }).then((res) => {
			emit('reload');
		});
	};
	const countDown = () => {
		const diffTime = dayjs(endTime.value).diff(dayjs(), 'seconds');
		if (diffTime < 0) {
			countDownFinish();
		}
		countDownTime.value = dayjs.duration(diffTime, 'seconds').format('mm[:]ss') + t('personal_transaction_deadline');
	};
	const countDownFinish = () => {
		clearInterval(timer.value);
		emit('reload');
	};

	onUnmounted(() => {
		clearInterval(timer.value);
	});
	onMounted(() => {
		endTime.value = dayjs(props.data.createdAt).add(30, 'm').format('YYYY-MM-DD HH:mm:ss');
		if (props.data.status === 1) {
			const diffTime = dayjs(endTime.value).diff(dayjs(), 'seconds');
			if (diffTime > 1) {
				timer.value = window.setInterval(() => countDown(), 1000);
			} else {
				countDownTime.value = '已截止';
			}
		}
	});
</script>

<style scoped lang="scss"></style>
