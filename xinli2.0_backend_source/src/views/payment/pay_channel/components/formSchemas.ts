import { FormSchema } from '/@/components/Form';
import { PayChannelItem, PayChannelNameItem } from '/@/api/payment/model/payChannelModel';

/**
 * Pay channel form schemas
 * @param payChannelNameList 商戶列表
 * @returns Form schema array
 */
export const payChannelSchemas = (payChannelNameList: PayChannelNameItem[]): FormSchema[] => {
  return [
    {
      field: 'sn',
      component: 'Input',
      label: '商户号',
      colProps: {
        span: 5,
      },
    },
    {
      field: 'status',
      component: 'Select',
      label: '商户号状态',
      defaultValue: 1,
      colProps: {
        span: 5,
      },
      componentProps: {
        options: [
          {
            label: '全部',
            value: 0,
            key: 0,
          },
          {
            label: '启用',
            value: 1,
            key: 1,
          },
          {
            label: '停用',
            value: 2,
            key: 2,
          },
        ],
      },
    },
    {
      field: 'name',
      component: 'Select',
      label: '商户',
      colProps: {
        span: 5,
      },
      componentProps: {
        options: [
          {
            label: '全部',
            value: '',
            key: 0,
          },
        ].concat(
          payChannelNameList.map((element) => {
            return {
              label: element.name,
              value: element.name,
              key: element.id,
            };
          })
        ),
      },
    },
    {
      field: 'supplyAp',
      component: 'Select',
      label: '是否代付',
      defaultValue: '',
      colProps: {
        span: 5,
      },
      componentProps: {
        options: [
          {
            label: '全部',
            value: '',
            key: '',
          },
          {
            label: '是',
            value: 'true',
            key: 'true',
          },
          {
            label: '无',
            value: 'false',
            key: 'false',
          },
        ],
      },
    },
  ];
};

/**
 * Detail form schemas
 * @param editable 是否可編輯
 * @param payChannelItem 商戶號物件
 * @param payChannelNameList 商戶列表
 * @returns Form schema array
 */
