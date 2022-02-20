<template lang="pug">
//- 房間管理
.admin-list
	//- 導覽欄
	nav-bar(title='房间管理', right-button='/publicAssets/img/icon-close-red@3x.png', @click-right='clickRight')

	//- 下拉刷新
	van-pull-refresh(v-model='state.isLoading', @refresh='refresh')
		//- 目前沒有紀錄
		empty.mt-12(v-if='state.isEmpty')

		//- 房間列表
		.flex.flex-col.mt-2(v-else)
			.flex.flex-col.bg-white.rounded-md.shadow.overflow-hidden.mx-4.mt-6(v-for='item in state.adminList')
				//- 上半部
				.flex.flex-row.items-center.px-4.py-4
					//- 頭像
					img.flex-shrink-0.w-10.h-10.object-cover.rounded-full.mr-4(:src='item.avatar || ""', @error='errorAvatarImg')

					//- 資訊
					.flex.flex-col.flex-shrink.overflow-hidden
						//- 暱稱
						.name.w-full.text-base.whitespace-nowrap.overflow-hidden.overflow-ellipsis {{ item.nickname }}

						//- 最近開播
						.latest-live.text-sm.whitespace-nowrap.overflow-hidden.overflow-ellipsis.mt-1 {{ `最近开播 ${item.latest_live}` }}

					//- 留白
					.flex-grow

					//- 辭職
					van-button.quit-button.flex-shrink-0.rounded-full.ml-4(:loading='item.isLoading', @click='clickQuit(item)')
						.text-sm.px-4.py-2 辞职
						template(#loading)
							.flex.flex-row.items-center.px-4.py-2
								van-loading.w-4.h-4(color='#a62337', type='spinner')
								.text-sm.ml-1 辞职

				//- 下半部
				.latest-login.flex.flex-row.items-stretch.justify-between.rounded-tr-md
					//- 最近訪問
					.flex-shrink.text-sm.whitespace-nowrap.overflow-hidden.overflow-ellipsis.my-3.ml-4 {{ `最近访问 ${item.latest_login}` }}

					//- 進入直播間
					van-button.enter-button.flex-shrink-0.rounded-md.ml-2(@click='clickEnter(item)')
						.flex.flex-row.items-center.mx-4.my-3
							.text-sm 进入直播间
							img.w-4.h-4.ml-2(src='/publicAssets/img/adminlist/icon-enter@3x.png')
</template>
<script>
import { computed, reactive, onMounted } from 'vue';
import { Dialog } from 'vant';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { adminList, resignationAdmin } from '@/api';
import empty from '@/components/empty';
import navBar from '@/components/navBar';

export default {
	components: {
		empty,
		navBar,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// User id
		const uid = computed(() => {
			return store?.state.user?.value?.id;
		});

		// Component state
		const state = reactive({
			isLoading: false,
			isEmpty: false,
			adminList: [],
		});

		// 取得房管列表
		const getAdminList = () => {
			// Update loading state
			state.isLoading = true;

			// Get query
			const query = {
				uid: Number(uid.value || ''),
			};

			// Get admin list
			adminList(query)
				.then((res) => {
					// Update admin list
					state.adminList = res?.data?.list || [];
					state.isEmpty = state.adminList.length === 0;

					// Revert loading state on finished
					state.isLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.isLoading = false;
				});
		};

		// On component mounted
		onMounted(() => {
			getAdminList();
		});

		// 下拉刷新
		const refresh = () => {
			getAdminList();
		};

		// 頭像圖片讀取失敗
		const errorAvatarImg = (event) => {
			event.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 點擊導覽欄返回按鈕
		const clickRight = () => {
			router.go(-1);
		};

		// 點擊辭職按鈕
		const clickQuit = (item) => {
			// Show confirmation dialog
			Dialog.alert({
				message: `确定要跟主播 ${item.nickname} 解除关系吗`,
				'show-confirm-button': true,
				'show-cancel-button': true,
			}).then(() => {
				// Update loading state
				item.isLoading = true;

				// Post body
				const body = {
					uid: Number(uid.value || ''),
					live_uid: item.uid,
				};

				// Resignation admin
				resignationAdmin(body)
					.then(() => {
						// Get admin list
						getAdminList();

						// Update loading state on finshed
						item.isLoading = false;
					})
					.catch(() => {
						// Get admin list
						getAdminList();

						// Update loading state on error
						item.isLoading = false;
					});
			});
		};

		// 點擊進入直播間按鈕
		const clickEnter = (item) => {
			router.push(`/room/${item.uid}`);
		};
		return {
			state,
			refresh,
			errorAvatarImg,
			clickRight,
			clickQuit,
			clickEnter,
		};
	},
};
</script>
<style lang="scss" scoped>
.admin-list {
	width: 100%;
	::v-deep(.van-nav-bar__content) {
		background-color: #a62337;
	}
	::v-deep(.van-nav-bar__title) {
		color: #ffffff;
	}
	::v-deep(.van-icon) {
		color: #ffffff;
	}
	.name {
		color: #a62337;
	}
	.latest-live {
		color: #909399;
	}
	.latest-login {
		color: #ffffff;
		background: #a62337;
	}
	.quit-button {
		width: unset;
		height: unset;
		padding: 0;
		color: #a62337;
		border: 1px solid #a62337;
		background-color: transparent;
		::v-deep(.van-button__content) {
			width: 100%;
		}
		::v-deep(.van-button__text) {
			width: 100%;
		}
	}
	.enter-button {
		width: unset;
		height: unset;
		padding: 0;
		color: #ffffff;
		border: transparent;
		background-color: #f8b62d;
		::v-deep(.van-button__content) {
			width: 100%;
		}
		::v-deep(.van-button__text) {
			width: 100%;
		}
	}
}
</style>