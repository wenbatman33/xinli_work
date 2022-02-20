<template lang="pug">
.container.pb-4.FLEX_C
  van-tabs(v-model:active="active" animated background="transparent" title-active-color="white" title-inactive-color="#ccc" color="white" line-width="33%" line-height="1")
      van-tab(:title="$t('wallet_wallet_02')")
        .p-4
          Balance(v-if="!showDeposit" :buttonName="$t('wallet_wallet_04')"  @click="handelShowDeposit")
          Balance(v-else)
          DepositList(v-if="!showDeposit")
          DepositCreate(
						v-if="showDeposit" 
						ref="DepositCreateRef" 
						@clickPicker="handelShowDepositPicker" 
						@clickBack="handelCloseDeposit" 
						:exchangeRateERC='exchangeRateERC'
						:exchangeRateTRC='exchangeRateTRC'
						)
            
      van-tab(:title="$t('wallet_wallet_19')")
        .p-4
          .grid.grid-flow-col.grid-rows-2.p-2.border-2.rounded-md.border-primaryLight.btnBg
            .row-span-2.CENTER_R
              van-icon.text-primaryLight(size="2rem" name="paid")
            .col-span-2.font-bold.text-primary {{$t('wallet_wallet_03')}}
            .col-span-2.text-white.bodoni {{ commaFormat(walletBalance) }}
            .row-span-2.scale-75.CENTER_R
              van-button.font-bold.text-black.border.bg-primaryLight.border-primaryLight(v-if="!showWithdrawal" round @click="showWithdrawal = true")
                | {{$t('wallet_wallet_20')}}
          div(v-if="!showWithdrawal")
            div(class="justify-center FLEX_C my-4 bg-[#191919] rounded-lg")
              van-cell(icon="calendar-o" :value="date" @click="show = true" :is-link="isLink")
                template(#title)
                  div {{$t('wallet_wallet_05')}}
            .justify-center.my-4.text-center.FLEX_C
              el-table.blackTable(:data="tableData" :default-sort="{ prop: 'time', order: 'descending' }" min-width="200px" size="mini")
                el-table-column(header-align="center" align="center" prop="time" :label="$t('wallet_wallet_21')" sortable)
                el-table-column(header-align="center" align="center" prop="money" :label="$t('wallet_wallet_07')" sortable)
                el-table-column(header-align="center" align="center" prop="status" :label="$t('wallet_wallet_09')")
                  template(#default="scope")
                    .text-primary {{ scope.row.status }}
          div(v-if="showWithdrawal")
            van-form(@submit="onWithdrawalSubmit" validate-trigger="onSubmit")
              van-field(v-model="withdrawalchannel" readonly name="withdrawalPicker" :label="$t('wallet_wallet_22')" placeholder="请选择$t('wallet_wallet_22')" @click="showWithdrawalPicker = true")
                template(#button)
                  van-icon(name="arrow")
              van-field(v-if="showWithdrawalBankCard" v-model="withdrawalBankCard" readonly name="withdrawalPicker" :label="$t('wallet_wallet_24')" :placeholder="$t('wallet_wallet_25')" @click="showWithdrawalBankPicker = true")
                template(#button)
                  van-icon(name="arrow")
              div(class="grid p-8 m-4 mb-2 rounded-md border-dashed border-2 border-[#cda269]" v-if="showWithdrawalBankCardAdd")
                .flex.justify-center.h-12(@click="showWithdrawalBankCardAddPicker = true")
                  img.my-3.mr-2(:src="state.plus")
                  span(class="CENTER_C text-[#cda269]")
                    | {{$t('wallet_wallet_26')}}
              van-field(v-if="showWithdrawalUSDT" v-model="withdrawalUSDTwallet" readonly name="withdrawalUSDTwallet" :label="$t('wallet_wallet_27')" :placeholder="$t('wallet_wallet_28')")
                template(#button)
                  van-icon(name="arrow")
              van-field(v-if="showWithdrawalUSDT" v-model="withdrawalUSDTType" readonly name="withdrawalUSDTType" :label="$t('wallet_wallet_29')" :placeholder="$t('wallet_wallet_30')")
                template(#button)
                  van-icon(name="arrow")
              van-field(v-if="showWithdrawalUSDT" v-model="withdrawalUSDTAddress" readonly name="withdrawalUSDTAddress" :label="$t('wallet_wallet_31')" :placeholder="$t('wallet_wallet_32')")
                template(#button)
                  van-icon(name="arrow")
              van-field(
                v-model="withdrawalValue" 
                name="withdrawalValue" 
                :label="$t('wallet_wallet_33')" 
                :placeholder="$t('wallet_wallet_13',[100,1000])" 
                :rules="[{ required: true, message: $t('wallet_wallet_13',[100,1000]) }]")
              .container.FLEX_C(v-if="showWithdrawalUSDT")
                div(class="grid mt-6 rounded-md bg-[#191919]")
                  .flex.justify-between.h-16
                    span.ml-4.text-white.CENTER_C.bodoni 0.00 USDT
                    span(class="CENTER_C mr-4 text-[#8c8c8c]")
                      van-icon(name="warning-o")
                  div(class="flex justify-center rounded-b-md bg-[#303030]")
                    span.m-1.text-xs.text-gray-400.CENTER_C $t('wallet_wallet_14') 1 USDT = ¥ 6.58
                .grid.mt-2
                  .flex.justify-center
                    span.ml-4.text-xs.text-red.CENTER_C {{$t('wallet_wallet_34')}}
              van-button.mt-36(round plain block color="#C60000" @click="showDeposit = false")
                | {{$t('wallet_wallet_17')}}
              van-button.my-4.mb-4(round block type="info" native-type="submit")
                | {{$t('wallet_wallet_18')}}
      
      van-tab(:title="$t('wallet_wallet_19')")
        .p-4
          .grid.grid-flow-col.grid-rows-2.p-2.border-2.rounded-md.border-primaryLight.btnBg
            .row-span-2.CENTER_R
              van-icon.text-primaryLight(size="2rem" name="paid")
            .col-span-2.font-bold.text-primary {{$t('wallet_wallet_03')}}
            .col-span-2.text-white.bodoni {{ commaFormat(walletBalance) }}
            .row-span-2.scale-75.CENTER_R
              van-button.font-bold.text-black.border.bg-primaryLight.border-primaryLight(round @click="showAdj = true")
                | {{$t('wallet_wallet_36')}}
          div(class="justify-center FLEX_C my-4 bg-[#191919] rounded-lg")
            van-cell(icon="calendar-o" :value="date" @click="show = true" :is-link="isLink")
              template(#title)
                div {{$t('wallet_wallet_05')}}
          .justify-center.my-4.text-center.FLEX_C
            el-table.blackTable(:data="tableData" :default-sort="{ prop: 'time', order: 'descending' }" min-width="200px" size="mini")
              el-table-column(header-align="center" align="center" prop="name" :label="$t('wallet_wallet_06')")
              el-table-column(header-align="center" align="center" prop="money" :label="$t('wallet_wallet_07')" sortable)
              el-table-column(header-align="center" align="center" prop="time" :label="$t('wallet_wallet_08')" sortable)
              el-table-column(header-align="center" align="center" prop="status" :label="$t('wallet_wallet_09')")
                template(#default="scope")
                  .text-primary {{ scope.row.status }}
  DepositChannel(ref="DepositChannelRef" @click="setDepositchannel" @setExchangeRate='setExchangeRate' )     
  van-popup.bg_pop(v-model:show="showWithdrawalPicker" round position="bottom" :style="{ height: '60%' }")
    .pt-4.text-lg.pingfang.CENTER_C $t('wallet_wallet_22')
    van-cell(size="large" is-link @click="setWithdrawalchannel(1)")
      template(#title)
        p.text-white {{$t('wallet_wallet_44')}}
    van-cell(size="large" is-link @click="setWithdrawalchannel(2)")
      template(#title)
        p.text-gray-500 {{$t('wallet_wallet_42')}}
      template(#value)
        p.text-red {{$t('wallet_wallet_42')}}
    div(class="grid justify-center grid-flow-col p-4 mx-5 my-20 gap-x-0.5")
      div(class="text-xs text-[#CDA269]")
        | {{$t('wallet_wallet_46')}}
  van-popup.bg_pop(v-model:show="showWithdrawalBankPicker" round position="bottom" :style="{ height: '60%' }")
    .flex.flex-col.h-full
      .sticky.pt-4.text-lg.pingfang.CENTER_C $t('wallet_wallet_24')
      .flex.flex-col.flex-grow.overflow-y-auto.cell-bank
        van-config-provider
          van-cell(size="large" is-link @click="setWithdrawalBank('中国建设银行')")
            template(#title)
              p.text-white 中国建设银行
          van-cell(size="large" is-link @click="setWithdrawalBank('中国邮政储蓄银行')")
            template(#title)
              p.text-gray-500 中国邮政储蓄银行
            template(#value)
              p.text-red {{$t('wallet_wallet_42')}}
          van-cell(size="large" is-link @click="setWithdrawalBank('中国邮政储蓄银行')")
            template(#title)
              p.text-white 中国邮政储蓄银行
          van-cell(size="large" is-link @click="setWithdrawalBank('中国邮政储蓄银行')")
            template(#title)
              p.text-white 中国邮政储蓄银行
          van-cell(size="large" is-link @click="setWithdrawalBank('中国邮政储蓄银行')")
            template(#title)
              p.text-white 中国邮政储蓄银行
          van-cell(size="large" is-link @click="setWithdrawalBank('中国邮政储蓄银行')")
            template(#title)
              p.text-white 中国邮政储蓄银行
          van-cell(size="large" is-link @click="setWithdrawalBank('中国邮政储蓄银行')")
            template(#title)
              p.text-white 中国邮政储蓄银行
          van-cell(size="large" is-link @click="setWithdrawalBank('中国邮政储蓄银行')")
            template(#title)
              p.text-white 中国邮政储蓄银行
          van-cell(size="large" is-link @click="setWithdrawalBank('中国邮政储蓄银行')")
            template(#title)
              p.text-white 中国邮政储蓄银行
          van-cell(size="large" is-link @click="setWithdrawalBank('中国邮政储蓄银行')")
            template(#title)
              p.text-white 中国邮政储蓄银行
          van-cell(size="large" is-link @click="setWithdrawalBank('中国邮政储蓄银行')")
            template(#title)
              p.text-white 中国邮政储蓄银行
          van-cell(size="large" is-link @click="setWithdrawalBank('中国邮政储蓄银行')")
            template(#title)
              p.text-white 中国邮政储蓄银行
          van-cell(size="large" is-link @click="setWithdrawalBank('中国邮政储蓄银行')")
            template(#title)
              p.text-white 中国邮政储蓄银行
      .flex.flex-col.p-4
        van-button.my-4.mb-4(round plain block color="#CDA269" @click="onWithdrawalBankAdd")
          .flex.justify-start.h-12
            img.m-3(:src="state.plus")
            span.CENTER_C {{$t('wallet_wallet_26')}}
  van-popup.bg_pop(v-model:show="showWithdrawalBankCardAddPicker" round position="bottom" :style="{ height: '60%' }")
    .justify-center.mt-4.text-center.FLEX_C {{$t('wallet_wallet_26')}}
    van-form(@submit="onWithdrawalBankCardAdd" validate-trigger="onSubmit")
      van-field(v-model="withdrawalBankCardAdd" name="adjValue" :label="$t('wallet_wallet_47')" :about="$t('wallet_wallet_48')" :rules="[{ required: true, message: t('wallet_wallet_48') }]")
      van-button.mt-36(round block type="info" native-type="submit")
        | {{$t('wallet_wallet_26')}}
  van-popup.bg_pop(v-model:show="showAdj" round position="bottom" :style="{ height: '80%' }")
    .justify-center.mt-4.text-center.FLEX_C {{$t('wallet_wallet_36')}}
    .grid.grid-flow-col.grid-rows-2.p-2.m-4.border-2.rounded-md.border-primaryLight.btnBg
      .row-span-2.CENTER_R
        van-icon.text-primaryLight(size="2rem" name="paid")
      .col-span-2.font-bold.text-primary {{$t('wallet_wallet_03')}}
      .col-span-2.text-white.bodoni {{ commaFormat(walletBalance) }}
    van-form(@submit="onAdjSubmit" validate-trigger="onSubmit")
      van-field(v-model="adjAccount" name="adjAccount" :label="$t('wallet_wallet_53')" :placeholder="$t('wallet_wallet_49')")
        template(#button)
          div(class="text-[#967140]" @click="showAdjAccountPicker = true")
            | 搜索
      van-field(
        v-model="adjValue" 
        name="adjValue" 
        :label="$t('wallet_wallet_51')" 
        :placeholder="$t('wallet_wallet_13',[100,1000])" 
        :rules="[{ required: true, message: $t('wallet_wallet_13',[100,1000]) }]")
      van-button.mt-36(round block type="info" native-type="submit")
        | {{$t('wallet_wallet_52')}}
      van-button.my-4.mb-4(round plain block color="#C60000" @click="showDeposit = false")
        | {{$t('wallet_wallet_17')}}
  van-popup.bg_pop(v-model:show="showAdjAccountPicker" round position="bottom" :style="{ height: '60%' }")
    .sticky.pt-4.text-lg.pingfang.CENTER_C $t('wallet_wallet_53')
    .container.h-20
      van-cell(size="large" is-link @click="setAdjAccount('Muta')")
        template(#title)
          .flex.justify-start
            img(:src="state.people")
            p.ml-2.text-white Muta
      van-cell(size="large" is-link @click="setAdjAccount('Eddiechen')")
        template(#title)
          .flex.justify-start
            img(:src="state.people")
            p.ml-2.text-white Eddiechen
      van-cell(size="large" is-link @click="setAdjAccount('Kenzychou')")
        template(#title)
          .flex.justify-start
            img(:src="state.people")
            p.ml-2.text-white Kenzychou
      van-cell(size="large" is-link @click="setAdjAccount('Doublej')")
        template(#title)
          .flex.justify-start
            img(:src="state.people")
            p.ml-2.text-white Doublej
  van-popup(class="bg-[#0F0F0F] w-80 shadow-xl" v-model:show="showAdjConfirm" round)
    .grid.grid-cols-2
      .col-span-2.my-4.CENTER_C {{$t('wallet_wallet_55')}}
      .col-span-2.mx-6.my-2.text-xs.text-gray-400.CENTER_C {{$t('wallet_wallet_56')}}
      .m-3.CENTER_C
        van-button.px-12(round plain color="#CDA269" @click="showAdjConfirm = false")
          | {{$t('wallet_wallet_17')}}
      .m-3.CENTER_C
        van-button.px-12(round color="#cda269" @click="onAdjConfirmSucesss")
          | {{$t('wallet_wallet_57')}}
  van-popup(class="bg-[#0F0F0F] w-80 shadow-xl" v-model:show="showWithdrawalUSDTSuccess" round)
    .grid.grid-cols-2
      .col-span-2.my-4.CENTER_C {{$t('wallet_wallet_58')}}
      .col-span-2.mx-6.my-2.text-xs.text-gray-400.CENTER_C {{$t('wallet_wallet_59')}}
      .col-span-2.mx-6.my-2.text-xs.text-gray-400.CENTER_C {{$t('wallet_wallet_60')}}
      .col-span-2.m-3.CENTER_C
        van-button.px-12(round color="#cda269" @click="onWithdrawalUSDTSuccess")
          | {{$t('wallet_wallet_57')}}
</template>

<script setup lang="ts">
	import { ref, reactive, computed } from 'vue';
  import {commaFormat} from '@/utils'
	import { Toast } from 'vant';
	import { useRouter } from 'vue-router';
	import type { AGENCYAJAX_GetDepositResponseList } from '@/api/model';
	import Balance from './components/Balance.vue';
	import DepositList from './components/DepositList.vue';
	import DepositCreate from './components/DepositCreate.vue';
	import DepositChannel from './components/DepositChannel.vue';
	import { useI18n } from 'vue-i18n';
	import { UserStore } from '@/store/userStore';
	const { t } = useI18n();
	const userStore = UserStore();
  const walletBalance = ref(userStore.agencyInfo.walletBalance||0)

	const people = `${window.staticPath}/static/svg/people.svg`;
	const plus = `${window.staticPath}/static/svg/plus.svg`;
	const router = useRouter();
	const date = ref('');
	const show = ref(false);

	const showWithdrawal = ref(false);
	const showWithdrawalUSDT = ref(false);
	const showWithdrawalPicker = ref(false);
	const showWithdrawalBankPicker = ref(false);
	const showWithdrawalBankCard = ref(false);
	const showWithdrawalBankCardAdd = ref(false);
	const showWithdrawalBankCardAddPicker = ref(false);
	const showWithdrawalUSDTSuccess = ref(false);
	const showAdj = ref(false);
	const showAdjAccountPicker = ref(false);
	const showAdjConfirm = ref(false);
	const isLink = ref(true);
	const active = ref(0);
	const adjAccount = ref('');
	const adjValue = ref(0);

	const withdrawalValue = ref('');
	const withdrawalchannel = ref('');
	const withdrawalchannelValue = ref(1);
	const withdrawalBankCard = ref('');
	const withdrawalBankCardAdd = ref('');
	const withdrawalUSDTwallet = ref('');
	const withdrawalUSDTType = ref('USDT');
	const withdrawalUSDTAddress = ref('');

	const channelW = {
		1: t('wallet_wallet_44'),
		2: t('wallet_wallet_42'),
	};
	const tableData = [
		{
			name: 'Johnnywang',
			money: '999,999,999.00',
			time: '2019/02/19 24:59:59',
			status: '成功',
		},
		{
			name: 'Johnnywang',
			money: '999,999,999.00',
			time: '2019/01/19 24:59:59',
			status: '成功',
		},
		{
			name: 'hnnywang',
			money: '999,999,999.00',
			time: '2019/05/19 24:59:59',
			status: '成功',
		},
		{
			name: 'Jonnywang',
			money: '99,999,999.00',
			time: '2019/07/19 24:59:59',
			status: '成功',
		},
		{
			name: 'Johnnywang',
			money: '999,999,999.00',
			time: '2019/02/19 24:59:59',
			status: '成功',
		},
		{
			name: 'ohnnywang',
			money: '99,999,999.00',
			time: '2019/08/19 24:59:59',
			status: '成功',
		},
	];
	const state = reactive({
		people: people,
		plus: plus,
	});
	// const formatDate = (date) => `${date.getFullYear() + 1}/${date.getMonth() + 1}/${date.getDate()}`;
	// const onConfirm = (values) => {
	// 	const [start, end] = values;
	// 	show.value = false;
	// 	date.value = `${formatDate(start)} - ${formatDate(end)}`;
	// 	isLink.value = false;
	// };

	//  ============== Deposit ==============
	const showDeposit = ref(false);
	// DepositChannel
	interface DepositChannelRefData {
		showDepositPicker: boolean;
		exchangeRateERC: number;
		exchangeRateTRC: number;
	}
	const DepositChannelRef = ref<DepositChannelRefData | null>(null);
	const exchangeRateERC = computed(() => DepositChannelRef.value?.exchangeRateERC);
	const exchangeRateTRC =  computed(() => DepositChannelRef.value?.exchangeRateTRC);
	
	const setExchangeRate = (ERC:number,TRC:number) => {
		console.log({exchangeRateERC,exchangeRateTRC})
	}
	const setShowDepositPicker = (val: boolean) => {
		if (DepositChannelRef.value) DepositChannelRef.value.showDepositPicker = val;
	};
	const handelShowDeposit = () => {
		showDeposit.value = true;
	};
	const handelCloseDeposit = () => {
		showDeposit.value = false;
	};
	const handelShowDepositPicker = () => {
		setShowDepositPicker(true);
	};
	// DepositCreate
	interface DepositChannelRefData {
		createDepositId: number;
		depositChannelDisplay: string;
	}
	const DepositCreateRef = ref<DepositChannelRefData | null>(null);
	const setDepositchannel = (row: AGENCYAJAX_GetDepositResponseList) => {
		if (DepositCreateRef.value){
       DepositCreateRef.value.createDepositId =  row.id || 0;
       DepositCreateRef.value.depositChannelDisplay = row.name || '';
    }
		setShowDepositPicker(false);
	};
	// ============== Withdrawal ==============
	const setWithdrawalchannel = (value) => {
		withdrawalchannelValue.value = value;
		withdrawalchannel.value = channelW[value];
		showWithdrawalPicker.value = false;
		switch (value) {
			case 1:
				showWithdrawalBankCard.value = true;
				showWithdrawalUSDT.value = false;
				break;
			case 2:
				showWithdrawalBankCard.value = false;
				showWithdrawalUSDT.value = true;
				break;
		}
	};
	const setWithdrawalBank = (value) => {
		withdrawalBankCard.value = value;
		showWithdrawalBankPicker.value = false;
		// switch (value) {
		//   case 1:
		//     showWithdrawalBankCard.value = true;
		//     showWithdrawalUSDT.value = false;
		//     break;
		//   case 2:
		//     showWithdrawalBankCard.value = false;
		//     showWithdrawalUSDT.value = true;
		//     break;
		// }
	};

	const setAdjAccount = (value) => {
		adjAccount.value = value;
		showAdjAccountPicker.value = false;
	};
	const onWithdrawalBankAdd = (value) => {
		showWithdrawalBankCard.value = false;
		showWithdrawalBankPicker.value = false;
		showWithdrawalBankCardAdd.value = true;
	};
	const onWithdrawalBankCardAdd = async (value) => {
		showWithdrawalBankCard.value = false;
		withdrawalBankCardAdd.value = value;
		showWithdrawalBankCardAddPicker.value = false;
		showWithdrawalBankCardAdd.value = false;
	};
	const onWithdrawalUSDTSuccess = async (values) => {
		// console.log("submit", values);
		try {
			showWithdrawalUSDTSuccess.value = false;
			router.push({
				path: '/withdrawalUSDT/id',
				query: { id: 666 },
			});
			console.log('onDepositSubmit', values);
		} finally {
			// Turn loading off
			// loginLoading.value = false;
		}
	};
	const onWithdrawalSubmit = async (values) => {
		// console.log("submit", values);
		try {
			console.log(values);
			switch (withdrawalchannelValue.value) {
				case 1:
					showWithdrawalBankCard.value = true;
					break;
				case 2:
					showWithdrawalUSDT.value = true;
					break;
			}
			if (withdrawalchannelValue.value == 1 && withdrawalBankCard.value) {
				router.push({
					path: '/withdrawalWebBank/id',
					query: { id: 666 },
				});
			}
			if (withdrawalchannelValue.value == 2 && withdrawalUSDTType.value) {
				showWithdrawalUSDTSuccess.value = true;
				// router.push({
				//   path: "/withdrawalUSDT/id",
				//   query: { id: 666 },
				// });
			}
			console.log('onDepositSubmit', values);
		} finally {
			// Turn loading off
			// loginLoading.value = false;
		}
	};

	const onAdjSubmit = async (values) => {
		// console.log("submit", values);
		try {
			console.log(values);
			showAdjConfirm.value = true;
			console.log('onDepositSubmit', values);
		} finally {
			// Turn loading off
			// loginLoading.value = false;
		}
	};
	const onAdjConfirmSucesss = async (values) => {
		// console.log("submit", values);
		try {
			Toast('款项已送出');
			showAdjConfirm.value = false;
			showAdj.value = false;
			console.log('onDepositSubmit', values);
		} finally {
			// Turn loading off
			// loginLoading.value = false;
		}
	};
</script>
