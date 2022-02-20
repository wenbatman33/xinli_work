// 登錄
export const matomo_login_forget = () => window._paq.push(['trackEvent', '登錄', '忘記密碼']);
export const matomo_login_register = () => window._paq.push(['trackEvent', '登錄', '註冊', 'PWA/H5']);

// 忘記密碼
export const matomo_forget_getCode = () => window._paq.push(['trackEvent', '忘記密碼', '取驗證碼']);
export const matomo_forget_sendCode = () => window._paq.push(['trackEvent', '忘記密碼', '送出驗證碼']);
export const matomo_forget_cancel = () => window._paq.push(['trackEvent', '忘記密碼', '取消']);

// 註冊
export const matomo_register_login = () => window._paq.push(['trackEvent', '註冊', '登錄']);
export const matomo_register_getCode = () => window._paq.push(['trackEvent', '註冊', '取驗證碼']);
export const matomo_register_sendCode = () => window._paq.push(['trackEvent', '註冊', '送出驗證碼', 'PWA/H5']);

// 個人資料
export const matomo_profile_edit_phone = () => window._paq.push(['trackEvent', '個人資料', '編輯', '綁定手機']);
export const matomo_profile_edit_email = () => window._paq.push(['trackEvent', '個人資料', '編輯', '綁定email']);
export const matomo_profile_edit_password = () => window._paq.push(['trackEvent', '個人資料', '編輯', '修改密碼']);
export const matomo_profile_edit_avater = () => window._paq.push(['trackEvent', '個人資料', '編輯', '頭像']);

// 綁定手機
export const matomo_bindPhone_verify = () => window._paq.push(['trackEvent', '綁定手機', '驗證帳密']);
export const matomo_bindPhone_getCode = () => window._paq.push(['trackEvent', '綁定手機', '取驗證碼']);
export const matomo_bindPhone_sendCode = () => window._paq.push(['trackEvent', '綁定手機', '送出驗證碼']);

// 綁定手email
export const matomo_bindEmail_getCode = () => window._paq.push(['trackEvent', '綁定email', '取驗證碼']);
export const matomo_bindEmail_sendCode = () => window._paq.push(['trackEvent', '綁定email', '送出驗證碼']);

// 我的背包
export const matomo_backpack_check_giftList = () => window._paq.push(['trackEvent', '我的背包', '查看', '我的禮物']);
export const matomo_backpack_check_itemList = () => window._paq.push(['trackEvent', '我的背包', '查看', '我的道具']);
export const matomo_backpack_check_gift = (giftName, giftId) => window._paq.push(['trackEvent', '我的背包', '查看', giftName, giftId]);
export const matomo_backpack_check_item = (itemName, itemId) => window._paq.push(['trackEvent', '我的背包', '查看', itemName, itemId]);
export const matomo_backpack_use_item = (itemName, itemId) => window._paq.push(['trackEvent', '我的背包', '使用', itemName, itemId]);

// 下載頁
export const matomo_download_ios = () => window._paq.push(['trackEvent', '下載頁', 'iOS下載']);
export const matomo_download_android = () => window._paq.push(['trackEvent', '下載頁', 'Android下載']);
export const matomo_download_pwa = () => window._paq.push(['trackEvent', '下載頁', '快速安裝']);
export const matomo_download_home = () => window._paq.push(['trackEvent', '下載頁', '回首頁']);

// 喚起
export const matomo_open_pwa = () => window._paq.push(['trackEvent', '喚起PWA', '喚起PWA']);
export const matomo_open_h5 = () => window._paq.push(['trackEvent', '開啟H5', '開啟H5']);

// 文章分類
export const matomo_articleClass_check_article =  (articleName, articleId) => window._paq.push(['trackEvent', '資訊頁', '查看', articleName, articleId]);
export const matomo_articleClass_check_topic =  (topicName, topicId) => window._paq.push(['trackEvent', '資訊頁', '查看', topicName, topicId]);
export const matomo_articleClass_check_class =  (className, classId) => window._paq.push(['trackEvent', '資訊頁', '查看', className, classId]);
export const matomo_articleClass_check_slide =  (slideId) => window._paq.push(['trackEvent', '資訊頁', '點擊廣告', slideId]);
export const matomo_articleClass_share_article =  (articleName, articleId) => window._paq.push(['trackEvent', '資訊頁', '分享', articleName, articleId]);
export const matomo_articleClass_copy_article =  (articleName, articleId) => window._paq.push(['trackEvent', '資訊頁', '複製連結', articleName, articleId]);

