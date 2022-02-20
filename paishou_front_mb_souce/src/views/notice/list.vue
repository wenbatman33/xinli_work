<template lang="pug">
//- 拍手公告
.notice-list.pb-8
	//- 導覽欄
	nav-bar(title='拍手公告', left-arrow, icon='/publicAssets/img/notice/icon-announcement@3x.png', right-button='/publicAssets/img/icon-close-red@3x.png', @click-right='clickRight')

	//- 分類列表
	van-tabs(swipeable)
		//- 最新(全部)
		van-tab(title='最新')
			divider
			notice-list(:category-id='0', @update:category-list='updateCategoryList')

		//- API 回傳的分類
		van-tab(v-for='item in state.categoryList', :title='item.name')
			divider
			notice-list(:category-id='item.id')
</template>
<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import navBar from '@/components/navBar';
import divider from '@/components/divider';
import noticeList from '@/components/noticeList';

export default {
	components: {
		navBar,
		divider,
		noticeList,
	},
	setup() {
		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			categoryList: [],
		});

		// 點擊導覽欄返回按鈕
		const clickRight = () => {
			router.go(-1);
		};

		// 更新分類列表
		const updateCategoryList = (list) => {
			state.categoryList = list;
		};
		return {
			state,
			clickRight,
			updateCategoryList,
		};
	},
};
</script>
<style lang="scss" scoped>
.notice-list {
	width: 100%;
	::v-deep(.van-tab__text) {
		font-weight: bold;
	}
	::v-deep(.van-tab--active) {
		color: #a62337;
	}
	::v-deep(.van-tabs__line) {
		background-color: #a62337;
	}
}
</style>
