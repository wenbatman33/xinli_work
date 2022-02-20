import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';
import Index from '@/views/Index.vue';
import { UserStore } from './store/userStore';
import { SystemStore } from '@/store/systemStore';

import { setToken, getToken } from '@/utils';

let ENV = import.meta.env;
const routes: Array<RouteRecordRaw> = [
	{ path: '/', name: 'Index', component: Index },
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Login.vue'),
		meta: {
			rwd: true,
			hiddenNav: true,
			hiddenFooter: true,
		},
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Register.vue'),
		meta: {
			rwd: true,
			hiddenNav: true,
			hiddenFooter: true,
		},
	},
	{
		path: '/forget',
		name: 'Forget',
		component: () => import('@/views/Forget.vue'),
		meta: {
			rwd: true,
			hiddenNav: true,
			hiddenFooter: true,
		},
	},
	{ path: '/promotion', name: 'promotion', component: () => import('@/views/Promotion.vue') },
	{ path: '/promotion/:id', name: 'promotionOne', component: () => import('@/views/Promotion.vue') },
	{
		path: '/personal',
		name: 'personal',
		redirect: '/personal/personal',
		component: () => import('@/views/Personal/index.vue'),
		children: [
			{
				path: 'personal',
				name: 'Personal',
				meta: {
					requiresAuth: true,
				},
				component: () => import('@/views/Personal/Personal.vue'),
			},
			{
				path: 'VIP',
				name: 'VIP',
				meta: { requiresAuth: true },
				component: () => import('@/views/Personal/VIP.vue'),
			},
			{
				path: 'profile',
				name: 'Profile',
				meta: { requiresAuth: true },
				component: () => import('@/views/Personal/Profile.vue'),
			},
			{
				path: 'bethistory',
				name: 'BetHistory',
				meta: { requiresAuth: true },
				component: () => import('@/views/Personal/BetHistory.vue'),
			},
			{
				path: 'transaction',
				name: 'Transaction',
				meta: { requiresAuth: true },
				component: () => import('@/views/Personal/Transaction.vue'),
			},
			{
				path: 'inbox',
				name: 'Inbox',
				meta: { requiresAuth: true },
				component: () => import('@/views/Personal/Inbox.vue'),
			},
			{
				path: 'device',
				name: 'Device',
				meta: { requiresAuth: true },
				component: () => import('@/views/Personal/Device.vue'),
			},
			{
				path: 'atm',
				name: 'Atm',
				meta: { requiresAuth: true },
				component: () => import('@/views/Personal/Atm.vue'),
			},
		],
	},

	/* 設計元件頁面 */
	{
		path: '/design',
		name: 'Design',
		component: () => import('@/views/Design.vue'),
	},
	{
		path: '/casino',
		name: 'Casino',
		component: () => import('@/views/Game/Casino.vue'),
	},
	{
		path: '/chess/:id',
		name: 'Chess',
		component: () => import('@/views/Game/GameGroupPage.vue'),
	},
	{
		path: '/chess/play',
		name: 'ChessGamePage',
		component: () => import('@/views/Game/GamePlayPage.vue'),
	},
	{
		path: '/fish/:id',
		name: 'Fish',
		component: () => import('@/views/Game/GameGroupPage.vue'),
	},
	{
		path: '/fish/play',
		name: 'FishGamePage',
		component: () => import('@/views/Game/GamePlayPage.vue'),
	},
	{
		path: '/slot/:id',
		name: 'Slot',
		component: () => import('@/views/Game/GameGroupPage.vue'),
	},
	{
		path: '/slot/play',
		name: 'SlotGamePage',
		component: () => import('@/views/Game/GamePlayPage.vue'),
	},
	{
		path: '/gamePage',
		name: 'FullScreenGamePage',
		component: () => import('@/views/Game/FullScreenGamePage.vue'),
	},
	{
		path: '/helpCenter',
		name: 'HelpCenter',
		component: () => import('@/views/HelpCenter.vue'),
	},
	{
		path: '/helpCenter/details/:id',
		name: 'HelpCenterDetail',
		component: () => import('@/views/HelpCenterDetail.vue'),
	},
	{
		path: '/forbidden',
		name: 'Forbidden',
		meta: {
			hiddenNav: true,
			hiddenFooter: true,
		},
		component: () => import('@/views/Maintenance/Forbidden.vue'),
	},
	{
		path: '/maintenance',
		name: 'Maintenance',
		meta: {
			hiddenNav: true,
			hiddenFooter: true,
		},
		component: () => import('@/views/Maintenance/index.vue'),
	},
	{
		path: '/network',
		name: 'Network',
		meta: {
			hiddenNav: true,
			hiddenFooter: true,
		},
		component: () => import('@/views/Maintenance/Network.vue'),
	},

	{
		path: '/campaigns',
		name: 'campaigns',
		component: () => import('@/views/Campaigns/index.vue'),
		children: [
			{
				path: 'demo',
				name: 'campaignsDemo',
				meta: {
					rwd: true,
					hiddenNav: true,
					hiddenFooter: true,
				},
				component: () => import('@/views/Campaigns/demo/index.vue'),
			},
		],
	},
	/* 例外排除 */
	{ path: '/:catchAll(.*)', redirect: '/' },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior: () => ({ left: 0, top: 0 }),
});
router.beforeEach((to, from, next) => {
	if (ENV.MODE === 'production') debugger;
	const systemStore = SystemStore();
	to?.meta?.rwd === true ? systemStore.setRWD(true) : systemStore.setRWD(false);
	to?.meta?.hiddenNav === true ? systemStore.setNav(false) : systemStore.setNav(true);
	to?.meta?.hiddenFooter === true ? systemStore.setFooter(false) : systemStore.setFooter(true);

	if (to.query.token) {
		const token = to.query.token as string;
		setToken(token);
		next('/');
	} else if (to.meta.requiresAuth) {
		if (getToken()) {
			next();
		} else {
			next('/');
		}
	} else if (to.path === '/register' || to.path === '/forget') {
		getToken() ? next('/') : next();
	} else {
		next();
	}
});

export default router;
