<template lang="pug">
//- 貼圖列表
.grid.grid-cols-5.items-center.justify-center
	//- 貼圖物件
	sticker-item(v-for='item in list', :item='item', @update:show='updateShow')
</template>
<script>
import stickerItem from '@/components/room/stickerItem.vue';

export default {
	components: {
		stickerItem,
	},
	props: {
        list: Array,
	},
	emits: ['update:show'],
	setup(props, { emit }) {
		// 更新貼圖列表顯示狀態
		const updateShow = (show) => {
			emit('update:show', show);
		};
		return {
			updateShow,
		};
	},
};
</script>