export const detailSchemas = (
  editable: boolean,
  payChannelNameList?: PayChannelNameItem[],
  payChannelItem?: PayChannelItem
): FormSchema[] => {
  const spLowerLimit = payChannelItem?.spLowerLimit || 0;
  const spUpperLimit = payChannelItem?.spUpperLimit || 0;
  const spFee = payChannelItem?.spFee || 0;
  const spPerFee = payChannelItem?.spPerFee || 0;
  const depositLowerLimit = payChannelItem?.depositLowerLimit || 0;
  const depositUpperLimit = payChannelItem?.depositUpperLimit || 0;
  const depositFee = payChannelItem?.depositFee || 0;
  const depositPerFee = payChannelItem?.depositPerFee || 0;
  const toLocaleString = (value?: string | number) => {
    if (editable === false) {
      try {
        return Number(value || '0').toLocaleString();
      } catch (e) {
        return value;
      }
    } else {
      return value;
    }
  };
  return [
    {
      field: 'status',
      component: 'Switch',
      label: '状态',
      defaultValue: payChannelItem?.status || 2,
      componentProps: {
        disabled: !editable,
        checkedValue: 1,
        unCheckedValue: 2,
      },
    },
    {
      field: 'payChannelNameID',
      component: 'Select',
      label: '商户',
      defaultValue: payChannelNameList?.find((element) => {
        return element.name === payChannelItem?.name;
      })?.id,
      required: true,
      show: editable,
      colProps: {
        span: 11,
      },
      componentProps: {
        options: payChannelNameList?.map((element) => {
          return {
            label: element.name,
            value: element.id,
            key: element.id,
          };
        }),
      },
    },
    {
      field: 'payChannelName',
      component: 'Input',
      label: '商户名称',
      defaultValue: payChannelItem?.name || '',
      show: !editable,
      slot: 'span',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'createName',
      component: 'Input',
      label: '',
      defaultValue: false,
      slot: 'createName',
      show: editable,
      colProps: {
        span: 1,
      },
    },
    {
      field: 'sn',
      component: 'Input',
      label: '商户号',
      required: true,
      defaultValue: payChannelItem?.sn || '',
      slot: !editable ? 'span' : undefined,
      colProps: {
        span: 12,
      },
    },
    {
      field: 'settleStime',
      component: 'Input',
      label: '日切开始时间',
      defaultValue: payChannelItem?.settleStime || '00:00',
      show: false,
    },
    {
      field: 'settleEtime',
      component: 'Input',
      label: '日切结束时间',
      defaultValue: payChannelItem?.settleEtime || '00:00',
      show: false,
    },
    {
      field: 'settle',
      component: 'Input',
      label: '日切时间',
      slot: 'settle',
      colProps: {
        span: 12,
      },
      componentProps: {
        editable,
      },
    },
    {
      field: 'method',
      component: 'Select',
      label: '结帐方式',
      defaultValue: payChannelItem?.method || 0,
      colProps: {
        span: 12,
      },
      show: editable,
      componentProps: {
        options: [
          {
            label: 'T0',
            value: 0,
            key: 0,
          },
          {
            label: 'T1',
            value: 1,
            key: 1,
          },
          {
            label: 'D0',
            value: 2,
            key: 2,
          },
          {
            label: 'D1',
            value: 3,
            key: 3,
          },
        ],
      },
    },
    {
      field: 'methodName',
      component: 'Input',
      label: '结帐方式',
      defaultValue:
        payChannelItem?.method === 0
          ? 'T0'
          : payChannelItem?.method === 1
          ? 'T1'
          : payChannelItem?.method === 2
          ? 'D0'
          : payChannelItem?.method === 3
          ? 'D1'
          : '',
      slot: 'span',
      show: !editable,
      colProps: {
        span: 12,
      },
    },
    {
      field: 'depositLimit',
      component: 'Input',
      label: '存放上限',
      slot: !editable ? 'span' : undefined,
      defaultValue: payChannelItem?.depositLimit || '',
    },
    {
      field: 'notifyUrl',
      component: 'Input',
      label: '回调网址',
      slot: !editable ? 'span' : undefined,
      defaultValue: payChannelItem?.notifyUrl || '',
    },
    {
      field: 'note',
      component: 'InputTextArea',
      label: '备注',
      slot: !editable ? 'span' : undefined,
      defaultValue: payChannelItem?.note || '',
    },
    {
      field: 'supplyAp',
      component: 'Switch',
      label: '代付',
      defaultValue: payChannelItem?.supplyAp === true,
      componentProps: {
        disabled: !editable,
      },
    },
    {
      field: 'apLowerLimit',
      component: 'Input',
      label: '代付每笔下限',
      defaultValue: payChannelItem?.apLowerLimit || 0,
      show: false,
      componentProps: {
        type: 'number',
      },
    },
    {
      field: 'apUpperLimit',
      component: 'Input',
      label: '代付每笔上限',
      defaultValue: payChannelItem?.apUpperLimit || 0,
      show: false,
      componentProps: {
        type: 'number',
      },
    },
    {
      field: 'apLimit',
      component: 'Input',
      label: '单笔限额',
      slot: 'limit',
      helpMessage: '商户规定的上下限额',
      componentProps: {
        editable,
        lowerField: 'apLowerLimit',
        upperField: 'apUpperLimit',
      },
      show: (renderCallbackParams) => {
        return renderCallbackParams.values.supplyAp === true;
      },
    },
    {
      field: 'apDayLimit',
      component: 'Input',
      label: '预期每日上限',
      defaultValue: toLocaleString(payChannelItem?.apDayLimit || 0),
      slot: !editable ? 'span' : undefined,
      componentProps: {
        type: 'number',
      },
      show: (renderCallbackParams) => {
        return renderCallbackParams.values.supplyAp === true;
      },
    },
    {
      field: 'eighteenApLowerLimit',
      component: 'Input',
      label: '18单笔下限',
      defaultValue: payChannelItem?.eighteenApLowerLimit || 0,
      show: false,
      componentProps: {
        type: 'number',
      },
    },
    {
      field: 'eighteenApUpperLimit',
      component: 'Input',
      label: '18单笔上限',
      defaultValue: payChannelItem?.eighteenApUpperLimit || 0,
      show: false,
      componentProps: {
        type: 'number',
      },
    },
    {
      field: 'eighteenApLimit',
      component: 'Input',
      label: '18单笔上下限',
      slot: 'limit',
      helpMessage: '财务规定出款的上下限额',
      componentProps: {
        editable,
        lowerField: 'eighteenApLowerLimit',
        upperField: 'eighteenApUpperLimit',
      },
      show: (renderCallbackParams) => {
        return renderCallbackParams.values.supplyAp === true;
      },
    },
    {
      field: 'apFee',
      component: 'Input',
      label: '代付手续费，每千',
      defaultValue: payChannelItem?.apFee || 0,
      show: false,
      componentProps: {
        type: 'number',
      },
    },
    {
      field: 'apPerFee',
      component: 'Input',
      label: '代付手续费，每笔',
      defaultValue: payChannelItem?.apPerFee || 0,
      show: false,
      componentProps: {
        type: 'number',
      },
    },
    {
      field: 'apFeeField',
      component: 'Input',
      label: '手续费',
      slot: 'fee',
      componentProps: {
        editable,
        feeField: 'apFee',
        perFeeField: 'apPerFee',
      },
      show: (renderCallbackParams) => {
        return renderCallbackParams.values.supplyAp === true;
      },
    },
    {
      field: 'supplySp',
      component: 'Switch',
      label: '结算',
      defaultValue: spLowerLimit > 0 || spUpperLimit > 0 || spFee > 0 || spPerFee > 0,
      componentProps: {
        disabled: !editable,
      },
    },
    {
      field: 'spLowerLimit',
      component: 'Input',
      label: '结算每笔下限',
      defaultValue: spLowerLimit,
      show: false,
      componentProps: {
        type: 'number',
      },
    },
    {
      field: 'spUpperLimit',
      component: 'Input',
      label: '结算每笔上限',
      defaultValue: spUpperLimit,
      show: false,
      componentProps: {
        type: 'number',
      },
    },
    {
      field: 'spLimit',
      component: 'Input',
      label: '单笔限额',
      slot: 'limit',
      componentProps: {
        editable,
        lowerField: 'spLowerLimit',
        upperField: 'spUpperLimit',
      },
      show: (renderCallbackParams) => {
        return renderCallbackParams.values.supplySp === true;
      },
    },
    {
      field: 'spFee',
      component: 'Input',
      label: '结算手续费，每千',
      defaultValue: spFee,
      show: false,
      componentProps: {
        type: 'number',
      },
    },
    {
      field: 'spPerFee',
      component: 'Input',
      label: '结算手续费，每笔',
      defaultValue: spPerFee,
      show: false,
      componentProps: {
        type: 'number',
      },
    },
    {
      field: 'spFeeField',
      component: 'Input',
      label: '手续费',
      slot: 'fee',
      componentProps: {
        editable,
        feeField: 'spFee',
        perFeeField: 'spPerFee',
      },
      show: (renderCallbackParams) => {
        return renderCallbackParams.values.supplySp === true;
      },
    },
    {
      field: 'supplyDeposit',
      component: 'Switch',
      label: '充值',
      defaultValue:
        depositLowerLimit > 0 || depositUpperLimit > 0 || depositFee > 0 || depositPerFee > 0,
      componentProps: {
        disabled: !editable,
      },
    },
    {
      field: 'depositLowerLimit',
      component: 'Input',
      label: '充值每笔下限',
      defaultValue: depositLowerLimit,
      show: false,
      componentProps: {
        type: 'number',
      },
    },
    {
      field: 'depositUpperLimit',
      component: 'Input',
      label: '充值每笔上限',
      defaultValue: depositUpperLimit,
      show: false,
      componentProps: {
        type: 'number',
      },
    },
    {
      field: 'depositLimit',
      component: 'Input',
      label: '单笔限额',
      slot: 'limit',
      componentProps: {
        editable,
        lowerField: 'depositLowerLimit',
        upperField: 'depositUpperLimit',
      },
      show: (renderCallbackParams) => {
        return renderCallbackParams.values.supplyDeposit === true;
      },
    },
    {
      field: 'depositFee',
      component: 'Input',
      label: '充值手续费，每千',
      defaultValue: depositFee,
      show: false,
      componentProps: {
        type: 'number',
      },
    },
    {
      field: 'depositPerFee',
      component: 'Input',
      label: '充值手续费，每笔',
      defaultValue: depositPerFee,
      show: false,
      componentProps: {
        type: 'number',
      },
    },
    {
      field: 'depositFeeField',
      component: 'Input',
      label: '手续费',
      slot: 'fee',
      componentProps: {
        editable,
        feeField: 'depositFee',
        perFeeField: 'depositPerFee',
      },
      show: (renderCallbackParams) => {
        return renderCallbackParams.values.supplyDeposit === true;
      },
    },
  ];
};

