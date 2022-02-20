<template lang="pug">
a-modal.radiusModal(:visible='systemStore.loginVisabled', width='740px' centered, :footer='null', :mask-closable='false', :keyboard='false', @cancel='closeModel')
  LoginForm(v-if='systemStore.loginVisabled')
</template>

<script setup lang="ts">
	import { SystemStore } from '@/store/systemStore';
	import LoginForm from '@/components/Login/LoginForm.vue';
	const systemStore = SystemStore();
	const closeModel = () => {
		systemStore.loginModalHidden();
	};
</script>
