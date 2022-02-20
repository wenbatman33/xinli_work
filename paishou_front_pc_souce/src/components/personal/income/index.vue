<template lang="pug">
.w-full
	.hFuncBar.FLEX_C.bg-white.rounded-lg.shadow.p-4.mb-4
		.CENTER_BETWEEN
			span
				span.text-gray-500.mr-2 开播时间 
				a-range-picker(v-model:value="state.pickerArray")
					template(#dateRender="{ current, today }")
						.ant-calendar-date {{ current.date() }}
				a-button.mx-4(type='primary', @click='searchQueryincome') 查询
			span
				span.rounded.border.border-psV3Yellow.text-psV3Yellow.p-3.mr-2 
					span.text-gray-500.mr-2 收益余额
					span.text-psV3Yellow.mr-2  {{commaFormat(state.coin)}}
					a-button.bg-psV3Yellow.text-white.text-xs.rounded-full(size='small', @click='showWithdrawHandele') 提现
				//- 銀行卡編輯
				span.bg-psV3Blue.text-white.text-xs.rounded.p-3.mr-2.cursor-pointer(v-if='!state.bank_name||!state.bank_no', size='mini', @click='state.showBankModal=true') 前往绑定银行卡
				span.bg-psV3Blue.text-white.text-xs.rounded.p-3.mr-2.cursor-pointer(v-else, size='mini', @click='state.showBankModal=true') {{state.bank_name}}


				router-link(to='/about/262211')
					span.rounded.border.border-gray-500.text-gray-500.p-3.mr-2 规则

	.grid.grid-cols-3.gap-4(v-if='state.liveIncomeList')
		.col-span-1.bg-white.shadow.rounded-lg.p-4(v-for='(item, index) in state.liveIncomeList', :key='index') 
			.BETWEEN
				div
					.text-xs.text-gray-500 开始时间
					.text-xs.text-psV3Red {{ item.starttime }}
				div
					.rounded.border.border-psV3Yellow.text-xs.text-psV3Yellow.p-2.cursor-pointer(v-if='item.income>0', @click='getIncomeDetail(item.show_id)') 查看送礼名单
			a-divider.my-2

			h5.my-2.truncate {{ item.title }}
			.grid.grid-cols-2.gap-4
				.col-span-1.bg-gray-100.rounded.text-center.p-2
					.text-xs.text-gray-500 增加收益
					.text-xs.text-psV3Yellow {{ commaFormat(item.income) }}
				.col-span-1.bg-gray-100.rounded.text-center.p-2
					.text-xs.text-gray-500 累积收益
					.text-xs.text-psV3Yellow {{ commaFormat(item.total_income )}}

	.w-full.min-h-screen.CENTER.flex-col(v-if='state?.liveIncomeList?.length<=0')
		img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
		.text-lg.text-gray-500.my-2 暂无直播记录

	//- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	a-modal.radiusModal(v-model:visible='state.showBankModal', :bodyStyle='{"padding":0}', :footer='null', closable='', width='1000px', :mask-closable='false', :keyboard='false', @cancel='state.showBankModal=false')
		addBankForm(@add-bank-scussecs='addBankScussecs', :bank_no='state.bank_no', :bank_name='state.bank_name')
	//- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	a-modal.radiusModal(v-model:visible='state.showIncomeListDetail', width='1000px', centered='', :footer='null', :closable='true', :mask-closable='true', :keyboard='false', @cancel='state.showIncomeListDetail=false')
		h4.text-psV3Red.text-center.truncate.mb-4 查看送礼名单
		.grid.grid-cols-3.gap-4(v-if='state.liveIncomeListDetail')
			.col-span-1.bg-white.rounded-xl.shadow.overflow-hidden(v-for='(item, index) in state.liveIncomeListDetail', :key='index')
				.CENTER_BETWEEN.p-2
					div
						h5 {{ item.gift_name }}
					div.text-xs
						span.text-gray-500 数量 
						span.text-psV3Red {{ item.num }}
				.text-xs.p-2
					span.text-gray-500 收礼时间 
					span.text-psV3Red {{ item.datetime }}
				.CENTER.bg-psV3Red.text-white.px-2 
					span 送礼人
					span.font-bold {{ item.user_name }}
		//- .list_box
		//- 	a-row.list_head
		//- 		a-col.py-2.font-bold.text-center(:span='6') 收礼时间
		//- 		a-col.py-2.font-bold.text-center(:span='6') 送礼人
		//- 		a-col.py-2.font-bold.text-center(:span='6') 收礼内容
		//- 		a-col.py-2.font-bold.text-center(:span='6') 数量
		//- 	div
		//- 		a-row.list_body(v-for='(item, index) in state.liveIncomeListDetail', :key='index')
		//- 			a-col.text-center(:span='6') {{ item.datetime }}
		//- 			a-col.text-center(:span='6') {{ item.user_name }}
		//- 			a-col.text-center(:span='6') {{ item.gift_name }}
		//- 			a-col.text-center(:span='6') {{ item.num }}
	//- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	a-modal.radiusModal(v-model:visible='state.showWithdrawModal',  width='650px', :footer='null', :closable='true', :mask-closable='true', :keyboard='false', @cancel='state.showWithdrawModal=false')
		.CENTER
			.p-28.text-center(v-if='state.withdrawModalType===1')
				h3.text-psV3Red 请先绑定银行卡 
				.text-center.mt-8
					a-button.mx-4(type='primary', size='large', @click='bindBankCardHandle')  确认
					a-button.mx-4(size='large', @click='state.showWithdrawModal = false') 取消
			.p-28.text-center(v-if='state.withdrawModalType===2')
				h3.text-psV3Red 收益提现
				.font-bold.text-center.text-base.mt-8(v-if='convertRMB<100') 
					span 当前收益余额 
					span.text-psV3Yellow {{ convertRMB }} 
					span 元
				.font-bold.text-center.text-base.mt-8(v-else)
					span 确定要将当前收益余额 
					span.text-psV3Yellow {{ convertRMB }} 
					span 元 提出吗？
				.text-center.text-sm.text-psV3RedLight.my-8(v-if='convertRMB<100') 您未达最低提领金额
				.text-center.text-xs.text-psV3Red.my-8(v-else) 温馨提示 请确认接收款额的银行卡信息，如有因您信息填写错误而导致转帐失败的情况，拍手概不负责
				.text-center.mt-8
					a-button.mx-4(type='primary', size='large' @click='withdrawHandele', :loading='state.withdrawLoading', :disabled='convertRMB<100') 确认
					a-button.mx-4(size='large', @click='state.showWithdrawModal = false') 取消
</template>
<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { reactive, onMounted, computed, toRaw } from 'vue';
import { anchorScheduleList, appointmentLive, liveIncome, liveIncomeDetail, userBank, liveWithdraw } from '@/api';
import { message } from 'ant-design-vue';
import addBankForm from '@/components/personal/income/addBankForm.vue';
import { commaFormat } from '@/utils';

export default {
	components: {
		addBankForm,
	},
	setup() {
		const store = useStore();
		const UID = computed(() => store.state.user.uid || '');
		const classList = computed(() => store.state.config.classList);
		const state = reactive({
			showBankModal: false,
			showIncomeListDetail: false,
			showWithdrawModal: false,
			withdrawModalType: 1,
			// 直播记录绑定数据
			pickerArray: [],
			liveIncomeList: [],
			liveIncomeListDetail: [],
			incomePage: 1,
			incomePagesize: 20,
			incomeTotal: null,
			incomeStartTime: 0,
			incomeEndTime: 0,
			bank_name: '',
			bank_no: '',
			coin: 0,
			withdrawLoading: false,
		});
		const incomeChange = (val) => {
			state.incomePage = val;
			init();
		};
		const searchQueryincome = () => {
			init();
		};
		const transferTime = (time) => {
			return dayjs.duration(time, 'seconds').format('dd [天] hh [时] mm [分] ss [秒]');
		};
		const parseTime = (time) => {
			return dayjs(time * 1000).format('YYYY MM-DD HH:mm:ss');
		};
		// 已预约赛事
		const init = () => {
			let start_time = '';
			let end_time = '';
			if (state.pickerArray.length <= 0) {
				start_time = dayjs().startOf('month').unix();
				end_time = dayjs().unix();
			} else {
				start_time = dayjs(toRaw(toRaw(state.pickerArray[0]))).unix();
				end_time = dayjs(toRaw(toRaw(state.pickerArray[1]))).unix();
			}
			let param = {
				page: state.incomePage,
				pagesize: state.incomePagesize,
				uid: Number(UID.value),
				start_time: start_time,
				end_time: end_time,
			};
			state.liveIncomeList = [];
			liveIncome(param).then((res) => {
				state.liveIncomeList = res.data.list || [];
				state.incomeTotal = res.data.ttl;
				state.bank_name = res.data.bank_name;
				state.bank_no = res.data.bank_no;
				state.coin = res.data.coin;
			});
		};
		const getIncomeDetail = (id) => {
			state.liveIncomeListDetail = [];
			liveIncomeDetail({
				show_id: id,
			}).then((res) => {
				state.liveIncomeListDetail = res.data.list;
				state.showIncomeListDetail = true;
			});
		};
		const convertRatio = computed(() => store.state.user.userInfo.host.convert_ratio);
		const convertRMB = computed(() => state.coin / convertRatio.value);
		const showWithdrawHandele = (bool) => {
			if (state.bank_no === '' || state.bank_no === '') {
				state.withdrawModalType = 1;
			} else {
				state.withdrawModalType = 2;
			}
			state.showWithdrawModal = true;
		};
		const bindBankCardHandle = () => {
			state.showWithdrawModal = false;
			state.showBankModal = true;
		};
		const withdrawHandele = () => {
			state.withdrawLoading = true;
			liveWithdraw().then((res) => {
				message.success('提领成功');
				// ===========================
				state.pickerArray = [];
				init();
				state.withdrawLoading = false;
				state.showWithdrawModal = false;
				// ===========================
			});
		};
		const addBankScussecs = () => {
			init();
			state.showBankModal = false;
		};
		onMounted(() => {
			if (state.pickerArray.length <= 0) {
				state.pickerArray[0] = dayjs().startOf('month');
				state.pickerArray[1] = dayjs();
			}
			init();
		});
		return {
			state,
			init,
			UID,
			classList,
			searchQueryincome,
			incomeChange,
			parseTime,
			transferTime,
			getIncomeDetail,
			convertRatio,
			convertRMB,
			showWithdrawHandele,
			withdrawHandele,
			bindBankCardHandle,
			addBankScussecs,
			commaFormat,
		};
	},
};
</script>
<style lang="scss" scoped></style>
