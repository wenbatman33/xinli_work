<template lang="pug">
.contentContainer
	.pageTitle.FLEX_R
		.icon.mr-4
			.bg-xBlue.rounded-full.w-8.h-8.CENTER
				SvgIcon.w-5.h-5.text-white(:name='"#Device"')
				
		.title
			h5 {{t('personal_device_title')}}
	
	.pageContent.my-4


</template>

<script setup lang="ts">
	import { ref, defineProps } from 'vue';
	import { UserStore } from '@/store/userStore';
	import { useI18n } from 'vue-i18n';
	import { useRoute, useRouter } from 'vue-router';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	const { t } = useI18n();
	const userStore = UserStore();
</script>

<style scoped lang="scss"></style>
