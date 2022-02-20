<template lang="pug">
.container.pb-4.FLEX_C
	van-tabs(v-model:active='active' animated='' background='transparent' title-active-color='white' title-inactive-color='#ccc' color='white' line-width='50%' line-height='1')
		van-tab(:title="$t('newRegistrationList_02')")
			.p-4
				el-table.blackTable(:data='tableData'  :default-sort="{ prop: 'deposit', order: 'descending' }"  min-width='200px' size='mini')
					el-table-column(header-align='center' align='center' prop='name' :label="$t('newRegistrationList_03')")
					el-table-column(header-align='center' align='center' prop='time' :label="$t('newRegistrationList_04')" sortable='')
						template(#default='scope')
							p {{ scope.row.time }}
					el-table-column(header-align='center' align='center' prop='status' :label="$t('newRegistrationList_05')" sortable='')
						template(#default='scope')
							p {{ scope.row.status }}
		van-tab(:title="$t('newRegistrationList_06')")
			.p-4
				el-table.blackTable(:data='tableData2' min-width='200px' size='mini')
					el-table-column(header-align='center' align='center' prop='name' :label="$t('newRegistrationList_03')")
					el-table-column(header-align='center' align='center' prop='time' :label="$t('newRegistrationList_04')" sortable='')
						template(#default='scope')
							p {{ scope.row.time }}
					el-table-column(header-align='center' align='center' prop='status' :label="$t('newRegistrationList_05')" sortable='')
						template(#default='scope')
							p {{ scope.row.status }}
	</template>

<script setup lang="ts">
	import { ref } from 'vue';

	const active = ref(0);

	const tableData = ref([
		{
			name: 'Johnnywang',
			status: '✓',
			time: '2019/02/19 24:59:59',
		},
		{
			name: 'Johnnywang',
			status: '-',
			time: '2019/02/19 24:59:59',
		},
		{
			name: 'Piewang',
			status: '✓',
			time: '2019/02/19 24:59:59',
		},
		{
			name: 'Johnnywang',
			status: '-',
			time: '2019/02/19 24:59:59',
		},
		{
			name: 'Johnnywang',
			status: '-',
			time: '2019/02/19 24:59:59',
		},
		{
			name: 'Johnnywang',
			status: '✓',
			time: '2019/02/19 24:59:59',
		},
	]);
	const tableData2 = ref([
		{
			name: 'Piewang',
			status: '✓',
			time: '2019/02/19 24:59:59',
		},
		{
			name: 'Piewang',
			status: '-',
			time: '2019/02/19 24:59:59',
		},
		{
			name: 'Piewang',
			status: '✓',
			time: '2019/02/19 24:59:59',
		},
		{
			name: 'Piewang',
			status: '-',
			time: '2019/02/19 24:59:59',
		},
		{
			name: 'Piewang',
			status: '-',
			time: '2019/02/19 24:59:59',
		},
		{
			name: 'Bigwang',
			status: '✓',
			time: '2019/02/19 24:59:59',
		},
	]);
</script>
