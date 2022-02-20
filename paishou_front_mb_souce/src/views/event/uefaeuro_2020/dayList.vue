<template lang="pug">
//- 日期列表
.flex.flex-row.flex-nowrap.items-center.overflow-x-auto(:class='$attrs.class')
    template(v-for='(item, index) in list')
        //- 分隔線
        .w-split.h-6.bg-split.flex-shrink-0(v-if='index > 0')

        //- 日期物件
        day-item.flex-shrink-0(:item='item', :selected='selected', @click='clickItem(item)')
</template>
<script>
import dayItem from '@/views/event/uefaeuro_2020/dayItem.vue'

export default {
    components: {
        dayItem,
    },
	props: {
		list: Array,
		selected: Object,
	},
	emits: ['update:selected'],
	setup(props, { emit }) {
        // 點擊日期
        const clickItem = (item) => {
            emit('update:selected', item)
        };
		return {
            clickItem,
		};
	},
};
</script>
<style lang="scss" scoped>
.w-split {
	width: 1.5px;
}
.bg-split {
	background: #c8c8c8;
}
</style>