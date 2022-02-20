<template lang="pug">
.w-full
	h1.my-2.text-psV3Red 空白components
</template>
<script>
import { useRoute, useRouter } from 'vue-router';
import { reactive, onMounted } from 'vue';

export default {
	setup() {
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			adBannerList: null,
		});

		const init = () => {};
		onMounted(() => {
			init();
		});
		return {
			init,
			state,
		};
	},
};
</script>
<style lang="scss" scoped></style>
