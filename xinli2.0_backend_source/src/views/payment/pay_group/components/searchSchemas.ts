import { FormSchema } from '/@/components/Table';

export const searchSchemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '分组名称',
    colProps: { span: 8 },
    componentProps: {
      placeholder: '请输入分组名称',
    },
  },
];
