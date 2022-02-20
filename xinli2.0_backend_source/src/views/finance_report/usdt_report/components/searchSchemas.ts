import { FormSchema } from '/@/components/Form';
import moment from 'moment';

export const searchSchemas: FormSchema[] = [
  {
    show: false,
    field: 'createdAtStart',
    component: 'Input',
    label: '交易时间 start',
  },
  {
    show: false,
    field: 'createdAtEnd',
    component: 'Input',
    label: '交易时间 end',
  },
  {
    isAdvanced: false,
    field: 'createdAt',
    component: 'Input',
    label: '交易时间',
    slot: 'date',
    componentProps: {
      createdAtStart: 'createdAtStart',
      createdAtEnd: 'createdAtEnd',
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'usdtID',
    component: 'Input',
    label: 'U帐户ID',
    slot: 'usdtID',
    colProps: { span: 8 },
    componentProps: {
      placeholder: '请选择U帐户ID',
    },
  },
];
