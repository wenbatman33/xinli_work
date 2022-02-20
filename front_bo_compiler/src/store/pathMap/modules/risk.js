export default {
  title: '风险管理',
  children: [
    {
      path: 'firstCert',
      title: '初审模块',
    },
    {
      path: 'weirdMember',
      title: '玩家異常條件篩選',
    },
    {
      path: 'riskWithdrawOrder',
      title: '全部提款单',
      children: [
        { path: 'riskCheckWithdrawOrder', title: '提款单审核', active: '/riskWithdrawOrder' },
      ]
    },
    {
      path: 'memberRelation',
      title: '玩家装置关连分析',
    },
  ]
}
