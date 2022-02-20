<template lang="pug">
.w-full
	a-form.w-full(ref='createGuessGameRef', layout='vertical', :model='createGuessGameForm',  :rules='createGuessGameFormRules', @submit='submitCreateGuessGameForm')
		a-form-item.my-2(label='竞猜题目', name='title')
			a-input(v-model:value='createGuessGameForm.title', placeholder='请输入竞猜标题')

		.w-full.grid.grid-cols-2.gap-4.my-2
			.col-span-1
				a-form-item.my-2(label='选项A', name='item1')
					a-input(v-model:value='createGuessGameForm.item1', placeholder='请输入竞猜选项(限制24个字)', :maxlength='24')
			.col-span-1
				a-form-item.my-2(label='选项B', name='item2')
					a-input(v-model:value='createGuessGameForm.item2', placeholder='请输入竞猜选项(限制24个字)', :maxlength='24')
		
		a-form-item.my-2(label='竞猜截止时间', name='end_time')
			.grid.grid-cols-2.gap-4.my-4
				.col-span-1
					a-button(:type='state.dateType===1? "primary": "default"', size='large', @click='selectTimeHandle(1)') 15分钟后
					a-button(:type='state.dateType===2? "primary": "default"', size='large', @click='selectTimeHandle(2)') 30分钟后
					a-button(:type='state.dateType===3? "primary": "default"',, size='large', @click='selectTimeHandle(3)') 1 小时后
				.col-span-1
					a-button(:type='state.dateType===4? "primary": "default"', size='large', @click='selectTimeHandle(4)') 今日
					a-button(:type='state.dateType===5? "primary": "default"', size='large', @click='selectTimeHandle(5)') 明日
					a-time-picker(v-model:value='state.selectTime' format='HH:mm', size='large', :allowClear='false' , @change='selectTimeHandle')

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
import { useForm } from '@ant-design-vue/use';

export default {
	props: ['game_type'],
	setup(props, { emit }) {
		const store = useStore();
		const router = useRouter();
		const createGuessGameRef = ref();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			dateType: 1,
			selectDate: '',
			selectTime: null,
		});
		const createGuessGameForm = reactive({
			game_type: 3,
			title: '',
			item1: '',
			item2: '',
			end_time: '',
		});
		const createGuessGameFormRules = reactive({
			title: [{ required: true, message: '请输入竞猜标题', trigger: ['change', 'blur'] }],
			item1: [{ required: true, message: '请输入竞猜选项', trigger: ['change', 'blur'] }],
			item2: [{ required: true, message: '请输入竞猜选项', trigger: ['change', 'blur'] }],
			end_time: [{ required: true, message: '请选择截止时间', trigger: ['change', 'blur'] }],
		});

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
			}
			// 目前欄位設定至時分 秒數先自己先補上
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
					console.log('error');
				});
		};
		const closeModal = () => {
			emit('closeModal');
		};
		watch(
			() => props.game_type,
			(newVal) => {
				selectTimeHandle();
			},
			{ deep: true }
		);
		onMounted(() => {
			selectTimeHandle();
		});
		return {
			store,
			state,
			router,
			UID,
			createGuessGameRef,
			createGuessGameForm,
			createGuessGameFormRules,
			submitCreateGuessGameForm,
			closeModal,
			selectTimeHandle,
		};
	},
};
</script>
<style lang="scss" scoped></style>
