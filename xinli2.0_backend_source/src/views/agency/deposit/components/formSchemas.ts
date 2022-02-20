import { FormSchema } from '/@/components/Form';
import {
  PostDepositData,
  PutDepositBalanceDateData,
  DepositItem,
} from '/@/api/cashflow/model/depositModel';
// import { GetPayGroupsResponse } from '/@/api/payment/model/payGroupModel';
import { GetServiceResponse, DropdownItem } from '/@/api/payment/model/payChannelServiceModel';
import { PayChannelItem, PayChannelNameItem } from '/@/api/payment/model/payChannelModel';
import moment from 'moment';

/**
 * Deposit form schemas
 * @param method 存款方式列表
 * @param payGroups 三方金流群組列表
 * @param bankcardGroups 存款卡金流群組列表
 * @param payChannels 商戶號列表
 * @param payChannelNames 商戶列表
 * @returns Basic form schemas
 */
export const depositSchemas = (
  method: DropdownItem[],
  // payGroups: GetPayGroupsResponse[],
  // bankcardGroups: GetPayGroupsResponse[],
  payChannels: PayChannelItem[],
  payChannelNames: PayChannelNameItem[]
): FormSchema[] => {
  return [
    {
      show: false,
      field: 'createdAtStart',
      component: 'Input',
      label: '存款时间 start',
      defaultValue: moment()
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0)
        .format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      show: false,
      field: 'createdAtEnd',
      component: 'Input',
      label: '存款时间 end',
      defaultValue: moment()
        .set('hour', 23)
        .set('minute', 59)
        .set('second', 59)
        .format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      isAdvanced: false,
      field: 'createdAt',
      component: 'Input',
      label: '存款时间',
      subLabel: 'TransactionTime',
      slot: 'date',
      componentProps: {
        start: 'createdAtStart',
        end: 'createdAtEnd',
      },
      colProps: {
        span: 9,
      },
    },
    {
      isAdvanced: false,
      field: 'status',
      component: 'Select',
      label: '状态',
      subLabel: 'Status',
      defaultValue: 0,
      colProps: {
        span: 3,
      },
      componentProps: {
        options: [
          {
            label: '全部',
            value: 0,
            key: 0,
          },
          {
            label: '处理中 progressing',
            value: 1,
            key: 1,
          },
          {
            label: '失败 Fail',
            value: 2,
            key: 2,
          },
          {
            label: '完成 Success',
            value: 3,
            key: 3,
          },
        ],
      },
    },
    {
      isAdvanced: false,
      field: 'id',
      component: 'Input',
      label: '单号',
      subLabel: 'TransactionID',
      colProps: {
        span: 3,
      },
    },
    {
      isAdvanced: false,
      field: 'method',
      component: 'Select',
      label: '存款方式',
      subLabel: 'Payment',
      defaultValue: '',
      colProps: {
        span: 3,
      },
      componentProps: {
        options: [
          {
            label: '全部',
            value: '',
            key: '',
          },
        ].concat(
          method.map((element) => {
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
      isAdvanced: false,
      field: 'memberName',
      component: 'Input',
      label: '代理帐号',
      subLabel: 'AgencyAC',
      colProps: {
        span: 3,
      },
    },
    {
      isAdvanced: false,
      field: 'serviceName',
      component: 'Input',
      label: '线路',
      subLabel: 'Gateway',
      colProps: {
        span: 3,
      },
    },
    {
      isAdvanced: true,
      field: 'type',
      component: 'Select',
      label: '到帐方式',
      subLabel: 'BalanceType',
      defaultValue: 0,
      colProps: {
        span: 2,
      },
      componentProps: {
        options: [
          {
            label: '全部',
            value: 0,
            key: 0,
          },
          {
            label: '系统',
            value: 1,
            key: 1,
          },
          {
            label: '手动',
            value: 2,
            key: 2,
          },
          {
            label: '代理',
            value: 4,
            key: 4,
          },
        ],
      },
    },
    {
      isAdvanced: true,
      field: 'payChannelID',
      component: 'Select',
      label: '商户号',
      defaultValue: Number.MIN_VALUE,
      colProps: {
        span: 2,
      },
      componentProps: {
        options: [
          {
            label: '全部',
            value: Number.MIN_VALUE,
            key: Number.MIN_VALUE,
          },
        ].concat(
          payChannels.map((element) => {
            return {
              label: element.sn || '',
              value: element.id || 0,
              key: element.id || 0,
            };
          })
        ),
      },
    },
    {
      isAdvanced: true,
      field: 'payChannelNameID',
      component: 'Select',
      label: '商户',
      defaultValue: Number.MIN_VALUE,
      colProps: {
        span: 2,
      },
      componentProps: {
        options: [
          {
            label: '全部',
            value: Number.MIN_VALUE,
            key: Number.MIN_VALUE,
          },
        ].concat(
          payChannelNames.map((element) => {
            return {
              label: element.name || '',
              value: element.id || 0,
              key: element.id || 0,
            };
          })
        ),
      },
    },
    {
      isAdvanced: true,
      field: 'bankno',
      component: 'Input',
      label: '银行卡号',
      subLabel: 'BankNo',
      colProps: {
        span: 2,
      },
    },
    {
      show: false,
      field: 'updateAtStart',
      component: 'Input',
      label: '最后更新时间 start',
      defaultValue: undefined,
    },
    {
      show: false,
      field: 'updateAtEnd',
      component: 'Input',
      label: '最后更新时间 end',
      defaultValue: undefined,
    },
    {
      isAdvanced: true,
      field: 'updateAt',
      component: 'Input',
      label: '最后更新时间',
      subLabel: 'UPDATE',
      slot: 'date',
      componentProps: {
        start: 'updateAtStart',
        end: 'updateAtEnd',
      },
      colProps: {
        span: 8,
      },
    },
    {
      isAdvanced: true,
      field: 'balanceDate',
      component: 'Input',
      label: '入帐日期',
      slot: 'balanceDate',
      subLabel: 'BalanceDate',
      defaultValue: undefined,
      colProps: {
        span: 2,
      },
    },
  ];
};

/**
 * Create form schemas
 * @param payChannelServices 線路列表
 * @returns Basic form schemas
 */
export const createSchemas = (payChannelServices: GetServiceResponse[]): FormSchema[] => {
  return [
    {
      required: true,
      field: 'memberAccount',
      component: 'Input',
      label: '代理帐号',
      subLabel: 'AgencyAC',
      colProps: {
        span: 12,
      },
    },
    {
      required: true,
      field: 'balanceDate',
      component: 'Input',
      label: '入帐时间',
      subLabel: 'BalanceTime',
      slot: 'date',
      defaultValue: undefined,
      colProps: {
        span: 12,
      },
    },
    {
      required: true,
      field: 'amount',
      component: 'Input',
      label: '存款金额',
      subLabel: 'Amount',
      colProps: {
        span: 12,
      },
      rules: [
        {
          required: true,
        },
        {
          pattern: /^[\d.]+$/,
          message: '存款金额必须是正数',
        },
        {
          pattern: /^(?!^0+$).*$/,
          message: '存款金额必须是正数',
        },
      ],
      componentProps: {
        type: 'number',
      },
    },
    {
      required: true,
      field: 'thirdID',
      component: 'Input',
      label: '三方单号',
      subLabel: 'ThirdPartyID',
      colProps: {
        span: 12,
      },
    },
    {
      required: true,
      field: 'payChannelServiceID',
      component: 'Select',
      label: '线路',
      subLabel: 'Gateway',
      colProps: {
        span: 12,
      },
      componentProps: {
        options: payChannelServices.map((element) => {
          return {
            label: element.name,
            value: element.id,
            key: element.id,
          };
        }),
      },
    },
    {
      required: true,
      field: 'fee',
      component: 'Input',
      label: '交易手续费',
      subLabel: 'Fee',
      slot: 'fee',
      colProps: {
        span: 12,
      },
      rules: [
        {
          required: true,
        },
        {
          pattern: /^[\d.]+$/,
          message: '交易手续费必须是正数',
        },
      ],
    },
    {
      required: true,
      field: 'notePrefix',
      component: 'RadioGroup',
      label: ' ',
      colProps: {
        span: 24,
      },
      componentProps: {
        options: [
          {
            label: '存款金额错误Amount Revise',
            value: '存款金额错误Amount Revise',
            key: '存款金额错误Amount Revise',
          },
          {
            label: '存款线路错误Gateway Revise',
            value: '存款线路错误Gateway Revise',
            key: '存款线路错误Gateway Revise',
          },
          {
            label: '客户服务Customer Service',
            value: '客户服务Customer Service',
            key: '客户服务Customer Service',
          },
          {
            label: '其他Others',
            value: '其他Others',
            key: '其他Others',
          },
        ],
      },
    },
    {
      required: true,
      field: 'noteSuffix',
      component: 'InputTextArea',
      label: '备注说明',
      subLabel: 'Description',
      colProps: {
        span: 24,
      },
    },
  ];
};

/**
 * Create otp form schemas
 * @param postData Post data
 * @param payChannelServices 線路列表
 * @returns Basic form schemas
 */
export const createOtpSchemas = (
  postData: PostDepositData,
  payChannelServices: GetServiceResponse[]
): FormSchema[] => {
  return [
    {
      field: 'amount',
      component: 'Input',
      label: '存款金额',
      defaultValue: postData.amount,
      slot: 'span',
    },
    {
      field: 'payChannelService',
      component: 'Input',
      label: '线路',
      defaultValue: payChannelServices.find((element) => {
        return String(element.id) === String(postData.payChannelServiceID);
      })?.name,
      slot: 'span',
    },
    {
      field: 'balanceDate',
      component: 'Input',
      label: '入帐日期',
      defaultValue: postData.balanceDate,
      slot: 'balanceDate',
    },
    {
      required: true,
      field: 'otp',
      component: 'Input',
      label: 'OTP 验证',
    },
  ];
};

/**
 * Balance date form schemas
 * @param record Deposit record
 * @param payChannelServices 線路列表
 * @returns Basic form schemas
 */
export const balanceDateSchemas = (
  record: DepositItem,
  payChannelServices: GetServiceResponse[]
): FormSchema[] => {
  return [
    {
      field: 'memberAccount',
      component: 'Input',
      label: '代理帐号',
      subLabel: 'AgencyAC',
      slot: 'span',
      defaultValue: record.memberAccount,
      colProps: {
        span: 12,
      },
    },
    {
      field: 'createdAt',
      component: 'Input',
      label: '存款时间',
      subLabel: 'TransactionTime',
      slot: 'createAt',
      defaultValue: record.createdAt,
      colProps: {
        span: 12,
      },
    },
    {
      field: 'amount',
      component: 'Input',
      label: '存款金额',
      subLabel: 'Amount',
      defaultValue: record.amount,
      slot: 'span',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'thirdID',
      component: 'Input',
      label: '三方单号',
      subLabel: 'ThirdPartyID',
      defaultValue: record.thirdID,
      slot: 'span',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'gatway',
      component: 'Input',
      label: '线路',
      subLabel: 'Gateway',
      slot: 'span',
      defaultValue:
        payChannelServices.find((element) => {
          return String(element.id) === String(record.gatway);
        })?.name ||
        record.gatway ||
        '',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'id',
      component: 'Input',
      label: '存款单号',
      subLabel: 'TransactionID',
      defaultValue: record.id,
      slot: 'span',
      colProps: {
        span: 12,
      },
    },
    {
      required: true,
      field: 'balanceDate',
      component: 'Input',
      label: '调整内容',
      subLabel: '入帳日期',
      slot: 'date',
      defaultValue: moment().format('YYYY-MM-DD'),
      colProps: {
        span: 24,
      },
    },
    {
      required: true,
      field: 'note',
      component: 'InputTextArea',
      label: '备注说明',
      subLabel: 'Description',
      colProps: {
        span: 24,
      },
    },
  ];
};

/**
 * Balance date confirm form schemas
 * @param record Deposit record
 * @param putData Put request body data
 * @returns Basic form schemas
 */
export const balanceDateConfirmSchemas = (
  record: DepositItem,
  putData: PutDepositBalanceDateData
): FormSchema[] => {
  return [
    {
      field: 'amount',
      component: 'Input',
      label: '存款金额',
      defaultValue: record.amount,
      slot: 'span',
    },
    {
      field: 'id',
      component: 'Input',
      label: '存款单号',
      defaultValue: record.id,
      slot: 'span',
    },
    {
      field: 'balanceDate',
      component: 'Input',
      label: '入帐日期',
      defaultValue: putData.balanceDate,
      slot: 'balanceDate',
    },
  ];
};

/**
 * Note form schemas
 */
export const noteSchemas: FormSchema[] = [
  {
    required: true,
    field: 'note',
    component: 'InputTextArea',
    label: '备注说明',
    subLabel: 'Description',
    colProps: {
      span: 24,
    },
    componentProps: {
      rows: 10,
    },
  },
];
