import axios from '@/axiosSetting';
import { list } from 'postcss';

// App 版本更新檢查
export const appVersion = (payload) => axios.get('app/version', { params: payload });

// 取得 app 首頁公告
export const bulltein = (payload) => axios.get('/bulltein', { params: payload });

// 用户登录
export const login = (payload) => axios.post('/users/login', payload);

// 用户注册
export const register = (payload) => axios.post('/users/reg', payload);

// 获取注册验证码
export const getRegCode = (payload) => axios.post('/users/code', payload);

// 获取找回密码验证码
export const getForgotCode = (payload) => axios.post('/users/forget/code', payload);

// 找回密码
export const resetPass = (payload) => axios.post('/users/reset/pass', payload);

// 公告列表
export const noticeList = (payload) => axios.get('/notice/list', { params: payload });

// 公告详情
export const noticeDetail = (payload) => axios.get('/notice/detail', { params: payload });

// 热门主播
export const hotNanchour = (payload) => axios.get('/live/hotnanchour', { params: payload });

// 热门直播
export const hotLive = (payload) => axios.get('/live/hotlive', { params: payload });

// 热门直播
export const hotLiveGame = (payload) => axios.get('/live/game', { params: payload });

// 最新直播
export const newLive = (payload) => axios.get('/live/newlive', { params: payload });

// 创建开播
export const createRoom = (payload) => axios.post('/live/createroom', payload);

// 关播
export const stopRoom = (payload) => axios.post('/live/stoproom', payload);

// 推荐直播列表
export const recommend = (payload) => axios.get('/live/recommend', { params: payload });

// 赛程列表
export const scheduleList = (payload) => axios.get('/event/schedule/list', { params: payload });

// 主播赛程列表
export const anchorScheduleList = (payload) => axios.get('/event/anchor/list', { params: payload });

// 直播分类
export const classList = (payload) => axios.get('/live/class', { params: payload });

// 直播分类列表
export const liveClassList = (payload) => axios.get('/users/live/class', { params: payload });

// 赛事观看預約
export const appointment = (payload) => axios.post('/event/appointment/watch', payload);

// 批次預約
export const competitionBooking = (payload) => axios.post('/competition/booking/batch', payload);

// 进入直播间
export const enterRoom = (payload) => axios.get('/live/room', { params: payload });

// 礼物列表
export const giftlist = (payload) => axios.get('/gift/list', { params: payload });

// 送禮
export const giftSend = (payload) => axios.post('/gift/send', payload);

// 打赏排行榜
export const topList = (payload) => axios.get('/live/top', { params: payload });

// 站内信
export const inboxDataList = (payload) => axios.get('/users/inbox', { params: payload });

// 刪除站内信
export const inboxReaded = (payload) => axios.post('/users/readinbox', payload);

// 刪除站内信
export const inboxDelete = (payload) => axios.post('/users/inbox/del', payload);

// 轮播图
export const slideList = (payload) => axios.get('/slide', { params: payload });

// 等级列表
export const levelList = (payload) => axios.get('/live/level_list', { params: payload });

// 排行榜資訊
export const liveInfo = (payload) => axios.get('/live/liveinfo', { params: payload });

// 富豪排行榜
export const richList = (payload) => axios.get('/leaderboard/zillionaire', { params: payload });

// 明星排行榜
export const starList = (payload) => axios.get('/leaderboard/star', { params: payload });

// 举报
export const report = (payload) => axios.post('/live/report', payload);

// 关注
export const setattent = (payload) => axios.post('/users/setattent', payload);

// 设置/取消管理员
export const setadmin = (payload) => axios.post('/live/setadmin', payload);

// 禁言
export const shutup = (payload) => axios.post('/live/shutup', payload);

// 禁止访问
export const kicking = (payload) => axios.post('/live/kicking', payload);

// ip禁言
export const shutupip = (payload) => axios.post('/live/shutupip', payload);

// ip禁止访问
export const kickingip = (payload) => axios.post('/live/kickingip', payload);

// ip禁止访问
export const chatRecord = (payload) => axios.get('/live/char/record', { params: payload });

