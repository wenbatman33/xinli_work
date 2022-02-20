<template lang="pug">
.container.pb-4.FLEX_C
	van-tabs(v-model:active='active' animated='' background='transparent' title-active-color='white' title-inactive-color='#ccc' color='white' line-width='50%' line-height='1')
		van-tab(:title="$t('subProxyPage_03')")
			.p-4
				.rounded-lg(:class='"bg-[#191919]"')
					van-field(left-icon='search' v-model='sms' clearable='' :placeholder="$t('subProxyPage_04')")
				.justify-center.mt-4.text-center.FLEX_C
					el-table.blackTable(:data='tableData' min-width='200px' size='mini' @row-click='toDetail')
						el-table-column(header-align='center' align='center' prop='name' :label="$t('subProxyPage_05')")
						el-table-column(header-align='center' align='center' prop='win' :label="$t('subProxyPage_06')")
						el-table-column(header-align='center' align='center' prop='time' :label="$t('subProxyPage_07')")
		van-tab(:title="$t('subProxyPage_08')")
			.p-4
				el-table.blackTable(:data='tableDataSub' :default-sort="{ prop: 'time', order: 'descending' }" min-width='200px' size='mini')
					el-table-column(header-align='center' align='center' prop='time' :label="$t('subProxyPage_09')" sortable='')
					el-table-column(header-align='center' align='center' prop='name' :label="$t('subProxyPage_10')")
					el-table-column(header-align='center' align='center' prop='result' :label="$t('subProxyPage_11')")
	van-popup.bg_pop(v-model:show='state.showAdd' round='' position='bottom' :style="{ height: '90%' }")
		.pt-4.text-lg.font-medium.CENTER_C {{ $t('subProxyPage_12') }}
		.container.p-6.mt-8.FLEX_C.subForm
			van-form(validate-trigger='onSubmit')
				van-field(v-model='value' :label="$t('subProxyPage_13')" :placeholder="$t('subProxyPage_14')" :rules="[{ required: true, message: $t('subProxyPage_15') }]")
					.mt-16.font-medium.text-sm.leading-6(:class='"text-[#868686]"')
						span {{ $t('subProxyPage_16') }}
						br
						span {{ $t('subProxyPage_17') }}
					van-button.mt-48.mb-6(round='' block='' type='info' native-type='submit')  {{ $t('subProxyPage_18') }} 
					van-button(round='' plain='' block='' color='#C60000')  {{ $t('subProxyPage_19') }} 

</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import { ref, reactive } from 'vue';
	import { useI18n } from 'vue-i18n';

	const peopleAdd = `${window.staticPath}/static/svg/peopleAdd.svg `;
	const { t } = useI18n();
	const sms = ref('');
	const value = ref('');
	const active = ref(0);
	const router = useRouter();
	const state = reactive({
		peopleAdd: peopleAdd,
		showAdd: false,
	});
	const toDetail = (row, event, column) => {
		console.log(row, event, column);
		router.push({ path: '/subProxyDetail', query: { id: '1' } });
	};
	const tableData = ref([
		{
			name: 'Johnnywang',
			win: '999,999,999.00',
			time: '2019/02/19 24:59:59',
		},
		{
			name: 'Johnnywang',
			win: '999,999,999.00',
			time: '2019/02/19 24:59:59',
		},
		{
			name: 'Johnnywang',
			win: '999,999,999.00',
			time: '2019/02/19 24:59:59',
		},
		{
			name: 'Johnnywang',
			win: '999,999,999.00',
			time: '2019/02/19 24:59:59',
		},
		{
			name: 'Johnnywang',
			win: '999,999,999.00',
			time: '2019/02/19 24:59:59',
		},
		{
			name: 'Johnnywang',
			win: '999,999,999.00',
			time: '2019/02/19 24:59:59',
		},
	]);
	const tableDataSub = ref([
		{
			time: '2019/02/19 24:59:59',
			name: 'Johnnywang',
			result: t('subProxyPage_20'),
		},
		{
			time: '2019/02/18 24:59:59',
			name: 'Johnnywang',
			result: t('subProxyPage_21'),
		},
		{
			time: '2019/02/03 24:59:59',
			name: 'Johnnywang',
			result: t('subProxyPage_21'),
		},
		{
			time: '2019/02/21 24:59:59',
			name: 'Johnnywang',
			result: t('subProxyPage_21'),
		},
		{
			time: '2019/02/03 24:59:59',
			name: 'Johnnywang',
			result: t('subProxyPage_21'),
		},
		{
			time: '2019/02/07 24:59:59',
			name: 'Johnnywang',
			result: t('subProxyPage_22'),
		},
		{
			time: '2019/02/09 24:59:59',
			name: 'Johnnywang',
			result: t('subProxyPage_21'),
		},
		{
			time: '2019/02/01 24:59:59',
			name: 'Johnnywang',
			result: t('subProxyPage_2'),
		},
	]);
</script>
