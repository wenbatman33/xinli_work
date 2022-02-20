import { createWebHistory, createRouter } from 'vue-router';
import index from '@/views/index.vue';
import about from '@/views/about.vue';
import store from '@/store';
import { browserType } from '@/utils';
import { matomo_my_edit_personal, matomo_my_edit_config, matomo_my_check_inbox, matomo_my_wallet_backpack } from '@/matomoEvent';

const isPc = browserType();
const routes = [
	{ path: '/', name: 'index', component: index },
	{ path: '/about', name: 'about', component: about },
	{ path: '/login', name: 'login', component: () => import('@/views/login.vue') },
	{ path: '/register', name: 'register', component: () => import('@/views/register.vue') },
	{ path: '/forgot', name: 'forgot', component: () => import('@/views/forgot.vue') },
	{ path: '/campaign', name: 'campaign', component: () => import('@/views/campaign.vue') },
	{ path: '/schedule', name: 'schedule', component: () => import('@/views/schedule.vue') },
	{ path: '/about/:id', name: 'about', component: () => import('@/views/about.vue') },
	{ path: '/search', name: 'search', component: () => import('@/views/search.vue') },
	{ path: '/recruit', name: 'recruit', component: () => import('@/views/recruit.vue') },
	{ path: '/share', name: 'share', component: () => import('@/views/share.vue') },
	{ path: '/rank', name: 'rank', component: () => import('@/views/rank.vue') },
	{ path: '/classify', name: 'classify', component: () => import('@/views/classify.vue') },
	{ path: '/newlive', name: 'newlive', component: () => import('@/views/newlive.vue') },
	{ path: '/hotlive', name: 'hotlive', component: () => import('@/views/hotlive.vue') },
	// 主播申請
	{ path: '/anchorauth', name: 'anchorauth', component: () => import('@/views/anchorauth.vue'), meta: { requiresAuth: true } },
	// 個人中心
	{
		path: '/personal',
		name: 'Personal',
		redirect: '/personal/information',
		component: () => import('@/views/personal.vue'),
		meta: { requiresAuth: true },
		children: [
			{ path: 'information', name: 'information', component: () => import('@/components/personal/information.vue'), meta: { requiresAuth: true, mode: 'user' } },
			{ path: 'concern', name: 'concern', component: () => import('@/components/personal/concern.vue'), meta: { requiresAuth: true, mode: 'user' } },
			{ path: 'wallet', name: 'wallet', component: () => import('@/components/personal/wallet.vue'), meta: { requiresAuth: true, mode: 'user' } },
			{ path: 'backpack', name: 'backpack', component: () => import('@/components/personal/backpack.vue'), meta: { requiresAuth: true, mode: 'user' } },
			{ path: 'inbox', name: 'inbox', component: () => import('@/components/personal/inbox.vue'), meta: { requiresAuth: true, mode: 'user' } },
			{ path: 'myCode', name: 'myCode', component: () => import('@/components/personal/myCode.vue'), meta: { requiresAuth: true, mode: 'user' } },
			{ path: 'guesshistory', name: 'guessHistory', component: () => import('@/components/personal/guessHistory.vue'), meta: { requiresAuth: true, mode: 'user' } },
			{ path: 'usersupervisor', name: 'userSupervisor', component: () => import('@/components/personal/userSupervisor.vue'), meta: { requiresAuth: true, mode: 'user' } },
			// --------------------------------------------------------------------------------------------------------------------------------------------------------
			{ path: 'livesupervisor', name: 'liveSupervisor', component: () => import('@/components/personal/liveSupervisor.vue'), meta: { requiresAuth: true, mode: 'anchor' } },
			{ path: 'liveconfig', name: 'liveConfig', component: () => import('@/components/personal/liveConfig.vue'), meta: { requiresAuth: true, mode: 'anchor' } },
			{ path: 'liver', name: 'liver', component: () => import('@/components/personal/liver.vue'), meta: { requiresAuth: true, mode: 'anchor' } },
			{ path: 'liveincome', name: 'liveIncome', component: () => import('@/components/personal/liveIncome.vue'), meta: { requiresAuth: true, mode: 'anchor' } },
			{ path: 'liveguess', name: 'liveGuess', component: () => import('@/components/personal/liveGuess.vue'), meta: { requiresAuth: true, mode: 'anchor' } },
			{ path: '/:catchAll(.*)', redirect: '/' },
		],
	},
	{ path: '/recharge', name: 'recharge', component: () => import('@/views/recharge.vue'), meta: { requiresAuth: true } },
	{
		// 資訊
		path: '/article',
		name: 'article',
		redirect: '/article/class',
		component: () => import('@/views/article'),
		children: [
			{
				// 資訊列表
				path: 'class',
				name: 'articleClass',
				component: () => import('@/views/article/class.vue'),
			},
			{
				// 精選主題
				path: 'topic/:id',
				name: 'articleTopic',
				component: () => import('@/views/article/topic.vue'),
			},
			{
				// 文章內容
				path: 'info/:id',
				name: 'articleInfo',
				component: () => import('@/views/article/info.vue'),
			},
			{
				// 文章搜尋
				path: 'search',
				name: 'articleSearch',
				component: () => import('@/views/article/search.vue'),
			},
		],
	},
	{
		// 問卷調查
		path: '/questionnaire',
		name: 'questionnaire',
		redirect: '/questionnaire/home',
		component: () => import('@/views/questionnaire/index.vue'),
		children: [
			{
				// 問卷首頁
				path: 'home',
				name: 'questionnaire_home',
				component: () => import('@/views/questionnaire/home.vue'),
			},
			{
				// 問卷填寫
				path: 'question/list/:id',
				name: 'questionnaire_question_list',
				component: () => import('@/views/questionnaire/questionList.vue'),
			},
			{
				// 問卷完成
				path: 'finish',
				name: 'questionnaire_finish',
				component: () => import('@/views/questionnaire/finish.vue'),
			},
		],
	},
	// 公告
	{
		path: '/notice',
		name: 'notice',
		redirect: '/notice/list',
		component: () => import('@/views/notice.vue'),
		children: [
			{ path: 'list', name: 'noticeList', component: () => import('@/components/notice/list.vue') },
			{ path: 'details', name: 'noticeDetails', component: () => import('@/components/notice/details.vue') },
		],
	},
	// 手機下載導向頁 需判別手機裝置
	{ path: '/download', name: 'download', component: () => import('@/views/download.vue') },
	{ path: '/room/:id', name: 'room', component: () => import('@/views/room.vue') },
	{
		// 活動頁 app需帶入相關資料
		// app 帶 token & uid & isapp
		// 範例: '/event/1225?token=A1eKWW+Hxfb7YdBFE5VTJpXT+L4n9iSkanzu8XoYleIrZnUuOko84pE=&uid=524682&isapp=true'
		path: '/event',
		name: 'event',
		component: () => import('@/views/event/index.vue'),
		children: [
			{ path: 'mon_coming', name: 'event_mon_coming', component: () => import('@/views/event/mon_coming/index.vue') },
			{
				path: 'send_phone',
				name: 'event_send_phone',
				redirect: '/event/send_phone/home',
				component: () => import('@/views/event/send_phone'),
				children: [
					{ path: 'home', name: 'event_send_phone_home', component: () => import('@/views/event/send_phone/home.vue') },
					{ path: 'rule', name: 'event_send_phone_rule', component: () => import('@/views/event/send_phone/rule.vue') },
					{ path: 'game', name: 'event_send_phone_game', component: () => import('@/views/event/send_phone/game.vue') },
				],
			},
			{
				path: 'uefaeuro_2020',
				name: 'event_uefaeuro_2020',
				redirect: '/event/uefaeuro_2020/home',
				component: () => import('@/views/event/uefaeuro_2020'),
				children: [
					{ path: 'countdown', name: 'uefaeuro_2020_countdown', component: () => import('@/views/event/uefaeuro_2020/countdown.vue') },
					{ path: 'home', name: 'uefaeuro_2020_home', component: () => import('@/views/event/uefaeuro_2020/home.vue') },
					{ path: 'schedule', name: 'uefaeuro_2020_schedule', component: () => import('@/views/event/uefaeuro_2020/schedule.vue') },
					{ path: 'login', name: 'uefaeuro_2020_login', component: () => import('@/views/event/uefaeuro_2020/login.vue') },
					{ path: 'task', name: 'uefaeuro_2020_task', component: () => import('@/views/event/uefaeuro_2020/task.vue') },
					{ path: 'dice', name: 'uefaeuro_2020_dice', component: () => import('@/views/event/uefaeuro_2020/dice.vue') },
					{ path: 'turntable', name: 'uefaeuro_2020_turntable', component: () => import('@/views/event/uefaeuro_2020/turntable.vue') },
				],
			},
			{
				path: 'jigsaw',
				name: 'event_jigsaw',
				component: () => import('@/views/event/jigsaw'),
			},
			{
				path: '2020tokyolympic',
				name: 'event_2020tokyolympic',
				redirect: '/event/2020tokyolympic/home',
				component: () => import('@/views/event/2020tokyolympic'),
				children: [
					{ path: 'home', name: 'event_2020tokyolympic_home', component: () => import('@/views/event/2020tokyolympic/home.vue') },
					{ path: 'spin', name: 'event_2020tokyolympic_spin', component: () => import('@/views/event/2020tokyolympic/spin.vue') },
					{ path: 'schedule', name: 'event_2020tokyolympic_schedule', component: () => import('@/views/event/2020tokyolympic/schedule.vue') },
					{ path: 'guess', name: 'event_2020tokyolympic_guess', component: () => import('@/views/event/2020tokyolympic/guess.vue') },
				],
			},
			{
				path: 'luckyspin',
				name: 'event_luckyspin',
				component: () => import('@/views/event/luckyspin'),
			},
		],
	},
	{ path: '/sticker', name: 'sticker', component: () => import('@/views/sticker.vue') },
	// 系統維護頁面
	{ path: '/maintain', name: 'maintain', component: () => import('@/views/maintain.vue') },
	{ path: '/:catchAll(.*)', redirect: '/' },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});
