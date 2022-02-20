<template lang="pug">
//- 更多彈窗
van-popup.more-popup(:show='show', round, position='bottom', teleport='.popupTeleport', @update:show='updateShow')
    //- 導覽欄
    player-popup-nav(title='更多', right-button='/publicAssets/img/icon-close-gray@3x.png', @click-right='clickRight')

    //- 主選單
    .flex.flex-col.items-stretch.pb-6
        //- 舉報
        van-button.transparent-button(@click='clickReport')
            .flex.flex-row.justify-between.items-center.px-4.py-4
                .text-base.font-bold 举报
                img.w-6.h-6(src='/publicAssets/img/room/right@3x.png')
        divider
</template>
<script>
import { Notify } from 'vant';
import divider from '@/components/divider';
import playerPopupNav from '@/components/psPlayer/playerPopupNav.vue';

export default {
	components: {
		divider,
		playerPopupNav,
	},
	props: {
		show: Boolean,
	},
	emits: ['update:show'],
	setup(props, { emit }) {
		// 更新顯示狀態
		const updateShow = (value) => {
			emit('update:show', value);
		};

		// 點擊右側按鈕
		const clickRight = () => {
			emit('update:show', false);
		};

		// 點擊舉報
		const clickReport = () => {
			Notify({ type: 'warning', message: '举报功能尚未开放' });
		};
		return {
			updateShow,
			clickRight,
			clickReport,
		};
	},
};
</script>
<style lang="scss" scoped>
.more-popup {
	.transparent-button {
		width: 100%;
		height: unset;
		padding: 0;
		color: #303133;
		border: transparent;
		background: transparent;
		::v-deep(.van-button__content) {
			width: 100%;
		}
		::v-deep(.van-button__text) {
			width: 100%;
			text-align: start;
		}
	}
}
</style>
