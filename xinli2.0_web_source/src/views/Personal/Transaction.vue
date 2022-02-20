<template lang="pug">
.contentContainer
	.pageTitle.FLEX_R
		.icon.mr-4
			.bg-xBlue.rounded-full.w-8.h-8.CENTER
				SvgIcon.w-5.h-5.text-white(:name='"#Credit_Card"')
		.title
			h5 {{t('personal_transaction_title')}}
	.my-4
		a-range-picker(
			style="width: 400px"
			v-model:value="datePick"
			@change="dateChange"
			:show-time="{hideDisabledOptions: true, defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')] }"
			format="YYYY-MM-DD HH:mm:ss")
		
		a-select.mx-4(
			ref="select"
			v-model:value="selectType"
			style="width: 200px"
			:placeholder='t("personal_transaction_select_type")')
				a-select-option(value="") {{t('personal_transaction_select_type')}}
				a-select-option(value="Deposit") 充值
				a-select-option(value="Withdrawal") 提款
				a-select-option(value="Bonus") 紅利
				
		a-button.mx-4(type='primary' @click='init') {{t('personal_bethistory_query')}}

	.DepositData(v-if='currentType==="" || currentType==="Deposit"')
		.Body_4.text-gray-500.my-4.mt-8 {{t('personal_transaction_recent_recharge_records')}}
		.text-right
			a-pagination(v-if='total>0' v-model:current="payload.page" :total="total"  @change="onChange")
		RecordDeposit(:data="DepositRef" @reload='init')
		.text-right
			a-pagination(v-if='total>0' v-model:current="payload.page" :total="total"  @change="onChange")

	.WithdrawalData(v-if='currentType==="" || currentType==="Withdrawal"')
		.Body_4.text-gray-500.my-4.mt-8 {{t('personal_Withdrawal_history')}}
		.text-right
			a-pagination(v-if='total>0' v-model:current="payload.page" :total="total"  @change="onChange")
		RecordWithdrawal(:data="WithdrawalRef")
		.text-right
			a-pagination(v-if='total>0' v-model:current="payload.page" :total="total"  @change="onChange")

	.BonusData(v-if='currentType==="" || currentType==="Bonus"')
		.Body_4.text-gray-500.my-4.mt-8 {{t('personal_transaction_recent_bonus_history')}}
		.text-right
			a-pagination(v-if='total>0' v-model:current="payload.page" :total="total"  @change="onChange")
		RecordBonus(:data="BonusRef")
		.text-right
			a-pagination(v-if='total>0' v-model:current="payload.page" :total="total"  @change="onChange")

</template>

<script setup lang="ts">
	import { onMounted, ref, reactive } from 'vue';
	import { useI18n } from 'vue-i18n';
	import moment, { Moment } from 'moment';
	import dayjs from 'dayjs';
	import { paymentRecordDeposit, paymentRecordWithdrawal, paymentRecordBonus } from '@/api';
	import type {
		PAYMENTAJAX_DepositListRequest,
		PAYMENTAJAX_DepositListResponseData,
		PAYMENTAJAX_WithdrawalListRequest,
		PAYMENTAJAX_WithdrawalListResponseData,
		PAYMENTAJAX_BonusListRequest,
		PAYMENTAJAX_BonusListResponseData,
	} from '@/api/model';

	import RecordDeposit from '@/components/Personal/Transaction/RecordDeposit.vue';
	import RecordWithdrawal from '@/components/Personal/Transaction/RecordWithdrawal.vue';
	import RecordBonus from '@/components/Personal/Transaction/RecordBonus.vue';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	const { t } = useI18n();
	const datePick = ref<Moment[]>([]);
	const currentType = ref('');
	const selectType = ref('');

	const typeChange = () => {
		payload.page = 1;
		total.value = 0;
	};
	const dateChange = (val: any) => {
		payload.startTime = dayjs(val[0] || '').format('YYYY-MM-DD HH:mm:ss');
		payload.endTime = dayjs(val[1] || '').format('YYYY-MM-DD HH:mm:ss');
	};
	const DepositRef = ref([] as PAYMENTAJAX_DepositListResponseData[]);
	const WithdrawalRef = ref([] as PAYMENTAJAX_WithdrawalListResponseData[]);
	const BonusRef = ref([] as PAYMENTAJAX_BonusListResponseData[]);

	const total = ref(0);
	const payload = reactive({
		startTime: '',
		endTime: '',
		page: 1,
		pageSize: 16,
	});
	const onChange = (e: any) => {
		payload.page = e;
		init();
	};
	const init = () => {
		if (currentType.value !== selectType.value) typeChange();
		// ////////////////////////
		currentType.value = selectType.value;
		setTimeout(() => {
			if (currentType.value === '') {
				getRecordDeposit();
				getRecorWithdrawal();
				getRecorBonus();
			} else if (currentType.value === 'Deposit') {
				// DepositRef.value.init(payload);
				getRecordDeposit(payload);
			} else if (currentType.value === 'Withdrawal') {
				getRecorWithdrawal(payload);
			} else if (currentType.value === 'Bonus') {
				getRecorBonus(payload);
			}
		}, 500);
		// ////////////////////////
	};

	const getRecordDeposit = (params?: PAYMENTAJAX_DepositListRequest) => {
		DepositRef.value = [];
		if (params) {
			paymentRecordDeposit(params).then((res) => {
				DepositRef.value = res?.data?.data?.list || [];
				total.value = res?.data?.data?.count || 0;
			});
		} else {
			paymentRecordDeposit().then((res) => {
				DepositRef.value = res?.data?.data?.list?.filter((item, index) => index < 4) || [];
			});
		}
	};

	const getRecorWithdrawal = (params?: PAYMENTAJAX_WithdrawalListRequest) => {
		WithdrawalRef.value = [];
		if (params) {
			paymentRecordWithdrawal(params).then((res) => {
				WithdrawalRef.value = res?.data?.data?.list || [];
				total.value = res?.data?.data?.count || 0;
			});
		} else {
			paymentRecordWithdrawal().then((res) => {
				WithdrawalRef.value = res?.data?.data?.list?.filter((item, index) => index < 4) || [];
			});
		}
	};
	const getRecorBonus = (params?: PAYMENTAJAX_BonusListRequest) => {
		BonusRef.value = [];
		if (params) {
			paymentRecordBonus(params).then((res) => {
				BonusRef.value = res?.data?.data?.list || [];
				total.value = res?.data?.data?.count || 0;
			});
		} else {
			paymentRecordBonus().then((res) => {
				BonusRef.value = res?.data?.data?.list?.filter((item, index) => index < 4) || [];
			});
		}
	};
	onMounted(() => {
		init();
	});
</script>

<style scoped lang="scss"></style>
