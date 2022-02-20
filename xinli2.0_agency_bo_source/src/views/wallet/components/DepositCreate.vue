<template lang="pug">
div
  van-form(@submit="handelDepositOnSubmit" validate-trigger="onSubmit")
    van-field(
      v-model="depositChannelDisplay" 
      readonly name="picker" 
      :label="$t('wallet_wallet_10')" 
      :placeholder="$t('wallet_wallet_11')" 
      @click="handelShowDepositPicker" 
      :rules="[{ required: true, message: $t('wallet_wallet_11') }]")
      template(#button)
        van-icon(name="arrow")
    van-field(
      v-model="createDepositAmount" 
      :label="$t('wallet_wallet_12')" 
      :placeholder="$t('wallet_wallet_13',[createDepositAmountMin,createDepositAmountMax])" 
      :rules="[{ validator:createDepositAmountValidator, message: $t('wallet_wallet_63') }]")
    .grid.grid-cols-4.gap-4.mt-4
      .text-center.border.rounded-md.bg-golden(style="background: #CDA269;border:0px" @click="createDepositAmount = 100")
        p.text-black 100
      .text-center.border.rounded-md.bg-golden(style="background: #CDA269;border:0px" @click="createDepositAmount = 500")
        p.text-black 500
      .text-center.border.rounded-md.bg-golden(style="background: #CDA269;border:0px" @click="createDepositAmount = 1000")
        p.text-black 1,000
      .text-center.border.rounded-md.bg-golden(style="background: #CDA269;border:0px" @click="createDepositAmount = 5000")
        p.text-black 5,000
    .container.FLEX_C(v-if="showDepositUSDT")
      div(class="grid mt-6 rounded-md bg-[#191919]")
        .flex.justify-between.h-16
          span.ml-4.text-white.CENTER_C.bodoni {{exchange.toFixed(2)}} USDT
          span(class="CENTER_C mr-4 text-[#8c8c8c]")
            van-icon(name="warning-o")
        div(class="flex justify-center rounded-b-md bg-[#303030]")
          span.m-1.text-xs.text-gray-400.CENTER_C {{$t('wallet_wallet_14')}} 1 USDT = ¥ {{exchangeRate}}
      div(class="grid mt-6 rounded-md bg-[#cda269]")
        .flex.justify-between.h-12
          .flex.justify-start.h-12
            img.m-3(:src="vectorIcon")
            span.font-bold.text-sm.text-black.CENTER_C {{$t('wallet_wallet_15')}}
          span.mr-4.text-black.CENTER_C
            van-icon(name="arrow")
      .grid.mt-2
        .flex.justify-center
          span(class="ml-4 text-xs text-[#7f7f7f] CENTER_C")
            | {{$t('wallet_wallet_16')}}
          span(class="CENTER_C ml-1 text-[#8c8c8c]")
            van-icon(name="warning-o")
    van-button.mt-36(round plain block color="#C60000" @click="handelClickBack")
      | {{$t('wallet_wallet_17')}}
    van-button.my-4.mb-4(
      round block type="info" 
      native-type="submit" 
      :color="buttonColor"
      :loading="createDepositLoading"
      )
      | {{$t('wallet_wallet_18')}}
 
</template>
<script setup lang="ts">
	import { ref, onMounted, computed } from 'vue';
	import { creatAgencyDeposit } from '@/api/';
	const emit = defineEmits(['clickPicker', 'clickBack']);

	const vectorIcon = `${window.staticPath}/static/svg/vector.svg`;

	const createDepositAmountMin = 100;
	const createDepositAmountMax = 1000;
	const createDepositAmountValidator = (val: number | string) => val != '' && Number(val) >= createDepositAmountMin && Number(val) <= createDepositAmountMax;
	const createDepositLoading = ref(false);
	const createDepositRealName = ref('');
	const createDepositId = ref<string | number>('');
	const createDepositAmount = ref<string | number>('');
	const depositChannelDisplay = ref('');
  const exchange = computed(()=> (Number(createDepositAmount.value)/Number(exchangeRate.value)))
	const exchangeRate = computed(()=>{
    if(depositChannelDisplay.value === 'ERC20'){
      return props.exchangeRateERC;
   }else if(depositChannelDisplay.value === 'TRC20'){
     return props.exchangeRateTRC;
    }
    return 0;
  });
	const buttonColor = computed(() => (createDepositAmountValidator(createDepositAmount.value) && Number(createDepositId.value) > 0 ? '#C60000' : '#242424B2'));
	const showDepositUSDT = computed(() => depositChannelDisplay.value === 'ERC20' || depositChannelDisplay.value === 'TRC20');
	defineExpose({
		createDepositId,
		depositChannelDisplay,
		showDepositUSDT,
	});
	const props = defineProps({
		exchangeRateERC: Number,
		exchangeRateTRC: Number,
	});
	const handelClickBack = () => {
		emit('clickBack');
	};
	const handelShowDepositPicker = () => {
		emit('clickPicker');
	};

	const handelDepositOnSubmit = async (values) => {
		createDepositLoading.value = true;
		creatAgencyDeposit({
			id: Number(createDepositId.value),
			amount: Number(createDepositAmount.value),
			realName: createDepositRealName.value,
		}).then((res) => {
      if(res.data.statusCode === 0){
        window.open(res.data.data?.data?.pay_url.toString(),'_blank')
      }
    }).finally(()=>{
      createDepositLoading.value = false
    });
		// console.log("submit", values);
		// try {
		// 	console.log(values);
		// 	switch (createDepositId.value) {
		// 		case 1:
		// 			router.push({
		// 				path: '/webBank/id',
		// 				query: { id: 666 },
		// 			});
		// 			break;
		// 		case 2:
		// 			router.push({
		// 				path: '/thirdParty/id',
		// 				query: { id: 666 },
		// 			});
		// 			break;
		// 		case 6:
		// 			router.push({
		// 				path: '/passwordRedEnvelope/id',
		// 				query: { id: 666 },
		// 			});
		// 			break;
		// 		case 8:
		// 			router.push({
		// 				path: '/thirdParty/id',
		// 				query: { id: 666 },
		// 			});
		// 			break;
		// 		case 3:
		// 			showDepositUSDT.value = true;
		// 			break;
		// 		case 4:
		// 			showDepositUSDT.value = true;
		// 			break;
		// 	}
		// 	console.log('handelDepositOnSubmit', values);
		// } finally {
		// 	// Turn loading off
		// 	// loginLoading.value = false;
		// }
	};
	onMounted(() => {});
</script>
