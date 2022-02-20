import { h } from 'vue';
import { Icon } from '/@/components/Icon';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { FinanceItem } from '/@/api/payment/model/financeModel';
import FinanceStatus from './FinanceStatus.vue';
import FinanceMaintain from './FinanceMaintain.vue';
import FinanceExpendedRow from './FinanceExpendedRow.vue';
import moment, { Moment } from 'moment';

/**
 * Finance table record
 */
export type FinanceRecord = FinanceItem & {
  /** Expand row or data row */
  isExpandRow: Boolean;

  /** Expanded status reference proxy */
  expanded: Boolean;

  /** Sort weight */
  weight: Number;
};

/**
 * Common finance column render
 */
const financeColumnRender = ({ column, text, record }) => {
  if (column.dataIndex === 'status') {
    return {
      children: h(FinanceStatus, { status: text }),
      attrs: {
        colSpan: record.isExpandRow ? 0 : 1,
      },
    };
  }
  if (column.dataIndex === 'maintain') {
    return {
      children: h(FinanceMaintain, { maintain: text }),
      attrs: {
        colSpan: record.isExpandRow ? 0 : 1,
      },
    };
  }
  if (column.dataIndex === 'currency') {
    let render_text = '';
    if (text === 1) render_text = 'CNY';
    else if (text === 2) render_text = 'USDT-ERC';
    else if (text === 3) render_text = 'USDT-TRC';
    return {
      children: h('span', {}, render_text),
      attrs: {
        colSpan: record.isExpandRow ? 0 : 1,
      },
    };
  }
  let formattedText;
  if (column.format) {
    formattedText = column.format(text, record);
  } else {
    formattedText = text;
  }
  return {
    children: h('span', {}, formattedText),
    attrs: {
      colSpan: record.isExpandRow ? 0 : 1,
    },
  };
};

/**
 * Finance table columns
 * @param handleExpand Handle expand button click
 * @param handleReload Handle reload finance table
 * @param weightSortOrder Sort order of weight column
 * @param updateSortOrder Sort order of update column
 */
