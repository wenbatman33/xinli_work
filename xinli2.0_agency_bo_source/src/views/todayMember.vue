<template lang="pug">
.container
	van-tabs(v-model:active='active' animated='' background='transparent' title-active-color='white' title-inactive-color='#ccc' color='white' line-width='50%' line-height='1')
		van-tab(:title="$t('todayMember_02')")
			.p-4
				el-table.blackTable(:data='tableData' :default-sort="{ prop: 'deposit', order: 'descending' }" min-width='200px' size='mini')
					el-table-column(header-align='center' align='center' prop='name' :label="$t('todayMember_03')")
					el-table-column(header-align='center' align='center' prop='deposit' :label="$t('todayMember_04')" sortable='')
					el-table-column(header-align='center' align='center' prop='payment' :label="$t('todayMember_05')" sortable='')
					el-table-column(header-align='center' align='center' prop='win' :label="$t('todayMember_06')" sortable='')
		van-tab(:title="$t('todayMember_07')")
			.p-4
				el-table.blackTable(:data='tableData2' :default-sort="{ prop: 'deposit', order: 'descending' }" min-width='200px' size='mini')
					el-table-column(header-align='center' align='center' prop='name' :label="$t('todayMember_03')")
					el-table-column(header-align='center' align='center' prop='deposit' :label="$t('todayMember_04')" sortable='')
					el-table-column(header-align='center' align='center' prop='payment' :label="$t('todayMember_05')" sortable='')
					el-table-column(header-align='center' align='center' prop='win' :label="$t('todayMember_06')" sortable='')

	</template>

<script setup lang="ts">
	import { ref } from 'vue';

	const active = ref(0);

	const tableData = ref([
		{
			name: 'Johnnywang',
			deposit: '999,000.32',
			payment: '999,000.32',
			win: '9,000.32',
		},
		{
			name: 'Johnnywang',
			deposit: '998,000.32',
			payment: '998,000.32',
			win: '8,000.32',
		},
		{
			name: 'Johnnywang',
			deposit: '999,004.32',
			payment: '999,002.32',
			win: '7,000.32',
		},
		{
			name: 'Johnnywang',
			deposit: '999,005.32',
			payment: '999,005.32',
			win: '9,005.32',
		},
	]);
	const tableData2 = ref([
		{
			name: 'Piewang',
			deposit: '999,000.32',
			payment: '999,000.32',
			win: '9,000.32',
		},
		{
			name: 'Piewang',
			deposit: '998,000.32',
			payment: '998,000.32',
			win: '8,000.32',
		},
		{
			name: 'Piewang',
			deposit: '999,004.32',
			payment: '999,002.32',
			win: '7,000.32',
		},
		{
			name: 'Piewang',
			deposit: '999,005.32',
			payment: '999,005.32',
			win: '9,005.32',
		},
	]);
</script>
