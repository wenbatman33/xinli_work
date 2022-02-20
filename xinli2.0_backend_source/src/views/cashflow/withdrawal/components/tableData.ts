import { BasicColumn } from '/@/components/Table/src/types/table';
import moment, { Moment } from 'moment';

/**
 * Withdrawal table columns
 */
export const withdrawalColumns: BasicColumn[] = [
  {
    title: '提款单号\nTransactionID',
    dataIndex: 'transactionID',
    fixed: 'left',
    width: 200,
  },
  {
    title: '提款时间\nTransactionTime',
    dataIndex: 'transactionTime',
    defaultSortOrder: 'descend',
    format: (_text, record) => {
      return moment(record?.transactionTime).format('YYYY/MM/DD HH:mm:ss');
    },
    sorter: (a, b) => {
      let transactionA: Moment;
      try {
        transactionA = moment(a.transactionTime, 'YYYY-MM-DD HH:mm:ss');
      } catch (e) {
        transactionA = moment().add(-100, 'year');
      }
      let transactionB: Moment;
      try {
        transactionB = moment(b.transactionTime, 'YYYY-MM-DD HH:mm:ss');
      } catch (e) {
        transactionB = moment().add(-100, 'year');
      }
      if (transactionA.isAfter(transactionB)) {
        return 1;
      } else if (transactionA.isBefore(transactionB)) {
        return -1;
      } else {
        return 0;
      }
    },
  },
  {
    title: '提款金额\nAmount',
    dataIndex: 'amount',
    format: (_text, record) => {
      try {
        return Number(record.amount || '0').toLocaleString();
      } catch (e) {
        return record.amount;
      }
    },
  },
  {
    title: '状态\nStatus',
    dataIndex: 'status',
    width: 80,
    slots: {
      customRender: 'status',
    },
  },
  {
    title: '银行卡群组\nBankGroup',
    dataIndex: 'bankGroup.value',
    width: 90,
  },
  {
    title: '三方群组\nThirdGroup',
    dataIndex: 'thirdGroup.value',
    width: 90,
  },
  {
    title: '会员帐号\nMemberAC',
    dataIndex: 'member',
    slots: {
      customRender: 'member',
    },
  },
  {
    title: '户名\nMemberBank',
    dataIndex: 'bankAccount',
    width: 95,
  },
  {
    title: '银行\nBankCode',
    dataIndex: 'bankCode',
    width: 95,
  },
  {
    title: '会员银行卡号\nＭemberBanKNo',
    dataIndex: 'memberBankNo',
  },
  {
    title: '财务查核\nFinancialCheck',
    dataIndex: 'financialCheck',
    width: 110,
    slots: {
      customRender: 'financialCheck',
    },
  },
  {
    title: '风控查核\nRiskCheck',
    dataIndex: 'riskCheck',
    width: 110,
    slots: {
      customRender: 'riskCheck',
    },
  },
  {
    title: '最后更新时间\nLastUpdate',
    dataIndex: 'lastUpdate',
    format: (_text, record) => {
      return moment(record?.lastUpdate).format('YYYY/MM/DD HH:mm:ss');
    },
    sorter: (a, b) => {
      let transactionA: Moment;
      try {
        transactionA = moment(a.lastUpdate, 'YYYY-MM-DD HH:mm:ss');
      } catch (e) {
        transactionA = moment().add(-100, 'year');
      }
      let transactionB: Moment;
      try {
        transactionB = moment(b.lastUpdate, 'YYYY-MM-DD HH:mm:ss');
      } catch (e) {
        transactionB = moment().add(-100, 'year');
      }
      if (transactionA.isAfter(transactionB)) {
        return 1;
      } else if (transactionA.isBefore(transactionB)) {
        return -1;
      } else {
        return 0;
      }
    },
  },
  {
    title: '执行人\nUpdate By',
    dataIndex: 'updatedBy',
    width: 95,
  },
];

/**
 * Note table columns
 */
export const noteColumns: BasicColumn[] = [
  {
    title: '时间',
    dataIndex: 'createdAt',
    width: 150,
    ellipsis: false,
    format: (_text, record) => {
      return moment(record.createdAt, 'YYYY-MM-DD HH:mm:ss').format('YYYY/MM/DD HH:mm:ss');
    },
  },
  {
    title: '操作人',
    dataIndex: 'author',
    width: 150,
    ellipsis: false,
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 150,
    ellipsis: false,
  },
  {
    title: '备注说明',
    dataIndex: 'note',
    width: 150,
    ellipsis: false,
  },
];
