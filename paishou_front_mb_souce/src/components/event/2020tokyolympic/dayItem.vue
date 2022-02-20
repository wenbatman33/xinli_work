<template lang="pug">
//- 日期物件
van-button.w-auto.h-auto.px-4.py-0.rounded-md.color-item.bg-transparent.border-transparent(@click='clickItem')
    //- 物件內容
    .flex.flex-col.items-center.text-item(:class='{ "highlight": highlight }')
        //- 星期
        .text-sm {{ weekOfDay }}

        //- 日期
        .text-lg.font-bold.mt-1 {{ dayOfMonth }}
</template>
<script>
import { computed } from 'vue';

export default {
    props: {
        item: Object,
        selected: Object,
    },
    emits: ['update:selected'],
	setup(props, { emit }) {
        // 高亮
        const highlight = computed(() => {
            return props.item.year() === props.selected.year() &&
                props.item.month() === props.selected.month() &&
                props.item.date() === props.selected.date();
        });

        // 星期
		const weekOfDay = computed(() => {
            const day = props?.item?.day() || '';
			switch (day) {
				case 0:
					return 'SUN';
				case 1:
					return 'MON';
				case 2:
					return 'TUE';
				case 3:
					return 'WED';
				case 4:
					return 'THU';
				case 5:
					return 'FRI';
				case 6:
					return 'SAT';
                default:
					return 'SUN';
			}
		});

        // 日期
        const dayOfMonth = computed(() => {
            return props?.item?.date() || '';
        });

        // 點擊日期
        const clickItem = () => {
            emit('update:selected', props?.item);
        };
        return {
            highlight,
            weekOfDay,
            dayOfMonth,
            clickItem,
        };
	},
};
</script>
<style lang="scss" scoped>
.text-item {
    color: rgba(255, 255, 255, 0.5);
    &.highlight {
        color: #FF7A00;
    }
}
</style>