export const financeColumns = (
  handleExpand: (id) => void,
  handleReload: () => void,
  weightSortOrder?: 'descend' | 'ascend',
  updateSortOrder?: 'descend' | 'ascend'
): BasicColumn[] => {
  return [
    {
      dataIndex: 'handle',
      width: 45,
      ifShow: () => weightSortOrder !== undefined,
      customRender: ({ record }) => {
        return h(Icon, {
          style: 'cursor: move; cursor: -webkit-grabbing;',
          class: record.isExpandRow ? '' : 'handle',
          icon: record.isExpandRow ? '' : 'ion:menu-outline',
        });
      },
    },
    {
      dataIndex: 'expanded',
      width: 45,
      customRender: ({ record }) => {
        const icon = h(Icon, {
          class: 'cursor-pointer',
          icon: record.expanded ? 'ion:chevron-down-outline' : 'ion:chevron-forward-outline',
          onClick: () => {
            handleExpand(record.id);
          },
        });
        const expandRow = h(FinanceExpendedRow, {
          record,
          onReload: () => {
            handleReload();
          },
        });
        return {
          children: record.isExpandRow ? expandRow : icon,
          attrs: {
            colSpan: record.isExpandRow ? 9 : undefined,
          },
        };
      },
    },
    {
      title: 'weight',
      dataIndex: 'weight',
      width: 200,
      sortOrder: weightSortOrder,
      defaultSortOrder: weightSortOrder,
      ifShow: () => false,
      sorter: (a, b) => {
        if (a.weight === b.weight && a.isExpandRow) {
          return 1;
        }
        if (a.weight === b.weight && b.isExpandRow) {
          return -1;
        }
        return a.weight - b.weight;
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 200,
      customRender: financeColumnRender,
    },
    {
      title: '备注',
      dataIndex: 'note',
      width: 150,
      customRender: financeColumnRender,
    },
    {
      title: '币别',
      dataIndex: 'currency',
      width: 100,
      customRender: financeColumnRender,
    },
    {
      title: '同时启用线路',
      dataIndex: 'nums',
      width: 150,
      customRender: financeColumnRender,
    },
    {
      title: '显示状态',
      dataIndex: 'status',
      width: 150,
      customRender: financeColumnRender,
    },
    {
      title: '维护状态',
      dataIndex: 'maintain',
      width: 150,
      customRender: financeColumnRender,
    },
    {
      title: '最后更新时间',
      dataIndex: 'updatedAt',
      width: 200,
      sortOrder: updateSortOrder,
      customRender: financeColumnRender,
      sorter: (a, b) => {
        let createA: Moment;
        try {
          createA = moment(a.updatedAt, 'YYYY-MM-DD HH:mm:ss');
        } catch (e) {
          createA = moment().add(-100, 'year');
        }
        let createB: Moment;
        try {
          createB = moment(b.updatedAt, 'YYYY-MM-DD HH:mm:ss');
        } catch (e) {
          createB = moment().add(-100, 'year');
        }
        if (createA.isAfter(createB)) {
          return 1;
        } else if (createA.isBefore(createB)) {
          return -1;
        } else {
          return 0;
        }
      },
      format: (text) => {
        return moment(text).format('YYYY/MM/DD HH:mm:ss');
      },
    },
    {
      title: '执行人',
      dataIndex: 'updatedUser',
      width: 150,
      customRender: financeColumnRender,
    },
  ];
};

/**
 * Add modal table columns
 */
export const addColumns: BasicColumn[] = [
  {
    title: '线路名称',
    dataIndex: 'name',
    fixed: 'left',
    width: 200,
  },
  {
    title: '线路成功率',
    dataIndex: 'rate',
    width: 150,
    format: (text) => {
      return `${text}%`;
    },
  },
  {
    title: '组别',
    dataIndex: 'groups',
    width: 150,
    slots: {
      customRender: 'groups',
    },
  },
  {
    title: '今日收款总额',
    dataIndex: 'amount',
    width: 150,
    format: (_text, record) => {
      return record.amount?.toLocaleString();
    },
  },
  {
    title: '剩余可使用额度（参考）',
    dataIndex: 'remain',
    width: 200,
    format: (_text, record) => {
      return record.remain?.toLocaleString();
    },
  },
  {
    title: '商户日切时间',
    dataIndex: 'settle',
    width: 200,
    format: (text) => {
      const arr = text?.split('~') || [];
      if (arr.length < 2) {
        return text;
      }
      let timeA;
      try {
        timeA = moment(arr[0]).format('HH:mm');
      } catch (e) {
        timeA = arr[0];
      }
      let timeB;
      try {
        timeB = moment(arr[1]).format('HH:mm');
      } catch (e) {
        timeB = arr[1];
      }
      return `${timeA}~${timeB}`;
    },
  },
  {
    title: '单笔限额',
    dataIndex: 'limit',
    width: 150,
  },
  {
    title: '手续费',
    dataIndex: 'fee',
    width: 150,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 150,
    slots: {
      customRender: 'status',
    },
  },
  {
    title: '备注',
    dataIndex: 'note',
    width: 150,
  },
];

/**
 * Finance table expended row table columns
 */
export const tableExpendedColumns: BasicColumn[] = [
  {
    dataIndex: 'handle',
    width: 45,
    customRender: ({ record }) => {
      return h(Icon, {
        style: 'cursor: move; cursor: -webkit-grabbing;',
        class: record.isExpandRow ? '' : 'handle',
        icon: record.isExpandRow ? '' : 'ion:menu-outline',
      });
    },
  },
  {
    title: '线路名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '线路成功率',
    dataIndex: 'rate',
    width: 150,
  },
  {
    title: '组别',
    dataIndex: 'groups',
    width: 150,
    slots: {
      customRender: 'groups',
    },
  },
  {
    title: '今日收款总额',
    dataIndex: 'amount',
    width: 150,
    format: (_text, record) => {
      return record.amount?.toLocaleString();
    },
  },
  {
    title: '剩余可使用额度（参考）',
    dataIndex: 'remain',
    width: 200,
    format: (_text, record) => {
      return record.remain?.toLocaleString();
    },
  },
  {
    title: '商户日切时间',
    dataIndex: 'settle',
    width: 200,
    format: (text) => {
      const arr = text?.split('~') || [];
      if (arr.length < 2) {
        return text;
      }
      let timeA;
      try {
        timeA = moment(arr[0]).format('HH:mm');
      } catch (e) {
        timeA = arr[0];
      }
      let timeB;
      try {
        timeB = moment(arr[1]).format('HH:mm');
      } catch (e) {
        timeB = arr[1];
      }
      return `${timeA}~${timeB}`;
    },
  },
  {
    title: '单笔限额',
    dataIndex: 'limit',
    width: 150,
  },
  {
    title: '手续费',
    dataIndex: 'fee',
    width: 150,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 150,
    slots: {
      customRender: 'status',
    },
  },
  {
    title: '备注',
    dataIndex: 'note',
    width: 150,
  },
];
