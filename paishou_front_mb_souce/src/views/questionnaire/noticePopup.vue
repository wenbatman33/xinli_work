<template lang="pug">
//- 注意事項彈窗
van-popup(:show='show', class='w-10/12 md:w-1/2', round, @click-overlay='clickOverlay')
    //- 彈窗內容
    .flex.flex-col.items-center.px-6.py-12
        //- 標題
        .text-lg.text-title.font-bold 注意事項

        //- 內容
        .text-base.text-content.mt-6
            span 1.限每个用户领取一次优惠，不可重复领取
            br
            span 2.拍手直播有权利提早或终止活动，若提前截止，会提早公告。活动过程中如有发现违规行为，我方有权取消此行为的用户参予活动资格，并扣除本活动所获得奖励。
</template>
<script>
export default {
    props: {
        show: Boolean,
    },
    emits: ['update:show'],
    setup(props, { emit }) {
        // 點擊遮罩層
        const clickOverlay = () => {
            emit('update:show', false);
        };
        return {
            clickOverlay,
        }
    }
}
</script>
<style lang="scss" scoped>
.text-title {
    color: #A62337;
}
.text-content {
    color: #969696;
}
</style>