import { FormSchema } from '/@/components/Form';
import { getGameListTypeItem } from '/@/api/game/model/gameModel';

/**
 * Search form schemas
 * @param payChannelNameList 商户列表
 * @returns Form schema array
 */
export const searchSchemas = (gameTypeList: getGameListTypeItem[]): FormSchema[] => {
  return [
    {
      field: 'name',
      component: 'Input',
      label: '厂商预设名称',
      componentProps: {
        placeholder: '请输入厂商原始名称',
      },
    },
    {
      field: 'displayName',
      component: 'Input',
      label: '网站显示名称',
      componentProps: {
        placeholder: '请输入网站显示名称',
      },
    },
    {
      field: 'gameTypeID',
      component: 'Select',
      label: '游戏类型',
      componentProps: {
        options: gameTypeList.map((element) => {
          return {
            label: element.value,
            value: element.key,
            key: element.key,
          };
        }),
      },
    },
    {
      field: 'status',
      component: 'Select',
      label: '状态',
      defaultValue: 0,
      componentProps: {
        options: [
          {
            label: '关闭',
            value: 1,
            key: 1,
          },
          {
            label: '开启',
            value: 2,
            key: 2,
          },
          {
            label: '全部',
            value: 0,
            key: 0,
          },
        ],
      },
    },
  ];
};
