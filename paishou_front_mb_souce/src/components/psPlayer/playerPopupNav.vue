<template lang="pug">
//- 彈窗導覽欄
.flex.flex-col
    //- 導覽欄內容
    .flex.flex-row.items-center.pr-3.pt-8.pb-2(:class='{ "pl-3": leftButton, "pl-4": !leftButton }')
        //- 左側按鈕
        van-button.nav-button.rounded-full.mr-2(v-if='leftButton', @click='clickLeft')
            .p-1
                img.w-5.h-5(:src='leftButton')

        //- 標題
        .title.flex-grow.text-base.font-bold {{ title }}

        //- 右側按鈕
        van-button.nav-button.rounded-full.ml-2(v-if='rightButton', @click='clickRight')
            .p-1
                img.w-5.h-5(:src='rightButton')

    //- 下分隔線
    divider
</template>
<script>
import divider from '@/components/divider';

export default {
	components: {
		divider,
	},
    props: {
        title: String,
        leftButton: String,
        rightButton: String,
    },
    emits: ['click-left', 'click-right'],
    setup(props, { emit }) {
        // 點擊左側按鈕
        const clickLeft = (e) => {
            emit('click-left', e);
        };

        // 點擊右側按鈕
        const clickRight = (e) => {
            emit('click-right', e);
        };
        return {
            clickLeft,
            clickRight,
        };
    },
};
</script>
<style lang="scss" scoped>
.title {
    color: #303133;
}
.nav-button {
    width: unset;
    height: unset;
    padding: unset;
    border: transparent;
    background: transparent;
}
</style>