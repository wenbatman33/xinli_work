import { FormSchema } from '/@/components/Form/index';
import { uploadApi } from '/@/api/sys/upload';
import { getGameListTypeItem } from '/@/api/game/model/gameModel';
const recommandSortOptions = [{label: '不推荐', value: 0, key: 0}];
for(let i = 1; i <= 9; i++) {
  recommandSortOptions.push({
    label: `顺序${i}`,
    key: i,
    value: i,
  });
}
export const EditmodelFormSchemas: FormSchema[] = [
  {
    field: 'id',
    component: 'Input',
    label: '游戏ID',
    colProps: {
      span: 8,
    },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'gameGroupID',
    component: 'Select',
    label: '游戏厂商名称',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '预设游戏名称',
    colProps: {
      span: 8,
    },
    rules: [{ required: true, message: '必填' }],
  },
  {
    field: 'displayName',
    component: 'Input',
    label: '游戏显示名称',
    colProps: {
      span: 8,
    },
    rules: [{ required: true, message: '必填' }],
  },
  {
    field: 'sort',
    component: 'Input',
    label: '游戏排序',
    colProps: {
      span: 8,
    },
    rules: [
      { required: true, message: '必填' },
      {
        pattern: /^\d{1,6}$/,
        message: '范围在 0~999,999',
        trigger: ['change', 'blur'],
      },
    ],
  },
  {
    field: 'bettingCode',
    component: 'Input',
    label: '游戏代码',
    colProps: {
      span: 8,
    },
    rules: [{ required: true, message: '必填' }],
  },
  {
    field: 'gameTypeID',
    component: 'Select',
    label: '游戏类型',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'isHotGame',
    component: 'Checkbox',
    label: '热门游戏',
    ifShow: ({model}) => {
      return model.gameTypeID === 5 || model.gameTypeID === 6 || model.gameTypeID === 7;
    },
    colProps: {
      span: 8,

    },
  },
  {
    field: 'status',
    component: 'Select',
    label: '状态',
    required: true,
    colProps: {
      span: 16,
    },
    defaultValue: '1',
    componentProps: {
      options: [
        {
          label: '关闭',
          value: 1,
          key: '1',
        },
        {
          label: '开启',
          value: 2,
          key: '2',
        },
      ],
    },
  },
  {
    field: 'trialPlay',
    component: 'Select',
    label: '是否提供试玩',
    required: true,
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '否',
          value: 1,
          key: 1,
        },
        {
          label: '是',
          value: 2,
          key: 2,
        },
      ],
    },
  },
  {
    field: 'recommendedSort',
    component: 'Select',
    label: '首页推荐',
    required: true,
    defaultValue: 0,
    colProps: {
      span: 8,
    },
    componentProps: {
      options: recommandSortOptions,
    },
  },
  {
    field: 'imageRecommandFile',
    component: 'Input',
    label: '推荐游戏图',
    colProps: {
      span: 6,
    },
    ifShow: ({model}) => {
      return (model.gameTypeID !== 5 && model.gameTypeID !== 6 && model.gameTypeID !== 7) && model.recommendedSort !== 0;
    },
    slot: 'imageRecommandFile',
  },
  {
    field: 'imageRecommand',
    component: 'Input',
    label: '',
    colProps: {
      span: 6,
    },
    ifShow: ({model}) => {
      return (model.gameTypeID !== 5 && model.gameTypeID !== 6 && model.gameTypeID !== 7) && model.recommendedSort !== 0;
    },
    slot: 'imageRecommand',
  },
  {
    field: 'isSpecial',
    component: 'Select',
    label: '是否為特殊遊戲',
    required: true,
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '是',
          value: 1,
          key: 1,
        },
        {
          label: '否',
          value: 2,
          key: 2,
        },
      ],
    },
  },
  {
    field: 'isSlot',
    component: 'Select',
    label: '是否為老虎機遊戲',
    required: true,
    colProps: {
      span: 8,
    },
    componentProps: {
      options: [
        {
          label: '是',
          value: 1,
          key: 1,
        },
        {
          label: '否',
          value: 2,
          key: 2,
        },
      ],
    },
  },
  {
    field: 'imageH5File',
    component: 'Input',
    label: '游戏图片(H5)',
    colProps: {
      span: 6,
    },
    slot: 'imgH5File',
  },
  {
    field: 'imageH5',
    component: 'Input',
    label: '',
    colProps: {
      span: 6,
    },
    slot: 'imgH5',
  },
  {
    field: 'imagePcFile',
    component: 'Input',
    label: '游戏图片(PC)',
    colProps: {
      span: 6,
    },
    slot: 'imgPcFile',
  },
  {
    field: 'imagePc',
    component: 'Input',
    label: '',
    colProps: {
      span: 6,
    },
    slot: 'imgPc',
  },
  {
    field: 'screenShotH5File',
    component: 'Input',
    label: '遊戲畫面截圖 (H5)',
    colProps: {
      span: 6,
    },
    slot: 'screenShotH5File',
  },
  {
    field: 'screenShotH5',
    component: 'Input',
    label: '',
    colProps: {
      span: 6,
    },
    slot: 'shotH5',
  },
  {
    field: 'screenShotPcFile',
    component: 'Input',
    label: '遊戲畫面截圖 (PC) ',
    colProps: {
      span: 6,
    },
    slot: 'screenShotPcFile',
  },
  {
    field: 'screenShotPc',
    component: 'Input',
    label: '',
    colProps: {
      span: 6,
    },
    slot: 'shotPc',
  },
];
