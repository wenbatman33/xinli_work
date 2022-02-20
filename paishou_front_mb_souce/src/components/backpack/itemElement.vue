<template lang="pug">
//- 道具物件
van-button.item-element(@click='clickItem')
	.flex.flex-col
		.flex.flex-row.items-center.p-4
			//- 道具圖片
			img.h-14.w-14.flex-shrink-0.rounded-md.mr-4(:src='item.gifticon', @error='errorItemImg')

			//- 內容
			.flex.flex-col.flex-shrink
				//- 道具名稱
				.w-full.item-name.text-base.font-bold {{ item.giftname }}

				//- 道具說明
				.w-full.item-explain.text-sm {{ item.giftexplain }}

			//- 留白
			.flex-grow

			//- 道具數量
			.item-quantity.flex-shrink-0.text-sm.font-bold.break-all.ml-2 库存: {{ item.quantity > 999 ? "999+" : item.quantity }}

		//- 分隔線
		divider

//- 使用彈窗
van-popup(:show='state.isShowUsePopup', round, class='w-10/12 md:w-6/12', , teleport='.popupTeleport')
	.use-popup.px-4.py-8.flex.flex-col.items-center
		//- 道具圖示
		img.itemIcon.h-24.w-24.rounded-md(:src='item.gifticon', @error='errorItemImg')

		//- 道具名稱
		.item-name.text-lg.font-bold.mt-4 {{ item.giftname }}

		//- 道具說明
		.item-explain.text-xs.mt-2 {{ item.giftexplain }}

		//- 確認按鈕 / 取消按鈕
		confirm-cancel-button.mt-8(:loading='state.isPackageUsing', confirm-text='使用', cancel-text='取消', @click-confirm='clickUsePopupConfirm', @click-cancel='clickUsePopupCancel')

//- 獎勵彈窗
van-popup(:show='state.isShowBonusPopup', round, class='w-10/12 md:w-6/12', , teleport='.popupTeleport')
	.bonus-popup.px-4.py-8.flex.flex-col.items-center
		//- 道具名稱
		.title.text-base.font-bold 您获得

		//- 獎勵列表
		.w-full.mt-4
			.w-full.bonus-item.flex.flex-row.items-center.rounded-md.px-4.py-2.mt-2(v-for='item in state.bonusList')
				//- 獎勵圖示
				img.flex-shrink-0.w-8.h-8(:src='item.gifticon', @error='errorItemImg')

				//- 獎勵名稱
				.bonus-name.flex-shrink.text-base.font-bold.ml-4 {{ item.giftname }}

				//- 留白
				.flex-grow

				//- 獎勵數量
				.bonus-quantity.flex-shrink-0.text-xs.font-bold.h-4.px-2.ml-2.rounded-full {{ `x${item.quantity > 9999 ? "9999+" : item.quantity}` }}

		//- 關閉按鈕
		confirm-cancel-button.mt-8.px-12(confirm-text='关闭', @click-confirm='clickBonusConfirm')

//- 說明彈窗
van-popup(:show='state.isShowDescPopup', round, class='w-8/12 md:w-6/12', , teleport='.popupTeleport')
	.desc-popup.pt-8.pb-12.px-4.flex.flex-col.items-center
		//- 禮物圖片
		img.h-24.w-24.rounded-md(:src='item.gifticon', @error='errorItemImg')

		//- 道具名稱
		.item-name.text-lg.font-bold.mt-4 {{ item.giftname }}

		//- 道具說明
		.item-explain.text-sm.text-center.mt-2 {{ item.giftexplain }}

		//- 關閉按鈕
		confirm-cancel-button.mt-8.px-12(confirm-text='关闭', @click-confirm='clickDescClose')
</template>
<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { packageUse } from '@/api';
import { matomo_backpack_check_item, matomo_backpack_use_item } from '@/matomoTrackEvent.js';
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
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			isShowUsePopup: false,
			isShowBonusPopup: false,
			isShowDescPopup: false,
			isPackageUsing: false,
			bonusList: [],
		});

		// 禮物圖片讀取失敗
		const errorItemImg = (event) => {
			event.target.src = '/publicAssets/img/backpack/icon-gift-placeholder@3x.png';
		};

		// 點擊道具物件
		const clickItem = () => {
			// Show popup
			if (props?.item?.is_special === true) {
				state.isShowDescPopup = true;
			} else {
				state.isShowUsePopup = true;
			}

			// Matomo track
			matomo_backpack_check_item(props?.item?.giftname, props?.item?.id);
		};

		// 點擊使用彈窗確認按鈕
		const clickUsePopupConfirm = () => {
			// Update using state
			state.isPackageUsing = true;

			// Package use
			packageUse({ gift_id: props?.item?.id })
				.then((res) => {
					// Validate response code
					if (res.code === 0) {
						// Update bonus list
						state.bonusList = res.data.gift_list || [];
						state.bonusList.forEach((element) => {
							if (element.giftname === 'bcoin') {
								element.giftname = '蕉币';
								element.gifticon = '/publicAssets/img/coin.png';
							}
						});

						// Show bonus popup
						state.isShowBonusPopup = true;

						// Hide use popup
						state.isShowUsePopup = false;
					}

					// Revert using state on finished
					state.isPackageUsing = false;

					// Update backpack gift list
					store.dispatch('user/GET_BACKPACK_GIFT_LIST');

					// Update backpack item list
					store.dispatch('user/GET_BACKPACK_ITEM_LIST');

					// Update user info
					store.dispatch('user/GET_USER_INFO');
				})
				.catch(() => {
					// Revert using state on error
					state.isPackageUsing = false;
				});

			// Matomo track
			matomo_backpack_use_item(props?.item?.giftname, props?.item?.id);
		};

		// 點擊使用彈窗取消按鈕
		const clickUsePopupCancel = () => {
			state.isShowUsePopup = false;
		};

		// 點擊獎勵彈窗確認按鈕
		const clickBonusConfirm = () => {
			state.isShowBonusPopup = false;
		};

		// 點擊說明彈窗關閉按鈕
		const clickDescClose = () => {
			state.isShowDescPopup = false;
		};
		return {
			state,
			errorItemImg,
			clickItem,
			clickUsePopupConfirm,
			clickUsePopupCancel,
			clickBonusConfirm,
			clickDescClose,
		};
	},
};
</script>
<style lang="scss" scoped>
.item-element {
	width: 100%;
	height: unset;
	padding: 0;
	border: transparent;
	background-color: transparent;
	::v-deep(.van-button__content) {
		width: 100%;
	}
	::v-deep(.van-button__text) {
		width: 100%;
		text-align: start;
	}
	.item-name {
		color: #191919;
	}
	.item-quantity {
		color: #969696;
	}
	.item-explain {
		color: #969696;
	}
}
.use-popup {
	.item-name {
		color: #a62337;
	}
	.item-explain {
		color: #969696;
	}
}
.bonus-popup {
	.title {
		color: #a62337;
	}
	.bonus-item {
		border: 1px solid #f4f4f4;
	}
	.bonus-name {
		color: #191919;
	}
	.bonus-quantity {
		color: #969696;
	}
}
.desc-popup {
	.item-name {
		color: #a62337;
	}
	.item-explain {
		color: #909399;
	}
}
</style>