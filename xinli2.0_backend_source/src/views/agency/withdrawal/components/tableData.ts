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
    title: '代理帐号\nAgencyAC',
    dataIndex: 'member',
    slots: {
      customRender: 'member',
    },
  },
  {
    title: '代理姓名\nAgencyBank',
    dataIndex: 'bankAccount',
    width: 95,
  },
  {
    title: '银行\nBankCode',
    dataIndex: 'bankCode',
    width: 95,
  },
  {
    title: '银行卡号/虚拟币提领地址\nＭemberBanKNo',
    dataIndex: 'memberBankNo',
  },
  {
    title: '币别\nCurrency',
    dataIndex: 'currency',
    width: 150,
    format: (_text, record) => {
      if (record.currency === 1) {
        return '人民幣';
      } else if (record.currency === 2) {
        return 'USDT-ERC';
      } else if (record.currency === 3) {
        return 'USDT-TRC';
      } else {
        return record.currency;
      }
    },
  },
  {
    title: '提领时汇率\nCurrency',
    dataIndex: 'exchangeRate',
    width: 150,
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
    title: '提款手续费\nFee',
    dataIndex: 'fee',
    width: 150,
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
  {
    title: '财务查核人\nFinancialCheck',
    dataIndex: 'financialCheck',
    width: 110,
    slots: {
      customRender: 'financialCheck',
    },
  },
  {
    title: '风控查核人\nRiskCheck',
    dataIndex: 'riskCheck',
    width: 110,
    slots: {
      customRender: 'riskCheck',
    },
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
