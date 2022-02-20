<template lang="pug">
.jigsaw.w-full.min-h-screen.bg-home.pb-20
	.Container.FLEX_C
		.titleImg.text-center
			img.mt-28(src='/publicAssets/img/event/jigsaw/img-title.png' , srcset='/publicAssets/img/event/jigsaw/img-title@2x.png 2x')
		.desc.text-center.mt-20
			h4.text-psV3Red 活动说明
			.text-sm.text-gray-500
				p 拍手散落的拼图掉了，赶紧帮忙拍手一起找寻拼图吧!
				p 只要完成
					span.text-psV3Yellow 观看直播间赛事10分钟
					span ，就可以获得
					span.text-psV3Yellow 拼图一个 ! 
				p
					span.text-psV3Orange 一日只會有一塊拼圖。
					span 用户完成9片后即完成此任务。
		.desc.text-center.mt-5
			h4.text-psV3Red 您的拼图进度
			.puzzleBlock.relative
				.puzzleContainer.inline-block.w-auto.mx-auto.relative
					.bg
						img(src='/publicAssets/img/event/jigsaw/img-puzzle-board.png' , srcset='/publicAssets/img/event/jigsaw/img-puzzle-board@2x.png 2x')
					.puzzle.absolute(v-for='(item, index) in state.jigsaws', :style='`top:${state.position[index].top}; left:${state.position[index].left};`')
						img(v-if='item.get=== true', :src='item.img')

		.desc.text-center.mt-5
			h4.text-psV3Red 拼图进度奖励
			.grid.grid-cols-5.gap-4.my-4
				.col-span-1.bg-white.rounded.shadow.p-4(v-for='(item, index) in state.progress', :class='{"opacity-50":item.get===true}')
					.CENTER
						.circleImg.w-36.h-36
							img.circleImg.w-full(:src='item?.img')
					h4.text-psV3Red {{item?.title}}
					h5.my-2 {{state.jigsawTitle[index]}}
					.border.bg-gray-500.text-white.rounded-full.p-2.my-2(v-if='item.get=== true') 已放入背包
					.border.border-gray-300.rounded-full.p-2.my-2(v-if='item.get===false') 待完成
			.text-sm.text-gray-500
				p
					span 完成拼图即可获得
					span.text-psV3Orange 拍手大礼包*1 
				p 只要搜集符合进度，系统会自动将奖励放入您的背包

		.desc.text-center.mt-5
			h4.text-psV3Red 注意事项
			.text-sm.text-gray-500
				p 拍手直播有权利提早或终止活动，若提前截止，会提早公告。
				p 活动过程中如有发现违规行为，我方有权取消此行为的用户参予活动资格
				p 并扣除本活动所获得奖励。

</template>
<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, watch, reactive } from 'vue';
import { event011Info } from '@/api';

export default {
	components: {},
	setup() {
		const store = useStore();
		const router = useRouter();
		const UID = computed(() => store.state.user.uid || '');
		const TOKEN = computed(() => store.state.user.token || '');
		const state = reactive({
			jigsaws: [],
			jigsawTitle: ['香蕉*50', '666*2', 'LOVE*3', '关键一球*5', '拍手大礼包'],
			position: [
				{ top: '50px', left: '50px' },
				{ top: '50px', left: '316px' },
				{ top: '50px', left: '576px' },
				{ top: '246px', left: '52px' },
				{ top: '311px', left: '315px' },
				{ top: '312px', left: '509px' },
				{ top: '507px', left: '51px' },
				{ top: '506px', left: '246px' },
				{ top: '572px', left: '508px' },
			],
			progress: [],
		});
		const init = () => {
			const payload = {
				uid: UID.value || 0,
				token: TOKEN.value || '',
			};

			event011Info(payload).then((res) => {
				state.jigsaws = res.data.jigsaws;
				state.progress = res.data.progress;
			});
		};
		onMounted(() => {
			init();
		});
		return {
			init,
			store,
			UID,
			TOKEN,
			state,
		};
	},
};
</script>
<style lang="scss" scoped>
.jigsaw {
	background: url('/publicAssets/img/event/jigsaw/img-web-background@2x.jpg');
	background-size: cover;
}
</style>
