<template>
	<div class="container pb-4 FLEX_C">
		<div class="justify-center mt-4 text-center FLEX_C">
			<el-table class="blackTable" :data="tableDataRef" :default-sort="{ prop: 'platform', order: 'descending' }" min-width="200px" size="mini">
				<el-table-column header-align="center" align="center" prop="name" :label="$t('finance_Platform_03')" />
				<el-table-column header-align="center" align="center" prop="income" :label="$t('finance_Platform_03')" sortable />
				<el-table-column header-align="center" align="center" prop="platformFee" :label="$t('finance_Platform_04')" sortable />
			</el-table>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { AGENCYAJAX_AgencyFinanceGetPlatformResponseList} from '@/api/model';
	import { getFinancePlatform } from '@/api';
	import { ref, onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import router from '@/router';
	import dayjs from 'dayjs';
	import { SystemStore } from '@/store/systemStore';
	import { useI18n } from 'vue-i18n';
	const { t } = useI18n();
	const systemStore = SystemStore();
	const route = useRoute();

	
	const tableDataRef = ref([] as AGENCYAJAX_AgencyFinanceGetPlatformResponseList[]);

	onMounted(() => {
		const periodStart = route.query?.month?.toString();
		if (periodStart === '') {
			router.push('/finance');
		}
		const month = dayjs(periodStart).endOf('month');
		systemStore.navTitle = `${month.month() + 1}${t('finance_Platform_01')}`;
		getFinancePlatform({
			periodStart: `${month.year()}-${month.month() + 1}-1`,
			periodEnd: `${month.year()}-${month.month() + 1}-${month.date()}`,
		}).then((res) => {
			tableDataRef.value = res.data.data?.gameGroupList || [];
		});
	});
</script>
