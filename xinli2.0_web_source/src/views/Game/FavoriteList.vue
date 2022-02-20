<template lang="pug">
.FLEX_C
	.mr-4.FLEX_R_CENTER
		SvgIcon.w-10.h-10.text-paimary.mr-4(:name='"#Hot"')
		span
			h5 {{t('game_favorite')}}

	.w-full.min-h-screen.py-4(v-if="FavoriteList.length>0")
		.grid.grid-cols-5.gap-4
			.col-span-1(v-for='item in FavoriteList')
				GameItem(:data='item' @reload='init')

	.w-full.h-screen.CENTER_C.py-4(v-else)
		img(:src='noFavorite')
		p.my-4(v-if='isLogined') {{t('game_favorite_empty')}}
		p.my-4(v-else) {{t('game_favorite_login_noyet')}}
		a-button.w-40.bg-xBlue.text-white.my-4(v-if='!isLogined' @click='login') {{t('game_favorite_login_button')}}

</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { getFavoriteGame } from '@/api';
	import { onMounted } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { UserStore } from '@/store/userStore';
	import { SystemStore } from '@/store/systemStore';
	import { useI18n } from 'vue-i18n';

	import SvgIcon from '@/components/SvgIcon/index.vue';
	import GameItem from '@/components/Game/GameItem.vue';

	const { t } = useI18n();
	const route = useRoute();
	const router = useRouter();
	const userStore = UserStore();
	const systemStore = SystemStore();

	const noFavorite = `${window.staticPath}/static/img/noFavorite.svg`;

	const props = defineProps({
		name: String,
	});
	const FavoriteList = ref([] as any);
	const isLogined = computed(() => userStore.loginInfo);

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
	const login = () => {
		systemStore.commonLogin();
		// systemStore.loginModalShow();
	};

	const init = async () => {
		try {
			const res = await getFavoriteGame({ gameTypeID: gameTypeID.value });
			// api Schema 未補上
			FavoriteList.value = res?.data?.data?.list || [];
		} catch (e) {
			FavoriteList.value = [];
		}
	};
	onMounted(() => {
		if (userStore.userInfo.account) {
			init();
		}
	});
</script>
