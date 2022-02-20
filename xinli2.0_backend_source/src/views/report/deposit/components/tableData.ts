import { BasicColumn } from '/@/components/Table/src/types/table';
import moment from 'moment';

/**
 * 金額區間報表
 */
export const depositAmountRangeRepportColumns: BasicColumn[] = [
  {
    title: '日期',
    dataIndex: 'reportDate',
    format: (_text, record) => {
      try {
        return moment(record.reportDate, 'YYYY-MM-DD').format('YYYY/MM/DD');
      } catch (e) {
        return record.reportDate;
      }
    },
  },
  {
    title: '0~100',
    dataIndex: 'amount100',
    format: (_text, record) => {
      try {
        return Number(record.amount100 || '0').toLocaleString();
      } catch (e) {
        return record.amount100;
      }
    },
  },
  {
    title: '101~500',
    dataIndex: 'amount500',
    format: (_text, record) => {
      try {
        return Number(record.amount500 || '0').toLocaleString();
      } catch (e) {
        return record.amount500;
      }
    },
  },
  {
    title: '501~1,000',
    dataIndex: 'amount1000',
    format: (_text, record) => {
      try {
        return Number(record.amount1000 || '0').toLocaleString();
      } catch (e) {
        return record.amount1000;
      }
    },
  },
  {
    title: '1,001~2,000',
    dataIndex: 'amount2000',
    format: (_text, record) => {
      try {
        return Number(record.amount2000 || '0').toLocaleString();
      } catch (e) {
        return record.amount2000;
      }
    },
  },
  {
    title: '2,001~6,000',
    dataIndex: 'amount6000',
    format: (_text, record) => {
      try {
        return Number(record.amount6000 || '0').toLocaleString();
      } catch (e) {
        return record.amount6000;
      }
    },
  },
  {
    title: '6,001~10,000',
    dataIndex: 'amount10000',
    format: (_text, record) => {
      try {
        return Number(record.amount10000 || '0').toLocaleString();
      } catch (e) {
        return record.amount10000;
      }
    },
  },
  {
    title: '10,001~20,000',
    dataIndex: 'amount20000',
    format: (_text, record) => {
      try {
        return Number(record.amount20000 || '0').toLocaleString();
      } catch (e) {
        return record.amount20000;
      }
    },
  },
  {
    title: '两万以上',
    dataIndex: 'amountMore20000',
    format: (_text, record) => {
      try {
        return Number(record.amountMore20000 || '0').toLocaleString();
      } catch (e) {
        return record.amountMore20000;
      }
    },
  },
  {
    title: '小计',
    dataIndex: 'sum',
    format: (_text, record) => {
      try {
        const amount100 = record.amount100 || 0;
        const amount500 = record.amount500 || 0;
        const amount1000 = record.amount1000 || 0;
        const amount2000 = record.amount2000 || 0;
        const amount6000 = record.amount6000 || 0;
        const amount10000 = record.amount10000 || 0;
        const amount20000 = record.amount20000 || 0;
        const amountMore20000 = record.amountMore20000 || 0;
        const sum =
          amount100 +
          amount500 +
          amount1000 +
          amount2000 +
          amount6000 +
          amount10000 +
          amount20000 +
          amountMore20000;
        return Number(sum || '0').toLocaleString();
      } catch (e) {
        return '0';
      }
    },
  },
];

/**
 * 人數報表
 */
export const depositPeopleRepportColumns: BasicColumn[] = [
  {
    title: '日期',
    dataIndex: 'reportDate',
    format: (_text, record) => {
      try {
        return moment(record.reportDate, 'YYYY-MM-DD').format('YYYY/MM/DD');
      } catch (e) {
        return record.reportDate;
      }
    },
  },
  {
    title: '唯一存款人数',
    dataIndex: 'uniquePeople',
    format: (_text, record) => {
      try {
        return Number(record.uniquePeople || '0').toLocaleString();
      } catch (e) {
        return record.uniquePeople;
      }
    },
  },
  {
    title: '首存人数',
    dataIndex: 'firstPeople',
    format: (_text, record) => {
      try {
        return Number(record.firstPeople || '0').toLocaleString();
      } catch (e) {
        return record.firstPeople;
      }
    },
  },
  {
    title: '存款次数',
    dataIndex: 'depositNum',
    format: (_text, record) => {
      try {
        return Number(record.depositNum || '0').toLocaleString();
      } catch (e) {
        return record.depositNum;
      }
    },
  },
  {
    title: '存款金额',
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
    title: '人均存款金额',
    dataIndex: 'avgAmount',
    format: (_text, record) => {
      try {
        return Number(record.avgAmount || '0').toLocaleString();
      } catch (e) {
        return record.avgAmount;
      }
    },
  },
  {
    title: '手续费',
    dataIndex: 'fee',
    format: (_text, record) => {
      try {
        return Number(record.fee || '0').toLocaleString();
      } catch (e) {
        return record.fee;
      }
    },
  },
  {
    title: '实收金额',
    dataIndex: 'actualAmount',
    format: (_text, record) => {
      try {
        return Number(record.actualAmount || '0').toLocaleString();
      } catch (e) {
        return record.actualAmount;
      }
    },
  },
  {
    title: '存款比',
    dataIndex: 'depositRate',
  },
];
