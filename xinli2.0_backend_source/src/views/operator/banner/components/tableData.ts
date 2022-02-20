import { BasicColumn } from '/@/components/Table';
import moment from 'moment';

export const tableColumns: BasicColumn[] = [
  {
    title: '排序',
    dataIndex: 'sort',
    width: 120,
    ellipsis: true,
    edit: true,
    sorter: (a, b) => {
      return Number(a) - Number(b);
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
    title: '分类名称',
    dataIndex: 'bannerCategoryID',
    ellipsis: true,
    width: 100,
    slots: {
      customRender: 'bannerCategoryID',
    },
  },
  {
    title: '名称',
    dataIndex: 'title',
    ellipsis: true,
    width: 150,
  },
  {
    title: '是否隐藏',
    dataIndex: 'hidden',
    ellipsis: true,
    width: 100,
    format: (val) => (String(val) === 'true' ? '隐藏' : '显示'),
  },
  {
    title: '状态',
    dataIndex: 'statusStr',
    ellipsis: true,
    width: 100,
    slots: {
      customRender: 'statusStr',
    },
  },
  {
    title: '开启方式',
    dataIndex: 'target',
    ellipsis: true,
    width: 100,
  },
  {
    title: 'web 图',
    dataIndex: 'imageWeb',
    ellipsis: true,
    width: 120,
    slots: {
      customRender: 'imageWeb',
    },
  },
  {
    title: 'h5 图',
    dataIndex: 'imageH5',
    ellipsis: true,
    width: 120,
    slots: {
      customRender: 'imageH5',
    },
    // format: (val) => apiUrl + '/file/' + val,
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
    title: '下架时间',
    dataIndex: 'end',
    ellipsis: true,
    width: 130,
    sorter: (a, b) => {
      const A = a.end ? a.end : '';
      const B = b.end ? b.end : '';
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
