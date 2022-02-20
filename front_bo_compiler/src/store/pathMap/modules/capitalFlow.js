export default {
  title: '存提出管理',
  children: [
    { path: 'depositOrderAll', title: '全部存款单' },
    { path: 'depositOrderT', title: '三方存款单' },
    { path: 'depositOrderD', title: '银行卡存款单' },
    {
      path: 'withdrawOrder',
      title: '全部提款单',
      children: [
        { path: 'checkWithdrawOrder', title: '審核提款單', active: '/withdrawOrder' }
      ]
    },
    {
      path: 'withdrawalOrder',
      title: '全部出款单',
      children: [
        { path: 'checkWithdrawalOrder', title: '审核出款单', active: '/withdrawalOrder' }
      ]
    }
  ]
}
