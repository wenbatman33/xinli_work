<template lang="pug">
.w-full.mt-4
	.expensesList.w-full(v-if='state?.expensesList?.length>0')
		.text-right.mb-10.pr-4(style='margin-top:-70px')
			a-select(style='width: 80px', v-model:value='state.activeDate', @change='(state.page = 1), init()')
				a-select-option(v-for='(item, index) in state.optionsDate', :key='index', :value='item.val')  {{ item.label }}

		.grid.grid-cols-3.gap-4(v-if='state.expensesList')
			.col-span-1.bg-white.shadow.rounded-lg(v-for='(item, index) in state.expensesList', :key='index') 
				.p-4.BETWEEN
					.text-xs
						.text-gray-500 消费时间
						.text-gray-500  {{ parseTime(item.addtime)  }}
					.status.text-xs.text-right
						div.mb-2
							.rounded-full.border.border-psV3Orange.text-psV3Orange.px-2 支出
							
				.px-4.py-2
					.rounded.border.border-psV3Yellow.p-2.mr-2
						span.text-black {{item.giftname}} 
						span.mx-2
							img.w-5(src='/publicAssets/img/v3/coin.png')
						span.text-psV3Yellow {{commaFormat(item.totalcoin)}}
						span.float-right.text-gray-500 x {{item.giftcount}}
				.p-4
					.rounded.bg-gray-100.p-2.mr-2
						span.text-gray-500 蕉币金额
						span.float-right.text-psV3Yellow {{item.totalcoin}}

		.pagination.my-4
			a-pagination(v-model:current='state.page', :page-size.sync='state.pagesize', :total='state.total', :hideonsinglepage='true', @change='selectCurrent')

	a-skeleton(v-if='state.loading', active, :paragraph='{ rows: 8}')

	.w-full.min-h-screen.CENTER.flex-col(v-if='state?.expensesList?.length<=0')
		img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
		.text-lg.text-gray-500.my-2 还未有收支记录

</template>
<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, reactive, toRaw } from 'vue';
import { expensesList } from '@/api';
import { commaFormat } from '@/utils';

export default {
	setup() {
		const store = useStore();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			page: 1,
			pagesize: 20,
			total: null,
			activeTab: 1,
			activeDate: 0,
			// 全部 0, 蕉币1 , 红包 2,
			activeYen: 0,
			optionsDate: [
				{ label: '全部', val: 0 },
				{ label: '本月', val: 1 },
				{ label: '上月', val: 2 },
			],
			expensesList: [],
			loading: false,
		});
		const init = () => {
			const param = {
				page: state.page,
				pagesize: state.pagesize,
				uid: Number(UID.value),
				find_type: state.activeDate,
				// rules_type: state.activeYen,
			};
			state.loading = true;
			expensesList(param).then((res) => {
				state.loading = false;
				state.expensesList = res.data.list || [];
				state.total = res.data.total;
			});
		};
		const selectCurrent = (current) => {
			state.page = current;
			init();
		};
		const parseTime = (time) => dayjs(time * 1000).format('YYYY MM-DD HH:mm:ss');

		onMounted(() => {
			init();
		});
		return {
			router,
			state,
			init,
			selectCurrent,
			parseTime,
			commaFormat,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.ant-tabs .ant-tabs-top-content.ant-tabs-content-animated, .ant-tabs .ant-tabs-bottom-content.ant-tabs-content-animated, .ant-tabs-tabpane.ant-tabs-tabpane-active) {
	background: #fff;
	.list_body {
		padding: 10px;
		background: #f4f5f8;
		margin-bottom: 10px;
		border-radius: 5px;
		color: #202020;
	}
}
.pagination {
	text-align: right;
}
.list_body {
	padding: 10px;
	background: #f4f5f8;
	margin-bottom: 10px;
	border-radius: 5px;
	color: #202020;
}
</style>
