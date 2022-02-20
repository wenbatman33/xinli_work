<template lang="pug">
//- 訊息輸入框
.flex.flex-col.items-stretch.shadow.pb-message-field
	//- 分隔線
	divider
	
	//- 香蕉
	.grid.grid-cols-banana.gap-2.px-4.py-2
		//- 香蕉數量
		.flex.flex-row.items-center.pr-2
			img.w-4.h-4(src='/publicAssets/img/banana.png')
			.text-xs.text-banana.font-bold.ml-1 {{ banana }}

		//- 1個
		van-button.w-full.h-auto.p-2.shadow-send-banana.bg-transparent.border-transparent(:disabled='sendBananaDisalbed', @click='clickSendBanana(1)')
			.text-xs.text-send 1

		//- 10個
		van-button.w-full.h-auto.p-2.shadow-send-banana.bg-transparent.border-transparent(:disabled='sendBananaDisalbed', @click='clickSendBanana(10)')
			.text-xs.text-send 10

		//- 50個
		van-button.w-full.h-auto.p-2.shadow-send-banana.bg-transparent.border-transparent(:disabled='sendBananaDisalbed', @click='clickSendBanana(50)')
			.text-xs.text-send 50

		//- 99個
		van-button.w-full.h-auto.p-2.shadow-send-banana.bg-transparent.border-transparent(:disabled='sendBananaDisalbed', @click='clickSendBanana(99)')
			.text-xs.text-send 99

	//- 分隔線
	divider

	//- 輸入框及按鈕
	.grid.grid-cols-field.px-4.py-2
		//- 鎖定
		van-button.w-auto.h-auto.pl-0.pr-0.bg-transparent.border-transparent(@click='clickLock')
			img.w-6.h-6(v-if='autoScroll', src='/publicAssets/img/room/icon-lock-open@3x.png')
			img.w-6.h-6(v-else, src='/publicAssets/img/room/icon-lock@3x.png')

		//- 清除
		van-button.w-auto.h-auto.pl-1.pr-2.bg-transparent.border-transparent(@click='clickDelete')
			img.w-6.h-6(src='/publicAssets/img/room/icon-delete@3x.png')

		//- 輸入框
		van-field(v-model='state.message', placeholder='一起加入聊聊天吧！')

		//- 顏色
		van-button.w-auto.h-auto.pl-2.pr-0.bg-transparent.border-palette(@click='clickPalette')
			img.w-6.h-6(src='/publicAssets/img/room/icon-palette@3x.png')

		//- 鍵盤
		van-button.w-auto.h-auto.pl-1.pr-2.bg-transparent.border-palette(v-if='state.showStickerSelector', @click='clickKeyboard')
			img.w-6.h-6(src='/publicAssets/img/room/icon-keyboard@3x.png')

		//- 貼圖
		van-button.w-auto.h-auto.pl-1.pr-2.bg-transparent.border-palette(v-else, @click='clickSticker')
			img.w-6.h-6(src='/publicAssets/img/room/icon-sticker@3x.png')

		//- 提交
		van-button.w-auto.h-auto.px-4.rounded-submit.bg-submit.border-transparent(:loading='submitLoading', :disabled='submitDisabled', @click='clickSubmit')
			.text-xs.text-white 提交

		//- 間距
		.bg-transparent

		//- 禮物
		van-button.w-auto.h-auto.px-4.shadow-gift.bg-transparent.border-transparent(@click='clickGift')
			img.w-4.h-4(src='/publicAssets/img/room/icon-gift@3x.png')

	//- 顏色列表
	color-list(v-model:show='state.showColorSelector', v-model:selected='state.selectedColor')

	//- 貼圖列表
	sticker-tabs(v-model:show='state.showStickerSelector')

//- 送禮彈窗
gift-popup(v-model:show='state.showGiftPopup')
</template>
<script>
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { Notify } from 'vant';
import { commaFormat, selectedMsgColor } from '@/utils';
import { matomo_room_chat_send, matomo_room_clearMessage, matomo_room_lockMessage } from '@/matomoTrackEvent.js';
import divider from '@/components/divider';
import colorList from '@/components/room/colorList.vue';
import giftPopup from '@/components/room/giftPopup.vue';
import stickerTabs from '@/components/room/stickerTabs.vue';

