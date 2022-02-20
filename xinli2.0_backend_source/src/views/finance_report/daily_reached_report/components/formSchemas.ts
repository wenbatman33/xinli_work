import { FormSchema } from '/@/components/Form';
import { DropdownItem } from '/@/api/payment/model/payChannelServiceModel';
import moment from 'moment';

/**
 * Daily reached report form schemas
 */
export const dailyReachedReportSchemas = (serviceCode: DropdownItem[]): FormSchema[] => {
  return [
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
      colProps: {
        span: 4,
      },
    },
    {
      field: 'serviceCode',
      component: 'Select',
      label: '支付方式',
      defaultValue: '',
      colProps: {
        span: 3,
      },
      componentProps: {
        allowClear: false,
        options: [
          {
            label: '全部',
            value: '',
            key: '',
          },
        ].concat(
          serviceCode.map((element) => {
            const key = Object.keys(element)[0];
            const value = element[key];
            return {
              label: `${value}`,
              value: `${key}`,
              key: `${key}`,
            };
          })
        ),
      },
    },
  ];
};
