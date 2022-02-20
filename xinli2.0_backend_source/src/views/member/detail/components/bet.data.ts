import { BasicColumn } from '/@/components/Table';

export const tableColumn: BasicColumn[] = [
  {
    title: '游戏类型',
    dataIndex: 'gameType',
    width: 150,
  },
  {
    title: '游戏代理商',
    dataIndex: 'gameAgency',
    width: 150,
  },
  {
    title: '限制流水',
    dataIndex: 'limitAmount',
    width: 80,
  },
  {
    title: '有效流水',
    dataIndex: 'betAmount',
    width: 80,
  },
  {
    title: '输赢（公司）',
    dataIndex: 'winAmount',
    width: 80,
  },
];