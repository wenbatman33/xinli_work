<template lang="pug">
.Container.FLEX_C.py-4.min-h-screen.pb-8
	//- AD 側區塊
	.w-full.my-4
		slideBanner(:slide_cid='25',  :autoPlaySpeed='5000')

	.BETWEEN
		//- article 左側區塊
		.funcBar.w-40.pr-2.flex-shrink-0
			.text-lg.text-psV3Red.cursor-pointer(@click='gotoArticle')
				span
					img(src='/publicAssets/img/v3/icon-left.png'  srcset='/publicAssets/img/v3/icon-left@2x.png 2x')
				span 返回列表
		.FLEX_C.flex-grow
			//- p {{state.topicInfo}}
			topicHeader(:topicData='state.topicInfo')
			.w-full.grid.grid-cols-3.gap-4
				.col-span-1(v-for='item in state.articleList')
					articleCrad(:articleData='item')
</template>

<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, watch, reactive } from 'vue';
import { articleTopic, articleTopicList } from '@/api';
import slideBanner from '@/components/swipers/slideBanner.vue';
import topicHeader from '@/components/article/topicHeader.vue';
import articleCrad from '@/components/article/articleCrad.vue';
import { matomo_article_topic_back } from '@/matomoEvent';

export default {
	components: {
		slideBanner,
		topicHeader,
		articleCrad,
	},
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			topicInfo: null,
			articleList: null,
		});
		const init = () => {
			state.topicInfo = null;
			state.articleList = null;
			const payload = {
				id: Number(route.params.id),
			};
			articleTopic(payload).then((res) => {
				state.topicInfo = res?.data || [];
			});
			articleTopicList(payload).then((res) => {
				state.articleList = res?.data.list || [];
			});
		};
		const gotoArticle = (id) => {
			matomo_article_topic_back();
			router.push(`/article/class`);
		};
		watch(
			() => route.params.id,
			(newVal) => {
				if (newVal) init();
			},
			{ deep: true }
		);
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			route,
			router,
			UID,
			init,
			gotoArticle,
		};
	},
};
</script>
<style lang="scss" scoped></style>
