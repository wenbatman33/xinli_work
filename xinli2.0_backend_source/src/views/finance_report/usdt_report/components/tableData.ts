import { BasicColumn } from '/@/components/Table/src/types/table';
import moment from 'moment';

export const tableColumns: BasicColumn[] = [
  // {
  //   title: 'ID',
  //   dataIndex: 'ID',
  //   ellipsis: true,
  //   width: 40,
  //   ifShow: false,
  // },
  {
    title: '交易时间',
    dataIndex: 'createdAt',
    width: 150,
    ellipsis: true,
    sorter: (a, b) => {
      const A = a.createdAt ? a.createdAt : '';
      const B = b.createdAt ? b.createdAt : '';
      return Number(new Date(A)) - Number(new Date(B));
    },
    format: (val) => moment(val).format('YYYY/MM/DD HH:mm:ss'),
  },
  {
    title: '科目',
    dataIndex: 'subjectID',
    width: 80,
    ellipsis: true,
    slots: {
      customRender: 'subjectID',
    },
  },
  {
    title: '收',
    dataIndex: 'in',
    width: 80,
    ellipsis: true,
    format: (val, record) => {
      return record.type === 1 ? record.amount.toLocaleString() : val;
    },
  },
  {
    title: '支',
    dataIndex: 'out',
    width: 80,
    ellipsis: true,
    format: (val, record) => {
      return record.type === 2 ? record.amount.toLocaleString() : val;
    },
  },
  {
    title: '手续费',
    dataIndex: 'fee',
    width: 80,
    ellipsis: true,
    format: (val) => val.toLocaleString(),
  },
  {
    title: '结余',
    dataIndex: 'balance',
    width: 80,
    ellipsis: true,
    format: (val) => val.toLocaleString(),
  },
  {
    title: '相关单号',
    dataIndex: 'relationID',
    width: 80,
    ellipsis: true,
  },
  {
    title: '三方单号',
    dataIndex: 'thirdID',
    width: 80,
    ellipsis: true,
  },
  {
    title: '交易对象',
    dataIndex: 'targetName',
    width: 150,
    ellipsis: true,
  },
  {
    title: '执行人',
    dataIndex: 'editorName',
    width: 80,
    ellipsis: true,
  },
  {
    title: '备注',
    dataIndex: 'note',
    width: 100,
    ellipsis: true,
    slots: {
      customRender: 'note',
    },
  },
];
