import { BasicColumn } from '/@/components/Table';

export const summarySchema = [
  {
    field: 'amount',
    label: '存款总额',
  },
  {
    field: 'max',
    label: '最大金额',
  },
  {
    field: 'count',
    label: '存款笔数',
  },
  {
    field: 'avg',
    label: '平均金额',
  },
];

export const tableColumn: BasicColumn[] = [
  {
    title: '流水号',
    dataIndex: 'id',
    width: 180,
  },
  {
    title: '更新者',
    dataIndex: 'editorName',
    width: 80,
  },
  {
    title: '备注',
    dataIndex: 'note',
    width: 120,
    align: 'left'
  },
  {
    title: '方式',
    dataIndex: 'type',
    width: 60,
    slots: {
      customRender: 'type',
    },
  },
  {
    title: '金额',
    dataIndex: 'amount',
    width: 120,
  },
  {
    title: '时间',
    dataIndex: 'updatedAt',
    width: 120,
  },
];