<template lang="pug">
.CENTER_C.min-h-screen.bg-black(:style='{ "background-image": "url(" + NetworkBg + ")"}')
	.FLEX_C.CENTER
		.my-12
			img.w-60(:src='logo_for_maintenance')
		.container
			.CENTER_C
				.my-8.text-center
					h3.text-white {{$t('maintenance_network_problem')}}
					p.text-white {{$t('maintenance_network_problem_desc')}}
				.grid.grid-cols-2.gap-4
					.col-span-1.rounded-lg.border.border-gray-100
						.CENTER_C.p-8.cursor-pointer(@click='reload')
							SvgIcon.w-8.h-8.text-white(:name='"#Video_Control_Replay"')
							p.text-white 重新检测线路
							p.text-white Reconnect
					.col-span-1.rounded-lg.border.border-gray-100
						.CENTER_C.p-8.cursor-pointer
							SvgIcon.w-8.h-8.text-white(:name='"#Client_Service"')
							p.text-white 联系在线客服
							p.text-white Online Customer Service

</template>

<script setup lang="ts">
	import { useRoute, useRouter } from 'vue-router';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	const router = useRouter();
	const NetworkBg = `${window.staticPath}/static/img/maintenance/NetworkBg.png`;
	const logo_for_maintenance = `${window.staticPath}/static/img/logo_for_maintenance.png`;
	const reload = () => {
		router.push('/');
	};
</script>

<style scoped lang="scss"></style>
