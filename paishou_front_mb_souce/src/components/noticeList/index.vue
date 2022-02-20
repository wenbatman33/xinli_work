<template lang="pug">
//- 下拉刷新
van-pull-refresh(v-model='state.isLoading', @refresh='refresh')
	.notice-list
		//- 目前沒有紀錄
		empty.mt-12(v-if='state.isEmpty')

		//- 公告列表
		.flex.flex-col(v-else)
			van-button.notice-button(v-for='item in state.noticeList', @click='clickNotice(item)')
				.w-full.flex.flex-col
					.w-full.flex.flex-row.items-center.px-4(class='py-2.5')
						//- 圖示
						img.w-12.h-12.flex-shrink-0.mr-4(v-if='item.name === "活动"', src='/publicAssets/img/notice/icon-activity@3x.png')
						img.w-12.h-12.flex-shrink-0.mr-4(v-else-if='item.name === "直播"', src='/publicAssets/img/notice/icon-live-broadcast@3x.png')
						img.w-12.h-12.flex-shrink-0.mr-4(v-else-if='item.name === "系统"', src='/publicAssets/img/notice/icon-system@3x.png')
						img.w-12.h-12.flex-shrink-0.mr-4(v-else-if='item.name === "其他"', src='/publicAssets/img/notice/icon-teaching@3x.png')
						img.w-12.h-12.flex-shrink-0.mr-4(v-else, src='/publicAssets/img/notice/icon-activity@3x.png')

						//- 內容
						.flex.flex-col.flex-shrink.overflow-hidden
							//- 時間
							.create-at.w-full.text-sm.whitespace-nowrap.overflow-hidden.overflow-ellipsis {{ item.createAtFormatted }}
							
							//- 標題
							.title.w-full.text-base.font-bold.whitespace-nowrap.overflow-hidden.overflow-ellipsis {{ item.title }}

						//- 留白
						.flex-grow

						//- 箭頭
						img.flex-shrink-0.w-6.h-6.ml-4(src='/publicAssets/img/icon-right-gray@3x.png')
				//- 分隔線
				divider
</template>
<script>
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { noticeList } from '@/api';
import empty from '@/components/empty';
import divider from '@/components/divider';
import dayjs from 'dayjs';

export default {
	components: {
		empty,
		divider,
	},
	props: {
		categoryId: Number,
	},
	emits: ['update:category-list'],
	setup(props, { emit }) {
		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			isLoading: false,
			isEmpty: false,
			noticeList: [],
		});

		// 取得公告列表
		const getNoticeList = () => {
			// Update loading state
			state.isLoading = true;

			// Get query
			const query = {
				cate_id: props.categoryId
			};

			// Get notice list
			noticeList(query)
				.then((res) => {
					// Update notice list
					state.noticeList = res?.data?.list || [];
					state.noticeList.forEach((element) => {
						element.createAtFormatted = dayjs(element.create_at * 1000).format('YYYY/MM/DD HH:mm');
					});
					state.isEmpty = state.noticeList.length === 0;

					// Emit category list
					emit('update:category-list', res?.data?.category || []);

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
			getNoticeList();
		});

		// 下拉刷新
		const refresh = () => {
			getNoticeList();
		};

		// 點擊公告物件
		const clickNotice = (item) => {
			router.push(`/notice/details/${item.id}`);
		};
		return {
			state,
			refresh,
			clickNotice,
		};
	},
};
</script>
<style lang="scss" scoped>
.notice-list {
	width: 100%;
	.notice-button {
		width: 100%;
		height: unset;
		padding: 0;
		border: transparent;
		background: transparent;
		::v-deep(.van-button__content) {
			width: 100%;
		}
		::v-deep(.van-button__text) {
			width: 100%;
			text-align: start;
		}
	}
	.title {
		color: #303133;
	}
	.create-at {
		color: #909399;
	}
}
</style>