<template>
	<div class="container pb-4 FLEX_C">
		<div class="p-4 m-5 cursor-pointer rounded-xl border-primaryLight CENTER_C darkGradient btnBg">
			<div class="text-primary">◆ {{ $t('finance_Bonus_02') }} ◆</div>
			<div class="text-white bodoni">{{ totalBonus }}</div>
		</div>

		<div class="justify-center mt-4 text-center FLEX_C">
			<el-table class="blackTable" :data="tableDataRef" :default-sort="{ prop: 'thisMonth', order: 'descending' }" min-width="200px" size="mini">
				<el-table-column header-align="center" align="center" prop="memberAccount" :label="$t('finance_Bonus_03')" />
				<el-table-column header-align="center" align="center" prop="bonus" :label="$t('finance_Bonus_04')" sortable />
			</el-table>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { AGENCYAJAX_AgencyFinanceGetBonusResponseList } from '@/api/model';
	import { getFinanceBonus } from '@/api';
	import { ref, onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import router from '@/router';
	import dayjs from 'dayjs';
	import { SystemStore } from '@/store/systemStore';
	import { useI18n } from 'vue-i18n';
	const { t } = useI18n();
	const systemStore = SystemStore();
	const route = useRoute();

	const tableDataRef = ref<Array<AGENCYAJAX_AgencyFinanceGetBonusResponseList>>([]);
	const totalBonus = ref(0)

	onMounted(() => {
		const periodStart = route.query?.month?.toString();
		if (periodStart === '') {
			router.push('/finance');
		}
		const month = dayjs(periodStart).endOf('month');
		systemStore.navTitle = `${systemStore.navTitle} ${month.month() + 1}${t('finance_Bonus_01')}`;
		getFinanceBonus({
			periodStart: `${month.year()}-${month.month() + 1}-1`,
			periodEnd: `${month.year()}-${month.month() + 1}-${month.date()}`,
		}).then((res) => {
			totalBonus.value = res.data.data?.totalBonus || 0;
			tableDataRef.value = res.data.data?.list || [];
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
