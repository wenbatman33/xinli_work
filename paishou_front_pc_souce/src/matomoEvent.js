// 載入背景圖片失敗事件 v
export const matomo_errorVideoImg = () => window._paq.push(['trackEvent', 'errorVideoImg', '載入背景圖片失敗事件']);
// 登錄 v
export const matomo_login_forgot = () => window._paq.push(['trackEvent', '登錄', '忘記密碼']);
// 登錄 註冊 v
export const matomo_login_register = () => window._paq.push(['trackEvent', '登錄', '註冊']);
// 忘記密碼 v
export const matomo_forget_getCode = () => window._paq.push(['trackEvent', '忘記密碼', '取驗證碼']);
// 送出驗證碼 v
export const matomo_forget_sendCode = () => window._paq.push(['trackEvent', '忘記密碼', '送出驗證碼']);
// 登錄 v
export const matomo_register_login = () => window._paq.push(['trackEvent', '註冊', '登錄']);
// 取驗證碼 v
export const matomo_register_getCode = () => window._paq.push(['trackEvent', '註冊', '取驗證碼']);
// 送出驗證碼 v
export const matomo_register_sendCode = () => window._paq.push(['trackEvent', '註冊', '送出驗證碼']);
// 忘記密碼 v
export const matomo_register_forgot = () => window._paq.push(['trackEvent', '註冊', '忘記密碼']);
// 個人資料 v
export const matomo_my_edit_personal = () => window._paq.push(['trackEvent', '我的', '編輯', '個人資料']);
// 設置 v
export const matomo_my_edit_config = () => window._paq.push(['trackEvent', '我的', '編輯', '設置']);
// 站內信 v
export const matomo_my_check_inbox = () => window._paq.push(['trackEvent', '我的', '查看', '站內信']);
// 充值紀錄 v
export const matomo_my_wallet_recharge = () => window._paq.push(['trackEvent', '我的', '查看', '充值']);
// 我的背包 v
export const matomo_my_wallet_backpack = () => window._paq.push(['trackEvent', '我的', '查看', '我的背包']);
// 打賞紀錄 v
export const matomo_my_wallet_reward = () => window._paq.push(['trackEvent', '我的', '查看', '打賞紀錄']);
// 個人資料 v
export const matomo_personal_edit_phone = () => window._paq.push(['trackEvent', '個人資料', '編輯', '綁定手機']);
// 綁定email v
export const matomo_personal_edit_email = () => window._paq.push(['trackEvent', '個人資料', '編輯', '綁定email']);
// 修改密碼 v
export const matomo_personal_edit_password = () => window._paq.push(['trackEvent', '個人資料', '編輯', '修改密碼']);
// 修改暱稱 v
export const matomo_personal_edit_name = () => window._paq.push(['trackEvent', '個人資料', '編輯', '暱稱']);
// 頭像 v
export const matomo_personal_edit_avater = () => window._paq.push(['trackEvent', '個人資料', '編輯', '頭像']);
// 綁定手機 v
export const matomo_bindPhone_verify = () => window._paq.push(['trackEvent', '綁定手機', '驗證帳密']);
// 取驗證碼 v
export const matomo_bindPhone_getCode = () => window._paq.push(['trackEvent', '綁定手機', '取驗證碼']);
// 確認綁定 v
export const matomo_bindPhone_sendCode = () => window._paq.push(['trackEvent', '綁定手機', '確認綁定']);
// 綁定email v
export const matomo_bindEmail_getCode = () => window._paq.push(['trackEvent', '綁定email', '取驗證碼']);
// 確認綁定 v
export const matomo_bindEmail_sendCode = () => window._paq.push(['trackEvent', '綁定email', '確認綁定']);
// 我的禮物 v
export const matomo_backpack_check_gift = () => window._paq.push(['trackEvent', '我的背包', '查看', '我的禮物']);
// 我的道具 v
export const matomo_backpack_check_giftBox = () => window._paq.push(['trackEvent', '我的背包', '查看', '我的道具']);
// 我的禮物 查看 v
export const matomo_backpack_check_gift_item = (giftName, id) => window._paq.push(['trackEvent', '我的背包', '查看', giftName, id]);
// 我的道具 查看 v
export const matomo_backpack_check_giftBox_item = (giftBoxName, id) => window._paq.push(['trackEvent', '我的背包', '查看', giftBoxName, id]);
// 我的道具 使用 v
export const matomo_backpack_use_giftBox_item = (giftBoxName, id) => window._paq.push(['trackEvent', '我的背包', '使用', giftBoxName, id]);
// 分類 v
export const matomo_tabBar_check_classify = () => window._paq.push(['trackEvent', 'TabBar', '查看', '分類']);
// 活動 v
export const matomo_tabBar_check_campaign = () => window._paq.push(['trackEvent', 'TabBar', '查看', '活動']);
// 賽程 v
export const matomo_tabBar_check_schedule = () => window._paq.push(['trackEvent', 'TabBar', '查看', '賽程']);
// 排行榜 v
export const matomo_tabBar_check_rank = () => window._paq.push(['trackEvent', 'TabBar', '查看', '排行榜']);
// 搜尋 v
export const matomo_tabBar_check_search = () => window._paq.push(['trackEvent', 'TabBar', '查看', '搜尋']);
// 個人資訊 v
export const matomo_tabBar_check_personal = () => window._paq.push(['trackEvent', 'TabBar', '查看', '個人資訊']);
// 個人資訊 v
export const matomo_tabBar_check_article = () => window._paq.push(['trackEvent', 'TabBar', '查看', '資訊']);

