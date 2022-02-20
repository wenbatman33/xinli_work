<template lang="pug">
.Container.py-8
	.about.Container.bg-white.rounded-xl.p-8(class='min-h-[600px]')
		div(v-if='state.article', v-html='state.article.post_content')
		a-skeleton(v-else, active, :paragraph='{ rows: 16}')
</template>
<script>
import { useRoute } from 'vue-router';
import { onMounted, reactive, watch } from 'vue';
import { portalManager } from '../api';

export default {
	setup() {
		const route = useRoute();
		const state = reactive({
			article: '',
		});
		watch(
			() => route.params.id,
			(newUrl, prevUrl) => {
				init();
			}
		);
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
		};
	},
};
</script>
<style lang="scss" scoped></style>
