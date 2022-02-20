<template lang="pug">
.w-full.mt-4
	.chargeList.w-full(v-if='state?.chargeList?.length>0')
		.text-right.mb-10.pr-4(style='margin-top:-70px')
			a-select(style='width: 80px', v-model:value='state.activeDate', @change='(state.page = 1), init()')
				a-select-option(v-for='(item, index) in state.optionsDate', :key='index', :value='item.val') {{ item.label }}
		.grid.grid-cols-3.gap-4(v-if='state.chargeList')
			.col-span-1.bg-white.shadow.rounded-lg(v-for='(item, index) in state.chargeList', :key='index') 
				.p-4.BETWEEN
					.text-xs
						.text-gray-500 订单号码
						.text-psV3Red.mb-2 {{item.orderno}}
						.text-gray-500 充值时间
						.text-gray-500 {{parseTime(item.addtime) }}
					.status.text-xs.text-right
						div.mb-2
							.rounded-full.border.border-psV3Yellow.text-psV3Yellow.px-2(v-if='item.status === 0') 未支付
							.rounded-full.border.border-psV3Green.text-psV3Green.px-2(v-if='item.status === 1') 成功
							.rounded-full.border.border-psV3Yellow.text-psV3Yellow.px-2(v-if='item.status === 2') 处理中
							.rounded-full.border.border-psV3RedLight.text-psV3RedLight.px-2(v-if='item.status === 3') 失败
						img(src='/publicAssets/img/v3/simple-icons-alipay-2@2x.png')
				.bg-gray-100.text-xs.px-4.py-2
					span.text-gray-500 充值金额
					span.float-right.text-psV3Yellow  ¥ {{commaFormat(item.money) }}
				.p-4.text-xs.BETWEEN
					span.text-gray-500  获得
					.text-gray-500
						.text-psV3Yellow {{item.goods}}
						.text-psV3Yellow {{item.goods_quantity}} 蕉币
		.pagination.my-4
			a-pagination(v-model:current='state.page', :page-size.sync='state.pagesize', :total='state.total', :hideonsinglepage='true', @change='selectCurrent')

	a-skeleton(v-if='state.loading', active, :paragraph='{ rows: 8}')

	.w-full.min-h-screen.CENTER.flex-col(v-if='state?.chargeList?.length<=0')
		img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
		.text-lg.text-gray-500.my-2 还未有充值纪录

</template>
<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, reactive, toRaw } from 'vue';
import { chargeList } from '@/api';
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
			chargeList: [],
			loading: false,
		});
		const init = () => {
			const param = {
				page: state.page,
				pagesize: state.pagesize,
				uid: Number(UID.value),
				find_type: state.activeDate,
				rules_type: state.activeYen,
			};
			state.loading = true;
			chargeList(param).then((res) => {
				state.loading = false;
				state.chargeList = res.data.list || [];
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
