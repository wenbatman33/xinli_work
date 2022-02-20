<template lang="pug">
//- 歡迎訊息
.msg.system-msg(v-if='method == "SendMsg" && action == 0')
	span.system-msg-icon 系统
	span 欢迎 
	span {{ userNiceName }}
	span  进入直播间

//- 離開訊息
.msg.system-msg(v-if='method == "SendMsg" && action != 0')
	span.system-msg-icon 系统
	span {{ userNiceName }}
	span 离开直播间

//- 禮物訊息
.msg.system-msg(v-if='method == "SendGift"')
	span.text-gift-uname {{ uname }}
	span.text-black.opacity-30.ml-2 打赏给主播
	span.text-black.opacity-30 {{ giftCount }}
	span.text-black.opacity-30 个
	span.text-black.opacity-30 {{ giftName }}
	img.w-10.h-10.ml-2.rounded.object-contain(:src='giftIcon', @error='errorGiftImg')

//- 管理員訊息
.msg.system-msg(v-if='method == "setAdmin"')
	span {{ ct }}

//- 關注訊息
.msg.system-msg(v-if='method == "setAttent"')
	span {{ ct }}

//- 禁言訊息
.msg.system-msg(v-if='method == "ShutUpUser"')
	span {{ ct }}

//- 踢出訊息
.msg.system-msg(v-if='method == "KickUser"')
	span {{ ct }}

//- 聊天訊息
.msg(v-if='method == "SendBarrage"', @click='clickMessage')
	img.level(:src='level', @error='errorLevelImg')
	span.font-bold.cursor-pointer.mr-2(:style='unameStyle') {{ uname }} 
	span(:style='msgStyle') {{ content }}

//- 貼圖訊息
.msg(v-if='method == "SendSticker"')
	img.level(:src='level', @error='errorLevelImg')
	span.font-bold.cursor-pointer.mr-2(:style='unameStyle') {{ uname }} 
	img.w-16.h-16.object-contain(:src='stickerIcon', @error='errorStickerImg')

//- 管理彈窗
manage-popup(v-model:show='state.showManagePopup', :item='item')
</template>
<script>
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { hostManage, adminManage } from '@/utils';
import managePopup from '@/components/room/managePopup.vue';

export default {
	components: {
		managePopup,
	},
	props: {
		item: Object,
	},
	setup(props) {
		// Vuex store
		const store = useStore();

		// Vue router
		const route = useRoute();

		// Component state
		const state = reactive({
			showManagePopup: false,
		});

		// 聊天訊息中的用戶 uid
		const uid = computed(() => {
			return props?.item?.uid || '';
		});

		// 訊息類別
		const method = computed(() => {
			return props?.item?._method_ || '';
		});

		// 訊息動作
		const action = computed(() => {
			return props?.item?.action || '';
		});

		// 用戶等級圖片
		const level = computed(() => {
			const levelId = props?.item?.level || 1;
			const levelList = store?.state?.config?.levelList || [];
			const levelItem = levelList.find((element) => element.levelid == levelId);
			return levelItem?.thumb || '';
		});

		// 訊息內容物件
		const ct = computed(() => {
			return props?.item?.ct || '';
		});

		// 系統訊息中的暱稱
		const userNiceName = computed(() => {
			return ct?.value?.user_nicename || '';
		});

		// 聊天訊息中的暱稱
		const uname = computed(() => {
			return props?.item?.uname || '';
		});

		// 聊天訊息中的暱稱樣式
		const unameStyle = computed(() => {
			return {
				color: props?.item?.userTypeColor || '',
			};
		});

		// 訊息內容
		const content = computed(() => {
			return ct?.value?.content || '';
		});

		// 聊天訊息樣式
		const msgStyle = computed(() => {
			return {
				color: props?.item?.msgColor || '#191919',
			};
		});

		// 禮物圖片
		const giftCount = computed(() => {
			return ct?.value?.giftcount || '';
		});

		// 禮物圖片
		const giftName = computed(() => {
			return ct?.value?.giftname || '';
		});

		// 禮物圖片
		const giftIcon = computed(() => {
			return ct?.value?.gifticon || '';
		});

		// 貼圖圖片
		const stickerIcon = computed(() => {
			const code = ct?.value?.code || '';
			const groups = store?.state?.config?.config?.sticker_group || [];
			const stickers = groups.flatMap((element) => element.stickers) || [];
			const sticker = stickers.find((element) => element.code === code) || {};
			return sticker.img || '';
		});

		// 等級圖片讀取失敗
		const errorLevelImg = (e) => {
			e.target.src = '/publicAssets/img/default-level@3x.png';
		};

		// 禮物圖片讀取失敗
		const errorGiftImg = (e) => {
			e.target.src = '/publicAssets/img/room/icon-gift-placeholder@3x.png';
		};

		// 貼圖圖示讀取失敗
		const errorStickerImg = (e) => {
			e.target.src = '/publicAssets/img/room/icon-sticker-placeholder@3x.png';
		};

		// 點擊聊天訊息
		const clickMessage = () => {
			// 歷史訊息禁止進行操作
			if (props?.item?.isHistory) {
				return;
			}

			// 主播/房管管理彈窗
			if (hostManage(uid.value, route.params.id) || adminManage(uid.value, route.params.id)) {
				state.showManagePopup = true;
			}
		};
		return {
			state,
			method,
			action,
			level,
			ct,
			userNiceName,
			uname,
			unameStyle,
			content,
			msgStyle,
            giftCount,
            giftName,
			giftIcon,
			stickerIcon,
			errorLevelImg,
			errorGiftImg,
			errorStickerImg,
			clickMessage,
		};
	},
};
</script>
<style lang="scss" scoped>
.msg {
	font-size: 16px;
	padding: 4.5px 1rem;
	margin: 2px 0;
	color: #575759;
	line-height: 18px;
}
.msg > * {
	vertical-align: middle;
}
.text-warning {
	color: #a62337;
}
.text-gift-uname {
	color: #70bbff;
}
.system-msg {
	background: #e0f8ff;
}
.system-msg-icon {
	font-size: 10px;
	padding: 2px 6px;
	border-radius: 12px;
	margin-right: 6px;
	color: #fff;
	background: linear-gradient(127deg, #0031d4 4%, #3f91ff 87%);
}
.level {
	width: 36px;
	height: 18px;
	margin-right: 4px;
	transform: scale(0.9);
}
</style>