// 全部直播 v
export const matomo_classify_all = () => window._paq.push(['trackEvent', '分類', '查看', '全部直播']);
// 排行榜 v
export const matomo_classify_rank = () => window._paq.push(['trackEvent', '分類', '查看', '排行榜']);
// Liveclass v
export const matomo_classify_class = (id) => window._paq.push(['trackEvent', '分類', 'Liveclass', id]);
// 關注進入直播間 v
export const matomo_concern_enterRoom = (name, id) => window._paq.push(['trackEvent', '關注', '進入直播間', name, id]);
// 取消關注 v
export const matomo_concern_unfollow = (name, id) => window._paq.push(['trackEvent', '關注', '取消關注', name, id]);
// 關注主播 v
export const matomo_concern_follow = (name, id) => window._paq.push(['trackEvent', '關注', '關注主播', name, id]);
// 查看任務 v
export const matomo_task = () => window._paq.push(['trackEvent', '查看任務', '限時任務icon']);
// 日榜 v
export const matomo_liveRoom_rank_day = () => window._paq.push(['trackEvent', '直播間', '查看貢獻榜', '日榜']);
// 週榜 v
export const matomo_liveRoom_rank_week = () => window._paq.push(['trackEvent', '直播間', '查看貢獻榜', '週榜']);
// 月榜 v
export const matomo_liveRoom_rank_month = () => window._paq.push(['trackEvent', '直播間', '查看貢獻榜', '月榜']);
// 我的禮物 v
export const matomo_liveRoom_backpack_gift = () => window._paq.push(['trackEvent', '直播間', '查看背包', '我的禮物']);
// 我的道具 v
export const matomo_liveRoom_backpack_giftbox = () => window._paq.push(['trackEvent', '直播間', '查看背包', '我的道具']);
// 開啟道具 v
export const matomo_liveRoom_open_giftItem = (giftName, id) => window._paq.push(['trackEvent', '直播間', '開啟道具', giftName, id]);
// 直播間 背包送禮 v
export const matomo_liveRoom_backpack_send_gift = (giftBoxName, id) => window._paq.push(['trackEvent', '直播間', '背包送禮', giftBoxName, id]);
// 直播間 送禮 v
export const matomo_liveRoom_send_gift = (giftName, id) => window._paq.push(['trackEvent', '直播間', '送禮', giftName, id]);
// 聊天送出 v
export const matomo_liveRoom_send_chat = () => window._paq.push(['trackEvent', '直播間', '聊天送出']);
// 關注主播 v
export const matomo_liveRoom_follow = (name, id) => window._paq.push(['trackEvent', '直播間', '關注主播', name, id]);
// 取消關注 v
export const matomo_liveRoom_unfollow = (name, id) => window._paq.push(['trackEvent', '直播間', '取消關注', name, id]);
// 切換播源 線路1 v
export const matomo_liveRoom_stream_1 = (name, id) => window._paq.push(['trackEvent', '直播間', '切換播源', '線路1']);
// 切換播源 線路2 v
export const matomo_liveRoom_stream_2 = (name, id) => window._paq.push(['trackEvent', '直播間', '切換播源', '線路2']);
// 切換播源 線路3 v
export const matomo_liveRoom_stream_3 = (name, id) => window._paq.push(['trackEvent', '直播間', '切換播源', '線路3']);

