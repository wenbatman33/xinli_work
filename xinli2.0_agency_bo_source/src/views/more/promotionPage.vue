<template>
	<div class="container pb-4 FLEX_C">
		<div class="px-2">
			<van-list v-model:loading="loading" :finished="finished" :finished-text="$t('more_promotionPage_02')" @load="onLoad">
				<div v-for="item in tableDataRef" :key="item.name">
					<div class="bg-[#0f0f0f] container px-2 py-4 FLEX_C">
						<van-image v-bind:src="apiImgPath(item.imageH5)" @click="toBanner(item.imageH5)" />
						<p class="text-xs text-subWhite">{{ item.endTime }}</p>
						{{ item.name }}
						<div v-html="item.content"></div>
					</div>
				</div>
			</van-list>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import type { AGENCYAJAX_PromotionLaunchedListResponseData } from '@/api/model';
	import { getPromotionList } from '@/api';
	import { apiImgPath } from '@/utils'
	import { ref } from 'vue';
	
	const router = useRouter();
	const tableDataRef = ref<Array<AGENCYAJAX_PromotionLaunchedListResponseData>>([]);
	const loading = ref(true);
	const finished = ref(false);

	const onLoad = () => {
		getPromotionList().then((response) => {
			tableDataRef.value = response.data.data?.list || [];
			loading.value = false;
			finished.value = true;
		});
	};
	const toBanner = (path) => {
		router.push({
			path: '/promotionBannerPage/id',
			query: { path },
		});
	};
</script>
