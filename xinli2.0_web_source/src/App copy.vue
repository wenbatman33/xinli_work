<template lang="pug">
a-config-provider(:locale="locale")
	#main(:class='[systemStore.RWD_MODE?"RWD":"RWD_none"]')
		Nav
		router-view(v-if='inited')
		Footer
		//- SideBar
		//- Modal
		AllModals
		//- Svg Icons
		SvgIcons
		ActionIcons
			//- GlobalLoading
		GlobalLoading
</template>

<script setup lang="ts">
	import { onMounted, computed, ref } from 'vue';

	import { useRoute, useRouter } from 'vue-router';
	/* store */
	import { LangStore } from '@/store/langStore';
	import { UserStore } from '@/store/userStore';
	import { GameStore } from '@/store/gameStore';
	import { EventStore } from '@/store/eventStore';
	import { SystemStore } from '@/store/systemStore';
	import zhCN from 'ant-design-vue/es/locale/zh_CN';
	import enUS from 'ant-design-vue/es/locale/en_US';

	/* components */
	import SvgIcons from '@/icons/SvgIcons.vue';
	import Nav from '@/components/Nav/index.vue';
	import ActionIcons from '@/icons/ActionIcons.vue';
	import Footer from '@/components/Footer/index.vue';
	import AllModals from '@/components/Modals/AllModals.vue';
	import GlobalLoading from '@/components/GlobalLoading/index.vue';
	// import SideBar from '@/components/SideBar/index.vue';
	import { getGameGroupLobby } from '@/api';

	const langStore = LangStore();
	const userStore = UserStore();
	const gameStore = GameStore();
	const eventStore = EventStore();
	const systemStore = SystemStore();

	const route = useRoute();
	const router = useRouter();

	const inited = ref(false);

	const locale = computed(() => {
		let LANG;
		if (langStore.lang === 'cn') {
			LANG = zhCN;
		} else if (langStore.lang === 'en') {
			LANG = enUS;
		}
		return LANG;
	});

	const init = () => {
		getGameGroupLobby().then((res) => {
			gameStore.setLobby(res?.data?.data?.list || []);
			eventStore.getEventAnnouncementList();
			eventStore.getIndexPageBanner();
		});
	};

	onMounted(() => {
		userStore.init();
		userStore.checkUserInfo().then(() => {
			init();
			inited.value = true;
		});
		console.log('2222');
	});
</script>
