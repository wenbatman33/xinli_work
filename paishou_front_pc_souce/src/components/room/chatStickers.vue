<template lang="pug">
a-popover(placement='top', trigger='click', v-model:visible='state.stickersVisible')
	a-tooltip(placement='top')
		template(#title) 
			.text-xs 表情贴图
		img.cursor-pointer.w-8.mx-1(src='/publicAssets/img/v3/icon-happy-2-g.png' , srcset='/publicAssets/img/v3/icon-happy-2-g@2x.png 2x')
	template(v-slot:content)
		.p-2.bg-white.overflow-hidden( class='w-[500px]')
			a-tabs(:animated='false')
				a-tab-pane(v-for='stickerItem in STICKERS_Group', :key='stickerItem.id')
					template(#tab)
						span
							img.w-8.cursor-pointer(:src='stickerItem.stickers[0].img', :class='{"grayItem": !checkExpireTime(stickerItem)}')
					.w-full.grid.grid-cols-8.gap-4.bg-white.p-4(v-if='checkExpireTime(stickerItem)')
						.col-span-1(v-for='sticker in stickerItem.stickers')
							img.w-full.cursor-pointer(:src='sticker.img' @click='sendSticker(sticker.code)')

					.FLEX_C.CENTER.h-48(v-else) 
						router-link.my-2(to='/sticker')
							.rounded-full.text-psV3Red.border.border-psV3Red.p-2.my-2.cursor-pointer 获得贴图
						.text-gray-500 点击后将会离开直播间
</template>
<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, onUnmounted, reactive, toRaw, watch } from 'vue';
export default {
	setup(props, { emit }) {
		// ---------------------------
		const state = reactive({
			stickersVisible: false,
		});
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const currentRoom = route.params.id;
		const UID = computed(() => store.state.user.uid);
		const USREINFO = computed(() => store.state.user.userInfo);
		// ---------------------------
		const ALL_STICKERS = computed(() => store.state.config.allStickers || '');
		const STICKERS_Group = computed(() => store.state.config.stickersGroup || '');
		const USER_STICKERS = computed(() => store.state.user.stickers || '');
		const getUserType = () => {
			const IDENTITY_LIST = USREINFO.value.identities;
			const ADMIN = IDENTITY_LIST.filter((item) => Number(item.identity) === 3);
			const HOST = IDENTITY_LIST.filter((item) => Number(item.identity) === 4);
			const USER = IDENTITY_LIST.filter((item) => Number(item.identity) === 1);
			if (ADMIN.length > 0) {
				return 3;
			} else if (HOST.length > 0) {
				return 4;
			} else {
				return 1;
			}
		};
		// ---------------------------
		// 檢查是否有貼圖＆是否有使用期限＆使用期限是否過期
		const checkExpireTime = (stickerItem) => stickerItem.stickers && stickerItem.expire_time && dayjs().isBefore(dayjs(stickerItem.expire_time));
		const sendSticker = (stickerCode) => {
			if (!UID.value) {
				state.stickersVisible = false;
				store.commit('user/SHOW_LOGIN_MODEL', 1);
			} else {
				state.stickersVisible = false;
				store.commit('socket/SEND_STICKER', stickerCode);
			}
		};
		onMounted(() => {});
		onUnmounted(() => {});
		// ------------------------------------------------------------------

		return {
			state,
			USREINFO,
			ALL_STICKERS,
			STICKERS_Group,
			sendSticker,
			checkExpireTime,
		};
	},
};
</script>
<style lang="scss" scoped></style>
