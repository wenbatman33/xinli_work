<template lang="pug">
.scheduleList.overflow-hidden.bg-white.rounded-lg.p-4.my-2(v-if='state.gameList', style='width:1200px')
	h3.mb-4.text-psV3Red 
		img.w-8(src='/publicAssets/img/v3/icon-apploud-red.png', srcset='/publicAssets/img/v3/icon-apploud-red@2x.png 2x')
		span 精彩赛事
	.CENTER_BETWEEN
		img.cursor-pointer(@click='prev', src='/publicAssets/img/v3/left-red.png', srcset='/publicAssets/img/v3/left-red@2x.png 2x')
		.flex.flex-grow.overflow-hidden
			.swiper-container.w-full.px-4
				.swiper-wrapper
					.swiper-slide(v-for='(item,index) in state.gameList')
						.p-2
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
	setup(props, { emit }) {
		const store = useStore();
		const UID = computed(() => store.state.user.uid || '');
		const state = reactive({
			swiper: null,
			gameList: [],
		});
		const next = () => {
			state.swiper.slideNext();
		};
		const prev = () => {
			state.swiper.slidePrev();
		};
		const init = () => {
			scheduleList({
				page: 1,
				pagesize: 1000,
				is_wonderful: 1,
			}).then((res) => {
				state.gameList = res.data.list;
			});
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
			() => state.gameList,
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
