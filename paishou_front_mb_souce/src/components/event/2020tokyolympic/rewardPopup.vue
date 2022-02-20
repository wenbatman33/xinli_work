<template lang="pug">
//- 轉盤獎項彈窗
van-popup(:show='show', round, class='w-10/12 md:w-1/2', teleport='.popupTeleport')
    //- 彈窗內容
    .flex.flex-col.items-center.px-10.py-12
        //- 標題
        .text-title.text-base.font-bold 您获得

        //- 紅包圖示
        img.w-14.h-auto.mt-4.object-contain(src='/publicAssets/img/event/2020tokyolympic/icon-redpack@3x.png')

        //- 獎項名稱
        .text-name.text-base.font-bold.mt-3 {{ name }}

        //- 說明
        .text-description.text-sm.text-center.mt-3
            span 提醒您!中奖后需即时找小助手登记领取唷！若未及时领取需至隔日才可再玩转盘抽奖。

        //- 立即領取
        van-button.w-auto.h-auto.px-5.py-2.mt-8.rounded-full.shadow-reward.bg-transparent.border-transparent(id='CTA_Button_2', @click='clickReward')
            .text-reward.text-sm.font-bold 立即领取
</template>
<script>
export default {
    props: {
        name: String,
        show: Boolean,
    },
    emits: ['update:show'],
    setup(props, { emit }) {
        // 點擊立即領取
        const clickReward = () => {
            window.LiveChatWidget.call('maximize');
            emit('update:show', false);
        };
        return {
            clickReward,
        };
    },
};
</script>
<style lang="scss" scoped>
.text-title {
    color: #A62337;
}
.text-name {
    color: #A62337;
}
.text-description {
    color: #969696;
}
.shadow-reward {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
}
.text-reward {
    color: #A62337;   
}
</style>