// 直播間 --------------20210602 新增
// 直播間 展開導航
export const matomo_liveRoom_open_menu = () => window._paq.push(['trackEvent', '直播間', '展開導航']);
export const matomo_liveRoom_clear_chat = () => window._paq.push(['trackEvent', '直播間', '清空聊天室']);
export const matomo_liveRoom_lock_chat = () => window._paq.push(['trackEvent', '直播間', '鎖定聊天室']);
export const matomo_liveRoom_change_chat_color = () => window._paq.push(['trackEvent', '直播間', '更換顏色']);
export const matomo_liveRoom_animate_switch = (type) => window._paq.push(['trackEvent', '直播間', type ? '開啟動態' : '關閉動態']);
export const matomo_liveRoom_barrage_switch = (type) => window._paq.push(['trackEvent', '直播間', type ? '開啟彈幕' : '關閉彈幕']);
export const matomo_liveRoom_tasks = () => window._paq.push(['trackEvent', '直播間', '我的任務']);

export const matomo_liveRoom_guess_view = (id) => window._paq.push(['trackEvent', '直播間', '查看競猜', id]);
export const matomo_liveRoom_guess_bet = (id) => window._paq.push(['trackEvent', '直播間', '確認下注', id]);
export const matomo_liveRoom_guess_history = () => window._paq.push(['trackEvent', '直播間', '查看', '競猜明細']);
// 直播間 --------------20210602 新增

// 全域推播 v
export const matomo_notice = () => window._paq.push(['trackEvent', '全域推播', '查看任務']);
// iOS下載 v
export const matomo_iosDownload = () => window._paq.push(['trackEvent', '下載頁', 'iOS下載']);
// iOS下載 v
export const matomo_androidDownload = () => window._paq.push(['trackEvent', '下載頁', 'Android下載']);
// iOS下載 v
export const matomo_pwaDownload = () => window._paq.push(['trackEvent', '下載頁', '快速安裝']);

// -----2021/04/28--------------------------------------------------------------------------------------------------------------
// 首頁/熱門直播 v
export const matomo_index_hot = (name, id) => window._paq.push(['trackEvent', '首頁/熱門直播', '進入直播間', name, id]);
// 首頁/最新直播 v
export const matomo_index_new = (name, id) => window._paq.push(['trackEvent', '首頁/最新直播', '進入直播間', name, id]);
// 首頁/最新直播 v
export const matomo_index_hotAnchor = (name, id) => window._paq.push(['trackEvent', '首頁/推薦主播', '進入直播間', name, id]);
// 首頁/分類Name熱門直播
export const matomo_index_class = (name, id, classid) => window._paq.push(['trackEvent', `首頁/分類${classid}熱門直播`, '進入直播間', name, id]);
// 首頁開播
export const matomo_index_on_live = () => window._paq.push(['trackEvent', '首頁', '查看', '開播']);
// 點擊廣告
export const matomo_slide_banner = (path, id) => window._paq.push(['trackEvent', '點擊廣告', '查看', path, id]);
// 充值廣告點擊
export const matomo_recharge_slide_banner = (id) => window._paq.push(['trackEvent', '充值', '點擊廣告', id]);
// 充值 確認充值
export const matomo_recharge_payment = (id) => window._paq.push(['trackEvent', '充值', '確認充值']);
// 賽程 確認充我的预约值
export const matomo_schedule_appointment = (id) => window._paq.push(['trackEvent', '賽程', '查看', '我的预约']);
// 充值 確認充值
export const matomo_schedule_wonderful = (id) => window._paq.push(['trackEvent', '賽程', '查看', '精彩赛事']);
// 充值 確認充值
export const matomo_schedule_class = (name) => window._paq.push(['trackEvent', '賽程', '查看', name]);
// 排行榜 查看
export const matomo_rank_select_menu = (name) => window._paq.push(['trackEvent', '排行榜', '查看', name]);
// 排行榜 查看
export const matomo_rank_select_submenu = (name) => window._paq.push(['trackEvent', '排行榜', '查看', name]);
// 排行榜 進入直播間
export const matomo_rank_view_live = (id) => window._paq.push(['trackEvent', '排行榜', '進入直播間', id]);
// 排行榜 關注主播
export const matomo_rank_follow = (id) => window._paq.push(['trackEvent', '排行榜', '關注主播', id]);
// 排行榜 取消關注
export const matomo_rank_unfollow = (id) => window._paq.push(['trackEvent', '排行榜', '取消關注', id]);
// 我的 複製推薦碼
export const matomo_my_copy_code = (id) => window._paq.push(['trackEvent', '我的', '複製推薦碼']);

