import { BasicColumn } from '/@/components/Table/src/types/table';
import { DepositItem } from '/@/api/cashflow/model/depositModel';
import { Moment } from 'moment';
import moment from 'moment';

/**
 * Deposit table columns
 */
 export const depositColumns: BasicColumn[] = [
  {
    title: '存款单号\nTransactionID',
    dataIndex: 'id',
    fixed: 'left',
    width: 250,
    slots: {
      customRender: 'id',
    },
  },
  {
    title: '存款时间\nTransactionTime',
    dataIndex: 'createdAt',
    width: 200,
    sorter: (a: DepositItem, b: DepositItem) => {
      let createA: Moment;
      try {
        createA = moment(a.createdAt, 'YYYY-MM-DD HH:mm:ss');
      } catch (e) {
        createA = moment().add(-100, 'year');
      }
      let createB: Moment;
      try {
        createB = moment(b.createdAt, 'YYYY-MM-DD HH:mm:ss');
      } catch (e) {
        createB = moment().add(-100, 'year');
      }
      if (createA.isAfter(createB)) {
        return 1;
      } else if (createA.isBefore(createB)) {
        return -1;
      } else {
        return 0;
      }
    },
    format: (_text, record) => {
      return moment(record.createdAt, 'YYYY-MM-DD HH:mm:ss').format('YYYY/MM/DD HH:mm:ss');
    },
  },
  {
    title: '存单金额\nAmount',
    dataIndex: 'amount',
    width: 150,
    format: (_text, record) => {
      try {
        return Number(record.amount || '0').toLocaleString();
      } catch (e) {
        return record.amount;
      }
    },
    sorter: (a: DepositItem, b: DepositItem) => {
      const amountA = a.amount != undefined ? a.amount : Number.NEGATIVE_INFINITY;
      const amountB = b.amount != undefined ? b.amount : Number.NEGATIVE_INFINITY;
      return amountA - amountB;
    },
  },
  {
    title: '状态\nStatus',
    dataIndex: 'status',
    width: 100,
    slots: {
      customRender: 'status',
    },
  },
  {
    title: '代理帐号\nAgencyAC',
    dataIndex: 'memberAccount',
    width: 150,
    slots: {
      customRender: 'memberAccount',
    },
  },
  {
    title: '代理姓名\nAgencyName',
    dataIndex: 'memberName',
    width: 150,
  },
  {
    title: '存款人姓名\nDepositor',
    dataIndex: 'depositName',
    width: 150,
  },
  {
    title: '存款方式\nPayment',
    dataIndex: 'payment',
    width: 150,
    slots: {
      customRender: 'payment',
    },
  },
  {
    title: '存款线路\nGateway',
    dataIndex: 'gatway',
    width: 150,
  },
  {
    title: '三方单号\nThirdParty TID',
    dataIndex: 'thirdID',
    width: 150,
  },
  {
    title: '到帐方式\nBalanceType',
    dataIndex: 'type',
    width: 150,
    format: (_text, record) => {
      if (record.type === 1) {
        return '系统';
      } else if (record.type === 2) {
        return '手动';
      } else if (record.type === 4) {
        return '代理';
      } else {
        return record.type;
      }
    },
  },
  {
    title: '最后更新时间\nLastUpdate',
    dataIndex: 'updatedAt',
    width: 200,
    sorter: (a: DepositItem, b: DepositItem) => {
      let createA: Moment;
      try {
        createA = moment(a.updatedAt, 'YYYY-MM-DD HH:mm:ss');
      } catch (e) {
        createA = moment().add(-100, 'year');
      }
      let createB: Moment;
      try {
        createB = moment(b.updatedAt, 'YYYY-MM-DD HH:mm:ss');
      } catch (e) {
        createB = moment().add(-100, 'year');
      }
      if (createA.isAfter(createB)) {
        return 1;
      } else if (createA.isBefore(createB)) {
        return -1;
      } else {
        return 0;
      }
    },
    format: (_text, record) => {
      return moment(record.updatedAt, 'YYYY-MM-DD HH:mm:ss').format('YYYY/MM/DD HH:mm:ss');
    },
  },
  {
    title: '执行人\nPerson',
    dataIndex: 'editorName',
    width: 150,
  },
  {
    title: '入帐日期\nBalanceDate',
    dataIndex: 'balanceDate',
    width: 150,
    format: (_text, record) => {
      return moment(record.balanceDate, 'YYYY-MM-DD').format('YYYY/MM/DD');
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
