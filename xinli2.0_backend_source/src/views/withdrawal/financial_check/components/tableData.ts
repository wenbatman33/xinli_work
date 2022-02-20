import { BasicColumn } from '/@/components/Table';
import { UseType, InOutType } from '/@/api/money/model/moneyModel';
import moment, { Moment } from 'moment';

/**
 * Wallet log table columns
 */
export const walletLogColumns = (
  useTypeList: UseType[],
  inOutTypeList: InOutType[]
): BasicColumn[] => {
  return [
    {
      title: '时间\nDate',
      dataIndex: 'date',
      width: 155,
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        let dateA: Moment;
        try {
          dateA = moment(a.date, 'YYYY-MM-DD HH:mm:ss');
        } catch (e) {
          dateA = moment().add(-100, 'year');
        }
        let dateB: Moment;
        try {
          dateB = moment(b.date, 'YYYY-MM-DD HH:mm:ss');
        } catch (e) {
          dateB = moment().add(-100, 'year');
        }
        if (dateA.isAfter(dateB)) {
          return 1;
        } else if (dateA.isBefore(dateB)) {
          return -1;
        } else {
          return 0;
        }
      },
    },
    {
      title: '收支\nin/out',
      dataIndex: 'inOut',
      filters: inOutTypeList.map((inOutType) => {
        return {
          text: inOutType.inOutTypeName || '',
          value: inOutType.inOutTypeID?.toString() || '',
        };
      }),
      onFilter: (value, record) => {
        return record.inOut == value;
      },
      slots: {
        customRender: 'inOut',
      },
    },
    {
      title: '项目\nType',
      dataIndex: 'type',
      filters: useTypeList.map((useType) => {
        return {
          text: useType.useTypeName || '',
          value: useType.useTypeID?.toString() || '',
        };
      }),
      onFilter: (value, record) => {
        return record.type == value;
      },
      slots: {
        customRender: 'type',
      },
    },
    {
      title: '交易前\nPrevious',
      dataIndex: 'before',
      format: (_text, record) => {
        try {
          return Number(record.before || '0').toLocaleString();
        } catch (e) {
          return record.before;
        }
      },
    },
    {
      title: '交易金额\nAmount',
      dataIndex: 'amount',
      format: (_text, record) => {
        try {
          return Number(record.amount || '0').toLocaleString();
        } catch (e) {
          return record.amount;
        }
      },
    },
    {
      title: '交易后\nCurrent',
      dataIndex: 'after',
      format: (_text, record) => {
        try {
          return Number(record.after || '0').toLocaleString();
        } catch (e) {
          return record.after;
        }
      },
    },
    {
      title: '流水倍数\nMultiple',
      dataIndex: 'turnoverMultiple',
    },
    {
      title: '所需流水\nTurnoverNeed',
      dataIndex: 'turnoverLimit',
      format: (_text, record) => {
        try {
          return Number(record.turnoverLimit || '0').toLocaleString();
        } catch (e) {
          return record.turnoverLimit;
        }
      },
    },
    {
      title: '详细内容\nDetail',
      dataIndex: 'note',
      width: 180,
      slots: {
        customRender: 'note',
      },
    },
  ];
};

/**
 * Stake detail table columns
 */
export const stakeDetailColumns: BasicColumn[] = [
  {
    title: '',
    dataIndex: 'name',
  },
  {
    title: '限制流水',
    dataIndex: 'withdrawLimit',
  },
  {
    title: '有效流水Stake',
    dataIndex: 'betAmount',
  },
  {
    title: '输赢WinLoss（公司）',
    dataIndex: 'winAmount',
  },
];

/**
 * Withdrawal table columns
 */
export const withdrawalColumns: BasicColumn[] = [
  {
    title: '会员帐号\nMemberAC',
    dataIndex: 'member',
    slots: {
      customRender: 'member',
    },
  },
  {
    title: '提款金额\nAmount',
    dataIndex: 'amount',
    slots: {
      customRender: 'amount',
    },
  },
  {
    title: '状态\nStatus',
    dataIndex: 'status',
    slots: {
      customRender: 'status',
    },
  },
  {
    title: '银行\nBankCode',
    dataIndex: 'bankCode',
  },
];
