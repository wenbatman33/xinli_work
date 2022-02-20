import { BasicColumn } from '/@/components/Table';
import moment from 'moment';

export const tableColumns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'letterSettingId',
    width: 80,
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 100,
    customRender: ({record}) => {
      return record.type === 1 ? '系统' : '手动';
    },
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 200,
    ellipsis: false,
    slots: { customRender: 'title' }
  },
  {
    title: '内容',
    dataIndex: 'content',
    width: 350,
    ellipsis: false,
  },
  {
    title: '对象',
    dataIndex: 'memberCount',
    width: 80,
    slots: { customRender: 'memberCount' }
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
  },
  {
    title: '发送时间',
    dataIndex: 'sendAt',
    width: 130,
    sorter: (a, b) => {
      const A = a.sendAt ? a.sendAt : '';
      const B = b.sendAt ? b.sendAt : '';
      return Number(new Date(A)) - Number(new Date(B));
    },
    format: (text) => {
      return moment(text).format('YYYY-MM-DD HH:mm');
    },
  },
  {
    title: '最后更新时间',
    dataIndex: 'updatedAt',
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
    title: '执行人',
    dataIndex: 'updatedUser',
    width: 120,
  },
];
