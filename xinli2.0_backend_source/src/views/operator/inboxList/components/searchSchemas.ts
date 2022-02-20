import { FormSchema } from '/@/components/Table';

export const searchSchemas = (): FormSchema[] => {
  return [
    {
      field: 'memberAccount',
      component: 'Input',
      label: '会员帐号',
      colProps: { span: 6 },
      componentProps: {
        placeholder: '请输入会员帐号',
      },
    },
    {
      field: 'status',
      component: 'Select',
      label: '状态 ',
      colProps: { span: 6 },
      componentProps: {
        options: [
          {
            label: '全部',
            value: 0,
            key: 0,
          },
          {
            label: '待发送',
            value: 1,
            key: 1,
          },
        ],
      },
    },
    {
      field: 'type',
      component: 'Select',
      label: '类型 ',
      colProps: { span: 6 },
      componentProps: {
        options: [
          {
            label: '全部',
            value: 0,
            key: 0,
          },
          {
            label: '系统',
            value: 1,
            key: 1,
          },
          {
            label: '手动',
            value: 2,
            key: 2,
          },
        ],
      },
    },
  ];
};
