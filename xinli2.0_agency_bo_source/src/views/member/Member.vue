<template lang="pug">
div(class="container pb-4 FLEX_C")
	div(class="justify-center m-2 text-center FLEX_C")
		h6.text-primary {{$t('member_Member_02')}}：{{counts}}
	div(class="justify-center mx-4 rounded-lg FLEX_C bg-xGray19")
		van-field.text-primaryLight(
			v-model="memberName" 
			:class='"bg-[#191919]"' 
			left-icon="search" 
			clearable
			:placeholder="$t('member_Member_03')" 
			@change="handelSearchMemberName"
			)
	div(class="justify-center m-4 rounded-lg FLEX_C bg-xGray19")
		van-cell.text-primaryLight.bg-xGray19(icon="calendar-o" :value="date" @click="show = true" is-link)
			template(#title)
				div {{$t('member_Member_04')}}
	van-calendar(
		v-model:show="show" 
		type="range" 
		@confirm="handeCalendarConfirm" 
		color="#cda269"
		:min-date="minDate"
  	:max-date="maxDate"
		:default-date="[periodStart,periodEnd]"
		)
	div(class="justify-center mt-4 text-center FLEX_C")
		el-table.blackTable(:data="tableDataRef" :default-sort="{ prop: 'deposit', order: 'descending' }" min-width="200px" @row-click="toDetail" size="mini")
			el-table-column(header-align="center" align="center" prop="name" :label="$t('member_Member_05')")
			el-table-column(header-align="center" align="center" prop="deposit" :label="$t('member_Member_06')" sortable)
			el-table-column(header-align="center" align="center" prop="withdrawal" :label="$t('member_Member_07')" sortable)
			el-table-column(header-align="center" align="center" prop="income" :label="$t('member_Member_08')" sortable)
			el-table-column( header-align="center" align="center" width="40px")
				template(#default="scope") {{ scope.row.win }}
					van-icon(name="arrow")

</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import { ref, onMounted } from 'vue';
	import dayjs from 'dayjs'

	// api
	import type { AGENCYAJAX_GetMembersResponseList } from '@/api/model';
	import { getMemberList } from '@/api';
	// props
	// const props = defineProps<{
	// 	type: string;
	// }>();
	// ref
	const memberName = ref('');
	const minDate = new Date(dayjs().year(), dayjs().month()-1, 1, 0, 0, 0);
	const maxDate = new Date(dayjs().year(), dayjs().month(),  dayjs().date(), 23, 59, 59);
	const periodStart = ref(new Date(dayjs().year(), dayjs().month(), 1, 0, 0, 0));
	const periodEnd = ref(new Date(dayjs().year(), dayjs().month(), dayjs().date(), 23, 59, 59));
	const date = ref('');
	const show = ref(false);
	const isLink = ref(true);
	const router = useRouter();
	const tableDataRef = ref<Array<AGENCYAJAX_GetMembersResponseList>>([]);
	const counts = ref(0);

	// methods
	const formatDate = (date) => `${dayjs(date).year()}/${dayjs(date).month() + 1}/${ dayjs(date).date()}`;
	
	const toDetail = (row, event, column) => {
		router.push({ path: '/memberDetail/id', query: { id: row.id } });
	};

	const handeCalendarConfirm = (values) => {
		const [start, end] = values;
		periodStart.value = start;
		periodEnd.value = end;
		show.value = false;
		isLink.value = false;
		getData();
	};
	const handelSearchMemberName = () => {
		getData();
	};

	const getData = () => {
		date.value = `${formatDate(periodStart.value)} - ${formatDate(periodEnd.value)}`;
		getMemberList({
			memberName: memberName.value,
			// periodStart: dayjs(periodStart.value).format('YYYY-MM-DD 00:00:00'),
			// periodEnd: dayjs(periodEnd.value).format('YYYY-MM-DD 23:59:59'),
			periodStart: '2021-12-01 00:00:00',
			periodEnd: '2021-12-31 00:00:00',
			// type: props.type
		}).then((res) => {
			// 后端给的swagger 格式怪怪的...
			if (res.data.statusCode === 0) {
				tableDataRef.value = res.data.data?.list || [];
				counts.value = res.data.data?.counts || 0;
			}
		});
	};
	onMounted(() => {
		getData();
	});
</script>
