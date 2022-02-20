<template>
	<div class="container pb-4 FLEX_C">
		<div class="justify-center FLEX_C">
			<van-cell size="large" :title="$t('member_ProductDetail_02')" :value="state.volume" />
			<van-cell :title="$t('member_ProductDetail_03')" size="large">
				<template #value>
					<span :class="state.income < 0 ? 'text-red' : 'text-white'">{{ state.income }}</span>
				</template>
			</van-cell>

			<van-cell icon="calendar-o" :value="date" @click="show = true" :is-link="isLink">
				<template #title>
					<div>{{ $t('member_ProductDetail_04') }}</div>
				</template>
			</van-cell>

			<van-calendar v-model:show="show" type="range" @confirm="handeCalendarConfirm" color="#cda269" :min-date="minDate" :max-date="maxDate" :default-date="[periodStart, periodEnd]" />
		</div>
		<div class="justify-center mt-4 text-center FLEX_C">
			<el-table class="blackTable" :data="tableDataRef" :default-sort="{ prop: 'thisMonth', order: 'descending' }" min-width="200px" size="mini">
				<el-table-column header-align="center" align="center" prop="bettingTime" :label="$t('member_ProductDetail_05')" />
				<el-table-column header-align="center" align="center" prop="name" :label="$t('member_ProductDetail_06')" sortable />
				<el-table-column header-align="center" align="center" prop="volume" :label="$t('member_ProductDetail_07')" sortable />
				<el-table-column header-align="center" align="center" prop="income" :label="$t('member_ProductDetail_08')" sortable>
					<template #default="scope">
						<div :class="scope.row.income < 0 ? 'text-red' : 'text-white'">
							{{ scope.row.income }}
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRoute } from 'vue-router';
	import { ref, reactive, onMounted } from 'vue';
	import { getMemberProduct } from '@/api';
	import dayjs from 'dayjs';

	const route = useRoute();
	// calendar ref
	const date = ref('');
	const show = ref(false);
	const isLink = ref(true);
	const minDate = new Date(dayjs().year(), dayjs().month() - 1, 1, 0, 0, 0);
	const maxDate = new Date(dayjs().year(), dayjs().month(), dayjs().date(), 23, 59, 59);
	const periodStart = ref(new Date(dayjs().year(), dayjs().month(), 1, 0, 0, 0));
	const periodEnd = ref(new Date(dayjs().year(), dayjs().month(), dayjs().date(), 23, 59, 59));
	// view ref
	const tableDataRef = ref([]);
	const state = reactive({
		volume: 0,
		income: 0,
		// memberID: memberID,
	});
	// get MemberId
	const memberID = Number(route.query?.memberID);
	// get gameGroupID
	const gameGroupID = Number(route.query?.gameGroupID);
	// methods
	const formatDate = (date) => `${dayjs(date).year()}/${dayjs(date).month() + 1}/${dayjs(date).date()}`;
	const handeCalendarConfirm = (values) => {
		const [start, end] = values;
		show.value = false;
		date.value = `${formatDate(start)} - ${formatDate(end)}`;
		isLink.value = false;
		getMemberProduct({
			memberID: memberID,
			gameGroupID: gameGroupID,
			periodStart: start,
			periodEnd: end,
		}).then((response) => {
			Object.assign(tableDataRef.value, response.data.data.gameList);
		});
	};

	onMounted(() => {
		getMemberProduct({ memberID: memberID, gameGroupID: gameGroupID }).then((response) => {
			Object.assign(state, response.data.data);
			Object.assign(tableDataRef.value, response.data.data.gameList);
		});
	});
</script>
