<template lang="pug">
.w-full.CENTER_C
	.w-full.BETWEEN.my-8
		.FLEX_C
			p.text-xs 中心钱包
			p.text-sm.font-bold ¥ {{ userStore.money }}
		.FLEX_C
			p.text-xs 所有游戏钱包
			p.text-sm.font-bold ¥ {{userStore.money}}
		.CENTER
			a-button(danger @click='gameRecycle') {{t('nav_gameRecycle')}}

	.w-full.my-2
		a-tabs.w-full.withdrawTab(type='card' v-model:activeKey='activeTabId' @change='changeTabID')
			a-tab-pane(:key='1' :tab='"银行卡提款"')
				.w-full.border.p-4
					.grid.grid-cols-2.gap-4
						.col-span-1
							p
								span.text-sm.font-bold.mr-4 提款金额
								span.text-xs.text-gray-500 单笔限额 ¥ 10-200,000

							.bg-slate-100.text-center.p-1.FLEX_R.border-b-2.my-4
								span.border-r-2.px-2 ￥
								.flex-grow.px-2
									input.w-full.bg-transparent.border-none.outline-none(type='number' v-model='withdrawForm.amount')

						.col-span-1
							p
								span.text-sm.font-bold.mr-4 选择银行卡
							.bg-slate-100.p-1.FLEX_R.border-b-2.my-4
								span.border-r-2.px-2 ￥
								.flex-grow.px-2
									a-select.transparentSelect.w-full.bg-transparent.border-none.outline-none(v-model:value="withdrawForm.id" :size='"small"' @change='changeBankCardID')
										a-select-option(:value='0') --
										a-select-option(value='') 添加銀行卡
										a-select-option(v-for='item in bankcardsList' :value='item.id') {{item.bankAccount}}
										//- option(:value='1') ERC
										//- option(:value='2') TRC

					.w-full.my-8.text-xs
						p.text-gray-500 温馨提示
						p.text-gray-500  我们提供极速快捷的提款服务，您的款项一般会在 10 分钟内到账，如果超过 30 分钟还未到账，请联系我们的 7*24 小时在线客服，为您核查！
					
					

			a-tab-pane(:key='2' :tab='"虚拟货币提款"')
				.w-full.border.p-4
					.my-4
						span.text-xs.text-gray-500 ※请确认虚拟钱包协定是否一致，协定错误将导致提款失败
					
					.w-full
						.grid.grid-cols-2.gap-4
							.col-span-1
								p
									span.text-sm.font-bold.mr-4 钱包类型

								.bg-slate-100.p-1.FLEX_R.border-b-2.my-4
									span.border-r-2.px-2 ￥
									.flex-grow.px-2
										a-select.transparentSelect.w-full.bg-transparent.border-none.outline-none(v-model:value="withdrawForm.type" @change='changeType'  :size='"small"')
											a-select-option(:value='0') --
											a-select-option(:value='2') ERC
											a-select-option(:value='3') TRC
							.col-span-1
								p
									span.text-sm.font-bold.mr-4 货币类型

								.bg-slate-100.text-center.p-1.FLEX_R.border-b-2.my-4
									span.border-r-2.px-2 ￥
									.flex-grow.px-2
										select.w-full.bg-transparent.border-none.outline-none
											option(:value='1') USDT

							.col-span-2
								p
									span.text-sm.font-bold.mr-4 提领地址

								.bg-slate-100.p-1.FLEX_R.border-b-2.my-4
									span.border-r-2.px-2 ￥
									.flex-grow.px-2
										a-select.transparentSelect.w-full.bg-transparent.border-none.outline-none(v-model:value="withdrawForm.id"  :size='"small"' @change='changeUSDT_ID')
											a-select-option(:value='0') --
											a-select-option(value='') 添加提领地址
											a-select-option(v-for='item in typeList' :value='item.id') {{item.address}}

							.col-span-1
								p
									span.text-sm.font-bold.mr-4 提款金额
									span.text-xs.text-gray-500 单笔限额 ¥ 10-200,000

								.bg-slate-100.text-center.p-1.FLEX_R.border-b-2.my-4
									span.border-r-2.px-2 ￥
									.flex-grow.px-2
										input.w-full.bg-transparent.border-none.outline-none(type='number' v-model='withdrawForm.amount')

							.col-span-1.text-right
							
								div
									span 参考汇率
									span(v-if='withdrawForm.type===2') 1 USDT ＝ ¥{{exchangeRateERC}}
									span(v-if='withdrawForm.type===3') 1 USDT ＝ ¥{{exchangeRateTRC}}
								div
									span(v-if='withdrawForm.type===2') ≈ {{ commaFormatDecimal((withdrawForm?.amount||0) /exchangeRateERC)}}
									span(v-if='withdrawForm.type===3') ≈ {{ commaFormatDecimal((withdrawForm?.amount||0) /exchangeRateTRC)}}
									span.text-base.font-semibold.mx-2 USDT
		a-button.w-full.my-4(type='primary' :disabled='disabledButton' @click='onSubmit') 提款
						
