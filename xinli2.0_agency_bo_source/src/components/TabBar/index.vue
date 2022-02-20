<template lang="pug">
.flex.flex-shrink-0.overflow-hidden(:class='"h-[82px]"')
	van-tabbar.h-20.bg-xDarkGray(safe-area-inset-bottom)
		van-tabbar-item.bg-xDarkGray(:icon='homeClass.icon' to="/home")
			p(:class='homeClass.textClass') {{ $t('c_tabbar_1') }}
		van-tabbar-item.bg-xDarkGray(:icon='memberClass.icon' to="/member")
			p(:class='memberClass.textClass') {{ $t('c_tabbar_2') }}
		van-tabbar-item.bg-xDarkGray(:icon='financeClass.icon' to="/finance")
			p(:class='financeClass.textClass') {{ $t('c_tabbar_3') }}
		van-tabbar-item.bg-xDarkGray(:icon='recordClass.icon' to="/record")
			p(:class='recordClass.textClass') {{ $t('c_tabbar_4') }}
		van-tabbar-item.bg-xDarkGray(:icon='moreClass.icon' to="/more")
			p(:class='moreClass.textClass') {{ $t('c_tabbar_5') }}
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import { useRoute } from 'vue-router';

	const home = `${window.staticPath}/static/svg/home.svg`;
	const homeInactive = `${window.staticPath}/static/svg/home_inactive.svg`;

	const member = `${window.staticPath}/static/svg/member.svg`;
	const memberInactive = `${window.staticPath}/static/svg/member_inactive.svg`;

	const finance = `${window.staticPath}/static/svg/finance.svg`;
	const financeInactive = `${window.staticPath}/static/svg/finance_inactive.svg`;

	const record = `${window.staticPath}/static/svg/record.svg`;
	const recordInactive = `${window.staticPath}/static/svg/record_inactive.svg`;

	const more = `${window.staticPath}/static/svg/more.svg`;
	const moreInactive = `${window.staticPath}/static/svg/more_inactive.svg`;

	const route = useRoute();
	const homeClass = computed(() => {
		const active = {
			icon: home,
			textClass: 'text-primary',
		};
		const inactive = {
			icon: homeInactive,
			textClass: 'text-xGray666',
		};
		return route.path === '/home' ? active : inactive;
	});
	const memberClass = computed(() => {
		const active = {
			icon: member,
			textClass: 'text-primary',
		};
		const inactive = {
			icon: memberInactive,
			textClass: 'text-xGray666',
		};
		return route.path === '/member' ? active : inactive;
	});
	const financeClass = computed(() => {
		const active = {
			icon: finance,
			textClass: 'text-primary',
		};
		const inactive = {
			icon: financeInactive,
			textClass: 'text-xGray666',
		};
		return route.path === '/finance' ? active : inactive;
	});

	const recordClass = computed(() => {
		const active = {
			icon: record,
			textClass: 'text-primary',
		};
		const inactive = {
			icon: recordInactive,
			textClass: 'text-xGray666',
		};
		return route.path === '/record' ? active : inactive;
	});
	const moreClass = computed(() => {
		const active = {
			icon: more,
			textClass: 'text-primary',
		};
		const inactive = {
			icon: moreInactive,
			textClass: 'text-xGray666',
		};
		return route.path === '/more' ? active : inactive;
	});
</script>

<style scoped>
	.van-tabbar-item {
		justify-content: start;
		padding-top: 10px;
	}
	.van-cell::after,
	[class*='van-hairline']::after {
		display: none;
	}
</style>
