import { FormSchema } from '/@/components/Form';
import { BankList } from '/@/api/payment/model/payBankCardModel';
import { GetPayGroupsResponse } from '/@/api/payment/model/payGroupModel';
import moment from 'moment';

/**
 * Withdrawal form schemas
 * @param banks 銀行列表
 * @param payGroups 三方金流群組列表
 * @param bankcardGroups 存款卡金流群組列表
 */
export const withdrawalSchemas = (
  banks: BankList[],
  payGroups: GetPayGroupsResponse[],
  bankcardGroups: GetPayGroupsResponse[]
): FormSchema[] => {
  return [
    {
      show: false,
      field: 'withdrawalStart',
      component: 'Input',
      label: '提款时间 start',
      defaultValue: moment()
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0)
        .format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      show: false,
      field: 'withdrawalEnd',
      component: 'Input',
      label: '提款时间 end',
      defaultValue: moment()
        .set('hour', 23)
        .set('minute', 59)
        .set('second', 59)
        .format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      isAdvanced: false,
      field: 'withdrawalTime',
      component: 'Input',
      label: '提款时间',
      subLabel: 'TransactionTime',
      slot: 'date',
      componentProps: {
        start: 'withdrawalStart',
        end: 'withdrawalEnd',
      },
      colProps: {
        span: 9,
      },
    },
    {
      isAdvanced: false,
      field: 'memberAccount',
      component: 'Input',
      label: '会员帐号',
      subLabel: 'MemberID',
      colProps: {
        span: 4,
      },
      componentProps: {
        placeholder: '输入会员帐号',
      },
    },
    {
      isAdvanced: false,
      field: 'orderSn',
      component: 'Input',
      label: '单号',
      subLabel: 'TransactionID',
      colProps: {
        span: 4,
      },
      componentProps: {
        placeholder: '请输入提款单号或三方单号',
      },
    },
    {
      isAdvanced: false,
      field: 'status',
      component: 'Select',
      label: '状态',
      subLabel: 'Status',
      defaultValue: Number.MIN_VALUE,
      colProps: {
        span: 3,
      },
      componentProps: {
        options: [
          {
            label: '全部',
            value: Number.MIN_VALUE,
            key: Number.MIN_VALUE,
          },
          {
            label: '待审核 review',
            value: 1,
            key: 1,
          },
          {
            label: '待出款 Ｗait',
            value: 2,
            key: 2,
          },
          {
            label: '退回 reject',
            value: 3,
            key: 3,
          },
          {
            label: '出款中 Paying',
            value: 4,
            key: 4,
          },
          {
            label: '完成 Success',
            value: 5,
            key: 5,
          },
          {
            label: '出款失败 fail',
            value: 6,
            key: 6,
          },
        ],
      },
    },
    {
      isAdvanced: false,
      field: 'withdrawalName',
      component: 'Input',
      label: '户名',
      subLabel: 'TransactionID',
      colProps: {
        span: 4,
      },
      componentProps: {
        placeholder: '请输入户名',
      },
    },
    {
      isAdvanced: true,
      field: 'bankName',
      component: 'Select',
      label: '提款银行',
      subLabel: 'Bank',
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
          ...banks.map((element) => {
            return {
              label: element.bankName,
              value: element.bankName,
              key: element.bankName,
            };
          }),
        ],
      },
    },
    {
      isAdvanced: true,
      field: 'bankcardNo',
      component: 'Input',
      label: '卡号',
      colProps: {
        span: 4,
      },
      componentProps: {
        placeholder: '请输入卡号',
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
      field: 'riskCheck',
      component: 'Select',
      label: '风控查核',
      subLabel: 'RiskStatus',
      defaultValue: Number.MIN_VALUE,
      colProps: {
        span: 3,
      },
      componentProps: {
        options: [
          {
            label: '全部',
            value: Number.MIN_VALUE,
            key: Number.MIN_VALUE,
          },
          {
            label: '待审核 review',
            value: 1,
            key: 1,
          },
          {
            label: '退回 reject',
            value: 2,
            key: 2,
          },
          {
            label: '完成 success',
            value: 3,
            key: 3,
          },
          {
            label: '不用审核',
            value: 4,
            key: 4,
          },
        ],
      },
    },
    {
      isAdvanced: true,
      field: 'payGroupID',
      component: 'Select',
      label: '三方金流组别',
      subLabel: 'Group',
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
      isAdvanced: true,
      field: 'bankcardGroupID',
      component: 'Select',
      label: '银行卡金流组别',
      subLabel: 'Group',
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

/**
 * Risk check form schemas
 */
export const riskCheckSchemas: FormSchema[] = [
  {
    required: true,
    field: 'status',
    component: 'Select',
    label: '审核结果',
    componentProps: {
      options: [
        {
          label: '通过',
          value: 3,
          key: 3,
        },
        {
          label: '退回',
          value: 2,
          key: 2,
        },
      ],
    },
  },
  {
    required: true,
    field: 'note',
    component: 'InputTextArea',
    label: '說明',
  },
];

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
