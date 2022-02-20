<template lang="pug">
.eventPage(class='lg:my-8 lg:mx-auto lg:rounded')
	img(v-if='isPc', src='/publicAssets/img/event/mon_coming/img-vision-a.png')
	img.w-full(v-else, src='/publicAssets/img/event/mon_coming/img-vision-b.png', srcset="/publicAssets/img/event/mon_coming/img-vision-b@2x.png 2x")
	.text-center.text-white.my-2.text-lg.font-bold 2021/03/06 ~ 2021/05/23
	.text-center.text-white.my-2.text-lg.font-bold
		span.cursor-pointer(@click='state.page=1', :class='{"text-psV3Yellow": state.page===1}') 任务拿奖励 
		span.mx-2 |
		span.cursor-pointer(@click='state.page=2', :class='{"text-psV3Yellow": state.page===2}') 转盘抽大奖 
		span.mx-2 |
		span.cursor-pointer(@click='state.page=3', :class='{"text-psV3Yellow": state.page===3}') 蕉币买机会 
	.px-4
		tasks(v-if='state.page===1')
		game(v-if='state.page===2')
		chance(v-if='state.page===3')
</template>
<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, onUnmounted, computed, reactive, toRaw } from 'vue';
import { browserType } from '@/utils';
import tasks from '@/views/event/mon_coming/tasks.vue';
import game from '@/views/event/mon_coming/game.vue';
import chance from '@/views/event/mon_coming/chance.vue';

export default {
	components: {
		tasks,
		game,
		chance,
	},
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const isPc = browserType();
		const state = reactive({
			page: 1,
		});
		// store  ------------
		return {
			store,
			route,
			router,
			isPc,
			state,
		};
	},
};
</script>
<style lang="scss" scoped>
.eventPage {
	position: relative;
	width: 100%;
	max-width: 1200px;
	min-height: 600px;
	overflow: hidden;
	background: #000;
}
.activeClass {
	color: #f7b500;
}
</style>
