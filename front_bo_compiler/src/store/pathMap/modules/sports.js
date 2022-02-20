export default {
  title: '体育营运管理',
  children: [
    {
      path: 'sportBanner',
      title: 'Banner 管理',
      children: [
        { path: 'sportBannerCreate', title: '新增 Banner', active: '/sportBanner' }
      ]
    },
    {
      path: 'sportNews',
      title: '公告管理',
      children: [
        { path: 'sportNewsCreate', title: '新增公告', active: '/sportNews' },
      ]
    },
    {
      path: 'sportGreetings',
      title: '欢迎词管理',
      children: [
        { path: 'sportGreetingsEdit', title: '新增欢迎词', active: '/sportGreetings' }
      ]
    },
    {
      path: 'sportInbox',
      title: '站内信发送与记录',
      children: [
        { path: 'sportInboxEdit', title: '新信件', active: '/sportInbox' }
      ]
    },
    {
      path: 'sportPushManage',
      title: '推播与纪录',
    }
  ]
}
