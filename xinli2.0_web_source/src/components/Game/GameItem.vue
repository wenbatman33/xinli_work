<template lang="pug">
.gameItem.cursor-pointer(@mouseover='mouseoverHandler' @mouseleave='mouseleave' )
	img.w-full(v-if='apiImgPath(data?.imagePc)' :src='apiImgPath(data?.imagePc)')
	.CENTER.absolute.WH_FULL.bg.text-gray-400(v-else)
	.infoLayer.BETWEEN_C(:class='hoverClass')
		.favorite.absolute.w-6.h-6.right-2.top-2.z-40(v-if='userStore.loginInfo && isFavorite===false' @click='gameLikeHandle(data?.id)')
			SvgIcon.w-6.h-6.text-white(:name='"#Action_Star_Outline"')
		.favorite.absolute.w-6.h-6.right-2.top-2.z-40(v-if='userStore.loginInfo && isFavorite===true' @click='gameUnlikeHandle(data?.id)')
			SvgIcon.w-6.h-6.text-white(:name='"#Action_Star_Solid"')
		.flex-grow.CENTER_C
			.my-2
				a-button.mx-1(type='primary' danger @click='gotoGamePage') {{t('game_play')}}
			.my-2(v-if='data?.trialPlay')
				a-button.mx-1(ghost) {{t('game_trialPlay')}}
		.w-full.p-4
			.Subtitle_3.text-white.text-left.truncate {{data?.displayName}}
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { notification } from 'ant-design-vue';
	import { apiImgPath } from '@/utils';
	import { useI18n } from 'vue-i18n';
	import { UserStore } from '@/store/userStore';
	import { GameStore } from '@/store/gameStore';

	import { SystemStore } from '@/store/systemStore';
	import { postGameLike, deleteGameUnlike, gameLoing } from '@/api';

	import SvgIcon from '@/components/SvgIcon/index.vue';

	const { t } = useI18n();
	const userStore = UserStore();

	const systemStore = SystemStore();
	const gameStore = GameStore();
	const props = defineProps({
		data: Object,
		openWay: Number,
	});
	const emit = defineEmits(['reload']);

	const gameImg = `${window.staticPath}/static/img/game/chess/20001.png`;

	const route = useRoute();
	const router = useRouter();
	// const isHover = ref(true);

	const isHover = ref(false);
	const isFavorite = computed(() => props?.data?.isFavorite);
	const hoverClass = computed(() => (isHover.value ? 'moveTop' : 'moveDown'));

	const gameGroupID = computed(() => props?.data?.id);

	// gameTypeID 目前是固定 1.体育 2.真人 3.彩票 4.电竞 5.棋牌 6.捕鱼 7.老虎机
	const gameTypeID = computed(() => {
		let ID = 0;
		if (route.name === 'Chess') {
			ID = 5;
		} else if (route.name === 'Fish') {
			ID = 6;
		} else if (route.name === 'Slot') {
			ID = 7;
		}
		return ID;
	});
	const gameLikeHandle = async (id: number) => {
		if (id) {
			const res = await postGameLike({ gameListID: id });
			if (res.data.status === 'ok') {
				notification.success({ message: t('game_like') });
				emit('reload');
			}
		}
	};
	const gameUnlikeHandle = async (id: number) => {
		if (id) {
			const res = await deleteGameUnlike(id);
			if (res.data.status === 'ok') {
				notification.success({ message: t('game_unlike') });
				emit('reload');
			}
		}
	};
	const mouseoverHandler = () => {
		isHover.value = true;
	};
	const mouseleave = () => {
		isHover.value = false;
	};
	const gotoGamePage = () => {
		if (userStore.loginInfo) {
			gameStore.gameLoingHandle(props?.data?.id, props?.openWay || props?.data?.openWay, gameTypeID.value);
		} else {
			systemStore.commonLogin();
		}
	};
</script>

<style lang="scss" scoped>
	.gameItem {
		position: relative;
		width: 100%;
		padding-bottom: 100%;
		height: 0;
		overflow: hidden;
		border-radius: 8px;
	}
	.infoLayer {
		position: absolute;
		width: 100%;
		height: 100%;
		transition: all 0.2s;
		backdrop-filter: blur(10px);
		z-index: 2;
		background-color: rgba(0, 0, 0, 0.5);
		top: 100%;
	}
	.moveTop {
		top: 0;
	}
	.moveDown {
		top: 100%;
	}

	.bg {
		background: linear-gradient(to right, #eaeaed, #dce1e3, #eaeaed);
		background-size: 400% 400%;
		animation: gradient 3s infinite;
	}
	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
