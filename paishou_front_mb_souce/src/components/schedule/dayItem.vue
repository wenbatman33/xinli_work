<template lang="pug">
//- 日期物件
van-button.w-auto.h-auto.p-0.rounded-md.color-item.bg-item.border-transparent(:class='{ "highlight": highlight }', @click='clickItem')
    //- 物件內容
    .flex.flex-col.items-center.py-2(class='px-2.5')
        //- 星期
        .text-xs {{ weekOfDay }}

        //- 日期
        .text-base.font-bold.mt-1 {{ dayOfMonth }}
</template>
<script>
import { computed } from 'vue';
import { matomo_schedule_check_date } from '@/matomoTrackEvent.js';

export default {
	props: {
        path: String,
		item: Object,
        selectedDate: Object,
	},
    emits: ['update:selected-date'],
	setup(props, { emit }) {
        // 高亮
        const highlight = computed(() => {
            return props.item.year() === props.selectedDate.year() &&
                props.item.month() === props.selectedDate.month() &&
                props.item.date() === props.selectedDate.date();
        });

        // 星期
		const weekOfDay = computed(() => {
            const day = props?.item?.day() || '';
			switch (day) {
				case 0:
					return '日';
				case 1:
					return '一';
				case 2:
					return '二';
				case 3:
					return '三';
				case 4:
					return '四';
				case 5:
					return '五';
				case 6:
					return '六';
                default:
					return '日';
			}
		});

        // 日期
        const dayOfMonth = computed(() => {
            return props?.item?.date() || '';
        });

        // 點擊日期
        const clickItem = () => {
            // Emit date selected
            emit('update:selected-date', props?.item);

            // Matomo track
            if (/^\/schedule\/collaboration\//.test(props.path)) {
				const collaborationName = props.path.replace(/^\/schedule\/collaboration\//, '');
				matomo_schedule_check_date(`賽程-${collaborationName}`);
			} else if (/^\/schedule\/class\//.test(props.path)) {
				const className = props.path.replace(/^\/schedule\/class\//, '');
				matomo_schedule_check_date(`賽程-${className}`);
			}
        };
        return {
            highlight,
            weekOfDay,
            dayOfMonth,
            clickItem,
        }
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.van-button__content) {
    width: 100%;
}
::v-deep(.van-button__text) {
    width: 100%;
}
.bg-item {
    background: transparent;
    &.highlight {
        background: #a62337;
    }
}
.color-item {
    color: #646464;
    &.highlight {
        color: #ffffff;
    }
}
</style>
