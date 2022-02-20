import { createWebHistory, createRouter } from 'vue-router';
import index from '@/views/index.vue';
import store from '@/store';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

const routes = [
	{
		// 火熱
		path: '/',
		name: 'index',
		component: index,
	},
	{
		// Portal page
		path: '/about/:id',
		name: 'about',
		component: () => import('@/views/about.vue'),
	},
	{
		// 登入、註冊、忘記密碼
		path: '/login',
		name: 'login',
		component: () => import('@/views/login.vue'),
	},
	{
		// 賽程
		path: '/schedule',
		name: 'schedule',
		component: () => import('@/views/schedule.vue'),
	},
	{
		// 搜尋
		path: '/search',
		name: 'search',
		component: () => import('@/views/search.vue'),
	},
	{
		// 設置
		path: '/setting',
		name: 'setting',
		component: () => import('@/views/setting.vue'),
	},
	{
		// 房間管理
		path: '/adminlist',
		name: 'adminlist',
		component: () => import('@/views/adminlist.vue'),
	},
	{
		// 競猜紀錄
		path: '/guesshistory',
		name: 'guesshistory',
		component: () => import('@/views/guesshistory.vue'),
	},
	{
		// 充值紀錄
		path: '/chargelist',
		name: 'chargelist',
		component: () => import('@/views/chargelist.vue'),
	},
	{
		// 打賞紀錄
		path: '/rewardlist',
		name: 'rewardlist',
		component: () => import('@/views/rewardlist.vue'),
	},
	{
		// 熱門直播
		path: '/hotlive',
		name: 'hotlive',
		component: () => import('@/views/hotlive.vue'),
	},
	{
		// 最新直播
		path: '/newlive',
		name: 'newlive',
		component: () => import('@/views/newlive.vue'),
	},
	{
		// 推薦主播
		path: '/hotanchor',
		name: 'hotanchor',
		component: () => import('@/views/hotanchor.vue'),
	},
	{
		// 維護中
		path: '/maintain',
		name: 'maintain',
		component: () => import('@/views/maintain.vue'),
	},
	{
		// 下載
		path: '/download',
		name: 'download',
		component: () => import('@/views/download.vue'),
	},
	{
		// 我的推薦碼
		path: '/invite',
		name: 'invite',
		component: () => import('@/views/invite.vue'),
	},
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
		// 拍手公告
		path: '/notice',
		name: 'notice',
		redirect: '/notice/list',
		component: () => import('@/views/notice'),
		children: [
			{
				// 公告列表
				path: 'list',
				name: 'noticeList',
				component: () => import('@/views/notice/list.vue'),
			},
			{
				// 公告內容
				path: 'details/:id',
				name: 'noticeDetails',
				component: () => import('@/views/notice/details.vue'),
			},
		],
	},
	{
		// 我的消息
		path: '/inbox',
		name: 'inbox',
		redirect: '/inbox/list',
		component: () => import('@/views/inbox'),
		children: [
			{
				// 消息列表
				path: 'list',
				name: 'inboxList',
				component: () => import('@/views/inbox/list.vue'),
			},
			{
				// 消息內容
				path: 'details/:id',
				name: 'inboxDetails',
				component: () => import('@/views/inbox/details.vue'),
			},
		],
	},
	{
		// 個人資料
		path: '/profile',
		name: 'profile',
		redirect: '/profile/list',
		component: () => import('@/views/profile'),
		children: [
			{
				// 個人資料列表
				path: 'list',
				name: 'profilelist',
				component: () => import('@/views/profile/list.vue'),
			},
			{
				// 修改暱稱
				path: 'username',
				name: 'username',
				component: () => import('@/views/profile/username.vue'),
			},
			{
				// 修改生日
				path: 'birthday',
				name: 'birthday',
				component: () => import('@/views/profile/birthday.vue'),
			},
			{
				// 修改簽名
				path: 'signature',
				name: 'signature',
				component: () => import('@/views/profile/signature.vue'),
			},
			{
				// 綁定郵箱
				path: 'email',
				name: 'email',
				redirect: '/profile/email/check',
				component: () => import('@/views/profile/email'),
				children: [
					{
						// 綁定郵箱確認頁
						path: 'check',
						name: 'checkEmail',
						component: () => import('@/views/profile/email/check.vue'),
					},
					{
						// 綁定郵箱提交頁
						path: 'submit',
						name: 'submitEmail',
						component: () => import('@/views/profile/email/submit.vue'),
					},
				],
			},
			{
				// 綁定手機
				path: 'mobile',
				name: 'mobile',
				redirect: '/profile/mobile/check',
				component: () => import('@/views/profile/mobile'),
				children: [
					{
						// 綁定手機確認頁
						path: 'check',
						name: 'checkMobile',
						component: () => import('@/views/profile/mobile/check.vue'),
					},
					{
						// 綁定手機提交頁
						path: 'submit',
						name: 'submitMoblie',
						component: () => import('@/views/profile/mobile/submit.vue'),
					},
				],
			},
			{
				// 修改密碼
				path: 'password',
				name: 'password',
				component: () => import('@/views/profile/password.vue'),
			},
		],
	},
	{
		// 我的背包
		path: '/backpack',
		name: 'backpack',
		redirect: '/backpack/gift',
		component: () => import('@/views/backpack'),
		children: [
			{
				// 我的背包禮物列表
				path: 'gift',
				name: 'backpackGift',
				component: () => import('@/views/backpack/gift.vue'),
			},
			{
				// 我的背包道具列表
				path: 'item',
				name: 'backpackItem',
				component: () => import('@/views/backpack/item.vue'),
			},
		],
	},
	{
		// 貢獻榜
		path: '/contribution',
		name: 'contribution',
		redirect: '/contribution/live',
		component: () => import('@/views/contribution'),
		children: [
			{
				// 主播貢獻榜
				path: 'live',
				name: 'contributionLive',
				redirect: '/contribution/live/popular',
				component: () => import('@/views/contribution/live'),
				children: [
					{
						// 人氣主播貢獻榜
						path: 'popular',
						name: 'contributionLivePopular',
						component: () => import('@/views/contribution/live/popular.vue'),
					},
					{
						// 超級明星主播貢獻榜
						path: 'superstar',
						name: 'contributionLiveSuperstar',
						component: () => import('@/views/contribution/live/superstar.vue'),
					},
				],
			},
			{
				// 用戶貢獻榜
				path: 'user',
				name: 'contributionUser',
				redirect: '/contribution/user/rich',
				component: () => import('@/views/contribution/user'),
				children: [
					{
						// 富豪用戶貢獻榜
						path: 'rich',
						name: 'contributionUserRich',
						component: () => import('@/views/contribution/user/rich.vue'),
					},
					{
						// 超級明星用戶貢獻榜
						path: 'superstar',
						name: 'contributionUserSuperstar',
						component: () => import('@/views/contribution/user/superstar.vue'),
					},
				],
			},
		],
	},
	{
		// 直播間
		path: '/room/:id',
		name: 'room',
		component: () => import('@/views/room.vue'),
	},
	{
		// 關注
		path: '/concern',
		name: 'concern',
		component: () => import('@/views/concern.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		// 充值
		path: '/recharge',
		name: 'recharge',
		component: () => import('@/views/recharge.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		// 我的
		path: '/personal',
		name: 'personal',
		component: () => import('@/views/personal.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		// 我的任務
		path: '/tasks',
		name: 'tasks',
		component: () => import('@/views/tasks.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		// 貼圖專區
		path: '/sticker',
		name: 'sticker',
		component: () => import('@/views/sticker.vue'),
		meta: {
			requiresAuth: true,
		},
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
	{
		// 活動頁
		path: '/event',
		name: 'event',
		component: () => import('@/views/event/index.vue'),
		children: [
			{
				// 幸運轉盤
				path: 'luckyspin',
				name: 'event_luckyspin',
				component: () => import('@/views/event/luckyspin/index.vue'),
			},
			{
				// Event-0008: 登入送手機活動
				path: 'mon_coming',
				name: 'event_mon_coming',
				component: () => import('@/views/event/mon_coming/index.vue'),
			},
			{
				// Event-0009: 登入送手機活動
				path: 'send_phone',
				name: 'event_send_phone',
				redirect: '/event/send_phone/home',
				component: () => import('@/views/event/send_phone'),
				children: [
					{
						// 登入送手機活動首頁
						path: 'home',
						name: 'event_send_phone_home',
						component: () => import('@/views/event/send_phone/home.vue'),
					},
					{
						// 登入送手機活動規則
						path: 'rule',
						name: 'event_send_phone_rule',
						component: () => import('@/views/event/send_phone/rule.vue'),
					},
					{
						// 登入送手機活動遊戲
						path: 'game',
						name: 'event_send_phone_game',
						component: () => import('@/views/event/send_phone/game.vue'),
					},
				],
			},
			{
				// Event-0010: 歐洲杯活動
				path: 'uefaeuro_2020',
				name: 'event_uefaeuro_2020',
				redirect: '/event/uefaeuro_2020/home',
				component: () => import('@/views/event/uefaeuro_2020'),
				children: [
					{
						// 歐洲杯倒計時
						path: 'countdown',
						name: 'uefaeuro_2020_countdown',
						component: () => import('@/views/event/uefaeuro_2020/countdown.vue'),
					},
					{
						// 歐洲杯首頁
						path: 'home',
						name: 'uefaeuro_2020_home',
						component: () => import('@/views/event/uefaeuro_2020/home.vue'),
					},
					{
						// 歐洲杯賽事
						path: 'schedule',
						name: 'uefaeuro_2020_schedule',
						component: () => import('@/views/event/uefaeuro_2020/schedule.vue'),
					},
					{
						// 歐洲杯登入獎勵
						path: 'login',
						name: 'uefaeuro_2020_login',
						component: () => import('@/views/event/uefaeuro_2020/login.vue'),
					},
					{
						// 歐洲杯任務
						path: 'task',
						name: 'uefaeuro_2020_task',
						component: () => import('@/views/event/uefaeuro_2020/task.vue'),
					},
					{
						// 歐洲杯骰盅
						path: 'dice',
						name: 'uefaeuro_2020_dice',
						component: () => import('@/views/event/uefaeuro_2020/dice.vue'),
					},
					{
						// 歐洲杯轉盤
						path: 'turntable',
						name: 'uefaeuro_2020_turntable',
						component: () => import('@/views/event/uefaeuro_2020/turntable.vue'),
					},
				],
			},
			{
				// Event-0011 拼圖活動
				path: 'jigsaw',
				name: 'jigsaw',
				component: () => import('@/views/event/jigsaw'),
			},
			{
				// Event-0012 東奧活動
				path: '2020tokyolympic',
				name: '2020tokyolympic',
				redirect: '/event/2020tokyolympic/home',
				component: () => import('@/views/event/2020tokyolympic'),
				children: [
					{
						// 東奧倒計時
						path: 'countdown',
						name: '2020tokyolympic_countdown',
						component: () => import('@/views/event/2020tokyolympic/countdown.vue'),
					},
					{
						// 東奧首頁
						path: 'home',
						name: '2020tokyolympic_home',
						component: () => import('@/views/event/2020tokyolympic/home.vue'),
					},
					{
						// 東奧賽程
						path: 'schedule',
						name: '2020tokyolympic_schedule',
						component: () => import('@/views/event/2020tokyolympic/schedule.vue'),
					},
					{
						// 東奧轉盤
						path: 'spin',
						name: '2020tokyolympic_spin',
						component: () => import('@/views/event/2020tokyolympic/spin.vue'),
					},
					{
						// 東奧競猜
						path: 'guess',
						name: '2020tokyolympic_guess',
						component: () => import('@/views/event/2020tokyolympic/guess.vue'),
					},
				],
			},
		],
	},
	{
		// 設置外的路徑
		path: '/:catchAll(.*)',
		redirect: '/',
	},
];

/**
 * 取得網址中的 token query
 * @param {*} str Url
 * @returns Token query value
 */
const getUrlToken = (str) => {
	return str.substring(str.indexOf('token=') + 6, str.indexOf('&uid='));
};

// Construct vue-router
const router = createRouter({
	history: createWebHistory(),
	routes,
});

// Callback before each route
router.beforeEach((to, from, next) => {
	// 維護檢查
	// maintain_switch ='1' 為全站維修中 必須導向maintain頁面
	if (to.path !== '/maintain' && store.getters['config/IS_MAINTAIN']) {
		next('/maintain');
		return;
	}

	// For app 帶入 UID、TOKEN 時，儲存並刷新個人資訊
	if (to.query.uid && to.query.token) {
		window.localStorage.setItem('UID', to.query.uid);
		window.localStorage.setItem('TOKEN', getUrlToken(to.fullPath));
		store.commit('user/SET_UID', to.query.uid);
		store.commit('user/SET_TOKEN', getUrlToken(to.fullPath));
		store.dispatch('user/UPDATE_USER_INFO');
	}

	// 由登入頁返回需要登入的頁面
	if (from.path === '/login' && to.meta.requiresAuth) {
		next('/');
	}

	// 需要登入的頁面+未登入
	else if (to.meta.requiresAuth && !store.getters['user/IS_LOGIN']) {
		window.localStorage.setItem('tempUrl', to.path);
		next('/login');
	}

	// 正常換頁
	else {
		next();
	}

	// 離開直播間，恢復標題
	if (/\/room\/\w+/.test(from.path) && !/\/room\/\w+/.test(to.path)) {
		document.title = '拍手直播|欧洲杯直播|NBA直播|中超直播|西甲直播|英超直播|足球直播';
	}

	// 離開登入頁，清除 tempUrl 及 tempDeepLink
	if (from.path === '/login') {
		if (to.path !== '/login' && !/\/about\/\d+/.test(to.path)) {
			if (window.localStorage.tempUrl) {
				window.localStorage.removeItem('tempUrl');
			}
			if (window.localStorage.tempDeepLink) {
				window.localStorage.removeItem('tempDeepLink');
			}
		}
	}

	// 捲動至頂部
	window.scrollTo(0, 0);

	// 登入狀態+除了任務頁，更新限時任務
	if (store.getters['user/IS_LOGIN'] && to.path !== '/tasks') {
		store.dispatch('tasks/GET_LIMIT_TASK_LIST');
	}

	// 更換頁面時更新懸浮客服按鈕
	store.dispatch('config/GET_FLOAT_CHAT_LIST');

	// 進入火熱頁時更新懸浮活動
	if (to.path === '/') {
		store.dispatch('config/GET_FLOAT_SLIDE_LIST');
	}

	// 登入狀態+進入火熱頁時更新競猜推薦
	if (to.path === '/') {
		store.dispatch('config/GET_FLOAT_GUESS_RECOMMEND_LIST');
	}

	// 進入火熱頁時清除所有懸浮按鈕隱藏狀態
	if (to.path === '/') {
		store.dispatch('config/SHOW_FLOAT_SLIDE');
		store.dispatch('config/SHOW_FLOAT_LIMIT_TASK');
		store.dispatch('config/SHOW_FLOAT_GUESS_RECOMMEND');
	}

	// 進入火熱頁、直播間更新蓋板廣告
	if (store.state.config.hideSlide === false) {
		if (to.path === '/' || /\/room\/\w+/.test(to.path)) {
			store.dispatch('config/GET_SLIDE_LIST');
		}
	}
});

export default router;
