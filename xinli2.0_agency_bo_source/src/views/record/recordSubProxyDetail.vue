<template>
	<div class="container pb-4 FLEX_C">
		<div class="flex justify-center">
			<div class="text-primary">{{ $t('record_recordSubProxyDetail_02', [year, month]) }}</div>
		</div>
		<div class="grid grid-flow-col gap-4 p-2">
			<div class="col-span-2 p-2 rounded-md cursor-pointer btnBg">
				<div class="flex justify-center">
					<div class="text-primary">◆ {{ $t('record_recordSubProxyDetail_03') }} ◆</div>
				</div>
				<div class="flex justify-center">
					<div class="text-white bodoni">{{ state.childAgencyCount }}</div>
				</div>
			</div>
			<div class="col-span-2 p-2 rounded-md cursor-pointer btnBg">
				<div class="flex justify-center">
					<div class="text-primary">◆ {{ $t('record_recordSubProxyDetail_04') }} ◆</div>
				</div>
				<div class="flex justify-center">
					<div class="text-white bodoni">
						{{ state.childAgencyExtraBonusAmount }}
					</div>
				</div>
			</div>
		</div>
		<div class="px-2">
			<van-cell :title="$t('record_recordSubProxyDetail_05')" :value="state.childAgencyCommissionAmount" size="large" />
			<van-cell :title="$t('record_recordSubProxyDetail_06')" :value="state.childAgencyExtraBonusAmount" size="large" />
			<van-cell :title="$t('record_recordSubProxyDetail_07')" :value="state.childAgencyCommissionTotalAmount" size="large" />
		</div>
		<div class="px-2">
			<van-tabs v-model:active="activePopTab" animated background="black" title-active-color="white" title-inactive-color="#ccc" color="white" line-width="50%" line-height="1">
				<van-tab :title="$t('record_recordSubProxyDetail_05')">
					<div class="bg-[#191919] rounded-md p-2 pb-4">
						<div class="flex flex-row items-center justify-start p-3">
							<span class="mr-3 text-primary bodoni"> {{ $t('record_recordSubProxyDetail_08') }}I </span>
							<span class="text-primary">{{ $t('record_recordSubProxyDetail_09') }}40%</span>
						</div>
						<el-table class="blackTable" :data="tableDataRef1" min-width="200px" size="mini">
							<el-table-column header-align="center" align="center" prop="account" :label="$t('record_recordSubProxyDetail_10')" />
							<el-table-column header-align="center" align="center" prop="commission" :label="$t('record_recordSubProxyDetail_05')" />
						</el-table>
					</div>
					<div class="bg-[#191919] rounded-md p-2 pb-4 mt-6">
						<div class="flex flex-row items-center justify-start p-3">
							<span class="mr-3 text-primary bodoni"> {{ $t('record_recordSubProxyDetail_08') }}II </span>
							<span class="text-primary">{{ $t('record_recordSubProxyDetail_09') }}30%</span>
						</div>
						<el-table class="blackTable" :data="tableDataRef2" min-width="200px" size="mini">
							<el-table-column header-align="center" align="center" prop="account" :label="$t('record_recordSubProxyDetail_10')" />
							<el-table-column header-align="center" align="center" prop="commission" :label="$t('record_recordSubProxyDetail_05')" />
						</el-table>
					</div>
					<div class="bg-[#191919] rounded-md p-2 pb-4 mt-6">
						<div class="flex flex-row items-center justify-start p-3">
							<span class="mr-3 text-primary bodoni"> {{ $t('record_recordSubProxyDetail_08') }}III </span>
							<span class="text-primary">{{ $t('record_recordSubProxyDetail_11') }}</span>
						</div>
						<el-table class="blackTable" :data="tableDataRef3" min-width="200px" size="mini">
							<el-table-column header-align="center" align="center" prop="account" :label="$t('record_recordSubProxyDetail_10')" />
							<el-table-column header-align="center" align="center" prop="commission" :label="$t('record_recordSubProxyDetail_05')" />
						</el-table>
					</div>
				</van-tab>
				<van-tab :title="$t('record_recordSubProxyDetail_06')">
					<div class="bg-[#191919] p-2 pb-4 rounded-md">
						<el-table class="blackTable" :data="tableExtrabonusDataRef" min-width="200px" size="mini">
							<el-table-column header-align="center" align="center" prop="account" :label="$t('record_recordSubProxyDetail_10')" />
							<el-table-column header-align="center" align="center" prop="condition" :label="$t('record_recordSubProxyDetail_12')" />
							<el-table-column header-align="center" align="center" prop="date" :label="$t('record_recordSubProxyDetail_13')" />
							<el-table-column header-align="center" align="center" prop="extraBonus" :label="$t('record_recordSubProxyDetail_14')" />
						</el-table>
					</div>
				</van-tab>
			</van-tabs>
		</div>
	</div>
</template>

<script setup lang="ts">
	import dayjs from 'dayjs';
	import type {AGENCYAJAX_ChildAgencyCommissionListData} from '@/api/model'
	import { getChildCommissionreport, getChildAgencyBonusList, getChildagencycommissionlist } from '@/api';
	import { ref, onMounted, reactive } from 'vue';
	// const show = ref(false);
	// const active = ref(0);
	const activePopTab = ref(0);
	// const activeNames = ref(['1']);
	const tableExtrabonusDataRef = ref([]);
	const tableDataRef1 = ref<Array<AGENCYAJAX_ChildAgencyCommissionListData>>([]);
	const tableDataRef2 = ref<Array<AGENCYAJAX_ChildAgencyCommissionListData>>([]);
	const tableDataRef3 = ref<Array<AGENCYAJAX_ChildAgencyCommissionListData>>([]);
	const state = reactive({
		date: '',
		childAgencyCount: 0,
		activeChildAgencyCount: 0,
		childAgencyCommissionAmount: 0,
		childAgencyExtraBonusAmount: 0,
		childAgencyCommissionTotalAmount: 0,
	});
	const year = ref('');
	const month = ref('');
	onMounted(() => {
		getChildCommissionreport().then((res) => {
			console.log(res.data.data);
			year.value = dayjs(res.data.data?.date).format('YYYY');
			month.value = dayjs(res.data.data?.date).format('M');
			Object.assign(state, res.data.data);
		});
		getChildAgencyBonusList().then((res) => {
			Object.assign(tableExtrabonusDataRef.value, res.data.data?.list);
		});
		getChildagencycommissionlist().then((res) => {
			let list = res.data.data?.list || []
			tableDataRef1.value = list.filter((item) => {
				return item.agencyLevel == 1;
			});
			tableDataRef2.value = list.filter((item) => {
				return item.agencyLevel == 2;
			});
			tableDataRef3.value = list.filter((item) => {
				return item.agencyLevel == 3;
			});
		});
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
