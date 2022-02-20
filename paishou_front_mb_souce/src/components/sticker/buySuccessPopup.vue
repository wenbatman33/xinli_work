<template lang="pug">
//- 貼圖購買成功彈窗
van-popup(:show='show', round, class='w-10/12 md:w-1/2', @click-overlay='clickOverlay')
    //- 彈窗內容
    .flex.flex-col.items-center.bg-white.p-6
        //- 圖示
        img.w-20.h-20.object-contain(:src='icon', @error='errorIconImg')

        //- 名稱
        .text-base.text-title.font-bold.mt-3 {{ name }}

        //- 方案名稱
        .text-sm.text-program.font-bold.mt-4
            span {{ day }}
            span 天使用权

        //- 到期日
        .text-xs.text-expired.mt-3 {{ expiredTime }}

        //- 關閉
        van-button.w-auto.h-auto.px-8.py-2.mt-8.rounded-full.shadow-close.bg-white.border-transparent(@click='clickClose')
            .text-sm.text-close 取消
</template>
<script>
import { computed } from 'vue';
import dayjs from 'dayjs';

export default {
	props: {
		item: Object,
		show: Boolean,
		buyingProgram: Object,
		successObject: Object,
	},
	emits: ['update:show'],
	setup(props, { emit }) {
		// 貼圖列表
		const stickers = computed(() => {
			return props?.item?.stickers || [];
		});

		// 貼圖圖示
		const icon = computed(() => {
			const firstSticker = stickers.value[0] || {};
			return firstSticker.img || '';
		});

		// 貼圖名稱
		const name = computed(() => {
			return props?.item?.name || '';
		});

		// 方案天數
		const day = computed(() => {
			return props?.buyingProgram?.day || 0;
		});

		// 過期時間格式化字串
		const expiredTime = computed(() => {
			const expiredTimeStr = props?.successObject?.expire_time || '';
			try {
				return dayjs(expiredTimeStr, 'YYYY-MM-DD HH:mm:ss', 'zh-cn').format('YYYY年MM月DD日到期');
			} catch (e) {
				return `${expiredTimeStr}到期`;
			}
		});

		// 貼圖圖示讀取失敗
		const errorIconImg = (e) => {
			e.target.src = '/publicAssets/img/sticker/icon-sticker-placeholder@3x.png';
		};

		// 點擊遮罩層
		const clickOverlay = () => {
			emit('update:show', false);
		};

		// 點擊遮取消
		const clickClose = () => {
			emit('update:show', false);
		};
		return {
			icon,
			name,
			day,
			expiredTime,
			errorIconImg,
			clickOverlay,
			clickClose,
		};
	},
};
</script>
<style lang="scss" scoped>
.text-name {
	color: #a62337;
}
.text-program {
	color: #969696;
}
.text-expired {
	color: #969696;
}
.shadow-close {
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
}
.text-close {
	color: #a62337;
}
</style>
