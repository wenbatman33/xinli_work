<template lang="pug">
//- 賽程分類物件
van-button.w-auto.h-auto.p-1.rounded.bg-item.border-transparent(:class='{ "highlight": highlight }', @click='clickItem')
    //- 物件內容
    .flex.flex-row.justify-center.items-center
        //- 圖示
        img.w-4.h-4.object-contain(:src='icon')

        //- 名稱
        .text-lg.text-white.font-bold.ml-1 {{ name }}
</template>
<script>
import { computed } from 'vue';

export default {
	props: {
		item: Object,
		selected: Number,
	},
	emits: ['update:selected'],
	setup(props, { emit }) {
		// 分類編號
		const id = computed(() => {
			return props?.item?.id || 0;
		});

		// 分類名稱
		const name = computed(() => {
			return props?.item?.name || '';
		});

		// 分類圖示
		const icon = computed(() => {
			return props?.item?.icon || '';
		});

		// 是否高亮
		const highlight = computed(() => {
			return id.value === props?.selected;
		});

		// 點擊物件
		const clickItem = () => {
			emit('update:selected', id.value);
		};
		return {
			name,
			icon,
			highlight,
			clickItem,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-item {
	background: transparent;
	&.highlight {
		background: #ff7a00;
	}
}
</style>
