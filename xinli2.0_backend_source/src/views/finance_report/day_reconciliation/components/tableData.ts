import { BasicColumn } from '/@/components/Table/src/types/table';

/**
 * Member report
 */
export const tableColumn: BasicColumn[] = [
  {
    title: 'serviceCode',
    dataIndex: 'serviceCode',
  },
  {
    title: '系统馀额（开始时间馀额）',
    dataIndex: 'startingSystemBalance',
    format: (_text, record) => {
      try {
        return Number(record.startingSystemBalance || '0').toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } catch (e) {
        return record.startingSystemBalance;
      }
    },
  },
  {
    title: '代收金额',
    dataIndex: 'depositAmount',
    format: (_text, record) => {
      try {
        return Number(record.depositAmount || '0').toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } catch (e) {
        return record.depositAmount;
      }
    },
  },
  {
    title: '代付金额',
    dataIndex: 'payoutAmount',
    format: (_text, record) => {
      try {
        return Number(record.payoutAmount || '0').toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } catch (e) {
        return record.payoutAmount;
      }
    },
  },
  {
    title: '代付笔数',
    dataIndex: 'payoutNum',
    width: 80,
  },
  {
    title: '下发金额',
    dataIndex: 'settlementUAmount',
    format: (_text, record) => {
      try {
        return Number(record.settlementUAmount || '0').toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } catch (e) {
        return record.settlementUAmount;
      }
    },
  },
  {
    title: '下发笔数',
    dataIndex: 'settlementUNum',
    width: 80,
  },
  {
    title: '商户号冻结',
    dataIndex: 'frozenAmount',
    format: (_text, record) => {
      try {
        return Number(record.frozenAmount || '0').toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } catch (e) {
        return record.frozenAmount;
      }
    },
  },
  {
    title: '系统馀额（结束时间馀额）',
    dataIndex: 'endingSystemBalance',
    format: (_text, record) => {
      try {
        return Number(record.endingSystemBalance || '0').toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } catch (e) {
        return record.endingSystemBalance;
      }
    },
  },
  {
    title: '三方馀额（结束时间馀额）',
    dataIndex: 'endingChannelBalance',
    format: (_text, record) => {
      try {
        return Number(record.endingChannelBalance || '0').toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } catch (e) {
        return record.endingChannelBalance;
      }
    },
  },
  {
    title: '差额',
    dataIndex: 'endingBalanceDiff',
    format: (_text, record) => {
      try {
        return Number(record.endingBalanceDiff || '0').toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } catch (e) {
        return record.endingBalanceDiff;
      }
    },
  },
  {
    title: '备注',
    dataIndex: 'note',
    edit: true,
  },
];
