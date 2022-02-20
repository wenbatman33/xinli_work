<template lang="pug">
//- 日期物件
van-button.w-auto.h-auto.px-4.py-2.rounded.bg-transparent.border-transparent(@click='clickDay(item)')
    //- 日期內容
    .flex.flex-col.items-center.text-day(:class='{ "selected": isSameSelected }')
        //- 星期
        .text-xs.font-bold {{ week }}

        //- 月日
        .text-sm.font-date.mt-1 {{ date }}
</template>
<script>
import { computed } from 'vue';

export default {
	props: {
		item: Object,
		selected: Object,
	},
	emits: ['click'],
	setup(props, { emit }) {
        // 是否與選擇的日期相同
        const isSameSelected = computed(() => {
			try {
                return props?.item?.isSame(props?.selected);
			} catch (e) {
				return false;
			}
        });

		// 星期
		const week = computed(() => {
			try {
				return (props?.item?.format('ddd') || '').toUpperCase();
			} catch (e) {
				return '-';
			}
		});

		// 月日
		const date = computed(() => {
			try {
				return props?.item?.format('MM/DD') || '';
			} catch (e) {
				return '-';
			}
		});

		// 點擊日期
		const clickDay = () => {
			emit('click');
		};
		return {
            isSameSelected,
            week,
            date,
			clickDay,
		};
	},
};
</script>
<style lang="scss" scoped>
.text-day {
	color: #c8c8c8;
	&.selected {
		color: #ffffff;
	}
}
.font-date {
	font-weight: 900;
}
</style>
