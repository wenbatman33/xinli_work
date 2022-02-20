import { BasicColumn } from '/@/components/Table/src/types/table';

// Data table columns
export const tableColumns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 100,
  },
  {
    title: '代理商名称',
    dataIndex: 'name',
    //width: 150,
  },
  {
    title: '旗下厂商',
    dataIndex: 'gameGroups',
    slots: { customRender: 'gameGroups' },
    //width: 150,
  },
  {
    title: '代理商游戏类型',
    dataIndex: 'gameLists',
    slots: { customRender: 'gameLists' },
    //width: 150,
  },
  {
    title: '代理商H5图',
    dataIndex: 'imageH5',
    slots: { customRender: 'imageH5' },
    //width: 150,
  },
  {
    title: '代理商PC图',
    dataIndex: 'imagePc',
    slots: { customRender: 'imagePc' },
    //width: 150,
  },
  {
    title: '状态',
    dataIndex: 'status',
    //width: 150,
    slots: { customRender: 'status' },
  },
];
