import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import { FormSchema } from '/@/components/Form';
import { DescItem } from '/@/components/Description';
import { WithdrawalItem } from '/@/api/cashflow/model/withdrawalModel';
import moment from 'moment';

/**
 * Withdrawal description schemas
 */
export const withdrawalDescriptionSchemas: DescItem[] = [
  {
    field: 'transactionID',
    label: '提款单号',
  },
  {
    field: 'lastUpdate',
    label: '提款申请时间',
  },
  {
    field: 'amount',
    label: '提款金额',
    render: (data) => {
      try {
        return Number(data || '0').toLocaleString();
      } catch (e) {
        return data;
      }
    },
  },
  {
    field: 'status.value',
    label: '状态',
  },
  {
    field: 'member.value.account',
    label: '会员帐号',
    render: (data, record) => {
      return h(
        'a',
        {
          href: `/memberDetail/detail/${record?.member?.key || 0}`,
          target: '_blank',
        },
        data
      );
    },
  },
  {
    field: 'bankAccount',
    label: '户名',
  },
  {
    field: 'memberBankNo',
    label: '银行帐户',
  },
  {
    field: 'bankCode',
    label: '银行',
  },
];

/**
 * Member info description schemas
 */
export const memberInfoDescriptionSchemas: DescItem[] = [
  {
    field: 'bankGroup',
    label: '银行卡金流组别',
    render: (data) => {
      return !data ? '' : h(
        Tag,
        {
          style: {
            color: '#E658C2',
            border: `1px solid #E658C2`,
            background: '#00000000',
            whiteSpace: 'pre-wrap',
            display: data ? data.value : 'none',
          },
        },
        () => data.value
      );
    },
  },
  {
    field: 'thirdGroup',
    label: '三方金流组别',
    render: (data) => {
      return !data ? '' : h(
        Tag,
        {
          style: {
            color: '#E658C2',
            border: `1px solid #E658C2`,
            background: '#00000000',
            whiteSpace: 'pre-wrap',
            display: data ? data.value : 'none',
          },
        },
        () => data.value
      );
    },
  },
  {
    field: 'vip',
    label: 'VIP',
    render: (data) => {
      return h(
        Tag,
        {
          style: {
            color: '#E658C2',
            border: `1px solid #E658C2`,
            background: '#00000000',
            whiteSpace: 'pre-wrap',
            display: data ? undefined : 'none',
          },
        },
        () => `VIP${data}`
      );
    },
  },
  {
    field: 'withdrawalStatus',
    label: '提款状态',
    render: (data) => {
      return data
        ? h(Icon, {
            icon: 'ion:checkmark-circle-outline',
            color: '#01A39D',
          })
        : h(Icon, {
            icon: 'ion:close-circle-outline',
            color: '#F00',
          })
    },
  },
  {
    field: 'limitLower',
    label: '单笔提款限额',
    render: (_, record) => {
      let lower = record?.limitLower || '0';
      let upper = record?.limitUpper || '0';
      try {
        lower = Number(record?.limitLower || '0').toLocaleString();
        upper = Number(record?.limitUpper || '0').toLocaleString();
      } catch (e) {}
      return h(
        'div',
        {
          class: 'flex flex-row items-center',
        },
        record?.limitStatus
          ? [
              h('span', {}, `${lower}~${upper}`),
              h(Icon, {
                class: 'ml-1',
                icon: 'ion:checkmark-circle-outline',
                color: '#01A39D',
              }),
            ]
          : h('span', {}, `${lower}~${upper}`)
      );
    },
  },
  {
    field: 'dayUpper',
    label: '单日提款上限',
    render: (_, record) => {
      let upper = record?.dayUpper || '0';
      try {
        upper = Number(record?.dayUpper || '0').toLocaleString();
      } catch (e) {}
      return h(
        'div',
        {
          class: 'flex flex-row items-center',
        },
        record?.dayUpperStatus
          ? [
              h('span', {}, upper),
              h(Icon, {
                class: 'ml-1',
                icon: 'ion:checkmark-circle-outline',
                color: '#01A39D',
              }),
            ]
          : h('span', {}, upper)
      );
    },
  },
  {
    field: 'todayDepositAmount',
    label: '今日存款',
    render: (data) => {
      try {
        return Number(data || '0').toLocaleString();
      } catch (e) {
        return data;
      }
    }
  },
  {
    field: 'spread',
    label: '今日存提差',
    render: (data) => {
      try {
        return Number(data || '0').toLocaleString();
      } catch (e) {
        return data;
      }
    }
  },
  {
    field: 'money',
    label: '钱包总额',
    render: (data) => {
      try {
        return Number(data || '0').toLocaleString();
      } catch (e) {
        return data;
      }
    }
  },
  {
    field: 'lockMoney',
    label: '冻结金额',
    render: (data) => {
      try {
        return Number(data || '0').toLocaleString();
      } catch (e) {
        return data;
      }
    }
  },
  {
    field: 'todayWithdrawalAmount',
    label: '今日提款',
    render: (data) => {
      try {
        return Number(data || '0').toLocaleString();
      } catch (e) {
        return data;
      }
    }
  },
];

