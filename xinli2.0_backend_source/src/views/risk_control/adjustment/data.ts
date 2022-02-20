import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'adjustmentID',
    width: 80,
  },
  {
    title: '名称',
    dataIndex: 'subject',
    width: 150,
  },
  {
    title: '调整原因',
    dataIndex: 'reason',
    width: 140,
    customRender: ({record}) => {
      return adjustReasonOptions.find(item => item.value === record.reason)?.label;
    }
  },
  {
    title: '说明',
    dataIndex: 'description',
    width: 150,
  },
  {
    title: '上/下分',
    dataIndex: 'adjustmentType',
    width: 80,
    customRender: ({record}) => {
      return record.adjustmentType === '1' ? '上分' : '下分';
    }
  },
  {
    title: '金额',
    dataIndex: 'amount',
    width: 120,
  },
  {
    title: '申请时间',
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
    title: '最后更新日期',
    dataIndex: 'updatedAt',
    width: 180,
    sorter: (a, b) => {
      let dateA = new Date(a.updatedAt);
      let dateB = new Date(b.updatedAt);
      if (dateA < dateB) {
        return 1;
      } else if (dateA > dateB) {
        return -1;
      } else {
        return 0;
      }
    },
  },
  // {
  //   title: '存提差',
  //   dataIndex: 'isSpread',
  //   width: 80,
  //   customRender: ({record}) => {
  //     return record.isSpread === '1' ? '是' : '否';
  //   }
  // },
  {
    title: '总申请人数',
    dataIndex: 'applyCount',
    width: 80,
  },
  {
    title: '核可人数',
    dataIndex: 'passCount',
    width: 80,
    customRender: ({record}) => {
      return record.passCount + '/' + record.applyCount;
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({record}) => {
      let mess = '未审核';
      if (record.status === '1') {
        mess = '通过';
      } else if (record.status === '2') {
        mess = '部分通过';
      } else if (record.status === '4') {
        mess = '不通过';
      }
      return mess;
    }
  },
];

export const applyFormSchema: FormSchema[] = [
  {
    field: 'adjustmentID',
    label: 'ID',
    component: 'Input',
    ifShow: ({ values }) => {
      return !!values.adjustmentID;
    },
  },
  {
    field: 'subject',
    label: '名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'reason',
    label: '调整原因',
    required: true,
    component: 'Select',
    slot: 'reason',
  },
  {
    field: 'description',
    label: '说明',
    component: 'Input',
    required: true,
  },
  {
    field: 'adjustmentType',
    label: '上/下分',
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '上分',
          value: '1',
          key: 1,
        },
        {
          label: '下分',
          value: '2',
          key: 2,
        },
      ],
    },
  },
  {
    field: 'amount',
    label: '金额',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.reject('金额不能为空');
          }
          if (Number(value) <= 0) {
            /* eslint-disable-next-line */
            return Promise.reject('金額需大於0');
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
    componentProps: ({ formModel }) => {
      return {
        onChange: (e: ChangeEvent) => {
          formModel.finalAmount = (Number(e.target.value) * Number(formModel.amountTimes)).toFixed(2);
        },
      };
    },
  },
  {
    field: 'amountTimes',
    label: '流水倍数',
    component: 'Input',
    required: true,
    defaultValue: 1,
    componentProps: ({ formModel }) => {
      return {
        onChange: (e: ChangeEvent) => {
          formModel.finalAmount = (Number(e.target.value) * Number(formModel.amount)).toFixed(2);
        },
      };
    },
  },
  {
    field: 'finalAmount',
    label: '流水总额',
    component: 'Input',
    required: true,
    componentProps: ({ formModel }) => {
      return {
        onChange: (e: ChangeEvent) => {
          formModel.amountTimes = (Number(e.target.value) / Number(formModel.amount)).toFixed(2);
        },
      };
    },
  },
  // {
  //   field: 'isSpread',
  //   label: '存提差',
  //   component: 'RadioButtonGroup',
  //   defaultValue: undefined,
  //   required: true,
  //   componentProps: {
  //     options: [
  //       { label: '是', value: '1' },
  //       { label: '否', value: '2' },
  //     ],
  //   },
  // },
  {
    field: 'currency',
    label: '币别',
    component: 'Input',
    required: true,
    defaultValue: 'RMB',
  },
];

export const memberColumns: BasicColumn[] = [
  {
    title: '会员名称',
    dataIndex: 'memberAccount',
    width: 80,
  },
];

export const applyDetailSchema = [
  {
    field: 'subject',
    label: '名称',
  },
  {
    field: 'reason',
    label: '调整原因',
    render: (val) => {
      return adjustReasonOptions.find(item => item.value === val)?.label;
    },
  },
  {
    field: 'description',
    label: '说明',
  },
  {
    field: 'adjustmentType',
    label: '上/下分',
    render: (val) => {
      return val === "1" ? '上分':'下分';
    },
  },
  {
    field: 'amount',
    label: '金额',
  },
  {
    field: 'amountTimes',
    label: '流水倍数',
  },
  {
    field: 'finalAmount',
    label: '流水总额',
  },
  // {
  //   field: 'isSpread',
  //   label: '存提差',
  //   render: (val) => {
  //     return val === 1 ? '是':'否';
  //   },
  // },
  {
    field: 'currency',
    label: '币别',
  },
];

export const applyDetailMemberColumns: BasicColumn[] = [
  {
    title: '会员名称',
    dataIndex: 'memberAccount',
    width: 200,
  },
  {
    title: '审核结果',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '同意',
        unCheckedChildren: '不同意',
        onChange(checked: boolean) {
          const newStatus = checked ? 1 : 2;
          record.status = newStatus;
        },
      });
    },
  },
  {
    title: '原因',
    dataIndex: 'reason',
    edit: true,
    editable: true,
    width: 200,
  },
  {
    title: 'lockID',
    dataIndex: 'lockID',
    width: 10,
    ifShow: false,
  },
  {
    title: 'memberID',
    dataIndex: 'memberID',
    width: 10,
    ifShow: false,
  },
];

export const adjustReasonOptions = ([
  {key: 1, value: 1, label:'派发转运红包'},
  {key: 2, value: 2, label:'扣除违规盈利/彩金'},
  {key: 3, value: 3, label:'内部测试号的上下分'},
  {key: 4, value: 4, label:'财务特殊上分'},
  {key: 5, value: 5, label:'市场特殊上分'},
  {key: 6, value: 6, label:'转帐掉单补分'},
  {key: 7, value: 7, label:'风控违规投注的扣分'},
  {key: 8, value: 8, label:'风控红包派发上分'},
  {key: 9, value: 9, label:'游戏钱包负数的填平上分'},
  {key: 10, value: 10, label:'厂商派彩错误'},
  {key: 11, value: 11, label:'产品关闭'},
  {key: 12, value: 12, label:'测试号上分'},
  {key: 13, value: 13, label:'线下活动派彩'},
]);

export const editColumns = [
  {
    title: '操作者',
    dataIndex: 'operator',
    width: 150,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 150,
  },
  {
    title: '动作',
    dataIndex: 'action',
  },
];