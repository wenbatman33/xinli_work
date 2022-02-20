<template lang="pug">
//- 主題文章
.relative.w-full.pb-12
    //- 頁首
    .fixed-header
        topic-header(:topic-info='state.topicInfo', :collapse-height='state.collapseHeight', @refresh='refresh')

    //- 文章列表
    .article-list
        //- 最大頁首高度
        .invisible
            topic-header(:topic-info='state.topicInfo', :collapse-height='MAX_COLLAPSE')

        //- 下拉刷新
        van-pull-refresh(:model-value='isLoading', @refresh='refresh')
            .px-4.pt-6.pb-8
                //- 目前沒有文章
                empty.mt-12(v-if='isEmpty')

                //- 文章列表
                article-list(v-else, :list='state.articleList')
</template>
<script>
import { reactive, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { articleTopic, articleTopicList } from '@/api';
import empty from '@/components/empty';
import topicHeader from '@/components/article/topicHeader.vue';
import articleList from '@/components/article/articleList.vue';

const MAX_COLLAPSE = 120;

export default {
	components: {
		empty,
		topicHeader,
		articleList,
	},
	setup() {
		// Vue router
		const route = useRoute();

		// Component state
		const state = reactive({
			collapseHeight: MAX_COLLAPSE,
			topicInfoLoading: false,
			articleListLoading: false,
			topicInfo: {},
			articleList: [],
		});

		// 資料是否為空
		const isEmpty = computed(() => {
			return !state.articleList || state.articleList.length === 0;
		});

		// 資料是否讀取中
		const isLoading = computed(() => {
			return state.topicInfoLoading || state.articleListLoading;
		});

		// 取得主題資訊
		const getTopicInfo = () => {
			// Update loading state
			state.topicInfoLoading = true;

			// Get query
			const query = {
				id: route.params.id,
			};

			// Get article list
			articleTopic(query)
				.then((res) => {
					// Update topic data
					state.topicInfo = res?.data || {};

					// Revert loading state on finished
					state.topicInfoLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.topicInfoLoading = false;
				});
		};

		// 取得文章列表
		const getArticleList = () => {
			// Update loading state
			state.articleListLoading = true;

			// Get query
			const query = {
				id: route.params.id,
			};

			// Get event list
			articleTopicList(query)
				.then((res) => {
					// Update article list
					state.articleList = res?.data?.list || [];

					// Revert loading state on finished
					state.articleListLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.articleListLoading = false;
				});
		};

		// 下拉刷新
		const refresh = () => {
			getTopicInfo();
			getArticleList();
		};

		// Compute collapse block height
		const computeCollapse = () => {
			state.collapseHeight = Math.min(Math.max(MAX_COLLAPSE - window.scrollY, 0), MAX_COLLAPSE);
		};

		// On component mounted
		onMounted(() => {
			document.addEventListener('scroll', computeCollapse, true);
			refresh();
		});

		// On component unmounted
		onUnmounted(() => {
			document.removeEventListener('scroll', computeCollapse, true);
		});
		return {
			state,
			isEmpty,
			isLoading,
			refresh,
			MAX_COLLAPSE,
		};
	},
};
</script>
<style lang="scss" scoped>
.fixed-header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
}
</style>
