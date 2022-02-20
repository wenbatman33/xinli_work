import { FormSchema } from '/@/components/Form';
import { adjustTypeOption } from '/@/views/agency/wallet/data'

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
      field: 'type',
      component: 'Select',
      label: '异动类型',
      defaultValue: 0,
      componentProps: {
        options: [
          {
            label: '全部',
            value: 0,
          },
          ...adjustTypeOption,
        ]
      },
      colProps: {
        span: 4,
      },
    },
    {
      field: 'status',
      component: 'Select',
      label: '状态',
      defaultValue: 0,
      componentProps: {
        options: [
          {
            label: '全部',
            value: 0,
          },
          {
            label: '成功',
            value: 1,
          },
          {
            label: '拒绝',
            value: 2,
          },
          {
            label: '待审核',
            value: 3,
          },
        ]
      },
      colProps: {
        span: 4,
      },
    },
    {
      isAdvanced: false,
      field: 'applyTime',
      component: 'Input',
      label: '申请日期',
      slot: 'applyTime',
      componentProps: {
        startTime: 'applyStartTime',
        endTime: 'applyEndTime',
      },
      colProps: {
        span: 10,
      },
    },
    {
      show: false,
      field: 'applyStartTime',
      component: 'Input',
      label: '申请时间开始',
    },
    {
      show: false,
      field: 'applyEndTime',
      component: 'Input',
      label: '申请时间结束',
    },
    {
      isAdvanced: false,
      field: 'reviewTime',
      component: 'Input',
      label: '审核日期',
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
  ];
};
