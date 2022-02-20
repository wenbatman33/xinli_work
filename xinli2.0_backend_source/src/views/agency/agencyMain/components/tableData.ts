import { BasicColumn } from '/@/components/Table/src/types/table';

// Data table columns
export const tableColumns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 50,
  },
  {
    title: '代理帳號',
    dataIndex: 'account',
  },
  {
    title: '上層代理',
    dataIndex: 'parentAgencyAccount',
  },
  {
    title: '二級代理數',
    dataIndex: 'childAgencyCount',
  },
  {
    title: '直屬會員數',
    dataIndex: 'memberCount',
  },
  {
    title: '是否計算傭金',
    dataIndex: 'giveOffer',
    format: (_text, record) => {
      if (record.giveOffer == 1) {
        return '是';
      } else if (record.giveOffer == 2) {
        return '否';
      } else {
        return '全部';
      }
    },
  },
  {
    title: '傭金類型',
    dataIndex: 'rankGroupName',
  },
  {
    title: '代理錢包餘額',
    dataIndex: 'agencyWallet',
  },
  {
    title: '推廣網址',
    dataIndex: 'promotionLinks',
    slots: { customRender: 'promotionLinks' },
  },
  {
    title: '活躍狀態',
    dataIndex: 'activeStatus',
  },
  {
    title: '最後登入時間',
    dataIndex: 'lastLoginTime',
  },
];