</template>

<script setup lang="ts">
	import { ref, reactive, computed, onMounted } from 'vue';
	import { UserStore } from '@/store/userStore';
	import { SystemStore } from '@/store/systemStore';
	import { postGameRecycle, getMemberBankcards, getPaymentWithdrawal, postPaymentWithdrawal, getMemberUSDTs } from '@/api';
	import type { MEMBERAJAX_GetMemberBankCardResponseData, MEMBERAJAX_GetMemberUSDTResponseData } from '@/api/model';
	import { useI18n } from 'vue-i18n';
	import { commaFormatDecimal } from '@/utils';
	import { notification } from 'ant-design-vue';

	const { t } = useI18n();

	const userStore = UserStore();
	const systemStore = SystemStore();
	const activeTabId = ref(1);
	// 參考匯率
	const exchangeRateERC = ref(0);
	const exchangeRateTRC = ref(0);

	const bankcardsList = ref([] as MEMBERAJAX_GetMemberBankCardResponseData[]);
	const USDTsList = ref([] as MEMBERAJAX_GetMemberUSDTResponseData[]);
	const typeList = ref([] as MEMBERAJAX_GetMemberUSDTResponseData[]);

	const ERCList = computed(() => USDTsList.value.filter((item) => item.type === 1));
	const TRCList = computed(() => USDTsList.value.filter((item) => item.type === 2));

	const withdrawForm = reactive({
		// 提領方式 1:銀行卡 2:USDT-ERC 3:USDT-TRC
		type: 1,
		// 提領地址id or 提領銀行卡 id
		id: 0,
		/* 存款金額 */
		amount: 0,
	});
	const disabledButton = computed(() => withdrawForm.type === 0 || withdrawForm.amount === 0 || withdrawForm.id === 0);

	const changeBankCardID = (num: number | undefined) => {
		if (!num) {
			addBankcard();
		}
	};
	const addBankcard = () => {
		// 添加銀行卡判斷是否實名制認證;
		if (userStore.userInfo.name === '') {
			systemStore.editUserNameVisabled = true;
			systemStore.walletToggle(false);
		} else {
			systemStore.AddBankCardVisabled = true;
			systemStore.walletToggle(false);
		}
	};

	const changeUSDT_ID = (num: number | undefined) => {
		// 添加 USDT
		if (!num) {
			systemStore.Add_USDT_Visabled = true;
			systemStore.walletToggle(false);
		}
	};
	const changeType = (num: number) => {
		typeList.value = [];
		withdrawForm.type = num;
		if (num === 2) typeList.value = ERCList.value || [];
		if (num === 3) typeList.value = TRCList.value || [];
	};
	const changeTabID = (num: number) => {
		if (num === 1) withdrawForm.type = 1;
		if (num === 2) withdrawForm.type = 0;
	};
	const onSubmit = () => {
		postPaymentWithdrawal(withdrawForm).then((res) => {
			if (res.data.statusCode === 0) notification.success({ message: '轉帳成功' });
			if (res.data.statusCode !== 0) notification.error({ message: res.data.msg || '' });
		});
	};
	const gameRecycle = async () => {
		const result = await postGameRecycle();
		result && userStore.checkUserInfo();
	};
	const init = () => {
		getPaymentWithdrawal().then((res) => {
			if (res.data.msgCode === 5022) {
				// 請先驗證手機號
				systemStore.editUserPhoneVisabled = true;
			}
			if (res.data.statusCode === 0) {
				exchangeRateERC.value = res?.data?.data?.exchangeRateERC || 0;
				exchangeRateTRC.value = res?.data?.data?.exchangeRateTRC || 0;
			}
		});
		getMemberBankcards().then((res) => {
			bankcardsList.value = res?.data?.data?.list || [];
		});
		getMemberUSDTs().then((res) => {
			USDTsList.value = res?.data?.data?.list || [];
		});
	};
	onMounted(() => {
		init();
	});
</script>

<style lang="scss" scoped>
	::v-deep(.withdrawTab .ant-tabs-bar) {
		margin-bottom: 0;
	}
	::v-deep(.transparentSelect .ant-select-selector) {
		background-color: transparent !important;
		border: none !important;
	}
</style>
