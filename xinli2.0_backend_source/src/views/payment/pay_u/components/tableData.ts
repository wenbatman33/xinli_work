import { BasicColumn } from '/@/components/Table';

export const tableColumns: BasicColumn[] = [
  {
    title: '帐户名称',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '钱包类型',
    dataIndex: 'type',
    width: 100,
    customRender: ({text, record}) => {
      return text === 2 ? 'ERC' : 'TRC';
    }
  },
  {
    title: '用途',
    dataIndex: 'useType',
    width: 100,
    slots: {
      customRender: 'useType',
    },
  },
  {
    title: '今日进款',
    dataIndex: 'todayIn',
    width: 100,
    format: (val) => val.toLocaleString(),
    helpMessage: '今日进款所有项目：存款+结算+U转+中转',
  },
  {
    title: '今日出款',
    dataIndex: 'todayOut',
    width: 100,
    format: (val) => val.toLocaleString(),
    helpMessage: '今日出款所有项目：提款+充值+转U+中转',
  },
  {
    title: '帐户余额',
    dataIndex: 'balance',
    width: 100,
    format: (val) => val.toLocaleString(),
  },
  {
    title: '地址',
    dataIndex: 'address',
    width: 250,
    slots: {
      customRender: 'bankAccount',
    },
  },
];
