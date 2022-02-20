import { FormSchema } from '/@/components/Form';
import moment from 'moment';

export const searchSchemas: FormSchema[] = [
  {
    show: false,
    field: 'logTimeStart',
    component: 'Input',
    label: '交易时间 start',
  },
  {
    show: false,
    field: 'logTimeEnd',
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
      logTimeStart: 'logTimeStart',
      logTimeEnd: 'logTimeEnd',
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'cardNo',
    component: 'Input',
    label: '卡号',
    colProps: { span: 8 },
    componentProps: {
      placeholder: '请输入卡号',
    },
  },
];
