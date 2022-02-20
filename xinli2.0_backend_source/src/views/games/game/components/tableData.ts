import { BasicColumn } from '/@/components/Table/src/types/table';

// Data table columns
export const tableColumns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '游戏排序',
    dataIndex: 'sort',
    sorter: true,
    width: 80,
  },
  {
    title: '游戏厂商',
    dataIndex: 'gameGroupDisplayName',
    //width: 150,
  },
  {
    title: '预设游戏名称',
    dataIndex: 'name',
    //width: 150,
  },
  {
    title: '游戏显示名称',
    dataIndex: 'displayName',
    //width: 150,
  },
  {
    title: '游戏类型',
    dataIndex: 'gameTypeName',
    width: 80,
  },
  {
    title: '游戏H5图',
    dataIndex: 'imageH5',
    slots: { customRender: 'imageH5' },
    //width: 150,
  },
  {
    title: '游戏PC图',
    dataIndex: 'imagePc',
    slots: { customRender: 'imagePc' },
    //width: 150,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    slots: { customRender: 'status' },
  },
  {
    title: '是否提供试玩',
    dataIndex: 'trialPlay',
    width: 120,
    slots: { customRender: 'trialPlay' },
  },
  {
    title: '是否為特殊遊戲',
    dataIndex: 'isSpecial',
    width: 120,
    slots: { customRender: 'isSpecial' },
  },
  {
    title: '是否為老虎機遊戲',
    dataIndex: 'isSlot',
    width: 120,
    slots: { customRender: 'isSlot' },
  },
  {
    title: '热门游戏',
    dataIndex: 'isHotGame',
    width: 80,
    customRender: ({text}) => {
      return text === 1 ? '是' : '否';
    }
  },
  {
    title: '首页推荐',
    dataIndex: 'recommendedSort',
    width: 80,
    customRender: ({text}) => {
      return text === 0 ? '' : '顺序' + text;
    }
  },
];
