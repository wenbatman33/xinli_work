export default {
  install(Vue, options) {
    // 左侧导航栏
    Vue.prototype.$matomo_navi_castle = () => window._paq.push(['trackEvent', '左侧导航栏', '点击', '兑换商城']);
    Vue.prototype.$matomo_navi_bet = () => window._paq.push(['trackEvent', '左侧导航栏', '点击', '游戏竞猜']);
    Vue.prototype.$matomo_navi_mission = () => window._paq.push(['trackEvent', '左侧导航栏', '点击', '赚梦基金']);
    Vue.prototype.$matomo_navi_livechat = () => window._paq.push(['trackEvent', '左侧导航栏', '点击', '赚梦基金']);
    Vue.prototype.$matomo_navi_logo = () => window._paq.push(['trackEvent', '左侧导航栏', '点击', '回梦工厂首页']);
    // shopping
    Vue.prototype.$matomo_shopping_category = category => window._paq.push(['trackEvent', '兑换商城分类', '点击', category]);
    // 商品
    Vue.prototype.$matomo_good_item = name => window._paq.push(['trackEvent', '商品', '点击', name]);
    
    // bet
    Vue.prototype.$matomo_bet_category = category => window._paq.push(['trackEvent', '游戏竞猜分类', '点击', category]);
    
    // 购物车订单
    Vue.prototype.$matomo_cart_delete = () => window._paq.push(['trackEvent', '购物车订单', '点击', '删除购物车商品']);
    
    // 商品订单
    Vue.prototype.$matomo_oder_type = type => window._paq.push(['trackEvent', '商品订单', '点击', type]);
    // 
    Vue.prototype.$matomo_oder_ponit_record_open = type => window._paq.push(['trackEvent', '梦基金纪录', '点击', type]);
    Vue.prototype.$matomo_oder_record_open = id => window._paq.push(['trackEvent', '兑换纪录', '点击', id]);
    
    // Header
    Vue.prototype.$matomo_header_oder = () => window._paq.push(['trackEvent', 'Header', '点击', '前往商品订单']);
    Vue.prototype.$matomo_header_cart = () => window._paq.push(['trackEvent', 'Header', '点击', '前往购物车']);
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
    Vue.prototype.$matomo_news = title => window._paq.push(['trackEvent', '公告', '点击', title]);

  },
};

