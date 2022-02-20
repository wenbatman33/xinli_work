<template lang="pug">
#Container.Container.FLEX_C.justify-between.py-8.relative
	slideBanner.mb-4(:slide_cid='15', :autoPlaySpeed='5000')
	router-view
	floatBar
</template>
<script>
import { useRoute, useRouter } from 'vue-router';
import menuList from '@/components/personal/menuList.vue';
import slideBanner from '@/components/swipers/slideBanner.vue';
import floatBar from '@/components/index/floatBar.vue';
import { onMounted, onUnmounted, reactive } from 'vue';
import { slideList } from '@/api';

export default {
	components: {
		menuList,
		slideBanner,
		floatBar,
	},
	setup() {
		const router = useRouter();
		const route = useRoute();

		return {
			router,
			route,
		};
	},
};
</script>
<style lang="scss" scoped></style>
