<template lang="pug">
//- 禮物物件
van-button.gift-element(@click='clickGift')
	.flex.flex-col
		.flex.flex-row.items-center.p-4
			//- 禮物圖片
			img.h-14.w-14.flex-shrink-0.rounded-md.mr-4(:src='item.gifticon', @error='errorGiftImg')

			//- 內容
			.flex.flex-col.flex-shrink
				.w-full.flex.flex-row.items-center
					//- 禮物名稱
					.gift-name.text-base.font-bold {{ item.giftname }}

					//- 蕉幣圖示
					img.flex-shrink-0.w-4.h-4.ml-2(src='/publicAssets/img/coin.png')

					//- 禮物價值
					.gift-coin.flex-shrink-0.text-sm.break-all.ml-1 {{ formatNeedCoin(item.needcoin) }}

				//- 禮物說明
				.w-full.gift-explain.text-sm {{ item.giftexplain }}

			//- 留白
			.flex-grow

			//- 禮物數量
			.gift-quantity.flex-shrink-0.text-sm.font-bold.break-all.ml-2 库存: {{ item.quantity > 999 ? "999+" : item.quantity }}

		//- 分隔線
		divider

//- 說明彈窗
van-popup(:show='state.isShowDescPopup', round, class='w-8/12 md:w-6/12', teleport='.popupTeleport')
	.desc-popup.pt-8.pb-12.px-4.flex.flex-col.items-center
		//- 禮物圖片
		img.h-24.w-24.rounded-md(:src='item.gifticon', @error='errorGiftImg')

		//- 禮物名稱
		.gift-name.text-lg.font-bold.mt-4 {{ item.giftname }}

		//- 禮物說明
		.gift-explain.text-sm.text-center.mt-2 {{ item.giftexplain }}

		//- 關閉按鈕
		confirm-cancel-button.mt-8.px-12(confirm-text='关闭', @click-confirm='clickDescPopupClose')
</template>
<script>
import { reactive } from 'vue';
import { commaFormat } from '@/utils';
import { matomo_backpack_check_gift } from '@/matomoTrackEvent.js';
import divider from '@/components/divider';
import confirmCancelButton from '@/components/confirmCancelButton';

export default {
	components: {
		divider,
		confirmCancelButton,
	},
	props: {
		item: Object,
	},
	setup(props) {
		// Component state
		const state = reactive({
			number: 0,
			isShowDescPopup: false,
		});

		// 格式化禮物價值
		const formatNeedCoin = (needcoin) => {
			try {
				return commaFormat(needcoin || '0');
			} catch (e) {
				return needcoin;
			}
		};

		// 禮物圖片讀取失敗
		const errorGiftImg = (e) => {
			e.target.src = '/publicAssets/img/backpack/icon-gift-placeholder@3x.png';
		};

		// 點擊禮物物件
		const clickGift = () => {
			// Show popup
			state.isShowDescPopup = true;

			// Matomo track
			matomo_backpack_check_gift(props?.item?.giftname, props?.item?.id);
		};

		// 點擊說明彈窗關閉按鈕
		const clickDescPopupClose = () => {
			state.isShowDescPopup = false;
		};
		return {
			state,
			formatNeedCoin,
			errorGiftImg,
			clickGift,
			clickDescPopupClose,
		};
	},
};
</script>
<style lang="scss" scoped>
.gift-element {
	width: 100%;
	height: unset;
	padding: 0;
	border: transparent;
	background: transparent;
	::v-deep(.van-button__content) {
		width: 100%;
	}
	::v-deep(.van-button__text) {
		width: 100%;
		text-align: start;
	}
	.gift-name {
		color: #191919;
	}
	.gift-coin {
		color: #f8b62d;
	}
	.gift-explain {
		color: #969696;
	}
	.gift-quantity {
		color: #969696;
	}
}
.use-popup {
	::v-deep(.van-van-stepper__minus) {
		color: #ffffff;
		border: 1px solid #f8b62d;
		background-color: #f8b62d;
	}
	::v-deep(.van-stepper__plus) {
		background-color: #f8b62d;
	}
	::v-deep(.van-stepper__input) {
		color: #8e8e93;
		font-size: 1.25rem;
		font-weight: bold;
		margin-left: 1rem;
		margin-right: 1rem;
	}
	.close-button {
		width: unset;
		height: unset;
		padding: 0;
		border: transparent;
		background: transparent;
	}
	.gift-name {
		color: #a62337;
	}
	.quantity {
		color: #8e8e93;
	}
	.number {
		color: #8e8e93;
	}
}
.desc-popup {
	.gift-name {
		color: #a62337;
	}
	.gift-explain {
		color: #909399;
	}
}
</style>