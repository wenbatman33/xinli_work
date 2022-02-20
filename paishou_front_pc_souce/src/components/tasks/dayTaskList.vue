<template lang="pug">
.list_box(v-if='basicTaskList.length<=0  && dayTaskList.length>0')
	.font-black.mb-2.text-psV3Red 每日任务
	.task_list(v-for='(item, index) in dayTaskList', :key='index')
		div
			p.taskname {{ item.name }}
			p
				span.text-gray-500 {{item.bonus_type_name}}
				span.text-psV3Red +{{item.quantity}}
		button.defaultButton(v-if='item.status === 1', @click='getBonus(item)') {{item.status_name}}
		button.outlineButton(v-if='item.status === 0', @click='todoTask(item.link)') {{item.status_name}}

	a-modal.radiusModal(v-if='state.showTask', :visible='state.showTask', :width='showTaskType===2?"1000px":"600px"', :bodyStyle='{"padding":0}', :closable='true', :footer='null', @cancel='state.showTask=false')
		.CENTER(class='h-[580px]')
			.p-4.text-center
				h3.text-center.text-psV3Red 恭喜获得
				p.py-4
					img(v-if='state?.currentTask?.bonus_type_name==="香蕉"', src='/publicAssets/img/v3/img-bigbanana-big-gift.png' , srcset='/publicAssets/img/v3/img-bigbanana-big-gift@2x.png 2x')
					img(v-if='state?.currentTask?.bonus_type_name==="蕉币"', src='/publicAssets/img/v3/img-coin-big-gift.png' , srcset='/publicAssets/img/v3/img-coin-big-gift@2x.png 2x')
				h2.text-psV3Red.py-4 {{state?.currentTask?.bonus_type_name}}+{{state?.currentTask?.quantity}}
				.py-4
					a-button.rounded(type='primary', size='large', @click='state.showTask=false') 确认
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted, reactive, toRaw } from 'vue';
import { deepLink } from '@/utils';
import { getBonusDay } from '@/api';

export default {
	setup() {
		const store = useStore();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			showTask: false,
		});
		const basicTaskList = computed(() => {
			const List = store.state.tasks.basicTaskList;
			return List.filter((task) => task.status != 2);
		});
		const dayTaskList = computed(() => {
			const List = store.state.tasks.dayTaskList;
			return List.filter((task) => task.status != 2);
		});
		const getBonus = (item) => {
			const raw = toRaw(item);
			state.currentTask = raw;
			getBonusDay({
				task_list_id: raw.task_list_id,
			}).then((res) => {
				state.showTask = true;
				init();
			});
		};
		const todoTask = (link) => {
			deepLink(link);
		};
		const init = () => {
			store.dispatch('tasks/GET_DAY_TASK_LIST', UID);
		};
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			basicTaskList,
			dayTaskList,
			getBonus,
			todoTask,
			init,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.ant-modal-content) {
	border-radius: 16px !important;
}
::v-deep(.ant-modal-body) {
	padding: 0px;
}
::v-deep(.anticon .anticon-close .ant-modal-close-icon) {
	color: #fff !important;
}
.list_box {
	overflow: auto;
	.task_list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 15px;
		background: #f4f5f8;
		border-radius: 8px;
		margin-bottom: 8px;
		font-size: 12px;

		button {
			border: none;
			outline: none;
			color: #fff;
			width: 50px;
			height: 20px;
			line-height: 20px;
			border-radius: 20px;
			font-size: 12px;
			cursor: pointer;
		}

		.defaultButton {
			background: #a62337;
		}

		.outlineButton {
			cursor: pointer;
			font-size: 12px;
			border-radius: 8px;
			color: #a62337;
			border: 1px solid #a62337;
		}

		.taskname {
			color: #4b4b4b;
			font-weight: 600;
		}

		.explain {
			color: #8e8e93;
		}
	}
}
</style>
