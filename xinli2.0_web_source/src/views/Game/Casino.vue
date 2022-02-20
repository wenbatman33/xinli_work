<template lang="pug">
.pageContainer
	.container.py-8.select-none
		.grid.grid-cols-4.gap-4.my-4
			.col-span-1( v-for='item in casinoList')
				.rounded-lg.overflow-hidden.relative.cursor-pointer(
					:class='{"hoverJump": currentID === item.id && item.status===1 }'
					@mouseover='currentID= item.id||0'
					@mouseout='currentID=0'
					@click='playHandle(item)')
					.bg.z-0.relative
						img.z-0(:src='apiImgPath(item?.imagePc)' @error='errorImg')
					.WH_FULL.absolute.top-0.z-10.p-4.BETWEEN_C
						h6.text-white.text-center {{item.displayName}}

						.bg-black.bg-opacity-60.text-center(v-if='item.status===2 ') 
							p.my-2
								span.text-white
									SvgIcon.w-5.h-5.text-white(:name='"#No_Service"')
								span.text-white {{t('game_maintenance')}}
							p.my-2
								span.text-white
									SvgIcon.w-4.h-4.text-white(:name='"#Clock"')

								span.text-white {{item.maintainTime}}
						a-button.w-full.transition.opacity-100(v-else type='primary' danger :class='{"opacity-0": currentID !== item.id}') {{t('game_play')}}
	
	.ListFooterBg.w-full(:class='"h-[256px]"' :style='{ "background-image": "url(" + casinoFooterBg + ")", "background-size":"cover" }')
</template>

<script setup lang="ts">
	import { ref, reactive, computed } from 'vue';
	import { SystemStore } from '@/store/systemStore';
	import { GameStore } from '@/store/gameStore';
	import { UserStore } from '@/store/userStore';
	import { useRoute, useRouter } from 'vue-router';
	import { gameAgLogin } from '@/api';
	import type { GAMEAJAX_GameGroupLobbyGameTypeListDTO } from '@/api/model';
	import { apiImgPath, errorImg } from '@/utils';
	import { useI18n } from 'vue-i18n';
	import { gameLoing } from '@/api';

	import SvgIcon from '@/components/SvgIcon/index.vue';

	const { t } = useI18n();
	const route = useRoute();
	const router = useRouter();
	const currentID = ref(0);
	const casinoFooterBg = `${window.staticPath}/static/img/game/casinoFooterBg@2x.png`;
	const systemStore = SystemStore();
	const gameTypeID = computed(() => {
		let ID = 0;
		if (route.path === '/casino') {
			ID = 2;
		} else if (route.path === '/chess') {
			ID = 5;
		} else if (route.path === '/fish') {
			ID = 6;
		} else if (route.path === '/slot') {
			ID = 7;
		}
		return ID;
	});
	const userStore = UserStore();
	const gameStore = GameStore();
	const lobby = computed(() => gameStore.lobby as GAMEAJAX_GameGroupLobbyGameTypeListDTO[]);
	const casinoList = computed(() => {
		const casino = lobby.value.filter((item) => item.id === 2)[0]?.gameGroupList;
		const list = casino?.filter((item: any) => item.id !== 0);
		return list;
	});
	const playHandle = (item: any) => {
		if (item.openWay === 3) {
			const json = item.openGameListIDs;
			gameStore.gameList = json;
			systemStore.gamerRoomListModelVisabled = true;
		} else if (item.openWay === 2) {
			gameStore.gameLoingHandle(item.openGameListIDs[0].id, item.openWay, gameTypeID.value);
		} else {
			gameStore.gameLoingHandle(item?.id, item.openWay, gameTypeID.value);
		}
	};
</script>
