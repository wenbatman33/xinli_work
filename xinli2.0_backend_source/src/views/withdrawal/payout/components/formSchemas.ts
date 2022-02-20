import { DescItem } from '/@/components/Description';

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
    field: 'status',
    label: '状态',
  },
  {
    field: 'member',
    label: '会员帐号',
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
