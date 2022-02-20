<template lang="pug">
.FLEX_C
	.mr-4.FLEX_R_CENTER
		SvgIcon.w-10.h-10.text-paimary.mr-4(:name='"#Hot"')
		span
			h5 {{currentGameGroup.displayName}} 
	.w-full.py-4
		.grid.grid-cols-5.gap-4
			.col-span-1(v-for='item in gameList')
				GameItem(:data='item' @reload='init' :openWay='currentGameGroup?.openWay')
			
</template>

<script setup lang="ts">
	import { ref, watch, computed } from 'vue';
	import { useRoute, useRouter } from 'vue-router';

	import SvgIcon from '@/components/SvgIcon/index.vue';
	import GameItem from '@/components/Game/GameItem.vue';
	import { getGameByGroupid } from '@/api';
	import { onMounted } from 'vue';
	import type { GAMEAJAX_GameListDTO } from '@/api/model';
	import { GameStore } from '@/store/gameStore';

	const gameStore = GameStore();
	const route = useRoute();
	const router = useRouter();
	const gameList = ref([] as GAMEAJAX_GameListDTO[]);
	watch(
		() => route.params.id,
		(newVal) => {
			newVal !== 'favorite' && newVal !== 'hot' && init();
		}
	);
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

	const currentGameType = computed(() => {
		const array = gameStore?.lobby.filter((item: any) => item.id === gameTypeID.value)[0]?.gameGroupList;
		// 刪除 全部 0 的預設值選項
		return array?.filter((item: any) => item.id !== 0);
	});

	const currentGameGroup = computed(() => {
		const array = currentGameType?.value?.filter((item: any) => item.id === Number(route.params.id))[0];
		return array || {};
	});

	const init = async () => {
		if (route.params.id) {
			const res = await getGameByGroupid({ gameGroupID: Number(route.params.id) });
			gameList.value = res?.data?.data?.list || [];
		}
	};
	onMounted(() => {
		init();
	});
</script>
