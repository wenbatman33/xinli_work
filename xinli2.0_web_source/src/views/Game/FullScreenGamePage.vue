<template lang="pug">
.pageContainer.min-h-screen.FLEX_C
	.gameHeader.bg-black.px-4.items-center.flex.justify-end(:class='"h-[40px]"')
		a-button.text-white(size='small' @click='gameRecycle') {{t('game_close_game')}}
	.gameIFrame.bg-black.flex.flex-grow
		iframe.w-full(id='gameIFrame')
</template>

<script setup lang="ts">
	import { onMounted } from 'vue';
	import { postGameRecycle } from '@/api';
	import { UserStore } from '@/store/userStore';
	import { useRoute, useRouter } from 'vue-router';
	import { useI18n } from 'vue-i18n';
	const { t } = useI18n();
	const route = useRoute();
	const router = useRouter();

	const userStore = UserStore();
	const gameRecycle = async () => {
		window.history.go(-1);
		const result = await postGameRecycle();
		result && userStore.checkUserInfo();
		// router.replace('/casino');
	};

	onMounted(() => {
		(window.document.getElementById('gameIFrame') as HTMLFormElement).src = route.query.path;
	});
</script>
