<template lang="pug">
.FrostedGlass.bg-xBlue.bg-opacity-20.rounded-xl.absolute.w-32.h-full(:class='"w-[120px]"')
	.CENTER_C.WH_FULL
		.text-center.text-white.font-bold
			img.w-10.my-1(:src='No_Sevice')
			p.my-1.truncate {{props.data.displayName}}
			p.my-1 維護中
			.FLEX_R_CENTER.gap-1
				SvgIcon.w-4.h-4.text-white(v-if='!countDownIsFinish' :name='"#Clock"')
				span {{countDownTime}}
</template>

<script setup lang="ts">
	import { ref, onMounted, onUnmounted } from 'vue';
	import type { GAMEAJAX_GameGroupLobbyGameGroupListDTO } from '@/api/model';
	import dayjs from 'dayjs';
	import duration from 'dayjs/plugin/duration';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	dayjs.extend(duration);
	const No_Sevice = `${window.staticPath}/static/img/svg/No_Sevice.svg`;
	interface Props {
		data: GAMEAJAX_GameGroupLobbyGameGroupListDTO;
	}
	const props = defineProps<Props>();
	const timer = ref<number>();
	const countDownTime = ref('');
	const countDownIsFinish = ref(false);
	const countDown = () => {
		const diffTime = dayjs(props.data.maintainTime).diff(dayjs(), 'seconds');
		if (diffTime < 0) {
			countDownFinish();
		} else {
			countDownTime.value = dayjs.duration(diffTime, 'seconds').format('DD[:]HH[:]mm[:]ss');
		}
	};
	const countDownFinish = () => {
		countDownTime.value = '即将开放';
		countDownIsFinish.value = true;
		clearInterval(timer.value);
	};
	onUnmounted(() => {
		clearInterval(timer.value);
	});
	onMounted(() => {
		countDown();
		timer.value = window.setInterval(() => countDown(), 1000);
	});
</script>
<style scoped lang="scss"></style>
