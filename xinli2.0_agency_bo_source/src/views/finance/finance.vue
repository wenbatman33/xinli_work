<template lang="pug">
div(class="container pb-4 FLEX_C")
	van-tabs(v-model:active="active" animated background="transparent" title-active-color="white" title-inactive-color="#ccc" color="white" line-width="50%" line-height="1" @click-tab="onClickTab")
		van-tab(:title="(lastMonth.month()+1) + $t('finance_finance_03')")
			.p-4
				div(class="justify-center text-center rounded-lg FLEX_C btnBg")
					.pt-4.text-primary ◆ {{ $t('finance_finance_04') }} ◆
					.pb-4.text-white.bodoni {{ tableDataRef2.netIncome }}
				van-cell(size="large" :title="$t('finance_finance_05')" :value="tableDataRef2.deposit")
				van-cell(size="large" :title="$t('finance_finance_06')" :value="tableDataRef2.withdrawal")
				van-cell(size="large" :title="$t('finance_finance_07')" :value="tableDataRef2.bonus" is-link :to="{ path: '/bonus', query: { month: lastPeriod } }")
				van-cell(:title="$t('finance_finance_08')" :value="tableDataRef2.platformFee" size="large" is-link :to="{ path: '/platform', query: { month: lastPeriod } }")
				van-cell(:title="$t('finance_finance_09')" :value="tableDataRef2.handlingFee" size="large")
				van-cell(:title="$t('finance_finance_10')" :value="tableDataRef2.totalIncome" size="large")
				van-cell(:title="$t('finance_finance_11')" :value="tableDataRef2.activeMemberCounts" size="large" )
				van-button.mt-16.bg-black.border(:class='"border-[#CDA269] text-[#CDA269]"' size="large" round :to="{ name: 'FinanceProductList' }") {{ $t('finance_finance_12') }}
		van-tab(:title="(thisMonth.month()+1) + $t('finance_finance_03')")
			.p-4
				div(class="justify-center text-center rounded-lg FLEX_C btnBg")
					.pt-4.text-primary ◆ {{$t('finance_finance_04')}} ◆
					.pb-4.text-white.bodoni {{ tableDataRef1.netIncome }}
				van-cell(size="large" :title="$t('finance_finance_05')" :value="tableDataRef1.deposit")
				van-cell(size="large" :title="$t('finance_finance_06')" :value="tableDataRef1.withdrawal")
				van-cell(size="large" :title="$t('finance_finance_07')" :value="tableDataRef1.bonus" is-link :to="{ path: '/bonus', query: { month: thisPeriod } }")
				van-cell(:title="$t('finance_finance_08')" :value="tableDataRef1.platformFee" size="large" is-link :to="{ path: '/platform', query: { month: thisPeriod } }")
				van-cell(:title="$t('finance_finance_09')" :value="tableDataRef1.handlingFee" size="large")
				van-cell(:title="$t('finance_finance_10')" :value="tableDataRef1.totalIncome" size="large")
				van-cell(:title="$t('finance_finance_11')" :value="tableDataRef1.activeMemberCounts" size="large" is-link :to="{ path: '/activemember' }")
				van-button.mt-16.bg-black.border(:class='"border-[#CDA269] text-[#CDA269]"' size="large" round :to="{ name: 'FinanceProductList' }") {{ $t('finance_finance_12') }}

</template>

<script setup lang="ts">
import type { AGENCYAJAX_AgencyFinanceIndexResponse } from '@/api/model';
	import { getMonthFinance } from '@/api';
	import { ref, onMounted } from 'vue';
	import dayjs from 'dayjs';
	const active = ref(1);
	const tableDataRef1 = ref<AGENCYAJAX_AgencyFinanceIndexResponse>({})
	const tableDataRef2 = ref<AGENCYAJAX_AgencyFinanceIndexResponse>({})
	
	const lastMonth = dayjs().subtract(1, 'month');
	const lastPeriod = `${lastMonth.year()}-${lastMonth.month()+1}`;
	const thisMonth = dayjs();
	const thisPeriod = `${thisMonth.year()}-${thisMonth.month()+1}`;


	const onClickTab = ({ title }) => {
		// console.log(title);
		// getMonthFinance({ getMonthFinance : 0  }).then((response) => {
		// 	// console.log(response.data.data);
		// 	Object.assign(state, response.data.data);
		// });
	};

	const getData = (periodOption:number) => {
		getMonthFinance({ periodOption }).then((res) => {
			if (res.data.statusCode === 0) {
				if(periodOption===1)tableDataRef1.value= res.data.data || {}
				if(periodOption===2)tableDataRef2.value= res.data.data || {}
			}
		});
	};

	onMounted(() => {
		getData(1);
		getData(2);
	});
</script>

<style lang="less" scoped>
	.btnBg {
		// background-image: url('@/assets/pattern_btn_bg.svg'), linear-gradient(155.07deg, #343434 5.26%, #181818 84.13%);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: 98% center;
	}
</style>
