import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '会员ID',
    dataIndex: 'memberID',
    width: 200,
  },
  {
    title: '游戏代码',
    dataIndex: 'gameListID',
    width: 180,
  },
  {
    title: '游戏原厂投注ID',
    dataIndex: 'betID',
    width: 180,
  },
  {
    title: '投注流水',
    dataIndex: 'totalBetAmount',
    width: 180,
  },
  {
    title: '有效流水',
    dataIndex: 'betAmount',
    width: 180,
  },
  {
    title: '赢多少',
    dataIndex: 'winAmount',
    width: 180,
  },
  {
    title: '结算金额',
    dataIndex: 'settlementAmount',
    width: 180,
  },
  {
    title: '投注时间',
    dataIndex: 'betTime',
    width: 180,
    sorter: (a, b) => {
      let dateA = new Date(a.betTime);
      let dateB = new Date(b.betTime);
      if (dateA < dateB) {
        return 1;
      } else if (dateA > dateB) {
        return -1;
      } else {
        return 0;
      }
    },
  },
  {
    title: '结算时间',
    dataIndex: 'settlementTime',
    width: 180,
    sorter: (a, b) => {
      let dateA = new Date(a.settlementTime);
      let dateB = new Date(b.settlementTime);
      if (dateA < dateB) {
        return 1;
      } else if (dateA > dateB) {
        return -1;
      } else {
        return 0;
      }
    },
  },
  {
    title: '投注记录状态',
    dataIndex: 'betLogStatus',
    width: 120,
    customRender: ({record}) => {
      let mess = '待确认';
      if (record.betLogStatus === 1)  mess = '完成';
      if (record.betLogStatus === 2)  mess = '取消';
      if (record.betLogStatus === 3)  mess = '失败';
      return mess;
    }
  },
  {
    title: '馀额',
    dataIndex: 'balance',
    width: 180,
  },
  {
    title: '建立时间',
    dataIndex: 'createdAt',
    width: 180,
    sorter: (a, b) => {
      let dateA = new Date(a.createdAt);
      let dateB = new Date(b.createdAt);
      if (dateA < dateB) {
        return 1;
      } else if (dateA > dateB) {
        return -1;
      } else {
        return 0;
      }
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 180,
    sorter: (a, b) => {
      let dateA = new Date(a.updatedAt);
      let dateB = new Date(b.updatedAt);
      if (dateA < dateB) {
        return 1;
      } else if (dateA > dateB) {
        return -1;
      } else {
        return 0;
      }
    },
  },
  {
    title: '投注类型',
    dataIndex: 'betType',
    width: 180,
  },
  {
    title: '赔率',
    dataIndex: 'odds',
    width: 180,
  },
  {
    title: '盘口',
    dataIndex: 'oddsStyle',
    width: 180,
  },
  {
    title: 'json_encode过的原始数据',
    dataIndex: 'response',
    width: 180,
  },
  {
    title: '投注记录类型',
    dataIndex: 'betLogType',
    width: 180,
  },
  {
    title: '投注项目',
    dataIndex: 'betItem',
    width: 180,
  },
];

export const searchFormSchema = (): FormSchema[] => {
  return [
    {
      field: 'memberID',
      label: '会员ID',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'gameListID',
      label: '游戏代码',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      isAdvanced: false,
      field: 'betTime',
      component: 'Input',
      label: '交易时间',
      slot: 'date',
      componentProps: {
        betTimeStart: 'betTimeStart',
        betTimeEnd: 'betTimeEnd',
      },
      colProps: {
        span: 18,
      },
    },
    {
      show: false,
      field: 'betTimeStart',
      component: 'Input',
      label: '交易时间开始',
    },
    {
      show: false,
      field: 'betTimeEnd',
      component: 'Input',
      label: '交易时间结束',
    },
  ];
};
