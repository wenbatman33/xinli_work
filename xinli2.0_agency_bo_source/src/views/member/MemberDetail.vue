<template>
	<div class="container pb-4 FLEX_C">
		<div class="justify-center mt-2 text-center FLEX_C">
			<div class="text-primary">{{ $t('member_MemberDetail_01') }} : {{ registrationTime }}</div>
		</div>
		<div class="justify-center FLEX_C">
			<van-cell size="large" :title="$t('member_MemberDetail_02')" :value="deposit" />
			<van-cell :title="$t('member_MemberDetail_03')" size="large">
				<template #value>
					<span :class="income < 0 ? 'text-red' : 'text-white'">{{ income }}</span>
				</template>
			</van-cell>
			<van-cell size="large" :title="$t('member_MemberDetail_04')" :value="volume" />
			<van-cell size="large" :title="$t('member_MemberDetail_05')" :value="bonus" />
			<van-cell icon="calendar-o" :value="date" @click="show = true" :is-link="isLink">
				<template #title>
					<div>{{ $t('member_MemberDetail_06') }}</div>
				</template>
			</van-cell>

			<van-calendar v-model:show="show" type="range" @confirm="handeCalendarConfirm" color="#cda269" :min-date="minDate" :max-date="maxDate" :default-date="[periodStart, periodEnd]" />
		</div>
		<div class="justify-center mt-4 text-center FLEX_C">
			<el-table class="blackTable" :data="tableDataRef" :default-sort="{ prop: 'volume', order: 'descending' }" min-width="200px" @row-click="toDetail" size="mini">
				<el-table-column header-align="center" align="center" prop="name" :label="$t('member_MemberDetail_07')" />
				<el-table-column header-align="center" align="center" prop="volume" :label="$t('member_MemberDetail_08')" sortable />
				<el-table-column header-align="center" align="center" prop="income" :label="$t('member_MemberDetail_09')" sortable />
				<el-table-column header-align="center" align="center" width="40px">
					<template #default="scope">
						{{ scope.row.thisMonth }}
						<van-icon name="arrow" />
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRoute, useRouter } from 'vue-router';
	import { ref, onMounted } from 'vue';
	import type { AGENCYAJAX_GetMemberFinanceResponseList } from '@/api/model';
	import { getMember } from '@/api';
	import { SystemStore } from '@/store/systemStore';
	import dayjs from 'dayjs';
	import { useI18n } from 'vue-i18n';
	const { t } = useI18n();

	const systemStore = SystemStore();
	const route = useRoute();
	const router = useRouter();
	// calendar ref
	const date = ref('');
	const minDate = new Date(dayjs().year(), dayjs().month() - 1, 1, 0, 0, 0);
	const maxDate = new Date(dayjs().year(), dayjs().month(), dayjs().date(), 23, 59, 59);
	const periodStart = ref(new Date(dayjs().year(), dayjs().month(), 1, 0, 0, 0));
	const periodEnd = ref(new Date(dayjs().year(), dayjs().month(), dayjs().date(), 23, 59, 59));
	const show = ref(false);
	const isLink = ref(true);
	// view ref
	const registrationTime = ref('');
	const bonus = ref(0);
	const deposit = ref(0);
	const income = ref(0);
	const volume = ref(0);
	const tableDataRef = ref([] as AGENCYAJAX_GetMemberFinanceResponseList[]);
	// get MemberId
	const memberId = Number(route.query?.id);
	// methods
	const formatDate = (date) => `${dayjs(date).year()}/${dayjs(date).month() + 1}/${dayjs(date).date()}`;
	const handeCalendarConfirm = (values) => {
		const [start, end] = values;
		periodStart.value = start;
		periodEnd.value = end;
		show.value = false;
		isLink.value = false;
		getData();
	};

	const toDetail = (row, event, column) => {
		console.log(row, event, column);
		router.push({
			path: '/productDetail',
			query: { gameGroupID: row.id, memberID: memberId },
		});
	};

	const getData = () => {
		date.value = `${formatDate(periodStart.value)} - ${formatDate(periodEnd.value)}`;
		// api 格式有問題
		getMember({
			id: memberId,
			// periodStart: dayjs(periodStart.value).format('YYYY-MM-DD 00:00:00'),
			// periodEnd: dayjs(periodEnd.value).format('YYYY-MM-DD 23:59:59'),
			periodStart: '2021-12-01 00:00:00',
			periodEnd: '2021-12-31 00:00:00',
		}).then((res) => {
			if (res.data.statusCode === 0) {
				bonus.value = res.data.data?.bonus || 0;
				deposit.value = res.data.data?.deposit || 0;
				income.value = res.data.data?.income || 0;
				volume.value = res.data.data?.volume || 0;
				let createdAt = dayjs(res.data.data?.createdAt) || '';
				registrationTime.value = t('member_MemberDetail_00',[createdAt.year(),createdAt.month(),createdAt.date()]);
				tableDataRef.value = res.data.data?.productList || [];
				systemStore.navTitle = res.data.data?.memberAccount || '';
			}
		});
	};

	onMounted(() => {
		getData();
	});
</script>
