import { FormSchema } from '/@/components/Form';
import moment from 'moment';

/**
 * Single reached report form schemas
 */
export const singleReachedReportSchemas: FormSchema[] = [
  {
    field: 'reportDateStart',
    component: 'DatePicker',
    label: '开始日期',
    defaultValue: moment().set('hour', 0).set('minute', 0).set('second', 0),
    colProps: {
      span: 4,
    },
    componentProps: {
      allowClear: false,
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'reportHourStart',
    component: 'TimePicker',
    label: '开始时间',
    defaultValue: moment().set('hour', 0).set('minute', 0).set('second', 0),
    colProps: {
      span: 4,
    },
    componentProps: {
      allowClear: false,
      format: 'HH',
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'reportDateEnd',
    component: 'DatePicker',
    label: '结束日期',
    defaultValue: moment().set('hour', 0).set('minute', 0).set('second', 0),
    colProps: {
      span: 4,
    },
    componentProps: {
      allowClear: false,
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'reportHourEnd',
    component: 'TimePicker',
    label: '结束时间',
    defaultValue: moment().set('hour', 23).set('minute', 59).set('second', 0),
    colProps: {
      span: 4,
    },
    componentProps: {
      allowClear: false,
      format: 'HH',
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'payChannelServiceID',
    component: 'Input',
    label: '線路id',
    defaultValue: 0,
    colProps: {
      span: 4,
    },
  },
];
