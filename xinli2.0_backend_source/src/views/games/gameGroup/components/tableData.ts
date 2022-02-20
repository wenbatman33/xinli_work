import { BasicColumn } from '/@/components/Table/src/types/table';

// Data table columns
export const tableColumns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 50,
  },
  {
    title: '厂商预设名称',
    dataIndex: 'name',
    //width: 150,
  },
  {
    title: '网站显示名称',
    dataIndex: 'displayName',
    //width: 150,
  },
  {
    title: '网站排序',
    dataIndex: 'sort',
    width: 100,
  },
  {
    title: '所属代理商',
    dataIndex: 'gameAgencyName',
    width: 100,
  },
  {
    title: '钱包类型',
    dataIndex: 'walletType',
    //width: 150,
    slots: { customRender: 'walletType' },
  },
  {
    title: '厂商游戏类型',
    dataIndex: 'gameType',
    slots: { customRender: 'gameType' },
    //width: 150,
  },
  {
    title: '厂商開啟方式',
    dataIndex: 'openWay',
    slots: { customRender: 'openWay' },
    //width: 150,
  },
  {
    title: '使用币别',
    dataIndex: 'currencyTypes',
    slots: { customRender: 'currencyTypes' },
    format: (_text, record) => {
      return record.currencyTypes?.join(', ');
    },
    width: 90,
  },
  {
    title: '平台费比例',
    dataIndex: 'platformFeeRatio',
    width: 100,
  },
  {
    title: '厂商H5图',
    dataIndex: 'imageH5',
    slots: { customRender: 'imageH5' },
    //width: 150,
  },
  {
    title: '厂商PC图',
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
