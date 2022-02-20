import { BasicColumn } from '/@/components/Table/src/types/table';

import { GetPromotionmMemberData } from '/@/api/promotion/model/memberModel';

export const tableColumns: BasicColumn[] = [
  {
    title: '批次流水号',
    dataIndex: 'batchID',
    width: 80,
    ellipsis: true,
  },
  {
    title: '优惠流水号',
    dataIndex: 'promotionID',
    width: 80,
    ellipsis: true,
  },
  {
    title: '优惠名称',
    dataIndex: 'promotionName',
    width: 80,
    ellipsis: true,
    slots: {
      customRender: 'promotionName',
    },
  },
  {
    title: '派发周期',
    dataIndex: 'batchCycle',
    width: 100,
    ellipsis: true,
  },
  {
    title: '审核方式',
    dataIndex: 'approveWay',
    width: 120,
    ellipsis: true,
    format: (val) => (Number(val) === 1 ? '自助' : '自动'),
  },
  {
    title: '总金额',
    dataIndex: 'totalAmount',
    width: 80,
    ellipsis: true,
    format: (val) => val?.toLocaleString(),
  },
  {
    title: '数量',
    dataIndex: 'memberNumber',
    width: 120,
    slots: {
      customRender: 'memberNumber',
    },
  },
  {
    title: '派发时间',
    dataIndex: 'sendAt',
    width: 120,
    sorter: (a: GetPromotionmMemberData, b: GetPromotionmMemberData) => {
      const A = a.sendAt ? a.sendAt : '';
      const B = b.sendAt ? b.sendAt : '';
      return Number(new Date(A)) - Number(new Date(B));
    },
  },
  {
    title: '执行人',
    dataIndex: 'updatedUser',
    ellipsis: true,
    width: 100,
  },
];
