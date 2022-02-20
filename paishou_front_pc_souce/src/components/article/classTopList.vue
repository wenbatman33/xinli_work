<template lang="pug">
.classTopList.w-full.relative
	#classTopList.w-full.overflow-hidden(style='height:200px')
		.swiper-wrapper
			.swiper-slide(v-for='(item) in dataList')
				.w-full.overflow-hidden.h-48.relative
					.absolute.z-0.bg-blue-200.w-full.h-full.bg-cover.bg-center.cursor-pointer.transform.transition.duration-300(class='hover:scale-125', :style='`background-image: url(${item.pic});`', @click='gotoInfo(item.title, item.id)')
					.info.relative.top-0.z-10.pointer-events-none.p-4.FLEX_C.justify-end
						.text-xs.text-white {{formatDate(item.release_time)}} - {{item.class_name}}
						.text-white.font-bold {{item.title}}
						.CENTER_BETWEEN.text-white.text-xs.mt-2
							.FLEX_R
								img.AVATAR.w-5.h-5(:src='item.avatar', @error='errorPersonImg')
								span.mx-2 {{item.nickname}}
							.FLEX_R.items-center
								img.w-3.h-3.mr-2(src='/publicAssets/img/v3/icon-eye-on-w.png', srcset='/publicAssets/img/v3/icon-eye-on-w@2x.png 2x')
								span.mr-4 {{item.pageview_front}}
								img.w-3.h-3.mr-2(src='/publicAssets/img/v3/icon-comments-w.png', srcset='/publicAssets/img/v3/icon-comments-w@2x.png 2x')
								span {{item.message_num}}
	.w-full#pagination.swiper-pagination
					
</template>

<script>
import Swiper, { Autoplay } from 'swiper';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, onUnmounted, reactive, watch, nextTick } from 'vue';
import { matomo_article_topic_click } from '@/matomoEvent';
import { errorPersonImg, formatDate } from '@/utils';

Swiper.use([Autoplay]);
export default {
	props: ['dataList'],
	setup(props, { emit }) {
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			swiper: null,
		});

		watch(
			() => props.dataList,
			(newVal) => {
				nextTick(() => {
					state.swiper.update();
				});
			},
			{ deep: true }
		);
		const gotoInfo = (titile, id) => {
			matomo_article_topic_click(titile, id);
			router.push(`/article/info/${id}`);
		};

		onMounted(() => {
			state.swiper = new Swiper('#classTopList', {
				slidesPerView: 2,
				spaceBetween: 10,
				slidesPerGroup: 2,
				autoplay: {
					delay: 8000,
				},
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
					bulletElement: 'li',
					clickable: true,
				},
			});
		});

		onUnmounted(() => {
			if (state.swiper) {
				state.swiper.destroy();
				state.swiper = null;
			}
		});
		return {
			route,
			router,
			state,
			errorPersonImg,
			gotoInfo,
			formatDate,
		};
	},
};
</script>
<style lang="scss" scoped>
.info {
	height: 100%;
	background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 1) 100%);
}
#pagination {
	position: relative;
	::v-deep(.swiper-pagination-bullet) {
		width: 12px;
		height: 12px;
		margin: 0 4px;
	}
	::v-deep(.swiper-pagination-bullet-active) {
		width: 30px;
		height: 12px;
		border-radius: 12px !important;
		background-color: #a62337 !important;
	}
}
</style>
