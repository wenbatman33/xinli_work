import { FormSchema } from '/@/components/Form';
import moment from 'moment';

export const searchSchemas: FormSchema[] = [
  {
    show: false,
    field: 'createdAtStart',
    component: 'Input',
    label: '交易时间开始',
    // defaultValue: moment()
    //   .set('hour', 0)
    //   .set('minute', 0)
    //   .set('second', 0)
    //   .format('YYYY-MM-DD HH:mm'),
  },
  {
    show: false,
    field: 'createdAtEnd',
    component: 'Input',
    label: '交易时间结束',
    // defaultValue: moment()
    //   .set('hour', 23)
    //   .set('minute', 59)
    //   .set('second', 59)
    //   .format('YYYY-MM-DD HH:mm'),
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
    field: 'payChannel',
    component: 'Input',
    label: '商户号',
    colProps: {
      span: 4,
    },
  },
  {
    field: 'payChannelService',
    component: 'Input',
    label: '线路',
    colProps: {
      span: 4,
    },
  },
];
