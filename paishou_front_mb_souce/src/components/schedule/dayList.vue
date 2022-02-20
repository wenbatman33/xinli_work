<template lang="pug">
//- 賽事日期選擇
.flex.flex-row.justify-between.items-center.overflow-x-auto.mx-4
    //- 日期列表
    day-item(
        v-for='item in dayList'
        :path='path'
        :item='item'
        :selected-date='selectedDate'
        @update:selected-date='updateSelectedDate'
    )
</template>
<script>
import { computed } from 'vue';
import dayItem from '@/components/schedule/dayItem.vue';
import dayjs from 'dayjs';

export default {
    components: {
        dayItem,
    },
    props: {
        path: String,
        selectedDate: Object,
        selectedCollaboration: Object,
    },
    emits: ['update:selected-date'],
    setup(props, { emit }) {
        // 日期列表
        const dayList = computed(() => {
            // Construct variables
            const list = [];
            const now = dayjs();

            // Compute init date and item count
            var init, count;
            if (props?.selectedCollaboration) {
                const startTimeStr = props?.selectedCollaboration?.start || '';
				const startTime = dayjs(startTimeStr, 'YYYY-MM-DD HH:mm:ss', 'zh-cn');
				const endTimeStr = props?.selectedCollaboration?.end || '';
				const endTime = dayjs(endTimeStr, 'YYYY-MM-DD HH:mm:ss', 'zh-cn');
                if (now.isBetween(startTime, endTime)) {
                    init = now;
                } else {
                    init = startTime;
                }
                const diffHours = endTime.diff(init, 'hour');
                if (diffHours < (24 * 7)) {
                    count = Math.ceil(diffHours / 24);
                } else {
                    count = 7;
                }
            } else {
                init = now;
                count = 7;
            }

            // Generate day items
            for (var i = 0; i < count; i++) {
                const day = init.add(i, 'd');
                list.push(day);
            }
            return list;
        });

        // 更新選擇的日期
        const updateSelectedDate = (selected) => {
            emit('update:selected-date', selected);
        };
        return {
            dayList,
            updateSelectedDate,
        }
    }
}
</script>