<template lang="pug">
//- 直播結束
.off-live-video.pb-6(v-if='!onlive')
	//- 導覽欄
	.navBar.w-full.px-3.py-4
		.flex.flex-row.justify-between.items-center
			van-button.nav-button.rounded-full(@click='clickBack')
				.p-1.flex.justify-center.items-center
					img.w-6.h-6(src='/publicAssets/img/room/icon-arrow-left-white@3x.png')

	//- 標題
	.title.text-lg.font-bold.px-4 节目已结束

	//- 內容
	.flex.flex-row.justify-between.items-center.px-4.mt-2
		.flex.flex-col
			.content.text-xs.font-normal 当前节目已结束，造成不便敬请见谅。
			.content.text-xs.font-normal 选择您有兴趣的类别继续观看直播。
		van-button.home-button.rounded-full(@click='clickHome')
			.flex.justify-center.items-center.px-4(class='py-1.5')
				img.w-4.h-4(src='/publicAssets/img/room/icon-home-w@3x.png')
				.text-xs.font-normal.ml-1 回首页

	//- 推薦直播
	.px-4.mt-4
		van-button.live-button.rounded(@click='clickVideo')
			.flex.flex-row.items-center.p-2
				img.h-20(:src='firstNewLive.thumb || ""', @error='errorVideoImg')
				.flex.flex-col.ml-4
					.live-name.text-sm.font-bold {{ firstNewLive.title || "-" }}
					.user-name.text-xs.font-normal.mt-1 {{ firstNewLive.user_nicename || "-" }}
</template>
<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// 直播預設圖
		const ERROR_IMG = computed(() => {
			return store?.state?.config?.errorImg;
		});

		// 是否直播中
		const onlive = computed(() => {
			return store?.state?.socket?.onLive === true;
		});

		// 第一筆最新直播
		const firstNewLive = computed(() => {
			return store?.state?.socket?.offLiveVideos[0] || {};
		});

		// 直播圖片讀取失敗
		const errorVideoImg = (e) => {
			e.target.src = ERROR_IMG?.value || '/publicAssets/img/default-room@3x.jpg';
		};

		// 點擊導覽欄返回按鈕
		const clickBack = () => {
			router.go(-1);
		};
		
		// 點擊回首頁按鈕
		const clickHome = () => {
			router.replace('/');
		}

		// 點擊推薦影片
		const clickVideo = () => {
			const uid = firstNewLive.value.uid;
			if (uid) {
				router
					.replace(`/room/${uid}`)
					.then(() => {
						// Disconnect socket
						store.dispatch('socket/DISCONNECT_SOCKET');

						// Reset room info
						store.commit('socket/RESET');

						// Update room uid
						store.dispatch('socket/UPDATE_UID', Number(uid.value));
					})
					.catch(() => {});
			}
		};
		return {
			onlive,
			firstNewLive,
			errorVideoImg,
			clickBack,
			clickHome,
			clickVideo,
		};
	},
};
</script>
<style lang="scss" scoped>
.off-live-video {
	position: relative;
	width: 100%;
	height: auto;
	background: rgba(0, 0, 0, 0.8);
	position: relative;
	.nav-button {
		width: unset;
		height: unset;
		padding: unset;
		border: transparent;
		background: transparent;
	}
	z-index: 2;
	.title {
		color: #ffffff;
	}
	.content {
		color: #898989;
	}
	.home-button {
		width: unset;
		height: unset;
		padding: 0;
		color: #ffffff;
		border: transparent;
		background: linear-gradient(90deg, #a62337, #df2f4a);
	}
	.live-button {
		width: 100%;
		height: unset;
		padding: 0;
		border: transparent;
		background: rgba(216, 216, 216, 0.13);
		::v-deep(.van-button__content) {
			width: 100%;
		}
		::v-deep(.van-button__text) {
			width: 100%;
			text-align: start;
		}
	}
	.live-name {
		color: #ffffff;
	}
	.user-name {
		color: #909399;
	}
}
</style>