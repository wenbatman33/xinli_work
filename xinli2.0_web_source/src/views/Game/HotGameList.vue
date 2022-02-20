<template lang="pug">
.FLEX_C
	.mr-4.FLEX_R_CENTER
		SvgIcon.w-10.h-10.text-paimary.mr-4(:name='"#Hot"')
		span
			h5 {{ groupName }}
	.w-full.py-4
		.grid.grid-cols-1.gap-4
			.col-span-1(v-for='item in gameList')
				HotGameListSwiper(:data='item')
</template>

<script setup lang="ts">
	import { computed, onMounted, ref, watch } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { getHotgame } from '@/api';
	import type { GAMEAJAX_HotGameData } from '@/api/model';
	import { useI18n } from 'vue-i18n';
	import SvgIcon from '@/components/SvgIcon/index.vue';
	import GameItem from '@/components/Game/GameItem.vue';
	import HotGameListSwiper from '@/components/Game/HotGameListSwiper.vue';

	const { t } = useI18n();
	const route = useRoute();
	const router = useRouter();

	const gameList = ref([] as GAMEAJAX_HotGameData[]);
	const groupName = computed(() => {
		let result = '';
		if (route.path.indexOf('/chess') >= 0) {
			result = t('game_hot_chess');
		} else if (route.path.indexOf('/fish') >= 0) {
			result = t('game_hot_fish');
		} else if (route.path.indexOf('/slot') >= 0) {
			result = t('game_hot_slot');
		}
		return result;
	});
	const gameTypeID = computed(() => {
		let ID = 0;
		if (route.path.indexOf('/chess') >= 0) {
			ID = 5;
		} else if (route.path.indexOf('/fish') >= 0) {
			ID = 6;
		} else if (route.path.indexOf('/slot') >= 0) {
			ID = 7;
		}
		return ID;
	});
	watch(
		() => route.path,
		(newVal) => {
			if (route.params.id === 'hot') init();
		}
	);
	const init = async () => {
		const res = await getHotgame({ gameTypeID: gameTypeID.value });
		gameList.value = res?.data?.data?.list || [];
	};
	onMounted(() => {
		init();
	});
</script>
