<template lang="pug">
//- 競猜狀態列表
.grid.grid-cols-2.items-center.rounded.bg-list.p-1
    //- 競猜狀態物件
    status-item(
        v-for='item in statusList'
        :item='item'
        :selected='selected'
        @update:selected='updateSelected'
    )
</template>
<script>
import { computed } from 'vue';
import statusItem from '@/components/event/2020tokyolympic/statusItem.vue';

export default {
	components: {
		statusItem,
	},
	props: {
		selected: Number,
	},
	emits: ['update:selected'],
	setup(props, { emit }) {
		// 狀態列表
		const statusList = computed(() => {
			return [
				{
					id: 1,
					name: '竞猜进行中',
				},
				{
					id: 2,
					name: '赛事已结束',
				},
			];
		});

		// 更新選擇的分類
		const updateSelected = (selected) => {
			emit('update:selected', selected);
		};
		return {
			statusList,
			updateSelected,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-list {
	background: #001056;
}
</style>
