<template lang="pug">
.BETWEEN
	.grid.grid-cols-2.w-full
		.col-span-1.truncate
			span.truncate {{data?.displayName}}
		.col-span-1.text-right.truncate
			a-skeleton.walletLoading.w-full(v-if='loading===true' active  :paragraph='{ rows: 0 }')
			span.text-right(v-if='loading===false') ¥ {{money}}

</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { UserStore } from '@/store/userStore';
	import SvgIcon from '@/components/SvgIcon/index.vue';
	import { postGameRecycle, getBalanceCurrent } from '@/api';
	import { useI18n } from 'vue-i18n';
	import { gameGameBalanceSingle } from '@/api';

	const props = defineProps({
		data: Object,
	});
	const { t } = useI18n();
	const userStore = UserStore();
	const loading = ref(false);
	const money = ref(0);
	const init = async () => {
		loading.value = true;
		gameGameBalanceSingle({ id: props?.data?.id })
			.then((res) => {
				money.value = res?.data?.data?.moeny || 0;
			})
			.catch(() => {
				money.value = 0;
				loading.value = false;
			});
	};

	onMounted(() => {
		init();
	});
</script>
<style scoped lang="scss">
	::v-deep(.walletLoading .ant-skeleton-title) {
		margin: 0 !important;
		width: 100% !important;
	}
	::v-deep(.walletLoading .ant-skeleton-paragraph) {
		display: none !important;
	}
</style>
