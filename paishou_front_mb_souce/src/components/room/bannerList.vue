<template lang="pug">
//- 營運看板彈窗
.relative.w-full(v-if='showBanner')
	.absolute.z-20.w-full.flex.flex-col.items-stretch.bg-white.shadow.rounded-b-lg.px-4.pt-2.pb-4
		.flex.flex-row.justify-between.items-center.rounded.border-banner.mt-2.pl-4.pr-2.py-2(v-for='item in bannerList')
			//- 標題
			.text-xs.text-title.flex-shrink.break-all.overflow-hidden.overflow-ellipsis.whitespace-nowrap {{ item.title }}

			//- 複製
			van-button.flex-shrink-0.w-auto.h-auto.p-1.rounded.bg-transparent.border-transparent(v-if='item.action === 2', @click='clickCopy(item)')
				.text-xs.text-copy.font-bold 复制

			//- 連結
			van-button.flex-shrink-0.w-7.h-7.p-1.rounded-full.bg-transparent.border-transparent(v-else-if='item.action === 3', @click='clickLink(item)')
				img.w-full.h-full(src='/publicAssets/img/room/icon-link@3x.png')
</template>
<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { Notify } from 'vant';

export default {
	setup() {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			roomAvatarLeft: 0,
			roomAvatarBottom: 0,
		});

		// 是否顯示營運看板
		const showBanner = computed(() => {
			return store?.state?.socket?.showBanner === true;
		});

		// 彈窗樣式
		const popupStyle = computed(() => {
			return {
				top: `${state.roomAvatarBottom}px`,
				left: `${state.roomAvatarLeft}px`,
				right: `${state.roomAvatarLeft}px`,
				bottom: '0px',
				transform: 'unset',
				'-webkit-transform': 'unset',
				backgroundColor: 'transparent',
			};
		});

		// 遮罩樣式
		const overlayStyle = computed(() => {
			return {
				backgroundColor: 'transparent',
			};
		});

		// 頭像
		const avatar = computed(() => {
			return store?.state?.socket?.roomInfo?.anchor?.avatar || '';
		});

		// 等級
		const level = computed(() => {
			const levelAnchor = store?.state?.socket?.anchorInfo?.level_anchor || 1;
			const levelAnchorList = store?.state?.config?.levelanchor || [];
			return levelAnchorList.find((element) => element.levelid === levelAnchor)?.thumb || '';
		});

		// 暱稱
		const name = computed(() => {
			return store?.state?.socket?.roomInfo?.anchor?.user_nicename || '';
		});

		// 看板列表
		const bannerList = computed(() => {
			return store?.state?.socket?.roomInfo?.banner || [];
		});

		// 頭像圖片讀取失敗
		const errorAvatarImg = (e) => {
			e.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 點擊複製
		const clickCopy = (item) => {
			const x = window.scrollX;
			const y = window.scrollY;
			const input = document.createElement('input');
			try {
				document.body.appendChild(input);
				input.type = 'text';
				input.value = item.content;
				input.focus();
				input.select();
				input.setSelectionRange(0, 99999);
				document.execCommand('copy');
			} catch (err) {}
			document.body.removeChild(input);
			window.scrollTo(x, y);
			Notify({ type: 'success', message: '已复制' });
		};

		// 點擊連結
		const clickLink = (item) => {
			window.open(item.content, '_blank');
		};
		return {
			showBanner,
			popupStyle,
			overlayStyle,
			avatar,
			level,
			name,
			bannerList,
			errorAvatarImg,
			clickCopy,
			clickLink,
		};
	},
};
</script>
<style lang="scss" scoped>
.border-banner {
	border: 1px solid #e8e8e8;
}
.text-title {
	color: #303133;
}
.text-copy {
	color: #a62337;
}
</style>