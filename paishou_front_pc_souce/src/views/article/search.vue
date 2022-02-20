<template lang="pug">
#articleInfo.Container.FLEX_C.py-4.min-h-screen.pb-8.relative
	//- AD 側區塊
	.w-full.my-4
		slideBanner(:slide_cid='25',  :autoPlaySpeed='5000')

	.BETWEEN.min-h-screen
		//- article 左側區塊
		.funcBar.w-40.pr-2.flex-shrink-0
			.text-lg.text-psV3Red.cursor-pointer(@click='gotoPrev')
				span
					img(src='/publicAssets/img/v3/icon-left.png'  srcset='/publicAssets/img/v3/icon-left@2x.png 2x')
				span 返回上层
		.FLEX_C.flex-grow
			.bg-white.rounded.shadow.px-2.py-4.mb-4
				.px-2.FLEX_R
					a-input(v-model:value='state.searchValue', placeholder='请输入关键字', @pressEnter='clickSearch')
						template(#prefix)
							search-outlined(type='search')

					a-button(type='primary', :disabled='state.searchValue===""', @click='clickSearch') 搜寻
				.px-2.mt-4
					.text-xs.text-gray-500.text-center
						span 搜寻： “{{route.query.keyword}}” 
						span.ml-4 共找到相关结果 
						span.text-psV3Orange.mx-2 {{state.searchList.length}}
						span 个

			.w-full.grid.grid-cols-3.gap-4(v-if='state.searchList.length>0')
				.col-span-1(v-for='item in state.searchList')
					articleCrad(:articleData='item')

			.w-full.min-h-screen.CENTER.flex-col(v-else)
				img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
				.my-4.text-center
					.text-gray-500 抱歉，此次搜寻并未找到任何资料，
					.text-gray-500 请换关键字试试

</template>

<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, watch, reactive } from 'vue';
import { articleSearch } from '@/api';
import slideBanner from '@/components/swipers/slideBanner.vue';
import articleCrad from '@/components/article/articleCrad.vue';
import { SearchOutlined } from '@ant-design/icons-vue';

export default {
	components: {
		slideBanner,
		articleCrad,
		SearchOutlined,
	},
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			searchList: [],
		});
		const gotoPrev = () => router.push('/article/class');
		const clickSearch = () => {
			router.push({ path: '/article/search', query: { keyword: state.searchValue } });
		};
		watch(
			() => route.query.keyword,
			(newVal) => {
				if (newVal) init();
			},
			{ deep: true }
		);

		const init = () => {
			state.searchList = [];
			articleSearch({
				keyword: route.query.keyword,
				page: 1,
				pagesize: 999,
			}).then((res) => {
				state.searchList = res?.data?.list;
			});
		};
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			route,
			router,
			UID,
			gotoPrev,
			init,
			clickSearch,
		};
	},
};
</script>
<style lang="scss" scoped></style>
