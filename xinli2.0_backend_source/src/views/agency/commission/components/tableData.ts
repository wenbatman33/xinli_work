import { BasicColumn } from '/@/components/Table/src/types/table';
import { h } from 'vue';

export const tableSchema: BasicColumn[] = [
  {
    title: '结算日期',
    dataIndex: 'date',
    width: 100,
  },
  {
    title: '派发日期',
    dataIndex: 'deliveredAt',
    width: 180,
  },
  {
    title: 'ID',
    dataIndex: 'agencyID',
    width: 80,
  },
  {
    title: '代理帐号',
    dataIndex: 'agencyAccount',
    width: 100,
  },
  {
    title: '钱包馀额',
    dataIndex: 'wallet',
    format: (_text, record) => {
      try {
        return Number(record.wallet || '0').toLocaleString();
      } catch (e) {
        return record.wallet;
      }
    },
  },
  {
    title: '佣金分成',
    dataIndex: 'commissionPercent',
    width: 100,
  },
  {
    title: '直属会员输赢',
    dataIndex: 'totalWinAmount',
    format: (_text, record) => {
      try {
        return Number(record.totalWinAmount || '0').toLocaleString();
      } catch (e) {
        return record.totalWinAmount;
      }
    },
  },
  {
    title: '本月佣金结馀',
    dataIndex: 'totalCommission',
    format: (_text, record) => {
      try {
        return Number(record.totalCommission || '0').toLocaleString();
      } catch (e) {
        return record.totalCommission;
      }
    },
  },
  {
    title: '上月佣金结馀',
    dataIndex: 'lastTotalCommission',
    format: (_text, record) => {
      try {
        return Number(record.lastTotalCommission || '0').toLocaleString();
      } catch (e) {
        return record.lastTotalCommission;
      }
    },
    customRender: ({text}) => {
      return Number(text) < 0 ? h('span', {
        style: 'color: #F00'
      }, text) : text;
    }
  },
  {
    title: '二代佣金',
    dataIndex: 'childCommissionAmount',
    format: (_text, record) => {
      try {
        return Number(record.childCommissionAmount || '0').toLocaleString();
      } catch (e) {
        return record.childCommissionAmount;
      }
    },
  },
  {
    title: '尊享福利',
    dataIndex: 'childBonusAmount',
    format: (_text, record) => {
      try {
        return Number(record.childBonusAmount || '0').toLocaleString();
      } catch (e) {
        return record.childBonusAmount;
      }
    },
  },
  {
    title: '派发结果',
    dataIndex: 'status',
    fixed: 'right',
    width: 100,
    customRender: ({text}) => {
      let word = '待审核';
      if (text === 2) word = '通过';
      if (text === 3) word = '拒绝';
      if (text === 4) word = '统计中';
      if (text === 5) word = '已过期';
      const color = text === 2 ? '#00EC00' : text === 3 ? '#FF0000' : '#FF9224';
      return h('span', {style:`color:${color}`}, word);
    }
  },
];

export const childTableSchema: BasicColumn[] = [
  {
    title: '结算日期',
    dataIndex: 'date',
    width: 100,
  },
  {
    title: '派发日期',
    dataIndex: 'deliveredAt',
    width: 180,
  },
  {
    title: 'ID',
    dataIndex: 'agencyID',
    width: 80,
  },
  {
    title: '代理帐号',
    dataIndex: 'agencyAccount',
    width: 100,
  },
  {
    title: '钱包馀额',
    dataIndex: 'wallet',
    format: (_text, record) => {
      try {
        return Number(record.wallet || '0').toLocaleString();
      } catch (e) {
        return record.wallet;
      }
    },
  },
  {
    title: '佣金分成',
    dataIndex: 'commissionPercent',
    width: 100,
  },
  {
    title: '直属会员输赢',
    dataIndex: 'totalWinAmount',
    format: (_text, record) => {
      try {
        return Number(record.totalWinAmount || '0').toLocaleString();
      } catch (e) {
        return record.totalWinAmount;
      }
    },
  },
  {
    title: '本月佣金结馀',
    dataIndex: 'totalCommission',
    format: (_text, record) => {
      try {
        return Number(record.totalCommission || '0').toLocaleString();
      } catch (e) {
        return record.totalCommission;
      }
    },
  },
  {
    title: '上月佣金结馀',
    dataIndex: 'lastTotalCommission',
    format: (_text, record) => {
      try {
        return Number(record.lastTotalCommission || '0').toLocaleString();
      } catch (e) {
        return record.lastTotalCommission;
      }
    },
    customRender: ({text}) => {
      return Number(text) < 0 ? h('span', {
        style: 'color: #F00'
      }, text) : text;
    }
  },
  {
    title: '二代佣金',
    dataIndex: 'childCommissionAmount',
    format: (_text, record) => {
      try {
        return Number(record.childCommissionAmount || '0').toLocaleString();
      } catch (e) {
        return record.childCommissionAmount;
      }
    },
  },
  {
    title: '尊享福利',
    dataIndex: 'childBonusAmount',
    format: (_text, record) => {
      try {
        return Number(record.childBonusAmount || '0').toLocaleString();
      } catch (e) {
        return record.childBonusAmount;
      }
    },
  },
  {
    title: '派发结果',
    dataIndex: 'childStatus',
    width: 100,
    fixed: 'right',
    customRender: ({text}) => {
      let word = '待审核';
      if (text === 2) word = '通过';
      if (text === 3) word = '拒绝';
      if (text === 4) word = '统计中';
      if (text === 5) word = '已过期';
      const color = text === 2 ? '#00EC00' : text === 3 ? '#FF0000' : '#FF9224';
      return h('span', {style:`color:${color}`}, word);
    }
  },
];

export const checkTableSchema: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
  },
  {
    title: '代理帐号',
    dataIndex: 'agencyAccount',
    width: 180,
  },
  {
    title: '钱包馀额',
    dataIndex: 'wallet',
    format: (_text, record) => {
      try {
        return Number(record.wallet || '0').toLocaleString();
      } catch (e) {
        return record.wallet;
      }
    },
  },
  {
    title: '本月佣金结馀',
    dataIndex: 'totalCommission',
    format: (_text, record) => {
      try {
        return Number(record.totalCommission || '0').toLocaleString();
      } catch (e) {
        return record.totalCommission;
      }
    },
  },
  {
    title: '上月佣金结馀',
    dataIndex: 'lastTotalCommission',
    format: (_text, record) => {
      try {
        return Number(record.lastTotalCommission || '0').toLocaleString();
      } catch (e) {
        return record.lastTotalCommission;
      }
    },
    customRender: ({text}) => {
      return Number(text) < 0 ? h('span', {
        style: 'color: #F00'
      }, text) : text;
    }
  },
  {
    title: '二代会员输赢',
    dataIndex: 'childTotalWinAmount',
    format: (_text, record) => {
      try {
        return Number(record.childTotalWinAmount || '0').toLocaleString();
      } catch (e) {
        return record.childTotalWinAmount;
      }
    },
    ifShow: (record: any) => record.childTotalWinAmount,
  },
  {
    title: '二代佣金',
    dataIndex: 'childCommissionAmount',
    format: (_text, record) => {
      try {
        return Number(record.childCommissionAmount || '0').toLocaleString();
      } catch (e) {
        return record.childCommissionAmount;
      }
    },
  },
  {
    title: '尊享福利',
    dataIndex: 'childBonusAmount',
    format: (_text, record) => {
      try {
        return Number(record.childBonusAmount || '0').toLocaleString();
      } catch (e) {
        return record.childBonusAmount;
      }
    },
  },
];