/**
 * Create name form schemas
 */
export const createNameSchemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '商户',
    required: true,
  },
];

/**
 * Frozen add form schemas
 */
export const frozenAddSchemas: FormSchema[] = [
  {
    field: 'amount',
    component: 'Input',
    label: '金额',
    required: true,
    componentProps: {
      type: 'number',
    },
  },
  {
    field: 'note',
    component: 'InputTextArea',
    label: '备注',
  },
];

/**
 * Frozen sub form schemas
 */
export const frozenSubSchemas: FormSchema[] = [
  {
    field: 'amount',
    component: 'Input',
    label: '金额',
    required: true,
    componentProps: {
      type: 'number',
    },
  },
  {
    field: 'note',
    component: 'InputTextArea',
    label: '备注',
  },
];

/**
 * Remain add form schemas
 */
export const remainAddSchemas: FormSchema[] = [
  {
    field: 'targetSN',
    component: 'Input',
    label: '从银行卡号 / 商户号',
    slot: 'targetSN',
  },
  {
    field: 'targetID',
    component: 'Input',
    label: '从银行卡号 / 商户号',
    slot: 'targetID',
    defaultValue: undefined,
    show: false,
  },
  {
    field: 'targetType',
    component: 'Input',
    label: '類型 1:銀行卡 2:商戶號',
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
    field: 'bankName',
    component: 'Input',
    label: '商户',
    slot: 'span',
    defaultValue: undefined,
    ifShow: (params) => {
      return params.values.bankName !== undefined;
    },
  },
  {
    field: 'bankcardType',
    component: 'Input',
    label: '銀行卡類型',
    slot: 'span',
    defaultValue: undefined,
    show: false,
  },
  {
    field: 'accountName',
    component: 'Input',
    label: '户名',
    slot: 'accountName',
    defaultValue: undefined,
    ifShow: (params) => {
      return params.values.accountName !== undefined;
    },
  },
  {
    field: 'amount',
    component: 'Input',
    label: '金额',
    required: true,
    componentProps: {
      type: 'number',
    },
  },
  {
    field: 'fee',
    component: 'Input',
    label: '手续费',
    componentProps: {
      type: 'number',
    },
  },
  {
    field: 'thirdID',
    component: 'Input',
    label: '三方单号',
  },
  {
    field: 'note',
    component: 'InputTextArea',
    label: '备注',
  },
];

