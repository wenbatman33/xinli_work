export default {
  title: '代理存提出管理',
  children: [
    { path: 'agencyDepositOrderAll', title: '全部代理存款单' },
    { path: 'agencyDepositOrderT', title: '代理三方存款单' },
    { path: 'agencyDepositOrderD', title: '代理银行卡存款单' },
    {
      path: 'agencyWithdrawOrder',
      title: '全部代理提款单',
      children: [
        { path: 'checkAgencyWithdrawOrder', title: '審核代理提款單', active: '/agencyWithdrawOrder' }
      ]
    },
    {
      path: 'agencyWithdrawalOrder',
      title: '全部代理出款单',
      children: [
        { path: 'checkAgencyWithdrawalOrder', title: '审核代理出款单', active: '/agencyWithdrawalOrder' }
      ]
    }
  ]
}
