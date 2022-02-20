<template lang="pug">
//- 搜尋文章
.w-full.pb-20
    //- 搜尋欄
    nav-bar(:keyword='state.keyword', @update:keyword='updateKeyword', @click-back='clickBack', @click-search='clickSearch')

    //- 搜尋結果
    van-tabs(v-if='!keywordEmpty', swipeable)
        //- 資訊
        van-tab(title='资讯')
            .px-4
                //- 分隔線
                divider

                //- 下拉刷新
                van-pull-refresh(:model-value='state.loading', @refresh='refresh')
                    //- 目前沒有紀錄
                    empty.mt-12(v-if='articleEmpty')

                    //- 文章列表
                    article-list(v-else, :list='state.articleList')
</template>
<script>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { articleSearch } from '@/api';
import { matomo_articleSearch_search_article } from '@/matomoTrackEvent.js';
import empty from '@/components/empty';
import divider from '@/components/divider';
import navBar from '@/components/search/navBar.vue';
import articleList from '@/components/article/articleList.vue';

export default {
	components: {
		empty,
		divider,
		navBar,
		articleList,
	},
	setup() {
		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			loading: false,
			keyword: '',
			activeTab: 0,
			articleList: [],
		});

		// 關鍵字是否為空
		const keywordEmpty = computed(() => {
			return !state?.keyword || state?.keyword?.length === 0;
		});

		// 文章列表是否為空
		const articleEmpty = computed(() => {
			return !state?.articleList || state?.articleList?.length === 0;
		});

		// 提交搜尋
		const submit = () => {
			// Clear article list if keyword empty
			if (keywordEmpty.value) {
				state.articleList = [];
				return;
			}

			// Update loading state
			state.loading = true;

			// Get query
			const query = {
				keyword: state.keyword,
			};

			// Search article
			articleSearch(query)
				.then((res) => {
					// Update article list
					state.articleList = res?.data?.list || [];

					// Revert loading state on finished
					state.loading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.loading = false;
				});

			// Matomo track
			matomo_articleSearch_search_article(state.keyword);
		};

		// 更新關鍵字
		const updateKeyword = (e) => {
			state.keyword = e;
			submit();
		};

		// 點擊返回按鈕
		const clickBack = () => {
			router.go(-1);
		};

		// 點擊搜尋按鈕
		const clickSearch = () => {
			submit();
		};

		// 下拉刷新
		const refresh = () => {
			submit();
		};
		return {
			state,
			keywordEmpty,
			articleEmpty,
			updateKeyword,
			clickBack,
			clickSearch,
			refresh,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.van-search__content) {
	border: 1.5px solid #f3f3f3;
	background-color: transparent;
}
::v-deep(.van-tab__text) {
	font-weight: bold;
}
::v-deep(.van-tab--active) {
	color: #a62337;
}
::v-deep(.van-tabs__line) {
	background-color: #a62337;
}
</style>
