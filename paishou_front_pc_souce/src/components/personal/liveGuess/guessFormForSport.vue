<template lang="pug">
.w-full
	.h-64(v-if='state.fetchLoading')
		a-skeleton(active, :paragraph='{ rows: 4}')

	.w-full(v-if='state.scheduleList.length>0')
		a-form.w-full(ref='createGuessGameRef', :model='createGuessGameForm', layout='vertical', :rules='createGuessGameFormRules', @submit='submitCreateGuessGameForm')
			a-form-item.my-2(name='eid', label='所属赛事')
				a-select.w-full(placeholder='依所选分类选取赛事 (必选)', v-model:value='createGuessGameForm.eid', @change='selectGameEndTime')
					a-select-option(v-for='(item, index) in state.scheduleList', v-model:value='item.eid') {{item.begin_date}}【{{ item.cn }}】{{ item.begin1 }} {{ item.home }} VS {{ item.away }} 

			a-form-item.my-2(name='title', label='竞猜题目')
				a-input(v-model:value='createGuessGameForm.title', placeholder='请输入竞猜标题')

			.w-full.grid.grid-cols-2.gap-4.my-2
				.col-span-1
					a-form-item.my-2(name='item1', label='选项A')
						a-input(v-model:value='createGuessGameForm.item1', placeholder='请输入竞猜选项(限制24个字)', :maxlength='24')
				.col-span-1
					a-form-item.my-2(name='item2', label='选项B')
						a-input(v-model:value='createGuessGameForm.item2', placeholder='请输入竞猜选项(限制24个字)', :maxlength='24')
			
			a-form-item.my-2(v-if='state.gameEndTime', name='end_time', label='竞猜截止时间')
				.grid.grid-cols-5.gap-2.my-4
					.col-span-3
						a-button(:type='state.dateType===1? "primary": "default"', @click='selectTimeHandle(1)') 15分钟后
						a-button(:type='state.dateType===2? "primary": "default"', @click='selectTimeHandle(2)') 30分钟后
						a-button(:type='state.dateType===3? "primary": "default"',, @click='selectTimeHandle(3)') 1 小时后
						a-button(:type='state.dateType===6? "primary": "default"',, @click='selectTimeHandle(6)') 比赛结束时间
					.col-span-2
						a-button(:type='state.dateType===4? "primary": "default"', @click='selectTimeHandle(4)') 今日
						a-button(:type='state.dateType===5? "primary": "default"', @click='selectTimeHandle(5)') 明日
						a-time-picker(v-model:value='state.selectTime' format='HH:mm', :allowClear='false' , @change='selectTimeHandle')

		.text-xs.text-center.text-gray-500.my-4 竞猜下注的最低值不得低于100蕉币,最高值不得高于10,000蕉币 
		
		.BETWEEN.text-center.my-4
			div.pr-4(class='w-1/3')
				a-button.w-full.rounded(size='large', @click='closeModal') 取消
			div(class='w-2/3')
				a-button.w-full.rounded(type='primary', size='large', @click='submitCreateGuessGameForm') 确认发布

</template>
<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, reactive, watch, ref } from 'vue';
import { scheduleList, guessAdd } from '@/api';
import { message } from 'ant-design-vue';

