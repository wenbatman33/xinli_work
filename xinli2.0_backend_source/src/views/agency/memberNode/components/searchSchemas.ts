import { FormSchema } from '/@/components/Form';

export const searchSchemas = (): FormSchema[] => {
  return [
    {
      field: 'memberID',
      component: 'Input',
      label: '會員ID',
      componentProps: {
        placeholder: '请输入代理ID',
      },
      colProps: {
        span: 2,
      },
    },
    {
      field: 'agencyID',
      component: 'Input',
      label: '代理ID',
      componentProps: {
        placeholder: '请输入代理ID',
      },
      colProps: {
        span: 2,
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
      field: 'Time',
      component: 'Input',
      label: '轉線时间',
      slot: 'Time',
      componentProps: {
        startTime: 'startTime',
        endTime: 'endTime',
      },
      colProps: {
        span: 10,
      },
    },
    {
      show: false,
      field: 'startTime',
      component: 'Input',
      label: '转线时间开始',
    },
    {
      show: false,
      field: 'endTime',
      component: 'Input',
      label: '转线时间结束',
    },
  ];
};
