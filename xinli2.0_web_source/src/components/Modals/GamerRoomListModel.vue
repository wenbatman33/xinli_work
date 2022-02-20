<template lang="pug">
a-modal.radiusModal(
	:visible='systemStore.gamerRoomListModelVisabled'
	width='456px' 
	centered, 
	:footer='null',
	:mask-closable='false', 
	:keyboard='false', 
	@cancel='closeModel')
		h5.mb-4 请选择游戏区
		.h-16.border-b.border-dashed.FLEX_R_CENTER.cursor-pointer(v-for='item in gameStore.gameList' :class='"hover:bg-gray-100"' @click='gamePlay(item)') 
			.p-4
				span.font-bold {{item.display}}
				span.text-gray-500.mx-4 {{item.info}}
				span.text-gray-500.mx-4 {{item.id}}

</template>

<script setup lang="ts">
	import { SystemStore } from '@/store/systemStore';
	import { GameStore } from '@/store/gameStore';

	import PasswordForm from '@/components/Personal/Personal/PasswordForm.vue';

	const systemStore = SystemStore();
	const gameStore = GameStore();

	const gamePlay = (item: any) => {
		gameStore.gameLoingHandle(item.id, 3, gameStore.currentgameID);
	};
	const closeModel = () => {
		systemStore.gamerRoomListModelVisabled = false;
	};
</script>