/**
 * Stake form schemas
 */
export const stakeSchemas: FormSchema[] = [
  {
    show: false,
    field: 'intervalStart',
    component: 'Input',
    label: '流水区间 start',
    defaultValue: moment()
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    show: false,
    field: 'intervalEnd',
    component: 'Input',
    label: '流水区间 end',
    defaultValue: moment()
      .set('hour', 23)
      .set('minute', 59)
      .set('second', 59)
      .format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    field: 'interval',
    component: 'Input',
    label: '流水区间',
    subLabel: 'Stake Calculation Interval',
    slot: 'date',
    colProps: {
      span: 12,
      style: {
        paddingRight: '24px',
      },
    },
    componentProps: {
      start: 'intervalStart',
      end: 'intervalEnd',
    },
  },
  {
    field: 'required',
    component: 'Input',
    label: '所需流水',
    slot: 'span',
    defaultValue: '-',
    colProps: {
      span: 4,
    },
  },
  {
    field: 'current',
    component: 'Input',
    label: '目前流水',
    slot: 'span',
    defaultValue: '-',
    colProps: {
      span: 4,
    },
  },
  {
    field: 'gap',
    component: 'Input',
    label: '流水差',
    slot: 'span',
    defaultValue: '-',
    colProps: {
      span: 4,
    },
  },
];

/**
 * Withdrawal form schemas
 */
export const withdrawalSchemas: FormSchema[] = [
  {
    field: 'memberAccount',
    component: 'Input',
    label: '会员帐号',
    subLabel: 'MemberAC',
    colProps: {
      span: 9,
      style: {
        paddingRight: '12px',
      },
    },
    componentProps: {
      placeholder: '输入会员帐号',
    },
  },
  {
    field: 'status',
    component: 'Select',
    label: '状态',
    subLabel: 'Status',
    defaultValue: 1,
    colProps: {
      span: 9,
      style: {
        paddingLeft: '12px',
      },
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
];

/**
 * Reject form schemas
 */
export const rejectSchemas = (record?: WithdrawalItem): FormSchema[] => {
  return [
    {
      field: 'transactionID',
      component: 'Input',
      label: '提款单号',
      slot: 'span',
      defaultValue: record?.transactionID,
    },
    {
      field: 'amount',
      component: 'Input',
      label: '提款金额',
      slot: 'span',
      defaultValue: record?.amount,
    },
    {
      field: 'transactionTime',
      component: 'Input',
      label: '提款申请时间',
      slot: 'span',
      defaultValue: record?.transactionTime,
    },
    {
      required: true,
      field: 'note',
      component: 'InputTextArea',
      label: '說明',
    },
  ];
};

/**
 * Submit risk form schemas
 */
export const submitRiskSchemas = (record?: WithdrawalItem): FormSchema[] => {
  return [
    {
      field: 'transactionID',
      component: 'Input',
      label: '提款单号',
      slot: 'span',
      defaultValue: record?.transactionID,
    },
    {
      field: 'amount',
      component: 'Input',
      label: '提款金额',
      slot: 'span',
      defaultValue: record?.amount,
    },
    {
      field: 'transactionTime',
      component: 'Input',
      label: '提款申请时间',
      slot: 'span',
      defaultValue: record?.transactionTime,
    },
    {
      required: true,
      field: 'note',
      component: 'InputTextArea',
      label: '說明',
    },
  ];
};

/**
 * Pass form schemas
 */
export const passSchemas = (record?: WithdrawalItem): FormSchema[] => {
  return [
    {
      field: 'transactionID',
      component: 'Input',
      label: '提款单号',
      slot: 'span',
      defaultValue: record?.transactionID,
    },
    {
      field: 'amount',
      component: 'Input',
      label: '提款金额',
      slot: 'span',
      defaultValue: record?.amount,
    },
    {
      field: 'transactionTime',
      component: 'Input',
      label: '提款申请时间',
      slot: 'span',
      defaultValue: record?.transactionTime,
    },
    {
      field: 'status',
      component: 'Input',
      label: '状态',
      slot: 'span',
      defaultValue: record?.status?.value,
    },
    {
      required: true,
      field: 'note',
      component: 'InputTextArea',
      label: '說明',
    },
  ];
};
