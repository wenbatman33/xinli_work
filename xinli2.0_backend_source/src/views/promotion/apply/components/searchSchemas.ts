import { FormSchema } from '/@/components/Form';

export const searchSchemas = (): FormSchema[] => {
  return [
    {
      field: 'memberID',
      component: 'Input',
      label: '会员帐号',
      colProps: { span: 6 },
      defaultValue: '',
      componentProps: {
        placeholder: '请输入会员帐号',
      },
    },
    {
      field: 'promotionName',
      component: 'Input',
      label: '优惠名称',
      colProps: { span: 6 },
      defaultValue: '',
      componentProps: {
        placeholder: '请输入优惠名称',
      },
    },
    {
      field: 'batchID',
      component: 'Input',
      label: '批次流水号',
      colProps: { span: 6 },
      defaultValue: '',
      componentProps: {
        placeholder: '请输入批次流水号',
      },
    },
    {
      field: 'promotionID',
      component: 'Input',
      label: '优惠流水号',
      colProps: { span: 6 },
      componentProps: {
        placeholder: '请输入优惠流水号',
      },
    },
    {
      isAdvanced: true,
      field: 'sendAtStart',
      component: 'Input',
      label: '派发开始时间',
      slot: 'sendAtStart',
      colProps: { span: 6 },
    },
    {
      isAdvanced: true,
      field: 'sendAtEnd',
      component: 'Input',
      label: '派发结束时间',
      slot: 'sendAtEnd',
      colProps: { span: 6 },
    },
    {
      field: 'approveWay',
      component: 'Select',
      label: '审核方式',
      colProps: { span: 6 },
      componentProps: {
        placeholder: '请选择审核方式',
        options: [
          {
            label: '全部',
            value: '',
            key: '',
          },
          {
            label: '自助',
            value: 1,
            key: 1,
          },
          {
            label: '自动',
            value: 2,
            key: 2,
          },
        ],
      },
    },
    {
      field: 'receiveWay',
      component: 'Select',
      label: '领取方式',
      colProps: { span: 6 },
      componentProps: {
        placeholder: '请选择领取方式',
        options: [
          {
            label: '全部',
            value: '',
            key: '',
          },
        ],
      },
    },
  ];
};
