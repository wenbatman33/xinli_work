<template lang="pug">
.contentContainer
	.pageTitle.FLEX_R
		.icon.mr-4
			.bg-xBlue.rounded-full.w-8.h-8.CENTER
				SvgIcon.w-5.h-5.text-white(:name='"#Setting"')
		.title
			h5 {{t('personal_personal_titile')}}
	
	.pageContent.my-4
		.myWallet.rounded.BG_GRADIENT_1.p-4.relative(:class='"h-[110px]"')
			.grid.grid-cols-11.gap-4.h-full
				.col-span-1
					.WH_FULL.CENTER
						.bg-white.bg-opacity-20.rounded-full.w-12.h-12.CENTER
							SvgIcon.w-8.h-8.text-white(:name='"#Wallet"')
				.col-span-5.border-r.border-white
					.WH_FULL.FLEX_C_CENTER.truncate
						p.text-white {{t('personal_personal_wallet')}}
						.text-2xl.text-white  ¥ {{ userStore.money }}
				.col-span-5
					.WH_FULL.FLEX_C_CENTER.truncate
						p.text-white {{t('personal_lock_wallet')}}
						.text-2xl.text-white  ¥ {{userStore.lockMoney}}


	.Body_4.text-gray-500.my-4.mt-8 {{t('personal_betting_history')}}
	.grid.grid-cols-4.gap-4.my-4
		.col-span-1.rounded-xl.border.border-gray-200.text-center.overflow-hidden(v-for="item in data_1")
			.p-4
				.BETWEEN.my-4
					.text-sm.font-semibold {{t('personal_add_value')}}
					.text-sm.font-semibold(:class='{"text-xGreenLight": item.statusCode===1 }') {{item.status}}
				.BETWEEN.text-gray-500.my-4
					.text-sm.font-semibold {{t('personal_amount')}}
					.text-sm {{item.amount}}
				.BETWEEN.text-gray-500.my-4
					.text-sm.font-semibold {{t('personal_deposit')}}
					.text-sm {{item.deposit}}
				.BETWEEN.text-gray-500.my-4
					.text-sm.font-semibold {{t('personal_explain')}}
					.text-sm {{item.desc}}
			.p-4.bg-gray-50.text-left.text-gray-500
				.text-xs {{item.payway}}
				.text-xs {{item.date}}
				.text-xs {{item.payID}}

	.Body_4.text-gray-500.my-4.mt-8 {{t('personal_transaction_history')}}
	RecordDeposit(:data="DepositRef" @reload='init')
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import SvgIcon from '@/components/SvgIcon/index.vue';
	import { UserStore } from '@/store/userStore';
	import { useI18n } from 'vue-i18n';
	import { paymentRecordDeposit } from '@/api';
	import type { PAYMENTAJAX_DepositListResponseData } from '@/api/model';

	import RecordDeposit from '@/components/Personal/Transaction/RecordDeposit.vue';

	const { t } = useI18n();
	const userStore = UserStore();

	const DepositRef = ref([] as PAYMENTAJAX_DepositListResponseData[]);

	const data_1 = ref([
		{
			status: '等待中',
			statusCode: 3,
			amount: '¥ 200,000',
			deposit: 'OPUS娱乐城',
			desc: '狀態的說明',
			payway: '渠道名稱',
			date: '2018年10月07日 20:30:15',
			payID: '11382750385628',
		},
		{
			status: '成功',
			statusCode: 1,
			amount: '¥ 220,000',
			deposit: '中心钱包',
			desc: '',
			payway: '渠道名稱',
			date: '2019年10月07日 20:30:15',
			payID: '213234080385628',
		},
		{
			status: '成功',
			statusCode: 1,
			amount: '¥ 220,000',
			deposit: '中心钱包',
			desc: '',
			payway: '渠道名稱',
			date: '2019年10月07日 20:30:15',
			payID: '213234080385628',
		},
		{
			status: '成功',
			statusCode: 1,
			amount: '¥ 220,000',
			deposit: '中心钱包',
			desc: '',
			payway: '渠道名稱',
			date: '2019年10月07日 20:30:15',
			payID: '213234080385628',
		},
	]);
	const init = () => {
		paymentRecordDeposit().then((res) => {
			DepositRef.value = res?.data?.data?.list?.filter((item, index) => index < 4) || [];
		});
	};

	onMounted(() => {
		init();
	});
</script>

<style scoped lang="scss"></style>
