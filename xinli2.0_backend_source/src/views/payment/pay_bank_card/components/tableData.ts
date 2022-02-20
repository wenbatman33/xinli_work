import { BasicColumn } from '/@/components/Table';
import moment from 'moment';

export const tableColumns: BasicColumn[] = [
  {
    title: '卡号',
    dataIndex: 'cardNo',
    width: 150,
    fixed: 'left',
    slots: {
      customRender: 'cardNo',
    },
  },
  {
    title: '银行代码',
    dataIndex: 'bankCode',
    ifShow: false,
  },
  {
    title: '银行名称',
    dataIndex: 'bankName',
    width: 100,
    slots: {
      customRender: 'bankName',
    },
  },
  {
    title: '户名',
    dataIndex: 'accountName',
    width: 100,
  },
  {
    title: '用途',
    dataIndex: 'type',
    width: 100,
    slots: {
      customRender: 'type',
    },
  },
  {
    title: '今日进款',
    dataIndex: 'dayIn',
    width: 100,
    format: (val) => val.toLocaleString(),
    helpMessage: '今日进款所有项目：存款+结算+U转+中转',
  },
  {
    title: '今日出款',
    dataIndex: 'dayOut',
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
    title: '单笔限额',
    width: 100,
    format: (_text, record) => {
      return record.limitLower.toLocaleString() + '~' + record.limitUpper.toLocaleString();
    },
  },
  // same cell-----------------
  {
    title: '网银帐密',
    dataIndex: 'bankAccount',
    width: 100,
    slots: {
      customRender: 'bankAccount',
    },
  },
  {
    title: '网银登入密码',
    dataIndex: 'loginPw',
    ifShow: false,
  },
  {
    title: '网银U盾密码',
    dataIndex: 'uPw',
    ifShow: false,
  },

  // same cell-----------------
  {
    title: '验卡日期',
    dataIndex: 'verifyDate',
    width: 100,
    format: (_text, record) =>
      record.verifyDate ? moment(record.verifyDate).format('YYYY/MM/DD HH:mm:ss') : '--',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    slots: {
      customRender: 'status',
    },
    // format: (val: string | number) => {
    //   return String(val) === '1' ? '启用' : '停用';
    // },
  },
];
