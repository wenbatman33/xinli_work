<template lang="pug">
.topicList.overflow-hidden.my-2
	h3.mb-2.text-psV3Red 精选主题
	.CENTER_BETWEEN
		img.cursor-pointer(@click='prev', src='/publicAssets/img/v3/left-red.png', srcset='/publicAssets/img/v3/left-red@2x.png 2x')
		.flex.flex-grow.overflow-hidden.p-2
			.topicListContainer.w-full
				.swiper-wrapper
					.swiper-slide(v-for='(item,index) in state.articleClassList')
						.w-full.h-24.bg-white.rounded.shadow.CENTER.line-clamp-2.p-2.cursor-pointer(@click='gotoTopicInfo(item.id)') {{item.name}}
		img.cursor-pointer(@click='next', src='/publicAssets/img/v3/right.png', srcset='/publicAssets/img/v3/right@2x.png 2x')
</template>
<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import Swiper from 'swiper';
import { onMounted, onUnmounted, computed, watch, reactive, nextTick } from 'vue';
import { articleTopicSpecial } from '@/api';

export default {
	setup(props, { emit }) {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			swiper: null,
			articleClassList: [],
		});
		const next = () => {
			state.swiper.slideNext();
		};
		const prev = () => {
			state.swiper.slidePrev();
		};
		const gotoTopicInfo = (id) => {
			router.push(`/article/topic/${id}`);
		};
		const init = () => {
			articleTopicSpecial().then((res) => {
				state.articleClassList = res.data.list;
			});
		};
		onMounted(() => {
			init();
			state.swiper = new Swiper('.topicListContainer', {
				slidesPerView: 5,
				spaceBetween: 20,
			});
		});
		onUnmounted(() => {
			if (state.swiper) {
				state.swiper.destroy();
				state.swiper = null;
			}
		});
		watch(
			() => state.articleClassList,
			(newVal) => {
				nextTick(() => {
					state.swiper.update();
				});
			},
			{ deep: true }
		);
		return {
			store,
			route,
			router,
			UID,
			state,
			next,
			prev,
			gotoTopicInfo,
		};
	},
};
</script>
<style lang="scss" scoped></style>
