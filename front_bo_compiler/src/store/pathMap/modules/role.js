export default {
  title: '权限管理',
  children: [
    {
      path: 'role',
      title: '群组设置',
      children: [
        { path: 'roleDetail', title: '查看群组', active: '/role' }
      ]
    },
    {
      path: 'account',
      title: '帐号设置',
      children: [
        { path: 'roleUserDetailTabs', title: '查看使用者', active: '/account' }
      ]
    },
  ]
}
