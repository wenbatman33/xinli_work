import { FormSchema } from '/@/components/Form';
import { DropdownItem } from '/@/api/payment/model/payChannelServiceModel';
import moment from 'moment';

/**
 * Deposit form schemas
 */
export const depositSchemas = (serviceCode: DropdownItem[]): FormSchema[] => [
  {
    field: 'dateType',
    component: 'Select',
    label: '类型',
    defaultValue: 1,
    slot: 'dateType',
    colProps: {
      span: 3,
    },
  },
  {
    show: false,
    field: 'reportDateStart',
    component: 'Input',
    label: '報表日期：開始',
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
    label: '報表日期：結束',
    defaultValue: moment()
      .set('hour', 23)
      .set('minute', 59)
      .set('second', 59)
      .format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    field: 'reportDate',
    component: 'Input',
    label: '时间区间',
    slot: 'reportDate',
    colProps: {
      span: 8,
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
  {
    field: 'reportType',
    component: 'Select',
    label: '项目',
    defaultValue: 1,
    colProps: {
      span: 3,
    },
    componentProps: {
      allowClear: false,
      options: [
        {
          label: '人数',
          value: 1,
          key: 1,
        },
        {
          label: '金额区间',
          value: 2,
          key: 2,
        },
      ],
    },
  },
];
