import { BasicColumn } from '/@/components/Table/src/types/table';

// Data table columns
export const tableColumns: BasicColumn[] = [
  {
    title: '會員ID',
    dataIndex: 'memberID',
    width: 50,
  },
  {
    title: '會員帳號',
    dataIndex: 'memberAccount',
  },
  {
    title: '姓名',
    dataIndex: 'memberName',
  },
  {
    title: '原代理ID',
    dataIndex: 'orgAgencyID',
  },
  {
    title: '原代理帳號',
    dataIndex: 'orgAgencyAccount',
  },
  {
    title: '轉線後代理ID',
    dataIndex: 'newAgencyID',
  },
  {
    title: '轉線後代理帳號',
    dataIndex: 'newAgencyAccount',
  },
  {
    title: '轉線時間',
    dataIndex: 'date',
  },
  {
    title: '備註',
    dataIndex: 'remark',
  },
];
