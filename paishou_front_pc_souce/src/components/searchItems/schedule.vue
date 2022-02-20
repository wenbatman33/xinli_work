<template lang="pug">
.scheduleList.overflow-hidden.bg-white.rounded-lg.p-4.my-2(v-if='dataList')
	h3.mb-4.text-psV3Red 
		img(src='/publicAssets/img/v3/icon-apploud.png', srcset='/publicAssets/img/v3/icon-apploud@2x.png 2x')
		span 精彩赛事
	.CENTER_BETWEEN
		img.cursor-pointer(@click='prev', src='/publicAssets/img/v3/left-red.png', srcset='/publicAssets/img/v3/left-red@2x.png 2x')
		.flex.flex-grow.overflow-hidden
			.swiper-container.w-full.px-4
				.swiper-wrapper
					.swiper-slide(v-for='(item,index) in dataList')
						//- .p-2 {{item}}
						scheduleCard(:scheduleData='item')
		img.cursor-pointer(@click='next', src='/publicAssets/img/v3/right.png', srcset='/publicAssets/img/v3/right@2x.png 2x')
		//- RightOutlined(@click='next')
</template>
<script>
import { useStore } from 'vuex';
import Swiper from 'swiper';
import { scheduleList } from '@/api';
import { onMounted, onUnmounted, computed, watch, reactive, nextTick } from 'vue';
import scheduleCard from '@/components/schedule/scheduleCard.vue';

export default {
	components: {
		scheduleCard,
	},
	props: ['dataList'],
	setup(props, { emit }) {
		const store = useStore();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			swiper: null,
		});
		const next = () => {
			state.swiper.slideNext();
		};
		const prev = () => {
			state.swiper.slidePrev();
		};
		const init = () => {
			// scheduleList({
			// 	page: 1,
			// 	pagesize: 1000,
			// 	is_wonderful: 1,
			// }).then((res) => {
			// 	state.dataList = res.data.list;
			// });
		};
		onMounted(() => {
			init();
			state.swiper = new Swiper('.swiper-container', {
				slidesPerView: 3,
				spaceBetween: 10,
			});
		});
		onUnmounted(() => {
			state.swiper.destroy();
			state.swiper = null;
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
		return {
			store,
			UID,
			state,
			next,
			prev,
		};
	},
};
</script>
<style lang="scss" scoped></style>
