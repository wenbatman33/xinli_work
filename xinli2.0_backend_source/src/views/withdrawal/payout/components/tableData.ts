import { BasicColumn } from '/@/components/Table';
import moment from 'moment';

/**
 * Stake list table columns
 */
export const payoutColumns: BasicColumn[] = [
  {
    dataIndex: 'delete',
    width: '60px',
    slots: {
      customRender: 'delete',
    },
  },
  {
    title: '出款流水号',
    dataIndex: 'id',
  },
  {
    title: '出款金额',
    dataIndex: 'amount',
    slots: {
      customRender: 'amount',
    },
  },
  {
    title: '出款方式',
    dataIndex: 'payType',
    slots: {
      customRender: 'payType',
    },
  },
  {
    title: '商户号/卡号',
    dataIndex: 'payID',
    slots: {
      customRender: 'payID',
    },
  },
  {
    title: '出款手续费',
    dataIndex: 'fee',
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
    slots: {
      customRender: 'status',
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    format: (_text, record) => {
      return moment(record?.updatedAt).format('YYYY/MM/DD HH:mm:ss');
    },
  },
  {
    title: '三方代付单号',
    dataIndex: 'thirdSn',
  },
  {
    title: '执行人',
    dataIndex: 'editorName',
  },
];
