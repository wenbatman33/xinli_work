<template lang="pug">
#PrintTicket.relative.overflow-hidden(:class='"w-[300px] h-[320px]"')
	img.ticketShadow(:src='ticketShadow')
	.ticket.absolute(:class='{"printIng": printIng}')
		img.relative.z-0.top-0(:src='ticket')
		.WH_FULL.FLEX_C.text-center.absolute.top-0.z-10.p-8(:class='"pt-[60px]"')
			.CENTER_C(:class='"h-[174px]"')
				p.font-bold {{data?.title}}
				p {{data?.description}}
				.Rubika.text-6xl {{data?.context}}
				p {{data?.note}}
			a-button.BG_GRADIENT_1.mt-4(type='primary' shape="round") {{t('index_get_promo')}}

</template>
<script setup lang="ts">
	import { onUnmounted, onMounted, ref } from 'vue';
	import { useI18n } from 'vue-i18n';
	import type { EVENTAJAX_GetBannerResponseData } from '@/api/model';
	const { t } = useI18n();

	interface Props {
		data: EVENTAJAX_GetBannerResponseData;
	}

	const props = defineProps<Props>();

	const ticketShadow = `${window.staticPath}/static/img/index/ticketShadow@2x.png`;
	const ticket = `${window.staticPath}/static/img/index/ticket@2x.png`;

	const printIng = ref(false);

	const myScript = () => {
		const PrintTicket = document.getElementById('PrintTicket') as HTMLElement;
		if (PrintTicket.getBoundingClientRect().top < 450) {
			printIng.value = true;
			// removeEvent();
		}
	};
	const removeEvent = () => {
		window.removeEventListener('scroll', myScript);
	};
	onMounted(() => {
		window.addEventListener('scroll', myScript);
	});
	onUnmounted(() => {
		window.removeEventListener('scroll', myScript);
	});
</script>
<style lang="scss" scoped>
	.ticketShadow {
		position: absolute;
		width: 320px;
		top: 0;
		left: 0;
		z-index: 3;
	}
	.ticket {
		position: absolute;
		width: 300px;
		top: -320px;
		// top: -10px;
		left: 0;
		z-index: 1;
		transition: top 1.5s;
	}
	.printIng {
		top: -10px;
	}
</style>