export default {
	props: ['game_type'],
	setup(props, { emit }) {
		const store = useStore();
		const router = useRouter();
		const createGuessGameRef = ref();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			scheduleList: [],
			fetchLoading: false,
			gameEndTime: null,
			dateType: null,
			selectDate: null,
			selectTime: null,
		});
		const createGuessGameForm = reactive({
			eid: null,
			game_type: null,
			title: '',
			item1: '',
			item2: '',
			end_time: null,
		});
		// validator 需先宣告
		let checkGameTime = (rule, value, callback) => {
			if (value === '') {
				return Promise.reject(new Error('请选择截止时间'));
			} else if (dayjs(value).isAfter(dayjs(state.gameEndTime * 1000))) {
				message.error('截止时间不可晚于比赛结束时间');
				return Promise.reject(new Error('截止时间不可晚于比赛结束时间'));
			} else {
				return Promise.resolve();
			}
		};
		const createGuessGameFormRules = reactive({
			eid: [{ required: true, type: 'number', message: '依所选分类选取赛事', trigger: ['change', 'blur'] }],
			title: [{ required: true, type: 'string', message: '请输入竞猜标题', trigger: ['change', 'blur'] }],
			item1: [{ required: true, type: 'string', message: '请输入竞猜选项', trigger: ['change', 'blur'] }],
			item2: [{ required: true, type: 'string', message: '请输入竞猜选项', trigger: ['change', 'blur'] }],
			end_time: [
				{ required: true, type: 'string', message: '请选择截止时间', trigger: ['change', 'blur'] },
				{ validator: checkGameTime, trigger: ['change', 'blur'] },
			],
		});
		const resetForm = () => {
			createGuessGameRef.value.resetFields();
		};

		const fetchScheduleList = () => {
			// resetForm();
			createGuessGameForm.game_type = props.game_type;
			state.scheduleList = [];
			if (props.game_type !== 3) {
				let param = {
					page: 1,
					pagesize: 9999,
					liveclassid: props.game_type,
					// 足球賽事需提前1.5小時
					start_time: props.game_type === 1 ? dayjs().subtract(1, 'hour').subtract(30, 'minute').unix() : dayjs().unix(),
				};
				if (UID.value) {
					param.uid = Number(UID.value);
				}
				state.fetchLoading = true;
				scheduleList(param).then((res) => {
					state.fetchLoading = false;
					state.scheduleList = res.data.list || [];
				});
			}
		};
		const selectGameEndTime = (eid) => {
			createGuessGameForm.end_time = null;
			state.dateType = null;
			state.selectDate = null;
			state.selectTime = null;

			const game = state.scheduleList.filter((g) => g.eid === eid);
			state.gameEndTime = game[0].end_time;
		};
		const selectTimeHandle = (type) => {
			state.dateType = type || 1;
			let tempTime = '';
			if (state.dateType === 1) {
				state.selectDate = dayjs().format('YYYY-MM-DD');
				state.selectTime = dayjs().add(15, 'minutes');
			} else if (state.dateType === 2) {
				state.selectDate = dayjs().format('YYYY-MM-DD');
				state.selectTime = dayjs().add(30, 'minutes');
			} else if (state.dateType === 3) {
				state.selectDate = dayjs().format('YYYY-MM-DD');
				state.selectTime = dayjs().add(1, 'hours');
			} else if (state.dateType === 4) {
				state.selectDate = dayjs().format('YYYY-MM-DD');
				state.selectTime = dayjs().add(15, 'minutes');
			} else if (state.dateType === 5) {
				state.selectDate = dayjs().add(1, 'days').format('YYYY-MM-DD');
				state.selectTime = dayjs().add(15, 'minutes');
			} else if (state.dateType === 6) {
				state.selectDate = dayjs(state.gameEndTime * 1000).format('YYYY-MM-DD');
				state.selectTime = dayjs(state.gameEndTime * 1000);
			}
			createGuessGameForm.end_time = `${state.selectDate} ${dayjs(state.selectTime).format('HH:mm')}:00`;
		};
		const submitCreateGuessGameForm = (e) => {
			e.preventDefault();
			createGuessGameRef.value
				.validate()
				.then(() => {
					guessAdd(createGuessGameForm).then((res) => {
						emit('update');
						emit('closeModal');
					});
				})
				.catch((error) => {
					console.log(error);
					console.log('error');
				});
		};
		const closeModal = () => {
			emit('closeModal');
		};
		watch(
			() => props.game_type,
			(newVal) => {
				fetchScheduleList();
			},
			{ deep: true }
		);
		onMounted(() => {
			fetchScheduleList();
		});
		return {
			store,
			state,
			router,
			UID,
			resetForm,
			createGuessGameRef,
			createGuessGameForm,
			createGuessGameFormRules,
			fetchScheduleList,
			submitCreateGuessGameForm,
			closeModal,
			selectTimeHandle,
			selectGameEndTime,
		};
	},
};
</script>
<style lang="scss" scoped></style>
