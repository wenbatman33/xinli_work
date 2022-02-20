<template lang="pug">
//- 競猜下注成功彈窗
van-popup.w-full.bg-transparent(:show='show', teleport='.popupTeleport', @click-overlay='clickOverlay')
    .flex.flex-col.items-stretch.px-4
        //- 撕票圖
        .h-4.bg-ticket-top

        //- 內容
        .flex.flex-col.items-center.bg-white.px-6.pt-12.pb-8
            //- 打勾圖片
            img.w-20.h-20(src='/publicAssets/img/room/icon-check@3x.png')

            //- 標題
            .text-xl.text-title.font-bold.mt-8 下注成功

            //- 內容
            .text-sm.text-content.mt-2 您可以继续下注或者查看竞猜明细

            //- 按鈕
            .w-full.grid.grid-cols-2.gap-4.mt-12
                //- 查看明細
                van-button.w-full.h-auto.p-2.rounded.bg-transparent.border-detail(@click='clickDetail')
                    .text-base.text-detail.font-bold 查看明细

                //- 關閉
                van-button.w-full.h-auto.p-2.rounded.bg-again.border-transparent(@click='clickClose')
                    .text-base.text-white.font-bold 关闭

        //- 撕票圖
        .h-4.bg-ticket-bottom
</template>
<script>
import { useRouter } from 'vue-router';
import { matomo_room_check_guessDetail } from '@/matomoTrackEvent.js';

export default {
	props: {
		item: Object,
		show: Boolean,
	},
	emits: ['update:show'],
	setup(props, { emit }) {
		// Vue router
		const router = useRouter();

		// 點擊遮罩層
		const clickOverlay = () => {
			emit('update:show', false);
		};

		// 點擊查看明細
		const clickDetail = () => {
			// Navigate
			router.push('/guesshistory');

			// Matomo track
			matomo_room_check_guessDetail(props?.item?.id);
		};

		// 點擊關閉
		const clickClose = () => {
			// Hide success popup
			emit('update:show', false);
		};
		return {
			clickOverlay,
			clickDetail,
			clickClose,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-ticket-top {
	background-size: contain;
	background-repeat: repeat-x;
	background-position-y: bottom;
	background-image: url('/publicAssets/img/room/icon-ticket-top@3x.png');
}
.bg-ticket-bottom {
	background-size: contain;
	background-repeat: repeat-x;
	background-position-y: top;
	background-image: url('/publicAssets/img/room/icon-ticket-bottom@3x.png');
}
.text-title {
	color: #a62337;
}
.text-content {
	color: #7d7d7d;
}
.border-detail {
	border: 1px solid #a62337;
}
.text-detail {
	color: #a62337;
}
.bg-again {
	background: linear-gradient(90deg, #a62337 0%, #d10828 100%);
}
</style>