/**
 * Remain sub form schemas
 */
export const remainSubSchemas: FormSchema[] = [
  {
    field: 'amount',
    component: 'Input',
    label: '金额',
    required: true,
    componentProps: {
      type: 'number',
    },
  },
  {
    field: 'targetSN',
    component: 'Input',
    label: '银行卡号 / 商户号',
    slot: 'targetSN',
  },
  {
    field: 'targetID',
    component: 'Input',
    label: '银行卡号 / 商户号',
    slot: 'targetID',
    defaultValue: undefined,
    show: false,
  },
  {
    field: 'targetType',
    component: 'Input',
    label: '類型 1:銀行卡 2:商戶號',
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
    field: 'bankName',
    component: 'Input',
    label: '商户',
    slot: 'span',
    defaultValue: undefined,
    ifShow: (params) => {
      return params.values.bankName !== undefined;
    },
  },
  {
    field: 'bankcardType',
    component: 'Input',
    label: '銀行卡類型',
    slot: 'span',
    defaultValue: undefined,
    show: false,
  },
  {
    field: 'accountName',
    component: 'Input',
    label: '户名',
    slot: 'accountName',
    defaultValue: undefined,
    ifShow: (params) => {
      return params.values.accountName !== undefined;
    },
  },
  {
    field: 'fee',
    component: 'Input',
    label: '手续费',
    componentProps: {
      type: 'number',
    },
  },
  {
    field: 'thirdID',
    component: 'Input',
    label: '三方单号',
  },
  {
    field: 'note',
    component: 'InputTextArea',
    label: '备注',
  },
];
