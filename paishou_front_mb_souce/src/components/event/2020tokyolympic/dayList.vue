<template lang="pug">
//- 賽事日期列表
.flex.flex-row.justify-between.items-center.overflow-x-auto.mx-2
    //- 遍歷日期列表
    template(v-for='(item, index) in list')
        //- 賽事日期物件
        day-item.flex-shrink-0(
            :item='item'
            :selected='selected'
            @update:selected='updateSelected'
        )

        //- 分隔線
        .flex-shrink-0.w-split.h-6.bg-split(v-if='index < list.length - 1')
</template>
<script>
import dayItem from '@/components/event/2020tokyolympic/dayItem.vue';

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
		// 更新選擇的日期
		const updateSelected = (selected) => {
			emit('update:selected', selected);
		};
		return {
			updateSelected,
		};
	},
};
</script>
<style lang="scss" scoped>
.w-split {
    width: 1px;
}
.bg-split {
    background: rgba(255, 255, 255, 0.5);
}
</style>