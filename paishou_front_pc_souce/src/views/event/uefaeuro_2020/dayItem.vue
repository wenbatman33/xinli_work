<template lang="pug">
//- 日期物件
a-button.w-auto.h-auto.px-4.py-6(type='link', @click='clickDay(item)')
    //- 日期內容
    .FLEX_C.items-center.text-day(:class='{ "selected": isSameSelected }')
        //- 星期
        .text-sm.font-bold {{ week }}

        //- 月日
        .text-base.font-date.font-bold.mt-1 {{ date }}
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