// 修改昵称
export const editNicename = (payload) => axios.post('/user/nicename', payload);

// 修改资料
export const editinfo = (payload) => axios.post('/user/editinfo', payload);


// 驗證更換email驗證碼
export const verifyEmail = (payload) => axios.post('/verify/email', payload);

// 發送更換email驗證碼
export const verifyEmailSms = (payload) => axios.post('/verify/email/sms', payload);

// 手機號碼更換發送驗證碼 第一步
export const verifyMobile = (payload) => axios.post('/verify/mobile', payload);

// 手機號碼更換發送驗證碼 第二步
export const verifyMobileSms = (payload) => axios.post('/verify/mobile/sms', payload);

// 手機號碼更換發送驗證碼 第三步
export const verifyMobileBind = (payload) => axios.post('/verify/mobile/bind', payload);

// 赛事直播预约
export const appointmentLive = (payload) => axios.post('/event/appointment/live', payload);

// 关注直播列表
export const followsList = (payload) => axios.get('/user/follows/list', { params: payload });

// 关注直播列表 v2
export const followsListV2 = (payload) => axios.get('/user/follows/list/v2', { params: payload });

// 今日直播赛事列表(今日直播)
export const todaylive = (payload) => axios.get('/event/today/live', { params: payload });

// 热门赛事（正在直播）
export const nowLive = (payload) => axios.get('/event/hot', { params: payload });

// 获取管理员列表
export const adminList = (payload) => axios.get('/live/admin/list', { params: payload });

// 获取管理员列表
export const resignationAdmin = (payload) => axios.post('/live/admin/list/resignation', payload);

// 获取黑名单列表
export const blackList = (payload) => axios.get('/users/black/list', { params: payload });

// 获取蕉币红包充值金额列表
export const rechargeList = (payload) => axios.post('/charge/rules', payload);

// 支付宝充值
export const alipay = (payload) => axios.post('/charge/alipay', payload);

// 房间公告列表
export const roomNotice = (payload) => axios.get('/live/room_notice', { params: payload });

// 在直播間顯示該主播有預約的賽事
export const roomAppointment = (payload) => axios.get('/room/appointment', { params: payload });

// 直播間分享
export const roomShare = (payload) => axios.post('/room/share', payload);

// 相同賽事直播
export const roomLike = (payload) => axios.get('/live/room/like', { params: payload });

// 上传图片
export const uploadFile = (payload) => axios.post('/upload/file', payload, { headers: { 'content-type': 'multipart/form-data' } });

// 获取个人资料
export const getUserinfo = (payload) => axios.get('/user/info', { params: payload });

// 弹幕消息
export const sendbarrage = (payload) => axios.post('/live/sendbarrage', payload);

// 红包列表
export const redList = (payload) => axios.post('/live/redlist', payload);

// 发红包
export const sendred = (payload) => axios.post('/live/sendred', payload);

// 抢红包
export const robRed = (payload) => axios.post('/live/robred', payload);

// 充值记录
export const chargeList = (payload) => axios.get('/user/charge/list', { params: payload });

// 消费记录
export const expensesList = (payload) => axios.get('/user/expenses/list', { params: payload });

// 打赏记录
export const rewardList = (payload) => axios.get('/user/reward/list', { params: payload });

// 直播记录
export const liveRecord = (payload) => axios.get('/user/live/record', { params: payload });

// 直播收益
export const liveIncome = (payload) => axios.get('/user/live/income', { params: payload });

// 直播收益
export const liveIncomeDetail = (payload) => axios.get('/user/live/income/detail', { params: payload });

// 添加房间公告
export const addRoomNotice = (payload) => axios.post('/live/room/add_notice', payload);

// 修改房间標題
export const changRoomTitle = (payload) => axios.post('/live/room/edit_title', payload);

// 页面管理
export const portalManager = (payload) => axios.get('/portal/index', { params: payload });

// 我的背包
export const knapsack = (payload) => axios.get('/user/knapsack', { params: payload });

// 背包礼物赠送
export const sendKnapGift = (payload) => axios.post('/live/knapsack/sendgift', payload);

// 修改密码
export const editpwd = (payload) => axios.post('/user/editpwd', payload);

