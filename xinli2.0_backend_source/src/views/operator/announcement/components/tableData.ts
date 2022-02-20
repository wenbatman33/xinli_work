import { BasicColumn } from '/@/components/Table';
import moment from 'moment';

export const tableColumns: BasicColumn[] = [
  {
    title: '排序',
    dataIndex: 'sort',
    ellipsis: true,
    edit: true,
    width: 100,
    sorter: (a, b) => {
      const A = a.sort;
      const B = b.sort;
      return A - B;
    },
  },
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
    title: '標題',
    dataIndex: 'title',
    ellipsis: true,
    width: 100,
  },
  {
    title: '是否隐藏',
    dataIndex: 'hidden',
    ellipsis: true,
    width: 100,
    format: (val) => (String(val) === 'true' ? '隐藏' : '显示'),
  },
  {
    title: '置顶',
    dataIndex: 'top',
    ellipsis: true,
    width: 100,
    format: (val) => (String(val) === 'true' ? 'Y' : ''),
  },
  {
    title: '內容',
    dataIndex: 'context',
    ellipsis: true,
    width: 150,
  },
  {
    title: '上架时间',
    dataIndex: 'start',
    ellipsis: true,
    width: 130,
    sorter: (a, b) => {
      const A = a.start ? a.start : '';
      const B = b.start ? b.start : '';
      return Number(new Date(A)) - Number(new Date(B));
    },
    format: (text) => {
      return moment(text).format('YYYY-MM-DD HH:mm');
    },
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
  {
    title: '执行人名称',
    dataIndex: 'editorName',
    ellipsis: true,
    width: 100,
  },
];
