<template lang="pug">
#main
	.container.FLEX_C.h-full.bg-black
		NavBar(v-if='showNav' :name='navTitle' :back='back' :prePath='prePath' :nextPath='nextPath')
		.flex.flex-grow.overflow-hidden.overflow-y-auto
			router-view
		TabBar(v-if='showTabBar')
</template>

<script setup lang="ts">
	import { useRoute } from 'vue-router';
	import { onMounted, computed } from 'vue';
	import { UserStore } from '@/store/userStore';
	import TabBar from '@/components/TabBar/index.vue';
	import NavBar from '@/components/NavBar/index.vue';

	const route = useRoute();
	const showNav = computed(() => route.meta.showNav);
	const showTabBar = computed(() => route.meta.showTabBar);
	const navTitle = computed(() => String(route.meta.navTitle) || '');
	const back = computed(() => (route.meta.back)?String(route.meta.back) : '');
	const prePath = computed(() => (route.meta.prePath)?String(route.meta.prePath) : '');
	const nextPath = computed(() => (route.meta.nextPath)?String(route.meta.nextPath) : '');
	const userStore = UserStore();
	onMounted(() => {
		userStore.checkUserInfo();
	});
</script>
