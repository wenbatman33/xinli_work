<template lang="pug">
//- 發話顏色列表
.grid.grid-cols-color.bg-color.p-4(v-if='show')
    color-item(v-for='item in acceptedColor', :item='item', :selected='selected', @update:selected='updateSelected')
</template>
<script>
import { computed } from 'vue';
import { acceptedMsgColor } from '@/utils';
import colorItem from '@/components/room/colorItem.vue';

export default {
	components: {
		colorItem,
	},
	props: {
		show: Boolean,
		selected: String,
	},
	emits: ['update:show', 'update:selected'],
	setup(props, { emit }) {
		// 可選擇的顏色
		const acceptedColor = computed(() => {
			return acceptedMsgColor;
		});

		// 更新選擇的顏色
		const updateSelected = (selected) => {
			// Hide color list
			emit('update:show', false);

			// Update selected color
			emit('update:selected', selected);
		};
		return {
			acceptedColor,
			updateSelected,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-color {
	background: #f4f4f4;
}
.grid-cols-color {
	grid-template-columns: repeat(7, auto);
}
</style>
