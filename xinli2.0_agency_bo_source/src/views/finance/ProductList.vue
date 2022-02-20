<template>
	<div class="container pb-4 FLEX_C">
		<div class="justify-center mt-4 text-center FLEX_C">
			<el-table class="blackTable" :data="tableDataRef" :default-sort="{ prop: 'thisMonth', order: 'descending' }" min-width="200px" size="mini" @row-click="toDetail">
				<el-table-column header-align="center" align="center" prop="name" :label="$t('finance_ProductList_02')" />
				<el-table-column header-align="center" align="center" prop="lastMonthIncome" :label="$t('finance_ProductList_03')" sortable />
				<el-table-column header-align="center" align="center" prop="thisMonthIncome" :label="$t('finance_ProductList_04')" sortable>
					<template #default="scope">
						<div :class="scope.row.thisMonth < 0 ? 'text-red' : 'text-white'">
							{{ scope.row.thisMonthIncome }}
							<van-icon name="arrow" />
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import { ref, onMounted } from 'vue';
	import type { AGENCYAJAX_AgencyFinanceProductsResponseList } from '@/api/model';
	import { getProductsFinance } from '@/api';

	const router = useRouter();
	const tableDataRef = ref<Array<AGENCYAJAX_AgencyFinanceProductsResponseList>>([]);
	const toDetail = (row, event, column) => {
		router.push({
			name: 'FinanceProductDetail',
			params: { id: row.id },
		});
	};
	onMounted(() => {
		getProductsFinance({}).then((response) => {
			tableDataRef.value = response.data.data?.list || [];
		});
	});
</script>
