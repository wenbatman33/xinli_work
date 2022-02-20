<template>
	<div class="container pb-4 FLEX_C">
		<div class="justify-center mt-2 text-center FLEX_C">
			<div class="text-primary">{{ $t('record_Record_02', [year, month]) }}</div>
		</div>
		<div class="px-2 growshrink">
			<van-cell :title="$t('record_Record_03')" :value="state.activeMemberCount" size="large"  value-class="text-white" />
			<van-cell :title="$t('record_Record_04')" size="large">
				<template #value>
					<span :class="state.totalAmount < 0 ? 'text-red' : 'text-white'">{{ state.totalAmount }}</span>
				</template>
			</van-cell>
			<van-cell :title="$t('record_Record_05')" :value="state.chargeAmount" size="large" value-class="text-white" />
			<van-cell :title="$t('record_Record_06')" :value="state.depositWithdrawFeeAmount" size="large" value-class="text-white" />
			<van-cell :title="$t('record_Record_07')" :value="state.bonusAmount" size="large" value-class="text-white" />
			<van-cell :title="$t('record_Record_08')" size="large">
				<template #value>
					<span :class="state.netProfitAmount < 0 ? 'text-red' : 'text-white'">{{ state.netProfitAmount }}</span>
				</template>
			</van-cell>
			<van-cell :title="$t('record_Record_09')" :value="state.rank" size="large" value-class="text-white" />
			<van-cell :title="$t('record_Record_10')" :value="state.commissionPercent" size="large" value-class="text-white" />
			<van-cell :title="$t('record_Record_11')" :value="state.commissionBalanceAmount" size="large" value-class="text-white" />
			<van-cell :title="$t('record_Record_12')" :value="state.commissionAmount" size="large" value-class="text-white" />
			<van-cell :title="$t('record_Record_13')" :value="state.childAgencyCommissionTotalAmount" size="large" is-link to="recordSubProxyDetail"  value-class="text-white" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { getCommissionreport } from '@/api';
	import { ref, onMounted, reactive } from 'vue';
	import dayjs from 'dayjs';

	const state = reactive({
		date: '',
		activeMemberCount: 0,
		totalAmount: 0,
		chargeAmount: 0,
		depositWithdrawFeeAmount: 0,
		bonusAmount: 0,
		netProfitAmount: 0,
		rank: 0,
		commissionPercent: 0,
		commissionBalanceAmount: 0,
		commissionAmount: 0,
		childAgencyCommissionTotalAmount: 0,
	});
	const year = ref('');
	const month = ref('');
	onMounted(() => {
		getCommissionreport().then((res) => {
			if (res.data.statusCode === 0) {
				year.value = dayjs(res.data.data?.date).format('YYYY');
				month.value = dayjs(res.data.data?.date).format('M');
				Object.assign(state, res.data.data);
			}
		});
	});
</script>
<style lang="scss" scoped>
	.growshrink {
		flex-grow: 1;
	}
	@media only screen and (max-height: 741px) {
		.growshrink {
			flex-shrink: 1;
			flex-grow: 0;
		}
	}
</style>
