<template lang="pug">
.Container.BETWEEN.py-8
	recharge
</template>
<script>
import recharge from '@/components/recharge';
import { onMounted, onUnmounted } from 'vue';
export default {
	components: {
		recharge,
	},
	setup() {
		onUnmounted(() => {
			document.querySelector('.appContainer').style.backgroundImage = 'none';
		});
		onMounted(() => {
			document.querySelector('.appContainer').style.backgroundImage = "url('/publicAssets/img/v3/img-repeat-banana.png')";
		});
	},
};
</script>
<style lang="scss" scoped></style>
