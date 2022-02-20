export default {
  title: '金流资料管理',
  children: [
    {
      path: 'payChannel',
      title: '通道管理',
      children: [
        { path: 'payChannelEdit', title: '编辑通道', active: '/payChannel' },
        { path: 'payChannelLog', title: '通道明細', active: '/payChannel' },
      ]
    },
    {
      path: 'paymentAccount',
      title: '科目管理'
    },
    {
      path: 'paymentGroup',
      title: '三方金流群組管理',
      children: [
        { path: 'paymentGroupDetail', title: '三方金流群組資訊', active: '/paymentGroup' }
      ]
    },
    {
      path: 'bankCardGroup',
      title: '银行卡金流群组管理',
      children: [
        { path: 'bankCardGroupDetail', title: '银行卡金流群組資訊', active: '/bankCardGroup' }
      ]
    },
    {
      path: 'bankCard',
      title: '银行卡管理',
      children: [
        { path: 'bankCardDetail', title: '新增银行卡', active: '/bankCard' },
        { path: 'bankCardLog', title: '銀行卡明細', active: '/bankCard' },
      ]
    },
    {
      path: 'merchant',
      title: '商户管理',
      children: [
        { path: 'merchantEdit', title: '编辑商户', active: '/merchant' },
        { path: 'merchantLog', title: '商户明細', active: '/merchant' }
      ]
    },
    {
      path: 'bankCardSupplier',
      title: '卡商管理',
      children: [
        { path: 'bankCardSupplierDetail', title: '卡商明細', active: '/bankCardSupplierDetail' }
      ]
    },
  ]
}
