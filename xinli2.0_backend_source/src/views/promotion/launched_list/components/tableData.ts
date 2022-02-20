import { BasicColumn } from '/@/components/Table/src/types/table';

export const tableColumns: BasicColumn[] = [
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 50,
    ellipsis: true,
  },
  {
    title: '流水号',
    dataIndex: 'ID',
    width: 50,
    ellipsis: true,
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 80,
    ellipsis: true,
    slots: {
      customRender: 'type',
    },
  },
  {
    title: '上架名称',
    dataIndex: 'name',
    width: 150,
    ellipsis: true,
  },
  // {
  //   title: '装置',
  //   dataIndex: 'device',
  //   width: 120,
  //   ellipsis: true,
  //   slots: {
  //     customRender: 'device',
  //   },
  // },
  {
    title: '置顶',
    dataIndex: 'top',
    width: 50,
    ellipsis: true,
    customRender: ({record}) => {
      return record.top === 1 ? 'Y':'';
    }
  },
  {
    title: '显示',
    dataIndex: 'display',
    width: 50,
    ellipsis: true,
    customRender: ({record}) => {
      return record.display === 1 ? '显示':'隐藏';
    }
  },
  {
    title: '关联优惠',
    dataIndex: 'promotions',
    width: 150,
    ellipsis: true,
    slots: {
      customRender: 'promotions',
    },
  },
  {
    title: '图片WEB',
    dataIndex: 'imageWeb',
    width: 120,
    slots: {
      customRender: 'imageWeb',
    },
  },
  {
    title: '图片H5',
    dataIndex: 'imageH5',
    width: 120,
    slots: {
      customRender: 'imageH5',
    },
  },
  {
    title: '上架时间',
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
    title: '下架时间',
    dataIndex: 'endTime',
    ellipsis: true,
    width: 130,
    sorter: (a, b) => {
      const A = a.start ? a.start : '';
      const B = b.start ? b.start : '';
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
