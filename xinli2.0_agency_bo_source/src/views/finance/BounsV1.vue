<template lang="pug">
Bonus
</template>

<script setup lang="ts">
	import Bonus from './Bonus.vue'
	import { SystemStore } from '@/store/systemStore';
	const systemStore = SystemStore();
	systemStore.navTitle = `v1`;
</script>
