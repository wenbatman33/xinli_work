import { BasicColumn } from '/@/components/Table';

export const summarySchema= [
  {
    field: 'totalAmount',
    label: '优惠总额',
  },
  {
    field: 'maxAmount',
    label: '最大优惠',
  },
  {
    field: 'count',
    label: '优惠笔数',
  },
  {
    field: 'avgAmount',
    label: '平均优惠',
  },
];

export const tableColumn: BasicColumn[] = [
  {
    title: '编号',
    dataIndex: 'ID',
    width: 60,
  },
  {
    title: '优惠名称',
    dataIndex: 'promotionName',
    width: 180,
  },
  {
    title: '金额',
    dataIndex: 'bonus',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 60,
    customRender: ({record}) => {
      let mess = '申请';
      if (record.status === '2') {
        mess = '审核';
      } else if (record.status === '3') {
        mess = '派发';
      } else if (record.status === '4') {
        mess = '领取';
      } else if (record.status === '5') {
        mess = '取消';
      } else if (record.status === '6') {
        mess = '放弃';
      }
      return mess;
    }
  },
  {
    title: '领取日期',
    dataIndex: 'sendAt',
    width: 120,
  },
];