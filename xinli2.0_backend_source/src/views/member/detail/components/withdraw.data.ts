import { BasicColumn } from '/@/components/Table';

export const summarySchema= [
  {
    field: 'total',
    label: '提款总额',
  },
  {
    field: 'max',
    label: '最大金额',
  },
  {
    field: 'count',
    label: '提款笔数',
  },
  {
    field: 'avg',
    label: '平均金额',
  },
];

export const tableColumn: BasicColumn[] = [
  {
    title: '銀行',
    dataIndex: 'bankCode',
    width: 120,
  },
  {
    title: '姓名',
    dataIndex: 'member.value.name',
    width: 120,
  },
  {
    title: '帳號',
    dataIndex: 'memberBankNo',
    width: 120,
  },
  {
    title: '金额',
    dataIndex: 'amount',
    width: 120,
  },
  {
    title: '时间',
    dataIndex: 'lastUpdate',
    width: 120,
  },
];