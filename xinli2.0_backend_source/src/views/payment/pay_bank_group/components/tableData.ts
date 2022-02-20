import { BasicColumn } from '/@/components/Table';
import type { GetPayGroupsResponse } from '/@/api/payment/model/payGroupModel';

export const tableColumns: BasicColumn[] = [
  {
    title: '分组名称',
    dataIndex: 'name',
    width: 150,
    ellipsis: true,
  },
  {
    title: 'GrouopName',
    dataIndex: 'nameEn',
    width: 150,
    ellipsis: true,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 130,
    ellipsis: true,
    slots: {
      customRender: 'remark',
    },
  },
  {
    title: '当前线路',
    dataIndex: 'payChannelServiceName',
    width: 130,
    ellipsis: true,
  },
  {
    title: '代收线路数',
    dataIndex: 'payChannelServiceCnt',
    helpMessage: ['仅包含网关线路'],
    width: 130,
    ellipsis: true,
    slots: {
      customRender: 'payChannelServiceCnt',
    },
  },
  {
    title: '会员人数',
    dataIndex: 'memberCnt',
    width: 130,
    ellipsis: true,
    sorter: (a: GetPayGroupsResponse, b: GetPayGroupsResponse) => {
      const A = a.memberCnt ? a.memberCnt : 0;
      const B = b.memberCnt ? b.memberCnt : 0;
      return A - B;
    },
  },
  {
    title: '存款单笔下限',
    dataIndex: 'depositLower',
    // helpMessage: ['剩余可使用额度＝预期每日上限-今日代付金额'],
    width: 130,
    ellipsis: true,
    format: (val) => val.toLocaleString(),
  },
  {
    title: '存款单笔上限',
    dataIndex: 'depositUpper',
    // helpMessage: ['剩余可使用额度＝预期每日上限-今日代付金额'],
    width: 130,
    ellipsis: true,
    format: (val) => val.toLocaleString(),
  },
  {
    title: '最后更新时间',
    dataIndex: 'updatedAt',
    width: 130,
    ellipsis: true,
    slots: {
      customRender: 'updatedAt',
    },
    sorter: (a: GetPayGroupsResponse, b: GetPayGroupsResponse) => {
      const A = a.updatedAt ? a.updatedAt : '';
      const B = b.updatedAt ? b.updatedAt : '';
      return Number(new Date(A)) - Number(new Date(B));
    },
  },
  {
    title: '执行人',
    dataIndex: 'updatedUserName',
    width: 130,
    ellipsis: true,
  },
];
