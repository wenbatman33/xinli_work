<template lang="pug">
//- 活動規則
.w-full.flex.flex-col.items-stretch.justify-between
    //- 導覽欄
    nav-bar(back, close)

    //- 頁面內容
    .flex.flex-col.flex-grow.items-stretch.py-6
        //- 廣告圖片
        img(src='/publicAssets/img/event/send_phone/littlebanner@3x.png')

        //- 活動說明
        .text-base.text-white.font-bold.mt-8 活动说明

        //- 說明內容
        .text-sm.text-white.mt-4
            span 拍手全新改版,只要下载拍手登入免费获得转盘机会一次!
            br
            span 大奖OPPO Find X3 Pro等你入手
            br
            span ＊不限装置,指定日期后第一次登入即可获得转盘机会一次

        //- 注意事項
        .text-base.text-white.font-bold.mt-8 注意事项

        //- 事項內容
        .text-sm.text-white.mt-4
            span 1.用户账号注册限一次优惠，不可重复领取
            br
            span 2.拍手直播有权利提早或终止活动，若提前截止，会提早公告。活动过程中如有发现违规行为，我方有权取消此行为的用户参予活动资格，并扣除本活动所获得奖励。

    //- 版權聲明
    copyright
</template>
<script>
import navBar from '@/views/event/send_phone/navBar.vue';
import copyright from '@/views/event/send_phone/copyright.vue';

export default {
    components: {
        navBar,
        copyright,
    },
};
</script>