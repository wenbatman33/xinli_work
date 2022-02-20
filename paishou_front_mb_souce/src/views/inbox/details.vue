<template lang="pug">
//- 我的消息明細
.inbox-details.pb-8
	//- 導覽欄
	nav-bar(title='返回列表', left-button='/publicAssets/img/icon-left-red@3x.png', right-button='/publicAssets/img/inbox/icon-delete@3x.png', :right-loading='state.isDeleting', @click-left='clickLeft', @click-right='clickRight')

	//- 下拉刷新
	van-pull-refresh(v-model='isLoading', @refresh='refresh')
		//- 消息內容
		.flex.flex-col.px-4.mt-6.break-all
			//- 日期
			.create-at.text-sm {{ createAt }}

			//- 標題
			.title.text-xl.font-bold.mt-4 {{ title }}

			//- 內容
			.content.text-base.mt-4(v-html='content')

//- 刪除確認彈窗
van-popup(:show='state.isShowDeletePopup', class='w-10/12 md:w-1/2', round)
	.delete-popup.flex.flex-col.items-center.py-8.px-4
		//- 大香蕉圖片
		img.h-20(src='/publicAssets/img/inbox/icon-banana@3x.png')

		//- 標題
		.title.text-lg.font-bold.mt-4 确认删除此封信件？

		//- 內容
		.content.text-sm.font-normal.mt-2 (删除后无法复原)

		//- 確認取消
		confirm-cancel-button.mt-8(confirm-text='确认', cancel-text='取消', @click-confirm='clickDeleteConfirm', @click-cancel='clickDeleteCancel', :loading='state.isDeleting')
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { inboxDelete } from '@/api';
import navBar from '@/components/navBar';
import confirmCancelButton from '@/components/confirmCancelButton';

export default {
	props: ['inboxDetailData'],
	components: {
		navBar,
		confirmCancelButton,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const route = useRoute();
		const router = useRouter();

		// Component state
		const state = reactive({
			isDeleting: false,
			isShowDeletePopup: false,
		});

		// User id
		const uid = computed(() => {
			return store.state.user.uid || '';
		});

		// 是否正在取得我的消息列表
		const isLoading = computed(() => store.state?.user?.isGettingInboxList === true);

		// 編號
		const inboxId = computed(() => {
			return route.params['id'] || '';
		});

		// 指定消息
		const targetInbox = computed(() => {
			return store.state?.user?.inboxList?.find((element) => {
				return element.id === Number(inboxId.value);
			});
		});

		// 日期
		const createAt = computed(() => {
			return targetInbox.value?.create_at || ''
		});

		// 標題
		const title = computed(() => {
			return targetInbox.value?.title || ''
		});

		// 內容
		const content = computed(() => {
			const e = document.createElement('textarea');
			e.innerHTML = targetInbox.value?.content || '';
			if (e.childNodes.length >= 1) {
				return e.childNodes[0].nodeValue;
			} else {
				return '';
			}
		});

		// 取得我的消息列表
		const getInboxList = () => {
			if (!store.state?.user?.isGettingInboxList) {
				store.dispatch('user/GET_INBOX_LIST', {});
			}
		};
		
		// On component mounted
		onMounted(() => {
			getInboxList();
		});

		// 下拉刷新
		const refresh = () => {
			getInboxList();
		};

		// 點擊導覽欄返回按鈕
		const clickLeft = () => {
			router.go(-1);
		};

		// 點擊導覽欄刪除按鈕
		const clickRight = () => {
			state.isShowDeletePopup = true;
		};

		// 點擊刪除彈窗確認按鈕
		const clickDeleteConfirm = () => {
			// Update deleting state
			state.isDeleting = true;

			// Post body
			const body = {
				uid: Number(uid.value),
				inbox_id: Number(inboxId.value),
			};

			// Delete inbox
			inboxDelete(body)
				.then((res) => {
					// Validate response code
					if (res.code === 0) {
						// Refresh inbox list
						getInboxList();

						// Back previous page
						router.go(-1);
					}

					// Revert deleting state on finished
					state.isDeleting = false;
				})
				.catch(() => {
					// Revert deleting state on error
					state.isDeleting = false;
				});
		};

		// 點擊刪除彈窗取消按鈕
		const clickDeleteCancel = () => {
			state.isShowDeletePopup = false;
		};
		return {
			state,
			isLoading,
			createAt,
			title,
			content,
			refresh,
			clickLeft,
			clickRight,
			clickDeleteConfirm,
			clickDeleteCancel,
		};
	},
};
</script>
<style lang="scss" scoped>
.inbox-details {
	width: 100%;
	.create-at {
		color: #909399;
	}
	.title {
		color: #303133;
	}
	.content {
		color: #202020;
	}
}
.delete-popup {
	width: 100%;
	.title {
		color: #A62337;
	}
	.content {
		color: #7D7D7D;
	}
}
</style>