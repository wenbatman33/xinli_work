<template lang="pug">
.CENTER_C.min-h-screen.bg-black(:style='{ "background-image": "url(" + forbiddenBg + ")"}')
	.FLEX_C.CENTER
		.my-12
			img.w-60(:src='maintenanceLogo')
		.container
			.grid.grid-cols-2.gap-4
				.col-span-1
					.CENTER_C
						SvgIcon.w-48.h-48.text-xGold(:name='"#IP_Restrict"')
						p.text-white 您的 IP 来自
						p.text-white Your IP Adress
						h3.text-xGold 56.556.6.56
				.col-span-1
					.CENTER_C
						p.text-white 您所在的地区被禁止访问我们的网站，我们深表歉意。造成不便敬请谅解。如需帮助或任何疑问，请联系全年无休的在线客服，或发送邮件，我们将竭诚为您服务，谢谢!
						p.text-white.my-8 We are not serving your location. Apologize for any inconvenience that this may have caused. Need assistance? Please feel free to contact our Customer Service Support 24/7 via Live Chat or drop us an email, we would be delighted to assist you accordingly. Thank you.
						.w-full.grid.grid-cols-2.gap-4
							.col-span-1.rounded-lg.border.border-gray-100
								.CENTER_C.p-8.cursor-pointer
									SvgIcon.w-8.h-8.text-white(:name='"#Mail"')
									p.text-white 电子邮箱
									p.text-white csd@18luck.com
							.col-span-1.rounded-lg.border.border-gray-100
								.CENTER_C.p-8.cursor-pointer
									SvgIcon.w-8.h-8.text-white(:name='"#Client_Service"')
									p.text-white 联系在线客服
									p.text-white Online Customer Service
//- IP Restrict
</template>

<script setup lang="ts">
	import SvgIcon from '@/components/SvgIcon/index.vue';

	const forbiddenBg = `${window.staticPath}/static/img/maintenance/forbiddenBg.png`;
	const maintenanceLogo = `${window.staticPath}/static/img/maintenance/logo@2x.png`;
</script>

<style scoped lang="scss"></style>
