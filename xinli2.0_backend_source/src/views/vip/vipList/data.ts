import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '会员帐号',
    dataIndex: 'account',
    width: 150,
  },
  {
    title: 'VIP等级',
    dataIndex: 'vipLevel',
    width: 100,
  },
  {
    title: 'VIP状态',
    dataIndex: 'vipStatus',
    width: 150,
    customRender: ({record}) => {
      let level = '维持';
      if (record.vipStatus === 1) {
        level = '晋级';
      }else if (record.vipStatus === 2) {
        level = '保级';
      }else if (record.vipStatus === 3) {
        level = '降级';
      }
      return level;
    }
  },
  {
    title: '礼金',
    dataIndex: 'gift',
    width: 180,
  },
  {
    title: '礼金类型',
    dataIndex: 'type',
    width: 180,
    customRender: ({record}) => {
      let type = '生日礼';
      if (record.type === 1) {
        type = '月礼金';
      }else if (record.type === 2) {
        type = '晋级';
      }else if (record.type === 3) {
        type = '降级';
      }else if (record.type === 4) {
        type = '返水';
      }
      return type;
    }
  },
  {
    title: '发放时间',
    dataIndex: 'createdAt',
    width: 180,
    sorter: (a, b) => {
      let dateA = new Date(a.createdAt);
      let dateB = new Date(b.createdAt);
      if (dateA < dateB) {
        return 1;
      } else if (dateA > dateB) {
        return -1;
      } else {
        return 0;
      }
    },
  },
  {
    title: '领取状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      return record.status === 1 ? '已领取':'未领取';
    }
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'startTime',
    label: '日期（开始）',
    component: 'DatePicker',
    colProps: { span: 6 },
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    }
  },
  {
    field: 'endTime',
    label: '日期（结束）',
    component: 'DatePicker',
    colProps: { span: 6 },
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    }
  },
  {
    field: 'account',
    label: '会员帐号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'vipLevel',
    label: 'VIP等级',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: [
      {
        label: '0',
        value: 0,
        key: 0,
      },
      {
        label: '1',
        value: 1,
        key: 1,
      },
      {
        label: '2',
        value: 2,
        key: 2,
      },
      {
        label: '3',
        value: 3,
        key: 3,
      },
      {
        label: '4',
        value: 4,
        key: 4,
      },
      {
        label: '5',
        value: 5,
        key: 5,
      }
    ],
    },
  },
  {
    field: 'status',
    label: '领取状态',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: [
      {
        label: '全部',
        value: 1,
        key: 1,
      },
      {
        label: '已领取',
        value: 2,
        key: 2,
      },
      {
        label: '未领取',
        value: 3,
        key: 3,
      },
    ],
    },
  },
  {
    field: 'vipStatus',
    label: 'VIP状态',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: [
      {
        label: '晋级',
        value: 1,
        key: 1,
      },
      {
        label: '保级',
        value: 2,
        key: 2,
      },
      {
        label: '降级',
        value: 3,
        key: 3,
      },
      {
        label: '维持',
        value: 4,
        key: 4,
      },
    ],
    },
  },
  {
    field: 'type',
    label: '礼金类型',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: [
      {
        label: '月礼金',
        value: 1,
        key: 1,
      },
      {
        label: '晋级',
        value: 2,
        key: 2,
      },
      {
        label: '周年',
        value: 3,
        key: 3,
      },
      {
        label: '返水',
        value: 4,
        key: 4,
      },
      {
        label: '生日礼',
        value: 5,
        key: 5,
      },
    ],
    },
  },
];

export const birthdayPrizeSchema: FormSchema[] = [
  {
    field: 'time',
    label: '日期（开始）',
    component: 'DatePicker',
    required: true,
    colProps: { span: 6 },
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    }
  },
  {
    field: 'account',
    label: '会员帐号',
    component: 'Input',
    required: true,
    colProps: { span: 6 },
  },
  {
    field: 'gift',
    label: '生日礼内容',
    required: true,
    component: 'Input',
    colProps: { span: 8 },
  },
];


