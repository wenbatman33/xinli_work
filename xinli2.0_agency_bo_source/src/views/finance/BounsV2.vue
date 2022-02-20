<template lang="pug">
Bonus
</template>

<script setup lang="ts">
	import { SystemStore } from '@/store/systemStore';
	import Bonus from './Bonus.vue';
	const systemStore = SystemStore();
	systemStore.navTitle = `v2`;
</script>
