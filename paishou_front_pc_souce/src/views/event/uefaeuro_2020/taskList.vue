<template lang="pug">
//- 任務列表
.grid.grid-cols-2.gap-x-4.gap-y-5(:class='$attrs.class')
    //- 目前沒有紀錄
    .text-sm.text-white.mt-12(v-if='listEmpty') 目前没有紀錄

    //- 任務物件
    task-item(v-else, v-for='item in state.list', :item='item', @refresh='refresh')
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { event010List } from '@/api';
import taskItem from '@/views/event/uefaeuro_2020/taskItem.vue';

export default {
	components: {
		taskItem,
	},
	emits: ['refresh'],
	setup(props, { emit }) {
		// Component state
		const state = reactive({
			list: [],
		});

		// 任務列表是否為空白
		const listEmpty = computed(() => {
			return !state.list || state.list.length === 0;
		});

		// 取得任務列表
		const getTaskList = () => {
			event010List().then((res) => {
				state.list = res?.data?.list || [];
			});
		};

		// 刷新列表
		const refresh = () => {
			getTaskList();
			emit('refresh');
		};

		// On component mounted
		onMounted(() => {
			refresh();
		});
		return {
			state,
			listEmpty,
			refresh,
		};
	},
};
</script>
