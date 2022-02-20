import { FormSchema } from '/@/components/Form/index';
import { uploadApi } from '/@/api/sys/upload';
import { getGameListTypeItem } from '/@/api/game/model/gameModel';
export const modelFormSchemas: FormSchema[] = [
  {
    field: 'id',
    component: 'Input',
    label: 'ID:',
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
    label: '代理商名称',
    colProps: {
      span: 8,
    },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'gameGroups',
    component: 'Input',
    label: '旗下廠商',
    colProps: {
      span: 8,
    },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'gameLists',
    component: 'Input',
    label: '代理商遊戲類型',
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
      span: 24,
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
