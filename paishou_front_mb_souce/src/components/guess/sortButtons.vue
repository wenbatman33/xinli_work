<template lang="pug">
//- 排序按鈕
.flex.flex-row.flex-nowrap.overflow-x-auto.bg-container.p-4
    //- 按鈕列表
    van-button.w-auto.h-auto.px-4.py-1.mr-2.rounded.shadow-button.bg-button.border-transparent.text-xs.text-button(v-for='item in buttonList', :class='item.classes', @click='clickButton(item)') {{ item.name }}
</template>
<script>
import { computed } from 'vue';

export default {
    props: {
        sort: String,
        order: String,
    },
    emits: ['update:sort', 'update:order'],
    setup(props, { emit }) {
        // 按鈕列表
        const buttonList = computed(() => {
            return [
                {
                    sort: 'amount',
                    name: '金额排序',
                    classes: {
                        'selected': props?.sort === 'amount',
                    },
                },
                {
                    sort: 'time',
                    name: '时间排序',
                    classes: {
                        'selected': props?.sort === 'time',
                    },
                },
            ];
        });

        // 點選按鈕
        const clickButton = (item) => {
            if (item.sort === props?.sort) {
                if (props?.order === 'asce') {
                    emit('update:order', 'desc');
                } else {
                    emit('update:order', 'asce');
                }
            } else {
                emit('update:sort', item.sort);
            }
        };
        return {
            buttonList,
            clickButton,
        };
    },
};
</script>
<style lang="scss" scoped>
.bg-container {
    background: #FBFBFB;
}
.shadow-button {
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
}
.bg-button {
    background: #ffffff;
    &.selected {
        background: #F2994A;
    }
}
.text-button {
    color: #191919;
    &.selected {
        color: #ffffff;
    }
}
</style>