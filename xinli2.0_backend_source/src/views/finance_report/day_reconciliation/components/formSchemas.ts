import { FormSchema } from '/@/components/Form';
import moment from 'moment';

export const searchSchema = (): FormSchema[] => {
  return [
    {
      show: false,
      field: 'reportDateStart',
      component: 'Input',
      label: '报表日期-start',
      defaultValue: moment()
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0)
        .format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      show: false,
      field: 'reportDateEnd',
      component: 'Input',
      label: '报表日期-end',
      defaultValue: moment()
        .set('hour', 23)
        .set('minute', 59)
        .set('second', 59)
        .format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      field: 'reportDate',
      component: 'Input',
      label: '报表日期',
      slot: 'reportDate',
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
      field: 'payChannelName',
      component: 'Input',
      label: '商户',
      colProps: {
        span: 3,
      },
    },
    {
      field: 'payChannelSn',
      component: 'Input',
      label: '商户号',
      colProps: {
        span: 3,
      },
    },
    {
      field: 'balanceDiff',
      component: 'Select',
      label: '是否有差额',
      defaultValue: 0,
      colProps: {
        span: 3,
      },
      componentProps: {
        allowClear: false,
        options: [
          {
            label: '全部',
            value: 0,
            key: 0,
          },
          {
            label: '有',
            value: 1,
            key: 1,
          },
          {
            label: '无',
            value: 2,
            key: 2,
          },
        ],
      },
    },
    {
      field: 'balanceChange',
      component: 'Select',
      label: '是否有异动',
      defaultValue: 0,
      colProps: {
        span: 3,
      },
      componentProps: {
        allowClear: false,
        options: [
          {
            label: '全部',
            value: 0,
            key: 0,
          },
          {
            label: '代收',
            value: 1,
            key: 1,
          },
          {
            label: '代付',
            value: 2,
            key: 2,
          },
          {
            label: '下发金额不为0',
            value: 3,
            key: 3,
          },
        ],
      },
    },
  ];
};
