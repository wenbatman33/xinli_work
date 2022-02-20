import { FormSchema } from '/@/components/Table';

export const commentFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'commentCategory',
    label: '绑定词',
    component: 'Input',
    required: true,
    componentProps: {
      disabled: 'disabled'
    }
  },
  {
    field: 'title',
    label: '简述',
    component: 'Input',
    required: true,
  },
  {
    field: 'content',
    label: '全文',
    component: 'InputTextArea',
    required: false,
    componentProps:{
      autoSize: { minRows: 5, maxRows: 10 }
    }
  },
];