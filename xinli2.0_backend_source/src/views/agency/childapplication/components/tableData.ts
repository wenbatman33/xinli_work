import { BasicColumn } from '/@/components/Table/src/types/table';

// Data table columns
export const tableColumns: BasicColumn[] = [
  {
    title: '申請人代理ID',
    dataIndex: 'agencyID',
  },
  {
    title: '申請人代理帳號',
    dataIndex: 'agencyAccount',
  },
  {
    title: '二級代理ID',
    dataIndex: 'childAgencyID',
  },
  {
    title: '二級代理帳號',
    dataIndex: 'childAgencyAccount',
  },
  {
    title: '申請時間',
    dataIndex: 'applyTime',
  },
  {
    title: '審核時間',
    dataIndex: 'reviewTime',
  },
  {
    title: '狀態',
    dataIndex: 'auditStatus',
    slots: { customRender: 'auditStatus' },
  },
  {
    title: '審核人',
    dataIndex: 'adminAccount',
  },
];
