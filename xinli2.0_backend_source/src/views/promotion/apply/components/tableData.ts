import { BasicColumn } from '/@/components/Table/src/types/table';

import { GetPromotionmMemberListData } from '/@/api/promotion/model/memberModel';

export const tableColumns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'ID',
    width: 80,
    ellipsis: true,
  },
  {
    title: '会员帐号',
    dataIndex: 'memberAccount',
    width: 120,
    slots: {
      customRender: 'memberAccount',
    },
  },
  {
    title: '金额',
    dataIndex: 'bonus',
    width: 80,
    ellipsis: true,
    format: (val) => val?.toLocaleString(),
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 60,
    ellipsis: true,
    slots: {
      customRender: 'status',
    },
  },
  {
    title: '派发时间',
    dataIndex: 'sendAt',
    width: 150,
    ellipsis: true,
  },
  {
    title: '优惠名称',
    dataIndex: 'promotionName',
    width: 150,
    ellipsis: true,
    slots: {
      customRender: 'promotionName',
    },
  },
  {
    title: '优惠流水号',
    dataIndex: 'promotionID',
    width: 80,
  },
  {
    title: '优惠模板',
    dataIndex: 'promotionCondType',
    width: 60,
    slots: {
      customRender: 'promotionCondType',
    },
  },
  {
    title: '批次流水号',
    dataIndex: 'batchID',
    ellipsis: true,
    width: 80,
  },
  {
    title: '派发周期',
    dataIndex: 'batchCycle',
    width: 180,
    slots: {
      customRender: 'batchCycle',
    },
  },
  {
    title: '最后更新时间',
    dataIndex: 'updatedAt',
    width: 150,
    sorter: (a: GetPromotionmMemberListData, b: GetPromotionmMemberListData) => {
      const A = a.updatedAt ? a.updatedAt : '';
      const B = b.updatedAt ? b.updatedAt : '';
      return Number(new Date(A)) - Number(new Date(B));
    },
  },
  {
    title: '执行人名称',
    dataIndex: 'updatedUser',
    ellipsis: true,
    width: 100,
  },
];
