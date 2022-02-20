<template lang="pug">
//- 活動規則
.FLEX_C.items-center.overflow-hidden.px-12
    //- 規則卡片
    .max-w-900.grid.grid-cols-2
        //- 活動規則
        .FLEX_C.justify-center.w-full.h-full.px-12.py-4.bg-white.rounded-l-lg
            //- 活動說明
            .text-xl.text-title.font-bold 活动说明

            //- 說明內容
            .text-sm.text-conten.leading-6.mt-4
                span 拍手全新改版,只要下载拍手登入免费获得转盘机会一次!
                br
                span 大奖OPPO Find X3 Pro等你入手
                br
                span ＊不限装置,指定日期后第一次登入即可获得转盘机会一次

            //- 注意事項
            .text-xl.text-title.font-bold.mt-16 注意事项

            //- 事項內容
            .text-sm.text-content.leading-6.mt-4
                span 1.用户账号注册限一次优惠，不可重复领取
                br
                span 2.拍手直播有权利提早或终止活动，若提前截止，会提早公告。活动过程中如有发现违规行为，我方有权取消此行为的用户参予活动资格，并扣除本活动所获得奖励。

        //- 廣告圖片
        .w-full.h-full.FLEX_R.items-center
            img.w-full.rounded-r-lg(src='/publicAssets/img/event/send_phone/littlebg@3x.png')
</template>
<style scoped>
.max-w-900 {
	max-width: 900px;
}
.text-title {
	color: #a62337;
}
.text-content {
	color: #191919;
}
</style>