// 取得設定
export const getconfig = (payload) => axios.get('/home/getconfig', { params: payload });

// 搜索（直播间）
export const searchLiveRoom = (payload) => axios.get('/home/search', { params: payload });

// 主播认证
export const anchorauth = (payload) => axios.post('/user/auth', payload);

// 取得登入獎勵
export const bonusGet = (payload) => axios.post('/bonus/get', payload);

// 新手任務列表
export const taskBasic = (payload) => axios.get('/user/task/basic', { params: payload });

// 日常任務列表
export const taskDay = (payload) => axios.get('/user/task/day', { params: payload });

// 限時登入列表
export const taskLimit = (payload) => axios.get('/user/task/limit/login', { params: payload });

// 取得限時登入獎勵
export const getBonusTaskLimit = (payload) => axios.post('/bonus/limit/login', payload);

// 充值任務，包含，首充任務，累積充值
export const taskPayment = (payload) => axios.get('/user/task/payment', { params: payload });

// 取得充值任務獎勵，包含，首充任務，累積充值
export const getTaskPayment = (payload) => axios.post('/user/task/payment/award', payload);

// 取得登入獎勵列表
export const bonusList = (payload) => axios.get('/bonus/list', { params: payload });

// 取得頭像獎勵
export const getBonusAvatar = (payload) => axios.get('/user/bonus/avatar', { params: payload });

// 取得綁定手機獎勵
export const getBonusPhone = (payload) => axios.get('/user/bonus/bind/phone', { params: payload });

// 取得註冊獎勵
export const getBonusRegister = (payload) => axios.get('/user/bonus/register', { params: payload });

// 取得日常任務獎勵
export const getBonusDay = (payload) => axios.get('/user/task/day/award', { params: payload });

// 檢查主播有無值播中資訊
export const checkLive = (payload) => axios.get('/live/check', { params: payload });

// 取得用戶銀行卡資訊
export const userBank = (payload) => axios.get('/user/bankcard', { params: payload });

// 綁定與更換銀行卡
export const userBankBind = (payload) => axios.post('/user/bankcard/bind', payload);

// 取得銀行卡驗證碼
export const userBankSms = (payload) => axios.get('/user/bankcard/sms', { params: payload });

// 主播提現
export const liveWithdraw = (payload) => axios.post('/live/withdraw', payload);

// 背包列表
export const backpack = (payload) => axios.get('/backpack', { params: payload });

// 使用背包道具
export const packageUse = (payload) => axios.post('/live/use/package', payload);

// 文章分類列表
export const articleClass = () => axios.get('/article/class');

// 分類底下的文章
export const articleClassList = (payload) => axios.get('/article/class/list', { params: payload });

// 文章內容
export const articleInfo = (payload) => axios.get('/article/info', { params: payload });

// 文章留言列表
export const articleMessageList = (payload) => axios.get('/article/message/list', { params: payload });

// 文章搜尋
export const articleSearch = (payload) => axios.get('/article/search', { params: payload });

// 主題頁資訊
export const articleTopic = (payload) => axios.get('/article/topic', { params: payload });

// 主題底下的文章
export const articleTopicList = (payload) => axios.get('/article/topic/list', { params: payload });

// 精選主題
export const articleTopicSpecial = (payload) => axios.get('/article/topic/special', { params: payload });

// Like 文章
export const articleLike = (payload) => axios.post('/article/like', payload);

// 文章留言
export const articleMessage = (payload) => axios.post('/article/message', payload);

// Like 留言
export const articleMessageLike = (payload) => axios.post('/article/message/like', payload);

//  活動分類
export const eventCategory = (payload) => axios.get('/event/category', { params: payload });

//  活動列表
export const event = (payload) => axios.get('/event', { params: payload });

// 推薦紀錄，顯示用戶推薦領取獎勵的紀錄
export const userInviteList = (payload) => axios.get('/users/invite/list', { params: payload });

// 主播貢獻值排行榜-人气主播排行榜
export const contributionLivePopular = (payload) => axios.get('/contribution/live/popular', { params: payload });

