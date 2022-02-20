<template lang="pug">
.about(v-if='state.article')
	nav-bar(:title='state.article.post_title', right-button='/publicAssets/img/icon-close-red@3x.png',  @click-right='onClickRight')
	.p-8(v-if='state.article', v-html='state.article.post_content')
	van-skeleton(v-else, :row='3')
</template>
<script>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, watch } from 'vue';
import { portalManager } from '@/api';
import navBar from '@/components/navBar';

export default {
	components: {
		navBar,
	},
	setup() {
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			article: '',
		});
		watch(
			() => route.params.id,
			(newUrl, prevUrl) => {
				init();
			}
		);
		const onClickRight = () => {
			router.go(-1);
		};
		const init = () => {
			if (route.params.id) {
				portalManager({ id: route.params.id }).then((res) => {
					state.article = res.data;
					window.scrollTo(0, 0);
				});
			}
		};

		onMounted(() => {
			init();
		});
		return {
			state,
			init,
			route,
			router,
			onClickRight,
		};
	},
};
</script>
<style lang="scss" scoped>
.about {
	background: #fff;
	min-height: 600px;
	border-radius: 8px;
    ::v-deep(.van-nav-bar__content) {
        background-color: #a62337;
    }
    ::v-deep(.van-nav-bar__title) {
        color: #ffffff;
    }
    ::v-deep(.van-icon) {
        color: #ffffff;
    }
}
</style>
