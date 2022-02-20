import type { BasicColumn } from '/@/components/Table/src/types/table';

/**
 * Single reached report
 */
export const singleReachedRepportColumns: BasicColumn[] = [
  {
    title: '日期',
    dataIndex: 'reportDate',
  },
  {
    dataIndex: 'reportHour',
    slots: {
      title: 'reportHourTitle',
    },
  },
  {
    dataIndex: 'amount',
    slots: {
      title: 'amountTitle',
    },
    format: (_text, record) => {
      try {
        return Number(record.amount || '0').toLocaleString();
      } catch (e) {
        return record.amount;
      }
    },
  },
  {
    title: '笔数',
    dataIndex: 'depositNum',
    format: (_text, record) => {
      try {
        return Number(record.depositNum || '0').toLocaleString();
      } catch (e) {
        return record.depositNum;
      }
    },
  },
  {
    title: '备注',
    dataIndex: 'note',
    edit: true,
  },
];
