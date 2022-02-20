export default {
  install(Vue, options) {
    // 左侧导航栏
    Vue.prototype.$matomo_navi_register = () => window._paq.push(['trackEvent', '左侧导航栏', '点击', '注册']);
    Vue.prototype.$matomo_navi_login = () => window._paq.push(['trackEvent', '左侧导航栏', '点击', '登录']);
    Vue.prototype.$matomo_navi_avatar = () => window._paq.push(['trackEvent', '左侧导航栏', '点击', '大头照']);
    Vue.prototype.$matomo_navi_logout = () => window._paq.push(['trackEvent', '左侧导航栏', '点击', '登出']);
    Vue.prototype.$matomo_navi_gastle = () => window._paq.push(['trackEvent', '左侧导航栏', '点击', '梦之城']);
    Vue.prototype.$matomo_navi_promtion = () => window._paq.push(['trackEvent', '左侧导航栏', '点击', '优惠活动']);
    Vue.prototype.$matomo_navi_agent = () => window._paq.push(['trackEvent', '左侧导航栏', '点击', '代理']);
    Vue.prototype.$matomo_navi_app = () => window._paq.push(['trackEvent', '左侧导航栏', '点击', 'App下载']);
    Vue.prototype.$matomo_navi_livechat = () => window._paq.push(['trackEvent', '左侧导航栏', '点击', '在线客服']);
    Vue.prototype.$matomo_navi_about = () => window._paq.push(['trackEvent', '左侧导航栏', '点击', '关于']);
    Vue.prototype.$matomo_navi_logo = () => window._paq.push(['trackEvent', '左侧导航栏', '点击', 'Logo']);
    Vue.prototype.$matomo_navi_signature = () => window._paq.push(['trackEvent', '左侧导航栏', '点击', '签到']);
    Vue.prototype.$matomo_navi_transactionlog = () => window._paq.push(['trackEvent', '右侧快捷', '点击', '存提款']);
    // footer
    Vue.prototype.$matomo_footer_about1 = () => window._paq.push(['trackEvent', 'Footer', '点击', '关于我们']);
    Vue.prototype.$matomo_footer_about2 = () => window._paq.push(['trackEvent', 'Footer', '点击', '隐私权政策']);
    Vue.prototype.$matomo_footer_about3 = () => window._paq.push(['trackEvent', 'Footer', '点击', '责任博彩']);
    Vue.prototype.$matomo_footer_about4 = () => window._paq.push(['trackEvent', 'Footer', '点击', '规则与条款']);
    Vue.prototype.$matomo_footer_about5 = () => window._paq.push(['trackEvent', 'Footer', '点击', '声明']);
    Vue.prototype.$matomo_footer_livechat = () => window._paq.push(['trackEvent', 'Footer', '点击', '联络我们']);
    Vue.prototype.$matomo_footer_faq1 = () => window._paq.push(['trackEvent', 'Footer', '点击', '存款问题']);
    Vue.prototype.$matomo_footer_faq2 = () => window._paq.push(['trackEvent', 'Footer', '点击', '提款咨询']);
    Vue.prototype.$matomo_footer_faq3 = () => window._paq.push(['trackEvent', 'Footer', '点击', '如何注册']);
    Vue.prototype.$matomo_footer_faq4 = () => window._paq.push(['trackEvent', 'Footer', '点击', '推荐浏览器']);
    Vue.prototype.$matomo_footer_faq5 = () => window._paq.push(['trackEvent', 'Footer', '点击', '更多VIP线路']);
    // banner
    Vue.prototype.$matomo_banner = title => window._paq.push(['trackEvent', 'Banner', '点击', title]);
    // 公告
    Vue.prototype.$matomo_news = id => window._paq.push(['trackEvent', '公告', '点击', id]);
    // 进入游戏
    Vue.prototype.$matomo_game = (group, gameName) => window._paq.push(['trackEvent', 'Game', group, gameName]);
    // 安装教程連結
    Vue.prototype.$matomo_ios_qrcode = () => window._paq.push(['trackEvent', '安装教程連結', '点击', 'iOS安装教程']);
    Vue.prototype.$matomo_android_qrcode = () => window._paq.push(['trackEvent', '安装教程連結', '点击', 'Android安装教程']);
    // 游戏分类
    Vue.prototype.$matomo_gameFilter_new = () => window._paq.push(['trackEvent', '游戏筛选', '点击', '最新游戏']);
    Vue.prototype.$matomo_gameFilter_hot = () => window._paq.push(['trackEvent', '游戏筛选', '点击', '热门推荐']);
    Vue.prototype.$matomo_gameFilter_havePlayGame = () => window._paq.push(['trackEvent', '游戏筛选', '点击', '曾经游玩']);
    Vue.prototype.$matomo_gameFilter_like = () => window._paq.push(['trackEvent', '游戏筛选', '点击', '我的最爱']);
    // 游戏类型 
    Vue.prototype.$matomo_gameTagName = gameTagName => window._paq.push(['trackEvent', '游戏筛选', '確認', gameTagName]);
    Vue.prototype.$matomo_gameTagReset = () => window._paq.push(['trackEvent', '游戏筛选', '点击', '重置条件']);
    // 优惠分类
    Vue.prototype.$matomo_promotionCategory = promotionGroupName => window._paq.push(['trackEvent', '优惠分类', '点击', promotionGroupName]);
    // 优惠列表
    Vue.prototype.$matomo_promotionItem = promotionId => window._paq.push(['trackEvent', 'Promotion', '点击', 'Promotion', promotionId]);
    // 上側導航列
    Vue.prototype.$matomo_my_personal = () => window._paq.push(['trackEvent', '个人中心', '点击', '个人资料']);
    Vue.prototype.$matomo_my_transactionlog = () => window._paq.push(['trackEvent', '个人中心', '点击', '资金纪录']);
    Vue.prototype.$matomo_my_betting = () => window._paq.push(['trackEvent', '个人中心', '点击', '我的投注']);
    Vue.prototype.$matomo_my_mypromotion = () => window._paq.push(['trackEvent', '个人中心', '点击', '我的优惠']);
    Vue.prototype.$matomo_my_detail = () => window._paq.push(['trackEvent', '个人中心', '点击', '安全中心']);
    Vue.prototype.$matomo_my_inbox = () => window._paq.push(['trackEvent', '个人中心', '点击', '我的消息']);
    // 个人中心 一鍵收回
    Vue.prototype.$matomo_my_recylingAllWallet = () => window._paq.push(['trackEvent', '个人中心', '点击', '收合']);
    // 个人中心 兑换商品
    Vue.prototype.$matomo_my_gotoCastle = () => window._paq.push(['trackEvent', '个人中心', '点击', '兑换商品']);
    // 个人中心 我要賺基金
    Vue.prototype.$matomo_my_gotoMission = () => window._paq.push(['trackEvent', '个人中心', '点击', '我要賺基金']);
    // 个人中心 更换头像
    Vue.prototype.$matomo_my_changePicture = () => window._paq.push(['trackEvent', '个人中心', '点击', '更换头像']);
    // 
    // 资金纪录分类
    Vue.prototype.$matomo_my_transactionLogType = type => window._paq.push(['trackEvent', '资金纪录', '选择', type]);
    // 资金纪录时间区间
    Vue.prototype.$matomo_my_transactionLogTime = () => window._paq.push(['trackEvent', '资金纪录', '选择', '资金纪录时间区间']);
    // 
    // 我的投注_游戏类型
    Vue.prototype.$matomo_my_bettingGameType = gameType => window._paq.push(['trackEvent', '我的投注_游戏类型', '选择', gameType]);
    // 我的投注_游戏廠商選擇
    Vue.prototype.$matomo_my_bettingCompanyType = company_tag => window._paq.push(['trackEvent', '我的投注_游戏廠商選擇', '选择', company_tag]);
    // 
    // 我的优惠 已完成/未完成
    Vue.prototype.$matomo_my_myPromotionType = type => window._paq.push(['trackEvent', '我的优惠', '点击', type]);
    // 我的优惠 查看优惠
    Vue.prototype.$matomo_my_myPromotionId = id => window._paq.push(['trackEvent', '我的优惠', '点击', id]);
    // 
    // 安全中心 
    Vue.prototype.$matomo_my_detail_phone = () => window._paq.push(['trackEvent', '安全中心', '点击', '验证手机']);
    // 安全中心 
    Vue.prototype.$matomo_my_detail_mail = () => window._paq.push(['trackEvent', '安全中心', '点击', '验证邮箱']);
    // 安全中心 
    Vue.prototype.$matomo_my_detail_bank = () => window._paq.push(['trackEvent', '安全中心', '点击', '绑定银行卡']);
    // 安全中心 
    Vue.prototype.$matomo_my_detail_password = () => window._paq.push(['trackEvent', '安全中心', '点击', '修改密码']);
    // 我的消息 
    Vue.prototype.$matomo_my_inbox = id => window._paq.push(['trackEvent', '我的消息', '查看', id]);
    // 存款優惠 
    Vue.prototype.$matomo_deposit_promoton = (key, subkey) => window._paq.push(['trackEvent', '存款優惠', key, subkey]);
  },
};

