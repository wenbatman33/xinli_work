<template lang="pug">
.w-full(v-if='Sponsor.length>0')
	img.w-full.cursor-pointer(:src='apiImgPath(Sponsor[0].imageWeb)'  @error='errorImg' @click='deepLink(Sponsor[0].targetURL)')

</template>

<script setup lang="ts">
	import { onMounted, ref, computed } from 'vue';
	import { errorImg, apiImgPath, deepLink } from '@/utils';
	import { getEventBanner } from '@/api';

	const Sponsor = ref([] as any);
	const init = async () => {
		const res = await getEventBanner({ categortyID: 2 });
		Sponsor.value = res.data.data?.list;
	};
	onMounted(() => {
		init();
	});
</script>
