<template lang="pug">
div
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
</template>
<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	// import type { AGENCYAJAX_GetDepositResponseList } from '@/api/model';
	// import { getAgencyDeposit } from '@/api/';
	const date = ref('');
	const show = ref(false);
  const isLink = ref(true);
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
	onMounted(() => {

	});
</script>