// 我的 查看 選單v
export const matomo_my_menu_click = (name) => window._paq.push(['trackEvent', '我的', '查看', name]);
// -------------------------------------------------------------------------------------------------------------------
// 文章分類 查看文章 選單v
export const matomo_article_view_click = (name, id) => window._paq.push(['trackEvent', '資訊頁', '查看文章', name, id]);
export const matomo_article_topic_click = (name, id) => window._paq.push(['trackEvent', '資訊頁', '查看文章', name, id]);
export const matomo_article_menu_click = (name, id) => window._paq.push(['trackEvent', '資訊頁', '查看文章', name, id]);
export const matomo_article_share = (name, id) => window._paq.push(['trackEvent', '資訊頁', '分享', name, id]);
export const matomo_article_copy_link = (name, id) => window._paq.push(['trackEvent', '資訊頁', '複製連結', name, id]);
export const matomo_article_search = (name) => window._paq.push(['trackEvent', '資訊頁', '搜尋', name]);
// -------------------
export const matomo_article_topic_view_click = (name, id) => window._paq.push(['trackEvent', '主題頁', '查看文章', name, id]);
export const matomo_article_topic_share = (name, id) => window._paq.push(['trackEvent', '主題頁', '分享', name, id]);
export const matomo_article_topic_copy_link = (name, id) => window._paq.push(['trackEvent', '主題頁', '複製連結', name, id]);
export const matomo_article_topic_next = (id) => window._paq.push(['trackEvent', '主題頁', '查看主題', id]);
export const matomo_article_topic_back = () => window._paq.push(['trackEvent', '主題頁', '返回']);
// -------------------
export const matomo_article_info_like = (name, id) => window._paq.push(['trackEvent', '文章頁', 'Like文章', name, id]);
export const matomo_article_info_like_comment = (id) => window._paq.push(['trackEvent', '文章頁', 'Like留言', id]);
export const matomo_article_info_comment = () => window._paq.push(['trackEvent', '文章頁', '留言']);
export const matomo_article_info_back = () => window._paq.push(['trackEvent', '文章頁', '返回']);
// -------------------
export const matomo_campaign_view = (name) => window._paq.push(['trackEvent', '活動', '查看', name]);
export const matomo_campaign_share = () => window._paq.push(['trackEvent', '活動', '分享']);
export const matomo_campaign_copy_link = () => window._paq.push(['trackEvent', '活動', '複製連結']);

// -------------------
export const matomo_index_guess = (id) => window._paq.push(['trackEvent', '首頁', '查看競猜', id]);
export const matomo_index_article = (name, id) => window._paq.push(['trackEvent', '首頁', '查看文章', name, id]);
// -------------------

export const matomo_cta_click = (path) => window._paq.push(['trackEvent', 'trackEvent', '開啟客服', path]);