// 文章主題
export const matomo_articleTopic_check_article =  (articleName, articleId) => window._paq.push(['trackEvent', '主題頁', '查看', articleName, articleId]);
export const matomo_articleTopic_check_nextTopic =  (topicId) => window._paq.push(['trackEvent', '主題頁', '查看', '下個主題', topicId]);
export const matomo_articleTopic_share_article =  (articleName, articleId) => window._paq.push(['trackEvent', '主題頁', '分享', articleName, articleId]);
export const matomo_articleTopic_copy_article =  (articleName, articleId) => window._paq.push(['trackEvent', '主題頁', '複製連結', articleName, articleId]);
export const matomo_articleTopic_back =  () => window._paq.push(['trackEvent', '主題頁', '返回']);

// 文章內容
export const matomo_articleInfo_like =  (articleName, articleId) => window._paq.push(['trackEvent', '文章頁', 'Like文章', articleName, articleId]);
export const matomo_articleInfo_like_message =  (messageId) => window._paq.push(['trackEvent', '文章頁', 'Like留言', messageId]);
export const matomo_articleInfo_message =  () => window._paq.push(['trackEvent', '文章頁', '留言']);
export const matomo_articleInfo_share =  (articleName, articleId) => window._paq.push(['trackEvent', '文章頁', '分享', articleName, articleId]);
export const matomo_articleInfo_copy =  (articleName, articleId) => window._paq.push(['trackEvent', '文章頁', '複製連結', articleName, articleId]);
export const matomo_articleInfo_back =  () => window._paq.push(['trackEvent', '文章頁', '返回']);

// 文章搜尋
export const matomo_articleSearch_search_article =  (keyword) => window._paq.push(['trackEvent', '搜尋頁', '搜尋', keyword]);

// 首頁
export const matomo_index_check_class = (className, classId) => window._paq.push(['trackEvent', '首頁', '查看', className, classId]);
export const matomo_index_check_campaign = () => window._paq.push(['trackEvent', '首頁', '查看', '活動']);
export const matomo_index_check_contribution = () => window._paq.push(['trackEvent', '首頁', '查看', '排行榜']);
export const matomo_index_check_personal = () => window._paq.push(['trackEvent', '首頁', '查看', '個人']);
export const matomo_index_check_search = () => window._paq.push(['trackEvent', '首頁', '查看', '搜尋']);
export const matomo_index_check_hotAnchor = () => window._paq.push(['trackEvent', '首頁', '查看', '推薦主播']);
export const matomo_index_check_hotLive = () => window._paq.push(['trackEvent', '首頁', '查看', '熱門直播']);
export const matomo_index_check_newLive = () => window._paq.push(['trackEvent', '首頁', '查看', '最新直播']);
export const matomo_index_check_classLive = (className) => window._paq.push(['trackEvent', '首頁', '查看', `${className}最新直播`]);
export const matomo_index_check_notice = (noticeId) => window._paq.push(['trackEvent', '首頁', '查看', '公告', noticeId]);
export const matomo_index_tabbar_concern = () => window._paq.push(['trackEvent', '首頁', 'Tabbar', '關注']);
export const matomo_index_tabbar_personal = () => window._paq.push(['trackEvent', '首頁', 'Tabbar', '我的']);
export const matomo_index_tabbar_schedule = () => window._paq.push(['trackEvent', '首頁', 'Tabbar', '賽程']);
export const matomo_index_tabbar_article = () => window._paq.push(['trackEvent', '首頁', 'Tabbar', '資訊']);
export const matomo_index_click_slide = (slideName, slideId) => window._paq.push(['trackEvent', '首頁', '點擊廣告', slideName, slideId]);

// 首頁/推薦主播
export const matomo_index_hotAnchor_follow = (anchorName, anchorUid) => window._paq.push(['trackEvent', '首頁/推薦主播', '關注主播', anchorName, anchorUid]);
export const matomo_index_hotAnchor_unfollow = (anchorName, anchorUid) => window._paq.push(['trackEvent', '首頁/推薦主播', '取消關注', anchorName, anchorUid]);
export const matomo_index_hotAnchor_watch = (anchorName, anchorUid) => window._paq.push(['trackEvent', '首頁/推薦主播', '進入直播間', anchorName, anchorUid]);

// 首頁/最新直播
export const matomo_index_newLive_watch = (anchorName, anchorUid) => window._paq.push(['trackEvent', '首頁/最新直播', '進入直播間', anchorName, anchorUid]);

// 首頁/熱門直播
export const matomo_index_hotLive_watch = (anchorName, anchorUid) => window._paq.push(['trackEvent', '首頁/熱門直播', '進入直播間', anchorName, anchorUid]);

