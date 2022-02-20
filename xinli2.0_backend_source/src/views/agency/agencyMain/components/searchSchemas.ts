import { FormSchema } from '/@/components/Form';

export const searchSchemas = (): FormSchema[] => {
  return [
    {
      field: 'agencyID',
      component: 'Input',
      label: '代理ID',
      componentProps: {
        placeholder: '请输入代理ID',
      },
      colProps: {
        span: 3,
      },
    },
    {
      field: 'agencyAccount',
      component: 'Input',
      label: '代理帐号',
      componentProps: {
        placeholder: '请输入代理帐号',
      },
      colProps: {
        span: 3,
      },
    },
    {
      field: 'exactlyMatching',
      component: 'RadioGroup',
      label: ' ',
      defaultValue: 2,
      componentProps: {
        options: [
          { label: '模糊搜寻', value: 1 },
          { label: '精确搜寻', value: 2 },
        ],
      },
      colProps: {
        span: 3,
      },
    },
    {
      isAdvanced: false,
      field: 'reviewTime',
      component: 'Input',
      label: '审核时间',
      slot: 'reviewTime',
      componentProps: {
        reviewStartTime: 'reviewStartTime',
        reviewEndTime: 'reviewEndTime',
      },
      colProps: {
        span: 10,
      },
    },
    {
      show: false,
      field: 'reviewStartTime',
      component: 'Input',
      label: '审核时间开始',
    },
    {
      show: false,
      field: 'reviewEndTime',
      component: 'Input',
      label: '审核时间结束',
    },
    {
      field: 'giveOffer',
      component: 'Select',
      label: '是否计算佣金',
      defaultValue: 0,
      componentProps: {
        options: [
          {
            label: '全部',
            value: 0,
            key: 0,
          },
          {
            label: '是',
            value: 1,
            key: 1,
          },
          {
            label: '否',
            value: 2,
            key: 2,
          },
        ],
      },
      colProps: {
        span: 3,
      },
    },
    {
      field: 'activeStatus',
      component: 'Select',
      label: '活跃状态',
      defaultValue: 0,
      componentProps: {
        options: [
          {
            label: '全部',
            value: 0,
            key: 0,
          },
          {
            label: '活跃',
            value: 1,
            key: 1,
          },
          {
            label: '不活跃',
            value: 2,
            key: 2,
          },
        ],
      },
      colProps: {
        span: 3,
      },
    },
    {
      field: 'status',
      component: 'Select',
      label: '帐号状态',
      defaultValue: 0,
      componentProps: {
        options: [
          {
            label: '全部',
            value: 0,
            key: 0,
          },
          {
            label: '正常',
            value: 1,
            key: 1,
          },
          {
            label: '锁定提款',
            value: 2,
            key: 2,
          },
          {
            label: '黑名单',
            value: 3,
            key: 3,
          },
        ],
      },
      colProps: {
        span: 3,
      },
    },
  ];
};
