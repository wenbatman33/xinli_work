import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Blank from '@/views/Blank.vue';
import i18n from '@/i18n';
import { getToken } from '@/utils';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Login',
		meta: {
			requiresAuth: false,
			showNav: false,
			showTabBar: false,
			navTitle: '',
			back: '',
		},
		component: () => import('@/views/login/index.vue'),
	},
	{
		path: '/home',
		name: 'Home',
		meta: {
			requiresAuth: true,
			showNav: false,
			showTabBar: true,
			navTitle: '',
			back: '',
		},
		component: () => import('@/views/Home.vue'),
	},
	{
		path: '/member',
		name: 'Member',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: true,
			navTitle: 'v1 '+i18n.global.t('member_Member_01'),
			back: 'home',
			nextPath:'/member/v2'
		},
		component: () => import('@/views/member/MemberV1.vue'),
	},
	{
		path: '/member/v2',
		name: 'MemberV2',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: true,
			navTitle: 'v2 '+i18n.global.t('member_Member_01'),
			back: '/member',
			prePath:'/member'
		},
		component: () => import('@/views/member/MemberV2.vue'),
	},
	{
		path: '/finance',
		name: 'Finance',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: true,
			navTitle: i18n.global.t('finance_finance_01'),
			back: 'home',
		},
		component: () => import('@/views/finance/finance.vue'),
	},
	{
		path: '/record',
		name: 'Record',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: true,
			navTitle: i18n.global.t('record_Record_01'),
			back: 'home',
		},
		component: () => import('@/views/record/Record.vue'),
	},
	{
		path: '/more',
		name: 'More',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('more_More_01'),
			back: 'home',
		},
		component: () => import('@/views/more/More.vue'),
	},

	{
		path: '/resetPassword',
		name: 'ResetPassword',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('login_resetPassword_01'),
			back: '',
		},
		component: () => import('@/views/login/resetPassword.vue'),
	},
	{
		path: '/transactionPassword',
		name: 'TransactionPassword',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('login_transactionPassword_17'),
			back: '',
		},
		component: () => import('@/views/login/transactionPassword.vue'),
	},

	{
		path: '/memberDetail/:id',
		name: 'MemberDetail',
		component: Blank,
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: '',
		},
		children: [
			// UserHome will be rendered inside User's <router-view>
			// when /users/:username is matched
			{
				path: '',
				meta: { requiresAuth: true },
				component: () => import('@/views/member/MemberDetail.vue'),
			},
		],
	},
	{
		path: '/productDetail',
		name: 'ProductDetail',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('member_ProductDetail_01'),
		},
		component: () => import('@/views/member/ProductDetail.vue'),
	},
	{
		path: '/bonus',
		name: 'Bonus',
		component: () => import('@/views/finance/BounsV1.vue'),
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: '',
			back: '/finance',
			nextPath:'/bonus/v2'
		},
	},
	{
		path: '/bonus/v2',
		name: 'BonusV2',
		component: () => import('@/views/finance/BounsV2.vue'),
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: '',
			back: '/finance',
			prePath:'/bonus'
		},
	},
	{
		path: '/platform',
		name: 'Platform',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: '',
			back: '/finance',
		},
		component: () => import('@/views/finance/Platform.vue'),
	},
	{
		path: '/activemember',
		name: 'ActivememberV1',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: 'v1 '+i18n.global.t('finance_Activemember_01'),
			back: '/finance',
			nextPath:'/activemember/v2'
		},
		component: () => import('@/views/finance/ActivememberV1.vue'),
	},
	{
		path: '/activemember/v2',
		name: 'ActivememberV2',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: 'v2 '+i18n.global.t('finance_Activemember_01'),
			back: '/finance',
			prePath:'/activemember'
		},
		component: () => import('@/views/finance/ActivememberV2.vue'),
	},
	{
		path: '/financeProductList',
		name: 'FinanceProductList',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('finance_ProductList_01'),
			back: '/finance',
		},
		component: () => import('@/views/finance/ProductList.vue'),
	},
	{
		path: '/financeProductDetail/:id',
		name: 'FinanceProductDetail',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: '',
			back: '/financeProductList',
		},
		component: () => import('@/views/finance/ProductDetail.vue'),
	},

	{
		path: '/recordSubProxyDetail',
		name: 'RecordSubProxyDetail',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('record_recordSubProxyDetail_01'),
			back: '/record',
		},

		component: () => import('@/views/record/recordSubProxyDetail.vue'),
	},

	{
		path: '/linkPage',
		name: 'LinkPage',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('linkPage_01'),
			back: '',
		},
		component: () => import('@/views/linkPage.vue'),
	},
	{
		path: '/subProxyPage',
		name: 'SubProxyPage',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('subProxyPage_01'),
		},
		component: () => import('@/views/subProxyPage.vue'),
	},
	{
		path: '/subProxyDetail',
		name: 'SubProxyDetail',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: 'Jenchen',
			back: '/subProxyPage',
		},
		component: () => import('@/views/subProxyDetail.vue'),
	},
	{
		path: '/promotionPage',
		name: 'PromotionPage',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('more_promotionPage_01'),
			back: 'home',
		},
		component: () => import('@/views/more/promotionPage.vue'),
	},
	{
		path: '/promotionBannerPage/:path',
		name: 'PromotionBannerPage',
		redirect: '/promotionPage',
		component: Blank,
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('more_promotionBannerPage_01'),
			back: '',
		},
		children: [
			// UserHome will be rendered inside User's <router-view>
			// when /users/:username is matched
			{
				path: '',
				meta: { requiresAuth: true },
				component: () => import('@/views/more/promotionBannerPage.vue'),
			},
		],
	},
	{
		path: '/promotionAgencyPage',
		name: 'PromotionAgencyPage',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('more_promotionAgencyPage_01'),
			back: '/more',
		},
		component: () => import('@/views/more/promotionAgencyPage.vue'),
	},
	{
		path: '/announcement',
		name: 'Announcement',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('more_announcement_01'),
			back: '/more',
		},
		component: () => import('@/views/more/announcement.vue'),
	},
	{
		path: '/announcementAgency',
		name: 'AnnouncementAgency',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('more_announcementAgency_01'),
			back: '/more',
		},
		component: () => import('@/views/more/announcementAgency.vue'),
	},
	{
		path: '/problems',
		name: 'Problems',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('more_problems_01'),
			back: '/more',
		},
		component: () => import('@/views/more/problems.vue'),
	},
	{
		path: '/provision',
		name: 'Provision',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('more_provision_01'),
			back: '/more',
		},
		component: () => import('@/views/more/provision.vue'),
	},
	{
		path: '/newRegistrationList',
		name: 'NewRegistrationList',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('newRegistrationList_01'),
		},
		component: () => import('@/views/newRegistrationList.vue'),
	},
	{
		path: '/todayMember',
		name: 'TodayMember',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('todayMember_01'),
			back: '',
		},
		component: () => import('@/views/todayMember.vue'),
	},
	{
		path: '/wallet',
		name: 'Wallet',
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('wallet_wallet_01'),
			back: '/home',
		},
		component: () => import('@/views/wallet/wallet.vue'),
	},
	{
		path: '/webBank/:id',
		name: 'WebBank',
		redirect: '/wallet',
		component: Blank,
		meta: { requiresAuth: true },
		children: [
			// UserHome will be rendered inside User's <router-view>
			// when /users/:username is matched
			{
				path: '',
				meta: { requiresAuth: true },
				component: () => import('@/views/wallet/webBank.vue'),
			},
		],
	},
	{
		path: '/withdrawalWebBank/:id',
		name: 'WithdrawalWebBank',
		redirect: '/wallet',
		component: Blank,
		meta: { requiresAuth: true },
		children: [
			// UserHome will be rendered inside User's <router-view>
			// when /users/:username is matched
			{
				path: '',
				component: () => import('@/views/wallet/withdrawalWebBank.vue'),
			},
		],
	},
	{
		path: '/withdrawalUSDT/:id',
		name: 'WithdrawalUSDT',
		redirect: '/wallet',
		component: Blank,
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('wallet_withdrawalUSDT_01'),
			back: '/wallet',
		},

		children: [
			// UserHome will be rendered inside User's <router-view>
			// when /users/:username is matched
			{
				path: '',
				meta: { requiresAuth: true },
				component: () => import('@/views/wallet/withdrawalUSDT.vue'),
			},
		],
	},
	{
		path: '/thirdParty/:id',
		name: 'ThirdParty',
		redirect: '/thirdParty',
		component: Blank,
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('wallet_thirdParty_01'),
			back: '/wallet',
		},

		children: [
			// UserHome will be rendered inside User's <router-view>
			// when /users/:username is matched
			{
				path: '',
				meta: { requiresAuth: true },
				component: () => import('@/views/wallet/thirdParty.vue'),
			},
		],
	},
	{
		path: '/passwordRedEnvelope/:id',
		name: 'PasswordRedEnvelope',
		redirect: '/passwordRedEnvelope',
		component: Blank,
		meta: {
			requiresAuth: true,
			showNav: true,
			showTabBar: false,
			navTitle: i18n.global.t('wallet_passwordRedEnvelope_01'),
			back: '/wallet',
		},
		children: [
			// UserHome will be rendered inside User's <router-view>
			// when /users/:username is matched
			{
				path: '',
				meta: { requiresAuth: true },
				component: () => import('@/views/wallet/passwordRedEnvelope.vue'),
			},
		],
	},
	{
		//捕获所有路由
		path: '/:pathMatch(.*)*',
		redirect: '/',
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior: () => ({ left: 0, top: 0 }),
});
router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		if (!getToken()) {
			next({ name: 'Login' });
		} else {
			next();
		}
	} else if (getToken() && to.name === 'Login') {
		next({ name: 'Home' });
	} else {
		next();
	}
});
export default router;