// 主播貢獻值排行榜-超級明星榜
export const contributionLiveSuperstar = (payload) => axios.get('/contribution/live/superstar', { params: payload });

// 用戶貢獻值排行榜-富豪贡献榜
export const contributionUserRich = (payload) => axios.get('/contribution/user/rich', { params: payload });

// 用戶貢獻值排行榜-超級明星榜
export const contributionUserSuperstar = (payload) => axios.get('/contribution/user/superstar', { params: payload });

// 直播間/競猜資訊API
export const guessList = (payload) => axios.get('/guess/list', { params: payload });

// 冬奧競猜資訊
export const guessOlympicList = (payload) => axios.get('/guess/olympic/list', { params: payload });

// 主播建立競猜活動
export const guessAdd = (payload) => axios.post('/guess/add', payload);

// 個人/主播/競猜中心/競猜明細API
export const guessAnchorDetail = (payload) => axios.get('/guess/anchor/detail', { params: payload });

// 個人/主播/競猜中心API
export const guessAnchorList = (payload) => axios.get('/guess/anchor/list', { params: payload });

// 直播間/用戶競猜下注API
export const guessBet = (payload) => axios.post('/guess/bet', payload);

// 個人/用戶/競猜紀錄/爆擊
export const guessCombo = (payload) => axios.post('/guess/combo', payload);

// 個人/主播/競猜中心：主播結束競猜
export const guessEnd = (payload) => axios.post('/guess/end', payload);

// 個人/用戶/競猜紀錄
export const guessHistory = (payload) => axios.get('/guess/history', { params: payload });

// 個人/用戶/競猜紀錄/領獎
export const guessReceive = (payload) => axios.post('/guess/receive', payload);

// 首頁/競猜推薦
export const guessRecommend = (payload) => axios.get('/guess/recommend', payload);

// 購買貼圖方案
export const stickerBuy = (payload) => axios.post('/sticker/buy', payload);

// 取得貼圖可購買方案
export const stickerProgram = (payload) => axios.get('/sticker/program', { params: payload });

// 活動賽事
export const competitionCollaboration = () => axios.get('/competition/get_collaboration');

// 門興活動 - 活動資訊
export const eventMocheng = (payload) => axios.get('/event/mocheng', { params: payload });

// 門興活動 - 取得抽獎次數
export const eventMochengBonusInfo = (payload) => axios.get('/event/mocheng/bonus/info', { params: payload });

// 門興活動 - 抽獎
export const eventMochengBonus = (payload) => axios.get('/event/mocheng/bonus', { params: payload });

// 門興活動 - 購買德甲門興抽獎次數
export const eventMochengBonusBuy = (payload) => axios.post('/event/mocheng/bonus/buy', payload);

// 登入拍手抽手機活動 - 抽獎
export const eventSendPhoneBonus = () => axios.get('/event/sendphone/bonus');

// 歐洲杯活動 - 頁面資訊
export const event010Info = () => axios.get('/event/010/info');

// 歐洲杯活動 - 任務列表
export const event010List = () => axios.get('/event/010/list');

// 歐洲杯活動 - 領取點數
export const event010Received = (payload) => axios.post('/event/010/received', payload);

// 歐洲杯活動 - 擲骰子
export const event010Dice = (payload) => axios.post('/event/010/dice', payload);

// 歐洲杯活動 - 玩轉盤
export const event010Turntable = (payload) => axios.post('/event/010/turntable', payload);

// 問卷調查 - 取得問卷列表
export const questionnaires = () => axios.get('/questionnaires');

// 問卷調查 - 取得指定問卷
export const questionnaire = (payload) => axios.get('/questionnaire', { params: payload });

// 問卷調查 - 送出問卷
export const questionnairePost = (payload) => axios.post('/questionnaire', payload);

// 拼圖活動 - 直播間內拼圖顯示與領取API
export const event011Get = (payload) => axios.get('/event/011/get', { params: payload });

// 拼圖活動 - 直播間內拼圖顯示與領取API
export const event011Receive = (payload) => axios.post('/event/011/receive', payload);

// 拼圖活動 - 頁面API
export const event011Info = (payload) => axios.get('/event/011/info', { params: payload });