// 首頁/分類名稱熱門直播
export const matomo_index_classLive_watch = (className, anchorName, anchorUid) => window._paq.push(['trackEvent', `首頁/${className}熱門直播`, '進入直播間', anchorName, anchorUid]);

// 分類/Name
export const matomo_classLive_watch = (className, anchorName, anchorUid) => window._paq.push(['trackEvent', className, '進入直播間', anchorName, anchorUid]);
export const matomo_classLive_click_slide = (className, slideName, slideId) => window._paq.push(['trackEvent', className, '點擊廣告', slideName, slideId]);
export const matomo_classLive_notice = (className, noticeId) => window._paq.push(['trackEvent', className, '公告', noticeId]);

// 活動
export const matomo_campaign_check_event = (eventName) => window._paq.push(['trackEvent', '活動', '查看', eventName]);
export const matomo_campaign_copy_link = (eventName) => window._paq.push(['trackEvent', '活動', '複製連結', eventName]);
export const matomo_campaign_share_weibo = (eventName) => window._paq.push(['trackEvent', '活動', '分享微博', eventName]);
export const matomo_campaign_share_qq = (eventName) => window._paq.push(['trackEvent', '活動', '分享QQ', eventName]);

// 排行榜
export const matomo_contribution_follow = (anchorName, anchorUid) => window._paq.push(['trackEvent', '排行榜', '關注主播', anchorName, anchorUid]);
export const matomo_contribution_unfollow = (anchorName, anchorUid) => window._paq.push(['trackEvent', '排行榜', '取消關注', anchorName, anchorUid]);
export const matomo_contribution_watch = (anchorName, anchorUid) => window._paq.push(['trackEvent', '排行榜', '進入直播間', anchorName, anchorUid]);
export const matomo_contribution_check_live_popular = () => window._paq.push(['trackEvent', '排行榜', '查看', '人氣主播']);
export const matomo_contribution_check_live_superstar = () => window._paq.push(['trackEvent', '排行榜', '查看', '超級明星(主播)']);
export const matomo_contribution_check_user_rich = () => window._paq.push(['trackEvent', '排行榜', '查看', '富豪貢獻']);
export const matomo_contribution_check_user_superstar = () => window._paq.push(['trackEvent', '排行榜', '查看', '超級明星(用戶)']);
export const matomo_contribution_check_week = () => window._paq.push(['trackEvent', '排行榜', '查看', '週']);
export const matomo_contribution_check_month = () => window._paq.push(['trackEvent', '排行榜', '查看', '月']);
export const matomo_contribution_check_live = () => window._paq.push(['trackEvent', '排行榜', '查看', '主播']);
export const matomo_contribution_check_user = () => window._paq.push(['trackEvent', '排行榜', '查看', '用戶']);

// 限時任務icon
export const matomo_index_check_limitTask = () => window._paq.push(['trackEvent', '首頁', '查看任務', '限時任務icon']);
export const matomo_schedule_check_limitTask = () => window._paq.push(['trackEvent', '賽程', '查看任務', '限時任務icon']);
export const matomo_concern_check_limitTask = () => window._paq.push(['trackEvent', '關注', '查看任務', '限時任務icon']);
export const matomo_search_check_limitTask = () => window._paq.push(['trackEvent', '搜尋', '查看任務', '限時任務icon']);
export const matomo_room_check_limitTask = () => window._paq.push(['trackEvent', '直播間', '查看任務', '限時任務icon']);

// 任務列表
export const matomo_tasks_check_limitTasks = () => window._paq.push(['trackEvent', '任務列表', '查看任務', '限時活動']);
export const matomo_tasks_reward_login = () => window._paq.push(['trackEvent', '任務列表', '領取獎勵', '登入獎勵']);
export const matomo_tasks_reward_newbie = (taskId) => window._paq.push(['trackEvent', '任務列表', '領取獎勵', '新手任務', taskId]);
export const matomo_tasks_reward_daily = (taskId) => window._paq.push(['trackEvent', '任務列表', '領取獎勵', '每日任務', taskId]);
export const matomo_tasks_reward_recharge = (taskId) => window._paq.push(['trackEvent', '任務列表', '領取獎勵', '充值任務', taskId]);

// 限時任務
export const matomo_limitTasks_check_tasks = () => window._paq.push(['trackEvent', '任務列表', '查看任務', '任務列表']);
export const matomo_limitTasks_reward = (taskId) => window._paq.push(['trackEvent', '任務列表', '領取獎勵', '限時任務', taskId]);

