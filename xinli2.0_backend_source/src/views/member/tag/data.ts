import { FormSchema } from '/@/components/Table';

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '标签ID',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => values.id,
    componentProps: { disabled: true },
  },
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'color',
    label: '代表颜色',
    component: 'Input',
    slot: 'colorpicker'
  },
];

export const formTagSchema: FormSchema[] = [
  {
    field: 'id',
    label: '标签ID',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => values.id,
    componentProps: { disabled: true },
  },
  {
    field: 'createdAt',
    label: '建立时间',
    component: 'Input',
    ifShow: ({ values }) => values.id,
    required: true,
    componentProps: { disabled: true },
  },
  {
    field: 'updatedAt',
    label: '修改时间',
    component: 'Input',
    ifShow: ({ values }) => values.id,
    required: true,
    componentProps: { disabled: true },
  },
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'tagGroupID',
    component: 'Select',
    label: '标签群组',
    required: true,
  },
];




