export default {
  title: '梦之城',
  children: [
    {
      path: 'dreamCityBanner',
      title: 'Banner 管理',
      children: [
        { path: 'dreamCityBannerCreate', title: '新增 Banner', active: '/dreamCityBanner' }
      ]
    },
    {
      path: 'dreamCityNews',
      title: '公告管理',
      children: [
        { path: 'dreamCityNewsCreate', title: '新增公告', active: '/dreamCityNews' },
      ]
    },
    {
      path: 'task',
      title: '任务管理',
      children: [
        { path: 'taskParticipated', title: '参与任务会员名单', active: '/task' }
      ]
    },
    {
      path: 'goods',
      title: '商品管理',
      children: [
        { path: 'goodsBuyer', title: '兑换商品会员名单', active: '/goods' }
      ]
    },
    {
      path: 'order',
      title: '订单管理'
    },
    {
      path: 'bet',
      title: '竞猜管理'
    },
    {
      path: 'dreamCashLog',
      title: '梦基金钱包记录'
    },
    {
      path: 'dreamCashRecord',
      title: '梦基金日报'
    },
    {
      path: 'taskRecord',
      title: '任务日报'
    },
    {
      path: 'betRecord',
      title: '竞猜日报'
    },
    {
      path: 'rank',
      title: '竟猜排行'
    },
  ]
}
