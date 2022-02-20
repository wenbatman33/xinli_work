import { FormSchema } from '/@/components/Form';
import { getGameListTypeItem } from '/@/api/game/model/gameModel';

/**
 * Search form schemas
 * @param payChannelNameList 商户列表
 * @returns Form schema array
 */
export const searchSchemas = (
  gameTypeList: getGameListTypeItem[],
  gameGroupsOption: getGameListTypeItem[]
): FormSchema[] => {
  return [
    {
      field: 'gameTypeID',
      component: 'Select',
      label: '游戏类型',
      defaultValue: 1,
      colProps: {
        span: 2,
      },
      componentProps: {
        options: [
          {
            label: '体育',
            value: 1,
            key: 1,
          },
        ].concat(
          gameTypeList
            .filter((element) => {
              return element.key !== 1;
            })
            .map((element) => {
              return {
                label: element.value,
                value: element.key,
                key: element.key,
              };
            })
        ),
      },
    },
    {
      field: 'gameGroupID',
      component: 'Select',
      label: '游戏厂商',
      // defaultValue: 0,
      colProps: {
        span: 2,
      },
      componentProps: {
        options: gameGroupsOption.map((element) => {
          return {
            label: element.displayName,
            value: element.key,
            key: element.key,
          };
        }),
      },
    },
    {
      field: 'name',
      component: 'Input',
      label: '预设游戏名称',
      colProps: {
        span: 3,
      },
      componentProps: {
        placeholder: '请输入游戏预设名称',
      },
    },
    {
      field: 'displayName',
      component: 'Input',
      label: '游戏显示名称',
      colProps: {
        span: 3,
      },
      componentProps: {
        placeholder: '请输入网站显示名称',
      },
    },
    {
      field: 'status',
      component: 'Select',
      label: '状态',
      defaultValue: 0,
      colProps: {
        span: 2,
      },
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
    {
      field: 'trialPlay',
      component: 'Select',
      label: '是否提供试玩',
      defaultValue: 0,
      colProps: {
        span: 2,
      },
      componentProps: {
        options: [
          {
            label: '全部',
            value: 0,
            key: 0,
          },
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
      field: 'isSpecial',
      component: 'Select',
      label: '是否為特殊遊戲',
      defaultValue: 0,
      colProps: {
        span: 2,
      },
      componentProps: {
        options: [
          {
            label: '全部',
            value: 0,
            key: 0,
          },
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
      defaultValue: 0,
      colProps: {
        span: 2,
      },
      componentProps: {
        options: [
          {
            label: '全部',
            value: 0,
            key: 0,
          },
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
    // {
    //   field: 'sort',
    //   component: 'Select',
    //   label: '排序',
    //   defaultValue: 'desc',
    //   componentProps: {
    //     options: [
    //       {
    //         label: '递增',
    //         value: 'asc',
    //         key: 1,
    //       },
    //       {
    //         label: '递减',
    //         value: 'desc',
    //         key: 2,
    //       },
    //     ],
    //   },
    // },
  ];
};