export default {
	components: {
		divider,
		colorList,
		giftPopup,
		stickerTabs,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const route = useRoute();

		// Component state
		const state = reactive({
			message: '',
			showGiftPopup: false,
			showColorSelector: false,
			showStickerSelector: false,
			selectedColor: selectedMsgColor(),
		});

		// 是否為直播主本人
		const isSelfHost = computed(() => {
			return store?.state?.user?.uid == route.params.id;
		});

		// 香蕉數量
		const banana = computed(() => {
			try {
				return commaFormat(store?.state?.user?.userInfo?.banana || 0);
			} catch (e) {
				return store?.state?.user?.userInfo?.banana || 0;
			}
		});

		// 是否禁用送香蕉按鈕
		const sendBananaDisalbed = computed(() => {
			return store?.state?.socket?.sendGiftLoading === true;
		});

		// 是否自動捲動
		const autoScroll = computed(() => {
			return store?.state?.socket?.autoScroll === true;
		});

		// 提交彈幕按鈕讀取中
		const submitLoading = computed(() => {
			return store?.state?.socket?.sendBarrageLoading === true;
		});

		// 是否禁用提交彈幕按鈕
		const submitDisabled = computed(() => {
			return !state.message || state.message.length === 0;
		});

		// 點擊送香蕉
		const clickSendBanana = (count) => {
			if (isSelfHost.value) {
				Notify({ type: 'warning', message: '无法送礼物给自己' });
				return;
			}
			store.dispatch('socket/SEND_GIFT', {
				id: 720892,
				count: count,
			});
		};

		// 點擊鎖定按鈕
		const clickLock = () => {
			// Commit lock flag
			store.commit('socket/SET_AUTO_SCROLL', !autoScroll.value);

			// Matomo track
			matomo_room_lockMessage();
		};

		// 點擊清除按鈕
		const clickDelete = () => {
			// Commit clear messages
			store.commit('socket/CLEAR_MSG');

			// Matomo track
			matomo_room_clearMessage();
		};

		// 點擊調色盤按鈕
		const clickPalette = () => {
			state.showStickerSelector = false;
			state.showColorSelector = !state.showColorSelector;
		};

		// 點擊鍵盤按鈕
		const clickKeyboard = () => {
			state.showStickerSelector = false;
		};

		// 點擊貼圖按鈕
		const clickSticker = () => {
			state.showColorSelector = false;
			state.showStickerSelector = true;
		};

		// 點擊提交彈幕按鈕
		const clickSubmit = () => {
			store.dispatch('socket/SEND_BARRAGE', state.message);
			state.message = '';
			matomo_room_chat_send();
		};

		// 點擊禮物按鈕
		const clickGift = () => {
			if (isSelfHost.value) {
				Notify({ type: 'warning', message: '无法送礼物给自己' });
				return;
			}
			state.showGiftPopup = true;
		};
		return {
			state,
			banana,
			sendBananaDisalbed,
			autoScroll,
			submitLoading,
			submitDisabled,
			clickSendBanana,
			clickLock,
			clickDelete,
			clickPalette,
			clickKeyboard,
			clickSticker,
			clickSubmit,
			clickGift,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.van-cell) {
	padding: 9px 12px;
	font-size: 12px;
	line-height: 12px;
	color: #969696;
	border-style: solid;
	border-color: #e1e1e1;
	border-width: 1px 0px 1px 1px;
	border-radius: 4px 0px 0px 4px;
}
.pb-message-field {
	margin-bottom: env(safe-area-inset-bottom);
}
.grid-cols-banana {
	grid-template-columns: auto 1fr 1fr 1fr 1fr;
}
.text-banana {
	color: #f8b62d;
}
.shadow-send-banana {
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
}
.text-send-banana {
	color: #969696;
}
.grid-cols-field {
	grid-template-columns: auto auto 1fr auto auto auto 16px auto;
}
.border-palette {
	border-style: solid;
	border-color: #e1e1e1;
	border-width: 1px 0px 1px 0px;
	border-radius: 0px;
}
.rounded-submit {
	border-radius: 0px 4px 4px 0px;
}
.bg-submit {
	background: #a62337;
}
.shadow-gift {
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
}
</style>
