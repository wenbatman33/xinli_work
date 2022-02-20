<template lang="pug">
.recommend.w-full.bg-gray-100.rounded-xl.p-4.my-4
	.grid.grid-cols-2.gap-4
		.col-span-1
			.CENTER_BETWEEN
				h3.mb-4.text-psV3Red 
					img(src='/publicAssets/img/v3/icon-outline-quiz-1.png', srcset='/publicAssets/img/v3/icon-outline-quiz-1@2x.png 2x')
					span 竞猜推荐

				.changeBtn.cursor-pointer.mr-4(@click='guessRecommandUpadte')
					img.w-4(src='/publicAssets/img/v3/icon-refresh.png', srcset='/publicAssets/img/v3/icon-refresh@2x.png 2x')
					span.text-xs.text-psV3Red 换一批

			.w-full.grid.grid-cols-1.gap-4
				.col-span-1.rounded.bg-white.shadow(v-for='(guessGame, index) in state.guessRecommandList')
					guessListForRoomItem(:guessGame='guessGame', @guessRecommandUpadte='guessRecommandUpadte')

		.col-span-1 
			.CENTER_BETWEEN
				h3.mb-4.text-psV3Red 
					img(src='/publicAssets/img/v3/icon-news.png', srcset='/publicAssets/img/v3/icon-news@2x.png 2x')
					span 精选文章

				router-link.mr-4(tag='span', to='/article/class')
					span.text-xs.text-psV3Red 查看更多
					img.w-4(src='/publicAssets/img/v3/icon-right.png', srcset='/publicAssets/img/v3/icon-right@2x.png 2x')

			.w-full.grid.grid-cols-1.gap-4
					.col-span-1(v-for='item in state.articleRecommandList')
						articleTopForIndex(:articleData='item')
</template>
<script>
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted, reactive } from 'vue';
import { guessRecommend, articleClassList } from '@/api';
import guessListForRoomItem from '@/components/guess/guessListForRoomItem';
import articleTopForIndex from '@/components/article/articleTopForIndex.vue';
import { RightOutlined } from '@ant-design/icons-vue';
export default {
	components: {
		guessListForRoomItem,
		articleTopForIndex,
		RightOutlined,
	},
	setup() {
		const router = useRouter();
		const state = reactive({
			guessRecommandList: [],
			articleRecommandList: [],
		});
		const init = () => {
			guessRecommandUpadte();
			articleClassList({
				class_id: 0,
				top: 1,
			}).then((res) => {
				state.articleRecommandList = res.data.list.filter((task, index) => index < 3);
			});
		};
		const guessRecommandUpadte = () => {
			state.guessRecommandList = [];
			guessRecommend().then((res) => {
				//  先亂數排列 然後取前三筆
				const tempArray = res.data.list;
				if (tempArray) {
					tempArray.sort(function () {
						return Math.random() > 0.5 ? -1 : 1;
					});
					state.guessRecommandList = tempArray.filter((task, index) => index < 3);
				}
			});
		};
		onMounted(() => {
			init();
		});
		return {
			state,
			init,
			guessRecommandUpadte,
		};
	},
};
</script>
<style lang="scss" scoped></style>
