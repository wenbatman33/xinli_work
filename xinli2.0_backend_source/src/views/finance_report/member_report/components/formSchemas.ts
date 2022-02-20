import { FormSchema } from '/@/components/Form';
import { GetPayGroupsResponse } from '/@/api/payment/model/payGroupModel';
import moment from 'moment';

/**
 * Member report form schemas
 * @param payGroups 三方金流群組列表
 * @param bankcardGroups 存款卡金流群組列表
 */
export const memberReportSchemas = (
  payGroups: GetPayGroupsResponse[],
  bankcardGroups: GetPayGroupsResponse[]
): FormSchema[] => {
  return [
    {
      show: false,
      field: 'reportDateStart',
      component: 'Input',
      label: '存款日期-start',
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
      label: '存款日期-end',
      defaultValue: moment()
        .set('hour', 23)
        .set('minute', 59)
        .set('second', 59)
        .format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      field: 'reportDate',
      component: 'Input',
      label: '存款日期',
      slot: 'reportDate',
      colProps: {
        span: 6,
      },
      componentProps: {
        allowClear: false,
        style: {
          width: '100%',
        },
      },
    },
    {
      field: 'currency',
      component: 'Select',
      label: '币别',
      defaultValue: Number.MIN_VALUE,
      colProps: {
        span: 3,
      },
      componentProps: {
        allowClear: false,
        options: [
          {
            label: '全部',
            value: Number.MIN_VALUE,
            key: Number.MIN_VALUE,
          },
          {
            label: '人民币',
            value: 1,
            key: 1,
          },
          {
            label: 'USDT-ERC',
            value: 2,
            key: 2,
          },
          {
            label: 'USDT-TRC',
            value: 3,
            key: 3,
          },
        ],
      },
    },
    {
      field: 'pageSize',
      component: 'Select',
      label: '数量',
      defaultValue: 20,
      colProps: {
        span: 3,
      },
      componentProps: {
        allowClear: false,
        options: [
          {
            label: '前20名',
            value: 20,
            key: 20,
          },
          {
            label: '前100名',
            value: 100,
            key: 100,
          },
          {
            label: '全部',
            value: 9999,
            key: 9999,
          },
        ],
      },
    },
    {
      field: 'paymentGroup',
      component: 'Select',
      label: '三方金流组别',
      defaultValue: Number.MIN_VALUE,
      colProps: {
        span: 3,
      },
      componentProps: {
        allowClear: false,
        options: [
          {
            label: '全部',
            value: Number.MIN_VALUE,
            key: Number.MIN_VALUE,
          },
        ].concat(
          payGroups.map((element) => {
            return {
              label: element.name || '',
              value: element.ID || 0,
              key: element.ID || 0,
            };
          })
        ),
      },
    },
    {
      field: 'bankcardGroup',
      component: 'Select',
      label: '银行卡金流组别',
      defaultValue: Number.MIN_VALUE,
      colProps: {
        span: 3,
      },
      componentProps: {
        allowClear: false,
        options: [
          {
            label: '全部',
            value: Number.MIN_VALUE,
            key: Number.MIN_VALUE,
          },
        ].concat(
          bankcardGroups.map((element) => {
            return {
              label: element.name || '',
              value: element.ID || 0,
              key: element.ID || 0,
            };
          })
        ),
      },
    },
  ];
};
