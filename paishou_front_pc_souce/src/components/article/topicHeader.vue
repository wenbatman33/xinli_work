<template lang="pug">
.topicHeader.bg-black.rounded.w-full.overflow-hidden.shadow.mb-4(v-if='topicData', style='height:300px;')

	.group.w-full.h-full.overflow-hidden.bg-cover.bg-center(:style='`background-image: url(${topicData.pic});`')
		.gradientBg.p-4.FLEX_C.justify-end
			.CENTER_BETWEEN
				.topicInfo
					.text-xs.text-white.mb-1 精选主题
					h3.text-white {{topicData.name}}
					.text-xs.text-white.mb-1 更新时间 {{topicData.updated_at}} 此主题有{{topicData.num}}篇文章 
				.nextBtn.border.border-white.rounded-full.text-white.text-xs.p-2.cursor-pointer(v-if='topicData.next_id!==0', @click='gotoNextTopic(topicData.next_id)') 下个主题
</template>
<script>
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, onUnmounted, reactive, computed } from 'vue';
import { matomo_article_topic_next } from '@/matomoEvent';

export default {
	props: ['topicData'],
	setup(props) {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();

		const gotoNextTopic = (id) => {
			matomo_article_topic_next(id);
			router.push(`/article/topic/${id}`);
		};

		return {
			store,
			route,
			router,
			gotoNextTopic,
		};
	},
};
</script>
<style lang="scss" scoped>
.gradientBg {
	height: 100%;
	background-image: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
}
</style>
