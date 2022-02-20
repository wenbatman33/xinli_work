<template lang="pug">
van-popup.bg_pop(v-model:show="showDepositPicker" round position="bottom" :style="{ height: '60%' }")
	.pt-4.text-lg.pingfang.CENTER_C {{$t('wallet_wallet_10')}}
	van-cell(v-for="item in channelList" :key="item" size="large" is-link @click="handelClickDepositchannel(item)")
		template(#title)
			p.text-white( v-if="item.maintain===2") {{item.name}}
			p.text-gray-500( v-if="item.maintain===1")  {{item.name}}
		template(#value)
			p.text-red( v-if="item.maintain==1") {{$t('wallet_wallet_42')}}   
</template>
<script setup lang="ts">
	import { ref, onMounted, defineEmits } from 'vue';
	import type { AGENCYAJAX_GetDepositResponseList } from '@/api/model';
	import { getAgencyDeposit } from '@/api/';

	const emit = defineEmits(['click','setExchangeRate']);
	const channelList = ref([] as AGENCYAJAX_GetDepositResponseList[]);
	const exchangeRateERC = ref(0);
	const exchangeRateTRC = ref(0);
	const showDepositPicker = ref(false);

	defineExpose({
		showDepositPicker,
		exchangeRateERC,
		exchangeRateTRC
	});

	const handelClickDepositchannel = (row: AGENCYAJAX_GetDepositResponseList) => {
		emit('click', row);
	};
	onMounted(() => {
		getAgencyDeposit().then((res) => {
			channelList.value = res.data.data?.list || [];
			exchangeRateERC.value = res.data.data?.exchangeRateERC || 0;
			exchangeRateTRC.value = res.data.data?.exchangeRateTRC || 0;
		});
	});
</script>
