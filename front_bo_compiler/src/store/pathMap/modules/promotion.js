export default {
  title: '优惠管理',
  children: [
    {
      path: 'promotion',
      title: '优惠设定与活动管理',
      children: [
        { path: 'promotionEdit', title: '新增优惠', active: '/promotion' }
      ]
    },
    {
      path: 'promotionApply',
      title: '查看优惠申请明细',
      children: [
        { path: 'promotionApplyDetail', title: '优惠审核名单', active: '/promotion' }
      ]
    },
    {
      path: 'event',
      title: '活动页设定管理',
    },
  ]
}
