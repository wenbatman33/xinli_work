import { BasicColumn } from '/@/components/Table/src/types/table';

// Data table columns
export const tableColumns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '會員ID',
    dataIndex: 'memberID',
  },
  {
    title: '代理帳號',
    dataIndex: 'agencyAccount',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '手機號',
    dataIndex: 'phone',
  },
  {
    title: '申請時間',
    dataIndex: 'createdAt',
  },
  {
    title: '審核時間',
    dataIndex: 'reviewTime',
  },
  {
    title: '審核人',
    dataIndex: 'adminUserID',
  },
  {
    title: '狀態',
    dataIndex: 'auditStatus',
    slots: { customRender: 'auditStatus' },
  },
];
