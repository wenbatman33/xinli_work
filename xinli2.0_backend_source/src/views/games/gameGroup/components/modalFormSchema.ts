import { FormSchema } from '/@/components/Form/index';
import { uploadApi } from '/@/api/sys/upload';
import { getGameListTypeItem } from '/@/api/game/model/gameModel';
export const modelFormSchemas: FormSchema[] = [
  {
    field: 'id',
    component: 'Input',
    label: '厂商ID:',
    colProps: {
      span: 8,
    },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'gameAgencyName',
    component: 'Input',
    label: '所属代理商:',
    colProps: {
      span: 8,
    },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'walletType',
    component: 'Input',
    label: '钱包类型:',
    colProps: {
      span: 8,
    },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'openWay',
    component: 'Input',
    label: '游戏开启方式:',
    colProps: {
      span: 8,
    },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '厂商预设名称',
    colProps: {
      span: 8,
    },
    rules: [{ required: true, message: '必填' }],
  },
  {
    field: 'displayName',
    component: 'Input',
    label: '网站显示名称',
    colProps: {
      span: 8,
    },
    rules: [{ required: true, message: '必填' }],
  },
  {
    field: 'currencyTypeList',
    component: 'CheckboxGroup',
    label: '使用币别',
    colProps: {
      span: 8,
    },
    componentProps: {
      disabled: true,
      options: [
        {
          label: 'CNY',
          value: 'CNY',
          key: '1',
        },
        {
          label: 'USD',
          value: 'USD',
          key: '2',
        },
        {
          label: 'ETH',
          value: 'ETH',
          key: '3',
        },
      ],
    },
  },
  {
    field: 'maintainTime',
    component: 'Input',
    label: '维护结束时间',
    colProps: {
      span: 16,
    },
    ifShow: (params) => {
      return params.values.status == 3;
    },
    slot: 'maintainTime',
    componentProps: {
      startTime: 'startTime',
    },
    rules: [{ required: true, message: '必填' }],
  },
  {
    show: false,
    field: 'maintainTimeTime',
    component: 'Input',
    label: '',
  },
  {
    field: 'sort',
    component: 'InputNumber',
    label: '网站排序:',
    colProps: {
      span: 8,
    },
    rules: [
      {
        pattern: /^\d{1,4}$/,
        message: '范围在 0~9,999',
        trigger: ['change', 'blur'],
      },
    ],
  },
  {
    field: 'platformFeeRatio',
    component: 'Input',
    label: '平台费:',
    colProps: {
      span: 8,
    },
    componentProps: {
      disabled: true,
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
        {
          label: '维护中',
          value: 3,
          key: '3',
        },
      ],
    },
  },
  {
    field: 'imageH5',
    component: 'Input',
    label: '',
    colProps: {
      span: 8,
    },
    slot: 'imgH5',
  },
  {
    field: 'imageH5File',
    component: 'Input',
    label: '厂商图片(H5)',
    colProps: {
      span: 16,
    },
    // rules: [{ required: true, message: '请选择上传文件' }],
    slot: 'imgH5File',
  },
  {
    field: 'imagePc',
    component: 'Input',
    label: '',
    colProps: {
      span: 8,
    },
    slot: 'imgPc',
  },
  {
    field: 'imagePcFile',
    component: 'Input',
    label: '厂商图片(PC)',
    colProps: {
      span: 16,
    },
    // rules: [{ required: true, message: '请选择上传文件' }],
    slot: 'imgPcFile',
  },
];
