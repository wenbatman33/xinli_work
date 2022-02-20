<template lang="pug">
//- 賽程分類列表
.grid.grid-cols-2.items-center.rounded.bg-list.p-1
    //- 賽程分類物件
    class-item(
        v-for='item in classList'
        :item='item'
        :selected='selected'
        @update:selected='updateSelected'
    )
</template>
<script>
import { computed } from 'vue';
import classItem from '@/components/event/2020tokyolympic/classItem.vue';

export default {
	components: {
		classItem,
	},
	props: {
		selected: Number,
	},
	emits: ['update:selected'],
	setup(props, { emit }) {
		// 分類列表
		const classList = computed(() => {
			return [
				{
					id: 1,
					name: '足球',
					icon: '/publicAssets/img/event/2020tokyolympic/icon-football@3x.png',
				},
				{
					id: 2,
					name: '篮球',
					icon: '/publicAssets/img/event/2020tokyolympic/icon-basketball@3x.png',
				},
			];
		});

		// 更新選擇的分類
		const updateSelected = (selected) => {
			emit('update:selected', selected);
		};
		return {
			classList,
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
