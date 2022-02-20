import { FormSchema } from '/@/components/Form';

export const searchSchemas = (): FormSchema[] => {
  return [
    {
      field: 'id',
      component: 'Input',
      label: '代理申請ID',
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
      label: '申請人代理帳號',
      componentProps: {
        placeholder: '请输入被申請人代理帳號',
      },
      colProps: {
        span: 3,
      },
    },
    {
      field: 'memberAccount',
      component: 'Input',
      label: '代理申請審核人會員帳號',
      componentProps: {
        placeholder: '请输入代理申請審核人會員帳號',
      },
      colProps: {
        span: 4,
      },
    },
    {
      field: 'exactlyMatching',
      component: 'RadioGroup',
      label: ' ',
      defaultValue: 2,
      componentProps: {
        options: [
          { label: '模糊搜寻', value: true },
          { label: '精确搜寻', value: false },
        ],
      },
      colProps: {
        span: 3,
      },
    },
    {
      field: 'auditStatus',
      component: 'Select',
      label: '審核状态',
      defaultValue: 0,
      componentProps: {
        options: [
          {
            label: '全部',
            value: 0,
            key: 0,
          },
          {
            label: '待審核',
            value: 1,
            key: 1,
          },
          {
            label: '同意',
            value: 2,
            key: 2,
          },
          {
            label: '拒絕',
            value: 3,
            key: 3,
          },
        ],
      },
      colProps: {
        span: 3,
      },
    },
    {
      isAdvanced: false,
      field: 'applyTime',
      component: 'Input',
      label: '申請时间',
      slot: 'applyTime',
      componentProps: {
        applicationStartTime: 'applicationStartTime',
        applicationEndTime: 'applicationEndTime',
      },
      colProps: {
        span: 10,
      },
    },
    {
      show: false,
      field: 'applicationStartTime',
      component: 'Input',
      label: '申請时间开始',
    },
    {
      show: false,
      field: 'applicationEndTime',
      component: 'Input',
      label: '申請时间结束',
    },
    {
      isAdvanced: false,
      field: 'reviewTime',
      component: 'Input',
      label: '審核时间',
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
      label: '審核时间开始',
    },
    {
      show: false,
      field: 'reviewEndTime',
      component: 'Input',
      label: '審核时间结束',
    },
  ];
};
