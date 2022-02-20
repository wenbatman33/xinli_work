<template lang="pug">
a-modal.radiusModal(:visible='systemStore.registerVisabled'  width='900px' :bodyStyle='{"padding":0, "border-radius": "16px"}', centered, :footer='null', closable='', :mask-closable='false', :keyboard='false', @cancel='closeModel')
  RegisterForm
</template>

<script setup lang="ts">
	import { SystemStore } from '@/store/systemStore';
	import RegisterForm from '@/components/Register/RegisterForm.vue';

	const systemStore = SystemStore();

	const closeModel = () => {
		systemStore.registerModalHidden();
	};
</script>