// 搜尋
export const matomo_search_search = (keyword) => window._paq.push(['trackEvent', '搜尋', '搜尋', keyword]);
export const matomo_search_watch = (anchorName, anchorUid) => window._paq.push(['trackEvent', '搜尋', '進入直播間', anchorName, anchorUid]);
export const matomo_search_unfollow = (anchorName, anchorUid) => window._paq.push(['trackEvent', '搜尋', '取消關注', anchorName, anchorUid]);
export const matomo_search_follow = (anchorName, anchorUid) => window._paq.push(['trackEvent', '搜尋', '關注主播', anchorName, anchorUid]);

// 賽事
export const matomo_schedule_check_myAppointment = (page) => window._paq.push(['trackEvent', page, '查看', '我的預約']);
export const matomo_schedule_check_wonderful = (page) => window._paq.push(['trackEvent', page, '查看', '精彩賽事']);
export const matomo_schedule_check_class = (page, className) => window._paq.push(['trackEvent', page, '查看', className]);
export const matomo_schedule_appointment = (page, eid) => window._paq.push(['trackEvent', page, '預約賽事', eid]);
export const matomo_schedule_check_game = (page, eid) => window._paq.push(['trackEvent', page, '查看', eid]);
export const matomo_schedule_watch = (page, anchorName, anchorUid) => window._paq.push(['trackEvent', page, '進入直播間', anchorName, anchorUid]);
export const matomo_schedule_check_date = (page) => window._paq.push(['trackEvent', page, '選擇日期']);

// 關注
export const matomo_concern_follow = (anchorName, anchorUid) => window._paq.push(['trackEvent', '關注', '關注主播', anchorName, anchorUid]);
export const matomo_concern_unfollow = (anchorName, anchorUid) => window._paq.push(['trackEvent', '關注', '取消關注', anchorName, anchorUid]);
export const matomo_concern_watch = (anchorName, anchorUid) => window._paq.push(['trackEvent', '關注', '進入直播間', anchorName, anchorUid]);
export const matomo_concern_hotAnchor = () => window._paq.push(['trackEvent', '關注', '查看', '推薦主播']);

// 推薦主播
export const matomo_hotAnchor_follow = (anchorName, anchorUid) => window._paq.push(['trackEvent', '推薦主播', '關注主播', anchorName, anchorUid]);
export const matomo_hotAnchor_unfollow = (anchorName, anchorUid) => window._paq.push(['trackEvent', '推薦主播', '取消關注', anchorName, anchorUid]);
export const matomo_hotAnchor_watch = (anchorName, anchorUid) => window._paq.push(['trackEvent', '推薦主播', '進入直播間', anchorName, anchorUid]);

// 充值
export const matomo_recharge_click_money = (money) => window._paq.push(['trackEvent', '充值', '選擇金額', '', money]);
export const matomo_recharge_click_method = (method) => window._paq.push(['trackEvent', '充值', '選擇通路', method]);
export const matomo_recharge_click_submit = () => window._paq.push(['trackEvent', '充值', '送出', '確認充值']);

