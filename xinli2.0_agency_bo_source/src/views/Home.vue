<template lang="pug">
.container.FLEX_C.bg-repeat-x.p-4(:style='{ "background-image": "url(" + loginHeader + ")"}')
	.homeHaeader.text-center.h-52.p-4
		.CENTER_C.h-full
			.CENTER
				img(:src="Frame_4")
			.text-primary.mt-4 {{ $t('home_1') }}
			h5.text-white {{ userStore.loginInfo.name }}
	
	.grid.grid-cols-5.gap-4
		.col-span-3.rounded-md.BG_GRADIENT_GLOD
			.CENTER_C.p-4
				.text-xs.text-primary(:class='"md:text-sm "') ◆ {{ $t('home_2') }} ◆
				h4.w-full.text-center.text-white.truncate.bodoni {{ userStore.agencyInfo.netIncome }}
				van-divider.w-full.my-1.border-white
				.text-xs.text-primary(:class='"md:text-sm"') S {{ $t('home_3') }},002
		.col-span-2.rounded-md.BG_GRADIENT_GRAY.border.border-xGolden
			.CENTER_C.h-full
				.text-xs.text-primary(:class='"md:text-sm"') ◆ {{ $t('home_4') }} ◆
				h3.text-white.bodoni {{ userStore.agencyInfo.commissionRatio }}
					span.text-sm.mx-1 %
					
	.w-full.my-2
		h5.text-primary ◆ {{ $t('home_5') }}
	
	.w-full.my-2
		.border-b.border-opacity-50.border-dashed
			router-link(to="newRegistrationList")
				.BETWEEN
					.FLEX_R_CENTER.p-2
						img.w-5(:src='register')
						h6.text-primary.px-2 {{ $t('home_6') }}
					.FLEX_R_CENTER {{ userStore.agencyInfo.todayBetting }}
						van-icon.text-subWhite(name="arrow")

		.border-b.border-opacity-50.border-dashed
			router-link(to="/todayMember")
				.BETWEEN
					.FLEX_R_CENTER.p-2
						img.w-5(:src='money')
						h6.text-primary.px-2 {{ $t('home_7') }}
					.FLEX_R_CENTER {{ userStore.agencyInfo.newMemberCounts }}
						van-icon.text-subWhite(name="arrow")

		.border-b.border-opacity-50.border-dashed
			router-link(to="wallet")
				.BETWEEN
					.FLEX_R_CENTER.p-2
						img.w-5(:src='wallet')
						h6.text-primary.px-2 {{ $t('home_8') }}
					.FLEX_R_CENTER {{ userStore.agencyInfo.walletBalance }}
						van-icon.text-subWhite(name="arrow")

	.grid.grid-cols-3.gap-4.my-4.pb-8
		.col-span-1.rounded-md.cursor-pointer.BG_GRADIENT_GRAY.py-2
			router-link(to="linkPage")
				.CENTER_C.h-full
					img.w-8(:src='link')
					.text-xs.text-primary.my-2 {{ $t('home_9') }}

		.col-span-1.rounded-md.cursor-pointer.BG_GRADIENT_GRAY.py-2
			router-link(to="subProxyPage")
				.CENTER_C.h-full
					img.w-8(:src='organization')
					.text-xs.text-primary.my-2 {{ $t('home_10') }}

		.col-span-1.rounded-md.cursor-pointer.BG_GRADIENT_GRAY.py-2
			router-link(to="promotionPage")
				.CENTER_C.h-full
					img.w-8(:src='activity')
					.text-xs.text-primary.my-2 {{ $t('home_11') }}

		//- router-link(to="subProxyPage")
		//- 	div(class="col-span-1 py-4 rounded-md cursor-pointer BG_GRADIENT_GRAY CENTER_C")
		//- 		p.text-primaryLight.my-icon.my-icon-organization.my-2
		//- 		p.text-xs.text-primary {{ $t('home_10') }}
		//- router-link(to="promotionPage")
		//- 	div(class="col-span-1 py-4 rounded-md cursor-pointer BG_GRADIENT_GRAY CENTER_C")
		//- 		p.text-primaryLight.my-icon.my-icon-calendar.my-2
		//- 		p.text-xs.text-primary {{ $t('home_11') }}

</template>

<script setup lang="ts">
	import { UserStore } from '@/store/userStore';
	// assets
	const Frame_4 = `${window.staticPath}/static/svg/Frame_4.svg`;
	const loginHeader = `${window.staticPath}/static/img/loginHeader.png`;
	const register = `${window.staticPath}/static/svg/register.svg`;
	const wallet = `${window.staticPath}/static/svg/wallet.svg`;
	const money = `${window.staticPath}/static/svg/money.svg`;
	const link = `${window.staticPath}/static/img/link@2x.png`;
	const organization = `${window.staticPath}/static/img/organization@2x.png`;
	const activity = `${window.staticPath}/static/img/activity@2x.png`;
	// ref
	const userStore = UserStore();
</script>

