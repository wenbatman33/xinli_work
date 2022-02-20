<template lang="pug">
.Container.FLEX_C.py-4.min-h-screen.pb-8
	//- AD 側區塊
	.w-full.my-4
		slideBanner(:slide_cid='25',  :autoPlaySpeed='5000')

	.BETWEEN
		//- article 左側區塊
		.funcBar.w-40.pr-2.flex-shrink-0
			.classListMenu
				.text-lg.my-4.cursor-pointer(class='hover:text-psV3Red', :class='{"menuItemActive":(state.articleClassId===0)}')
					.pl-4(@click='changeClass("热门")') 热门
				.text-lg.my-4.cursor-pointer(
					v-for='(item, index) in state.articleClass', 
					class='hover:text-psV3Red', 
					:class='{"menuItemActive":(state.articleClassId===item.id)}'
					@click='changeClass(item.name, item.id)')

					.pl-4 {{ item.name }}

		.flex-grow.overflow-hidden
			.classTopList.w-full.overflow-hidden(v-if='state.articleClassTopList.length>0')
				classTopList(:dataList='state.articleClassTopList')
			.topicList(v-if='state.articleClassId===0')
				topicList
			.search.mb-2
				.grid.grid-cols-5.gap-4
					.col-span-3
						slideBanner(:slide_cid='24',  :autoPlaySpeed='5000')
					.col-span-2
						h3.mb-2.text-psV3Red 资讯搜寻
						.bg-white.rounded.shadow.px-2.py-4
							.px-2.FLEX_R
								a-input(v-model:value='state.searchValue', placeholder='请输入关键字', @pressEnter='clickSearch')
									template(#prefix)
										search-outlined(type='search')
								a-button(type='primary', :disabled='state.searchValue===""', @click='clickSearch') 搜寻
							.px-2.mt-4
								.text-xs.text-gray-500 没有找到想要的文章吗？搜寻您想看的赛事分析！

			.classList
				h3.mb-2.text-psV3Red 精选文章
				.w-full.grid.grid-cols-3.gap-4
					.col-span-1(v-for='item in state.articleClassList')
						articleCrad(:articleData='item')
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';
import { articleClass, articleClassList } from '@/api';
import slideBanner from '@/components/swipers/slideBanner.vue';
import classTopList from '@/components/article/classTopList.vue';
import topicList from '@/components/article/topicList.vue';
import articleCrad from '@/components/article/articleCrad.vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { matomo_article_menu_click, matomo_article_search } from '@/matomoEvent';

export default {
	components: {
		slideBanner,
		classTopList,
		topicList,
		articleCrad,
		SearchOutlined,
	},
	setup() {
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			articleClassId: 0,
			articleClass: [],
			articleClassTopList: [],
			articleClassList: [],
			searchValue: '',
		});
		const clickSearch = () => {
			matomo_article_search(state.searchValue);
			router.push({ path: '/article/search', query: { keyword: state.searchValue } });
		};
		const changeClass = (name, id = 0) => {
			matomo_article_menu_click(name, id);
			router.push({ query: { classid: id } }).then((res) => {
				init();
			});
		};
		const init = () => {
			state.articleClassId = Number(route.query.classid) || 0;
			state.articleClassTopList = [];
			state.articleClassList = [];
			articleClassList({
				class_id: state.articleClassId,
				page: 1,
				pagesize: 9999,
			}).then((res) => {
				state.articleClassList = res?.data?.list;
			});

			articleClassList({
				class_id: state.articleClassId,
				top: 1,
				page: 1,
				pagesize: 9999,
			}).then((res) => {
				state.articleClassTopList = res?.data?.list;
			});
		};
		onMounted(() => {
			// 文章類別
			articleClass().then((res) => {
				state.articleClass = res.data.list;
			});
			init();
		});
		return {
			state,
			route,
			router,
			init,
			changeClass,
			clickSearch,
		};
	},
};
</script>
<style lang="scss" scoped></style>