// 直播間
export const matomo_room_check_anchorDetail = (anchorUid) => window._paq.push(['trackEvent', '直播間', '查看主播資訊', '主播資訊', anchorUid]);
export const matomo_room_topList_day = () => window._paq.push(['trackEvent', '直播間', '查看貢獻榜', '日榜']);
export const matomo_room_topList_week = () => window._paq.push(['trackEvent', '直播間', '查看貢獻榜', '週榜']);
export const matomo_room_topList_month = () => window._paq.push(['trackEvent', '直播間', '查看貢獻榜', '月榜']);
export const matomo_room_check_guessList = () => window._paq.push(['trackEvent', '直播間', '查看競猜']);
export const matomo_room_check_taskList = () => window._paq.push(['trackEvent', '直播間', '查看任務']);
export const matomo_room_check_guess = (guessId) => window._paq.push(['trackEvent', '直播間', '查看競猜', guessId]);
export const matomo_room_bet_guess = (guessId) => window._paq.push(['trackEvent', '直播間', '確認下注', guessId]);
export const matomo_room_check_guessDetail = (guessId) => window._paq.push(['trackEvent', '直播間', '查看', '競猜明細']);
export const matomo_room_check_chat = () => window._paq.push(['trackEvent', '直播間', '查看聊天室', '聊天室']);
export const matomo_room_send_gift = (giftName, giftId) => window._paq.push(['trackEvent', '直播間', '送禮', giftName, giftId]);
export const matomo_room_chat_send = () => window._paq.push(['trackEvent', '直播間', '聊天送出']);
export const matomo_room_follow = (anchorName, anchorUid) => window._paq.push(['trackEvent', '直播間', '關注主播', anchorName, anchorUid]);
export const matomo_room_unfollow = (anchorName, anchorUid) => window._paq.push(['trackEvent', '直播間', '取消關注', anchorName, anchorUid]);
export const matomo_room_share = () => window._paq.push(['trackEvent', '直播間', '分享']);
export const matomo_room_leave = () => window._paq.push(['trackEvent', '直播間', '離開直播間']);
export const matomo_room_change_source1 = () => window._paq.push(['trackEvent', '直播間', '切換播源', '線路1']);
export const matomo_room_change_source2 = () => window._paq.push(['trackEvent', '直播間', '切換播源', '線路2']);
export const matomo_room_change_source3 = () => window._paq.push(['trackEvent', '直播間', '切換播源', '線路3']);
export const matomo_room_check_slide = (slideId) => window._paq.push(['trackEvent', '直播間', '點擊廣告', slideId]);
export const matomo_room_clearMessage = () => window._paq.push(['trackEvent', '直播間', '清空聊天室']);
export const matomo_room_lockMessage = () => window._paq.push(['trackEvent', '直播間', '鎖定聊天室']);
export const matomo_room_changeColor = () => window._paq.push(['trackEvent', '直播間', '更換顏色']);
export const matomo_room_svga_on = () => window._paq.push(['trackEvent', '直播間', '開啟動態']);
export const matomo_room_svga_off = () => window._paq.push(['trackEvent', '直播間', '關閉動態']);
export const matomo_room_barrage_on = () => window._paq.push(['trackEvent', '直播間', '開啟彈幕']);
export const matomo_room_barrage_off = () => window._paq.push(['trackEvent', '直播間', '關閉彈幕']);
export const matomo_room_schedule_appointment = (gameName, gameEid) => window._paq.push(['trackEvent', '直播間', '預約賽事', gameName, gameEid]);

// 我的
export const matomo_personal_recharge = () => window._paq.push(['trackEvent', '我的', '充值', '充值']);
export const matomo_personal_click_checkin = () => window._paq.push(['trackEvent', '我的', '點擊', '每日簽到']);
export const matomo_personal_check_setting = () => window._paq.push(['trackEvent', '我的', '查看', '設定']);
export const matomo_personal_check_inbox = () => window._paq.push(['trackEvent', '我的', '查看', '站內信']);
export const matomo_personal_check_invite = () => window._paq.push(['trackEvent', '我的', '查看', '我的推薦碼']);
export const matomo_personal_check_backpack = () => window._paq.push(['trackEvent', '我的', '查看', '我的背包']);
export const matomo_personal_check_tasks = () => window._paq.push(['trackEvent', '我的', '查看', '我的任務']);
export const matomo_personal_check_notice = () => window._paq.push(['trackEvent', '我的', '查看', '拍手公告']);
export const matomo_personal_check_chargeList = () => window._paq.push(['trackEvent', '我的', '查看', '充值紀錄']);
export const matomo_personal_check_rewardList = () => window._paq.push(['trackEvent', '我的', '查看', '打賞紀錄']);
export const matomo_personal_check_adminList = () => window._paq.push(['trackEvent', '我的', '查看', '房間設定']);
export const matomo_personal_check_userLevel = () => window._paq.push(['trackEvent', '我的', '查看', '用戶等級']);
export const matomo_personal_check_anchorLevel = () => window._paq.push(['trackEvent', '我的', '查看', '主播等級']);
export const matomo_personal_check_profile = () => window._paq.push(['trackEvent', '我的', '查看', '個人資料']);

// 我的推薦碼
export const matomo_invite_check_record = () => window._paq.push(['trackEvent', '我的推薦碼', '查看', '推薦紀錄']);
export const matomo_invite_check_bonus = () => window._paq.push(['trackEvent', '我的推薦碼', '查看', '加碼紀錄']);
export const matomo_invite_copy = () => window._paq.push(['trackEvent', '我的推薦碼', '複製']);
export const matomo_invite_share = () => window._paq.push(['trackEvent', '我的推薦碼', '分享']);
export const matomo_invite_copyLink = () => window._paq.push(['trackEvent', '我的推薦碼', '複製連結']);
export const matomo_invite_shareWeibo = () => window._paq.push(['trackEvent', '我的推薦碼', '分享微博']);
export const matomo_invite_shareQQ = () => window._paq.push(['trackEvent', '我的推薦碼', '分享QQ']);

// 客服
export const matomo_floatChat_click = (path) => window._paq.push(['trackEvent', path, '開啟客服']);