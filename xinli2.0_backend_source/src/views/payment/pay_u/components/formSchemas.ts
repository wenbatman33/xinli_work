import { FormSchema } from '/@/components/Form';

export const moneyInSchemas: FormSchema[] = [
  {
    field: 'targetSN',
    component: 'Input',
    label: '商户号',
    slot: 'targetSN',
    colProps: { span: 16 },
  },
  {
    field: 'targetID',
    component: 'Input',
    label: '商户号',
    slot: 'targetID',
    defaultValue: undefined,
    show: false,
  },
  {
    field: 'payChannelName',
    component: 'Input',
    label: '商户',
    slot: 'span',
    defaultValue: undefined,
    ifShow: (params) => {
      return params.values.payChannelName !== undefined;
    },
  },
  {
    field: 'amount',
    component: 'InputNumber',
    label: '结算U币',
    required: true,
  },
  {
    field: 'exchangeRate',
    component: 'InputNumber',
    label: '汇率',
    required: true,
    suffix: '可填写至小数点后第四位',
    colProps: { span: 18 },
  },
  {
    field: 'exchangeAmount',
    component: 'InputNumber',
    label: '实际下发金额CNY',
    required: true,
  },
  {
    field: 'fee',
    component: 'InputNumber',
    label: '手续费',
    required: true,
    suffix: '若无手续费需填0',
    colProps: { span: 16 },
  },
];

export const moneyOutSchemas: FormSchema[] = [
  {
    field: 'targetSN',
    component: 'Input',
    label: '充值至 商户号',
    slot: 'targetSN',
    colProps: { span: 16 },
  },
  {
    field: 'targetID',
    component: 'Input',
    label: '充值至 商户号',
    slot: 'targetID',
    defaultValue: undefined,
    show: false,
  },
  {
    field: 'payChannelName',
    component: 'Input',
    label: '商户',
    slot: 'span',
    defaultValue: undefined,
    ifShow: (params) => {
      return params.values.payChannelName !== undefined;
    },
  },
  {
    field: 'amount',
    component: 'InputNumber',
    label: '使用U币',
    required: true,
  },
  {
    field: 'exchangeRate',
    component: 'InputNumber',
    label: '汇率',
    required: true,
    colProps: { span: 18 },
    suffix: '可填写至小数点后第四位',
  },
  {
    field: 'exchangeAmount',
    component: 'InputNumber',
    label: '实际充值金额CNY',
    required: true,
  },
  {
    field: 'fee',
    component: 'InputNumber',
    label: '手续费',
    required: true,
    suffix: '若无手续费需填0',
    colProps: { span: 16 },
  },
];
