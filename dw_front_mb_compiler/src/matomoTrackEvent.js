export default {
  install(Vue) {
    // Header
    Vue.prototype.$matomo_Header_logo = () => window._paq.push(['trackEvent', 'Header', '点击', 'Logo']);
    Vue.prototype.$matomo_Header_register = () => window._paq.push(['trackEvent', 'Header', '点击', '注册']);
    Vue.prototype.$matomo_Header_login = () => window._paq.push(['trackEvent', 'Header', '点击', '登录']);
    Vue.prototype.$matomo_Header_wallet = () => window._paq.push(['trackEvent', 'Header', '点击', '钱包']);
    // Banner
    Vue.prototype.$matomo_Banner = title => window._paq.push(['trackEvent', 'Banner', '点击', title]);
    // news
    Vue.prototype.$matomo_News = id => window._paq.push(['trackEvent', '公告', '点击', id]);
    // 游戏类型
    Vue.prototype.$matomo_game = name => window._paq.push(['trackEvent', '游戏类型', '点击', name]);
    // 进入游戏
    Vue.prototype.$matomo_game_play = gameName => window._paq.push(['trackEvent', '进入游戏', '点击', gameName]);
    // 首頁連結
    Vue.prototype.$matomo_index_signature = () => window._paq.push(['trackEvent', '首頁連結', '点击', '每日签到']);
    Vue.prototype.$matomo_index_bonus = () => window._paq.push(['trackEvent', '首頁連結', '点击', '红利']);
    Vue.prototype.$matomo_index_castleBet = () => window._paq.push(['trackEvent', '首頁連結', '点击', '竞猜']);
    Vue.prototype.$matomo_index_castle = () => window._paq.push(['trackEvent', '首頁連結', '点击', '梦之城']);
    // Tab_Bar
    Vue.prototype.$matomo_tabBar_index = () => window._paq.push(['trackEvent', 'Tab_Bar', '点击', '首页']);
    Vue.prototype.$matomo_tabBar_promotion = () => window._paq.push(['trackEvent', 'Tab_Bar', '点击', '优惠']);
    Vue.prototype.$matomo_tabBar_open_more = () => window._paq.push(['trackEvent', 'Tab_Bar', '点击', '开启更多']);
    Vue.prototype.$matomo_tabBar_close_more = () => window._paq.push(['trackEvent', 'Tab_Bar', '点击', '关闭更多']);
    Vue.prototype.$matomo_tabBar_transactionlog = () => window._paq.push(['trackEvent', 'Tab_Bar', '点击', '存提']);
    Vue.prototype.$matomo_tabBar_my = () => window._paq.push(['trackEvent', 'Tab_Bar', '点击', '我的']);
    // 优惠活动
    Vue.prototype.$matomo_tabBar_promotionGroup = promotionType => window._paq.push(['trackEvent', '优惠分类', '点击', promotionType]);
    Vue.prototype.$matomo_tabBar_promotion = promotionTitle => window._paq.push(['trackEvent', '优惠', '点击', promotionTitle]);
    // 更多
    Vue.prototype.$matomo_more_help = () => window._paq.push(['trackEvent', '更多', '点击', '助手']);
    Vue.prototype.$matomo_more_livechat = () => window._paq.push(['trackEvent', '更多', '点击', '客服']);
    Vue.prototype.$matomo_more_about = () => window._paq.push(['trackEvent', '更多', '点击', '关于']);
    Vue.prototype.$matomo_more_agent = () => window._paq.push(['trackEvent', '更多', '点击', '代理']);
    // my
    Vue.prototype.$matomo_my_avatar = () => window._paq.push(['trackEvent', '我的', '点击', '更换头像']);
    Vue.prototype.$matomo_my_inbox = () => window._paq.push(['trackEvent', '我的', '点击', '我的消息']);
    Vue.prototype.$matomo_my_castle = () => window._paq.push(['trackEvent', '我的', '点击', '前往夢之城']);
    Vue.prototype.$matomo_my_collapse = () => window._paq.push(['trackEvent', '我的', '点击', '收合']);
    Vue.prototype.$matomo_my_recylingAllWallet = () => window._paq.push(['trackEvent', '我的', '点击', '一键收回']);
    Vue.prototype.$matomo_my_transactionlog = () => window._paq.push(['trackEvent', '我的', '点击', '资金纪录']);
    Vue.prototype.$matomo_my_promotion = () => window._paq.push(['trackEvent', '我的', '点击', '我的优惠']);
    Vue.prototype.$matomo_my_betting = () => window._paq.push(['trackEvent', '我的', '点击', '我的投注']);
    Vue.prototype.$matomo_my_personal = () => window._paq.push(['trackEvent', '我的', '点击', '个人资料']);
    Vue.prototype.$matomo_my_detail = () => window._paq.push(['trackEvent', '我的', '点击', '安全中心']);
    Vue.prototype.$matomo_my_version = () => window._paq.push(['trackEvent', '我的', '点击', '版本讯息']);
    // 资金纪录
    Vue.prototype.$matomo_transactionlog_group = name => window._paq.push(['trackEvent', '资金纪录', '选择', name]);
    Vue.prototype.$matomo_transactionlog_date = () => window._paq.push(['trackEvent', '资金纪录', '选择', '资金纪录時間']);
    // 我的优惠
    Vue.prototype.$matomo_mypromotion_type = type => window._paq.push(['trackEvent', '我的优惠', '点击', type]);
    Vue.prototype.$matomo_mypromotion_name = name => window._paq.push(['trackEvent', '我的优惠', '点击', name]);
    // 我的投注
    Vue.prototype.$matomo_mybetting_id = id => window._paq.push(['trackEvent', '我的投注', '选择', id]);
    Vue.prototype.$matomo_mybetting_companyTag = companyTag => window._paq.push(['trackEvent', '我的投注', '选择', companyTag]);
    Vue.prototype.$matomo_mybetting_date = () => window._paq.push(['trackEvent', '我的投注', '选择', '游戏时间选择']);
    // 安全中心
    Vue.prototype.$matomo_detail_phone = () => window._paq.push(['trackEvent', '安全中心', '点击', '验证手机']);
    Vue.prototype.$matomo_detail_mail = () => window._paq.push(['trackEvent', '安全中心', '点击', '验证邮箱']);
    Vue.prototype.$matomo_detail_bank = () => window._paq.push(['trackEvent', '安全中心', '点击', '绑定银行卡']);
    Vue.prototype.$matomo_detail_password = () => window._paq.push(['trackEvent', '安全中心', '点击', '修改密码']);
    // 游戏筛选
    Vue.prototype.$matomo_gamefilter_advanced = () => window._paq.push(['trackEvent', '游戏筛选', '点击', '进阶']);
    Vue.prototype.$matomo_gamefilter_new = () => window._paq.push(['trackEvent', '游戏筛选', '点击', '最新游戏']);
    Vue.prototype.$matomo_gamefilter_hot = () => window._paq.push(['trackEvent', '游戏筛选', '点击', '热门推荐']);
    Vue.prototype.$matomo_gamefilter_havePlayGame = () => window._paq.push(['trackEvent', '游戏筛选', '点击', '曾经游玩']);
    Vue.prototype.$matomo_gamefilter_like = () => window._paq.push(['trackEvent', '游戏筛选', '点击', '我的最爱']);
    Vue.prototype.$matomo_gamefilter_filter = name => window._paq.push(['trackEvent', '游戏筛选', '確認', name]);
    Vue.prototype.$matomo_gamefilter_reset = () => window._paq.push(['trackEvent', '游戏筛选', '点击', '重置条件']);
    // App下載頁
    Vue.prototype.$matomo_app_download = type => window._paq.push(['trackEvent', 'App下載', '点击', type]);
    // 存款優惠 
    Vue.prototype.$matomo_deposit_promoton = (key, subkey) => window._paq.push(['trackEvent', '存款優惠', key, subkey]);
  },
};
