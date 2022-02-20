import { h } from 'vue';
import { Icon } from '/@/components/Icon';
import { BasicColumn } from '/@/components/Table/src/types/table';

/**
 * Payout navi table columns
 */
export const payoutNaviColumns: BasicColumn[] = [
  {
    title: 'sort',
    dataIndex: 'sort',
    sortOrder: true,
    defaultSortOrder: 'descend',
    ifShow: () => false,
    sorter: (a, b) => {
      return a.sort - b.sort;
    },
  },
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
    title: '商户号\nMerchant',
    dataIndex: 'name',
  },
  {
    title: '目前可代付余额',
    dataIndex: 'balance',
    format: (_text, record) => {
      try {
        return Number(record.balance || '0').toLocaleString();
      } catch (e) {
        return record.balance;
      }
    },
  },
  {
    title: '状态\nstatus',
    slots: {
      customRender: 'paying',
    },
    dataIndex: 'paying',
  },
  {
    title: '',
    slots: {
      customRender: 'status',
    },
    dataIndex: 'status',
  },
];
