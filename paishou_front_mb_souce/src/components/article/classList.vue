<template lang="pug">
//- 下拉刷新
van-pull-refresh(:model-value='loading', @refresh='refresh')
	//- 文章列表
	.flex.flex-col.items-stretch.pb-12
		//- 分隔線
		divider

		//- 置頂文章
		top-list(v-if='!topEmpty', :list='state.topList')

		//- 目前暫無紀錄
		.px-4.mt-12(v-if='articleEmpty')
			empty

		//- 頁面內容
		.mt-4(v-else)
			//- 精選主題
			article-header.px-4(v-if='!topicEmpty') {{ `${className}主题` }}

			//- 主題列表
			topic-list.px-4.mt-4(v-if='!topicEmpty', :list='state.topicList')

			//- 精選文章
			article-header.px-4.mt-6 {{ `${className}文章` }}

			//- 文章列表
			article-list.px-4.mt-4(:list='state.articleList')
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { articleClassList, articleTopicSpecial } from '@/api';
import empty from '@/components/empty';
import divider from '@/components/divider';
import topList from '@/components/article/topList.vue';
import topicList from '@/components/article/topicList.vue';
import articleList from '@/components/article/articleList.vue';
import articleHeader from '@/components/article/articleHeader.vue';

export default {
	components: {
		empty,
		divider,
		topList,
		topicList,
		articleList,
		articleHeader,
	},
	props: {
		classId: Number,
		className: String,
	},
	setup(props) {
		// Component state
		const state = reactive({
			topLoading: false,
			topicLoadging: false,
			articleLoading: false,
			topList: [],
			topicList: [],
			articleList: [],
		});

		// 是否讀取中
		const loading = computed(() => {
			return state.topLoading || state.articleLoading || state.topicLoadging;
		});

		// 置頂文章是否為空
		const topEmpty = computed(() => {
			return !state.topList || state.topList.length === 0;
		});

		// 主題是否為空
		const topicEmpty = computed(() => {
			return !state.topicList || state.topicList.length === 0;
		})

		// 文章列表是否為空
		const articleEmpty = computed(() => {
			return !state.articleList || state.articleList.length === 0;
		});

		// 取得置頂文章
		const getTopList = () => {
			// Update loading state
			state.topLoading = true;

			// Query params
			const query = {
				class_id: props.classId,
				top: 1,
			};

			// Get top list
			articleClassList(query)
				.then((res) => {
					// Update top list
					state.topList = res?.data?.list || [];

					// Revert loading state on finishe
					state.topLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.topLoading = false;
				});
		};

		// 取得主題列表
		const getTopicList = () => {
			// Only hot class display topic list
			if (props.classId !== 0) {
				state.topicList = [];
				return;
			}

			// Update loading state
			state.topicLoadging = true;

			// Get topic list
			articleTopicSpecial()
				.then((res) => {
					// Update topic list
					state.topicList = res?.data?.list || [];

					// Revert loading state on finished
					state.topicLoadging = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.topicLoadging = false;
				});
		};

		// 取得文章列表
		const getArticleList = () => {
			// Update loading state
			state.articleLoading = true;

			// Query params
			const query = {
				class_id: props.classId,
			};

			// Get article list
			articleClassList(query)
				.then((res) => {
					// Update article list
					state.articleList = res?.data?.list || [];

					// Revert loading state on finished
					state.articleLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.articleLoading = false;
				});
		};

		// 下拉刷新
		const refresh = () => {
			getTopList();
			getTopicList();
			getArticleList();
		};

		// On component mounted
		onMounted(() => {
			refresh();
		});
		return {
			state,
			loading,
			topEmpty,
			topicEmpty,
			articleEmpty,
			refresh,
		};
	},
};
</script>
