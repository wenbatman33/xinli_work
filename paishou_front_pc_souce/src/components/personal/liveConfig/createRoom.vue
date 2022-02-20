<template lang="pug">
.w-full
	.transition-opacity.bg-psV3Orange.text-center.rounded.p-4.mb-4 
		h5.text-white 建议您使用OBS开播时，请将视频比特率设定在 1200Kbps、FPS=15，以确保您的粉丝能维持观看品质并持续观看直播。
	.w-full.bg-white.rounded.p-4.pb-8
		a-form.liveConfig(layout='vertical', :model='createRoomForm', :rules='createRoomFormRules',@submit='createRoomHandle')
			a-form-item.w-full(label='直播分类' name='liveclassid')
				a-radio-group.w-full(button-style='solid', v-model:value='createRoomForm.liveclassid',size='large', @change='classChange')
					.w-full.grid.grid-cols-5.gap-4
						.col-span-1(v-for='item in classList', :key='item.id')
							a-radio-button.w-full.text-center.rounded(v-model:value='item.id', block, shape='round') {{ item.name }}
			a-form-item(label='所属赛事',  name='score_id')
				a-select(placeholder='', v-model:value='createRoomForm.score_id')
					a-select-option(v-model:value='item.eid', v-for='(item, index) in state.scheduleList', :key='index')  【{{ item.cn }}】{{ item.begin1 }} {{ item.home }} VS {{ item.away }} 
			a-form-item(label='直播间标题', name='title')
				a-input(placeholder='请输入直播间标题', v-model:value='createRoomForm.title')
			//- a-form-item(label='直播间公告'  name='notice')
			//- 	a-textarea(placeholder='请输入直播间公告', :rows='4', v-model:value='createRoomForm.notice', :maxLength='state.noticeLimitLen')
			//- 	p.text-right.m-0.leading-none
			//- 		span.text-xs 输入剩余
			//- 		span.text-xs.text-psV3Yellow.mx-2 {{createRoomForm.noticeLimitLen - createRoomForm.notice.length}} 
			//- 		span.text-xs 字数 {{noticeLen}}
			.w-full
				a-button.rounded(type='primary', block, size='large', :disabled='state.submitDisabled===true ', html-type='submit') 开播
</template>
<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { computed, onMounted, reactive, toRaw, watch } from 'vue';
import { scheduleList, createRoomV2 } from '@/api';

export default {
	props: ['dataList'],
	setup(props, { emit }) {
		const store = useStore();
		const UID = computed(() => store.state.user.uid || '');
		const TOKEN = computed(() => store.state.user.token || '');
		const classList = computed(() => store.state.config.classList);
		// const noticeLen = computed(() => createRoomForm.notice.length);
		const state = reactive({
			scheduleList: [],
			start_time: null,
			end_time: null,
			submitDisabled: true,
		});

		const createRoomForm = reactive({
			liveclassid: null,
			score_id: null,
			title: '',
			uid: Number(UID.value),
			token: TOKEN.value,
			anyway: 1,
			// noticeLimitLen: 100,
			// notice: '',
		});
		const createRoomFormRules = reactive({
			liveclassid: [{ required: true, message: '请选择直播分类', type: 'number', trigger: ['change', 'blur'] }],
			title: [{ required: true, message: '请输入直播间标题', trigger: ['change', 'blur'] }],
			// score_id: [{ required: true, message: '请选择所属赛事', type: 'number', trigger: ['change', 'blur'] }],
			// notice: [{ required: true, message: '请输入直播间公告', trigger: ['change', 'blur'] }],
		});
		const createRoomHandle = () => {
			const payload = toRaw(createRoomForm);
			// score_id 其實是必填欄位 但api沒有返回 score_id 列表 所以是空值時自動帶 0
			if (payload.score_id === null) payload.score_id = 0;
			createRoomV2(payload).then((res) => {
				emit('init');
				store.dispatch('user/UPDATE_USER_INFO');
			});
		};
		const classChange = (event) => {
			createRoomForm.score_id = null;
			getScheduleList();
		};
		const getScheduleList = () => {
			scheduleList({
				page: 1,
				pagesize: 1000,
				liveclassid: createRoomForm.liveclassid,
				start_time: state.start_time,
				end_time: state.end_time,
			}).then((res) => {
				if (res.code === 0 && res.data) {
					if (res.data.list) {
						state.scheduleList = res.data.list;
					} else {
						state.scheduleList = [];
					}
				}
			});
		};
		watch(
			() => createRoomForm,
			(newVal) => {
				if (createRoomForm.liveclassid !== '' && createRoomForm.title !== '' && createRoomForm.notice !== '') {
					state.submitDisabled = false;
				} else {
					state.submitDisabled = true;
				}
			},
			{ deep: true }
		);
		onMounted(() => {
			state.start_time = dayjs().subtract(3, 'hour').unix();
			state.end_time = dayjs().add(4, 'hour').unix();
			// getScheduleList();
		});
		return {
			state,
			classList,
			// noticeLen,
			classChange,
			getScheduleList,
			createRoomHandle,
			createRoomForm,
			createRoomFormRules,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.liveConfig) {
	.ant-form-item-label label {
		font-size: 16px;
		color: #a62337;
		font-weight: bold;
	}
}
</style>
