import { BasicColumn } from '/@/components/Table/src/types/table';

export const tableColumns: BasicColumn[] = [
  {
    title: '编号',
    dataIndex: 'ID',
    width: 80,
    ellipsis: true,
    sorter: (a, b) => {
      return Number(a) - Number(b);
    },
  },
  {
    title: '模板',
    dataIndex: 'promotionCondTypes',
    width: 80,
    ellipsis: true,
    slots: {
      customRender: 'promotionCondTypes',
    },
  },
  {
    title: '优惠名称',
    dataIndex: 'name',
    width: 80,
    ellipsis: true,
    slots: {
      customRender: 'name',
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    ellipsis: true,
    slots: {
      customRender: 'status',
    },
    // format: (val) => {
    //   return Number(val) === 1 ? '启用' : '停用';
    // },
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    ellipsis: true,
    width: 130,
    sorter: (a, b) => {
      const A = a.start ? a.start : '';
      const B = b.start ? b.start : '';
      return Number(new Date(A)) - Number(new Date(B));
    },
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    ellipsis: true,
    width: 130,
    sorter: (a, b) => {
      const A = a.updatedAt ? a.updatedAt : '';
      const B = b.updatedAt ? b.updatedAt : '';
      return Number(new Date(A)) - Number(new Date(B));
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
  },
  {
    title: '执行人名称',
    dataIndex: 'updatedUser',
    ellipsis: true,
    width: 100,
  },
];
