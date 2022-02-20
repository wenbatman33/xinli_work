<template>
	<div class="container pb-4 FLEX_C">
		<div class="px-2">
			<van-list v-model:loading="loading" :finished="finished" :finished-text="$t('more_announcement_02')" @load="onLoad">
				<div v-for="item in tableDataRef" :key="item.title">
					<div class="bg-[#0f0f0f] container px-2 py-4 FLEX_C">
						<!-- <van-image v-bind:src="item.imgSrc" /> -->
						<p class="text-xs text-subWhite">{{ item.startTime }}</p>
						{{ item.title }}
						<div v-html="item.context"></div>
					</div>
				</div>
			</van-list>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import type { AGENCYAJAX_AnnouncementListResponseData } from '@/api/model';
	import { getAnnouncementList } from '@/api';

	const tableDataRef = ref<Array<AGENCYAJAX_AnnouncementListResponseData>>([]);
	const loading = ref(false);
	const finished = ref(false);

	const onLoad = () => {
	};
	onMounted(() => {
		getAnnouncementList().then((res) => {
			loading.value = true;
			if (res.data.statusCode === 0) {
				tableDataRef.value = res.data.data?.list || [];
				finished.value = true;
			}
		});
	});
</script>
