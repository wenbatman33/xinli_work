export default {
  title: '玩家管理',
  children: [
    {
      path: 'memberGroupType',
      title: '玩家类型与群组管理',
      children: [
        {
          path: 'memberGroupGroup',
          title: '玩家群组',
          active: '/memberGroupType',
          children: [
            {
              path: 'memberGroupList',
              title: '玩家群组用户清单',
              active: '/memberGroupType'
            }
          ]
        },
        {
          path: 'memberGroupTypeList',
          title: '玩家类型用户清单',
          active: '/memberGroupType'
        }
      ]
    },
    {
      path: 'member',
      title: '所有玩家',
      children: [
        { path: 'memberDetail', title: '玩家明细', active: '/member' }
      ]
    },
    {
      path: 'otpList',
      title: '验证码纪录'
    },
    {
      path: 'memberLoginLog',
      title: '玩家登入纪录'
    },
    {
      path: 'cashAdjust',
      title: '玩家资金调整审核'
    },
    {
      path: 'reservedWords',
      title: '保留字'
    },
    {
      path: 'batch',
      title: '批次管理'
    },
  ]
}
