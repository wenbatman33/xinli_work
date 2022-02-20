import { h } from 'vue';
import { Icon } from '/@/components/Icon';
import { BasicColumn } from '/@/components/Table/src/types/table';
import type { GetServiceResponse } from '/@/api/payment/model/payChannelServiceModel';
import moment from 'moment';

export const tableColumns: BasicColumn[] = [
  {
    dataIndex: 'handle',
    width: 45,
    customRender: ({ record }) => {
      return h(Icon, {
        style: 'cursor: move; cursor: -webkit-grabbing;',
        class: record.isExpandRow ? '' : 'handle',
        icon: record.isExpandRow ? '' : 'ion:menu-outline',
        attr: record,
      });
    },
  },
  {
    title: 'id',
    dataIndex: 'id',
    width: 50,
  },
  {
    title: '线路名称',
    dataIndex: 'name',
    width: 130,
    ellipsis: true,
    slots: {
      customRender: 'name',
    },
  },
  {
    title: '金流组别',
    dataIndex: 'groups',
    width: 130,
    ellipsis: true,
    slots: {
      customRender: 'groups',
    },
  },
  {
    title: '线路成功率',
    dataIndex: 'rate',
    width: 130,
    ellipsis: true,
    sorter: (a: GetServiceResponse, b: GetServiceResponse) => {
      const A = a.rate ? a.rate : 0;
      const B = b.rate ? b.rate : 0;
      return A - B;
    },
    format: (val: string | number) => String(`${Math.round(Number(val) * 100)} %`),
  },
  {
    title: '线路金额',
    dataIndex: 'amount',
    width: 130,
    ellipsis: true,
    format: (val) => val.toLocaleString(),
  },
  {
    title: '剩余可用额度(参考)',
    dataIndex: 'remain',
    width: 130,
    ellipsis: true,
    sorter: (a: GetServiceResponse, b: GetServiceResponse) => {
      const A = a.remain ? a.remain : 0;
      const B = b.remain ? b.remain : 0;
      return A - B;
    },
    format: (val) => val.toLocaleString(),
  },
  {
    title: '商户日切时间',
    dataIndex: 'settle',
    width: 130,
    ellipsis: true,
    format: (val: string) => {
      const arr = val.split('~');
      const timeA = moment(arr[0]).format('HH:mm') as string;
      const timeB = moment(arr[1]).format('HH:mm') as string;
      return `${timeA}~${timeB}`;
    },
  },
  {
    title: '单笔限额',
    dataIndex: 'lowerLimit',
    width: 130,
    ellipsis: true,
    format: (val, record) => {
      return `${val.toLocaleString()} ~ ${record.upperLimit.toLocaleString()}`;
    },
  },
  {
    title: '手续费',
    dataIndex: 'fee',
    width: 130,
    ellipsis: true,
    format: (val, record) => {
      return `${val}‰ + ${record.perFee}`;
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 130,
    ellipsis: true,
    slots: {
      customRender: 'status',
    },
  },
  {
    title: '备注',
    dataIndex: 'note',
    width: 130,
    ellipsis: true,
  },
];
