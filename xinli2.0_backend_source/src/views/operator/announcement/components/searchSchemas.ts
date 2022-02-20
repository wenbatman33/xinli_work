import { FormSchema } from '/@/components/Table';

export const searchSchemas = (): FormSchema[] => {
  return [
    {
      field: 'title',
      component: 'Input',
      label: '标题',
      colProps: { span: 8 },
      componentProps: {
        placeholder: '请输入标题',
      },
    },
    {
      field: 'hidden',
      component: 'Select',
      label: '是否隐藏 ',
      colProps: { span: 8 },
      componentProps: {
        options: [
          {
            label: '全部',
            value: '',
            key: '',
          },
          {
            label: '隐藏',
            value: 'true',
            key: 'true',
          },
          {
            label: '显示',
            value: 'false',
            key: 'false',
          },
        ],
      },
    },
  ];
};