const getUrlToken = (str) => str.substring(str.indexOf('token=') + 6, str.indexOf('&uid='));

router.beforeEach((to, from, next) => {
	checkRouter(to);
	if (to.query.uid) {
		window.localStorage.setItem('UID', to.query.uid);
		store.commit('user/SET_UID', to.query.uid);
	}
	if (to.query.token) {
		// 使用 getUrlToken  拆解 UrlToken 參數
		window.localStorage.setItem('TOKEN', getUrlToken(to.fullPath));
		store.commit('user/SET_TOKEN', getUrlToken(to.fullPath));
	}
	if (to.meta.requiresAuth) {
		if (window.localStorage.TOKEN) {
			next();
		} else {
			window.localStorage.setItem('tempUrl', to.path);
			store.commit('user/SHOW_LOGIN_MODEL', 1);
			next('/');
		}
	} else {
		next();
	}
	window.scrollTo({ top: 0 });
});

function checkRouter(to) {
	if (to.path === '/personal/information') {
		matomo_my_edit_personal();
	} else if (to.path === '/personal/liveConfig') {
		matomo_my_edit_config();
	} else if (to.path === '/personal/inbox') {
		matomo_my_check_inbox();
	} else if (to.path === '/personal/backpack') {
		matomo_my_wallet_backpack();
	}
}
export default router;
