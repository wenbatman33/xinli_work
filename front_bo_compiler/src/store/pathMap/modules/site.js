export default {
  title: '全站营运管理',
  children: [
    {
      path: 'banner',
      title: 'Banner 管理',
      children: [
        { path: 'bannerCreate', title: '新增 Banner', active: '/banner' }
      ]
    },
    {
      path: 'news',
      title: '公告管理',
      children: [
        { path: 'newsCreate', title: '新增公告', active: '/news' },
      ]
    },
    {
      path: 'gameType',
      title: '游戏分类管理',
      children: [
        { path: 'gameTypeEdit', title: '修改游戏分类', active: '/gameType' }
      ]
    },
    {
      path: 'gameGroup',
      title: '厂商管理',
      children: [
        { path: 'gameGroupEdit', title: '编辑厂商', active: '/gameGroup' }
      ]
    },
    {
      path: 'greetings',
      title: '欢迎词管理',
      children: [
        { path: 'greetingsEdit', title: '新增欢迎词', active: '/greetings' }
      ]
    },
    {
      path: 'game',
      title: '游戏管理',
      children: [
        { path: 'gameEdit', title: '新增游戏', active: '/game' }
      ]
    },
    {
      path: 'inbox',
      title: '站内信发送与记录',
      children: [
        { path: 'inboxEdit', title: '新信件', active: '/inbox' }
      ]
    },
    {
      path: 'pushManage',
      title: '推播与纪录',
    }
  ]
}
