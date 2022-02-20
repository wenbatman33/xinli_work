<template lang="pug">
//- 拍手公告詳細
.notice-detail.pb-8
	//- 導覽欄
	nav-bar(title='返回列表', left-button='/publicAssets/img/icon-left-red@3x.png', @click-left='clickLeft')

	//- 下拉刷新
	van-pull-refresh(v-model='state.isLoading', @refresh='refresh')
		//- 公告內容
		.flex.flex-col.px-4.mt-8.break-all
			//- 日期
			.create-at.text-sm {{ state.createAt }}

			//- 標題
			.title.text-xl.font-bold.mt-4 {{ state.title }}

			//- 內容
			.content.text-base.mt-4(v-html='state.content')
</template>
<script>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';
import { noticeDetail } from '@/api';
import navBar from '@/components/navBar';
import dayjs from 'dayjs';

export default {
	components: {
		navBar,
	},
	setup() {
		// Vue router
		const route = useRoute();
		const router = useRouter();

		// Component state
		const state = reactive({
			isLoading: false,
			createAt: '',
			title: '',
			content: '',
		});

		// 取得公告內容
		const getNoticeDetail = () => {
			// Update loading state
			state.isLoading = true;

			// Get query
			const query = {
				id: route.params['id'],
			};

			// Get notice detail
			noticeDetail(query)
				.then((res) => {
					// Update create at
					state.createAt = dayjs(res?.data?.create_at * 1000).format('YYYY/MM/DD hh:mm');

					// Update title
					state.title = res?.data?.title;

					// Update content
					const e = document.createElement('textarea');
					e.innerHTML = res?.data?.content || '';
					if (e.childNodes.length >= 1) {
						state.content = e.childNodes[0].nodeValue;
					} else {
						state.content = '';
					}

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
			getNoticeDetail();
		});

		// 下拉刷新
		const refresh = () => {
			getNoticeDetail();
		};

		// 點擊導覽欄返回按鈕
		const clickLeft = () => {
			router.go(-1);
		};
		return {
			state,
			refresh,
			clickLeft,
		};
	},
};
</script>
<style lang="scss" scoped>
.notice-detail {
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
</style>
