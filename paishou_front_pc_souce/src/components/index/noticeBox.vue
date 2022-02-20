<template lang="pug">
.notice_box.w-full.bg-gray-100.rounded-xl.p-4.my-2
	.BETWEEN
		.noticeBanner.flex.flex-shrink-0
			.grid.grid-col-2.grid-rows-2.gap-4(style='width: 766px; height: 340px;')
				.col-start-0.col-span-1.row-span-2.overflow-hidden.rounded-lg.relative(style='width: 416px; height: 340px;')
					.noticeSlideBanner.w-full.h-full
						.swiper-wrapper(v-if='state.noticeBanner_1.length>0')
							.swiper-slide(v-for='(item, index) in state.noticeBanner_1')
								img.cursor-pointer(:src='item.slide_pic', @click.native='bannerClick(item.slide_url)')
						.swiper-pagination
				.col-start-2.col-span-1.row-span-1.overflow-hidden.rounded-lg
					img.w-full.cursor-pointer(:src='state?.noticeBanner_3?.slide_pic', @click='bannerClick(state?.noticeBanner_3?.slide_url)')
				.col-span-1.row-span-1.overflow-hidden.rounded-lg
					img.w-full.cursor-pointer(:src='state?.noticeBanner_4?.slide_pic', @click='bannerClick(state?.noticeBanner_4?.slide_url)')
		.noticeWrap.FLEX_C.flex-grow.pl-4
			.notice_head
				h3.text-psV3Red.mb-2
					img(src='/publicAssets/img/v3/icon-announcement.png', srcset='/publicAssets/img/v3/icon-announcement@2x.png 2x')
					span 活动与公告
					.float-right
						router-link(tag='span', :to="{ path: '/notice' }")
							.BETWEEN.text-xs.text-psV3Red
								span.text-xs 查看更多
								RightOutlined
			.notice_container.FLEX_C.flex-grow-0.h-72.overflow-y-auto
				.notice.rounded.bg-white.mb-2.p-1.FLEX_R.items-center.cursor-pointer(v-for='(item, index) in state.noticeList', :key='index', @click='details(item.id, index)')
					span.text-xs.notice_type.rounded.text-white.flex.flex-shrink-0.p-1(v-if='item.name==="直播"' :style='{background:"#28c163"}') {{ item.name }}
					span.text-xs.notice_type.rounded.text-white.flex.flex-shrink-0.p-1(v-else-if='item.name==="活动"' :style='{background:"#ff9a00"}') {{ item.name }}
					span.text-xs.notice_type.rounded.text-white.flex.flex-shrink-0.p-1(v-else-if='item.name==="系统"' :style='{background:"#3f91ff"}') {{ item.name }}
					span.text-xs.notice_type.rounded.text-white.flex.flex-shrink-0.p-1(v-else-if='item.name==="其他"' :style='{background:"#f1433f"}') {{ item.name }}
					span.text-xs.truncate.notice_content.m-0.flex.flex-grow.mx-2 {{ item.title }}
					span.text-xs.notice_time.flex.flex-shrink-0 {{ parseTime(item.create_at) }}
</template>
<script>
import dayjs from 'dayjs';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, onUnmounted, watch, reactive, nextTick } from 'vue';
import { noticeList, slideList } from '@/api';
import { RightOutlined } from '@ant-design/icons-vue';
import Swiper, { Navigation, Pagination } from 'swiper';
import { deepLink } from '@/utils';
Swiper.use([Navigation, Pagination]);

export default {
	components: {
		RightOutlined,
	},
	setup() {
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			noticeList: [],
			noticeBanner_1: [],
			noticeBanner_3: [],
			noticeBanner_4: [],
			swiper: null,
		});
		const parseTime = (time) => {
			return dayjs(time * 1000).format('MM-DD');
		};
		const getNoticeList = () => {
			noticeList().then((res) => {
				state.noticeList = res.data.list;
			});
			slideList({ slide_cid: 1 }).then((res) => {
				state.noticeBanner_1 = res.data.list;
				// 需要 setTimeout  loop 功能才會正常
				setTimeout(() => {
					state.swiper = new Swiper('.noticeSlideBanner', {
						pagination: {
							el: '.swiper-pagination',
							type: 'bullets',
							bulletElement: 'li',
						},
						loop: true,
						autoplay: {
							delay: 5000,
							disableOnInteraction: false,
						},
					});
				}, 800);
			});
			slideList({ slide_cid: 3 }).then((res) => {
				state.noticeBanner_3 = res.data.list[0];
			});
			slideList({ slide_cid: 4 }).then((res) => {
				state.noticeBanner_4 = res.data.list[0];
			});
		};
		const bannerClick = (url) => {
			if (url) deepLink(url);
		};
		//公告详情
		const details = (id, index) => {
			router.push({
				path: '/notice/details',
				query: {
					id: id,
				},
			});
		};
		watch(
			() => state.noticeBanner_1,
			(newVal) => {
				nextTick(() => {
					setTimeout(() => {
						state.swiper.update();
					}, 1000);
				});
			},
			{ deep: true }
		);
		onMounted(() => {
			getNoticeList();
		});
		onUnmounted(() => {
			state.swiper.destroy();
			state.swiper = null;
		});
		return {
			state,
			getNoticeList,
			parseTime,
			details,
			bannerClick,
		};
	},
};
</script>
<style lang="scss" scoped>
.swiper-pagination-bullet-active {
	background-color: #fff !important;
}
</style>
