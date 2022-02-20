<template>
	<div class="container pb-4 FLEX_C">
		<!-- <div class="flex justify-center ...">
      <div class="head">2018年4月</div>
    </div> -->
		<div class="px-2">
			<van-tabs
				v-model:active="active"
				animated
				background="transparent"
				title-active-color="white"
				title-inactive-color="#ccc"
				color="white"
				line-width="50%"
				line-height="1"
				@click-tab="onClickTab"
				class="p-4"
			>
				<van-tab :title="$t('finance_Activemember_03')">
					<el-table class="blackTable" :data="tableDataRef1" :default-sort="{ prop: 'platform', order: 'descending' }" min-width="200px" size="mini">
						<el-table-column header-align="center" align="center" prop="name" :label="$t('finance_Activemember_04')" />
						<el-table-column header-align="center" align="center" prop="income" :label="$t('finance_Activemember_05')" sortable />
						<el-table-column header-align="center" align="center" prop="platformFee" :label="$t('finance_Activemember_06')" sortable />
					</el-table>
				</van-tab>
				<van-tab :title="$t('finance_Activemember_07')">
					<el-table class="blackTable" :data="tableDataRef2" :default-sort="{ prop: 'platform', order: 'descending' }" min-width="200px" size="mini">
						<el-table-column header-align="center" align="center" prop="name" :label="$t('finance_Activemember_04')" />
						<el-table-column header-align="center" align="center" prop="income" :label="$t('finance_Activemember_05')" sortable />
						<el-table-column header-align="center" align="center" prop="platformFee" :label="$t('finance_Activemember_06')" sortable />
					</el-table>
				</van-tab>
			</van-tabs>
		</div>
	</div>
</template>

<script setup lang="ts">

	import type { AGENCYAJAX_AgencyFinanceGetActivememberResponseList } from '@/api/model';
	import { getFinanceActivemember } from '@/api';
	import { ref, onMounted } from 'vue';
	const tableDataRef1 = ref<Array<AGENCYAJAX_AgencyFinanceGetActivememberResponseList>>([])
	const tableDataRef2 = ref<Array<AGENCYAJAX_AgencyFinanceGetActivememberResponseList>>([])
	const active = ref(0);
	const onClickTab = ({ title }) => {
	};
	const getData = (periodOption:number) => {
		getFinanceActivemember({ periodOption }).then((res) => {
			if (res.data.statusCode === 0) {
				if(periodOption===1)tableDataRef1.value= res.data.data?.list || []
				if(periodOption===2)tableDataRef2.value= res.data.data?.list || []
			}
		});
	};
	onMounted(() => {
		getData(1);
		getData(2);
	});
</script>
