import { BasicColumn } from '/@/components/Table/src/types/table';
import { PayChannelItem } from '/@/api/payment/model/payChannelModel';
import moment from 'moment';

/**
 * Pay channel table columns
 */
export const payChannelColumns: BasicColumn[] = [
  {
    title: '商户号',
    dataIndex: 'sn',
    fixed: 'left',
    width: 200,
    slots: {
      customRender: 'sn',
    },
  },
  {
    title: '商户',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '今日累计收款',
    dataIndex: 'todayDepositTotal',
    width: 150,
    format: (_text, record) => {
      try {
        return Number(record.todayDepositTotal || '0').toLocaleString();
      } catch (e) {
        return record.todayDepositTotal;
      }
    },
  },
  {
    title: '今日累计出款',
    dataIndex: 'todayWithdrawalTotal',
    width: 150,
    format: (_text, record) => {
      try {
        return Number(record.todayWithdrawalTotal || '0').toLocaleString();
      } catch (e) {
        return record.todayWithdrawalTotal;
      }
    },
  },
  {
    title: '出款限额',
    dataIndex: 'apLimit',
    width: 150,
    format: (_text, record) => {
      let apLowerLimit = record.apLowerLimit;
      try {
        apLowerLimit = Number(record.apLowerLimit || '0').toLocaleString();
      } catch (e) {}
      let apUpperLimit = record.apUpperLimit;
      try {
        apUpperLimit = Number(record.apUpperLimit || '0').toLocaleString();
      } catch (e) {}
      return `${apLowerLimit}~${apUpperLimit}`;
    },
  },
  {
    title: '商户余额',
    dataIndex: 'remainAmount',
    width: 150,
    format: (_text, record) => {
      try {
        return Number(record.remainAmount || '0').toLocaleString();
      } catch (e) {
        return record.remainAmount;
      }
    },
    sorter: (a: PayChannelItem, b: PayChannelItem) => {
      const remainAmountA = a.remainAmount != undefined ? a.remainAmount : Number.NEGATIVE_INFINITY;
      const remainAmountB = b.remainAmount != undefined ? b.remainAmount : Number.NEGATIVE_INFINITY;
      return remainAmountA - remainAmountB;
    },
  },
  {
    title: '可放余额',
    dataIndex: 'depositRatio',
    width: 400,
    defaultSortOrder: 'ascend',
    slots: {
      customRender: 'depositRatio',
    },
    sorter: (a: PayChannelItem, b: PayChannelItem) => {
      const depositRatioA = a.depositRatio != undefined ? a.depositRatio : Number.NEGATIVE_INFINITY;
      const depositRatioB = b.depositRatio != undefined ? b.depositRatio : Number.NEGATIVE_INFINITY;
      return depositRatioA - depositRatioB;
    },
  },
  {
    title: '线路数',
    dataIndex: 'payChannelServiceCount',
    width: 150,
    slots: {
      customRender: 'payChannelServiceCount',
    },
  },
  {
    title: '日切时间',
    dataIndex: 'settle',
    width: 150,
  },
  {
    title: '代付',
    dataIndex: 'apStatus',
    width: 150,
    slots: {
      customRender: 'apStatus',
    },
  },
  {
    title: '商户状态',
    dataIndex: 'status',
    width: 150,
    slots: {
      customRender: 'status',
    },
  },
  {
    title: '备注',
    dataIndex: 'note',
    width: 150,
  },
];

/**
 * Services modal table columns
 */
export const servicesColumns: BasicColumn[] = [
  {
    title: '线路名称',
    dataIndex: 'name',
    fixed: 'left',
    width: 200,
  },
  {
    title: '线路成功率',
    dataIndex: 'rate',
    width: 150,
    format: (text) => {
      return `${text}%`;
    },
  },
  {
    title: '组别',
    dataIndex: 'groups',
    width: 150,
    slots: {
      customRender: 'groups',
    },
  },
  {
    title: '今日收款总额',
    dataIndex: 'amount',
    width: 150,
    format: (_text, record) => {
      try {
        return Number(record.amount || '0').toLocaleString();
      } catch (e) {
        return record.amount;
      }
    },
  },
  {
    title: '剩余可使用额度（参考）',
    dataIndex: 'remain',
    width: 200,
    format: (_text, record) => {
      try {
        return Number(record.remain || '0').toLocaleString();
      } catch (e) {
        return record.remain;
      }
    },
  },
  {
    title: '商户日切时间',
    dataIndex: 'settle',
    width: 200,
    format: (text) => {
      const arr = text?.split('~') || [];
      if (arr.length < 2) {
        return text;
      }
      let timeA;
      try {
        timeA = moment(arr[0]).format('HH:mm');
      } catch (e) {
        timeA = arr[0];
      }
      let timeB;
      try {
        timeB = moment(arr[1]).format('HH:mm');
      } catch (e) {
        timeB = arr[1];
      }
      return `${timeA}~${timeB}`;
    },
  },
  {
    title: '单笔限额',
    dataIndex: 'limit',
    width: 150,
    format: (_text, record) => {
      try {
        return Number(record.limit || '0').toLocaleString();
      } catch (e) {
        return record.limit;
      }
    },
  },
  {
    title: '手续费',
    dataIndex: 'fee',
    width: 150,
    format: (_text, record) => {
      try {
        return Number(record.fee || '0').toLocaleString();
      } catch (e) {
        return record.fee;
      }
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 150,
    slots: {
      customRender: 'status',
    },
  },
  {
    title: '备注',
    dataIndex: 'note',
    width: 150,
  },
];
