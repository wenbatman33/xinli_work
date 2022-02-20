<template lang="pug">
.contentContainer
	.pageTitle.FLEX_R
		.icon.mr-4
			.bg-xBlue.rounded-full.w-8.h-8.CENTER
				SvgIcon.w-5.h-5.text-white(:name='"#Bet_Rcord"')
		.title
			h5 {{t('personal_bethistory')}}
	.selector.my-4
		//- a-date-picker(v-model:value="startDate" format='YYYY-MM-DD' placeholder="开始日期")
		//- a-time-picker(v-model:value="startTimePicker" valueFormat="HH:mm:ss" placeholder="开始时间")
		//- span.mx-4 -
		//- a-date-picker(v-model:value="endDate" format='YYYY-MM-DD' placeholder="结束日期")
		//- a-time-picker(v-model:value="endTimePicker" valueFormat="HH:mm:ss" placeholder="结束时间")
		a-range-picker(
			style="width: 400px"
			v-model:value="datePick"
			@change="dateChange"
			:show-time="{hideDisabledOptions: true, defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')] }"
			format="YYYY-MM-DD HH:mm:ss")
		a-button.mx-4(type='primary' @click='init') {{t('personal_bethistory_query')}}
	
	.summary.my-8
		.grid.grid-cols-3.gap-4
			.col-span-1
				.BETWEEN
					span.text-xs.text-gray-500 {{t('personal_bethistory_allCount')}}
					span.text-sm.text-xBlue {{allCount.toLocaleString()}}
			.col-span-1
				.BETWEEN
					span.text-xs.text-gray-500 {{t('personal_bethistory_totalBetAmount')}}
					span.text-sm.text-xBlue ¥ {{totalBetAmount.toLocaleString(undefined,{'minimumFractionDigits':2,'maximumFractionDigits':2})}}
			.col-span-1
				.BETWEEN
					span.text-xs.text-gray-500 {{t('personal_bethistory_totalWinAmount')}}
					span.text-sm-semibold(:class='{"text-SystemSuccess": totalWinAmount>=0 , "text-xRed": totalWinAmount<0 }') ¥ {{totalWinAmount.toLocaleString(undefined,{'minimumFractionDigits':2,'maximumFractionDigits':2})}}

	.betData
		a-table(id='betDataList' :columns="columns" :dataSource='dataList' :rowKey="(record:any) => record.id"  :size='"middle"' )
			template(#stake='{text ,record}')
				p {{ Number(text).toLocaleString(undefined,{'minimumFractionDigits':2,'maximumFractionDigits':2}) }}
			
			template(#winAmount='{text ,record}')
				p(:class='{"text-SystemSuccess": text>=0 , "text-xRed": text<0 }') {{ Number(text).toLocaleString(undefined,{'minimumFractionDigits':2,'maximumFractionDigits':2}) }}
</template>

<script setup lang="ts">
	import { onMounted, ref, computed } from 'vue';
	import SvgIcon from '@/components/SvgIcon/index.vue';
	import moment, { Moment } from 'moment';
	import dayjs from 'dayjs';

	import { getGameLogList } from '@/api';
	import type { GAMEAJAX_GetGameLogResponseData } from '@/api/model';
	import { UserStore } from '@/store/userStore';
	import { useI18n } from 'vue-i18n';
	const { t } = useI18n();

	const userStore = UserStore();
	const datePick = ref<Moment[]>([]);
	const dateChange = (val: any) => {
		startDate.value = dayjs(val[0] || '').format('YYYY-MM-DD HH:mm:ss');
		endDate.value = dayjs(val[1] || '').format('YYYY-MM-DD HH:mm:ss');
	};
	const startDate = ref('');
	const endDate = ref('');

	const startTimePicker = ref<Moment>(moment('00:00:00', 'HH:mm:ss'));
	const endTimePicker = ref<Moment>(moment('23:59:59', 'HH:mm:ss'));

	const startTime = computed(() => {
		const date = moment(startDate.value).format('YYYY-MM-DD');
		const time = moment(startTimePicker.value).format('HH:mm:ss');
		return `${date} ${time}`;
	});
	const endTime = computed(() => {
		const date = moment(endDate.value).format('YYYY-MM-DD');
		const time = moment(endTimePicker.value).format('HH:mm:ss');
		return `${date} ${time}`;
	});

	const columns = [
		{
			title: t('personal_bethistory_product'),
			dataIndex: 'gameGroup',
		},
		{
			title: t('personal_bethistory_quantity'),
			dataIndex: 'count',
			align: 'right',
			sorter: true,
		},
		{
			title: t('personal_bethistory_betAmount'),
			dataIndex: 'stake',
			align: 'right',
			sorter: true,
			slots: { customRender: 'stake' },
		},
		{
			title: t('personal_bethistory_winAmount'),
			dataIndex: 'winAmount',
			align: 'right',
			sorter: true,
			slots: { customRender: 'winAmount' },
		},
	];

	const dataList = ref([] as GAMEAJAX_GetGameLogResponseData[]);

	const allCount = ref(0);
	const totalBetAmount = ref(0);
	const totalWinAmount = ref(0);

	const init = async () => {
		const payload = {
			page: 1,
			pageSize: 20,
			memberID: userStore?.userInfo?.id,
			startTime: startTime.value,
			endTime: endTime.value,
		};
		const res = await getGameLogList(payload);
		dataList.value = res?.data?.data?.list || [];
		allCount.value = res?.data?.data?.count || 0;
		totalBetAmount.value = res?.data?.data?.totalBetAmount || 0;
		totalWinAmount.value = res?.data?.data?.totalWinAmount || 0;
	};

	onMounted(() => {
		init();
	});
</script>

<style scoped lang="scss">
	::v-deep(#betDataList .ant-table-thead th) {
		background-color: #fff !important;
		font-weight: 600;
	}
</style>
