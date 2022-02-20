import { BasicColumn } from '/@/components/Table';
import moment from 'moment';

export const tableColumns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    ellipsis: true,
    width: 100,
    sorter: (a, b) => {
      const A = a.id;
      const B = b.id;
      return A - B;
    },
  },
  {
    title: '分类名称',
    dataIndex: 'name',
    ellipsis: true,
    width: 100,
  },
  {
    title: '说明',
    dataIndex: 'description',
    ellipsis: true,
    width: 150,
  },
  {
    title: '显示',
    dataIndex: 'hidden',
    ellipsis: true,
    width: 100,
    format: (val) => String(val ? '显示' : '隐藏'),
  },
  {
    title: '执行人名称',
    dataIndex: 'editorName',
    ellipsis: true,
    width: 100,
  },
  {
    title: '最后更新时间',
    dataIndex: 'updatedAt',
    ellipsis: true,
    width: 130,
    sorter: (a, b) => {
      const A = a.updatedAt ? a.updatedAt : '';
      const B = b.updatedAt ? b.updatedAt : '';
      return Number(new Date(A)) - Number(new Date(B));
    },
    format: (text) => {
      return moment(text).format('YYYY-MM-DD HH:mm');
    },
  },
];
