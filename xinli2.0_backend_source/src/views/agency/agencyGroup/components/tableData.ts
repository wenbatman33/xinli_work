import { BasicColumn } from '/@/components/Table/src/types/table';

// Data table columns
export const tableColumns: BasicColumn[] = [
  {
    title: '群组ID',
    dataIndex: 'id',
    width: 100,
  },
  {
    title: '群组佣金名称',
    dataIndex: 'groupName',
    width: 150,
  },
  {
    title: '活跃会员',
    width: 250,
    dataIndex: 'activeMemberCount',
    key: 'activeMemberCount',
    children: [
      {
        title: 'S',
        dataIndex: 'rankContent[0].activeMemberCount',
      },
      {
        title: 'A',
        dataIndex: 'rankContent[1].activeMemberCount',
      },
      {
        title: 'B',
        dataIndex: 'rankContent[2].activeMemberCount',
      },
      {
        title: 'C',
        dataIndex: 'rankContent[3].activeMemberCount',
      },
      {
        title: 'D',
        dataIndex: 'rankContent[4].activeMemberCount',
      },
      {
        title: 'E',
        dataIndex: 'rankContent[5].activeMemberCount',
      },
      {
        title: 'F',
        dataIndex: 'rankContent[6].activeMemberCount',
      },
    ],
  },
  {
    title: '月净营利',
    width: 1000,
    dataIndex: 'minProfit',
    key: 'minProfit',
    children: [
      {
        title: 'S',
        dataIndex: 'rankContent[0].minProfit',
        slots: {
          customRender: 'minProfit_S',
        },
      },
      {
        title: 'A',
        dataIndex: 'rankContent[1].minProfit',
        slots: { customRender: 'minProfit_A' },
      },
      {
        title: 'B',
        dataIndex: 'rankContent[2].minProfit',
        slots: { customRender: 'minProfit_B' },
      },
      {
        title: 'C',
        dataIndex: 'rankContent[3].minProfit',
        slots: { customRender: 'minProfit_C' },
      },
      {
        title: 'D',
        dataIndex: 'rankContent[4].minProfit',
        slots: { customRender: 'minProfit_D' },
      },
      {
        title: 'E',
        dataIndex: 'rankContent[5].minProfit',
        slots: { customRender: 'minProfit_E' },
      },
      {
        title: 'F',
        dataIndex: 'rankContent[6].minProfit',
        slots: { customRender: 'minProfit_F' },
      },
    ],
  },
  {
    title: '佣金分成',
    width: 300,
    dataIndex: 'commissionPercent',
    key: 'commissionPercent',
    children: [
      {
        title: 'S',
        dataIndex: 'rankContent[0].commissionPercent',
        slots: { customRender: 'commissionPercent_S' },
      },
      {
        title: 'A',
        dataIndex: 'rankContent[1].commissionPercent',
        slots: { customRender: 'commissionPercent_A' },
      },
      {
        title: 'B',
        dataIndex: 'rankContent[2].commissionPercent',
        slots: { customRender: 'commissionPercent_B' },
      },
      {
        title: 'C',
        dataIndex: 'rankContent[3].commissionPercent',
        slots: { customRender: 'commissionPercent_C' },
      },
      {
        title: 'D',
        dataIndex: 'rankContent[4].commissionPercent',
        slots: { customRender: 'commissionPercent_D' },
      },
      {
        title: 'E',
        dataIndex: 'rankContent[5].commissionPercent',
        slots: { customRender: 'commissionPercent_E' },
      },
      {
        title: 'F',
        dataIndex: 'rankContent[6].commissionPercent',
        slots: { customRender: 'commissionPercent_F' },
      },
    ],
  },
];
