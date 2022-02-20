<template lang="pug">
//- 我的消息列表
.inbox-list.pb-8
	//- 導覽欄
	nav-bar(title='我的消息', icon='/publicAssets/img/inbox/icon-inbox@3x.png', right-button='/publicAssets/img/icon-close-red@3x.png', @click-right='clickRight')

	//- 下拉刷新
	van-pull-refresh(:model-value='isLoading', @refresh='refresh')
		//- 目前沒有紀錄
		empty.mt-12(v-if='isEmpty')

		//- 我的消息列表
		.flex.flex-col
			van-button.inbox-button(v-for='item in inboxList', @click='clickInbox(item)')
				.flex.flex-col
					.flex.flex-row.items-center.p-4
						//- 未讀橘點
						.w-2.h-2.flex-shrink-0
							img(v-if='item.status == "0"', src='/publicAssets/img/inbox/icon-unread@3x.png')

						//- 內容
						.flex.flex-col.flex-grow.ml-4
							//- 日期
							.create-at.w-full.text-sm.break-all {{ item.create_at }}

							//- 標題
							.title.w-full.text-base.font-bold.break-all.mt-1 {{ item.title }}

						//- 箭頭
						img.flex-shrink-0.w-4.h-4(src='/publicAssets/img/inbox/icon-arrow-right-gray@3x.png')

					//- 底線
					divider
</template>
<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { inboxReaded } from '@/api';
import empty from '@/components/empty';
import navBar from '@/components/navBar';
import divider from '@/components/divider';

export default {
	components: {
		empty,
		navBar,
		divider,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// User id
		const uid = computed(() => store.state?.user?.uid || '');

		// 是否正在取得我的消息列表
		const isLoading = computed(() => store.state?.user?.isGettingInboxList === true);

		// 我的消息列表
		const inboxList = computed(() => store.state?.user?.inboxList || []);

		// 我的消息列表是否為空
		const isEmpty = computed(() => inboxList.value.length === 0);

		// 取得我的消息列表
		const getInboxList = () => {
			if (!store.state?.user?.isGettingInboxList) {
				store.dispatch('user/GET_INBOX_LIST', {});
			}
		};

		// 讀取我的消息
		const readInbox = (id) => {
			// Post body
			const body = {
				uid: Number(uid.value),
				inbox_id: id,
			};

			// Read inbox
			inboxReaded(body).then(() => {
				getInboxList();
			});
		};

		// On component mounted
		onMounted(() => {
			getInboxList();
		});

		// 下拉刷新
		const refresh = () => {
			getInboxList();
		};

		// 點擊導覽欄關閉按鈕
		const clickRight = () => {
			router.go(-1);
		};

		// 點擊我的消息
		const clickInbox = (item) => {
			// Read inbox
			readInbox(item.id);

			// Navigate inbox detail page
			router.push(`/inbox/details/${item.id}`);
		};
		return {
			isLoading,
			inboxList,
			isEmpty,
			refresh,
			clickRight,
			clickInbox,
		};
	},
};
</script>
<style lang="scss" scoped>
.inbox-list {
	width: 100%;
	.inbox-button {
		width: 100%;
		height: unset;
		padding: 0;
		border: transparent;
		background-color: #ffffff;
		::v-deep(.van-button__content) {
			width: 100%;
		}
		::v-deep(.van-button__text) {
			width: 100%;
			text-align: start;
		}
	}
	.create-at {
		color: #909399;
	}
	.title {
		color: #202020;
	}
}
</style>
