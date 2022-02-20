import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '时间\nDate',
    dataIndex: 'date',
    width: 180,
    sorter: (a, b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);
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
    title: '收支\nin/out',
    dataIndex: 'inOut',
    width: 120,
    customRender: ({record}) => {
      return record.income === 1 ? 'in' : 'out';
    }
  },
  {
    title: '项目\nType',
    dataIndex: 'type',
    width: 120,
    slots: { customRender: 'type' }
  },
  {
    title: '交易前金额\nPrevious',
    dataIndex: 'before',
    width: 180,
  },
  {
    title: '交易金额\nAmount',
    dataIndex: 'amount',
    width: 180,
  },
  {
    title: '交易后金额\nCurrent',
    dataIndex: 'after',
    width: 180,
  },
  {
    title: '流水倍数\nMultiple',
    dataIndex: 'turnoverMultiple',
    width: 100,
    sorter: (a, b) => {
      let dateA = new Date(a.turnoverMultiple);
      let dateB = new Date(b.turnoverMultiple);
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
    title: '所需流水\nTurnoverNeed',
    dataIndex: 'turnoverLimit',
    width: 180,
  },
  {
    title: '详细内容\nDetail',
    dataIndex: 'note',
    width: 250,
  },
];

export const searchFormSchema = (): FormSchema[] => {
  return [
    {
      field: 'inOut',
      label: '收支',
      component: 'Select',
      colProps: { span: 4 },
      defaultValue: 0,
      componentProps: {
        options: [
          {
            label: 'all',
            value: 0,
            key: 0,
          },
          {
            label: 'in',
            value: 2,
            key: 2,
          },
          {
            label: 'out',
            value: 1,
            key: 1,
          },
        ],
      },
    },
    {
      field: 'type',
      label: '项目',
      component: 'Select',
      colProps: { span: 4 },
      defaultValue: 0,
      componentProps: {
        options: [
          {
            label: 'all',
            value: 0,
            key: 0,
          },
          ...inOutType.map(item => {
            return {
              label: item.name,
              value: item.id,
              key: item.id,
            }
          }),
        ],
      },
    },
  ];
};

export const inOutType = [
  {
    id: 1,
    name: '存款',
    color: '#5CB85C',
  },
  {
    id: 2,
    name: '提款',
    color: '#000',
  },
  {
    id: 3,
    name: '红利',
    color: '#E658C2',
  },
  {
    id: 4,
    name: '游戏扣款',
    color: '#979797',
  },
  {
    id: 5,
    name: '代理预存',
    color: '#5CB85C',
  },
  {
    id: 6,
    name: '特殊上分',
    color: '#D9534F',
  },
  {
    id: 7,
    name: '特殊扣款',
    color: '#D9534F',
  },
  {
    id: 8,
    name: '佣金提款',
    color: '#D9534F',
  },
  {
    id: 9,
    name: '佣金派发',
    color: '#5CB85C',
  },
  {
    id: 10,
    name: '代理转入会员',
    color: '#5CB85C',
  },
  {
    id: 11,
    name: '游戏转入钱包',
    color: '#979797',
  },
  {
    id: 12,
    name: '钱包转入游戏',
    color: '#979797',
  },
  {
    id: 13,
    name: '游戏加款',
    color: '#979797',
  },
  {
    id: 14,
    name: '提款审核冻结',
    color: '#979797',
  },
  {
    id: 15,
    name: '审核通过解冻',
    color: '#979797',
  },
  {
    id: 16,
    name: '审核失败解冻',
    color: '#979797',
  },
  {
    id: 17,
    name: '特殊扣款冻结',
    color: '#979797',
  },
  {
    id: 18,
    name: '审核取消解冻',
    color: '#979797',
  },
  {
    id: 19,
    name: 'VIP 上分',
    color: '#979797',
  },
]