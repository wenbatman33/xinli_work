import { BasicColumn } from '/@/components/Table/src/types/table';

/**
 * Member report
 */
export const memberReportColumns: BasicColumn[] = [
  {
    title: '会员帐号',
    dataIndex: 'memberName',
    slots: {
      customRender: 'memberName',
    },
  },
  {
    title: '存款金额',
    dataIndex: 'amount',
    format: (_text, record) => {
      try {
        return Number(record.amount || '0').toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } catch (e) {
        return record.amount;
      }
    },
  },
  {
    title: '单笔最高金额',
    dataIndex: 'maxAmount',
    format: (_text, record) => {
      try {
        return Number(record.maxAmount || '0').toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } catch (e) {
        return record.maxAmount;
      }
    },
  },
  {
    title: '单笔最小金额',
    dataIndex: 'minAmount',
    format: (_text, record) => {
      try {
        return Number(record.minAmount || '0').toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } catch (e) {
        return record.minAmount;
      }
    },
  },
  {
    title: '平均每次存款金额',
    dataIndex: 'avgAmount',
    format: (_text, record) => {
      try {
        return Number(record.avgAmount || '0').toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } catch (e) {
        return record.avgAmount;
      }
    },
  },
  {
    title: '平均每日存款金额',
    dataIndex: 'dayAvgAmount',
    format: (_text, record) => {
      try {
        return Number(record.dayAvgAmount || '0').toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } catch (e) {
        return record.dayAvgAmount;
      }
    },
  },
  {
    title: '三方金流组别',
    dataIndex: 'payGroupName',
  },
  {
    title: '银行卡金流组别',
    dataIndex: 'bankGroupName',
  },
  {
    title: '注册日期',
    dataIndex: 'registedDate',
  },
];
